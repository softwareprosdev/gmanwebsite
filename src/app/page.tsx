import { Hero } from "@/components/sections/Hero";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { BookingSection } from "@/components/sections/BookingSection";

export default function Home() {
  return (
    <div className="animate-fade-in">
      <Hero />
      <ServicesSection />
      <PortfolioSection />
      <BookingSection />

      {/* Decorative bottom element */}
      <div className="relative h-32 overflow-hidden bg-black border-t border-blue-900/30">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(30,58,95,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(30,58,95,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>
    </div>
  );
}
