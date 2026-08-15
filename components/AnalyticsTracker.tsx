"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

const DEPTHS = [25, 50, 75, 100] as const;

export default function AnalyticsTracker() {
  useEffect(() => {
    const start = Date.now();
    const fired = new Set<number>();

    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const percent = (window.scrollY / scrollable) * 100;
      for (const depth of DEPTHS) {
        if (percent >= depth && !fired.has(depth)) {
          fired.add(depth);
          trackEvent("scroll_depth", { percent: depth });
        }
      }
    };

    const onPageHide = () => {
      trackEvent("time_on_page", {
        seconds: Math.round((Date.now() - start) / 1000),
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pagehide", onPageHide);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pagehide", onPageHide);
    };
  }, []);

  return null;
}
