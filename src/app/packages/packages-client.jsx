"use client";

import React, { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PackageCard } from "@/components/PackageCard";
import { Car, Bike, FileText } from "lucide-react";

const API_URL = "https://devapi.pilotadmin.site/packages/get-packages";

function normalizeType(type) {
  const t = String(type || "").trim();
  if (!t) return "";
  const lower = t.toLowerCase();
  if (lower === "car") return "Car";
  if (lower === "bike") return "Bike";
  if (lower === "license") return "License";
  return t;
}

export default function PackagesClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryType = normalizeType(searchParams.get("type"));
  const [activeType, setActiveType] = useState(queryType || "Car");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [packages, setPackages] = useState([]);

  const tabs = useMemo(
    () => [
      { id: "Car", label: "Car Packages", icon: Car },
      { id: "Bike", label: "Bike Packages", icon: Bike },
      { id: "License", label: "License Assistance", icon: FileText },
    ],
    []
  );

  useEffect(() => {
    setActiveType(queryType || "Car");
  }, [queryType]);

  function handleTabChange(nextType) {
    setActiveType(nextType);
    const params = new URLSearchParams(searchParams.toString());
    params.set("type", nextType);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    async function run() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(API_URL, { signal: controller.signal, cache: "no-store" });
        if (!res.ok) throw new Error(`API error (${res.status})`);
        const json = await res.json();
        const list = Array.isArray(json?.data) ? json.data : [];
        if (!cancelled) setPackages(list);
      } catch (e) {
        if (!cancelled && e?.name !== "AbortError") {
          setError(e?.message || "Failed to load packages.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  const filtered = useMemo(() => {
    const list = Array.isArray(packages) ? packages : [];
    const byType = activeType
      ? list.filter((p) => String(p?.driving_type).toLowerCase() === activeType.toLowerCase())
      : list;

    // Sort by show_order asc (bonus)
    const sorted = [...byType].sort((a, b) => (a?.show_order ?? 999) - (b?.show_order ?? 999));

    // Recommended first (bonus)
    sorted.sort((a, b) => Number(Boolean(b?.recommended)) - Number(Boolean(a?.recommended)));

    return sorted;
  }, [packages, activeType]);

  return (
    <main className="min-h-screen bg-[#FFFFFF] pb-16 pt-24 md:pt-28 font-lexend mt-6">
      <Container>
        <SectionHeading
          title={activeType ? `${activeType} Packages` : "Packages"}
          description={
            activeType
              ? `Showing ${activeType} packages from our latest catalog with best deals and offers for you to choose from for your driving journey.`
              : "Browse all available packages."
          }
        />

        {/* Type tabs (minimal style) */}
        {/* Type tabs (Modern Floating Chips) */}
        <div className="mx-auto mt-12 flex flex-wrap items-center justify-center gap-3 bg-slate-50 rounded-xl py-4">
          {tabs.map((tab) => {
            const active = tab.id === activeType;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id)}
                className={`
          group relative flex items-center gap-2.5 rounded-full px-5 py-2.5 cursor-pointer text-sm font-bold transition-all duration-300
          ${active
                    ? "btn-gradient btn-gradient-glow text-white   scale-105"
                    : "bg-white border border-slate-200 text-slate-600 hover:border-[#2D5BFF]/30 hover:bg-slate-50"
                  }
        `}
              >
                <span className={`
          flex h-6 w-6 items-center justify-center rounded-full transition-colors duration-300
          "}
        `}>
                  <tab.icon className="h-6 w-6" />
                </span>

                <span className="tracking-wide">{tab.label}</span>

              </button>
            );
          })}
        </div>

        {loading ? (
          <div className="mt-10 grid gap-6 transition-opacity duration-200 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-[360px] animate-pulse rounded-3xl border border-slate-100 bg-slate-50"
              />
            ))}
          </div>
        ) : error ? (
          <div className="mt-10 rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
            <div className="text-sm font-bold">Could not load packages</div>
            <div className="mt-1 text-sm">{error}</div>
            <button
              type="button"
              className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-slate-100 bg-slate-50 p-8 text-center">
            <div className="text-lg font-bold text-slate-900">No packages available</div>
            <div className="mt-1 text-sm font-medium text-slate-600">
              {activeType
                ? `We couldn't find any packages for driving_type = \"${activeType}\".`
                : "No packages were returned from the API."}
            </div>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 transition-all duration-300 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((pkg) => (
              <PackageCard key={pkg.package_id || `${pkg.name}-${pkg.show_order}`} pkg={pkg} />
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}

