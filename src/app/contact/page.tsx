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
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name as keyof FormData]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
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

      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        date: "",
        message: "",
        county: "Hidalgo",
      });

      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      setIsSubmitting(false);
      console.error("Submission error:", error);
    }
  };

  // South Texas counties service area
  const counties = ["Hidalgo", "Cameron", "Starr", "Willacy", "Kenedy", "Brooks", "Jim Hogg"];

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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                  Get In Touch
                </span>
              </h1>
              <p className="text-xl text-gray-400">
                Ready to start your next project? Contact us today for a free quote and experience next-gen handyman services in South Texas.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <ScrollReveal direction="right">
              <div className="bg-slate-900/40 backdrop-blur-lg rounded-2xl border border-cyan-500/20 p-6">
                <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>

                <div className="space-y-6">
                  {/* Phone */}
                  <div className="flex items-start space-x-4 p-4 rounded-xl bg-slate-950/50 border border-slate-800 hover:border-cyan-500/30 transition-colors group">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Call Us</p>
                      <a href="tel:5551234567" className="text-lg font-semibold text-white hover:text-cyan-400 transition-colors">
                        (555) 123-4567
                      </a>
                      <p className="text-xs text-cyan-400 mt-1">Emergency Service Available</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start space-x-4 p-4 rounded-xl bg-slate-950/50 border border-slate-800 hover:border-cyan-500/30 transition-colors group">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Email Us</p>
                      <a href="mailto:hello@rgvhandyman.softwarepros.org" className="text-lg font-semibold text-white hover:text-cyan-400 transition-colors">
                        hello@rgvhandyman.softwarepros.org
                      </a>
                      <p className="text-xs text-purple-400 mt-1">We respond within 24 hours</p>
                    </div>
                  </div>

                  {/* Service Area */}
                  <div className="bg-gradient-to-r from-cyan-900/20 to-purple-900/20 rounded-xl p-5 border border-cyan-500/20">
                    <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                      <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Service Area</span>
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {counties.map((county) => (
                        <span key={county} className="px-3 py-1 bg-slate-950/50 rounded text-xs text-gray-400 border border-slate-800">
                          {county}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-3">
                      Serving Hidalgo, Cameron, Starr, Willacy, Kenedy, Brooks, and Jim Hogg counties.
                    </p>
                  </div>

                  {/* Business Hours */}
                  <div className="bg-slate-950/50 rounded-xl p-5 border border-slate-800">
                    <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                      <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Business Hours</span>
                    </h4>
                    <div className="space-y-2">
                      {[
                        { day: "Monday - Friday", time: "7:00 AM - 7:00 PM" },
                        { day: "Saturday", time: "8:00 AM - 5:00 PM" },
                        { day: "Sunday", time: "Emergency Only" },
                      ].map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-gray-400">{item.day}</span>
                          <span className="text-cyan-400">{item.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-2">
            <ScrollReveal delay={0.2} direction="left">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl"></div>

                <div className="relative bg-slate-900/80 backdrop-blur-lg rounded-2xl border border-cyan-500/30 p-8 shadow-2xl">
                  <div className="text-center mb-8">
                    <div className="inline-block p-4 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 mb-4">
                      <span className="text-4xl">📩</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">Send Us a Message</h3>
                    <p className="text-gray-400 text-sm mt-2">
                      Fill out the form below and we'll get back to you shortly
                    </p>
                  </div>

                  {/* Success Message */}
                  {isSuccess && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-6 text-center mb-6"
                    >
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold text-green-400 mb-2">Message Sent!</h4>
                      <p className="text-green-200/80 text-sm">
                        Thank you for contacting us. We've received your message and will respond shortly.
                      </p>
                    </motion.div>
                  )}

                  {/* Form */}
                  {!isSuccess && (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
                            <span className="text-cyan-400">*</span>
                            <span>Full Name</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`
                              w-full px-4 py-3 bg-slate-950/50 border rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all
                              ${errors.name ? "border-red-500/50 focus:ring-red-500/50" : "border-slate-700 focus:border-cyan-500"}
                            `}
                            placeholder="John Doe"
                          />
                          {errors.name && <p className="text-red-400 text-xs">{errors.name}</p>}
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
                            <span className="text-cyan-400">*</span>
                            <span>Email Address</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`
                              w-full px-4 py-3 bg-slate-950/50 border rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all
                              ${errors.email ? "border-red-500/50 focus:ring-red-500/50" : "border-slate-700 focus:border-cyan-500"}
                            `}
                            placeholder="john@example.com"
                          />
                          {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-300">Phone Number</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-slate-950/50 border border-slate-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
                            placeholder="(555) 123-4567"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
                            <span className="text-cyan-400">*</span>
                            <span>Interested In</span>
                          </label>
                          <select
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className={`
                              w-full px-4 py-3 bg-slate-950/50 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all appearance-none
                              ${errors.service ? "border-red-500/50 focus:ring-red-500/50" : "border-slate-700 focus:border-cyan-500"}
                            `}
                          >
                            <option value="">Select a service</option>
                            {services.map((service) => (
                              <option key={service.id} value={service.title}>
                                {service.title}
                              </option>
                            ))}
                            <option value="Other">Other / General Inquiry</option>
                          </select>
                          {errors.service && <p className="text-red-400 text-xs">{errors.service}</p>}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
                          <span className="text-cyan-400">*</span>
                          <span>County</span>
                        </label>
                        <select
                          name="county"
                          value={formData.county}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-slate-950/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all appearance-none"
                        >
                          {counties.map((county) => (
                            <option key={county} value={county}>
                              {county} County
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Message</label>
                        <textarea
                          name="message"
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-slate-950/50 border border-slate-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all resize-none"
                          placeholder="How can we help you?"
                        ></textarea>
                      </div>

                      <NeonButton
                        type="submit"
                        size="lg"
                        fullWidth
                        disabled={isSubmitting}
                        className="relative overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center justify-center">
                          {isSubmitting ? (
                            <>
                              <svg className="w-5 h-5 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                              </svg>
                              Sending...
                            </>
                          ) : (
                            <>
                              Send Message
                              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                              </svg>
                            </>
                          )}
                        </span>
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
                      </NeonButton>

                      <p className="text-center text-xs text-gray-500 mt-4">
                        By sending this form, you agree to our Terms of Service and Privacy Policy. Your information is secure and will not be shared with third parties.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </ScrollReveal>

            {/* Additional Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <ScrollReveal delay={0.3}>
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 border border-slate-700 hover:border-cyan-500/30 transition-colors">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="text-white font-semibold">FAQs</h4>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Check out our frequently asked questions section for answers to common questions about our services, pricing, and more.
                  </p>
                  <button className="mt-4 text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-medium">
                    Visit FAQs →
                  </button>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 border border-slate-700 hover:border-purple-500/30 transition-colors">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h4 className="text-white font-semibold">Reviews</h4>
                  </div>
                  <p className="text-gray-400 text-sm">
                    See what our customers in South Texas have to say about their experience with RGV Handyman.
                  </p>
                  <button className="mt-4 text-sm text-purple-400 hover:text-purple-300 transition-colors font-medium">
                    Read Reviews →
                  </button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section Placeholder */}
      <section className="relative h-96 overflow-hidden bg-slate-900 border-t border-cyan-900/30">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cyan-500/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="text-gray-400 font-semibold">South Texas Service Area Map</p>
            <p className="text-gray-500 text-sm mt-2">Hidalgo • Cameron • Starr • Willacy • Kenedy • Brooks • Jim Hogg</p>
          </div>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </section>
    </div>
  );
}
