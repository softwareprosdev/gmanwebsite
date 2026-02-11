"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import Link from "next/link";

const portfolioItems = [
  {
    id: 1,
    title: "Kitchen Renovation",
    category: "Renovation",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    description: "Complete kitchen remodel with modern fixtures and finishes.",
  },
  {
    id: 2,
    title: "Bathroom Plumbing",
    category: "Plumbing",
    image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&q=80",
    description: "Full bathroom plumbing upgrade and fixture installation.",
  },
  {
    id: 3,
    title: "Electrical Panel Upgrade",
    category: "Electrical",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&q=80",
    description: "Upgraded electrical panel for improved safety and capacity.",
  },
  {
    id: 4,
    title: "Interior Painting",
    category: "Painting",
    image: "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=600&q=80",
    description: "Professional interior painting with premium finishes.",
  },
  {
    id: 5,
    title: "Deck Construction",
    category: "Renovation",
    image: "https://images.unsplash.com/photo-1591588582259-e675bd2e6088?w=600&q=80",
    description: "Custom deck build with composite materials.",
  },
  {
    id: 6,
    title: "HVAC Installation",
    category: "HVAC",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80",
    description: "New HVAC system installation for optimal climate control.",
  },
];

export function PortfolioSection({ className = "" }: { className?: string }) {
  return (
    <section className={`py-24 bg-gray-50 relative ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-blue-50 text-[#1e3a5f] text-sm font-semibold rounded-full mb-4 border border-blue-200">Our Work</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Recent <span className="text-[#d4a017]">Projects</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            See the quality and precision of our work across South Texas homes and businesses.
          </p>
        </ScrollReveal>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <ScrollReveal key={item.id} delay={index * 0.1} direction="up">
              <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#1e3a5f] text-xs font-semibold rounded-full">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#1e3a5f] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm">{item.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal delay={0.5} className="mt-16 text-center">
          <div className="bg-[#1e3a5f] rounded-2xl p-12 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4a017]/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">Ready to start your project?</h3>
              <p className="text-blue-200 mb-8 max-w-2xl mx-auto">
                Transform your space with our expert handyman services. Get a free quote today.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/contact" className="px-8 py-4 bg-[#d4a017] text-white font-bold rounded-lg hover:bg-[#b8860b] transition-all hover:scale-105 hover:shadow-lg">
                  Get Free Quote
                </Link>
                <Link href="/portfolio" className="px-8 py-4 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-all border border-white/20">
                  View Full Portfolio
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
