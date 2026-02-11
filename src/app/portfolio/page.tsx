"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { NeonButton } from "@/components/ui/NeonButton";
import { portfolio, PortfolioItem } from "@/data/portfolio";

interface BeforeAfterSliderProps {
  before: string;
  after: string;
  label: string;
  category: string;
}

function BeforeAfterSlider({ before, after, label, category }: BeforeAfterSliderProps) {
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
      className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden cursor-ew-resize group"
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
        <div className="absolute bottom-4 left-4 right-4 bg-black/90 backdrop-blur-sm text-white p-4 rounded-lg border border-cyan-500/30 shadow-2xl">
          <p className="text-cyan-400 font-bold text-xs uppercase tracking-widest mb-1">After</p>
          <p className="font-semibold">{label}</p>
          <p className="text-xs text-cyan-500/80 mt-1">{category}</p>
        </div>
      </div>

      {/* Before Image (Masked - Foreground) */}
      <div
        className="absolute inset-0 overflow-hidden border-r-2 border-white/50 shadow-[0_0_20px_rgba(0,0,0,0.5)] z-10"
        style={{ width: `${position}%` }}
      >
        <img
          src={before}
          alt={`Before: ${label}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute bottom-4 left-4 bg-black/90 backdrop-blur-sm text-white p-3 rounded-lg border border-purple-500/30 shadow-2xl">
          <p className="text-purple-400 font-bold text-xs uppercase tracking-wider mb-1">Before</p>
          <p className="text-sm">{label}</p>
        </div>

        {/* Decorative overlay on before image */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.3)_0%,transparent_100%)]"></div>
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white/50 backdrop-blur-md z-20 flex items-center justify-center cursor-ew-resize"
        style={{ left: `${position}%` }}
      >
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full shadow-2xl flex items-center justify-center relative">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          {/* Glowing ring */}
          <div className="absolute inset-0 rounded-full border border-white/50 animate-ping opacity-50"></div>
        </div>

        {/* Handle tooltip */}
        <div className="absolute top-1/2 -translate-y-1/2 -right-14 bg-black/95 backdrop-blur px-3 py-1.5 rounded text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-30">
          Drag to compare
        </div>
      </div>

      {/* Drag overlay */}
      {isDragging && (
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px] z-30"></div>
      )}
    </div>
  );
}

interface ProjectCardProps {
  project: PortfolioItem;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <ScrollReveal delay={index * 0.1} direction={index % 3 === 0 ? "up" : "down"}>
      <div className="group relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-all duration-500"></div>
        <div className="relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 group-hover:border-cyan-500/30 transition-all">
          <div className="p-4">
            <BeforeAfterSlider
              before={project.before}
              after={project.after}
              label={project.title}
              category={project.category}
            />
          </div>

          <div className="px-6 pb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                <span className="text-sm text-gray-500 px-3 py-1 bg-slate-800 rounded-full">
                  {project.category}
                </span>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-400 hover:text-cyan-400 transition-colors hover:bg-cyan-500/10 rounded-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </button>
                <button className="p-2 text-gray-400 hover:text-purple-400 transition-colors hover:bg-purple-500/10 rounded-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Hover details */}
            <div className="relative h-0 overflow-hidden transition-all duration-300 group-hover:h-auto group-hover:mt-3">
              <p className="text-gray-400 text-sm">{project.description}</p>
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const categories = ["all", ...Array.from(new Set(portfolio.map((item) => item.category.toLowerCase())))];

  const filteredPortfolio = activeFilter === "all"
    ? portfolio
    : portfolio.filter((item) => item.category.toLowerCase() === activeFilter);

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-3xl animate-nebula"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl animate-nebula" style={{ animationDelay: "5s" }}></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal direction="up">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                  Our Portfolio
                </span>
              </h1>
              <p className="text-xl text-gray-400">
                See what we've transformed across South Texas. Our before-and-after galleries showcase the quality and precision of our work.
              </p>

              <div className="mt-10 flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveFilter(category)}
                    className={`
                      px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                      ${activeFilter === category
                        ? "bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] scale-105"
                        : "bg-slate-900 text-gray-400 hover:bg-slate-800 hover:text-cyan-400"
                      }
                    `}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Portfolio Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {filteredPortfolio.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPortfolio.map((item, index) => (
              <ProjectCard key={item.id} project={item} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-900 flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No projects found</h3>
            <p className="text-gray-400">Try selecting a different category</p>
            <button
              onClick={() => setActiveFilter("all")}
              className="mt-6 text-cyan-400 hover:text-cyan-300 font-medium"
            >
              View All Projects
            </button>
          </div>
        )}

        {/* Stats Section */}
        <ScrollReveal delay={0.5} className="mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Projects Completed", value: "150+", color: "from-cyan-500 to-blue-500" },
              { label: "Happy Clients", value: "300+", color: "from-purple-500 to-pink-500" },
              { label: "Transformation Rate", value: "99%", color: "from-green-500 to-emerald-500" },
              { label: "Years of Experience", value: "15+", color: "from-yellow-500 to-orange-500" },
            ].map((stat, index) => (
              <div key={index} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 text-center hover:border-cyan-500/30 transition-colors group">
                <div className={`text-4xl md:text-5xl font-bold bg-gradient-to-br ${stat.color} bg-clip-text text-transparent mb-3`}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-widest group-hover:text-cyan-400 transition-colors">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* CTA Section */}
        <ScrollReveal delay={0.6} className="mt-20">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 to-black border border-cyan-500/20 p-12">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="relative z-10 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Transform Your Space?
              </h2>
              <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
                See what we can do for you. Our team of experts is ready to bring your vision to life with precision and care.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <NeonButton size="lg" icon="📞">
                  Schedule a Consultation
                </NeonButton>
                <NeonButton variant="outline" size="lg" className="bg-black/50">
                  Download Portfolio PDF
                </NeonButton>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Full Gallery Grid */}
        <ScrollReveal delay={0.7} className="mt-20">
          <div className="bg-slate-900/30 border border-cyan-500/10 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Complete Project Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {portfolio.slice(0, 8).map((item, index) => (
                <div key={item.id} className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer">
                  <img
                    src={item.after}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div>
                      <p className="text-white font-semibold text-sm">{item.title}</p>
                      <p className="text-cyan-400 text-xs">{item.category}</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 border-2 border-cyan-500/0 group-hover:border-cyan-500/50 transition-all duration-300 rounded-xl"></div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <button className="text-cyan-400 hover:text-cyan-300 font-medium text-sm">
                View All Projects →
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
