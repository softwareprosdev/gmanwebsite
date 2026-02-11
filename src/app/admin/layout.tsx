import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | RGV Handyman",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
  },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
