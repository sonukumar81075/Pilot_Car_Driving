"use client";

import React from "react";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

const PUBLIC_BACKEND_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL;

function toImageUrl(imageUrl) {
  if (!imageUrl) return null;
  if (typeof imageUrl !== "string") return null;
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) return imageUrl;
  // API returns paths like /uploads/...
  return `${PUBLIC_BACKEND_BASE_URL}${imageUrl}`;
}

export function PackageCard({ pkg }) {
  const router = useRouter();
  const img = toImageUrl(pkg?.image_url);
  const basePrice = Number(pkg?.base_price || 0);
  const discountedPrice = Number(pkg?.discounted_base_price || 0);
  const finalPrice = discountedPrice > 0 ? discountedPrice : basePrice;
  const offAmount = Math.max(basePrice - finalPrice, 0);
  const hasDiscount = offAmount > 0;
  const duration = typeof pkg?.duration === "number" ? pkg.duration : Number(pkg?.duration);
  const isRecommended = Boolean(pkg?.recommended);
  const drivingType = String(pkg?.driving_type || "").toLowerCase();
  const showPackageImage = drivingType === "license" || drivingType === "licence";

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
        "group flex h-full min-h-0 w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all font-lexend md:rounded-3xl",
        "hover:-translate-y-0.5 hover:shadow-lg",
      ].join(" ")}
    >
      {showPackageImage ? (
        <div className="relative h-44 w-full overflow-hidden bg-slate-50 sm:h-28 md:aspect-[16/10] md:h-auto">
          {img ? (
            <img
              src={img}
              alt={pkg?.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
          ) : (
            <img
              src="/images/No image available placeholder.png"
              alt={pkg?.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
          )}

          {isRecommended ? (
            <div className="absolute right-2 top-2 md:right-4 md:top-4">
              <span className="rounded-full btn-gradient btn-gradient-glow px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white md:px-3 md:py-1 md:text-[10px]">
                Recommended
              </span>
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="relative flex w-full min-w-0 flex-1 flex-col p-3 sm:p-4 md:p-6">
        {!showPackageImage && isRecommended ? (
          <div className="flex w-full min-w-0 items-start justify-between gap-2">
            <h3 className="min-w-0 flex-1 line-clamp-3 font-sans text-base font-[700] leading-tight text-blue-900 md:text-[20px] md:leading-[26px]">
              {pkg?.name}
            </h3>
            <span className="shrink-0 rounded-full btn-gradient btn-gradient-glow px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white md:px-3 md:py-1 md:text-[10px]">
              Recommended
            </span>
          </div>
        ) : (
          <h3 className="line-clamp-3 font-sans text-base font-[700] leading-tight text-blue-900 md:text-[20px] md:leading-[26px]">
            {pkg?.name}
          </h3>
        )}
        {pkg?.description ? (
          <p className="mt-1.5 line-clamp-2 w-full min-w-0 font-sans text-xs font-[500] leading-5 text-slate-500 md:mt-2 md:line-clamp-3 md:text-[14px] md:leading-[22px]">
            {pkg.description}
          </p>
        ) : null}

        {/* Features section */}
        {features.length > 0 && (
          <ul className="mt-3 w-full min-w-0 space-y-1 md:mt-6">
            {features.slice(0, 3).map((feature) => (
              <li key={feature} className="flex w-full min-w-0 items-start gap-2 md:gap-3">
                <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-50 md:mt-1 md:h-5 md:w-5">
                  <Check size={12} className="text-emerald-500 md:h-[14px] md:w-[14px]" />
                </span>
                <span className="min-w-0 flex-1 line-clamp-2 text-xs font-[500] text-[#262626] md:text-sm">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto w-full min-w-0 pt-3 md:pt-6">
          <div className="flex w-full min-w-0 flex-wrap items-baseline justify-between gap-x-2 gap-y-1">
            <span className="text-[30px] font-extrabold leading-none text-blue-900 md:text-2xl">
              ₹{Number(finalPrice || 0).toLocaleString("en-IN")}
            </span>
            <span className="text-right text-[10px] font-semibold text-slate-400 font-lexend md:text-xs">
              one-time payment
            </span>
          </div>
          {hasDiscount ? (
            <div className="mt-1 w-full text-[10px] font-semibold text-slate-400 md:text-xs">
              <span className="mr-2 line-through opacity-70 text-red-500 md:mr-3">
                ₹{Number(basePrice || 0).toLocaleString("en-IN")}
              </span>
              <span className="text-xs font-semibold text-slate-600 md:text-sm">
                ₹{Number(offAmount || 0).toLocaleString("en-IN")} off
              </span>
            </div>
          ) : null}
          <button
            type="button"
            onClick={() => {
              if (!pkg?.package_id) return;
              router.push(`/packages/${pkg.package_id}`);
            }}
            className="mb-2 mt-6 w-full max-w-none cursor-pointer rounded-full py-2.5 text-xs font-bold text-white transition active:scale-[0.99] sm:mb-0 sm:mt-0 sm:rounded-xl md:mt-4 md:py-3 md:text-base btn-gradient btn-gradient-glow font-lexend"
          >
            Add Cart
          </button>
        </div>
      </div>
    </article>
  );
}

