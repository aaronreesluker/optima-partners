"use client";

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

type GlobeDot = {
  cx: number;
  cy: number;
  targetOpacity: number;
};

// London (upper mid-right), New York (upper mid-left), Chicago (upper left),
// plus one lower-right marker at reduced opacity suggesting further reach.
const GLOBE_DOTS: GlobeDot[] = [
  { cx: 250, cy: 110, targetOpacity: 1 },
  { cx: 155, cy: 105, targetOpacity: 1 },
  { cx: 95, cy: 150, targetOpacity: 1 },
  { cx: 290, cy: 290, targetOpacity: 0.4 },
];

export default function GlobalReach() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="global-reach" className="border-t border-line bg-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-teal">
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
              engagements that routinely span both regimes. Additional
              jurisdictions are confirmed with each client at engagement.
            </p>
            <div className="mt-8 space-y-3">
              {JURISDICTIONS.map((jurisdiction) => (
                <div key={jurisdiction.code} className="flex items-center gap-3">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-teal" />
                  <span className="text-sm font-medium text-ink">{jurisdiction.code}</span>
                  <span className="text-sm text-grey">{jurisdiction.region}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <svg
              aria-hidden="true"
              viewBox="0 0 400 400"
              className="mx-auto aspect-square w-full max-w-md"
              fill="none"
            >
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
                  stroke="#123C44"
                  strokeOpacity="0.25"
                  strokeDasharray="2 7"
                  fill="none"
                />
              </motion.g>

              {/* Connection arcs between markers, drawn in on scroll */}
              {reduceMotion ? (
                <>
                  <path
                    d="M155 105 Q202 52 250 110"
                    stroke="#123C44"
                    strokeOpacity="0.45"
                    strokeWidth="1.2"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M95 150 Q120 92 155 105"
                    stroke="#123C44"
                    strokeOpacity="0.45"
                    strokeWidth="1.2"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M250 110 Q305 185 290 290"
                    stroke="#123C44"
                    strokeOpacity="0.45"
                    strokeWidth="1.2"
                    fill="none"
                    strokeLinecap="round"
                  />
                </>
              ) : (
                <>
                  <motion.path
                    d="M155 105 Q202 52 250 110"
                    stroke="#123C44"
                    strokeOpacity="0.45"
                    strokeWidth="1.2"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, ease: "easeOut", delay: 0.5 }}
                  />
                  <motion.path
                    d="M95 150 Q120 92 155 105"
                    stroke="#123C44"
                    strokeOpacity="0.45"
                    strokeWidth="1.2"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, ease: "easeOut", delay: 0.75 }}
                  />
                  <motion.path
                    d="M250 110 Q305 185 290 290"
                    stroke="#123C44"
                    strokeOpacity="0.45"
                    strokeWidth="1.2"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, ease: "easeOut", delay: 1.0 }}
                  />
                </>
              )}

              {GLOBE_DOTS.map((dot, index) =>
                reduceMotion ? (
                  <circle
                    key={`${dot.cx}-${dot.cy}`}
                    cx={dot.cx}
                    cy={dot.cy}
                    r="5"
                    fill="#123C44"
                    opacity={dot.targetOpacity}
                  />
                ) : (
                  <g key={`${dot.cx}-${dot.cy}`}>
                    {dot.targetOpacity === 1 ? (
                      <motion.circle
                        cx={dot.cx}
                        cy={dot.cy}
                        fill="none"
                        stroke="#123C44"
                        strokeWidth="1"
                        initial={{ r: 5, opacity: 0 }}
                        whileInView={{ r: [5, 18], opacity: [0.45, 0] }}
                        viewport={{ once: false, margin: "-64px" }}
                        transition={{
                          duration: 2.6,
                          delay: 0.6 + 0.5 * index,
                          repeat: Infinity,
                          ease: "easeOut",
                        }}
                      />
                    ) : null}
                    <motion.circle
                      cx={dot.cx}
                      cy={dot.cy}
                      r="5"
                      fill="#123C44"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: dot.targetOpacity }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.15 * index, duration: 0.3 }}
                    />
                  </g>
                ),
              )}
            </svg>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
