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

interface BookingSectionProps {
  className?: string;
}

export function BookingSection({ className = "" }: BookingSectionProps) {
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
    <section className={`py-24 bg-gradient-to-br from-slate-900 via-slate-950 to-black relative overflow-hidden ${className}`}>
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Content */}
          <ScrollReveal direction="right">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                    Book Your Appointment
                  </span>
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Schedule a consultation with our repair experts. Serving South Texas including Hidalgo, Cameron, and Starr counties with same-day service for most requests.
                </p>
              </div>

              {/* Service Area Bento Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {counties.map((county) => (
                  <div
                    key={county}
                    className={`
                      flex items-center justify-center p-3 rounded-lg border transition-all duration-300 cursor-default
                      ${formData.county === county
                        ? "bg-cyan-900/20 border-cyan-500/50 text-cyan-400"
                        : "bg-slate-900/30 border-slate-800 text-gray-400 hover:border-slate-600"
                      }
                    `}
                    onClick={() => setFormData({ ...formData, county })}
                  >
                    <span className="font-medium">{county} County</span>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-cyan-900/20 to-purple-900/20 rounded-2xl p-6 border border-cyan-500/20">
                <h3 className="text-white font-semibold mb-4">Need Urgent Help?</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-white font-semibold">(555) 123-4567</span>
                      <div className="text-xs text-cyan-400">Emergency Service Available</div>
                    </div>
                  </div>
                  <div className="w-px h-6 bg-slate-700 hidden sm:block"></div>
                  <div className="flex items-center space-x-2 hidden sm:flex">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-white font-semibold">hello@rgvhandyman.softwarepros.org</span>
                      <div className="text-xs text-purple-400">Email Us Directly</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4">
                {[
                  { icon: "⏱️", title: "Fast Response", desc: "Same-day consultation available" },
                  { icon: "🛡️", title: "Quality Guarantee", desc: "100% satisfaction guaranteed" },
                  { icon: "💎", title: "Expert Technicians", desc: "Certified professionals with years of experience" },
                  { icon: "⚡", title: "Modern Tools", desc: "State-of-the-art equipment and techniques" },
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-xl bg-slate-900/30 border border-slate-800 hover:border-cyan-500/30 transition-colors">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center text-2xl">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{feature.title}</h4>
                      <p className="text-gray-400 text-sm">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Right - Booking Form */}
          <ScrollReveal delay={0.2} direction="left">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl"></div>

              <div className="relative bg-slate-900/80 backdrop-blur-lg rounded-2xl border border-cyan-500/30 p-8 shadow-2xl">
                <div className="text-center mb-8">
                  <div className="inline-block p-4 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 mb-4">
                    <span className="text-4xl">🛠️</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Request Service</h3>
                  <p className="text-gray-400 text-sm mt-2">
                    Fill out the form below and we'll contact you shortly
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
                    <h4 className="text-xl font-bold text-green-400 mb-2">Request Received!</h4>
                    <p className="text-green-200/80 text-sm">
                      We've received your booking request and will contact you shortly to confirm your appointment.
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
                          <span>Service Type</span>
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
                          {["Plumbing", "Electrical", "General Repair", "Painting", "HVAC", "Smart Home", "Other"].map((service) => (
                            <option key={service} value={service}>
                              {service}
                            </option>
                          ))}
                        </select>
                        {errors.service && <p className="text-red-400 text-xs">{errors.service}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                        <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
                          <span className="text-cyan-400">*</span>
                          <span>Preferred Date</span>
                        </label>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          className={`
                            w-full px-4 py-3 bg-slate-950/50 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all
                            ${errors.date ? "border-red-500/50 focus:ring-red-500/50" : "border-slate-700 focus:border-cyan-500"}
                          `}
                        />
                        {errors.date && <p className="text-red-400 text-xs">{errors.date}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Additional Details</label>
                      <textarea
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-950/50 border border-slate-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all resize-none"
                        placeholder="Describe your repair needs..."
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
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
                    </NeonButton>

                    <p className="text-center text-xs text-gray-500 mt-4">
                      By booking, you agree to our Terms of Service and Privacy Policy. Serving South Texas: Hidalgo, Cameron, Starr counties and surrounding areas.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
