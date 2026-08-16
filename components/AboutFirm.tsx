import FadeIn from "@/components/FadeIn";

type FirmFact = {
  figure: string;
  label: string;
};

const FACTS: FirmFact[] = [
  { figure: "2014", label: "Year the firm was established" },
  { figure: "140+", label: "Professionals across key financial hubs worldwide" },
];

export default function AboutFirm() {
  return (
    <section id="about" className="border-t border-line bg-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand">
              02 — About Optima
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="mt-4 text-3xl font-medium tracking-tight text-ink md:text-5xl">
              Partner-led expertise since 2014
            </h2>
          </FadeIn>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-[1.6fr_1fr] md:gap-16">
          <FadeIn>
            <div className="space-y-6 text-base leading-relaxed text-grey md:text-lg">
              <p>
                Optima Partners is a regulatory compliance and cybersecurity
                consulting firm built for financial institutions that cannot
                afford ambiguity. Established in 2014, the firm has grown
                into a global practice with over 140 professionals located in
                key financial hubs worldwide, serving investment managers,
                hedge funds, private equity, private credit, broker-dealers,
                wealth managers and new market entrants.
              </p>
              <p>
                Optima&apos;s team comprises former senior regulators, chief
                compliance officers, lawyers, accountants and industry
                professionals, bringing first-hand insight into the demands
                of today&apos;s regulatory environment. Every engagement is
                overseen by one of the firm&apos;s Partners — never handed
                down to a junior team to run at arm&apos;s length — and
                supported by a wider bench of compliance and cybersecurity
                specialists.
              </p>
              <p>
                That partner-led model sets the standard of service:
                Optima&apos;s professionals work as an extension of a
                client&apos;s own team, prioritising the client&apos;s
                business interests above a templated compliance package, and
                holding every engagement to the firm&apos;s stated values of
                integrity, accountability, collaboration, agility and
                excellence.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="rounded-[20px] border border-line p-8 md:p-10">
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand">
                Firm facts
              </p>
              <div className="mt-6 divide-y divide-line">
                {FACTS.map((fact) => (
                  <div key={fact.label} className="py-6 first:pt-0 last:pb-0">
                    <p className="text-3xl font-medium text-ink md:text-4xl">
                      {fact.figure}
                    </p>
                    <p className="mt-2 text-sm text-grey">{fact.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
