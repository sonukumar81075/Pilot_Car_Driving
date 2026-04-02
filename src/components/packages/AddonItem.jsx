"use client";

import { Check } from "lucide-react";

export function AddonItem({ addon, checked, onToggle }) {
  return (
    <label
      className={[
        "font-sans group flex cursor-pointer items-center gap-3 rounded-xl sm:rounded-2xl border bg-white p-3 sm:p-4 shadow-sm transition-all duration-200",
        checked
          ? "border-blue-300 ring-2 ring-blue-100"
          : "border-slate-200 hover:border-slate-300",
      ].join(" ")}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onToggle(addon.id)}
        className="sr-only"
      />
      <span className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full   text-white shadow-sm">
        {checked ? <Check className="h-3 w-3 sm:h-6 sm:w-6 text-white bg-blue-600 rounded-full p-1 border border-blue-600" strokeWidth={2} /> : null}
      </span>
      <div className="flex-1">
        <p className="text-[14px] sm:text-[18px] md:text-[18px] font-bold leading-tight text-slate-800">{addon.title}</p>
        {addon.description ? (
          <p className="text-[11px] sm:text-sm font-medium leading-5 sm:leading-6 text-slate-500">{addon.description}</p>
        ) : null}
      </div>
      <div className="text-[20px] leading-none sm:text-[20px] md:text-[24px] font-black tracking-tight text-slate-800">
        +${Number(addon.price || 0).toFixed(0)}
      </div>
    </label>
  );
}
