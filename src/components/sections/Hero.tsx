"use client";

import { motion } from "framer-motion";
import { NeonButton } from "@/components/ui/NeonButton";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 bg-gradient-to-br from-gray-50 to-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(30,58,95,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(30,58,95,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <ScrollReveal direction="right">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-3 bg-blue-50 border border-blue-200 rounded-full px-4 py-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                <span className="text-[#1e3a5f] text-sm font-medium">Serving South Texas Since 2009</span>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-gray-900"
              >
                <span className="block mb-2">Professional</span>
                <span className="text-[#1e3a5f]">Handyman</span>{" "}
                <span className="text-[#d4a017]">Services</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-lg md:text-xl text-gray-600 max-w-lg"
              >
                Trusted by hundreds of homeowners in the Rio Grande Valley. From plumbing to electrical, painting to HVAC — we handle it all with expertise and care.
              </motion.p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <NeonButton size="lg">
                    Get a Free Quote
                  </NeonButton>
                </Link>
                <Link href="/portfolio">
                  <NeonButton variant="outline" size="lg">
                    View Our Work
                  </NeonButton>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
                {[
                  { label: "Projects Completed", value: "500+" },
                  { label: "Happy Clients", value: "300+" },
                  { label: "Years Experience", value: "15+" },
                ].map((stat, index) => (
                  <div key={index}>
                    <div className="text-3xl font-bold text-[#1e3a5f] mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Right side - Image Grid */}
          <ScrollReveal direction="left" delay={0.3}>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {/* Large image */}
                <div className="col-span-2 rounded-2xl overflow-hidden shadow-xl h-64 relative">
                  <img
                    src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                    alt="Construction worker on site"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f2340]/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-bold text-lg">All-In-One Repairs</p>
                    <p className="text-sm text-gray-200">Complete home solutions</p>
                  </div>
                </div>

                {/* Small images */}
                <div className="rounded-xl overflow-hidden shadow-lg h-40 relative group">
                  <img
                    src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&q=80"
                    alt="Plumbing repair"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[#1e3a5f]/30 group-hover:bg-[#1e3a5f]/10 transition-colors"></div>
                  <span className="absolute bottom-2 left-3 text-white text-sm font-semibold">Plumbing</span>
                </div>

                <div className="rounded-xl overflow-hidden shadow-lg h-40 relative group">
                  <img
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80"
                    alt="Electrical work"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[#1e3a5f]/30 group-hover:bg-[#1e3a5f]/10 transition-colors"></div>
                  <span className="absolute bottom-2 left-3 text-white text-sm font-semibold">Electrical</span>
                </div>

                {/* Bottom card */}
                <div className="col-span-2 bg-[#1e3a5f] rounded-xl p-5 flex items-center justify-between shadow-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-[#d4a017] flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-bold">Same-Day Service</h3>
                      <p className="text-blue-200 text-sm">Fast response for urgent repairs</p>
                    </div>
                  </div>
                  <div className="text-[#d4a017] font-bold text-2xl">24/7</div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 opacity-40"
      >
        <span className="text-xs text-[#1e3a5f] uppercase tracking-widest">Scroll</span>
        <svg className="w-5 h-5 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
}
