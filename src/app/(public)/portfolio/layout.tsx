import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Work | Before & After Project Gallery | RGV Handyman Services",
  description:
    "View our portfolio of completed handyman projects across the Rio Grande Valley. Before and after photos of plumbing, electrical, painting, renovation, and home repair work in McAllen, Brownsville & Harlingen.",
  keywords: [
    "handyman portfolio RGV",
    "before after home repair",
    "renovation projects McAllen",
    "painting projects South Texas",
    "home improvement gallery",
    "contractor work examples",
  ],
  alternates: {
    canonical: "https://rgvhandyman.softwarepros.org/portfolio",
  },
  openGraph: {
    title: "Project Portfolio | RGV Handyman Services",
    description:
      "Before & after photos of completed handyman projects across the Rio Grande Valley.",
    url: "https://rgvhandyman.softwarepros.org/portfolio",
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
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
                name: "Portfolio",
                item: "https://rgvhandyman.softwarepros.org/portfolio",
              },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
