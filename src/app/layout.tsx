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
  metadataBase: new URL('https://tokokami.vercel.app'),
  title: {
    default: "Toko Kami | Menyediakan Jajanan",
    template: "%s | Toko Kami"
  },
  description: "Menyediakan jajanan enak dan murah. Pesan sekarang via WhatsApp!",
  openGraph: {
    title: "Toko Kami",
    description: "Jajanan enak dan murah.",
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