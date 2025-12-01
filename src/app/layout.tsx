import type { Metadata } from "next";
import { Poppins } from "next/font/google"; 
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import FloatingCart from "@/components/floating-cart";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Toko Kami",
  description: "Pusat jajanan, Pesan sekarang via WhatsApp!",
  openGraph: {
    title: "Toko Kami",
    description: "Jajanan.",
    url: "https://tokokami.vercel.app", 
    siteName: "TokoKami",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${poppins.variable} antialiased bg-[#FAFAFA]`}>
        {children}
        <FloatingCart />
        <Analytics />
      </body>
    </html>
  );
}