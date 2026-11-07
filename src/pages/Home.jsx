import { useEffect } from "react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import Hero from "../components/home/Hero";
import PressStrip from "../components/home/PressStrip";
import StatsBand from "../components/home/StatsBand";
import HowItWorks from "../components/home/HowItWorks";
import Insights from "../components/home/Insights";
import Blueprint from "../components/home/Blueprint";
import Ranking from "../components/home/Ranking";
import Historical from "../components/home/Historical";
import Certificate from "../components/home/Certificate";
import Training from "../components/home/Training";
import Library from "../components/home/Library";
import Reviews from "../components/home/Reviews";
import Pricing from "../components/home/Pricing";
import Faq from "../components/home/Faq";
import Cta from "../components/home/Cta";

export default function Home() {
  useEffect(() => {
    document.title = "yourIQ";
  }, []);

  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <PressStrip />
        <StatsBand />
        <HowItWorks />
        <Insights />
        <Blueprint />
        <Ranking />
        <Historical />
        <Certificate />
        <Training />
        <Library />
        <Reviews />
        <Pricing />
        <Faq />
        <Cta />
      </main>
      <SiteFooter />
    </>
  );
}
