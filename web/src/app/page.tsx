import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { Services } from "@/components/sections/Services";
import { WhyATW } from "@/components/sections/WhyATW";
import { Team } from "@/components/sections/Team";
import { CTABand } from "@/components/ui/CTABand";

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Solution />
      <Services />
      <WhyATW />
      <Team />
      <CTABand title="Secure your organization today." href="/contact" cta="Request a quote" />
    </>
  );
}
