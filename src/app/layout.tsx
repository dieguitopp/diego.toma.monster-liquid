import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bio | Modern Minimalist",
  description: "Personal bio page with Discord RPC and social links.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
