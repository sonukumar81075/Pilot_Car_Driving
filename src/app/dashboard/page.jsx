"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AUTH_COOKIE_KEY = "pilot_auth";

export default function DashboardPage() {
  const router = useRouter();
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [user, setUser] = useState(null);

  // Protect dashboard route and allow only logged-in users.
  useEffect(() => {
    const savedUser = localStorage.getItem("pilotUser");

    if (!savedUser) {
      router.replace("/login");
      return;
    }

    try {
      setUser(JSON.parse(savedUser));
      document.cookie = `${AUTH_COOKIE_KEY}=1; path=/; max-age=2592000; samesite=lax`;
      setIsCheckingSession(false);
    } catch {
      localStorage.removeItem("pilotUser");
      router.replace("/login");
    }
  }, [router]);

  const handleLogout = () => {
    // Clear persisted login session and send user to login page.
    localStorage.removeItem("pilotUser");
    document.cookie = `${AUTH_COOKIE_KEY}=; path=/; max-age=0; samesite=lax`;
    router.replace("/login");
  };

  if (isCheckingSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FFFFFF] px-4">
        <p className="rounded-xl bg-slate-100 px-5 py-3 text-sm font-medium text-slate-600">Loading dashboard...</p>
      </main>
    );
  }

  const displayName = user?.user?.name || user?.name || "Learner";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FFFFFF] px-4">
      <section className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(37,99,235,0.08)]">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-2 text-sm font-medium text-slate-500">Welcome, {displayName}</p>

        <div className="mt-6 rounded-xl bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-700">You are logged in successfully.</p>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-6 w-full rounded-full bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
        >
          Logout
        </button>
      </section>
    </main>
  );
}
