import {
  Briefcase,
  Building,
  Handshake,
  Landmark,
  LineChart,
  Rocket,
  type LucideIcon,
} from "lucide-react";

import FadeIn from "@/components/FadeIn";

type ClientType = {
  title: string;
  body: string;
  icon: LucideIcon;
};

const CLIENT_TYPES: ClientType[] = [
  {
    title: "Private Equity",
    body: "Regulatory registration, compliance programme design and portfolio company risk assessments for private equity sponsors.",
    icon: Landmark,
  },
  {
    title: "Hedge Funds",
    body: "Compliance advisory and examination readiness for hedge fund managers navigating registration, reporting and evolving regulatory expectations.",
    icon: LineChart,
  },
  {
    title: "Venture Capital",
    body: "Practical compliance support for venture capital firms balancing lean operating models with regulatory obligations as they scale.",
    icon: Rocket,
  },
  {
    title: "Real Estate Funds",
    body: "Compliance programme design and ongoing oversight for real estate fund managers operating across multiple jurisdictions and investor bases.",
    icon: Building,
  },
  {
    title: "Asset Managers & Investment Advisors",
    body: "Outsourced CCO services and ongoing programme management for asset managers and investment advisors, backed by former regulators and compliance officers.",
    icon: Briefcase,
  },
  {
    title: "Broker-Dealers",
    body: "Registration, supervisory and cybersecurity support for broker-dealers operating under regulatory regimes including the SEC and FCA.",
    icon: Handshake,
  },
];

export default function WhoWeServe() {
  return (
    <section
      id="who-we-serve"
      className="border-t border-line bg-white py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand">
              03 — Who We Serve
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="mt-4 text-3xl font-medium tracking-tight text-ink md:text-5xl">
              Serving financial institutions globally
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-grey md:text-lg">
              From large investment managers to boutique firms and new
              market entrants, Optima is retained by financial institutions
              that need regulatory and cybersecurity expertise they can rely
              on.
            </p>
          </FadeIn>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CLIENT_TYPES.map((client, index) => {
            const Icon = client.icon;
            return (
              <FadeIn key={client.title} delay={index * 0.12}>
                <div className="h-full rounded-[20px] border border-line p-8 transition-all duration-300 hover:-translate-y-1 hover:border-ink/25 hover:shadow-lg hover:shadow-ink/[0.05] motion-reduce:transform-none">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-mist">
                    <Icon
                      aria-hidden="true"
                      size={22}
                      strokeWidth={1.5}
                      className="text-ink"
                    />
                  </div>
                  <h3 className="mt-6 text-xl font-medium text-ink md:text-2xl">
                    {client.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-grey md:text-base">
                    {client.body}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
