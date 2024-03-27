import { useRef } from "react";

import HeroSection from "../components/LandingPageBlocks/HeroSection";
import Benefits from "../components/LandingPageBlocks/Benefits";
import Faq from "../components/LandingPageBlocks/Faq";
import LastCallToAction from "../components/LandingPageBlocks/LastCallToAction";
import Footer from "../components/LandingPageBlocks/Footer";

import HrDivider from "../components/UI/HrDivider";

const LandingPage = () => {
  const benefitsSectionRef = useRef();

  const scrollToBenefitsSection = () => {
    benefitsSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section>
      <HeroSection onScrollToBenefitsSection={scrollToBenefitsSection} />
      <HrDivider ref={benefitsSectionRef} marginY="10" />
      <Benefits />
      <HrDivider marginY="10" />
      <Faq />
      <HrDivider marginY="20" />
      <LastCallToAction />
      <HrDivider marginY="10" />
      <Footer />
    </section>
  );
};

export default LandingPage;