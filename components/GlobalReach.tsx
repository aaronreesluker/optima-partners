"use client";

import { useEffect, useRef, useState } from "react";

import createGlobe from "cobe";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import FadeIn from "@/components/FadeIn";

type Jurisdiction = {
  code: string;
  region: string;
};

const JURISDICTIONS: Jurisdiction[] = [
  { code: "FCA", region: "United Kingdom" },
  { code: "SEC", region: "United States" },
  { code: "NFA", region: "United States" },
  { code: "CFTC", region: "United States" },
];

type Office = {
  name: string;
  lat: number;
  lng: number;
};

const OFFICES: Office[] = [
  { name: "New York", lat: 40.71, lng: -74.01 },
  { name: "London", lat: 51.51, lng: -0.13 },
  { name: "Hong Kong", lat: 22.32, lng: 114.17 },
  { name: "Dubai", lat: 25.2, lng: 55.27 },
  { name: "Chicago", lat: 41.88, lng: -87.63 },
  { name: "San Francisco", lat: 37.77, lng: -122.42 },
];

const BASE_THETA = 0.28;
const TAU = Math.PI * 2;

// cobe renders its globe on a sphere of radius 0.8 in its internal NDC-ish
// space, and lifts markers `markerElevation` (default 0.05, which we never
// override) above that surface. Mirroring both constants here keeps our DOM
// overlay projection numerically identical to cobe's own marker placement.
const SPHERE_RADIUS = 0.8;
const MARKER_ELEVATION = 0.05;
const PROJECTION_RADIUS = SPHERE_RADIUS + MARKER_ELEVATION;

// Depth (vz, normalized to roughly [-1, 1]) band used to roll markers around
// the limb: fully hidden on the far side, fading/scaling in as they approach
// vz = LIMB_FADE_END, fully opaque beyond it.
const LIMB_FADE_END = 0.35;

function locationToAngles(lat: number, long: number): [number, number] {
  return [
    Math.PI - ((long * Math.PI) / 180 - Math.PI / 2),
    (lat * Math.PI) / 180,
  ];
}

/** Shortest signed angular distance from `from` to `to`, wrapped to (-PI, PI]. */
function shortestAngleDelta(from: number, to: number) {
  const delta = (to - from) % TAU;
  return ((delta + TAU * 1.5) % TAU) - Math.PI;
}

/**
 * Converts lat/long (degrees) into the same unit-sphere vector cobe's own
 * WASM/GL renderer uses internally for markers (see cobe's `U()` in
 * dist/index.esm.js), pre-scaled to the marker's elevated radius.
 */
function locationToProjectionVector(lat: number, lng: number): [number, number, number] {
  const latRad = (lat * Math.PI) / 180;
  const lngRad = (lng * Math.PI) / 180 - Math.PI;
  const cosLat = Math.cos(latRad);
  const x = -cosLat * Math.cos(lngRad);
  const y = Math.sin(latRad);
  const z = cosLat * Math.sin(lngRad);
  return [x * PROJECTION_RADIUS, y * PROJECTION_RADIUS, z * PROJECTION_RADIUS];
}

const OFFICE_VECTORS: [number, number, number][] = OFFICES.map((office) =>
  locationToProjectionVector(office.lat, office.lng),
);

type MarkerProjection = { x: number; y: number; opacity: number; scale: number };

/**
 * Projects an office's pre-computed sphere vector onto the canvas for the
 * globe's current `phi`/`theta`, reproducing cobe's own marker projection
 * (see the `O()` function in cobe's dist/index.esm.js) so the DOM ring lands
 * exactly where cobe's built-in dot would.
 */
function projectMarker(
  vector: [number, number, number],
  phi: number,
  theta: number,
  radius: number,
): MarkerProjection {
  const cosPhi = Math.cos(phi);
  const sinPhi = Math.sin(phi);
  const cosTheta = Math.cos(theta);
  const sinTheta = Math.sin(theta);
  const [tx, ty, tz] = vector;

  const vx = cosPhi * tx + sinPhi * tz;
  const vy = sinPhi * sinTheta * tx + cosTheta * ty - cosPhi * sinTheta * tz;
  const vzRaw = -sinPhi * cosTheta * tx + sinTheta * ty + cosPhi * cosTheta * tz;
  const vz = vzRaw / PROJECTION_RADIUS;

  const x = radius + radius * vx;
  const y = radius - radius * vy;

  let opacity: number;
  let scale: number;
  if (vz < 0) {
    opacity = 0;
    scale = 0.6;
  } else if (vz < LIMB_FADE_END) {
    const t = vz / LIMB_FADE_END;
    opacity = t;
    scale = 0.6 + 0.4 * t;
  } else {
    opacity = 1;
    scale = 1;
  }

  return { x, y, opacity, scale };
}

export default function GlobalReach() {
  const reduceMotion = useReducedMotion();
  const [focused, setFocused] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const markerElRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusedRef = useRef<string | null>(null);
  const reduceMotionRef = useRef(false);
  const widthRef = useRef(0);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  // Marker focus is latched (see handleMarkerEnter/handleContainerLeave
  // below) so that easing the globe toward a hovered city can't move the
  // marker out from under the cursor and re-trigger mouseenter/mouseleave
  // in a feedback loop. lastClearAt guards against a focus re-set that
  // lands immediately after a clear (e.g. right at the container edge).
  const lastClearAt = useRef(0);

  useEffect(() => {
    focusedRef.current = focused;
  }, [focused]);

  useEffect(() => {
    reduceMotionRef.current = !!reduceMotion;
  }, [reduceMotion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let currentPhi = 0;
    let currentTheta = BASE_THETA;

    const onResize = () => {
      widthRef.current = container.offsetWidth;
    };
    onResize();

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(container);
    window.addEventListener("resize", onResize);

    const applyMarkerProjections = (phi: number, theta: number) => {
      const radius = widthRef.current / 2;
      for (let index = 0; index < OFFICES.length; index += 1) {
        const el = markerElRefs.current[index];
        if (!el) continue;
        const projection = projectMarker(OFFICE_VECTORS[index], phi, theta, radius);
        el.style.transform = `translate(${projection.x}px, ${projection.y}px) translate(-50%, -50%) scale(${projection.scale})`;
        el.style.opacity = String(projection.opacity);
        // Only the currently visible (near-side) marker should be able to
        // receive pointer events — far-side/limb-hidden markers sit at the
        // same DOM stacking position and would otherwise swallow hovers.
        el.style.pointerEvents = projection.opacity > 0 ? "auto" : "none";
      }
    };

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      phi: currentPhi,
      theta: currentTheta,
      dark: 0,
      diffuse: 0.45,
      mapSamples: 28000,
      mapBrightness: 5,
      baseColor: [0.8, 0.83, 0.81],
      markerColor: [0.08, 0.5, 0.37],
      glowColor: [1, 1, 1],
      opacity: 0.92,
      // Office markers are rendered as a custom DOM overlay (see below), not
      // cobe's built-in dots.
      markers: [],
    });

    // Position the DOM markers before the first paint so they never flash
    // at the container's top-left corner.
    applyMarkerProjections(currentPhi, currentTheta);

    // cobe v2 has no per-frame render callback — the caller must drive
    // rotation and texture refresh itself by calling `globe.update(...)`
    // inside a requestAnimationFrame loop.
    let animationFrame = 0;

    const frame = () => {
      if (pointerInteracting.current === null) {
        const focusedOffice = OFFICES.find(
          (office) => office.name === focusedRef.current,
        );

        if (focusedOffice) {
          const [targetPhi, targetTheta] = locationToAngles(
            focusedOffice.lat,
            focusedOffice.lng,
          );
          const ease = reduceMotionRef.current ? 1 : 0.08;
          currentPhi += shortestAngleDelta(currentPhi, targetPhi) * ease;
          currentTheta += (targetTheta - currentTheta) * ease;
        } else if (!reduceMotionRef.current) {
          currentPhi += 0.003;
        }
      }

      const renderPhi = currentPhi + pointerInteractionMovement.current / 200;
      const renderTheta = currentTheta;

      globe.update({
        phi: renderPhi,
        theta: renderTheta,
        width: widthRef.current * 2,
        height: widthRef.current * 2,
      });

      applyMarkerProjections(renderPhi, renderTheta);

      animationFrame = requestAnimationFrame(frame);
    };
    animationFrame = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animationFrame);
      globe.destroy();
      resizeObserver.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      pointerInteractionMovement.current = clientX - pointerInteracting.current;
    }
  };

  // Hovering a marker latches focus on; it is only cleared by leaving the
  // whole globe container (see the container's onMouseLeave below), never
  // by the marker's own mouseleave. Without this, easing the globe toward
  // the hovered city drags the marker out from under a stationary cursor,
  // firing mouseleave -> clearing focus -> easing back -> mouseenter again,
  // which reads as flicker/jitter.
  const handleMarkerEnter = (name: string) => {
    if (performance.now() - lastClearAt.current < 80) return;
    setFocused(name);
  };

  const handleContainerLeave = () => {
    lastClearAt.current = performance.now();
    setFocused(null);
  };

  return (
    <section id="global-reach" className="border-t border-line bg-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand">
              03 — Global Reach
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="mt-4 text-3xl font-medium tracking-tight text-ink md:text-5xl">
              Advising across jurisdictions
            </h2>
          </FadeIn>
        </div>

        <div className="mt-16 grid items-center gap-12 md:grid-cols-2">
          <FadeIn>
            <p className="text-base leading-relaxed text-grey md:text-lg">
              Our partners advise firms operating under the FCA in the United
              Kingdom and the SEC, NFA and CFTC in the United States, with
              engagements that routinely span both regimes. Partners operate
              on the ground from offices in New York, London, Hong Kong,
              Dubai, Chicago and San Francisco.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-ink/60">
                  Regulators
                </p>
                <div className="mt-4 space-y-3">
                  {JURISDICTIONS.map((jurisdiction) => (
                    <div key={jurisdiction.code} className="flex items-center gap-3">
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand" />
                      <span className="text-sm font-medium text-ink">{jurisdiction.code}</span>
                      <span className="text-sm text-grey">{jurisdiction.region}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-ink/60">
                  Offices
                </p>
                <div className="mt-4 space-y-3">
                  {OFFICES.map((office) => {
                    const isFocused = focused === office.name;
                    return (
                      <button
                        key={office.name}
                        type="button"
                        onMouseEnter={() => setFocused(office.name)}
                        onFocus={() => setFocused(office.name)}
                        onMouseLeave={() => setFocused(null)}
                        onBlur={() => setFocused(null)}
                        aria-label={`Highlight ${office.name} on the globe`}
                        className="flex items-center gap-3 w-full cursor-pointer text-left transition-colors duration-200"
                      >
                        <span
                          aria-hidden="true"
                          className={`h-1.5 w-1.5 rounded-full ${isFocused ? "bg-brand-light" : "bg-brand"}`}
                        />
                        <span className={`text-sm ${isFocused ? "font-medium text-ink" : "text-grey"}`}>
                          {office.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div
              ref={containerRef}
              onMouseLeave={handleContainerLeave}
              className="relative mx-auto aspect-square w-full max-w-md"
            >
              <canvas
                ref={canvasRef}
                aria-hidden="true"
                className="h-full w-full cursor-grab touch-none active:cursor-grabbing"
                onPointerDown={(event) => {
                  pointerInteracting.current =
                    event.clientX - pointerInteractionMovement.current;
                  canvasRef.current?.setPointerCapture(event.pointerId);
                }}
                onPointerUp={(event) => {
                  updatePointerInteraction(null);
                  canvasRef.current?.releasePointerCapture(event.pointerId);
                }}
                onPointerOut={() => updatePointerInteraction(null)}
                onPointerMove={(event) => updateMovement(event.clientX)}
              />

              {OFFICES.map((office, index) => {
                const isFocused = focused === office.name;
                const gradientId = `optima-marker-grad-${index}`;
                return (
                  <button
                    key={office.name}
                    ref={(el) => {
                      markerElRefs.current[index] = el;
                    }}
                    type="button"
                    aria-label={`Highlight ${office.name} on the globe`}
                    onMouseEnter={() => handleMarkerEnter(office.name)}
                    onFocus={() => setFocused(office.name)}
                    onBlur={() => setFocused(null)}
                    className="absolute left-0 top-0 flex h-7 w-7 cursor-pointer appearance-none items-center justify-center rounded-full border-0 bg-transparent p-0 opacity-0"
                  >
                    <span className="relative flex items-center justify-center">
                      <svg
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                        className={`overflow-visible transition-[width,height] duration-300 ease-out ${
                          isFocused ? "h-[22px] w-[22px]" : "h-[13px] w-[13px]"
                        }`}
                        style={{ filter: "drop-shadow(0 0 1.5px rgba(255,255,255,0.95))" }}
                      >
                        <defs>
                          <linearGradient id={gradientId} x1="15%" y1="90%" x2="85%" y2="10%">
                            <stop offset="0%" stopColor="#0E4A44" />
                            <stop offset="55%" stopColor="#1E8A6E" />
                            <stop offset="100%" stopColor="#47C492" />
                          </linearGradient>
                        </defs>
                        <circle
                          cx="16"
                          cy="16"
                          r="11"
                          fill="none"
                          stroke={`url(#${gradientId})`}
                          strokeWidth="8.5"
                          className={
                            isFocused
                              ? "motion-safe:animate-marker-orbit motion-reduce:animate-none"
                              : undefined
                          }
                          style={{ transformBox: "fill-box", transformOrigin: "center" }}
                        />
                      </svg>
                    </span>
                  </button>
                );
              })}

              <AnimatePresence>
                {focused ? (
                  <motion.div
                    key={focused}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
                    style={{ left: "50%", x: "-50%" }}
                    className="absolute bottom-4 whitespace-nowrap rounded-full border border-line bg-white/90 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-ink backdrop-blur shadow-sm"
                  >
                    {focused}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
