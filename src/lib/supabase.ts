import { createClient } from '@supabase/supabase-js'; // <--- BARIS INI WAJIB ADA

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Logika untuk memastikan variabel lingkungan disetel
if (!supabaseUrl) {
  // Pesan error diubah agar lebih membantu jika gagal lagi
  throw new Error(`[ENV ERROR] NEXT_PUBLIC_SUPABASE_URL belum diset di Vercel.`);
}

if (!supabaseKey) {
  // Pesan error diubah agar lebih membantu jika gagal lagi
  throw new Error(`[ENV ERROR] NEXT_PUBLIC_SUPABASE_ANON_KEY belum diset di Vercel.`);
}

// Inisialisasi klien Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);