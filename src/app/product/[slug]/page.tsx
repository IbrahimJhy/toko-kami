import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";
import AddToCartButton from "@/components/add-to-cart-button";
import { Metadata } from "next";

export const revalidate = 60;

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data: product } = await supabase.from("products").select("*").eq("slug", slug).single();

  if (!product) return { title: "Produk Tidak Ditemukan" };

  return {
    title: `${product.name} | Toko Kami`,
    description: product.description.slice(0, 160),
    openGraph: {
      images: [product.image],
    },
  };
}

export async function generateStaticParams() {
  const { data: products } = await supabase.from("products").select("slug");
  return products?.map((p) => ({ slug: p.slug })) || [];
}

export default async function ProductDetail({ params }: ProductPageProps) {
  const { slug } = await params;
  
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#FAFAFA] pb-32">
      <Navbar />

      <div className="mx-auto max-w-4xl p-6 lg:py-12">
        <Link href="/" className="mb-6 inline-flex items-center text-sm text-gray-500 hover:text-orange-600">
          ← Kembali ke Menu
        </Link>

        <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
          <div className="w-full lg:w-1/2">
            <div className="overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-black/5">
              <div className="relative aspect-square w-full bg-gray-100">
              <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
            />
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col lg:w-1/2">
            <h1 className="mb-2 text-3xl font-bold text-gray-900 lg:text-4xl">
              {product.name}
            </h1>
            <p className="mb-6 text-2xl font-semibold text-orange-600">
              Rp {product.price.toLocaleString("id-ID")}
            </p>

            <div className="mb-8 h-px w-full bg-gray-100"></div>

            <p className="mb-8 leading-relaxed text-gray-600">
              {product.description}
            </p>

            <div className="mt-auto">
              <AddToCartButton product={product} />
              <p className="mt-4 text-center text-xs text-gray-400">
                *Klik tambah untuk memasukkan ke keranjang belanja
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}