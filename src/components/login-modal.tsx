"use client";

import { useState } from "react";

interface LoginModalProps {
  isOpen: boolean;
  onLogin: (name: string) => void;
  onSkip: () => void;
}

export default function LoginModal({ isOpen, onLogin, onSkip }: LoginModalProps) {
  const [tempName, setTempName] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempName.trim()) onLogin(tempName);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-sm overflow-hidden rounded-3xl bg-white p-8 shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-3xl">
            👋
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Selamat Datang!</h2>
          <p className="mt-2 text-sm text-gray-500">Boleh tau siapa nama kamu sebelum memesan?</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input
            type="text"
            placeholder="Tulis nama panggilan..."
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-center font-medium text-gray-900 outline-none placeholder:text-gray-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            autoFocus
          />
          <button
            type="submit"
            disabled={!tempName.trim()}
            className="w-full rounded-xl bg-gray-900 py-3.5 font-semibold text-white transition-all hover:bg-black hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Masuk
          </button>
        </form>

        <button
          onClick={onSkip}
          className="mt-4 w-full text-xs font-medium text-gray-400 hover:text-gray-600 transition-colors"
        >
          Lewati, saya hanya ingin melihat-lihat
        </button>
      </div>
    </div>
  );
}