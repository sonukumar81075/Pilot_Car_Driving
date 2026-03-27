"use client";

import { useMemo, useState } from "react";
import { AddonItem } from "./AddonItem";
import { PackageOptionCard } from "./PackageOptionCard";
import { PaymentSummary } from "./PaymentSummary";

function getFinalPrice(pkg) {
  if (!pkg) return 0;
  const base = Number(pkg.base_price || 0);
  const discount = Number(pkg.discounted_base_price || 0);
  const finalPrice = Math.max(base - discount, 0);
  return finalPrice > 0 ? finalPrice : base;
}

export function PackageDetailsClient({ packageOptions, initialPackageId, addons, packageTypeLabel }) {
  const [selectedPackageId, setSelectedPackageId] = useState(Number(initialPackageId));
  const [selectedAddonIds, setSelectedAddonIds] = useState([]);

  const selectedPackage = useMemo(
    () => packageOptions.find((pkg) => pkg.package_id === selectedPackageId) || packageOptions[0],
    [packageOptions, selectedPackageId]
  );

  const addonsTotal = useMemo(
    () =>
      addons
        .filter((addon) => selectedAddonIds.includes(addon.id))
        .reduce((acc, addon) => acc + Number(addon.price || 0), 0),
    [addons, selectedAddonIds]
  );

  function toggleAddon(addonId) {
    setSelectedAddonIds((current) =>
      current.includes(addonId) ? current.filter((id) => id !== addonId) : [...current, addonId]
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4">
      <h1 className="text-4xl font-extrabold tracking-tight text-blue-900 sm:text-5xl">
        {packageTypeLabel} Training Packages
      </h1>
      <p className="mt-2 text-base font-medium text-blue-900">
        Select the best path for your driving journey
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">
        <section>
          <h2 className="mb-4 text-[24px] font-extrabold tracking-tight text-slate-900">
            1. Select Primary Package
          </h2>
          <div className="grid gap-8 sm:gap-4 md:grid-cols-2">
            {packageOptions.map((pkg) => (
              <PackageOptionCard
                key={pkg.package_id}
                pkg={pkg}
                selected={selectedPackage?.package_id === pkg.package_id}
                onSelect={setSelectedPackageId}
              />
            ))}
          </div>

          <h3 className="mb-4 mt-8 text-[28px] font-extrabold tracking-tight text-slate-900">
            2. Available Add-ons
          </h3>
          <div className="space-y-3">
            {addons.length === 0 ? (
              <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 text-sm text-slate-500 shadow-sm backdrop-blur">
                No add-ons available for this package right now.
              </div>
            ) : (
              addons.map((addon) => (
                <AddonItem
                  key={addon.id}
                  addon={addon}
                  checked={selectedAddonIds.includes(addon.id)}
                  onToggle={toggleAddon}
                />
              ))
            )}
          </div>
        </section>

        <div className="lg:sticky lg:top-24 lg:h-fit">
          <PaymentSummary
            baseLabel={selectedPackage?.name || "Selected Package"}
            basePrice={getFinalPrice(selectedPackage)}
            addonsTotal={addonsTotal}
            taxRate={0.08}
          />
        </div>
      </div>
    </div>
  );
}
