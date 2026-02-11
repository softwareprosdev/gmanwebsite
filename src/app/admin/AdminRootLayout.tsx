"use client";

import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { ClientProvider } from "@/components/ClientProvider";
import { BookingProvider } from "@/components/BookingProvider";
import { ServiceProvider } from "@/components/ServiceProvider";
import AdminLayout from "./components/AdminLayout";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  // Login page gets no sidebar/providers - just the raw page with session provider
  if (isLoginPage) {
    return <SessionProvider>{children}</SessionProvider>;
  }

  // All other admin pages get the full layout with providers
  return (
    <SessionProvider>
      <ClientProvider>
        <BookingProvider>
          <ServiceProvider>
            <AdminLayout>{children}</AdminLayout>
          </ServiceProvider>
        </BookingProvider>
      </ClientProvider>
    </SessionProvider>
  );
}
