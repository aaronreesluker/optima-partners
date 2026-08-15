"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";

export default function MobileCta() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const target = document.getElementById("contact");
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  if (hidden) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/90 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur md:hidden">
      <a
        href="#contact"
        onClick={() => trackEvent("cta_mobile_sticky")}
        className="block w-full cursor-pointer rounded-full bg-ink py-3.5 text-center text-sm font-medium text-white transition-colors duration-200 hover:bg-ink/80"
      >
        Request a Consultation
      </a>
    </div>
  );
}
