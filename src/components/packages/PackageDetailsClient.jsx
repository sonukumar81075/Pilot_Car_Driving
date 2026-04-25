"use client";

import { useCallback, useMemo, useState } from "react";
import { AddonItem } from "./AddonItem";
import { PackageOptionCard } from "./PackageOptionCard";
import { PaymentSummary } from "./PaymentSummary";
import LeadModal from "@/components/sections/LeadModal";
import { Container } from "../ui/Container";
import { getStoredAuthContext, isProfileComplete, normalizeLearnerProfile } from "@/lib/profile";
import { sendOtp, verifyOtp } from "@/services/auth";
import Image from "next/image";

const PACKAGE_BOOKING_API_URL = "/api/packages/package-booking";
const GET_LEARNERS_API_URL = "/api/users/get-learners";
const UPDATE_LEARNER_API_URL = "/api/users/update-learner";
const OTP_LENGTH = 4;
const MIN_SUCCESS_DELAY_MS = 2000;

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

function extractTokenFromPayload(payload) {
  if (!payload || typeof payload !== "object") return "";
  const queue = [payload];
  while (queue.length > 0) {
    const current = queue.shift();
    if (!current || typeof current !== "object") continue;
    for (const [key, value] of Object.entries(current)) {
      if (typeof value === "string" && key.toLowerCase().includes("token") && value.trim()) {
        return value.trim();
      }
      if (value && typeof value === "object") queue.push(value);
    }
  }
  return "";
}

function extractLearnerFromResponse(payload) {
  if (Array.isArray(payload?.learners) && payload.learners.length > 0) return payload.learners[0];
  if (payload?.learner) return payload.learner;
  if (Array.isArray(payload?.data?.learners) && payload.data.learners.length > 0) return payload.data.learners[0];
  if (payload?.data?.learner) return payload.data.learner;
  if (payload?.data) return payload.data;
  return payload || {};
}

function normalizeMobileWithCountryCode(value) {
  const compact = String(value || "").replace(/\s|-/g, "").trim();
  if (!compact) return "";
  if (/^\+\d{10,15}$/.test(compact)) return compact;
  if (/^\d{10}$/.test(compact)) return `+91${compact}`;
  return compact;
}

function isEmailUpdated(value) {
  const email = String(value || "").trim();
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isProfileReadyForPayment(profile) {
  if (!isProfileComplete(profile)) return false;
  return isEmailUpdated(profile?.email);
}

export function PackageDetailsClient({ packageOptions, initialPackageId, addons, packageTypeLabel }) {
  const [selectedPackageId, setSelectedPackageId] = useState(Number(initialPackageId));
  const [selectedAddonId, setSelectedAddonId] = useState(null);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isBookingSubmitting, setIsBookingSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState("");
  const [isGateModalOpen, setIsGateModalOpen] = useState(false);
  const [gateStep, setGateStep] = useState("auth");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [authMobile, setAuthMobile] = useState("");
  const [authOtp, setAuthOtp] = useState("");
  const [gateError, setGateError] = useState("");
  const [gateSuccess, setGateSuccess] = useState("");
  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    contactInfo: "",
    dob: "",
    gender: "",
  });
  const [isProfileSubmitting, setIsProfileSubmitting] = useState(false);

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

  const loadRazorpayScript = useCallback(async () => {
    if (window.Razorpay) return true;
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }, []);

  const delay = useCallback((ms) => new Promise((resolve) => setTimeout(resolve, ms)), []);

  const fetchLatestProfile = useCallback(async (token, learnerID) => {
    const response = await fetch(`${GET_LEARNERS_API_URL}?learnerID=${encodeURIComponent(learnerID)}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    const result = await response.json().catch(() => null);
    if (!response.ok || result?.success === false || result?.ok === false) {
      throw new Error(result?.message || "Failed to fetch profile.");
    }
    const learnerNode = extractLearnerFromResponse(result);
    return normalizeLearnerProfile(learnerNode);
  }, []);

  const openProfileGate = useCallback((profile) => {
    setProfileForm({
      name: profile?.name || "",
      email: profile?.email || "",
      contactInfo: profile?.contactInfo || "",
      dob: profile?.dob || "",
      gender: profile?.gender || "",
    });
    setGateStep("profile");
    setGateError("");
    setIsGateModalOpen(true);
  }, []);

  const runRazorpayCheckout = useCallback(async (token, learnerID, profile) => {
    setIsBookingSubmitting(true);
    try {
      const payload = {
        learnerID,
        package_id: selectedPackage?.package_id,
        add_ons: JSON.stringify(
          selectedAddons.map((addon) => Number(addon.id)).filter((id) => Number.isFinite(id) && id > 0)
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
      setBookingSuccess(result?.message || "Booking created successfully.");
      await delay(MIN_SUCCESS_DELAY_MS);

      const razorpayKey = result?.data?.razorpay?.key;
      const razorpayOrderId = result?.data?.razorpay?.order?.order_id;
      const prefill = result?.data?.razorpay?.prefill || {};
      const canOpenRazorpay = await loadRazorpayScript();
      if (!canOpenRazorpay || !razorpayKey || !razorpayOrderId) {
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
        theme: { color: "#2563eb" },
      });
      rzp.on("payment.failed", (event) => {
        setBookingError(event?.error?.description || "Payment failed. Please try again.");
      });
      rzp.open();
    } catch (error) {
      setBookingError(error?.message || "Failed to create booking.");
    } finally {
      setIsBookingSubmitting(false);
    }
  }, [addonsTotal, basePrice, delay, loadRazorpayScript, selectedAddons, selectedPackage?.name, selectedPackage?.package_id, subtotal, totalPrice]);

  const ensureCheckoutGate = useCallback(async () => {
    const authContext = getStoredAuthContext();
    if (!authContext.token || !authContext.learnerID) {
      setGateStep("auth");
      setAuthOtp("");
      setGateError("");
      setIsGateModalOpen(true);
      return null;
    }

    try {
      const profile = await fetchLatestProfile(authContext.token, authContext.learnerID);
      if (!isProfileReadyForPayment(profile)) {
        openProfileGate(profile);
        return null;
      }
      return { token: authContext.token, learnerID: authContext.learnerID, profile };
    } catch (error) {
      setGateError(error?.message || "Please login again to continue.");
      setGateStep("auth");
      setIsGateModalOpen(true);
      return null;
    }
  }, [fetchLatestProfile, openProfileGate]);

  const attemptLicenseCheckout = useCallback(async () => {
    setBookingError("");
    setBookingSuccess("");
    const gate = await ensureCheckoutGate();
    if (!gate) return;
    await runRazorpayCheckout(gate.token, gate.learnerID, gate.profile);
  }, [ensureCheckoutGate, runRazorpayCheckout]);

  const handleActionClick = useCallback(async () => {
    if (!isLicensePackage) {
      setIsLeadModalOpen(true);
      return;
    }
    await attemptLicenseCheckout();
  }, [attemptLicenseCheckout, isLicensePackage]);

  const handleSendOtp = useCallback(async () => {
    const mobile = normalizeMobileWithCountryCode(authMobile);
    if (!mobile) {
      setGateError("Mobile number is required.");
      return;
    }
    if (!/^\+\d{10,15}$/.test(mobile)) {
      setGateError("Please include a country code in the mobile number (e.g., +91).");
      return;
    }
    setGateError("");
    setGateSuccess("");
    setIsSendingOtp(true);
    try {
      await sendOtp(mobile);
      setAuthMobile(mobile);
      setGateSuccess("OTP sent successfully.");
      await delay(MIN_SUCCESS_DELAY_MS);
      setGateStep("otp");
    } catch (error) {
      setGateError(error?.message || "Failed to send OTP.");
    } finally {
      setIsSendingOtp(false);
    }
  }, [authMobile, delay]);

  const handleVerifyOtp = useCallback(async () => {
    const otp = authOtp.trim();
    if (!otp || otp.length !== OTP_LENGTH) {
      setGateError(`Please enter ${OTP_LENGTH} digit OTP.`);
      return;
    }
    setGateError("");
    setGateSuccess("");
    setIsVerifyingOtp(true);
    try {
      const data = await verifyOtp({ contactInfo: normalizeMobileWithCountryCode(authMobile), otp });
      sessionStorage.setItem("pilotUser", JSON.stringify(data));
      const token = extractTokenFromPayload(data);
      if (token) {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("accessToken", token);
      }

      const authContext = getStoredAuthContext();
      if (!authContext.token || !authContext.learnerID) {
        throw new Error("Login response is missing required session data.");
      }

      const profile = await fetchLatestProfile(authContext.token, authContext.learnerID);
      if (isProfileReadyForPayment(profile)) {
        setGateSuccess("OTP verified successfully. Continuing to payment...");
        await delay(MIN_SUCCESS_DELAY_MS);
        setIsGateModalOpen(false);
        await runRazorpayCheckout(authContext.token, authContext.learnerID, profile);
        return;
      }
      setGateSuccess("OTP verified successfully. Please complete your profile.");
      await delay(MIN_SUCCESS_DELAY_MS);
      openProfileGate({
        ...profile,
        contactInfo: profile.contactInfo || normalizeMobileWithCountryCode(authMobile),
      });
    } catch (error) {
      setGateError(error?.message || "OTP verification failed.");
    } finally {
      setIsVerifyingOtp(false);
    }
  }, [authMobile, authOtp, delay, fetchLatestProfile, openProfileGate, runRazorpayCheckout]);

  const handleProfileFieldChange = useCallback((key, value) => {
    setProfileForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleProfileSubmit = useCallback(async () => {
    const authContext = getStoredAuthContext();
    if (!authContext.token || !authContext.learnerID) {
      setGateStep("auth");
      setGateError("Please login again to continue.");
      return;
    }
    if (!isProfileComplete(profileForm)) {
      setGateError("Please complete all required profile fields.");
      return;
    }

    setGateError("");
    setGateSuccess("");
    setIsProfileSubmitting(true);
    try {
      const latestProfileBeforeUpdate = await fetchLatestProfile(authContext.token, authContext.learnerID);
      if (isProfileReadyForPayment(latestProfileBeforeUpdate)) {
        setGateSuccess("Profile already complete. Continuing to payment...");
        await delay(MIN_SUCCESS_DELAY_MS);
        setIsGateModalOpen(false);
        await runRazorpayCheckout(authContext.token, authContext.learnerID, latestProfileBeforeUpdate);
        return;
      }

      const formData = new FormData();
      formData.append("learnerID", authContext.learnerID);
      formData.append("name", profileForm.name.trim());
      formData.append("email", profileForm.email.trim());
      formData.append("contactInfo", profileForm.contactInfo.trim());
      formData.append("dob", profileForm.dob);
      formData.append("gender", profileForm.gender);

      const response = await fetch(UPDATE_LEARNER_API_URL, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${authContext.token}` },
        body: formData,
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.success === false || result?.ok === false) {
        throw new Error(result?.message || "Profile update failed.");
      }

      const latestProfile = await fetchLatestProfile(authContext.token, authContext.learnerID);
      if (!isProfileReadyForPayment(latestProfile)) {
        throw new Error("Email is not updated or profile is incomplete. Please complete your profile.");
      }

      setGateSuccess("Profile updated successfully. Continuing to payment...");
      await delay(MIN_SUCCESS_DELAY_MS);
      setIsGateModalOpen(false);
      await runRazorpayCheckout(authContext.token, authContext.learnerID, latestProfile);
    } catch (error) {
      setGateError(error?.message || "Failed to update profile.");
    } finally {
      setIsProfileSubmitting(false);
    }
  }, [delay, fetchLatestProfile, profileForm, runRazorpayCheckout]);


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

        {isGateModalOpen ? (
          <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-900/45 px-4 py-6 backdrop-blur-[2px]">
            <div className="w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
              {gateStep !== "profile" ? (
                <div className="flex w-full items-center justify-center bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-100 px-4 py-6">
                  <Image
                    src="/images/logo/Pilot Logo.png"
                    alt="Pilot"
                    width={260}
                    height={90}
                    quality={100}
                    priority
                    className="h-16 w-auto object-contain"
                  />
                </div>
              ) : null}
              <div className="p-5 sm:p-6">
                <h3 className="text-xl font-bold text-slate-900">
                  {gateStep === "profile" ? "Complete Profile" : "Verify Login"}
                </h3>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  {gateStep === "profile"
                    ? "Please complete required details before payment."
                    : "Login with OTP to continue your booking."}
                </p>

                {gateError ? (
                  <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
                    {gateError}
                  </div>
                ) : null}
                {gateSuccess ? (
                  <div className="mt-4 rounded-full py-3 border border-emerald-200 bg-emerald-50 px-3  text-[13px] font-medium text-emerald-700">
                    {gateSuccess}
                  </div>
                ) : null}

                {gateStep === "auth" ? (
                  <div className="mt-5 space-y-3">
                    <input
                      type="tel"
                      value={authMobile}
                      onChange={(event) => setAuthMobile(event.target.value)}
                      placeholder="+919876543210"
                      className="w-full rounded-full border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
                    />
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={isSendingOtp}
                        className="btn-gradient btn-gradient-glow w-full rounded-full py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {isSendingOtp ? "Sending..." : "Send OTP"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsGateModalOpen(false);
                          setGateError("");
                          setGateSuccess("");
                        }}
                        className="w-full rounded-full border border-slate-200 bg-white py-3  text-sm font-semibold text-slate-600"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                ) : null}

                {gateStep === "otp" ? (
                  <div className="mt-5 space-y-3">
                    <input
                      type="text"
                      value={authOtp}
                      onChange={(event) => setAuthOtp(event.target.value.replace(/\D/g, "").slice(0, OTP_LENGTH))}
                      placeholder="Enter OTP"
                      className="w-full rounded-full border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
                    />
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        type="button"
                        onClick={handleVerifyOtp}
                        disabled={isVerifyingOtp}
                        className="btn-gradient btn-gradient-glow w-full rounded-full py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {isVerifyingOtp ? "Verifying..." : "Verify OTP"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsGateModalOpen(false);
                          setGateError("");
                          setGateSuccess("");
                        }}
                        className="w-full rounded-full border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-600"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                ) : null}

                {gateStep === "profile" ? (
                  <div className="mt-5 space-y-3">
                    {isProfileComplete(profileForm) ? (
                      <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
                        Profile is already complete. Continue to payment.
                      </div>
                    ) : null}
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(event) => handleProfileFieldChange("name", event.target.value)}
                      placeholder="Name"
                      className="w-full rounded-full border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
                    />
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(event) => handleProfileFieldChange("email", event.target.value)}
                      placeholder="Email"
                      className="w-full rounded-full border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
                    />
                    <input
                      type="tel"
                      value={profileForm.contactInfo}
                      onChange={(event) => handleProfileFieldChange("contactInfo", event.target.value)}
                      placeholder="Contact Number"
                      disabled={Boolean(String(profileForm.contactInfo || "").trim())}
                      className="w-full rounded-full border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
                    />
                    <input
                      type="date"
                      value={profileForm.dob}
                      onChange={(event) => handleProfileFieldChange("dob", event.target.value)}
                      className="w-full rounded-full border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
                    />
                    <select
                      value={profileForm.gender}
                      onChange={(event) => handleProfileFieldChange("gender", event.target.value)}
                      className="w-full rounded-full border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={handleProfileSubmit}
                        disabled={isProfileSubmitting}
                        className="btn-gradient btn-gradient-glow w-full rounded-full py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {isProfileSubmitting
                          ? "Please wait..."
                          : isProfileComplete(profileForm)
                            ? "Continue to Payment"
                            : "Save and Continue"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsGateModalOpen(false);
                          setGateError("");
                          setGateSuccess("");
                        }}
                        className="w-full rounded-full border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-600"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </Container>
  );
}
