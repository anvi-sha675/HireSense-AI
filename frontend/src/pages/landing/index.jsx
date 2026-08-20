import { Hero } from "@/components/landing/hero";
import { LogoStrip } from "@/components/landing/logo-strip";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { AiCapabilities } from "@/components/landing/ai-capabilities";
import { Testimonials } from "@/components/landing/testimonials";
import { Pricing } from "@/components/landing/pricing";
import { Faq } from "@/components/landing/faq";
import { FinalCta } from "@/components/landing/cta";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <LogoStrip />
      <Features />
      <HowItWorks />
      <AiCapabilities />
      <Testimonials />
      <Pricing />
      <Faq />
      <FinalCta />
    </>
  );
}
