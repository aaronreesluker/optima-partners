"use client";

import {
  Building2,
  ClipboardCheck,
  Gavel,
  Rocket,
  ShieldCheck,
  UserCog,
  type LucideIcon,
} from "lucide-react";

import FadeIn from "@/components/FadeIn";
import SignalPanel from "@/components/SignalPanel";

type ServiceCard = {
  title: string;
  body: string;
  items: string[];
  icon: LucideIcon;
};

const CARDS: ServiceCard[] = [
  {
    title: "Pre-Launch and Launch Phase",
    body: "For firms entering a new market or launching a fund, we manage the registrations and authorisations that get you operating, and build the policies, risk assessments and governance that anchor a compliance programme from day one.",
    items: [
      "Regulatory registrations and authorisations",
      "Policies and procedures",
      "Risk assessments and governance",
      "Monitoring and testing plans",
    ],
    icon: Rocket,
  },
  {
    title: "Ongoing Compliance Solutions",
    body: "Once you are live, our advisory, monitoring and testing keep your programme current — spanning thematic and annual reviews, marketing material reviews, regulatory filings and tailored training.",
    items: [
      "Compliance advisory and programme oversight",
      "Monitoring, testing and surveillance",
      "Thematic and annual compliance reviews",
      "Regulatory filings and tailored training",
    ],
    icon: ClipboardCheck,
  },
  {
    title: "Regulatory Exams, Enforcement and Crisis Management",
    body: "We prepare firms for regulatory exams through mock testing, support them through live exams, reviews and enforcement matters, and provide remediation support in times of stress.",
    items: [
      "Mock regulatory exams",
      "Support during exams, reviews and enforcement matters",
      "Remediation support in times of stress",
    ],
    icon: Gavel,
  },
  {
    title: "Project-Based and Embedded Support",
    body: "From outsourced CCO services and secondments to regulatory change management and one-off projects, we embed the expertise you need — including compliance due diligence ahead of an acquisition or merger.",
    items: [
      "Outsourced CCO services",
      "Secondments",
      "Regulatory change management",
      "Pre-acquisition and merger compliance due diligence",
    ],
    icon: UserCog,
  },
  {
    title: "Cybersecurity, Risk and AI",
    body: "We assess cyber risk and security posture, test for vulnerabilities, and build the governance, policy and AI readiness frameworks that satisfy both your security team and your examiner.",
    items: [
      "Cyber risk assessments and security reviews",
      "Penetration testing and vulnerability assessments",
      "AI readiness assessments and governance reviews",
      "Incident response planning and tabletop exercises",
    ],
    icon: ShieldCheck,
  },
  {
    title: "Portfolio Company Cyber Programme",
    body: "For private equity and venture sponsors, we assess cyber risk across the portfolio, run penetration testing and remediation planning, and give sponsors the cross-portfolio visibility and reporting they need.",
    items: [
      "Cyber risk assessments and red flag diligence",
      "Penetration and security testing",
      "Remediation roadmaps",
      "Portfolio-wide visibility and sponsor reporting",
    ],
    icon: Building2,
  },
];

export default function WhatWeDo() {
  return (
    <section id="services" className="border-t border-line bg-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand">
              04 — What We Do
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="mt-4 text-3xl font-medium tracking-tight text-ink md:text-5xl">
              Six practice areas, one standard of scrutiny
            </h2>
          </FadeIn>
        </div>

        <FadeIn className="mt-16">
          <SignalPanel />
        </FadeIn>

        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                          className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                        />
                        <span className="text-sm text-grey">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className="mt-8 inline-block cursor-pointer text-sm font-medium text-ink underline decoration-line underline-offset-4 transition-colors duration-200 hover:text-brand-dark hover:decoration-brand"
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
