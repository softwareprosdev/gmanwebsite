"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { NeonButton } from "@/components/ui/NeonButton";
import { services, Service } from "@/data/services";
import Link from "next/link";

function ServiceDetails({ service }: { service: Service }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="bg-[#1e3a5f] p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-14 h-14 rounded-xl bg-[#d4a017] flex items-center justify-center text-4xl shadow-lg">
            {service.icon}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">{service.title}</h2>
            <p className="text-blue-200 text-sm">Full Service Details</p>
          </div>
        </div>
        <p className="text-blue-100">{service.description}</p>
      </div>
      <div className="p-6">
        <h4 className="text-gray-900 font-semibold mb-4 flex items-center space-x-2">
          <svg className="w-5 h-5 text-[#d4a017]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          <span>What&apos;s Included</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {service.features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
              <div className="w-6 h-6 rounded-full bg-[#1e3a5f] flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-[#d4a017]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-gray-700 text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  const [activeService, setActiveService] = useState<Service>(services[0]);

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
              <span className="inline-block px-4 py-1.5 bg-amber-50 text-[#d4a017] text-sm font-semibold rounded-full mb-4 border border-amber-200">What We Do</span>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
                Our <span className="text-[#1e3a5f]">Services</span>
              </h1>
              <p className="text-xl text-gray-600">
                Professional solutions for every repair and renovation need. Our expert team delivers top-quality workmanship.
              </p>
              <div className="mt-12">
                <Link href="/contact">
                  <NeonButton size="lg">Book Your Service</NeonButton>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Service Selector */}
          <div className="lg:col-span-5">
            <ScrollReveal direction="right">
              <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Select a Service</h3>
                  <p className="text-sm text-gray-500">Click on a service to view details</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-3">
                  {services.map((service) => (
                    <button key={service.id} onClick={() => setActiveService(service)}
                      className={`relative p-4 rounded-xl border transition-all duration-300 text-left flex flex-col items-center text-center
                        ${activeService.id === service.id
                          ? "bg-blue-50 border-[#1e3a5f] shadow-md scale-105 z-10"
                          : "bg-white border-gray-200 hover:border-[#d4a017] hover:shadow-sm"
                        }`}>
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 text-xl
                        ${activeService.id === service.id ? "bg-[#1e3a5f] text-white" : "bg-gray-100 text-gray-500"}`}>
                        {service.icon}
                      </div>
                      <span className={`font-medium text-sm ${activeService.id === service.id ? "text-[#1e3a5f]" : "text-gray-700"}`}>
                        {service.title}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="mt-6 p-4 rounded-xl bg-blue-50 border border-blue-100">
                  <h4 className="text-[#1e3a5f] font-semibold text-sm">Need Help Choosing?</h4>
                  <p className="text-xs text-gray-500 mt-1">Contact our experts for guidance</p>
                  <Link href="/contact" className="block mt-3">
                    <NeonButton variant="outline" size="sm" className="w-full">Contact Support</NeonButton>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Active Service Details */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={0.2} direction="left">
              <ServiceDetails service={activeService} />
            </ScrollReveal>

            {/* Why Choose Us */}
            <ScrollReveal delay={0.4} className="mt-12">
              <div className="bg-gray-50 rounded-2xl border border-gray-200 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose RGV Handyman?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: "Quality Guarantee", desc: "100% satisfaction guaranteed or your money back" },
                    { title: "Fast Response", desc: "Same-day service available for most requests" },
                    { title: "Expert Technicians", desc: "Certified professionals with years of experience" },
                    { title: "Transparent Pricing", desc: "No hidden fees - we quote before we start" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 rounded-xl bg-white border border-gray-100">
                      <div className="w-10 h-10 rounded-lg bg-[#1e3a5f] flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-[#d4a017]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-gray-900 font-semibold mb-1">{item.title}</h4>
                        <p className="text-gray-500 text-sm">{item.desc}</p>
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
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1e3a5f] rounded-2xl p-12 text-center text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#d4a017]"></div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start?</h2>
            <p className="text-lg text-blue-200 mb-8 max-w-2xl mx-auto">
              Get a free quote today and experience the RGV Handyman difference.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact">
                <NeonButton variant="secondary" size="lg">Call 956.200.2815</NeonButton>
              </Link>
              <Link href="/contact">
                <NeonButton variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-[#1e3a5f]">Book Online</NeonButton>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
