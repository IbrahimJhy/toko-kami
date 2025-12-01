import { supabase } from "@/lib/supabase";
import HomeClient from "@/components/home-client";

export const revalidate = 60; 

export default async function Home() {
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order('id', { ascending: true });

  if (error) {
    console.error("Error fetching products:", error);
  }

  return <HomeClient products={products || []} />;
}