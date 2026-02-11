"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { NeonButton } from "@/components/ui/NeonButton";

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  bio: string;
}

function TeamMember({ name, role, image, bio }: TeamMemberProps) {
  return (
    <ScrollReveal direction="up">
      <div className="group relative bg-slate-900/50 rounded-2xl p-6 border border-slate-800 hover:border-cyan-500/30 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

        <div className="relative flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center mb-4 overflow-hidden relative group-hover:scale-110 transition-transform duration-300">
            <span className="text-4xl">{image}</span>
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>

          <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
          <p className="text-cyan-400 text-sm font-medium mb-3">{role}</p>
          <p className="text-gray-400 text-sm leading-relaxed">{bio}</p>

          <div className="mt-4 flex space-x-3">
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function AboutPage() {
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="right">
              <div>
                <div className="inline-flex items-center space-x-3 bg-cyan-900/20 border border-cyan-500/30 rounded-full px-4 py-2 mb-6">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                  </span>
                  <span className="text-cyan-400 text-sm font-medium">Since 2009</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                    About RGV Handyman
                  </span>
                </h1>
                <p className="text-xl text-gray-400 mb-8">
                  South Texas's premier handyman service, delivering next-generation repair solutions with cutting-edge technology and unmatched expertise.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <NeonButton size="lg" icon="🔧">
                    Our Services
                  </NeonButton>
                  <NeonButton variant="outline" size="lg">
                    Meet Our Team
                  </NeonButton>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3} direction="left">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl blur-2xl animate-nebula"></div>
                <div className="relative grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-900/50 backdrop-blur-sm border border-cyan-500/20">
                  {/* Large card */}
                  <div className="col-span-2 row-span-1 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-cyan-500/30 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-colors"></div>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-2xl shadow-lg shadow-cyan-500/20">
                        🏗️
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Quality Works</h3>
                        <p className="text-cyan-400 text-sm mt-1">Precision repair</p>
                      </div>
                    </div>
                  </div>
                  {/* Small cards */}
                  <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700 hover:border-cyan-500/30 transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 mb-3 group-hover:bg-purple-500/30 transition-colors">
                      ⚡
                    </div>
                    <span className="text-white font-semibold">Fast Service</span>
                    <div className="h-1 bg-slate-700 rounded-full mt-3 overflow-hidden">
                      <div className="h-full bg-purple-500 w-4/5"></div>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700 hover:border-purple-500/30 transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 mb-3 group-hover:bg-blue-500/30 transition-colors">
                      💧
                    </div>
                    <span className="text-white font-semibold">Expert Team</span>
                    <div className="h-1 bg-slate-700 rounded-full mt-3 overflow-hidden">
                      <div className="h-full bg-blue-500 w-full"></div>
                    </div>
                  </div>
                  <div className="col-span-2 row-span-1 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-purple-500/30 relative overflow-hidden group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-2xl shadow-lg shadow-purple-500/20">
                          🤝
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">Customer First</h3>
                          <p className="text-purple-400 text-sm mt-1">100% Satisfaction</p>
                        </div>
                      </div>
                      <div className="text-4xl font-bold text-purple-500/30">⭐</div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="right">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl"></div>
                <div className="relative bg-slate-900 rounded-2xl p-8 border border-cyan-500/20">
                  <h2 className="text-3xl font-bold text-white mb-6">
                    Why Choose <span className="text-cyan-400">RGV Handyman?</span>
                  </h2>
                  <div className="space-y-6">
                    {[
                      {
                        icon: "🛡️",
                        title: "Quality Guarantee",
                        desc: "We stand behind our work with a comprehensive warranty on all services performed."
                      },
                      {
                        icon: "⚡",
                        title: "Fast Response",
                        desc: "Same-day service available for most requests. Your time is valuable to us."
                      },
                      {
                        icon: "💎",
                        title: "Expert Technicians",
                        desc: "Our team consists of certified professionals with years of experience in their fields."
                      },
                      {
                        icon: "💰",
                        title: "Transparent Pricing",
                        desc: "No hidden fees. We provide detailed quotes before any work begins."
                      },
                      {
                        icon: "📞",
                        title: "24/7 Emergency Service",
                        desc: "Emergencies don't wait, and neither do we. Available when you need us most."
                      },
                      {
                        icon: "📍",
                        title: "Local Expertise",
                        desc: "Serving South Texas communities with personalized, community-focused service."
                      }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 rounded-xl bg-slate-950/30 border border-slate-800 hover:border-cyan-500/30 transition-colors">
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
              </div>
            </ScrollReveal>

            <div className="space-y-8">
              <ScrollReveal direction="left">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    Who We Are <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">?</span>
                  </h2>
                  <p className="text-lg text-gray-400 leading-relaxed mb-6">
                    RGV Handyman was founded with a simple mission: to bring next-generation repair services to South Texas. We recognized that the handyman industry needed an upgrade, and we set out to revolutionize how people access home repair services.
                  </p>
                  <p className="text-lg text-gray-400 leading-relaxed mb-6">
                    Based in the Rio Grande Valley, we've grown from a small local operation to one of the region's most trusted handyman services. Our success is built on countless satisfied customers who have experienced the RGV Handyman difference.
                  </p>
                  <p className="text-lg text-gray-400 leading-relaxed">
                    Whether it's a plumbing leak, electrical issue, or a full home renovation, our team brings the same level of professionalism, expertise, and care to every job.
                  </p>
                </div>
              </ScrollReveal>

              {/* Stats */}
              <ScrollReveal delay={0.2}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { label: "Years Experience", value: "15+" },
                    { label: "Projects Completed", value: "500+" },
                    { label: "Happy Clients", value: "300+" },
                    { label: "Team Members", value: "12+" },
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-cyan-500 to-purple-500 mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-500 uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-20 relative bg-slate-900/30">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Team</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Our team of certified professionals is the heart of RGV Handyman. We're dedicated to delivering exceptional service with every visit.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TeamMember
              name="Carlos Rodriguez"
              role="Owner & Lead Technician"
              image="👨‍🔧"
              bio="With over 20 years of experience in home repairs, Carlos founded RGV Handyman with a vision to provide top-quality service to the Rio Grande Valley community."
            />
            <TeamMember
              name="Sarah Chen"
              role="Project Manager"
              image="👩‍💼"
              bio="Sarah ensures every project runs smoothly from start to finish. Her attention to detail and organizational skills keep our operations running efficiently."
            />
            <TeamMember
              name="Marcus Johnson"
              role="Senior Electrician"
              image="⚡"
              bio="A licensed master electrician with expertise in residential and commercial electrical work, Marcus brings precision and safety to every job."
            />
          </div>

          <div className="mt-12 text-center">
            <NeonButton variant="outline" size="lg">
              Join Our Team
            </NeonButton>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-r from-slate-900 to-black rounded-3xl border border-cyan-500/20 p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Ready to Start Your Project?
              </h2>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Whether you need a quick repair or a complete home renovation, our team is ready to help. Get a free quote today and experience the RGV Handyman difference.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <NeonButton size="lg" icon="📞">
                  Call (555) 123-4567
                </NeonButton>
                <NeonButton variant="outline" size="lg">
                  Schedule Consultation
                </NeonButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
