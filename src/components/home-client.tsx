"use client";
import { useState, useEffect } from "react";
import { Product } from "@/types";
import Navbar from "@/components/navbar";
import ProductCard from "@/components/product-card";

interface HomeClientProps {
  products: Product[];
}

export default function HomeClient({ products }: HomeClientProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <main className="min-h-screen bg-[#FAFAFA]">
        <Navbar />
        <section className="px-6 py-12 text-center lg:py-20 animate-pulse">
          <div className="mx-auto h-12 w-3/4 rounded-lg bg-gray-200 lg:w-1/2"></div>
          <div className="mx-auto mt-4 h-6 w-1/2 rounded-lg bg-gray-200"></div>
        </section>
        <section className="mx-auto max-w-7xl px-6 pb-24">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square rounded-3xl bg-gray-200 animate-pulse"></div>
            ))}
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <Navbar />

      <section className="px-6 py-12 text-center lg:py-20">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 lg:text-6xl">
          Jajanan<span className="text-orange-600">Kami</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-500">
          Selamat datang di Toko Kami.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        {products.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center text-gray-500 shadow-sm">
            Produk belum tersedia.
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}