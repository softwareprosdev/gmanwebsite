import AdminRootLayout from "./AdminRootLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminRootLayout>{children}</AdminRootLayout>;
}
