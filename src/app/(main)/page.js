import LiveMessage from "@/components/liveMessage/LiveMessage";
import HeroSection from "@/components/heroSection/HeroSection";
import CtaSection from "@/components/ctaSection/CtaSection";
import WhyStudyNook from "@/components/whyStudyNook/WhyStudyNook";

export default function HomePage () {
  return (
    <>
      <>
      {/* Live Message Section */}
      <LiveMessage />
      </>
      <>
      {/* Hero section */}
        <HeroSection />
      </>
      <>
        {/* Why study nook */}
        <WhyStudyNook />
      </>
      <>
        {/* CTA section */}
        <CtaSection />
      </>
    </>
  );
}