import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { BookingSection } from "@/components/sections/BookingSection";
import Link from "next/link";

export const metadata: Metadata = {
  title: "RGV Handyman Services | #1 Handyman in the Rio Grande Valley",
  description:
    "Professional handyman services in McAllen, Brownsville, Harlingen & across South Texas. Same-day service available for plumbing, electrical, painting, HVAC & general repairs. Call 956.200.2815.",
  alternates: {
    canonical: "https://rgvhandyman.softwarepros.org",
  },
  openGraph: {
    title: "RGV Handyman Services | #1 Handyman in the Rio Grande Valley",
    description:
      "Professional handyman services in McAllen, Brownsville, Harlingen & across South Texas. Same-day service available. Call 956.200.2815.",
    url: "https://rgvhandyman.softwarepros.org",
  },
};

export default function Home() {
  return (
    <div className="animate-fade-in">
      {/* Homepage FAQ Schema for AEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What areas does RGV Handyman Services cover?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "RGV Handyman Services covers the entire Rio Grande Valley including Hidalgo County, Cameron County, Starr County, Willacy County, and surrounding areas. We serve cities like McAllen, Edinburg, Mission, Brownsville, Harlingen, Weslaco, Pharr, and San Juan.",
                },
              },
              {
                "@type": "Question",
                name: "Does RGV Handyman offer same-day service?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, RGV Handyman Services offers same-day service for urgent repairs. We provide fast response times across the Rio Grande Valley. Call 956.200.2815 for emergency or same-day service requests.",
                },
              },
              {
                "@type": "Question",
                name: "What services does RGV Handyman provide?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "RGV Handyman provides plumbing repair, electrical services, general home repair, interior and exterior painting, HVAC repair and installation, and smart home setup. We handle residential and commercial projects of all sizes.",
                },
              },
              {
                "@type": "Question",
                name: "How much does a handyman cost in the Rio Grande Valley?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Handyman service costs in the RGV vary by project. General repairs start at $75, plumbing from $100, electrical from $150, and painting from $300. Contact RGV Handyman at 956.200.2815 for a free estimate tailored to your specific needs.",
                },
              },
              {
                "@type": "Question",
                name: "Is RGV Handyman licensed and insured?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, RGV Handyman Services is a fully licensed and insured handyman service operating in South Texas. All our technicians are trained professionals committed to quality workmanship and customer safety.",
                },
              },
            ],
          }),
        }}
      />
      {/* WebSite Schema for Sitelinks Search */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "RGV Handyman Services",
            url: "https://rgvhandyman.softwarepros.org",
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate:
                  "https://rgvhandyman.softwarepros.org/services?q={search_term_string}",
              },
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />

      <Hero />
      <ServicesSection />
      <PortfolioSection />
      <BookingSection />

      {/* Admin Login Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <Link href="/admin/login">
            <div className="led-border cursor-pointer group">
              <div className="led-border-inner bg-[#1e3a5f] px-8 py-4 flex items-center space-x-3 hover:bg-[#2a5080] transition-colors duration-300">
                <svg className="w-5 h-5 text-[#d4a017]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="text-white font-bold text-lg tracking-wide group-hover:text-[#d4a017] transition-colors duration-300">
                  Admin Login
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Decorative bottom element */}
      <div className="relative h-32 overflow-hidden bg-black border-t border-blue-900/30">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(30,58,95,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(30,58,95,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>
    </div>
  );
}
