"use client";

import { Check } from "lucide-react";

function getFinalPrice(pkg) {
  const base = Number(pkg?.base_price || 0);
  const discount = Number(pkg?.discounted_base_price || 0);
  const finalPrice = Math.max(base - discount, 0);
  return finalPrice > 0 ? finalPrice : base;
}

export function PackageOptionCard({ pkg, selected, onSelect }) {
  const finalPrice = getFinalPrice(pkg);
  const features = [];

  if (pkg?.duration && pkg.duration > 0)
    features.push(`${pkg.duration} Hours Practical Driving`);
  if (pkg?.trialSessions && pkg?.trialSessionsCount) {
    features.push(`Trial sessions: ${pkg.trialSessionsCount}`);
  }
  if (pkg?.allowLicenseAddOns)
    features.push("License add-on available");
  if (pkg?.secondOnly)
    features.push("Second training available");

  return (
    <button
      type="button"
      onClick={() => onSelect(pkg.package_id)}
      className={[
        "font-sans relative w-full rounded-3xl border bg-white/95 p-6 text-left shadow-sm backdrop-blur transition-all duration-300",
        // ❌ overflow-hidden removed
        selected
          ? "border-blue-500 ring-2 ring-blue-100 shadow-[0_10px_35px_-18px_rgba(37,99,235,0.8)]"
          : "border-slate-200/90 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-[0_12px_36px_-22px_rgba(15,23,42,0.35)]",
      ].join(" ")}
    >
      {/* TOP GRADIENT */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-blue-50/80 to-transparent rounded-t-3xl" />

      {/* MOST POPULAR BADGE */}
      {pkg?.uiMostPopular ? (
        <span className="absolute -top-4 left-6 z-20 rounded-full bg-blue-600 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-lg">
          Most Popular
        </span>
      ) : null}

      {/* HEADER */}
      <div className="relative mb-2 flex items-center justify-between">
        <span className="rounded-md bg-blue-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-600">
          {pkg?.uiBadge}
        </span>

        {/* RADIO DOT */}
        <span
          className={[
            "flex items-center justify-center h-4 w-4 rounded-full border transition-colors",
            selected
              ? "border-blue-500 bg-blue-500"
              : "border-slate-300 bg-white",
          ].join(" ")}
        >
          {selected && (
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
          )}
        </span>
      </div>

      {/* TITLE */}
      <h3 className="relative text-[32px] font-extrabold leading-tight tracking-tight font-sans text-slate-900">
        {pkg?.uiTier || pkg?.name}
      </h3>

      {/* DESCRIPTION */}
      {pkg?.description ? (
        <p className="relative mt-2 text-[15px] font-medium leading-6 text-slate-500">
          {pkg.description}
        </p>
      ) : null}

      {/* FEATURES */}
      <ul className="relative mt-5 space-y-2.5">
        {features.slice(0, 3).map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2 text-sm font-medium text-slate-700"
          >
            {/* PERFECT CENTER ICON */}
            <div className="flex items-center justify-center w-5 h-5 border border-green-600 bg-white rounded-full shrink-0">
              <Check className="w-3 h-3 text-green-600" />
            </div>

            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* PRICE */}
      <div className="relative mt-6 border-t border-slate-100 pt-4">
        <div className="flex items-end gap-1">
          <span className="text-4xl font-black tracking-tight text-slate-900">
            ${finalPrice.toFixed(0)}
          </span>
          <span className="pb-1 text-xs font-bold uppercase tracking-wide text-slate-400">
            / total
          </span>
        </div>
      </div>
    </button>
  );
}