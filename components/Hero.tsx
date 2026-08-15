"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import FadeIn from "@/components/FadeIn";
import HeroBackdrop from "@/components/HeroBackdrop";
import { trackEvent } from "@/lib/analytics";

const HEADLINE = "Regulatory confidence for institutions that cannot afford ambiguity.";
const REGULATORS = ["SEC", "FCA", "NFA", "CFTC"];

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const words = HEADLINE.split(" ");

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-white">
      <HeroBackdrop />
      <div className="relative z-10 mx-auto w-full min-w-0 max-w-6xl px-6 text-center md:px-10">
        <FadeIn immediate>
          <p className="text-xs font-medium tracking-[0.25em] uppercase text-teal">
            Regulatory &amp; Cybersecurity Advisory
          </p>
        </FadeIn>

        <h1 className="mx-auto mt-6 max-w-4xl text-5xl font-medium tracking-tight leading-[1.05] text-ink md:text-7xl">
          <span className="sr-only">{HEADLINE}</span>
          <span aria-hidden="true">
            {words.map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                className="inline-block whitespace-pre"
                initial={
                  reduceMotion
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : { opacity: 0, y: 18, filter: "blur(8px)" }
                }
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: reduceMotion ? 0 : 0.5,
                  ease: "easeOut",
                  delay: reduceMotion ? 0 : 0.12 + index * 0.05,
                }}
              >
                {word}
                {index < words.length - 1 ? " " : ""}
              </motion.span>
            ))}
          </span>
        </h1>

        <FadeIn immediate delay={0.45}>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-grey md:text-lg">
            Bespoke regulatory compliance and cybersecurity solutions for investment
            managers, boutique firms and new market entrants — every engagement
            overseen by a Partner with significant regulatory experience, commercial
            acumen and sector-specific expertise.
          </p>
        </FadeIn>

        <FadeIn immediate delay={0.55}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href="#contact"
              onClick={() => trackEvent("cta_hero_primary")}
              className="cursor-pointer rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-ink/85 active:translate-y-0 motion-reduce:transform-none"
            >
              Request a Consultation
            </a>
            <a
              href="#approach"
              onClick={() => trackEvent("cta_hero_secondary")}
              className="cursor-pointer rounded-full border border-line px-7 py-3.5 text-sm font-medium text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/40 active:translate-y-0 motion-reduce:transform-none"
            >
              Explore Our Approach
            </a>
          </div>
        </FadeIn>

        <FadeIn immediate delay={0.75}>
          <div className="mx-auto mt-16 max-w-xl border-t border-line pt-6">
            <p className="text-xs tracking-[0.2em] uppercase text-grey">
              Engaged with regulators including
            </p>
            {reduceMotion ? (
              <p className="mt-4 text-sm font-medium tracking-[0.3em] text-ink/60">
                SEC · FCA · NFA · CFTC
              </p>
            ) : (
              <div className="relative mt-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
                <motion.div
                  className="flex w-max"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ duration: 24, ease: "linear", repeat: Infinity }}
                >
                  {[0, 1].map((copy) => (
                    <div
                      key={copy}
                      className="flex items-center"
                      aria-hidden={copy === 1}
                    >
                      {REGULATORS.map((name) => (
                        <span
                          key={`${copy}-${name}`}
                          className="mx-6 flex items-center gap-6 text-sm font-medium tracking-[0.3em] text-ink/60"
                        >
                          {name}
                          <span
                            aria-hidden="true"
                            className="h-1 w-1 rounded-full bg-teal/60"
                          />
                        </span>
                      ))}
                    </div>
                  ))}
                </motion.div>
              </div>
            )}
          </div>
        </FadeIn>
      </div>

      <motion.a
        href="#approach"
        aria-label="Scroll to explore our approach"
        className="absolute bottom-6 left-1/2 z-10 hidden cursor-pointer text-grey transition-colors duration-200 hover:text-ink md:block"
        style={{ x: "-50%" }}
        animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
        transition={
          reduceMotion
            ? undefined
            : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <ChevronDown size={20} strokeWidth={1.5} aria-hidden="true" />
      </motion.a>
    </section>
  );
}
