import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found — Optima Partners",
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center">
      <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand">
        404
      </p>
      <h1 className="mt-6 text-4xl md:text-6xl font-medium tracking-tight text-ink">
        This page is off the record.
      </h1>
      <p className="mt-6 text-base md:text-lg text-grey">
        The page you are looking for does not exist or has been moved.
      </p>
      <a
        href="/"
        className="mt-10 inline-block rounded-full bg-navy px-7 py-3.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-navy/85 cursor-pointer"
      >
        Back to home
      </a>
    </main>
  );
}
