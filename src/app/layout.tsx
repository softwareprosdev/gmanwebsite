import type { Metadata } from "next";
import { Inter, Nosifer } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const nosifer = Nosifer({
  variable: "--font-nosifer",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RGV Handyman Services | Professional Handyman Services in South Texas",
  description: "Professional handyman services in Hidalgo, Cameron, and Starr counties. Plumbing, electrical, repair, painting, HVAC, and smart home installation. Fast response, same-day service available.",
  keywords: [
    "handyman service", "RGV handyman", "South Texas handyman", "Hidalgo County handyman",
    "Cameron County handyman", "Starr County handyman", "McAllen handyman",
    "Brownsville handyman", "Harlingen handyman", "Weslaco handyman",
    "Plumbing repair", "Electrical services", "General home repair",
    "Painting contractor", "HVAC repair", "Smart home installation",
    "Same-day handyman", "Emergency repair", "Home maintenance",
    "Professional contractor", "Reliable handyman", "Affordable repairs"
  ],
  authors: [{ name: "RGV Handyman Services" }],
  metadataBase: new URL("https://rgvhandyman.softwarepros.org"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "RGV Handyman Services",
    title: "RGV Handyman Services | Professional Handyman Services",
    description: "Professional handyman services in Hidalgo, Cameron, and Starr counties. Fast response, same-day service available.",
    url: "https://rgvhandyman.softwarepros.org",
    images: [
      {
        url: "/images/logorgv.png",
        width: 1200,
        height: 630,
        alt: "RGV Handyman Services - Professional Handyman Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RGV Handyman Services | Professional Handyman Services",
    description: "Professional handyman services in South Texas. Fast response, same-day service available.",
    images: ["/images/logorgv.png"],
    creator: "@rgvhandyman",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://rgvhandyman.softwarepros.org",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Structured Data - Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Handyman",
              "name": "RGV Handyman Services",
              "image": "https://rgvhandyman.softwarepros.org/images/logorgv.png",
              "description": "Professional handyman services in Hidalgo, Cameron, and Starr counties.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Tech Plaza",
                "addressLocality": "McAllen",
                "addressRegion": "TX",
                "postalCode": "78501",
                "addressCountry": "US",
              },
              "telephone": "+1-956-200-2815",
              "email": "hello@rgvhandyman.softwarepros.org",
              "url": "https://rgvhandyman.softwarepros.org",
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "opens": "08:00",
                "closes": "20:00",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ],
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "26.2191",
                "longitude": "-98.2505",
              },
              "priceRange": "$$",
              "serviceType": ["Plumbing Repair", "Electrical Services", "General Repair", "Painting", "HVAC", "Smart Home Installation"],
              "areaServed": [
                "Hidalgo County",
                "Cameron County",
                "Starr County",
                "Willacy County",
                "Kenedy County",
                "Brooks County",
                "Jim Hogg County",
                "McAllen",
                "Edinburg",
                "Mission",
                "Brownsville",
                "Harlingen",
                "Weslaco",
                "Pharr",
                "San Juan",
              ],
              "sameAs": [
                "https://www.facebook.com/rgvhandyman",
                "https://www.instagram.com/rgvhandyman",
                "https://www.linkedin.com/company/rgvhandyman",
              ],
            }),
          }}
        />
        {/* GEO Meta Tags for Local SEO */}
        <meta name="geo.region" content="US-TX" />
        <meta name="geo.placename" content="McAllen" />
        <meta name="geo.position" content="26.2191;-98.2505" />
        <meta name="ICBM" content="26.2191,-98.2505" />
      </head>
      <body className={`${inter.variable} ${nosifer.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
