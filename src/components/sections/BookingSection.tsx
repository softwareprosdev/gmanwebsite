"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { NeonButton } from "@/components/ui/NeonButton";

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  message: string;
  county: string;
}

export function BookingSection({ className = "" }: { className?: string }) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    message: "",
    county: "Hidalgo",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name as keyof FormData]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.service.trim()) newErrors.service = "Please select a service";
    if (!formData.date.trim()) newErrors.date = "Please select a date";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", email: "", phone: "", service: "", date: "", message: "", county: "Hidalgo" });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      setIsSubmitting(false);
      console.error("Submission error:", error);
    }
  };

  const counties = ["Hidalgo", "Cameron", "Starr", "Willacy", "Kenedy", "Brooks", "Jim Hogg"];

  return (
    <section className={`py-24 bg-white relative overflow-hidden ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Content */}
          <ScrollReveal direction="right">
            <div className="space-y-8">
              <div>
                <span className="inline-block px-4 py-1.5 bg-amber-50 text-[#d4a017] text-sm font-semibold rounded-full mb-4 border border-amber-200">Book Now</span>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                  Schedule Your <span className="text-[#1e3a5f]">Appointment</span>
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Schedule a consultation with our repair experts. Serving South Texas including Hidalgo, Cameron, and Starr counties with same-day service for most requests.
                </p>
              </div>

              {/* Service Area Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {counties.map((county) => (
                  <div
                    key={county}
                    className={`flex items-center justify-center p-3 rounded-lg border transition-all duration-300 cursor-pointer
                      ${formData.county === county
                        ? "bg-blue-50 border-[#1e3a5f] text-[#1e3a5f] font-semibold"
                        : "bg-gray-50 border-gray-200 text-gray-600 hover:border-[#d4a017]"
                      }
                    `}
                    onClick={() => setFormData({ ...formData, county })}
                  >
                    <span className="text-sm">{county} County</span>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <h3 className="text-[#1e3a5f] font-semibold mb-4">Need Urgent Help?</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 rounded-full bg-[#1e3a5f] flex items-center justify-center text-white">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-[#1e3a5f] font-semibold">956.200.2815</span>
                      <div className="text-xs text-[#d4a017]">Emergency Service Available</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4">
                {[
                  { title: "Fast Response", desc: "Same-day consultation available" },
                  { title: "Quality Guarantee", desc: "100% satisfaction guaranteed" },
                  { title: "Expert Technicians", desc: "Certified professionals with years of experience" },
                  { title: "Transparent Pricing", desc: "No hidden fees — we quote before we start" },
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-[#d4a017]/50 transition-colors">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#1e3a5f] flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#d4a017]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-gray-900 font-semibold">{feature.title}</h4>
                      <p className="text-gray-500 text-sm">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Right - Booking Form */}
          <ScrollReveal delay={0.2} direction="left">
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-xl">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900">Request Service</h3>
                <p className="text-gray-500 text-sm mt-2">Fill out the form below and we'll contact you shortly</p>
              </div>

              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 rounded-xl p-6 text-center mb-6"
                >
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-green-700 mb-2">Request Received!</h4>
                  <p className="text-green-600 text-sm">We'll contact you shortly to confirm your appointment.</p>
                </motion.div>
              )}

              {!isSuccess && (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Full Name <span className="text-red-500">*</span></label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange}
                        className={`w-full px-4 py-3 bg-gray-50 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30 transition-all ${errors.name ? "border-red-400" : "border-gray-200 focus:border-[#1e3a5f]"}`}
                        placeholder="John Doe" />
                      {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Email <span className="text-red-500">*</span></label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange}
                        className={`w-full px-4 py-3 bg-gray-50 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30 transition-all ${errors.email ? "border-red-400" : "border-gray-200 focus:border-[#1e3a5f]"}`}
                        placeholder="john@example.com" />
                      {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Phone</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30 focus:border-[#1e3a5f] transition-all"
                        placeholder="956.200.2815" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Service <span className="text-red-500">*</span></label>
                      <select name="service" value={formData.service} onChange={handleChange}
                        className={`w-full px-4 py-3 bg-gray-50 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30 transition-all appearance-none ${errors.service ? "border-red-400" : "border-gray-200 focus:border-[#1e3a5f]"}`}>
                        <option value="">Select a service</option>
                        {["Plumbing", "Electrical", "General Repair", "Painting", "HVAC", "Smart Home", "Other"].map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      {errors.service && <p className="text-red-500 text-xs">{errors.service}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">County <span className="text-red-500">*</span></label>
                      <select name="county" value={formData.county} onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30 focus:border-[#1e3a5f] transition-all appearance-none">
                        {counties.map((c) => (<option key={c} value={c}>{c} County</option>))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Preferred Date <span className="text-red-500">*</span></label>
                      <input type="date" name="date" value={formData.date} onChange={handleChange}
                        className={`w-full px-4 py-3 bg-gray-50 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30 transition-all ${errors.date ? "border-red-400" : "border-gray-200 focus:border-[#1e3a5f]"}`} />
                      {errors.date && <p className="text-red-500 text-xs">{errors.date}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Additional Details</label>
                    <textarea name="message" rows={4} value={formData.message} onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30 focus:border-[#1e3a5f] transition-all resize-none"
                      placeholder="Describe your repair needs..."></textarea>
                  </div>

                  <NeonButton type="submit" size="lg" fullWidth disabled={isSubmitting}>
                    <span className="flex items-center justify-center">
                      {isSubmitting ? (
                        <>
                          <svg className="w-5 h-5 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          Confirm Booking
                          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </>
                      )}
                    </span>
                  </NeonButton>

                  <p className="text-center text-xs text-gray-400 mt-4">
                    Serving South Texas: Hidalgo, Cameron, Starr counties and surrounding areas.
                  </p>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
