"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

type MediaBandProps = {
  src: string;
  alt: string;
  label?: string;
};

export default function MediaBand({ src, alt, label }: MediaBandProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);

  return (
    <section className="bg-white py-6 md:py-10">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div
          ref={ref}
          className="relative overflow-hidden rounded-[24px] border border-line aspect-[4/3] sm:aspect-[21/9]"
        >
          <motion.div
            className="absolute inset-0"
            style={
              reduceMotion
                ? { scale: 1 }
                : { scale: 1.2, y }
            }
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(min-width: 1152px) 1104px, 100vw"
              className="object-cover"
            />
          </motion.div>
          {label ? (
            <span className="absolute bottom-5 left-5 rounded-full bg-ink/55 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-white backdrop-blur">
              {label}
            </span>
          ) : null}
        </div>
      </div>
    </section>
  );
}
