import { Hero } from "@/components/sections/Hero";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { BookingSection } from "@/components/sections/BookingSection";
import Link from "next/link";

export default function Home() {
  return (
    <div className="animate-fade-in">
      <Hero />
      <ServicesSection />
      <PortfolioSection />
      <BookingSection />

      {/* Admin Login Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <Link href="/admin/login">
            <div className="led-border cursor-pointer group">
              <div className="led-border-inner bg-[#1e3a5f] px-8 py-4 flex items-center space-x-3 hover:bg-[#2a5080] transition-colors duration-300">
                <svg className="w-5 h-5 text-[#d4a017]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="text-white font-bold text-lg tracking-wide group-hover:text-[#d4a017] transition-colors duration-300">
                  Admin Login
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Decorative bottom element */}
      <div className="relative h-32 overflow-hidden bg-black border-t border-blue-900/30">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(30,58,95,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(30,58,95,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>
    </div>
  );
}
