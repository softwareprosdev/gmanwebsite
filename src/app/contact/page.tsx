"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { NeonButton } from "@/components/ui/NeonButton";
import { services } from "@/data/services";

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  message: string;
  county: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "", email: "", phone: "", service: "", date: "", message: "", county: "Hidalgo",
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
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Invalid email format";
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
  const inputStyles = "w-full px-4 py-3 bg-gray-50 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30 transition-all";

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-gray-50 to-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(30,58,95,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(30,58,95,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal direction="up">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block px-4 py-1.5 bg-amber-50 text-[#d4a017] text-sm font-semibold rounded-full mb-4 border border-amber-200">Get In Touch</span>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
                Contact <span className="text-[#1e3a5f]">Us</span>
              </h1>
              <p className="text-xl text-gray-600">
                Ready to start your next project? Contact us today for a free quote.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <ScrollReveal direction="right">
              <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-5">
                  <div className="flex items-start space-x-4 p-4 rounded-xl bg-white border border-gray-100">
                    <div className="w-12 h-12 rounded-lg bg-[#1e3a5f] flex items-center justify-center text-white">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Call Us</p>
                      <a href="tel:9562002815" className="text-lg font-semibold text-gray-900 hover:text-[#1e3a5f] transition-colors">956.200.2815</a>
                      <p className="text-xs text-[#d4a017] mt-1">Emergency Service Available</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 rounded-xl bg-white border border-gray-100">
                    <div className="w-12 h-12 rounded-lg bg-[#d4a017] flex items-center justify-center text-white">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Email Us</p>
                      <a href="mailto:hello@rgvhandyman.softwarepros.org" className="text-sm font-semibold text-gray-900 hover:text-[#1e3a5f] transition-colors break-all">hello@rgvhandyman.softwarepros.org</a>
                      <p className="text-xs text-gray-500 mt-1">We respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                    <h4 className="text-[#1e3a5f] font-semibold mb-3">Service Area</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {counties.map((county) => (
                        <span key={county} className="px-3 py-1.5 bg-white rounded text-xs text-gray-600 border border-gray-100 text-center">{county}</span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-5 border border-gray-100">
                    <h4 className="text-gray-900 font-semibold mb-3">Business Hours</h4>
                    <div className="space-y-2">
                      {[
                        { day: "Monday - Friday", time: "7:00 AM - 7:00 PM" },
                        { day: "Saturday", time: "8:00 AM - 5:00 PM" },
                        { day: "Sunday", time: "Emergency Only" },
                      ].map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-gray-500">{item.day}</span>
                          <span className="text-[#1e3a5f] font-medium">{item.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right - Form */}
          <div className="lg:col-span-2">
            <ScrollReveal delay={0.2} direction="left">
              <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900">Send Us a Message</h3>
                  <p className="text-gray-500 text-sm mt-2">Fill out the form and we&apos;ll get back to you shortly</p>
                </div>

                {isSuccess && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-50 border border-green-200 rounded-xl p-6 text-center mb-6">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-green-700 mb-2">Message Sent!</h4>
                    <p className="text-green-600 text-sm">Thank you for contacting us. We&apos;ll respond shortly.</p>
                  </motion.div>
                )}

                {!isSuccess && (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Full Name <span className="text-red-500">*</span></label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange}
                          className={`${inputStyles} ${errors.name ? "border-red-400" : "border-gray-200 focus:border-[#1e3a5f]"}`}
                          placeholder="John Doe" />
                        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Email <span className="text-red-500">*</span></label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange}
                          className={`${inputStyles} ${errors.email ? "border-red-400" : "border-gray-200 focus:border-[#1e3a5f]"}`}
                          placeholder="john@example.com" />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Phone</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                          className={`${inputStyles} border-gray-200 focus:border-[#1e3a5f]`}
                          placeholder="956.200.2815" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Interested In <span className="text-red-500">*</span></label>
                        <select name="service" value={formData.service} onChange={handleChange}
                          className={`${inputStyles} appearance-none ${errors.service ? "border-red-400" : "border-gray-200 focus:border-[#1e3a5f]"}`}>
                          <option value="">Select a service</option>
                          {services.map((s) => (<option key={s.id} value={s.title}>{s.title}</option>))}
                          <option value="Other">Other / General Inquiry</option>
                        </select>
                        {errors.service && <p className="text-red-500 text-xs">{errors.service}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">County</label>
                        <select name="county" value={formData.county} onChange={handleChange}
                          className={`${inputStyles} border-gray-200 focus:border-[#1e3a5f] appearance-none`}>
                          {counties.map((c) => (<option key={c} value={c}>{c} County</option>))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Preferred Date <span className="text-red-500">*</span></label>
                        <input type="date" name="date" value={formData.date} onChange={handleChange}
                          className={`${inputStyles} ${errors.date ? "border-red-400" : "border-gray-200 focus:border-[#1e3a5f]"}`} />
                        {errors.date && <p className="text-red-500 text-xs">{errors.date}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Message</label>
                      <textarea name="message" rows={5} value={formData.message} onChange={handleChange}
                        className={`${inputStyles} border-gray-200 focus:border-[#1e3a5f] resize-none`}
                        placeholder="How can we help you?"></textarea>
                    </div>

                    <NeonButton type="submit" size="lg" fullWidth disabled={isSubmitting}>
                      <span className="flex items-center justify-center">
                        {isSubmitting ? (
                          <>
                            <svg className="w-5 h-5 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>Send Message<svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg></>
                        )}
                      </span>
                    </NeonButton>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <section className="relative h-80 overflow-hidden bg-gray-100 border-t border-gray-200">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#1e3a5f] flex items-center justify-center">
              <svg className="w-8 h-8 text-[#d4a017]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="text-gray-700 font-semibold">South Texas Service Area</p>
            <p className="text-gray-500 text-sm mt-2">Hidalgo &bull; Cameron &bull; Starr &bull; Willacy &bull; Kenedy &bull; Brooks &bull; Jim Hogg</p>
          </div>
        </div>
      </section>
    </div>
  );
}
