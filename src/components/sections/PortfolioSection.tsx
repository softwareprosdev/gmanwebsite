"use client";

import { useState, useRef, ReactNode } from "react";
import { motion } from "framer-motion";
import { portfolio, PortfolioItem } from "@/data/portfolio";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import Image from "next/image";

interface BeforeAfterSliderProps {
  before: string;
  after: string;
  label: string;
  className?: string;
}

function BeforeAfterSlider({ before, after, label, className = "" }: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const newPos = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));

    setPosition(newPos);
  };

  return (
    <div
      ref={sliderRef}
      className={`relative w-full h-80 md:h-96 rounded-xl overflow-hidden cursor-ew-resize group ${className}`}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={handleMove}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
      onTouchMove={handleMove}
    >
      {/* After Image (Full - Background) */}
      <div className="absolute inset-0">
        <img
          src={after}
          alt={`After: ${label}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm text-white p-3 rounded-lg border border-cyan-500/30">
          <p className="text-cyan-400 font-bold text-sm uppercase tracking-wider mb-1">After</p>
          <p className="font-semibold">{label}</p>
        </div>
      </div>

      {/* Before Image (Masked - Foreground) */}
      <div
        className="absolute inset-0 overflow-hidden border-r-2 border-white/50 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
        style={{ width: `${position}%` }}
      >
        <img
          src={before}
          alt={`Before: ${label}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm text-white p-2 rounded-lg border border-purple-500/30">
          <p className="text-purple-400 font-bold text-xs uppercase tracking-wider mb-1">Before</p>
          <p className="text-sm">{label}</p>
        </div>

        {/* Decorative overlay on before image */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.3)_0%,transparent_100%)]"></div>
      </div>

      {/* Slider Handle */}
      <motion.div
        className="absolute top-0 bottom-0 w-1 bg-white/50 backdrop-blur-md z-20 flex items-center justify-center"
        style={{ left: `${position}%` }}
        animate={{ boxShadow: isDragging ? "0 0 20px rgba(255,255,255,0.8)" : "0 0 10px rgba(0,0,0,0.5)" }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full shadow-2xl flex items-center justify-center relative">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          {/* Glowing ring */}
          <div className="absolute inset-0 rounded-full border border-white/50 animate-ping opacity-50"></div>
        </div>

        {/* Handle tooltip */}
        <div className="absolute top-1/2 -translate-y-1/2 -right-12 bg-black/90 backdrop-blur px-3 py-1 rounded text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-30">
          Drag to compare
        </div>
      </motion.div>

      {/* Drag overlay */}
      {isDragging && (
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px] z-30 cursor-ew-resize"></div>
      )}
    </div>
  );
}

interface PortfolioSectionProps {
  className?: string;
}

export function PortfolioSection({ className = "" }: PortfolioSectionProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filters = ["all", ...Array.from(new Set(portfolio.map((item) => item.category.toLowerCase())))];

  const filteredPortfolio = activeFilter === "all"
    ? portfolio
    : portfolio.filter((item) => item.category.toLowerCase() === activeFilter);

  return (
    <section className={`py-24 bg-black relative ${className}`}>
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Portfolio
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            See what we've transformed. Our before-and-after galleries showcase the quality and precision of our work.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${activeFilter === filter
                    ? "bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                    : "bg-slate-900 text-gray-400 hover:bg-slate-800 hover:text-cyan-400"
                  }
                `}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPortfolio.map((item, index) => (
            <ScrollReveal key={item.id} delay={index * 0.1} direction="up">
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-40 transition duration-500"></div>
                <div className="relative bg-slate-900 rounded-xl overflow-hidden border border-slate-800 group-hover:border-cyan-500/30 transition-all">
                  <div className="p-6">
                    <div className="mb-4">
                      <BeforeAfterSlider
                        before={item.before}
                        after={item.after}
                        label={item.title}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                          {item.title}
                        </h3>
                        <span className="text-sm text-gray-500">{item.category}</span>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 text-gray-400 hover:text-cyan-400 transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </button>
                        <button className="p-2 text-gray-400 hover:text-purple-400 transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Hover details */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-gray-300 text-sm line-clamp-2">{item.description}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal delay={0.5} className="mt-16 text-center">
          <div className="p-12 rounded-3xl bg-gradient-to-r from-slate-900 to-black border border-cyan-500/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-white mb-4">Ready to start your project?</h3>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Transform your space with our expert handyman services. Get a free quote today and see the difference.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-bold rounded-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all hover:scale-105">
                  Get Free Quote
                </button>
                <button className="px-8 py-4 bg-slate-800 text-white font-bold rounded-lg hover:bg-slate-700 transition-all border border-cyan-500/20">
                  View Full Portfolio
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
