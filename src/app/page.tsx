
import { HeroSection } from "@/components/HeroSection";
import { ProblemSection } from "@/components/ProblemSection";
import { SolutionSection } from "@/components/SolutionSection";
import { ProductsSection } from "@/components/ProductsSection";
import { WhyBisaraSection } from "@/components/WhyBisaraSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { FinalCTASection } from "@/components/FinalCTASection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <ProductsSection />
      <WhyBisaraSection />
      <HowItWorksSection />
      <FinalCTASection />
      <Footer />
    </main>
  );
}
