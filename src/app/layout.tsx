import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Resteau - Digital Restaurant System",
  description: "Modern digital restaurant system with QR menus and real-time orders",
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

