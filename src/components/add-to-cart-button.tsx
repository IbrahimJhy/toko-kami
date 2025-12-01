"use client";

import { Product } from "@/types";
import { useCart } from "@/hooks/use-cart";

interface AddToCartProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartProps) {
  const cart = useCart();

  const handleAdd = () => {
    cart.addItem(product);
  };

  return (
    <button
      onClick={handleAdd}
      className="w-full rounded-full py-4 text-center font-bold text-white shadow-lg transition-all active:scale-[0.98] bg-gray-900 shadow-gray-200 hover:bg-black hover:shadow-xl"
    >
      + Tambah ke Keranjang
    </button>
  );
}