import LiveMessage from "@/components/liveMessage/LiveMessage";
import HeroSection from "@/components/heroSection/HeroSection";
import CtaSection from "@/components/ctaSection/CtaSection";
import WhyStudyNook from "@/components/whyStudyNook/WhyStudyNook";
import HowItWork from "@/components/howItWork/HowItWork";

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
        {/* How it work */}
        <HowItWork />
      </>
      <>
        {/* CTA section */}
        <CtaSection />
      </>
    </>
  );
}