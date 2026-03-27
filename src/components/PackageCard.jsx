"use client";

import React from "react";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

function toImageUrl(imageUrl) {
  if (!imageUrl) return null;
  if (typeof imageUrl !== "string") return null;
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) return imageUrl;
  // API returns paths like /uploads/...
  return `https://devapi.pilotadmin.site${imageUrl}`;
}

export function PackageCard({ pkg }) {
  const router = useRouter();
  const img = toImageUrl(pkg?.image_url);
  const basePrice = Number(pkg?.base_price || 0);
  const discount = Number(pkg?.discounted_base_price || 0);
  const finalPrice = Math.max(basePrice - discount, 0) || basePrice;
  const hasDiscount = discount > 0 && finalPrice < basePrice;
  const duration = typeof pkg?.duration === "number" ? pkg.duration : Number(pkg?.duration);
  const isRecommended = Boolean(pkg?.recommended);

  const features = [];
  if (duration > 0) {
    features.push(`${duration} practical driving sessions`);
  }
  if (pkg?.trialSessions && pkg?.trialSessionsCount) {
    features.push(`Trial sessions: ${pkg.trialSessionsCount}`);
  }
  if (pkg?.allowLicenseAddOns) {
    features.push("License add-on available");
  }
  if (pkg?.secondOnly) {
    features.push("Second training available");
  }
  // isRecommended ? "border-blue-600 ring-1 ring-blue-600" : "border-slate-100",
  return (
    <article
      className={[
        "group flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all font-lexend md:rounded-3xl",
        "hover:-translate-y-0.5 hover:shadow-lg",

      ].join(" ")}
    >
      <div className="relative h-24 w-full overflow-hidden bg-slate-50 sm:h-28 md:aspect-[16/10] md:h-auto">
        {img ? (
          <img
            src={img}
            alt={pkg?.name || "Package image"}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-50">
            <div className="rounded-xl bg-white px-2 py-1 text-[10px] font-semibold text-slate-600 shadow-sm md:rounded-2xl md:px-4 md:py-2 md:text-sm">
              No image
            </div>
          </div>
        )}

        {isRecommended ? (
          <div className="absolute right-2 top-2 md:right-4 md:top-4">
            <span className="rounded-full btn-gradient btn-gradient-glow px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white md:px-3 md:py-1 md:text-[10px]">
              Recommended
            </span>
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-4 md:p-6">
        <h3 className="line-clamp-3 font-sans text-base font-[700] leading-tight text-blue-900 md:text-[20px] md:leading-[26px]">
          {pkg?.name}
        </h3>
        {pkg?.description ? (
          <p className="line-clamp-2 mt-1.5 font-sans text-xs font-[500] leading-5 text-slate-500 md:mt-2 md:line-clamp-3 md:text-[14px] md:leading-[22px]">
            {pkg.description}
          </p>
        ) : null}

        {/* Features section */}
        {features.length > 0 && (
          <ul className="mt-3 space-y-1 md:mt-6">
            {features.slice(0, 3).map((feature) => (
              <li key={feature} className="flex items-start gap-2 md:gap-3">
                <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-50 md:mt-1 md:h-5 md:w-5">
                  <Check size={12} className="text-emerald-500 md:h-[14px] md:w-[14px]" />
                </span>
                <span className="line-clamp-2 text-xs font-[500] text-[#262626] md:text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-3 md:pt-6">
          <div className="flex items-baseline gap-1.5 md:gap-2">
            <span className="text-[30px] font-extrabold leading-none text-blue-900 md:text-2xl">
              ₹{Number(finalPrice || 0).toLocaleString("en-IN")}
            </span>
            <span className="text-[10px] font-semibold text-slate-400 font-lexend md:text-xs">
              one-time payment
            </span>
          </div>
          {hasDiscount ? (
            <div className="mt-1 text-[10px] font-semibold text-slate-400 md:text-xs">
              <span className="mr-2 line-through opacity-70 text-red-500 md:mr-3">
                ₹{Number(basePrice || 0).toLocaleString("en-IN")}
              </span>
              <span className="text-xs font-semibold text-slate-600 md:text-sm">
                ₹{Number(discount || 0).toLocaleString("en-IN")} off
              </span>
            </div>
          ) : null}
          <button
            type="button"
            onClick={() => {
              if (!pkg?.package_id) return;
              router.push(`/packages/${pkg.package_id}`);
            }}
            className="mt-3 w-full rounded-lg btn-gradient btn-gradient-glow text-white py-2.5 text-xs font-bold cursor-pointer transition font-lexend active:scale-[0.99] md:mt-4 md:rounded-xl md:py-3 md:text-base"
          >
            Add Cart
          </button>
        </div>
      </div>
    </article>
  );
}

