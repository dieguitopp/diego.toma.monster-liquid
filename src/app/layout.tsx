import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "@viviste",
  description: "For a better experience, enter this site on PC",
  icons: {
    icon: [
      { url: '/resources/asasas/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/resources/asasas/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/resources/asasas/favicon.ico',
    apple: '/resources/asasas/apple-touch-icon.png',
  },
  openGraph: {
    title: "diego.toma.monster",
    description: "For a better experience, enter this site on PC",
  }
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
