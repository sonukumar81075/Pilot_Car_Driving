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
        "font-sans relative w-full rounded-2xl sm:rounded-3xl border bg-white p-3 sm:p-5 md:p-6 text-left shadow-sm transition-all duration-300",
        selected
          ? "border-blue-500 ring-2 ring-blue-100"
          : "border-slate-200 hover:border-slate-300 hover:-translate-y-0.5",
      ].join(" ")}
    >
      {pkg?.uiMostPopular ? (
        <span className="absolute -top-3 left-6 z-20 rounded-full bg-blue-600 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow">
          ★ Most Popular
        </span>
      ) : null}

      <div className="relative mb-2 flex items-center justify-between">
        <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          {pkg?.uiBadge}
        </span>
        <span
          className={[
            "flex h-4 w-4 items-center justify-center rounded-full border transition-colors",
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

      <h3 className="relative text-[17px] sm:text-[24px] md:text-[28px] font-semibold leading-tight tracking-tight font-sans text-slate-900">
        {pkg?.uiTier || pkg?.name}
      </h3>

      {pkg?.description ? (
        <p className="relative mt-1.5 text-[12px] sm:text-[14px] md:text-[15px] font-medium leading-5 sm:leading-6 text-slate-500">
          {pkg.description}
        </p>
      ) : null}

      <ul className="relative mt-3 sm:mt-5 space-y-1.5 sm:space-y-2.5">
        {features.slice(0, 3).map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2 text-[11px] sm:text-sm font-medium text-slate-700"
          >
            <div className="flex h-3 w-3 sm:h-5 sm:w-5 shrink-0 items-center justify-center rounded-full border border-emerald-400 bg-emerald-50">
              <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-600" />
            </div>

            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="relative mt-4 sm:mt-6 border-t border-slate-100 pt-3 sm:pt-4">
        <div className="flex items-end gap-1">
          <span className="text-[20px] leading-none sm:text-3xl font-extrabold tracking-tight text-slate-900">
            ${finalPrice.toFixed(0)}
          </span>
          <span className="pb-1 text-xs font-bold uppercase tracking-wide text-slate-400">
            / Total
          </span>
        </div>
      </div>
    </button>
  );
}