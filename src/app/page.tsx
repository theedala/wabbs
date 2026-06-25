import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Bento } from "@/components/sections/Bento";
import { ProductFeatures } from "@/components/sections/ProductFeatures";
import { Problem } from "@/components/sections/Problem";
import { WhyATW } from "@/components/sections/WhyATW";
import { Team } from "@/components/sections/Team";
import { Terminal } from "@/components/sections/Terminal";
import { Pricing } from "@/components/sections/Pricing";
import { News } from "@/components/sections/News";
import { FAQ } from "@/components/sections/FAQ";
import { Newsletter } from "@/components/sections/Newsletter";
import { CTABand } from "@/components/ui/CTABand";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Bento />
      <ProductFeatures />
      <Problem />
      <WhyATW />
      <Team />
      <Terminal />
      <Pricing />
      <News />
      <FAQ />
      <CTABand title="Secure your organization today." href="/contact" cta="Get protected" />
      <Newsletter />
    </>
  );
}
