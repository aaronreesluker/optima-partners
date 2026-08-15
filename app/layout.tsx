import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Optima Partners",
  description:
    "Bespoke regulatory compliance and cybersecurity counsel for asset managers, boutique firms and new market entrants.",
  serviceType: ["Regulatory Compliance Consulting", "Cybersecurity Advisory"],
  areaServed: ["United Kingdom", "United States"],
  knowsAbout: [
    "SEC",
    "FCA",
    "NFA",
    "CFTC",
    "AML and financial crime frameworks",
    "Cybersecurity governance",
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://optima-concept.revivemarketing.uk"),
  title: "Optima Partners — Regulatory & Cybersecurity Advisory",
  description:
    "Bespoke compliance and cybersecurity counsel for asset managers, boutique firms and new market entrants, led by partners with regulator-side experience across the SEC, FCA, NFA and CFTC.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Optima Partners — Regulatory & Cybersecurity Advisory",
    description:
      "Regulatory confidence for institutions who cannot afford ambiguity.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} bg-white font-body text-ink antialiased`}
      >
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        {GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
