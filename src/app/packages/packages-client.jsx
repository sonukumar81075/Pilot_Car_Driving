"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PackageCard } from "@/components/PackageCard";

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
  const searchParams = useSearchParams();
  const type = normalizeType(searchParams.get("type"));

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [packages, setPackages] = useState([]);

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
    const byType = type
      ? list.filter((p) => String(p?.driving_type).toLowerCase() === type.toLowerCase())
      : list;

    // Sort by show_order asc (bonus)
    const sorted = [...byType].sort((a, b) => (a?.show_order ?? 999) - (b?.show_order ?? 999));

    // Recommended first (bonus)
    sorted.sort((a, b) => Number(Boolean(b?.recommended)) - Number(Boolean(a?.recommended)));

    return sorted;
  }, [packages, type]);

  return (
    <main className="min-h-screen bg-[#FFFFFF] pb-16 pt-24 md:pt-28 font-lexend mt-6">
      <Container>
        <SectionHeading
          title={type ? `${type} Packages` : "Packages"}
          description={
            type
              ? `Showing ${type} packages from our latest catalog.`
              : "Browse all available packages."
          }
        />

        {loading ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
              {type
                ? `We couldn't find any packages for driving_type = \"${type}\".`
                : "No packages were returned from the API."}
            </div>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((pkg) => (
              <PackageCard key={pkg.package_id || `${pkg.name}-${pkg.show_order}`} pkg={pkg} />
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}

