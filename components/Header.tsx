"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "@/components/Logo";
import { trackEvent } from "@/lib/analytics";

const NAV_ITEMS = [
  { id: "approach", label: "Approach" },
  { id: "services", label: "Services" },
  { id: "global-reach", label: "Global Reach" },
  { id: "insights", label: "Insights" },
] as const;

// Scrollspy watches these plus #contact so the active state clears once the
// visitor reaches the contact band, instead of leaving "Insights" active.
const OBSERVED_IDS = [...NAV_ITEMS.map((item) => item.id), "contact"];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const targets = OBSERVED_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-96px 0px -55% 0px", threshold: 0 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToTop = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileOpen(false);
  };

  const handleCtaClick = () => {
    trackEvent("nav_cta_click");
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-20 w-full border-b bg-white/85 backdrop-blur transition-colors duration-300 ${
        scrolled ? "border-line" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6 md:px-10">
        <a
          href="#"
          onClick={scrollToTop}
          aria-label="Optima — back to top"
          className="cursor-pointer"
        >
          <Logo />
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`cursor-pointer text-sm transition-colors duration-200 ${
                activeId === item.id
                  ? "font-medium text-ink"
                  : "text-grey hover:text-ink"
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={handleCtaClick}
            className="cursor-pointer rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-ink/80"
          >
            Request a Consultation
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="cursor-pointer text-ink md:hidden"
        >
          {mobileOpen ? (
            <X size={24} aria-hidden="true" />
          ) : (
            <Menu size={24} aria-hidden="true" />
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-b border-line bg-white md:hidden">
          <nav
            className="flex flex-col gap-6 px-6 py-8"
            aria-label="Mobile primary"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMobileOpen(false)}
                className={`cursor-pointer text-base transition-colors duration-200 ${
                  activeId === item.id
                    ? "font-medium text-ink"
                    : "text-grey hover:text-ink"
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={handleCtaClick}
              className="cursor-pointer block rounded-full bg-ink px-5 py-2.5 text-center text-sm font-medium text-white transition-colors duration-200 hover:bg-ink/80"
            >
              Request a Consultation
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
