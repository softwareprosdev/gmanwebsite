import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Get a Free Estimate | RGV Handyman Services",
  description:
    "Contact RGV Handyman Services for a free estimate. Call 956.200.2815 or fill out our form. We serve McAllen, Brownsville, Harlingen, Weslaco, Edinburg & all of the Rio Grande Valley. Same-day service available.",
  keywords: [
    "contact handyman McAllen",
    "free estimate RGV handyman",
    "handyman phone number South Texas",
    "schedule handyman service",
    "emergency handyman RGV",
    "same day handyman near me",
  ],
  alternates: {
    canonical: "https://rgvhandyman.softwarepros.org/contact",
  },
  openGraph: {
    title: "Contact RGV Handyman Services | Free Estimates",
    description:
      "Get a free estimate for handyman services in the Rio Grande Valley. Call 956.200.2815 or fill out our online form.",
    url: "https://rgvhandyman.softwarepros.org/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* ContactPage Schema for AEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact RGV Handyman Services",
            description:
              "Get in touch with RGV Handyman Services for a free estimate on any handyman project in the Rio Grande Valley.",
            url: "https://rgvhandyman.softwarepros.org/contact",
            mainEntity: {
              "@type": "LocalBusiness",
              name: "RGV Handyman Services",
              telephone: "+1-956-200-2815",
              email: "hello@rgvhandyman.softwarepros.org",
              address: {
                "@type": "PostalAddress",
                addressLocality: "McAllen",
                addressRegion: "TX",
                postalCode: "78501",
                addressCountry: "US",
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                  ],
                  opens: "08:00",
                  closes: "20:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Saturday",
                  opens: "09:00",
                  closes: "17:00",
                },
              ],
            },
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
                name: "Contact",
                item: "https://rgvhandyman.softwarepros.org/contact",
              },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
