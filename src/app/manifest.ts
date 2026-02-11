import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RGV Handyman Services",
    short_name: "RGV Handyman",
    description:
      "Professional handyman services in Hidalgo, Cameron, and Starr counties. Plumbing, electrical, repair, painting, HVAC, and smart home installation.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1e3a5f",
    icons: [
      {
        src: "/images/logorgv.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/logorgv.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
