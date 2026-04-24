"use client";

import { useMemo, useState } from "react";
import { AddonItem } from "./AddonItem";
import { PackageOptionCard } from "./PackageOptionCard";
import { PaymentSummary } from "./PaymentSummary";
import LeadModal from "@/components/sections/LeadModal";
import { Container } from "../ui/Container";
import { getStoredAuthContext, normalizeLearnerProfile } from "@/lib/profile";

const PACKAGE_BOOKING_API_URL = "/api/packages/package-booking";

function getFinalPrice(pkg) {
  if (!pkg) return 0;
  const base = Number(pkg.base_price || 0);
  const discounted = Number(pkg.discounted_base_price || 0);
  return discounted > 0 ? discounted : base;
}

function getPackageFeatures(pkg) {
  const features = [];
  if (pkg?.duration && pkg.duration > 0) {
    features.push(`${pkg.duration} Hours Practical Driving`);
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
  return features;
}

export function PackageDetailsClient({ packageOptions, initialPackageId, addons, packageTypeLabel }) {
  const [selectedPackageId, setSelectedPackageId] = useState(Number(initialPackageId));
  const [selectedAddonId, setSelectedAddonId] = useState(null);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isBookingSubmitting, setIsBookingSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState("");

  const selectedPackage = useMemo(
    () => packageOptions.find((pkg) => pkg.package_id === selectedPackageId) || packageOptions[0],
    [packageOptions, selectedPackageId]
  );

  const addonsTotal = useMemo(
    () => {
      const selectedAddon = addons.find((addon) => addon.id === selectedAddonId);
      return Number(selectedAddon?.price || 0);
    },
    [addons, selectedAddonId]
  );

  const selectedAddons = useMemo(
    () => addons.filter((addon) => addon.id === selectedAddonId),
    [addons, selectedAddonId]
  );

  function toggleAddon(addonId) {
    setSelectedAddonId((current) => (current === addonId ? null : addonId));
  }

  const basePrice = getFinalPrice(selectedPackage);
  const subtotal = basePrice + addonsTotal;
  const taxRate = 0.08;
  const taxAmount = subtotal * taxRate;
  const totalPrice = subtotal + taxAmount;

  const isLicensePackage = String(packageTypeLabel || "").toLowerCase().includes("license");
  const actionLabel = isLicensePackage ? "Pay Now" : "Interested";

  const leadModalData = {
    checkoutSummary: true,
    promoTitle: selectedPackage?.uiTier || selectedPackage?.name || "Selected Package",
    promoText: selectedPackage?.description || "You are almost done. Confirm your details to continue.",
    formTitle: "Interested Lead?",
    formSubtitle: "Please fill out the form below and our team will get back to you shortly.",
    packageDetails: {
      badge: selectedPackage?.uiBadge || "Essentials",
      name: selectedPackage?.uiTier || selectedPackage?.name || "Selected Package",
      description: selectedPackage?.description || "",
      features: getPackageFeatures(selectedPackage),
      price: basePrice,
      hours: selectedPackage?.duration || 0,
      taxRate,
      taxAmount,
      addons: selectedAddons,
      total: totalPrice,
    },
    appBadges: [],
    zones: [],
  };

  const submissionMeta = {
    selectedPackage: {
      package_id: selectedPackage?.package_id,
      name: selectedPackage?.name,
      title: selectedPackage?.uiTier || selectedPackage?.name,
      description: selectedPackage?.description,
      hours: selectedPackage?.duration || 0,
      price: basePrice,
      packageType: packageTypeLabel,
    },
    selectedAddons: selectedAddons.map((addon) => ({
      id: addon.id,
      title: addon.title,
      price: Number(addon.price || 0),
    })),
    totalPrice,
    sourcePage: "package-details",
  };

  async function loadRazorpayScript() {
    if (window.Razorpay) return true;
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  async function handleActionClick() {
    if (!isLicensePackage) {
      setIsLeadModalOpen(true);
      return;
    }

    setBookingError("");
    setBookingSuccess("");

    const authContext = getStoredAuthContext();
    const token = authContext.token;
    const learnerID = authContext.learnerID;
    const profile = normalizeLearnerProfile(authContext.parsedUser);

    if (!token || !learnerID) {
      setBookingError("Please login to continue booking.");
      return;
    }

    setIsBookingSubmitting(true);
    try {
      const payload = {
        learnerID,
        package_id: selectedPackage?.package_id,
        add_ons: JSON.stringify(
          selectedAddons
            .map((addon) => Number(addon.id))
            .filter((id) => Number.isFinite(id) && id > 0)
        ),
        address: profile.address || "",
        lat: "10:20:00",
        long: "75.7873",
        pickupAddress: profile.address || "",
        gateway: "RZPAY",
        discounted_base_price: Number(basePrice || 0).toFixed(2),
        add_ons_total: Number(addonsTotal || 0).toFixed(2),
        price_adjustment: "0.00",
        subtotal: Number(subtotal || 0).toFixed(2),
        cgst_amount: "0.00",
        sgst_amount: "0.00",
        total_price: Number(totalPrice || 0).toFixed(2),
        payment_source: "web",
      };

      const response = await fetch(PACKAGE_BOOKING_API_URL, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok || result?.success === false) {
        throw new Error(result?.message || `Booking request failed (${response.status})`);
      }

      const razorpayKey = result?.data?.razorpay?.key;
      const razorpayOrderId = result?.data?.razorpay?.order?.order_id;
      const prefill = result?.data?.razorpay?.prefill || {};

      const canOpenRazorpay = await loadRazorpayScript();
      if (!canOpenRazorpay || !razorpayKey || !razorpayOrderId) {
        setBookingSuccess("Booking created successfully.");
        return;
      }

      const rzp = new window.Razorpay({
        key: razorpayKey,
        order_id: razorpayOrderId,
        name: "Pilot",
        description: selectedPackage?.name || "License Package Booking",
        prefill: {
          name: profile.name || "",
          email: prefill.email || profile.email || "",
          contact: prefill.contact || profile.contactInfo || "",
        },
        theme: {
          color: "#2563eb",
        },
      });
      rzp.on("payment.failed", (event) => {
        setBookingError(event?.error?.description || "Payment failed. Please try again.");
      });
      rzp.open();
      setBookingSuccess(result?.message || "Booked learner package successfully.");
    } catch (error) {
      setBookingError(error?.message || "Failed to create booking.");
    } finally {
      setIsBookingSubmitting(false);
    }
  }


  return (
    <Container>
      <div className="mx-auto w-full  ">
        <div className="sm:mb-4 mb-1 inline-flex rounded-full bg-blue-600 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
          Checkout
        </div>
        <h1 className="text-[26px] sm:text-4xl md:text-5xl font-semibold tracking-tight text-slate-900">
          {packageTypeLabel} Training <span className="relative inline-block  bg-gradient-to-r from-blue-600 to-indigo-500 uppercase sm:capitalize  py-1.5 bg-clip-text text-transparent   ">Packages</span>
        </h1>
        <p className="mt-1.5 text-[13px] sm:text-base font-medium text-slate-600">
          Select the best path for your driving journey
        </p>

        <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-6 lg:grid-cols-[1fr_340px]">
          <section>
            <h2 className="mb-4 text-xs font-black uppercase sm:tracking-[0.10em] tracking-[1px] text-slate-600">
              1 - Select Primary Package
            </h2>
            <div
              className={
                packageOptions.length === 1
                  ? "grid grid-cols-1 gap-6 sm:gap-4"
                  : "grid gap-6 sm:gap-4 md:grid-cols-2"
              }
            >
              {packageOptions.map((pkg) => (
                <PackageOptionCard
                  key={pkg.package_id}
                  pkg={pkg}
                  selected={selectedPackage?.package_id === pkg.package_id}
                  onSelect={setSelectedPackageId}
                />
              ))}
            </div>

            {!isLicensePackage ? (
              <>
                <h3 className="mb-4 mt-8 text-xs font-black uppercase sm:tracking-[0.10em] tracking-[1px] text-slate-600">
                  2 - Available Add-ons
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
                        checked={selectedAddonId === addon.id}
                        onToggle={toggleAddon}
                      />
                    ))
                  )}
                </div>
              </>
            ) : null}
          </section>

          <div className="lg:sticky lg:top-24 lg:h-fit">
            {bookingSuccess ? (
              <div className="mb-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
                {bookingSuccess}
              </div>
            ) : null}
            {bookingError ? (
              <div className="mb-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {bookingError}
              </div>
            ) : null}
            <PaymentSummary
              baseLabel={selectedPackage?.name || "Selected Package"}
              basePrice={basePrice}
              addonsTotal={addonsTotal}
              taxRate={taxRate}
              actionLabel={actionLabel}
              onActionClick={handleActionClick}
              isSubmitting={isBookingSubmitting}
            />
          </div>
        </div>

        <LeadModal
          data={leadModalData}
          isOpen={isLeadModalOpen}
          onClose={() => setIsLeadModalOpen(false)}
          submissionMeta={submissionMeta}
        />
      </div>
    </Container>
  );
}
