import HeroSection from "./HeroSection";
import Benefits from "./Benefits";
import Faq from "./Faq";
import LastCallToAction from "./LastCallToAction";
import Footer from "./Footer";

import HrDivider from "../UI/HrDivider";

const LandingPage = () => {
  return (
    <section>
      <HeroSection />
      <HrDivider marginY="10" />
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
