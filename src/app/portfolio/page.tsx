"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { NeonButton } from "@/components/ui/NeonButton";
import Link from "next/link";

const portfolioItems = [
  { id: 1, title: "Kitchen Renovation", category: "renovation", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80", description: "Complete kitchen remodel with modern fixtures, new cabinets, and granite countertops." },
  { id: 2, title: "Bathroom Plumbing Upgrade", category: "plumbing", image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&q=80", description: "Full bathroom plumbing upgrade including new fixtures and water heater installation." },
  { id: 3, title: "Electrical Panel Upgrade", category: "electrical", image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&q=80", description: "200-amp electrical panel upgrade for improved safety and capacity." },
  { id: 4, title: "Interior Painting", category: "painting", image: "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=600&q=80", description: "Professional interior painting with premium Benjamin Moore finishes." },
  { id: 5, title: "Deck Construction", category: "renovation", image: "https://images.unsplash.com/photo-1591588582259-e675bd2e6088?w=600&q=80", description: "Custom composite deck build with railings and integrated lighting." },
  { id: 6, title: "HVAC Installation", category: "hvac", image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80", description: "New high-efficiency HVAC system installation for optimal climate control." },
  { id: 7, title: "Home Office Build-Out", category: "renovation", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80", description: "Custom home office with built-in shelving, wiring, and lighting." },
  { id: 8, title: "Exterior Painting", category: "painting", image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&q=80", description: "Full exterior repaint with weather-resistant premium paint." },
  { id: 9, title: "Water Heater Replacement", category: "plumbing", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80", description: "Tankless water heater installation for energy-efficient hot water." },
];

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const categories = ["all", ...Array.from(new Set(portfolioItems.map((item) => item.category)))];
  const filtered = activeFilter === "all" ? portfolioItems : portfolioItems.filter((item) => item.category === activeFilter);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-gray-50 to-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(30,58,95,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(30,58,95,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal direction="up">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block px-4 py-1.5 bg-blue-50 text-[#1e3a5f] text-sm font-semibold rounded-full mb-4 border border-blue-200">Our Work</span>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
                Our <span className="text-[#d4a017]">Portfolio</span>
              </h1>
              <p className="text-xl text-gray-600">
                See the quality of our work across South Texas homes and businesses.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-2">
                {categories.map((cat) => (
                  <button key={cat} onClick={() => setActiveFilter(cat)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                      ${activeFilter === cat
                        ? "bg-[#1e3a5f] text-white shadow-lg"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Portfolio Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item, index) => (
            <ScrollReveal key={item.id} delay={index * 0.1} direction="up">
              <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="relative h-56 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#1e3a5f] text-xs font-semibold rounded-full capitalize">{item.category}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#1e3a5f] transition-colors">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Stats */}
        <ScrollReveal delay={0.5} className="mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Projects Completed", value: "150+", color: "text-[#1e3a5f]" },
              { label: "Happy Clients", value: "300+", color: "text-[#d4a017]" },
              { label: "Success Rate", value: "99%", color: "text-green-600" },
              { label: "Years Experience", value: "15+", color: "text-[#c1272d]" },
            ].map((stat, index) => (
              <div key={index} className="bg-gray-50 border border-gray-100 rounded-2xl p-8 text-center">
                <div className={`text-4xl md:text-5xl font-bold ${stat.color} mb-3`}>{stat.value}</div>
                <div className="text-sm text-gray-500 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal delay={0.6} className="mt-20">
          <div className="bg-[#1e3a5f] rounded-2xl p-12 text-center text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#d4a017]"></div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Space?</h2>
            <p className="text-lg text-blue-200 mb-8 max-w-2xl mx-auto">
              See what we can do for you. Our team is ready to bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact"><NeonButton variant="secondary" size="lg">Schedule a Consultation</NeonButton></Link>
              <Link href="/services"><NeonButton variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-[#1e3a5f]">View Services</NeonButton></Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
