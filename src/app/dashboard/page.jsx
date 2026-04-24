"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const savedUser = sessionStorage.getItem("pilotUser") || localStorage.getItem("pilotUser");
    const token =
      sessionStorage.getItem("token") ||
      sessionStorage.getItem("accessToken") ||
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken");

    if (!savedUser || !token) {
      router.replace("/login");
      return;
    }

    router.replace("/my-account");
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FFFFFF] px-4">
      <p className="rounded-xl bg-slate-100 px-5 py-3 text-sm font-medium text-slate-600">Redirecting to My Profile...</p>
    </main>
  );
}
