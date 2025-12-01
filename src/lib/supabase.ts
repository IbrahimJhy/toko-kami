// src/lib/supabase.ts

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Perubahan ada di sini:
if (!supabaseUrl) {
  throw new Error(`[VERCEL ENV ERROR] NEXT_PUBLIC_SUPABASE_URL is missing. Value: ${supabaseUrl}`);
}

if (!supabaseKey) {
  throw new Error(`[VERCEL ENV ERROR] NEXT_PUBLIC_SUPABASE_ANON_KEY is missing. Value: ${supabaseKey}`);
}

// Lanjutkan dengan kode Supabase Anda
export const supabase = createClient(supabaseUrl, supabaseKey);