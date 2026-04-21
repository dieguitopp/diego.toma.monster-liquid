import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "diego.toma.monster",
  description: "For a better experience, enter this site on PC",
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
