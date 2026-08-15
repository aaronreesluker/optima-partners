"use client";

import FadeIn from "@/components/FadeIn";
import { trackEvent } from "@/lib/analytics";

type InsightCard = {
  tag: string;
  headline: string;
};

const INSIGHTS: InsightCard[] = [
  { tag: "Alert", headline: "Placeholder — regulatory alert headline" },
  { tag: "Article", headline: "Placeholder — published article headline" },
  { tag: "Event", headline: "Placeholder — upcoming event listing" },
];

export default function Insights() {
  return (
    <section id="insights" className="border-t border-line bg-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-teal">
              05 — Insights
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="mt-4 text-3xl font-medium tracking-tight text-ink md:text-5xl">
              Current regulatory thinking
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-grey">
              Populated from the live insights feed at launch — the entries
              below are placeholders, not published alerts.
            </p>
          </FadeIn>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {INSIGHTS.map((item, index) => (
            <FadeIn key={item.tag} delay={index * 0.12}>
              <div className="flex h-full flex-col rounded-[20px] border border-line bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-ink/25 hover:shadow-lg hover:shadow-ink/[0.05] motion-reduce:transform-none">
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-teal">
                  {item.tag}
                </p>
                <h3 className="mt-4 text-lg font-medium leading-snug text-ink">
                  {item.headline}
                </h3>
                <p className="mt-3 text-sm text-grey">Date to follow</p>
                <div className="mt-auto pt-6">
                  <a
                    href="#insights"
                    onClick={(e) => {
                      e.preventDefault();
                      trackEvent("insight_card_click", { headline: item.headline });
                    }}
                    className="cursor-pointer text-sm font-medium text-ink underline decoration-line underline-offset-4 transition-colors duration-200 hover:text-teal hover:decoration-teal"
                  >
                    Read more
                  </a>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
