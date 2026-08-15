import AnalyticsTracker from "@/components/AnalyticsTracker";
import ContactCta from "@/components/ContactCta";
import DifferenceGallery from "@/components/DifferenceGallery";
import Footer from "@/components/Footer";
import GlobalReach from "@/components/GlobalReach";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Insights from "@/components/Insights";
import MediaBand from "@/components/MediaBand";
import MobileCta from "@/components/MobileCta";
import Proof from "@/components/Proof";
import ScrollProgress from "@/components/ScrollProgress";
import WhatWeDo from "@/components/WhatWeDo";

export default function Home() {
  return (
    <>
      <AnalyticsTracker />
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <DifferenceGallery />
        <MediaBand
          src="/media/band-1.jpg"
          alt="City skyline at dusk"
          label="Global by design"
        />
        <WhatWeDo />
        <GlobalReach />
        <Proof />
        <MediaBand
          src="/media/band-2.jpg"
          alt="Golden Gate Bridge and the San Francisco skyline"
          label="Partner-led, worldwide"
        />
        <Insights />
        <ContactCta />
      </main>
      <Footer />
      <MobileCta />
    </>
  );
}
