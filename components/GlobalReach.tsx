"use client";

import { useState } from "react";

import { motion, useReducedMotion } from "framer-motion";

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

const OFFICES: string[] = [
  "New York",
  "London",
  "Hong Kong",
  "Dubai",
  "Chicago",
  "San Francisco",
];

type Anchor = "start" | "end" | "middle";

type GlobeDot = {
  cx: number;
  cy: number;
  targetOpacity: number;
  label: string;
  labelX: number;
  labelY: number;
  anchor: Anchor;
};

// Optima's office network, west to east: San Francisco, Chicago, New York,
// London, Dubai, Hong Kong.
const GLOBE_DOTS: GlobeDot[] = [
  { cx: 62, cy: 172, targetOpacity: 1, label: "SAN FRANCISCO", labelX: 58, labelY: 192, anchor: "start" },
  { cx: 95, cy: 150, targetOpacity: 1, label: "CHICAGO", labelX: 90, labelY: 140, anchor: "end" },
  { cx: 155, cy: 105, targetOpacity: 1, label: "NEW YORK", labelX: 150, labelY: 95, anchor: "end" },
  { cx: 250, cy: 110, targetOpacity: 1, label: "LONDON", labelX: 258, labelY: 100, anchor: "start" },
  { cx: 298, cy: 198, targetOpacity: 1, label: "DUBAI", labelX: 306, labelY: 192, anchor: "start" },
  { cx: 330, cy: 242, targetOpacity: 1, label: "HONG KONG", labelX: 330, labelY: 260, anchor: "middle" },
];

// Connection arcs chaining the office network together, drawn in on scroll.
const CONNECTION_ARCS: { d: string; delay: number }[] = [
  { d: "M62 172 Q72 148 95 150", delay: 0.4 },
  { d: "M95 150 Q120 92 155 105", delay: 0.55 },
  { d: "M155 105 Q202 52 250 110", delay: 0.7 },
  { d: "M250 110 Q292 138 298 198", delay: 0.85 },
  { d: "M298 198 Q326 208 330 242", delay: 1.0 },
];

// Dotted-halftone land masses (North Atlantic view): North America left,
// Greenland top-centre, UK/Ireland right, hints of Scandinavia and France/Iberia,
// plus an Arabia/Asia hint so Dubai and Hong Kong sit near land.
const LAND_POLYGONS: [number, number][][] = [
  // North America (with a Hudson Bay notch and Florida tail)
  [[60,120],[85,85],[120,70],[150,75],[170,90],[175,105],[160,110],[168,125],[150,140],[160,155],[140,175],[130,200],[120,230],[112,255],[100,250],[95,225],[80,205],[62,180],[50,160],[45,140]],
  // Greenland
  [[195,55],[215,45],[235,55],[230,80],[210,90],[195,75]],
  // Great Britain
  [[245,90],[252,88],[256,100],[252,112],[258,122],[250,128],[243,120],[246,105]],
  // Ireland
  [[233,110],[239,107],[241,116],[235,121],[231,116]],
  // Scandinavia hint
  [[262,70],[275,60],[283,75],[275,95],[265,88]],
  // France/Iberia hint
  [[255,130],[270,125],[285,135],[290,150],[280,165],[265,160],[258,145]],
  // Arabia/Asia hint
  [[290,165],[315,150],[340,170],[352,200],[345,235],[325,255],[305,245],[292,215],[285,190]],
];

function inPolygon(x: number, y: number, poly: [number, number][]) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

type LandDot = { x: number; y: number; o: number };

function buildLandDots(): LandDot[] {
  const dots: LandDot[] = [];
  for (let x = 32; x <= 368; x += 7) {
    for (let y = 32; y <= 368; y += 7) {
      const dist = Math.hypot(x - 200, y - 200);
      if (dist > 166) continue;
      if (LAND_POLYGONS.some((poly) => inPolygon(x, y, poly))) {
        const o = Math.max(0.05, 0.28 * (1 - Math.pow(dist / 170, 4)));
        dots.push({ x, y, o });
      }
    }
  }
  return dots;
}

const LAND_DOTS = buildLandDots();

export default function GlobalReach() {
  const reduceMotion = useReducedMotion();
  const [focused, setFocused] = useState<string | null>(null);
  const focusedDot = GLOBE_DOTS.find((d) => d.label === focused) ?? null;

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
                    const isFocused = focused === office.toUpperCase();
                    return (
                      <button
                        key={office}
                        type="button"
                        onMouseEnter={() => setFocused(office.toUpperCase())}
                        onFocus={() => setFocused(office.toUpperCase())}
                        onMouseLeave={() => setFocused(null)}
                        onBlur={() => setFocused(null)}
                        aria-label={`Highlight ${office} on the globe`}
                        className="flex items-center gap-3 w-full cursor-pointer text-left transition-colors duration-200"
                      >
                        <span
                          aria-hidden="true"
                          className={`h-1.5 w-1.5 rounded-full ${isFocused ? "bg-brand-light" : "bg-brand"}`}
                        />
                        <span className={`text-sm ${isFocused ? "font-medium text-ink" : "text-grey"}`}>
                          {office}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <svg
              aria-hidden="true"
              viewBox="0 0 400 400"
              className="mx-auto aspect-square w-full max-w-md"
              fill="none"
            >
              <motion.g
                animate={{
                  rotate: focusedDot ? (200 - focusedDot.cx) * 0.06 : 0,
                  scale: focusedDot ? 1.05 : 1,
                }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 90, damping: 20 }
                }
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
              >
              {/* Dotted-halftone land masses, beneath the graticule */}
              {LAND_DOTS.map((d) => (
                <circle key={`${d.x}-${d.y}`} cx={d.x} cy={d.y} r={1.3} fill="#151817" opacity={d.o} />
              ))}

              {/* Static wireframe graticule */}
              <circle cx="200" cy="200" r="170" stroke="#151817" strokeOpacity="0.16" strokeWidth="1" fill="none" />
              <ellipse cx="200" cy="53" rx="85" ry="21" stroke="#151817" strokeOpacity="0.09" strokeWidth="1" fill="none" />
              <ellipse cx="200" cy="115" rx="147" ry="37" stroke="#151817" strokeOpacity="0.09" strokeWidth="1" fill="none" />
              <ellipse cx="200" cy="200" rx="170" ry="42" stroke="#151817" strokeOpacity="0.09" strokeWidth="1" fill="none" />
              <ellipse cx="200" cy="285" rx="147" ry="37" stroke="#151817" strokeOpacity="0.09" strokeWidth="1" fill="none" />
              <ellipse cx="200" cy="347" rx="85" ry="21" stroke="#151817" strokeOpacity="0.09" strokeWidth="1" fill="none" />
              <ellipse cx="200" cy="200" rx="8" ry="170" stroke="#151817" strokeOpacity="0.09" strokeWidth="1" fill="none" />
              <ellipse cx="200" cy="200" rx="60" ry="170" stroke="#151817" strokeOpacity="0.09" strokeWidth="1" fill="none" />
              <ellipse cx="200" cy="200" rx="120" ry="170" stroke="#151817" strokeOpacity="0.09" strokeWidth="1" fill="none" />

              {/* Dashed orbit ring */}
              <motion.g
                animate={reduceMotion ? undefined : { rotate: 360 }}
                transition={
                  reduceMotion
                    ? undefined
                    : { duration: 120, ease: "linear", repeat: Infinity }
                }
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
              >
                <circle
                  cx="200"
                  cy="200"
                  r="186"
                  stroke="#1E8A6E"
                  strokeOpacity="0.3"
                  strokeDasharray="2 7"
                  fill="none"
                />
              </motion.g>

              {/* Connection arcs chaining the office network, drawn in on scroll */}
              {reduceMotion
                ? CONNECTION_ARCS.map((arc) => (
                    <path
                      key={arc.d}
                      d={arc.d}
                      stroke="#1E8A6E"
                      strokeOpacity="0.45"
                      strokeWidth="1.2"
                      fill="none"
                      strokeLinecap="round"
                    />
                  ))
                : CONNECTION_ARCS.map((arc) => (
                    <motion.path
                      key={arc.d}
                      d={arc.d}
                      stroke="#1E8A6E"
                      strokeOpacity="0.45"
                      strokeWidth="1.2"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: "easeOut", delay: arc.delay }}
                    />
                  ))}

              {GLOBE_DOTS.map((dot, index) =>
                reduceMotion ? (
                  <motion.g
                    key={dot.label}
                    animate={{ opacity: focused && focused !== dot.label ? 0.3 : 1 }}
                    transition={{ duration: 0.25 }}
                  >
                    <circle
                      cx={dot.cx}
                      cy={dot.cy}
                      r={focused === dot.label ? 7.5 : 5}
                      fill="#15805E"
                      opacity={dot.targetOpacity}
                    />
                    <text
                      x={dot.labelX}
                      y={dot.labelY}
                      textAnchor={dot.anchor}
                      fontSize={10}
                      letterSpacing="1.5"
                      fill={focused === dot.label ? "#151817" : "#6E7573"}
                      fontWeight={focused === dot.label ? 600 : 400}
                    >
                      {dot.label}
                    </text>
                  </motion.g>
                ) : (
                  <motion.g
                    key={dot.label}
                    animate={{ opacity: focused && focused !== dot.label ? 0.3 : 1 }}
                    transition={{ duration: 0.25 }}
                  >
                    <motion.circle
                      cx={dot.cx}
                      cy={dot.cy}
                      fill="none"
                      stroke="#47C492"
                      strokeWidth="1"
                      initial={{ r: 5, opacity: 0 }}
                      whileInView={{ r: [5, 18], opacity: [0.45, 0] }}
                      viewport={{ once: false, margin: "-64px" }}
                      transition={{
                        duration: 2.6,
                        delay: 0.4 * index,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                    <motion.circle
                      cx={dot.cx}
                      cy={dot.cy}
                      fill="#15805E"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: dot.targetOpacity }}
                      animate={{ r: focused === dot.label ? 7.5 : 5 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.15 * index, duration: 0.3 }}
                    />
                    <motion.text
                      x={dot.labelX}
                      y={dot.labelY}
                      textAnchor={dot.anchor}
                      fontSize={10}
                      letterSpacing="1.5"
                      fill={focused === dot.label ? "#151817" : "#6E7573"}
                      fontWeight={focused === dot.label ? 600 : 400}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.15 * index, duration: 0.3 }}
                    >
                      {dot.label}
                    </motion.text>
                  </motion.g>
                ),
              )}

              {/* Targeting reticle: glides to the focused office marker */}
              <motion.g
                animate={{
                  x: focusedDot ? focusedDot.cx : 200,
                  y: focusedDot ? focusedDot.cy : 200,
                  opacity: focusedDot ? 1 : 0,
                }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 120, damping: 22 }
                }
              >
                <circle r={13} stroke="#47C492" strokeWidth={1} strokeDasharray="3 4" fill="none" />
                <line x1={0} y1={-15} x2={0} y2={-20} stroke="#47C492" strokeWidth={1} />
                <line x1={0} y1={15} x2={0} y2={20} stroke="#47C492" strokeWidth={1} />
                <line x1={-15} y1={0} x2={-20} y2={0} stroke="#47C492" strokeWidth={1} />
                <line x1={15} y1={0} x2={20} y2={0} stroke="#47C492" strokeWidth={1} />
              </motion.g>
              </motion.g>
            </svg>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
