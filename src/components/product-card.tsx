"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { formatRupiah } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link 
      href={`/product/${product.slug}`} 
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
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
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
            {formatRupiah(product.price)}
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-50 text-orange-600 transition-colors group-hover:bg-orange-600 group-hover:text-white">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}