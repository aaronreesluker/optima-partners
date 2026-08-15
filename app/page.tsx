import AnalyticsTracker from "@/components/AnalyticsTracker";
import ContactCta from "@/components/ContactCta";
import Difference from "@/components/Difference";
import Footer from "@/components/Footer";
import GlobalReach from "@/components/GlobalReach";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Insights from "@/components/Insights";
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
        <Difference />
        <WhatWeDo />
        <GlobalReach />
        <Proof />
        <Insights />
        <ContactCta />
      </main>
      <Footer />
      <MobileCta />
    </>
  );
}
