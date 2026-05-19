import LiveMessage from "@/components/liveMessage/LiveMessage";
import HeroSection from "@/components/heroSection/HeroSection";
import CtaSection from "@/components/ctaSection/CtaSection";

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
        {/* CTA section */}
        <CtaSection />
      </>
    </>
  );
}