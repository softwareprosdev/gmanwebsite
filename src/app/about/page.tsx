"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { NeonButton } from "@/components/ui/NeonButton";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-gray-50 to-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(30,58,95,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(30,58,95,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="right">
              <div>
                <span className="inline-block px-4 py-1.5 bg-amber-50 text-[#d4a017] text-sm font-semibold rounded-full mb-6 border border-amber-200">Since 2009</span>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
                  About <span className="text-[#1e3a5f]">RGV Handyman</span> <span className="text-[#d4a017]">Services</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  South Texas&apos;s trusted handyman service, delivering quality repair solutions with expertise and reliability.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/services">
                    <NeonButton size="lg">Our Services</NeonButton>
                  </Link>
                  <Link href="/contact">
                    <NeonButton variant="outline" size="lg">Contact Us</NeonButton>
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3} direction="left">
              <div className="relative rounded-2xl overflow-hidden shadow-xl h-96">
                <img
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                  alt="Construction team at work"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f2340]/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-[#1e3a5f]">Quality Craftsmanship</p>
                      <p className="text-sm text-gray-500">Every project, every time</p>
                    </div>
                    <div className="w-12 h-12 bg-[#d4a017] rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="right">
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Why Choose <span className="text-[#1e3a5f]">RGV Handyman?</span>
                </h2>
                <div className="space-y-5">
                  {[
                    { title: "Quality Guarantee", desc: "We stand behind our work with a comprehensive warranty on all services." },
                    { title: "Fast Response", desc: "Same-day service available. Your time is valuable to us." },
                    { title: "Expert Technicians", desc: "Certified professionals with years of experience in their fields." },
                    { title: "Transparent Pricing", desc: "No hidden fees. Detailed quotes before any work begins." },
                    { title: "24/7 Emergency Service", desc: "Emergencies don't wait, and neither do we." },
                    { title: "Local Expertise", desc: "Serving South Texas with personalized, community-focused service." },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 rounded-xl bg-white border border-gray-100 hover:border-[#d4a017]/50 transition-colors">
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

            <div className="space-y-8">
              <ScrollReveal direction="left">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                    Who We Are
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    RGV Handyman Services was founded with a simple mission: to bring reliable, professional repair services to South Texas. We recognized that homeowners needed a trusted partner for their repair needs.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    Based in the Rio Grande Valley, we&apos;ve grown from a small local operation to one of the region&apos;s most trusted handyman services. Our success is built on satisfied customers who have experienced the RGV Handyman difference.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Whether it&apos;s a plumbing leak, electrical issue, or a full home renovation, our team brings the same level of professionalism, expertise, and care to every job.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { label: "Years Experience", value: "15+" },
                    { label: "Projects Done", value: "500+" },
                    { label: "Happy Clients", value: "300+" },
                    { label: "Team Members", value: "12+" },
                  ].map((stat, index) => (
                    <div key={index} className="text-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="text-3xl font-bold text-[#1e3a5f] mb-1">{stat.value}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-blue-50 text-[#1e3a5f] text-sm font-semibold rounded-full mb-4 border border-blue-200">Our People</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Meet Our <span className="text-[#d4a017]">Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Certified professionals dedicated to delivering exceptional service with every visit.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Carlos Rodriguez", role: "Owner & Lead Technician", bio: "20+ years of experience in home repairs. Founded RGV Handyman with a vision to provide top-quality service.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80" },
              { name: "Sarah Chen", role: "Project Manager", bio: "Expert in project coordination. Ensures every job runs smoothly from start to finish.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80" },
              { name: "Marcus Johnson", role: "Senior Electrician", bio: "Licensed master electrician specializing in residential and commercial electrical work.", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80" },
            ].map((member, index) => (
              <ScrollReveal key={index} delay={index * 0.1} direction="up">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
                  <div className="h-48 overflow-hidden">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-[#d4a017] text-sm font-medium mb-3">{member.role}</p>
                    <p className="text-gray-500 text-sm">{member.bio}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1e3a5f] rounded-2xl p-12 text-center text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#d4a017]"></div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Start Your Project?</h2>
            <p className="text-lg text-blue-200 mb-8 max-w-2xl mx-auto">
              Whether you need a quick repair or a complete renovation, our team is ready to help.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact">
                <NeonButton variant="secondary" size="lg">Call 956.200.2815</NeonButton>
              </Link>
              <Link href="/contact">
                <NeonButton variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-[#1e3a5f]">Schedule Consultation</NeonButton>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
