"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export default function MyAccountPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const rawUser = localStorage.getItem("pilotUser");

    if (!rawUser) {
      router.replace("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(rawUser);
      setUserData(parsedUser);
      setIsLoading(false);
    } catch {
      localStorage.removeItem("pilotUser");
      router.replace("/login");
    }
  }, [router]);

  const prettyUserJson = useMemo(() => {
    if (!userData) return "";
    return JSON.stringify(userData, null, 2);
  }, [userData]);

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FFFFFF] px-4">
        <p className="rounded-xl bg-slate-100 px-5 py-3 text-sm font-medium text-slate-600">
          Loading account details...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFFFFF] px-4 pb-16 pt-28 font-lexend md:pt-32">
      <section className="mx-auto w-full max-w-4xl rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(37,99,235,0.08)] sm:p-8">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">My Account</h1>
        <p className="mt-2 text-sm font-medium text-slate-500">
          Below is the current logged-in user data stored in localStorage.
        </p>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <pre className="overflow-x-auto whitespace-pre-wrap break-words text-xs leading-6 text-slate-700 sm:text-sm">
            {prettyUserJson}
          </pre>
        </div>
      </section>
    </main>
  );
}
