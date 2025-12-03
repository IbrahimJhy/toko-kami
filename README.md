# 🌽 TokoKami - Website Jajanan Online

Website e-commerce modern, cepat, dan responsif dengan fitur **Checkout via WhatsApp**.

Proyek ini menggunakan **Next.js (App Router)** dan **Supabase**. Dirancang untuk kemudahan pengelolaan: produk ditambah melalui tabel database (tanpa koding), dan link produk (*slug*) digenerate otomatis.

![TokoKami Screenshot](/public/Contoh.png)

## ✨ Fitur Utama

* **🛍️ Katalog Real-time:** Produk diambil langsung dari Supabase.
* **🛒 Keranjang Belanja:** Manajemen pesanan (tambah/kurang/hapus) yang responsif.
* **📝 Form Data Diri:** Input nama dan alamat pengiriman sebelum checkout.
* **📲 Checkout WhatsApp:** Pesanan diformat otomatis dan diarahkan ke WhatsApp Admin.
* **⚙️ Auto-Slug:** Sistem otomatis membuat URL SEO-friendly saat produk diinput.

## 🛠️ Teknologi

* **Frontend:** [Next.js](https://nextjs.org/) (App Router), [Tailwind CSS](https://tailwindcss.com/), [Lucide React](https://lucide.dev/).
* **Backend:** [Supabase](https://supabase.com/) (PostgreSQL & Storage).
* **Bahasa:** TypeScript.

## 🚀 Cara Menjalankan (Getting Started)

### 1. Setup Database
Agar fitur website berjalan lancar, kita perlu menyiapkan tabel database.

1. Buka file [`supabase/schema.sql`](supabase/schema.sql) di repo ini.
2. Salin (**Copy**) seluruh isinya.
3. Buka Dashboard Supabase > Menu **SQL Editor**.
4. Tempel (**Paste**) kode tersebut dan klik **Run**.

### 2. Konfigurasi Environment
Buat file `.env.local` di folder utama proyek, lalu isi dengan kredensial Supabase dan Nomor Admin Anda:

```env
NEXT_PUBLIC_SUPABASE_URL=https://proyek-anda.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=kunci-anon-anda
# Gunakan format 62 tanpa tanda + atau spasi (Contoh: 628123456789)
NEXT_PUBLIC_ADMIN_WA=6281234567890
```

3. Instalasi & Jalankan Server
Buka terminal di folder proyek dan jalankan perintah berikut:

# Install dependensi
npm install

# Jalankan server lokal
npm run dev

Buka http://localhost:3000 untuk melihat hasilnya.

📖 Cara Input Produk (Tanpa Koding)

Anda tidak perlu menyentuh kodingan untuk menambah produk baru:

    Buka Dashboard Supabase > Table Editor.

    Pilih tabel products.

    Klik Insert Row.

    Isi data: name, price, description, dan image_url.

    PENTING: Kosongkan kolom slug (biarkan NULL).

    Klik Save. Database akan otomatis mengisi slug dan produk langsung muncul di website.