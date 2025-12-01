import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[#FAFAFA] text-center px-4">
      <h1 className="text-9xl font-bold text-gray-200">404</h1>
      <h2 className="mt-4 text-2xl font-bold text-gray-900">Halaman Tidak Ditemukan</h2>
      <p className="mt-2 text-gray-500">
        Maaf, jajanan yang Anda cari sepertinya sudah dimakan orang lain atau linknya salah.
      </p>
      <Link 
        href="/"
        className="mt-8 rounded-full bg-orange-600 px-8 py-3 font-bold text-white transition-all hover:bg-orange-700 hover:shadow-lg hover:shadow-orange-200"
      >
        Kembali ke Menu Utama
      </Link>
    </div>
  );
}