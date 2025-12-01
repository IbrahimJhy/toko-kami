export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#FAFAFA]">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-100 border-t-orange-600"></div>
        <p className="animate-pulse text-sm font-medium text-gray-500">Memuat Jajanan...</p>
      </div>
    </div>
  );
}