"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, RefreshCcw } from "lucide-react";
import { sendOtp, verifyOtp } from "@/services/auth";

const RESEND_WAIT_SECONDS = 30;
const AUTH_COOKIE_KEY = "pilot_auth";
const OTP_LENGTH = 4;
const SUCCESS_REDIRECT_DELAY_MS = 1000;

export default function OtpLogin() {
  const router = useRouter();

  // Step decides whether user is entering mobile or OTP.
  const [step, setStep] = useState("mobile");

  // Local form states for mobile number and OTP input values.
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");

  // UI states for success/error feedback and loading indicators.
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isResendingOtp, setIsResendingOtp] = useState(false);

  // Timer prevents immediate OTP resends and improves OTP UX.
  const [resendTimer, setResendTimer] = useState(0);

  // Keep authenticated users away from the login page.
  useEffect(() => {
    const savedUser = localStorage.getItem("pilotUser");

    if (savedUser) {
      document.cookie = `${AUTH_COOKIE_KEY}=1; path=/; max-age=2592000; samesite=lax`;
      router.replace("/");
    }
  }, [router]);

  // Keep countdown running while timer is active.
  useEffect(() => {
    if (resendTimer <= 0) return undefined;

    const interval = setInterval(() => {
      setResendTimer((previous) => (previous > 0 ? previous - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [resendTimer]);

  // Convert user input to API-ready contact format (+91xxxxxxxxxx).
  const normalizedMobile = useMemo(() => {
    const compactValue = mobile.replace(/\s|-/g, "");

    if (!compactValue) return "";
    if (/^\+\d{10,15}$/.test(compactValue)) return compactValue;
    if (/^\d{10}$/.test(compactValue)) return `+91${compactValue}`;

    return compactValue;
  }, [mobile]);

  const validateMobile = () => {
    if (!mobile.trim()) {
      setErrorMessage("Mobile number is required.");
      return false;
    }

    if (!/^\+\d{10,15}$/.test(normalizedMobile)) {
      setErrorMessage("Enter a valid mobile number in +91xxxxxxxxxx format.");
      return false;
    }

    return true;
  };

  const extractWaitSeconds = (message) => {
    const regexMatch = String(message || "").match(/wait\s+(\d+)\s*seconds?/i);
    if (!regexMatch) return 0;

    const parsedSeconds = Number(regexMatch[1]);
    return Number.isFinite(parsedSeconds) && parsedSeconds > 0 ? parsedSeconds : 0;
  };

  const handleSendOtp = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (!validateMobile()) return;

    setIsSendingOtp(true);

    try {
      const response = await sendOtp(normalizedMobile);
      const backendTimer = Number(response?.otp_seconds);
      setSuccessMessage("OTP sent successfully.");
      await new Promise((resolve) => setTimeout(resolve, SUCCESS_REDIRECT_DELAY_MS));
      setStep("otp");
      setResendTimer(
        Number.isFinite(backendTimer) && backendTimer > 0 ? backendTimer : RESEND_WAIT_SECONDS
      );
      setSuccessMessage("");
    } catch (error) {
      setErrorMessage(error.message);
      const waitSeconds = extractWaitSeconds(error.message);
      if (waitSeconds > 0) {
        setStep("otp");
        setResendTimer(waitSeconds);
      }
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (!otp.trim()) {
      setErrorMessage("OTP is required.");
      return;
    }

    if (otp.trim().length !== OTP_LENGTH) {
      setErrorMessage(`Please enter ${OTP_LENGTH} digit OTP.`);
      return;
    }

    setIsVerifyingOtp(true);

    try {
      const data = await verifyOtp({
        contactInfo: normalizedMobile,
        otp: otp.trim(),
      });

      // Persist authenticated user payload for dashboard/session usage.
      localStorage.setItem("pilotUser", JSON.stringify(data));
      document.cookie = `${AUTH_COOKIE_KEY}=1; path=/; max-age=2592000; samesite=lax`;
      setSuccessMessage("Login successful.");
      await new Promise((resolve) => setTimeout(resolve, SUCCESS_REDIRECT_DELAY_MS));
      router.replace("/");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleResendOtp = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (!validateMobile()) return;

    setIsResendingOtp(true);

    try {
      const response = await sendOtp(normalizedMobile);
      const backendTimer = Number(response?.otp_seconds);
      setResendTimer(
        Number.isFinite(backendTimer) && backendTimer > 0 ? backendTimer : RESEND_WAIT_SECONDS
      );
      setSuccessMessage("OTP resent successfully.");
    } catch (error) {
      setErrorMessage(error.message);
      const waitSeconds = extractWaitSeconds(error.message);
      if (waitSeconds > 0) {
        setResendTimer(waitSeconds);
      }
    } finally {
      setIsResendingOtp(false);
    }
  };

  const handleOtpChange = (index, value, inputPrefix) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const otpChars = Array.from({ length: OTP_LENGTH }, (_, charIndex) => otp[charIndex] || "");
    otpChars[index] = digit;
    setOtp(otpChars.join(""));

    if (digit && index < OTP_LENGTH - 1) {
      document.getElementById(`${inputPrefix}-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (index, event, inputPrefix) => {
    if (event.key === "Backspace") {
      if (otp[index]) {
        const otpChars = Array.from({ length: OTP_LENGTH }, (_, charIndex) => otp[charIndex] || "");
        otpChars[index] = "";
        setOtp(otpChars.join(""));
      } else if (index > 0) {
        document.getElementById(`${inputPrefix}-${index - 1}`)?.focus();
      }
    }
  };

  const handleOtpPaste = (event, inputPrefix) => {
    event.preventDefault();
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    setOtp(pasted);
    document.getElementById(`${inputPrefix}-${Math.max(0, pasted.length - 1)}`)?.focus();
  };

  const moveToMobileStep = () => {
    setStep("mobile");
    setOtp("");
    setErrorMessage("");
    setSuccessMessage("");
  };

  return (
    <div className="mx-auto w-full max-w-md">
      {/* Mobile view: registration/verification card UI */}
      <div className="flex min-h-[calc(100dvh-1rem)] flex-col rounded-[32px] border border-blue-100 bg-blue-50/40 -mt-2 px-5 py-6 shadow-[0_16px_36px_rgba(37,99,235,0.12)] md:hidden">


        <div className="mx-auto mb-10 mt-16 flex h-40 w-40 items-center bg-[#EEE4F5] justify-center rounded-full">
          <Image
            src="/images/signin_mobile_view.png"
            alt="Authentication"
            width={320}
            height={320}
            quality={100}
            sizes="160px"
            className="h-full w-full object-contain rounded-full"
          />
        </div>

        <div className="my-3 text-center ">
          <h3 className="text-[33px] font-bold text-slate-900 font-sans">{step === "mobile" ? "Sign In" : "Verification"}</h3>
          <p className="mt-2 text-[14px] font-medium leading-5 text-slate-500 font-sans">
            {step === "mobile"
              ? "Enter your mobile number to receive an OTP. We will send a verification code."
              : "Please enter the OTP code received."}
          </p>
        </div>

        {errorMessage ? (
          <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-center text-xs font-medium text-red-600">{errorMessage}</p>
        ) : null}

        {successMessage ? (
          <p className="mt-4 rounded-xl bg-emerald-50 px-3 py-2 text-center text-xs font-medium text-emerald-700">{successMessage}</p>
        ) : null}

        {step === "mobile" ? (
          <div className="mt-6 rounded-2xl bg-slate-50 p-3  ">
            <input
              id="mobile"
              name="mobile"
              type="tel"
              value={mobile}
              onChange={(event) => setMobile(event.target.value)}
              placeholder="+91 9876543210"
              className="w-full rounded-xl border border-blue-100 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500"
            />

            <button
              type="button"
              onClick={handleSendOtp}
              disabled={isSendingOtp}
              className="btn-gradient btn-gradient-glow mt-3 flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-sm font-bold text-white transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 font-sans mt-4"
            >
              {isSendingOtp ? "Sending..." : "Send OTP"}
            </button>
          </div>
        ) : (
          <div className="mt-6 rounded-2xl bg-slate-50 p-3  ">
            <div className="flex items-center justify-center gap-2" onPaste={(event) => handleOtpPaste(event, "mobile-otp")}>
              {Array.from({ length: OTP_LENGTH }).map((_, index) => {
                const value = otp[index] || "";
                const isFilled = Boolean(value);

                return (
                  <input
                    key={index}
                    id={`mobile-otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={value}
                    onChange={(event) => handleOtpChange(index, event.target.value, "mobile-otp")}
                    onKeyDown={(event) => handleOtpKeyDown(index, event, "mobile-otp")}
                    className={`h-10 w-10 rounded-md border text-center text-sm font-semibold outline-none transition ${isFilled
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-blue-200 bg-blue-50 text-slate-700 focus:border-blue-500"
                      }`}
                  />
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleVerifyOtp}
              disabled={isVerifyingOtp}
              className="btn-gradient btn-gradient-glow mt-3 flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-sm font-bold text-white transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 font-sans mt-6"
            >
              {isVerifyingOtp ? "Verifying..." : "Verify OTP"}
            </button>

            <div className="pt-6 text-center ">
              <p className="text-[12px] font-medium text-slate-400 font-sans ">Didn&apos;t receive code yet?</p>
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={isResendingOtp || resendTimer > 0}
                className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition hover:text-blue-700 disabled:cursor-not-allowed disabled:text-slate-400 font-sans mt-2 "
              >
                <RefreshCcw className="h-3.5 w-3.5" />
                {isResendingOtp ? "Resending..." : "Resend New Code"}
              </button>
              {resendTimer > 0 ? <p className="mt-1 text-[12px] text-slate-400 font-sans">Retry in {resendTimer}s</p> : null}
            </div>
          </div>
        )}
      </div>

      {/* Tablet/Desktop view: existing split-layout OTP flow UI */}
      <div className="hidden space-y-5 md:block">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Sign In</h1>
          <p className="text-sm sm:text-base font-medium text-slate-500">
            {step === "mobile"
              ? "Enter your mobile number to receive an OTP."
              : `Enter the OTP sent to ${normalizedMobile}.`}
          </p>
        </div>

        {errorMessage ? (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{errorMessage}</p>
        ) : null}

        {successMessage ? (
          <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">{successMessage}</p>
        ) : null}

        {step === "mobile" ? (
          <div className="space-y-6">
            <label htmlFor="desktop-mobile" className="block text-sm font-semibold text-slate-700">
              Mobile Number
            </label>
            <input
              id="desktop-mobile"
              name="mobile"
              type="tel"
              value={mobile}
              onChange={(event) => setMobile(event.target.value)}
              placeholder="+91 9876543210"
              className="w-full rounded-full border border-slate-300 px-5 py-3 text-sm outline-none transition focus:border-blue-500"
            />

            <button
              type="button"
              onClick={handleSendOtp}
              disabled={isSendingOtp}
              className="btn-gradient btn-gradient-glow group flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-bold text-white transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSendingOtp ? "Sending OTP..." : "Send OTP"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <label htmlFor="desktop-otp" className="block text-sm font-semibold text-slate-700">
              Enter OTP
            </label>

            <div className="my-8 flex items-center justify-center gap-4" onPaste={(event) => handleOtpPaste(event, "desktop-otp")}>
              {Array.from({ length: OTP_LENGTH }).map((_, index) => {
                const value = otp[index] || "";
                const isFilled = Boolean(value);
                return (
                  <input
                    key={index}
                    id={`desktop-otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={value}
                    onChange={(event) => handleOtpChange(index, event.target.value, "desktop-otp")}
                    onKeyDown={(event) => handleOtpKeyDown(index, event, "desktop-otp")}
                    className={`h-10 w-10 rounded-lg border text-center text-sm font-semibold outline-none transition sm:h-11 sm:w-11 xl:h-12 xl:w-12 ${isFilled
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-blue-200 bg-blue-50 text-slate-700 focus:border-blue-500"
                      }`}
                  />
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleVerifyOtp}
              disabled={isVerifyingOtp}
              className="btn-gradient btn-gradient-glow group flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-bold text-white transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isVerifyingOtp ? "Verifying..." : "Verify OTP"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>

            <div className="space-y-1 text-sm">
              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={isResendingOtp || resendTimer > 0}
                  className="inline-flex items-center gap-2 font-semibold text-blue-600 transition hover:text-blue-700 disabled:cursor-not-allowed disabled:text-slate-400"
                >
                  <RefreshCcw className="h-4 w-4" />
                  {isResendingOtp ? "Resending..." : "Resend OTP"}
                </button>

                <button
                  type="button"
                  onClick={moveToMobileStep}
                  className="text-sm font-semibold text-slate-500 transition hover:text-slate-700"
                >
                  Change mobile number
                </button>
              </div>

              {resendTimer > 0 ? <span className="block text-slate-500">Retry in {resendTimer}s</span> : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
