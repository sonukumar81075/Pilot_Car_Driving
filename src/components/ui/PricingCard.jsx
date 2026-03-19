import { Bike, Car, Check, ShoppingCart } from "lucide-react";
import React from "react";

export function PricingCard({ data }) {
  const plans = data?.plans || [];

  return (
    <div className="mt-16 flex flex-wrap justify-center gap-8">
      {plans.map((plan) => {
        const price = Number(plan.price || 0);
        return (
          <article
            key={plan.title}
            className={`relative flex w-full max-w-md flex-col overflow-hidden rounded-3xl border-2 bg-white transition-all duration-300 ${
              plan.isPopular
                ? "border-[var(--brand)] shadow-2xl"
                : "border-slate-100 shadow-sm"
            }`}
          >
            {/* Best Value Badge */}
            {plan.isPopular && (
              <div className="absolute right-6 top-6">
                <span className="rounded-full bg-slate-900 px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  Best Value
                </span>
              </div>
            )}

            {/* Header */}
            <div className="p-8 text-left">
              <div className="flex items-center justify-between pt-2">
                <h3 className="text-2xl font-bold text-slate-900">{plan.title}</h3>
                <div className="rounded-xl bg-[var(--brand-muted)] p-2 text-[var(--brand)]">
                  {plan.icon === "car" && <Car size={24} />}
                  {plan.icon === "bike" && <Bike size={24} />}
                  {plan.icon === "license" && <Car size={24} />} {/* fallback icon */}
                </div>
              </div>

              <p className="mt-4 text-sm font-sans font-[500] leading-[26px] text-[#262626]">
                {plan.description}
              </p>

              {/* Features */}
              {Array.isArray(plan.features) && plan.features.length > 0 && (
                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50">
                        <Check size={14} className="text-emerald-500" />
                      </span>
                      <span className="text-sm font-[500] text-[#262626]">{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Price + CTA */}
            <div
              className={`mt-auto p-8 pt-0 ${
                plan.isPopular ? "bg-[var(--brand-muted)]/80" : "bg-slate-50"
              }`}
            >
              <div className="mb-6 flex items-baseline gap-2 pt-6">
                <span className="text-4xl font-bold text-slate-900">
                  ₹{price.toLocaleString("en-IN")}
                </span>
                <span className="text-sm font-medium text-slate-400">one-time payment</span>
              </div>

              <button className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-slate-900 py-4 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]">
                <ShoppingCart size={18} />
                Add to Cart
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}