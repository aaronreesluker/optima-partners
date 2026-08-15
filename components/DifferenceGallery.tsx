"use client";

import { useEffect, useRef, useState } from "react";
import {
  SlidersHorizontal,
  TrendingUp,
  UserCheck,
  type LucideIcon,
} from "lucide-react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import FadeIn from "@/components/FadeIn";

type DifferenceCard = {
  title: string;
  body: string;
  icon: LucideIcon;
};

type NumberedCard = DifferenceCard & { number: string };

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

const NUMBERED_CARDS: NumberedCard[] = CARDS.map((card, index) => ({
  ...card,
  number: String(index + 1).padStart(2, "0"),
}));

// Row travels left-to-right across the pinned frame, so the DOM order is
// reversed: "Led by Experience" (pillar 01) is the first card the visitor
// sees enter from the right.
const REVERSED_CARDS: NumberedCard[] = [...NUMBERED_CARDS].reverse();

function DifferenceCardPanel({
  card,
  sizeClassName,
}: {
  card: NumberedCard;
  sizeClassName: string;
}) {
  const Icon = card.icon;
  return (
    <div
      className={`${sizeClassName} rounded-[24px] border border-line bg-white p-10 transition-all duration-300 hover:-translate-y-1 hover:border-ink/25 hover:shadow-lg hover:shadow-ink/[0.05] motion-reduce:transform-none md:p-14`}
    >
      <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand">
        {card.number}
      </p>
      <div className="mt-6 flex h-16 w-16 items-center justify-center rounded-full bg-mist">
        <Icon aria-hidden="true" size={26} strokeWidth={1.5} className="text-ink" />
      </div>
      <h3 className="mt-8 text-2xl font-medium text-ink md:text-3xl">{card.title}</h3>
      <p className="mt-5 text-base leading-relaxed text-grey md:text-lg">{card.body}</p>
    </div>
  );
}

function GalleryHeader() {
  return (
    <div className="mx-auto mb-14 max-w-2xl text-center">
      <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand">
        01 — The Optima Difference
      </p>
      <h2 className="mt-4 text-3xl font-medium tracking-tight text-ink md:text-5xl">
        Why institutions retain us
      </h2>
    </div>
  );
}

// The pinned variant lives in its own component so useScroll initialises with
// the section ref already attached — mounting it conditionally from the parent
// would otherwise leave the scroll tracker bound to a null target forever.
function PinnedGallery() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const rowRef = useRef<HTMLDivElement | null>(null);
  const [startX, setStartX] = useState(0);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    function measure() {
      const viewport = viewportRef.current;
      const row = rowRef.current;
      if (!viewport || !row) return;
      setStartX(Math.min(0, viewport.clientWidth - row.scrollWidth));
    }

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const x = useTransform(scrollYProgress, [0.12, 0.88], [startX, 0], {
    clamp: true,
  });
  const xSpring = useSpring(x, { stiffness: 120, damping: 28, mass: 0.5 });

  const progress = useTransform(scrollYProgress, [0.12, 0.88], [0, 1], {
    clamp: true,
  });
  const progressSpring = useSpring(progress, {
    stiffness: 140,
    damping: 30,
    mass: 0.4,
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const travelled = Math.min(1, Math.max(0, (value - 0.12) / 0.76));
    setActive(travelled < 0.34 ? 0 : travelled < 0.67 ? 1 : 2);
  });

  const activeNumber = String(active + 1).padStart(2, "0");

  return (
    <section
      ref={sectionRef}
      id="approach"
      className="relative border-t border-line bg-white"
      style={{ height: "320vh" }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <GalleryHeader />

        <div ref={viewportRef} className="px-6 md:px-10">
          <motion.div ref={rowRef} className="flex gap-8" style={{ x: xSpring }}>
            {REVERSED_CARDS.map((card, reversedIndex) => {
              const pillarIndex = REVERSED_CARDS.length - 1 - reversedIndex;
              const isActive = pillarIndex === active;
              return (
                <motion.div
                  key={card.title}
                  className="w-[560px] shrink-0 xl:w-[620px]"
                  animate={{
                    scale: isActive ? 1 : 0.96,
                    opacity: isActive ? 1 : 0.55,
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 30 }}
                >
                  <DifferenceCardPanel card={card} sizeClassName="h-full w-full" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <div className="mx-auto mt-12 flex w-full max-w-6xl items-center gap-6 px-6 md:px-10">
          <p className="text-xs font-medium tracking-[0.25em]">
            <span className="text-ink">{activeNumber}</span>
            <span className="text-grey"> / 03</span>
          </p>
          <div className="h-px w-44 overflow-hidden rounded-full bg-line">
            <motion.div
              className="h-full w-full origin-left"
              style={{
                scaleX: progressSpring,
                backgroundImage: "linear-gradient(90deg, #0E4A44, #1E8A6E, #47C492)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function DifferenceGallery() {
  const reduceMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  if (isDesktop && !reduceMotion) {
    return <PinnedGallery />;
  }

  return (
    <section id="approach" className="border-t border-line bg-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <GalleryHeader />

        <div className="grid gap-6">
          {NUMBERED_CARDS.map((card, index) => (
            <FadeIn key={card.title} delay={index * 0.12}>
              <DifferenceCardPanel card={card} sizeClassName="w-full" />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
