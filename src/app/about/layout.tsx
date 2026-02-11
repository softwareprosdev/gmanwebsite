import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About RGV Handyman Services | Trusted Handyman in South Texas Since Day One",
  description:
    "Learn about RGV Handyman Services — the Rio Grande Valley's trusted handyman team. Licensed, insured, and committed to quality craftsmanship in McAllen, Brownsville, Harlingen & surrounding areas.",
  keywords: [
    "about RGV handyman",
    "South Texas handyman company",
    "licensed handyman McAllen",
    "insured contractor RGV",
    "Rio Grande Valley home repair",
    "trusted handyman near me",
  ],
  alternates: {
    canonical: "https://rgvhandyman.softwarepros.org/about",
  },
  openGraph: {
    title: "About RGV Handyman Services | Our Story",
    description:
      "Licensed, insured, and committed to quality craftsmanship across the Rio Grande Valley.",
    url: "https://rgvhandyman.softwarepros.org/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Organization Schema for GEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "RGV Handyman Services",
            url: "https://rgvhandyman.softwarepros.org",
            logo: "https://rgvhandyman.softwarepros.org/images/logorgv.png",
            description:
              "Professional handyman services across the Rio Grande Valley providing plumbing, electrical, painting, HVAC, and smart home solutions.",
            address: {
              "@type": "PostalAddress",
              addressLocality: "McAllen",
              addressRegion: "TX",
              postalCode: "78501",
              addressCountry: "US",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+1-956-200-2815",
              contactType: "customer service",
              availableLanguage: ["English", "Spanish"],
              areaServed: {
                "@type": "GeoCircle",
                geoMidpoint: {
                  "@type": "GeoCoordinates",
                  latitude: 26.2191,
                  longitude: -98.2505,
                },
                geoRadius: "80000",
              },
            },
            sameAs: [
              "https://www.facebook.com/rgvhandyman",
              "https://www.instagram.com/rgvhandyman",
              "https://www.linkedin.com/company/rgvhandyman",
            ],
          }),
        }}
      />
      {/* BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://rgvhandyman.softwarepros.org",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "About",
                item: "https://rgvhandyman.softwarepros.org/about",
              },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
