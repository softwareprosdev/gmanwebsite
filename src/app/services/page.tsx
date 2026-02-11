"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { NeonButton } from "@/components/ui/NeonButton";
import { services, Service } from "@/data/services";

interface ServiceCardProps {
  service: Service;
  index: number;
}

function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <ScrollReveal
      delay={index * 0.05}
      direction={index % 2 === 0 ? "up" : "down"}
      className="group relative"
    >
      <div className="relative h-full bg-slate-900 rounded-2xl p-8 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_40px_rgba(6,182,212,0.15)] overflow-hidden">
        {/* Background glow effect */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl group-hover:from-cyan-500/20 group-hover:to-purple-500/20 transition-colors"></div>

        <div className="relative z-10">
          {/* Icon */}
          <div className={`
            w-16 h-16 rounded-2xl mb-6 flex items-center justify-center text-4xl
            bg-gradient-to-br from-cyan-500/20 to-purple-500/20
            group-hover:from-cyan-500/30 group-hover:to-purple-500/30 transition-all
            border border-cyan-500/20 group-hover:border-cyan-500/40 shadow-lg shadow-cyan-500/10
          `}>
            {service.icon}
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 mb-6 leading-relaxed">
            {service.description}
          </p>

          {/* Features */}
          <div className="space-y-3">
            {service.features.map((feature, index) => (
              <div key={index} className="flex items-center text-sm text-gray-300">
                <svg className="w-4 h-4 text-cyan-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {feature}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="mt-8 pt-6 border-t border-slate-800">
            <NeonButton variant="outline" size="sm" className="w-full group-hover:bg-cyan-500 group-hover:text-white group-hover:border-cyan-500 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all">
              Learn More
            </NeonButton>
          </div>
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-500/50 rounded-tl-lg"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-purple-500/50 rounded-tr-lg"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-500/50 rounded-bl-lg"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-purple-500/50 rounded-br-lg"></div>
      </div>
    </ScrollReveal>
  );
}

interface ServiceDetailsProps {
  service: Service;
}

function ServiceDetails({ service }: ServiceDetailsProps) {
  return (
    <div className="bg-slate-900 rounded-2xl border border-cyan-500/20 overflow-hidden">
      <div className="bg-gradient-to-r from-cyan-900/20 to-purple-900/20 p-6 border-b border-cyan-500/20">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-4xl shadow-lg shadow-cyan-500/20">
            {service.icon}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">{service.title}</h2>
            <p className="text-cyan-400 text-sm">Full Service Details</p>
          </div>
        </div>
        <p className="text-gray-300">{service.description}</p>
      </div>

      <div className="p-6">
        <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
          <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          <span>What's Included</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {service.features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-slate-950/30 border border-slate-800">
              <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-gray-300 text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface ServiceSelectorProps {
  activeService: Service;
  onSelect: (service: Service) => void;
}

function ServiceSelector({ activeService, onSelect }: ServiceSelectorProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {services.map((service, index) => (
        <button
          key={service.id}
          onClick={() => onSelect(service)}
          className={`
            relative p-4 rounded-xl border transition-all duration-300 text-left flex flex-col items-center text-center
            ${activeService.id === service.id
              ? "bg-gradient-to-br from-cyan-900/40 to-purple-900/40 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.2)] scale-105 z-10"
              : "bg-slate-900/50 border-slate-800 hover:border-cyan-500/30 hover:bg-slate-800/50"
            }
          `}
        >
          {activeService.id === service.id && (
            <div className="absolute top-2 right-2 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
          )}
          <div className={`
            w-12 h-12 rounded-lg flex items-center justify-center mb-3 text-xl
            ${activeService.id === service.id
              ? "bg-gradient-to-br from-cyan-500/30 to-purple-500/30 text-cyan-400"
              : "bg-slate-800 text-gray-400"
            }
          `}>
            {service.icon}
          </div>
          <span className={`font-medium ${activeService.id === service.id ? "text-white" : "text-gray-300"}`}>
            {service.title}
          </span>
        </button>
      ))}
    </div>
  );
}

export default function ServicesPage() {
  const [activeService, setActiveService] = useState<Service>(services[0]);

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-3xl animate-nebula"></div>
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl animate-nebula" style={{ animationDelay: "5s" }}></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal direction="up">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Services</span>
              </h1>
              <p className="text-xl text-gray-400">
                Professional solutions for every repair and renovation need. Our expert team delivers top-quality workmanship with cutting-edge technology.
              </p>

              <div className="mt-12">
                <NeonButton size="lg" icon="🔧">
                  Book Your Service
                </NeonButton>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Service Selector - Bento Grid Style */}
          <div className="lg:col-span-5">
            <ScrollReveal direction="right">
              <div className="bg-slate-900/40 backdrop-blur-lg rounded-2xl border border-cyan-500/20 p-6">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">Select a Service</h3>
                  <p className="text-sm text-gray-400">Click on a service to view details</p>
                </div>

                <ServiceSelector activeService={activeService} onSelect={setActiveService} />

                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-cyan-900/20 to-purple-900/20 border border-cyan-500/20">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm">Need Help Choosing?</h4>
                      <p className="text-xs text-cyan-400">Contact our experts for guidance</p>
                    </div>
                  </div>
                  <NeonButton variant="outline" size="sm" className="w-full mt-3">
                    Contact Support
                  </NeonButton>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Active Service Details */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={0.2} direction="left">
              <ServiceDetails service={activeService} />
            </ScrollReveal>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {[
                { label: "Expert Technicians", value: "15+", color: "from-cyan-500 to-blue-500" },
                { label: "Projects Completed", value: "500+", color: "from-purple-500 to-pink-500" },
                { label: "Customer Satisfaction", value: "98%", color: "from-green-500 to-emerald-500" },
                { label: "Warranty Period", value: "5 Years", color: "from-orange-500 to-red-500" },
              ].map((stat, index) => (
                <ScrollReveal key={index} delay={0.3 + index * 0.1} direction="up">
                  <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 text-center hover:border-cyan-500/30 transition-colors group">
                    <div className={`text-3xl font-bold bg-gradient-to-br ${stat.color} bg-clip-text text-transparent mb-2`}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider group-hover:text-cyan-400 transition-colors">
                      {stat.label}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Why Choose Us */}
            <ScrollReveal delay={0.4} className="mt-12">
              <div className="bg-gradient-to-br from-slate-900 to-black rounded-2xl border border-cyan-500/20 p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Why Choose RGV Handyman?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { icon: "🛡️", title: "Quality Guarantee", desc: "100% satisfaction guaranteed or your money back" },
                    { icon: "⚡", title: "Fast Response", desc: "Same-day service available for most requests" },
                    { icon: "💎", title: "Expert Technicians", desc: "Certified professionals with years of experience" },
                    { icon: "💰", title: "Transparent Pricing", desc: "No hidden fees - we quote before we start" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 rounded-xl bg-slate-800/30 border border-slate-700 hover:border-cyan-500/30 transition-colors">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center text-2xl flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                        <p className="text-gray-400 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-r from-cyan-900/40 to-purple-900/40 backdrop-blur-lg rounded-3xl border border-cyan-500/30 p-12 text-center relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your Next Project?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Our team of experts is ready to help you transform your space. Get a free quote today and experience the RGV Handyman difference.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <NeonButton size="lg" icon="📞">
                Call (555) 123-4567
              </NeonButton>
              <NeonButton variant="outline" size="lg" className="bg-black/50">
                Book Online
              </NeonButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
