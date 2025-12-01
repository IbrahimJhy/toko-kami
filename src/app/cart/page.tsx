"use client";

import { useCart } from "@/hooks/use-cart";
import Navbar from "@/components/navbar";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: "", address: "" });

  const cart = useCart();
  const router = useRouter();
  const items = cart.items;
  const totalPrice = cart.totalPrice();
  
  const adminWa = process.env.NEXT_PUBLIC_ADMIN_WA || '6281234567890';

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onCheckoutClick = () => {
    if (items.length === 0) return;
    setShowModal(true);
    setIsSuccess(false);
  };

  const processCheckout = (e: React.FormEvent) => {
    e.preventDefault();

    const productList = items
      .map((item, index) => `${index + 1}. ${item.name} (${item.quantity}x) - Rp ${(item.price * item.quantity).toLocaleString("id-ID")}`)
      .join("\n");

    const text = `Halo, saya mau pesan:

*Data Pemesan:*
Nama: ${formData.name}
Alamat: ${formData.address}

*Pesanan:*
${productList}

*Total: Rp ${totalPrice.toLocaleString("id-ID")}*

Mohon diproses ya!`;
    
    window.open(`https://wa.me/${adminWa}?text=${encodeURIComponent(text)}`, "_blank");
    
    setIsSuccess(true);
  };

  const handleFinishOrder = () => {
    cart.clearCart();
    setShowModal(false);
    setIsSuccess(false);
    router.push("/");
  };

  if (!isMounted) {
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
            <div className="rounded-2xl bg-white p-6 shadow-xl space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6 last:border-b-0 last:pb-0">
                  <div className="flex flex-col flex-1">
                    <span className="font-semibold text-lg text-gray-900">{item.name}</span>
                    <span className="text-sm text-gray-500">
                      Rp {item.price.toLocaleString("id-ID")} / porsi
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50 px-1">
                      <button onClick={() => cart.decrementItem(item.id)} className="px-3 py-1 text-gray-500 hover:text-orange-600 disabled:opacity-50" disabled={item.quantity <= 1}>-</button>
                      <span className="min-w-[30px] text-center text-sm font-semibold">{item.quantity}</span>
                      <button onClick={() => cart.addItem(item)} className="px-3 py-1 text-gray-500 hover:text-green-600">+</button>
                    </div>
                    <button onClick={() => cart.removeItem(item.id)} className="rounded-full bg-red-50 p-2 text-red-500 hover:bg-red-100">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="rounded-2xl bg-white p-6 shadow-xl">
              <div className="flex justify-between font-bold text-2xl mb-4">
                <span>Total Belanja:</span>
                <span className="text-orange-600">Rp {totalPrice.toLocaleString("id-ID")}</span>
              </div>
              <button 
                onClick={onCheckoutClick}
                className="w-full rounded-full bg-green-600 py-3 font-bold text-white shadow-lg disabled:opacity-50 hover:bg-green-700 transition-colors"
              >
                Isi Data Pemesan
              </button>
              <button onClick={cart.clearCart} className="w-full mt-3 text-sm text-gray-400 hover:text-red-500 transition-colors">
                Hapus Semua Item
              </button>
            </div>
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-200">
              
              {!isSuccess ? (
                <>
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900">Data Pemesan</h3>
                    <button onClick={() => setShowModal(false)} className="rounded-full p-1 text-gray-400 hover:bg-gray-100">✕</button>
                  </div>

                  <form onSubmit={processCheckout} className="space-y-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">Nama Lengkap</label>
                      <input 
                        required type="text" placeholder="Contoh: Budi"
                        className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                        value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">Alamat Pengiriman</label>
                      <textarea 
                        required rows={3} placeholder="Contoh: Jl. Mawar No. 12..."
                        className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                        value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})}
                      />
                    </div>
                    <button type="submit" className="mt-2 w-full rounded-xl bg-orange-600 py-3 font-bold text-white hover:bg-orange-700">
                      Kirim Pesanan via WhatsApp
                    </button>
                  </form>
                </>
              ) : (
                <div className="flex flex-col items-center text-center py-4">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900">Membuka WhatsApp...</h3>
                  <p className="mb-6 text-sm text-gray-500">
                    Kami telah mengarahkan Anda ke WhatsApp Admin. Silakan kirim pesan tersebut agar pesanan diproses.
                  </p>
                  
                  <div className="w-full space-y-3">
                    <button 
                      onClick={handleFinishOrder}
                      className="w-full rounded-xl bg-green-600 py-3 font-bold text-white hover:bg-green-700"
                    >
                      Sudah Terkirim? Selesai
                    </button>
                    <button 
                      onClick={() => setIsSuccess(false)}
                      className="w-full text-sm text-gray-400 hover:text-gray-600"
                    >
                      WhatsApp tidak terbuka? Coba lagi
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}
      </div>
    </main>
  );
}