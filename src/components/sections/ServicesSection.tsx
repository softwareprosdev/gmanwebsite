"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { services, Service } from "@/data/services";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { NeonButton } from "@/components/ui/NeonButton";

interface ServicesSectionProps {
  className?: string;
}

export function ServicesSection({ className = "" }: ServicesSectionProps) {
  const [activeService, setActiveService] = useState<Service | null>(services[0]);

  const handleServiceClick = (service: Service) => {
    setActiveService(service);
  };

  return (
    <section className={`py-24 bg-slate-950 relative overflow-hidden ${className}`}>
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Services</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Professional solutions for every repair need. Our experts use advanced tools and techniques to deliver superior results.
          </p>
        </ScrollReveal>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Large Featured Service Card */}
          <div className="md:col-span-2 lg:col-span-2 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative h-full bg-slate-900 rounded-2xl p-8 border border-cyan-500/30">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-4xl shadow-lg shadow-cyan-500/30">
                    {activeService?.icon}
                  </div>
                  <div className="text-right">
                    <span className="text-cyan-400 font-bold text-4xl block">{activeService?.id === "plumbing" ? "50+" : activeService?.id === "electrical" ? "30+" : "15+"}</span>
                    <span className="text-sm text-gray-500 uppercase tracking-wider">Projects</span>
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-white mb-3">{activeService?.title}</h3>
                <p className="text-gray-400 mb-6">{activeService?.description}</p>
                <div className="space-y-2">
                  {activeService?.features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-300">
                      <svg className="w-4 h-4 text-cyan-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                onClick={() => handleServiceClick(service)}
                className={`
                  w-full text-left p-6 rounded-xl border transition-all duration-300 h-full
                  ${activeService?.id === service.id
                    ? "bg-slate-800/80 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                    : "bg-slate-900 border-slate-800 hover:border-cyan-500/30 hover:bg-slate-800/50"
                  }
                `}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`
                      w-12 h-12 rounded-lg flex items-center justify-center text-xl
                      ${activeService?.id === service.id
                        ? "bg-gradient-to-br from-cyan-500/20 to-purple-500/20 text-cyan-400 border border-cyan-500/50"
                        : "bg-slate-800 text-gray-400 border border-slate-700"
                      }
                    `}>
                      {service.icon}
                    </div>
                    <div>
                      <h3 className={`font-bold ${activeService?.id === service.id ? "text-white" : "text-gray-300"}`}>
                        {service.title}
                      </h3>
                      <div className="flex space-x-1 mt-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${activeService?.id === service.id ? "bg-cyan-500" : "bg-slate-700"}`}></div>
                        <div className={`w-1.5 h-1.5 rounded-full ${activeService?.id === service.id ? "bg-purple-500" : "bg-slate-700"}`}></div>
                        <div className={`w-1.5 h-1.5 rounded-full ${activeService?.id === service.id ? "bg-pink-500" : "bg-slate-700"}`}></div>
                      </div>
                    </div>
                  </div>
                  <svg
                    className={`w-5 h-5 transition-transform duration-300 ${
                      activeService?.id === service.id ? "text-cyan-400 rotate-90" : "text-gray-600"
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
            { label: "Expert Technicians", value: "15+", color: "from-cyan-500 to-blue-500" },
            { label: "Satisfaction", value: "98%", color: "from-purple-500 to-pink-500" },
            { label: "Response Time", value: "2h", color: "from-yellow-500 to-orange-500" },
            { label: "Warranty", value: "5yr", color: "from-green-500 to-emerald-500" },
          ].map((stat, index) => (
            <div key={index} className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 text-center hover:border-cyan-500/30 transition-colors">
              <div className={`text-4xl font-bold bg-gradient-to-br ${stat.color} bg-clip-text text-transparent mb-2`}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
