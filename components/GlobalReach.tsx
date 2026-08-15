"use client";

import { useEffect, useRef, useState } from "react";

import createGlobe, { type Marker } from "cobe";
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

const MARKER_COLOR: [number, number, number] = [0.08, 0.5, 0.37];
const MARKER_SIZE = 0.06;
const MARKER_SIZE_FOCUSED = 0.11;
const BASE_THETA = 0.28;
const TAU = Math.PI * 2;

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

export default function GlobalReach() {
  const reduceMotion = useReducedMotion();
  const [focused, setFocused] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const focusedRef = useRef<string | null>(null);
  const reduceMotionRef = useRef(false);
  const widthRef = useRef(0);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);

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
      markerColor: MARKER_COLOR,
      glowColor: [1, 1, 1],
      opacity: 0.92,
      markers: OFFICES.map((office) => ({
        location: [office.lat, office.lng],
        size: MARKER_SIZE,
      })) satisfies Marker[],
    });

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

      globe.update({
        phi: currentPhi + pointerInteractionMovement.current / 200,
        theta: currentTheta,
        width: widthRef.current * 2,
        height: widthRef.current * 2,
        markers: OFFICES.map((office) => ({
          location: [office.lat, office.lng],
          size:
            focusedRef.current === office.name
              ? MARKER_SIZE_FOCUSED
              : MARKER_SIZE,
        })) satisfies Marker[],
      });

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

              <AnimatePresence>
                {focused ? (
                  <motion.div
                    key={focused}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-line bg-white/90 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-ink backdrop-blur shadow-sm"
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
