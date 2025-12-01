"use client";

import { Product } from "@/types";
import { useCart } from "@/hooks/use-cart";
import { useState } from "react";

interface AddToCartProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartProps) {
  const cart = useCart();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAdd = () => {
    cart.addItem(product);
    
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
    }, 2000);
  };

  return (
    <button
      onClick={handleAdd}
      disabled={isSuccess}
      className={`w-full rounded-full py-4 text-center font-bold text-white shadow-lg transition-all active:scale-[0.98] 
        ${isSuccess 
          ? "bg-green-600 shadow-green-200 cursor-default scale-100" 
          : "bg-gray-900 shadow-gray-200 hover:bg-black hover:shadow-xl"
        }`}
    >
      {isSuccess ? (
        <span className="flex items-center justify-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          ✓ Berhasil Masuk Keranjang
        </span>
      ) : (
        "+ Tambah ke Keranjang"
      )}
    </button>
  );
}