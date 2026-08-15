"use client";

import { FileCheck2, ShieldCheck, type LucideIcon } from "lucide-react";

import FadeIn from "@/components/FadeIn";

type ServiceCard = {
  title: string;
  body: string;
  items: string[];
  icon: LucideIcon;
};

const CARDS: ServiceCard[] = [
  {
    title: "Regulatory Compliance",
    body: "From first registration to ongoing examination readiness, we build compliance programmes that stand up to regulator scrutiny — and to the way your firm actually operates.",
    items: [
      "Registration and licensing",
      "Compliance programme design",
      "Examination readiness",
      "AML and financial crime frameworks",
    ],
    icon: FileCheck2,
  },
  {
    title: "Cybersecurity",
    body: "Security postures assessed against regulatory expectations, not generic benchmarks — with incident response and governance frameworks that satisfy both your security team and your examiner.",
    items: [
      "Risk assessment against regulatory expectations",
      "Incident response planning",
      "Security governance frameworks",
      "Examiner-ready reporting",
    ],
    icon: ShieldCheck,
  },
];

export default function WhatWeDo() {
  return (
    <section id="services" className="border-t border-line bg-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-teal">
              02 — What We Do
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="mt-4 text-3xl font-medium tracking-tight text-ink md:text-5xl">
              Two disciplines, one standard of scrutiny
            </h2>
          </FadeIn>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {CARDS.map((card, index) => {
            const Icon = card.icon;
            return (
              <FadeIn key={card.title} delay={index * 0.12}>
                <div className="h-full rounded-[20px] border border-line p-8 transition-all duration-300 hover:-translate-y-1 hover:border-ink/25 hover:shadow-lg hover:shadow-ink/[0.05] motion-reduce:transform-none md:p-12">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-mist">
                    <Icon aria-hidden="true" size={22} strokeWidth={1.5} className="text-ink" />
                  </div>
                  <h3 className="mt-6 text-xl font-medium text-ink md:text-2xl">
                    {card.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-grey md:text-base">
                    {card.body}
                  </p>
                  <ul className="mt-6 space-y-2.5">
                    {card.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-teal"
                        />
                        <span className="text-sm text-grey">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className="mt-8 inline-block cursor-pointer text-sm font-medium text-ink underline decoration-line underline-offset-4 transition-colors duration-200 hover:text-teal hover:decoration-teal"
                  >
                    Learn more
                  </a>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
