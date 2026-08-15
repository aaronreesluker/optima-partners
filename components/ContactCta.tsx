"use client";

import FadeIn from "@/components/FadeIn";
import { trackEvent } from "@/lib/analytics";

export default function ContactCta() {
  return (
    <section id="contact" className="border-t border-line bg-white py-32 md:py-44">
      <div className="mx-auto max-w-6xl px-6 text-center md:px-10">
        <FadeIn>
          <h2 className="text-4xl font-medium tracking-tight text-ink md:text-6xl">
            Partner with confidence.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-grey md:text-lg">
            Speak with a partner about your firm&apos;s regulatory and cybersecurity
            risk profile.
          </p>
          <div className="mt-10">
            <a
              href="mailto:enquiries@example.com?subject=Consultation%20request"
              onClick={() => trackEvent("cta_footer_primary")}
              className="cursor-pointer inline-block rounded-full bg-ink px-8 py-4 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-ink/85 active:translate-y-0 motion-reduce:transform-none"
            >
              Request a Consultation
            </a>
          </div>
          <a
            href="mailto:enquiries@example.com?subject=Consultation%20request"
            onClick={() => trackEvent("cta_footer_secondary")}
            className="mt-6 block cursor-pointer text-sm text-grey underline decoration-line underline-offset-4 transition-colors duration-200 hover:text-teal hover:decoration-teal"
          >
            Email the Team
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
