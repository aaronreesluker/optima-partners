"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  Check,
  ClipboardCheck,
  FileSearch,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const CYCLE_MS = 3600;

type SignalMessage = {
  icon: LucideIcon;
  title: string;
  body: string;
};

const MESSAGES: SignalMessage[] = [
  {
    icon: Activity,
    title: "Regulatory signal",
    body: "Change detected — assessment in progress…",
  },
  {
    icon: FileSearch,
    title: "Monitoring",
    body: "Surveillance sweep complete — no exceptions",
  },
  {
    icon: ShieldCheck,
    title: "Cyber posture",
    body: "Controls verified against expectations",
  },
  {
    icon: ClipboardCheck,
    title: "Examination readiness",
    body: "Mock exam scheduled — documents compiled",
  },
];

type Blip = {
  /** Tailwind position classes — literal strings so JIT can pick them up.
   * SEC and AML get a compact mobile position (below sm) so they never
   * sit under the status card, then restore their original scattered
   * position at sm and up. */
  pos: string;
  label: string;
  delay: number;
};

const BLIPS: Blip[] = [
  { pos: "left-[22%] top-[26%] sm:left-[48%] sm:top-[22%]", label: "SEC", delay: 0.4 },
  { pos: "left-[30%] top-[34%]", label: "FCA", delay: 2.1 },
  { pos: "left-[73%] top-[58%]", label: "NFA", delay: 1.2 },
  { pos: "left-[42%] top-[70%]", label: "CFTC", delay: 3.4 },
  { pos: "left-[20%] top-[58%]", label: "CYBER", delay: 4.6 },
  { pos: "left-[30%] top-[50%] sm:left-[55%] sm:top-[42%]", label: "AML", delay: 5.2 },
];

const RING_RADII = [70, 140, 210, 280];

export default function SignalPanel() {
  const reduceMotion = useReducedMotion();
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const interval = setInterval(() => {
      setCycle((prev) => prev + 1);
    }, CYCLE_MS);
    return () => clearInterval(interval);
  }, [reduceMotion]);

  const message = MESSAGES[cycle % MESSAGES.length];
  const Icon = message.icon;

  const cardInitial = reduceMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 16 };
  const cardTransition = {
    duration: reduceMotion ? 0 : 0.5,
    delay: reduceMotion ? 0 : 0.2,
  };

  const chipInitial = reduceMotion
    ? { opacity: 1, scale: 1 }
    : { opacity: 0, scale: 0.85 };
  const chipTransition = {
    duration: reduceMotion ? 0 : 0.4,
    delay: reduceMotion ? 0 : 0.45,
  };

  return (
    <div
      aria-hidden="true"
      className="relative w-full overflow-hidden rounded-[24px] border border-line bg-ink aspect-square sm:aspect-[4/3] lg:aspect-[16/7]"
    >
      <svg className="absolute inset-0 h-full w-full">
        <defs>
          <pattern
            id="signal-grid"
            width={90}
            height={90}
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M39 45h12M45 39v12"
              stroke="#FFFFFF"
              strokeOpacity={0.05}
              strokeWidth={1}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#signal-grid)" />
      </svg>

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1000 437"
        preserveAspectRatio="xMidYMid slice"
      >
        <line
          x1={0}
          y1={218}
          x2={1000}
          y2={218}
          stroke="#FFFFFF"
          strokeOpacity={0.05}
          strokeWidth={1}
        />
        <line
          x1={500}
          y1={0}
          x2={500}
          y2={437}
          stroke="#FFFFFF"
          strokeOpacity={0.05}
          strokeWidth={1}
        />
        {RING_RADII.map((radius) => (
          <circle
            key={radius}
            cx={500}
            cy={218}
            r={radius}
            fill="none"
            stroke="#FFFFFF"
            strokeOpacity={0.08}
            strokeWidth={1}
          />
        ))}
      </svg>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at center, transparent 60%, rgba(21,24,23,0.5) 100%)",
        }}
      />

      {!reduceMotion && (
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full"
          style={{ height: "130%" }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "conic-gradient(from 0deg, rgba(71,196,146,0.16), rgba(71,196,146,0.03) 55deg, transparent 70deg, transparent 360deg)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}

      {BLIPS.map((blip) => (
        <div
          key={blip.label}
          className={`absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 sm:gap-1.5 ${blip.pos}`}
        >
          <span className="relative flex h-2 w-2 items-center justify-center">
            {!reduceMotion && (
              <motion.span
                className="absolute inset-0 rounded-full border border-brand-light"
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: [1, 3.2], opacity: [0.5, 0] }}
                transition={{
                  duration: 2,
                  delay: blip.delay,
                  repeat: Infinity,
                  repeatDelay: 4,
                  ease: "easeOut",
                }}
              />
            )}
            <motion.span
              className="h-2 w-2 rounded-full bg-brand-light"
              initial={reduceMotion ? { opacity: 0.8 } : { opacity: 0.35 }}
              animate={
                reduceMotion ? { opacity: 0.8 } : { opacity: [0.35, 1, 0.35] }
              }
              transition={
                reduceMotion
                  ? undefined
                  : {
                      duration: 6,
                      delay: blip.delay,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
            />
          </span>
          <span className="whitespace-nowrap text-[7px] font-medium uppercase tracking-[0.1em] text-white/50 sm:text-[8px] lg:text-[9px] lg:tracking-[0.2em]">
            {blip.label}
          </span>
        </div>
      ))}

      <motion.div
        className="absolute right-[4%] top-[5%] w-[190px] rounded-xl border border-white/15 bg-white/10 p-3 backdrop-blur lg:right-[10%] lg:top-[20%] lg:w-[280px] lg:p-4"
        initial={cardInitial}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={cardTransition}
      >
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <div className="min-h-[78px] lg:min-h-[92px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={cycle}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: reduceMotion ? 0 : 0.35 }}
              >
                <div className="flex items-center gap-1.5 lg:gap-2">
                  <Icon
                    size={14}
                    strokeWidth={1.5}
                    className="shrink-0 text-brand-light lg:hidden"
                  />
                  <Icon
                    size={16}
                    strokeWidth={1.5}
                    className="hidden shrink-0 text-brand-light lg:block"
                  />
                  <span className="text-xs font-medium text-white lg:text-sm">
                    {message.title}
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-white/60 lg:mt-2 lg:text-sm">{message.body}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-2 h-0.5 w-full overflow-hidden rounded-full bg-white/10 lg:mt-3">
            <motion.div
              key={cycle}
              className="h-full w-full origin-left rounded-full"
              style={{
                backgroundImage: "linear-gradient(90deg, #1E8A6E, #47C492)",
              }}
              initial={reduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: reduceMotion ? 0 : CYCLE_MS / 1000,
                ease: "linear",
              }}
            />
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-[4%] right-[4%] flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-2.5 py-1.5 backdrop-blur lg:bottom-[14%] lg:right-[8%] lg:gap-2 lg:px-3 lg:py-2"
        initial={chipInitial}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={chipTransition}
      >
        <motion.div
          className="flex items-center gap-1.5 lg:gap-2"
          animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand lg:h-5 lg:w-5">
            <Check size={10} strokeWidth={2.5} className="text-white lg:hidden" />
            <Check size={12} strokeWidth={2.5} className="hidden text-white lg:block" />
          </span>
          <span className="whitespace-nowrap text-[10px] font-medium text-white lg:text-xs">
            Examination ready
          </span>
        </motion.div>
      </motion.div>

      <div className="absolute left-[4%] top-[4%] flex items-center gap-1.5 lg:left-[8%] lg:top-[16%] lg:gap-2">
        <motion.span
          className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-light"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0.4 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: [0.4, 1, 0.4] }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }
        />
        <span className="whitespace-nowrap text-[8px] font-medium uppercase tracking-[0.15em] text-white/50 lg:text-[10px] lg:tracking-[0.25em]">
          Live monitoring
        </span>
      </div>
    </div>
  );
}
