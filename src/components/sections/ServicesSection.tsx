"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { services, Service } from "@/data/services";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import Link from "next/link";

export function ServicesSection({ className = "" }: { className?: string }) {
  const [activeService, setActiveService] = useState<Service | null>(services[0]);

  return (
    <section className={`py-24 bg-white relative overflow-hidden ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-amber-50 text-[#d4a017] text-sm font-semibold rounded-full mb-4 border border-amber-200">Our Services</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            What We <span className="text-[#1e3a5f]">Offer</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Professional solutions for every repair need. Our experts deliver superior results with years of experience.
          </p>
        </ScrollReveal>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Large Featured Service Card */}
          <div className="md:col-span-2 lg:col-span-2 relative group">
            <div className="h-full bg-[#1e3a5f] rounded-2xl p-8 text-white shadow-xl">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 rounded-xl bg-[#d4a017] flex items-center justify-center text-4xl shadow-lg">
                    {activeService?.icon}
                  </div>
                  <div className="text-right">
                    <span className="text-[#d4a017] font-bold text-4xl block">{activeService?.id === "plumbing" ? "50+" : activeService?.id === "electrical" ? "30+" : "15+"}</span>
                    <span className="text-sm text-blue-200 uppercase tracking-wider">Projects</span>
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-3">{activeService?.title}</h3>
                <p className="text-blue-200 mb-6">{activeService?.description}</p>
                <div className="space-y-2">
                  {activeService?.features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-blue-100">
                      <svg className="w-4 h-4 text-[#d4a017] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Service Cards */}
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <button
                onClick={() => setActiveService(service)}
                className={`
                  w-full text-left p-6 rounded-xl border transition-all duration-300 h-full
                  ${activeService?.id === service.id
                    ? "bg-blue-50 border-[#1e3a5f] shadow-md"
                    : "bg-white border-gray-200 hover:border-[#d4a017] hover:shadow-md"
                  }
                `}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`
                      w-12 h-12 rounded-lg flex items-center justify-center text-xl
                      ${activeService?.id === service.id
                        ? "bg-[#1e3a5f] text-white"
                        : "bg-gray-100 text-gray-600"
                      }
                    `}>
                      {service.icon}
                    </div>
                    <div>
                      <h3 className={`font-bold ${activeService?.id === service.id ? "text-[#1e3a5f]" : "text-gray-800"}`}>
                        {service.title}
                      </h3>
                      <div className="flex space-x-1 mt-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${activeService?.id === service.id ? "bg-[#1e3a5f]" : "bg-gray-300"}`}></div>
                        <div className={`w-1.5 h-1.5 rounded-full ${activeService?.id === service.id ? "bg-[#d4a017]" : "bg-gray-300"}`}></div>
                        <div className={`w-1.5 h-1.5 rounded-full ${activeService?.id === service.id ? "bg-[#c1272d]" : "bg-gray-300"}`}></div>
                      </div>
                    </div>
                  </div>
                  <svg
                    className={`w-5 h-5 transition-transform duration-300 ${
                      activeService?.id === service.id ? "text-[#1e3a5f] rotate-90" : "text-gray-400"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Stats Row */}
        <ScrollReveal delay={0.6} className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Expert Technicians", value: "15+", color: "bg-blue-50 text-[#1e3a5f]" },
            { label: "Satisfaction", value: "98%", color: "bg-amber-50 text-[#d4a017]" },
            { label: "Response Time", value: "2h", color: "bg-green-50 text-green-700" },
            { label: "Warranty", value: "5yr", color: "bg-red-50 text-[#c1272d]" },
          ].map((stat, index) => (
            <div key={index} className={`${stat.color} rounded-xl p-6 text-center border border-gray-100`}>
              <div className="text-4xl font-bold mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
