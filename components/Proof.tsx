"use client";

import FadeIn from "@/components/FadeIn";

export default function Proof() {
  return (
    <section className="border-t border-line bg-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-teal">
            Client testimonial — reserved
          </p>
          <blockquote className="mt-8 text-2xl font-light leading-snug text-ink/50 md:text-3xl">
            Real client testimonial to be inserted — this space is reserved
            for an attributed quote and will not ship with invented copy.
          </blockquote>
          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-grey">
            Role and sector attribution to follow
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
