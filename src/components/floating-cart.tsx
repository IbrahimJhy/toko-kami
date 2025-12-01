"use client";

import { useCart } from "@/hooks/use-cart";
import { useState, useEffect } from "react";
import Link from 'next/link';

// Hapus import CartDrawer dari sini

export default function FloatingCart() {
  const [isMounted, setIsMounted] = useState(false); 
  const items = useCart((state) => state.items);
  const totalPrice = useCart((state) => state.totalPrice);
  
  // Hapus state isOpen dan setIsOpen

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || items.length === 0) {
    return null;
  }
  
  return (
    // Gunakan Link untuk navigasi ke halaman /cart
    <Link 
      href="/cart"
      className="fixed bottom-6 left-6 right-6 z-50 mx-auto max-w-3xl animate-in slide-in-from-bottom-5 fade-in duration-500 cursor-pointer"
    >
      <div className="flex items-center justify-between rounded-2xl bg-gray-900 p-4 text-white shadow-2xl shadow-orange-900/20 ring-1 ring-white/10">
        <div className="flex flex-col px-2">
          <span className="text-[10px] uppercase tracking-wider text-gray-400">Total Keranjang</span>
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-orange-400">
              {items.reduce((acc, item) => acc + item.quantity, 0)} Item
            </span>
            <span className="text-sm text-gray-300">•</span>
            <span className="font-bold text-white">
              Rp {totalPrice().toLocaleString("id-ID")}
            </span>
          </div>
        </div>
        
        <button
          className="rounded-xl bg-orange-600 px-6 py-2.5 font-bold text-white transition-all hover:bg-orange-500 active:scale-95"
        >
          Lihat Keranjang
        </button>
      </div>
    </Link>
  );
}