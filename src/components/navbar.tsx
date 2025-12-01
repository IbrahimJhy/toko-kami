"use client"; 

export default function Navbar() {

  return (
    <nav className="sticky top-0 z-40 flex items-center justify-between border-b border-gray-100 bg-white/80 px-6 py-4 backdrop-blur-md transition-all">
      <span className="text-lg font-bold tracking-tight text-orange-600">
        Toko Kami
      </span>
    </nav>
  );
}