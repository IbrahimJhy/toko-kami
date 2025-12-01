"use client"; 
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-40 flex items-center justify-between border-b border-gray-100 bg-white/80 px-6 py-4 backdrop-blur-md transition-all">
      <Link href="/" className="group">
        <span className="text-xl font-bold tracking-tight text-gray-900 transition-colors group-hover:text-orange-600">
          Toko<span className="text-orange-600 group-hover:text-gray-900">Kami</span>
        </span>
      </Link>
    </nav>
  );
}