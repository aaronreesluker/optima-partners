type LogoProps = {
  className?: string;
};

// Recreated from Optima's current mark: gradient ring + letterspaced navy
// wordmark. Swap the ring SVG for the official logo asset when supplied.
export default function Logo({ className }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <svg viewBox="0 0 32 32" className="h-7 w-7 shrink-0" aria-hidden="true">
        <defs>
          <linearGradient id="optima-ring" x1="15%" y1="90%" x2="85%" y2="10%">
            <stop offset="0%" stopColor="#0E4A44" />
            <stop offset="55%" stopColor="#1E8A6E" />
            <stop offset="100%" stopColor="#47C492" />
          </linearGradient>
        </defs>
        <circle
          cx="16"
          cy="16"
          r="11"
          fill="none"
          stroke="url(#optima-ring)"
          strokeWidth="8.5"
        />
      </svg>
      <span className="text-sm font-semibold uppercase tracking-[0.35em] text-[#212B5F]">
        Optima
      </span>
    </span>
  );
}
