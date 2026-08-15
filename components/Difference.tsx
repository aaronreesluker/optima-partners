"use client";

import { useEffect, useRef, useState } from "react";
import {
  SlidersHorizontal,
  TrendingUp,
  UserCheck,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import FadeIn from "@/components/FadeIn";

type DifferenceCard = {
  title: string;
  body: string;
  icon: LucideIcon;
};

const CARDS: DifferenceCard[] = [
  {
    title: "Led by Experience",
    body: "Every client engagement is overseen by one of our Partners, bringing significant regulatory experience, commercial acumen and sector-specific expertise to every stage. Nothing is handed down to a junior team to run at arm’s length.",
    icon: UserCheck,
  },
  {
    title: "Tailored Solutions",
    body: "Strategic regulatory compliance and cybersecurity solutions, designed specifically for your regulatory risk profile and operating model. There is no templated compliance package on our shelf.",
    icon: SlidersHorizontal,
  },
  {
    title: "Proactive by Design",
    body: "Leveraging our network and industry intelligence, we monitor the evolution of the regulatory environment and engage clients early. By the time an expectation hardens into an examination question, our clients are already ahead of the curve.",
    icon: TrendingUp,
  },
];

export default function Difference() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const driftX = useTransform(scrollYProgress, [0, 1], [-170, 70]);
  const applyDrift = isDesktop && !reduceMotion;

  return (
    <section
      ref={sectionRef}
      id="approach"
      className="overflow-hidden border-t border-line bg-white py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand">
              01 — The Optima Difference
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="mt-4 text-3xl font-medium tracking-tight text-ink md:text-5xl">
              Why institutions retain us
            </h2>
          </FadeIn>
        </div>

        <motion.div
          className="mt-16 grid gap-6 md:flex md:gap-8"
          style={applyDrift ? { x: driftX } : undefined}
        >
          {CARDS.map((card, index) => {
            const Icon = card.icon;
            return (
              <FadeIn
                key={card.title}
                delay={index * 0.12}
                className="md:w-[460px] md:shrink-0"
              >
                <div className="h-full rounded-[20px] border border-line p-8 transition-all duration-300 hover:-translate-y-1 hover:border-ink/25 hover:shadow-lg hover:shadow-ink/[0.05] motion-reduce:transform-none md:p-12">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-mist">
                    <Icon aria-hidden="true" size={24} strokeWidth={1.5} className="text-ink" />
                  </div>
                  <h3 className="mt-8 text-xl font-medium text-ink md:text-2xl">
                    {card.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-grey md:text-lg">
                    {card.body}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
