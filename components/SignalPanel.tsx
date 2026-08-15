"use client";

import { Activity, Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export default function SignalPanel() {
  const reduceMotion = useReducedMotion();

  const notificationInitial = reduceMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 16 };
  const notificationTransition = {
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
      className="relative aspect-[4/3] w-full overflow-hidden rounded-[24px] border border-line bg-mist sm:aspect-[16/7]"
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
              d="M -6 0 L 6 0 M 0 -6 L 0 6"
              stroke="#151817"
              strokeOpacity={0.1}
              strokeWidth={1}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#signal-grid)" />
      </svg>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at center, transparent 55%, #F6F7F7 100%)",
        }}
      />

      <motion.div
        className="absolute left-[8%] top-[26%] w-[230px] rounded-xl border border-line bg-white p-4 shadow-lg shadow-ink/[0.06] sm:left-[16%] sm:top-[30%] sm:w-[280px]"
        initial={notificationInitial}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={notificationTransition}
      >
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <div className="flex items-center gap-2">
            <Activity size={16} strokeWidth={1.5} className="text-teal" />
            <span className="text-sm font-medium text-ink">
              Regulatory signal
            </span>
          </div>
          <p className="mt-2 text-sm text-grey">
            Change detected — assessment in progress…
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute right-[8%] top-[18%] flex items-center gap-2 rounded-full border border-line bg-white px-3 py-2 shadow-md shadow-ink/[0.05] sm:right-[16%] sm:top-[22%]"
        initial={chipInitial}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={chipTransition}
      >
        <motion.div
          className="flex items-center gap-2"
          animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal">
            <Check size={12} strokeWidth={2.5} className="text-white" />
          </span>
          <span className="text-xs font-medium text-ink">
            Examination ready
          </span>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-[14%] left-[18%] flex h-12 w-12 items-center justify-center rounded-lg bg-teal/10 sm:bottom-[18%] sm:left-[26%]">
        <span className="h-2.5 w-2.5 rounded-full bg-teal" />
        {!reduceMotion && (
          <motion.span
            className="absolute h-2.5 w-2.5 rounded-full bg-teal"
            animate={{ scale: [1, 2.6], opacity: [0.45, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </div>
    </div>
  );
}
