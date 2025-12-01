"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import Navbar from "@/components/navbar";
import LoginModal from "@/components/login-modal";
import { useAuth } from "@/hooks/use-auth";

interface HomeClientProps {
  products: Product[];
}

export default function HomeClient({ products }: HomeClientProps) {
  const auth = useAuth(); 
  const [isMounted, setIsMounted] = useState(false);
  
  // 1. Cek Hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 2. Tentukan kapan modal harus muncul: HANYA jika sudah di-mount DAN belum pernah ditampilkan
  const showLoginModal = isMounted && !auth.hasShownModal;
  
  // Jika belum mount, return null untuk mencegah Hydration Error
  if (!isMounted) return null;
  
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      
      {/* 1. Modal Login (Menggunakan global store) */}
      <LoginModal 
        isOpen={showLoginModal} 
        onLogin={auth.login} // Memanggil fungsi login dari global store
        onSkip={auth.skip}   // Memanggil fungsi skip dari global store
      />

      {/* 2. Navbar (Tidak perlu props) */}
      <Navbar /> 

      {/* 3. Hero Section (Konten disesuaikan dengan username) */}
      <section className="px-6 py-12 text-center lg:py-20">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 lg:text-6xl">
          Jajanan<span className="text-orange-600">Kami</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-500">
          Selamat datang {auth.username && auth.username !== "Tamu" ? auth.username : "di Toko Kami"}
        </p>
      </section>

      {/* 4. Katalog Produk (Grid) - (Sisa kode katalog tetap sama) */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        {products.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center text-gray-500 shadow-sm">
            Produk belum tersedia.
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <Link 
                href={`/product/${product.slug}`} 
                key={product.id}
                className="group relative flex flex-col overflow-hidden rounded-3xl bg-white transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-100"
              >
                {/* Gambar Card */}
                <div className="relative aspect-square w-full bg-gray-100 overflow-hidden">
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-orange-600 backdrop-blur-sm">
                    Kami
                  </div>
                </div>

                {/* Info Card */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-2 text-lg font-bold text-gray-900 group-hover:text-orange-600">
                    {product.name}
                  </h3>
                  <p className="mb-4 line-clamp-2 text-sm text-gray-500">
                    {product.description}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between border-t border-gray-50 pt-4">
                    <span className="text-lg font-bold text-gray-900">
                      Rp {product.price.toLocaleString("id-ID")}
                    </span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-50 text-orange-600 transition-colors group-hover:bg-orange-600 group-hover:text-white">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}