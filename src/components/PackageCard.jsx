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
        "group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-all font-lexend",
        "hover:-translate-y-0.5 hover:shadow-lg",

      ].join(" ")}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-50">
        {img ? (
          <img
            src={img}
            alt={pkg?.name || "Package image"}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-50">
            <div className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm">
              No image
            </div>
          </div>
        )}

        {isRecommended ? (
          <div className="absolute right-4 top-4">
            <span className="rounded-full btn-gradient btn-gradient-glow px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
              Recommended
            </span>
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="  font-sans text-[22px] font-[700] leading-tight text-blue-900 lg:text-[20px] lg:leading-[26px]">{pkg?.name}</h3>
        {pkg?.description ? (
          <p className="  line-clamp-3 mt-2 font-sans text-[15px] font-[500] leading-[26px] text-slate-500  lg:text-[15px] lg:leading-[22px]">
            {pkg.description}
          </p>
        ) : null}

        {/* Features section */}
        {features.length > 0 && (
          <ul className="mt-6 space-y-1">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50">
                  <Check size={14} className="text-emerald-500" />
                </span>
                <span className="text-sm font-[500] text-[#262626]">{feature}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-6">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-blue-900">
              ₹{Number(finalPrice || 0).toLocaleString("en-IN")}
            </span>
            <span className="text-xs font-semibold text-slate-400 font-lexend">
              one-time payment
            </span>
          </div>
          {hasDiscount ? (
            <div className="mt-1 text-xs font-semibold text-slate-400">
              <span className="mr-3 line-through opacity-70 text-red-500">
                ₹{Number(basePrice || 0).toLocaleString("en-IN")}
              </span>
              <span className="text-sm font-semibold text-slate-600">₹{Number(discount || 0).toLocaleString("en-IN")} off</span>
            </div>
          ) : null}
          <button
            type="button"
            // onClick={() => {
            //   if (!pkg?.package_id) return;
            //   router.push(`/packages/${pkg.package_id}`);
            // }}
            className="mt-4 w-full rounded-xl  btn-gradient btn-gradient-glow text-white py-3 text-base font-bold cursor-pointer transition font-lexend active:scale-[0.99]"
          >
            Add Cart
          </button>
        </div>
      </div>
    </article>
  );
}

