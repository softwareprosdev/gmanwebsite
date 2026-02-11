import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Handyman Services in South Texas | Plumbing, Electrical, HVAC & More | RGV Handyman",
  description:
    "Browse our full range of professional handyman services in the Rio Grande Valley. Plumbing repair, electrical work, painting, HVAC, smart home installation & general repairs. Licensed & insured. Free estimates.",
  keywords: [
    "handyman services McAllen TX",
    "plumbing repair RGV",
    "electrical services South Texas",
    "painting contractor Rio Grande Valley",
    "HVAC repair McAllen",
    "smart home installation RGV",
    "home repair Brownsville TX",
    "general contractor Harlingen",
  ],
  alternates: {
    canonical: "https://rgvhandyman.softwarepros.org/services",
  },
  openGraph: {
    title: "Professional Handyman Services | RGV Handyman",
    description:
      "Plumbing, electrical, painting, HVAC, smart home & general repairs across the Rio Grande Valley. Licensed, insured, same-day service.",
    url: "https://rgvhandyman.softwarepros.org/services",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Service Schema for AEO/GEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "RGV Handyman Services",
            description: "Professional handyman services available in the Rio Grande Valley",
            numberOfItems: 6,
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                item: {
                  "@type": "Service",
                  name: "Plumbing Repair",
                  description: "Professional plumbing services including leak detection, pipe repair, water heater services, and drain cleaning.",
                  provider: { "@type": "LocalBusiness", name: "RGV Handyman Services" },
                  areaServed: "Rio Grande Valley, TX",
                  offers: { "@type": "Offer", priceRange: "$100-$500" },
                },
              },
              {
                "@type": "ListItem",
                position: 2,
                item: {
                  "@type": "Service",
                  name: "Electrical Services",
                  description: "Expert electrical work including wiring, panel upgrades, lighting installation, and EV charging setup.",
                  provider: { "@type": "LocalBusiness", name: "RGV Handyman Services" },
                  areaServed: "Rio Grande Valley, TX",
                  offers: { "@type": "Offer", priceRange: "$150-$800" },
                },
              },
              {
                "@type": "ListItem",
                position: 3,
                item: {
                  "@type": "Service",
                  name: "General Home Repair",
                  description: "All-in-one repair solutions including furniture repair, appliance fixes, hardware installation, and minor construction.",
                  provider: { "@type": "LocalBusiness", name: "RGV Handyman Services" },
                  areaServed: "Rio Grande Valley, TX",
                  offers: { "@type": "Offer", priceRange: "$75-$300" },
                },
              },
              {
                "@type": "ListItem",
                position: 4,
                item: {
                  "@type": "Service",
                  name: "Interior & Exterior Painting",
                  description: "Professional painting services using premium materials for room painting, surface preparation, deck and fence painting, and color consultation.",
                  provider: { "@type": "LocalBusiness", name: "RGV Handyman Services" },
                  areaServed: "Rio Grande Valley, TX",
                  offers: { "@type": "Offer", priceRange: "$300-$2000" },
                },
              },
              {
                "@type": "ListItem",
                position: 5,
                item: {
                  "@type": "Service",
                  name: "HVAC / Climate Control",
                  description: "Heating and cooling system installation and repair including AC repair, heating systems, air quality, and energy efficiency solutions.",
                  provider: { "@type": "LocalBusiness", name: "RGV Handyman Services" },
                  areaServed: "Rio Grande Valley, TX",
                  offers: { "@type": "Offer", priceRange: "$200-$1000" },
                },
              },
              {
                "@type": "ListItem",
                position: 6,
                item: {
                  "@type": "Service",
                  name: "Smart Home Setup",
                  description: "Smart home technology integration including security systems, smart lighting, voice control, and home automation.",
                  provider: { "@type": "LocalBusiness", name: "RGV Handyman Services" },
                  areaServed: "Rio Grande Valley, TX",
                  offers: { "@type": "Offer", priceRange: "$250-$1500" },
                },
              },
            ],
          }),
        }}
      />
      {/* BreadcrumbList for rich results */}
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
                name: "Services",
                item: "https://rgvhandyman.softwarepros.org/services",
              },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
