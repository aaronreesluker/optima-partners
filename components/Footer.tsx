import { Mail } from "lucide-react";
import Logo from "@/components/Logo";

// lucide-react dropped brand glyphs, so the LinkedIn mark is inlined here.
function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

const NAV_ITEMS = [
  { id: "approach", label: "Approach" },
  { id: "services", label: "Services" },
  { id: "global-reach", label: "Global Reach" },
  { id: "insights", label: "Insights" },
  { id: "contact", label: "Contact" },
] as const;

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white pt-16 pb-28 md:pb-16">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <Logo />

          <nav
            className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8"
            aria-label="Footer"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="cursor-pointer text-sm text-grey transition-colors duration-200 hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#"
              aria-label="LinkedIn"
              className="cursor-pointer text-grey transition-colors duration-200 hover:text-ink"
            >
              <LinkedInIcon size={18} />
            </a>
            <a
              href="mailto:enquiries@example.com"
              aria-label="Email Optima Partners"
              className="cursor-pointer text-grey transition-colors duration-200 hover:text-ink"
            >
              <Mail size={18} strokeWidth={1.5} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 text-xs text-grey/80 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-6">
            <a
              href="#"
              className="cursor-pointer transition-colors duration-200 hover:text-ink"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="cursor-pointer transition-colors duration-200 hover:text-ink"
            >
              Terms of Use
            </a>
          </div>

          <p>© 2026 Optima Partners. All rights reserved.</p>
        </div>

        <p className="mt-4 text-xs text-grey/60">
          Concept build by{" "}
          <a
            href="https://revivemarketing.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer underline underline-offset-2 transition-colors duration-200 hover:text-ink"
          >
            Revive Marketing Management
          </a>{" "}
          — not a live Optima Partners property.
        </p>
      </div>
    </footer>
  );
}
