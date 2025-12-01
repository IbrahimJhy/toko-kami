"use client";

import { useCart } from "@/hooks/use-cart";
import Navbar from "@/components/navbar";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function CartPage() {
  const [isMounted, setIsMounted] = useState(false);
  const cart = useCart();
  const items = cart.items;
  const totalPrice = cart.totalPrice();
  
  const adminWa = process.env.NEXT_PUBLIC_ADMIN_WA || '6281234567890'; 

  // Wajib untuk Zustand Persist
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const handleCheckout = () => {
    if (items.length === 0) return;
    
    // Format Pesan WA
    const productList = items
      .map((item, index) => `${index + 1}. ${item.name} (${item.quantity}x)`)
      .join("\n");
      
    const text = `Halo, saya mau pesan:\n\n${productList}\n\n *Total: Rp ${totalPrice.toLocaleString("id-ID")}*\n\nMohon diproses ya!`;
    
    window.open(`https://wa.me/${adminWa}?text=${encodeURIComponent(text)}`, "_blank");
    
    // Setelah checkout, kosongkan keranjang
    cart.clearCart();
  };

  if (!isMounted) {
    // Tampilkan loading saat hydration
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-200 border-t-orange-600"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAFA] pb-20">
      <Navbar />
      
      <div className="mx-auto max-w-4xl p-6 lg:py-12">
        
        <Link href="/" className="mb-6 inline-flex items-center text-sm text-gray-500 hover:text-orange-600">
          ← Lanjutkan Belanja
        </Link>
        
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Keranjang Anda ({items.length})</h1>

        {items.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center text-gray-500 shadow-sm">
            Keranjang Anda kosong.
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* List Item Keranjang */}
            <div className="rounded-2xl bg-white p-6 shadow-xl space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0">
                  <div className="flex flex-col flex-1 pr-4">
                    <span className="font-semibold text-gray-900">{item.name}</span>
                    <span className="text-sm text-gray-500">
                      Rp {item.price.toLocaleString("id-ID")} x {item.quantity}
                    </span>
                  </div>
                  
                  {/* Quantity Control */}
                  <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50 px-1">
                    <button 
                      onClick={() => cart.decrementItem(item.id)} 
                      className="px-2 py-1 text-gray-500 hover:text-red-500"
                    >
                      -
                    </button>
                    <span className="min-w-[20px] text-center text-sm font-semibold">{item.quantity}</span>
                    <button 
                      onClick={() => cart.addItem(item)} 
                      className="px-2 py-1 text-gray-500 hover:text-green-500"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Summary dan Checkout */}
            <div className="rounded-2xl bg-white p-6 shadow-xl">
              <div className="flex justify-between font-bold text-2xl mb-4">
                <span>Total Belanja:</span>
                <span className="text-orange-600">Rp {totalPrice.toLocaleString("id-ID")}</span>
              </div>
              <button 
                onClick={handleCheckout}
                className="w-full rounded-full bg-green-600 py-3 font-bold text-white shadow-lg disabled:opacity-50 hover:bg-green-700 transition-colors"
              >
                Checkout via WhatsApp
              </button>
              <button 
                onClick={cart.clearCart}
                className="w-full mt-2 text-sm text-gray-500 hover:text-red-500"
              >
                Hapus Semua Item
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}