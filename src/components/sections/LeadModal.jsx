"use client";

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { X, ChevronDown, Loader2, Check } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Input from '@/components/ui/Input';
import { FormError, FormLabel } from '@/components/ui/FormField';

// Icon components remain the same as yours...
const AppleIcon = () => (
    <svg className="h-6 w-6 sm:h-8 sm:w-8" viewBox="0 0 384 512" fill="currentColor">
        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 21.8-88.5 21.8-11.4 0-51.1-20.8-82.3-20.2-41.2.6-78.9 25.9-100.2 62.7-43.5 75.2-11.1 186.2 30.7 246.6 20.5 29.7 45 62.9 77.2 61.8 31.1-1.1 42.8-20.1 80.4-20.1 37.5 0 48.2 20.1 81 19.5 33.4-.6 54.4-29.7 74.8-59.7 23.6-34.5 33.4-68 33.9-69.7-1.1-.5-65.3-25.1-65.8-99.7zM285.4 88.3c15.2-18.4 25.5-44 22.7-69.4-21.9 1-48.5 14.8-64.2 33.1-14.1 16.4-26.4 42.7-23.1 67.5 24.3 1.9 49.3-12.8 64.6-31.2z" />
    </svg>
);

const PlayStoreIcon = () => (
    <svg className="h-6 w-6 sm:h-8 sm:w-8" viewBox="0 0 512 512" fill="currentColor">
        <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-10.3 18-28.5-1.2-40.8zM385.4 337.8L104.6 499l220.7-221.3 60.1 60.1z" />
    </svg>
);

const ZONES_API_URL = "/api/zones";


function extractZones(payload) {
    const source = Array.isArray(payload?.data)
        ? payload.data
        : Array.isArray(payload?.zones)
            ? payload.zones
            : Array.isArray(payload)
                ? payload
                : [];

    const mapped = source
        .map((item) => {
            if (typeof item === "string") return item.trim();
            if (item && typeof item === "object") {
                return String(item.zone_name || item.zoneName || item.name || item.zone || "").trim();
            }
            return "";
        })
        .filter(Boolean);

    return Array.from(new Set(mapped));
}

const SUBMIT_DELAY_MS = 2000;
/** Time to show the success message before auto-closing the modal */
const SUCCESS_CLOSE_DELAY_MS = 2500;
/** Backdrop + panel fade/scale duration (must match CSS transition duration) */
const MODAL_EXIT_MS = 320;

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const LeadModal = ({ data, isOpen, onClose, submissionMeta }) => {
    const onCloseRef = useRef(onClose);
    onCloseRef.current = onClose;

    const closingRef = useRef(false);
    const [isClosing, setIsClosing] = useState(false);
    const [entered, setEntered] = useState(false);

    const [submitError, setSubmitError] = useState("");
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [zones, setZones] = useState(Array.isArray(data?.zones) ? data.zones : []);
    const [zonesLoading, setZonesLoading] = useState(false);
    const isCheckoutSummary = Boolean(data?.checkoutSummary);

    const validationSchema = Yup.object({
        fullName: Yup.string().min(2, 'Too short').required('Required'),
        phoneNumber: Yup.string().min(10, 'Too short').required('Required'),
        zone: Yup.string().notOneOf(['Choose a zone'], 'Select a zone').required('Required'),
    });

    const formik = useFormik({
        initialValues: { fullName: '', phoneNumber: '', zone: 'Choose a zone' },
        validationSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            setSubmitError("");
            setSubmitSuccess(false);
            try {
                await delay(SUBMIT_DELAY_MS);

                const res = await fetch("/api/enquiry", {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({
                        ...values,
                        packageMeta: submissionMeta?.selectedPackage || null,
                        selectedAddons: submissionMeta?.selectedAddons || [],
                        totalPrice: submissionMeta?.totalPrice ?? null,
                        sourcePage: submissionMeta?.sourcePage || null,
                    }),
                });

                const json = await res.json().catch(() => null);

                if (!res.ok || !json?.ok) {
                    setSubmitError(json?.message || "Failed to submit enquiry. Please try again.");
                    return;
                }

                setSubmitSuccess(true);
                resetForm({ values: { fullName: "", phoneNumber: "", zone: "Choose a zone" } });
            } catch (e) {
                setSubmitError("Network error. Please try again.");
            } finally {
                setSubmitting(false);
            }
        },
    });

    const closeWithAnimation = useCallback(() => {
        if (!isOpen || closingRef.current) return;
        closingRef.current = true;
        setIsClosing(true);
        window.setTimeout(() => {
            onCloseRef.current();
            closingRef.current = false;
            setIsClosing(false);
        }, MODAL_EXIT_MS);
    }, [isOpen]);

    const closeWithAnimationRef = useRef(closeWithAnimation);
    closeWithAnimationRef.current = closeWithAnimation;

    useEffect(() => {
        if (!isOpen) {
            setEntered(false);
            setIsClosing(false);
            closingRef.current = false;
            return;
        }
        setSubmitError("");
        setSubmitSuccess(false);
        setIsClosing(false);
        closingRef.current = false;
        setEntered(false);
        const id = requestAnimationFrame(() => {
            requestAnimationFrame(() => setEntered(true));
        });
        return () => cancelAnimationFrame(id);
    }, [isOpen]);

    useEffect(() => {
        if (!submitSuccess || !isOpen) return;
        const id = setTimeout(() => {
            closeWithAnimationRef.current();
        }, SUCCESS_CLOSE_DELAY_MS);
        return () => clearTimeout(id);
    }, [submitSuccess, isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        let cancelled = false;
        const controller = new AbortController();

        async function loadZones() {
            setZonesLoading(true);
            try {
                const res = await fetch(ZONES_API_URL, {
                    method: "GET",
                    signal: controller.signal,
                    cache: "no-store",
                });
                const json = await res.json().catch(() => null);
                const nextZones = extractZones(json);

                if (!cancelled && nextZones.length > 0) {
                    setZones(nextZones);
                }
            } catch {
                // Keep fallback zones from props if API fails.
            } finally {
                if (!cancelled) setZonesLoading(false);
            }
        }

        loadZones();
        return () => {
            cancelled = true;
            controller.abort();
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const panelVisible = entered && !isClosing;
    const backdropInteractive = panelVisible;

    return (
        <div
            onClick={(e) => {
                if (!backdropInteractive) return;
                if (e.target === e.currentTarget) {
                    closeWithAnimation();
                }
            }}
            style={{ transitionDuration: `${MODAL_EXIT_MS}ms` }}
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 font-sans transition-[opacity,backdrop-filter] ease-out ${
                panelVisible ? "bg-slate-900/60 backdrop-blur-sm opacity-100" : "bg-slate-900/60 opacity-0 backdrop-blur-none"
            } ${backdropInteractive ? "" : "pointer-events-none"}`}
            aria-hidden={!panelVisible}
        >
            {/* Added overflow-y-auto and max-height for mobile */}
            <div
                style={{ transitionDuration: `${MODAL_EXIT_MS}ms` }}
                className={`relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[1.5rem] md:rounded-[2.5rem] bg-white shadow-2xl flex py-2 sm:py-0 flex-col md:flex-row transition-[opacity,transform] ease-out will-change-[opacity,transform] ${
                    panelVisible
                        ? "translate-y-0 scale-100 opacity-100"
                        : "translate-y-3 scale-[0.97] opacity-0"
                }`}
            >

                <button
                    type="button"
                    onClick={closeWithAnimation}
                    disabled={!backdropInteractive}
                    className="absolute right-4 top-4 md:right-6 md:top-6 z-20 text-slate-400 hover:text-slate-600 cursor-pointer bg-white rounded-full p-1 shadow-sm disabled:pointer-events-none disabled:opacity-50"
                >
                    <X size={20} />
                </button>

                {/* Left Side: Branding / Checkout Summary (hidden on mobile) */}
                <div className="hidden md:flex w-full md:w-[42%] bg-[#f1f5f9] p-5 md:p-6 flex-col items-center justify-center">
                    {isCheckoutSummary ? (
                        <div className="w-full max-w-[340px] min-h-[520px] rounded-2xl border-b-2   border-slate-200  bg-[#f1f5f9] p-5   flex flex-col">
                            <div className="mb-2 flex items-center justify-between">
                                <span className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-bold uppercase border border-blue-800 tracking-wider text-blue-800">
                                    {data?.packageDetails?.badge}
                                </span>
                                <span className="flex h-4 w-4 items-center justify-center rounded-full border border-blue-500 bg-blue-500">
                                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                                </span>
                            </div>
                            <h3 className="text-[20px] sm:text-[24px] md:text-3xl font-sans font-[700] leading-[1.25] text-center sm:text-left px-0 text-slate-900">
                                {data?.packageDetails?.name || data?.promoTitle}
                            </h3>
                            <p className="mt-2 text-sm text-slate-500 line-clamp-2">
                                {data?.packageDetails?.description || data?.promoText}
                            </p>

                            {Array.isArray(data?.packageDetails?.features) && data.packageDetails.features.length > 0 ? (
                                <ul className="mt-10 space-y-2.5">
                                    {data.packageDetails.features.slice(0, 4).map((feature) => (
                                        <li key={feature} className="flex items-start gap-2 text-sm font-medium text-slate-700 line-clamp-1">
                                            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-600">
                                                <Check className="h-2.5 w-2.5 text-white" />
                                            </span>
                                            <span className="line-clamp-1">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : null}

                            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 space-y-2 text-sm">

                                <div className="flex items-center justify-between">
                                    <span className="text-slate-500">Base Price</span>
                                    <span className="font-semibold text-slate-900">₹{Number(data?.packageDetails?.price || 0).toFixed(2)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-500">Tax ({Math.round(Number(data?.packageDetails?.taxRate || 0) * 100)}%)</span>
                                    <span className="font-semibold text-slate-900">
                                        ₹{Number(data?.packageDetails?.taxAmount || 0).toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-500">Add-ons Total</span>
                                    <span className="font-semibold text-slate-900">
                                        ₹{Number((data?.packageDetails?.addons || []).reduce((sum, addon) => sum + Number(addon?.price || 0), 0)).toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 border-t border-slate-100 ">
                                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Selected Add-ons</p>
                                {Array.isArray(data?.packageDetails?.addons) && data.packageDetails.addons.length > 0 ? (
                                    <ul className="space-y-1.5">
                                        {data.packageDetails.addons.map((addon) => (
                                            <li key={addon.id || addon.title} className="flex items-center justify-between text-sm">
                                                <span className="text-slate-600">{addon.title}</span>
                                                <span className="font-semibold text-slate-900">₹{Number(addon.price || 0).toFixed(2)}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-slate-500">No add-ons selected.</p>
                                )}
                            </div>

                            <div className="mt-4 border-t border-slate-100 pt-3">
                                <div className="flex items-center justify-between gap-1">
                                    <span className="pb-1 text-[12px] sm:text-[14px] font-bold uppercase tracking-wide text-slate-400">
                                        Total
                                    </span>
                                    <span className="text-[28px] sm:text-[30px] leading-none font-extrabold tracking-tight text-slate-900">
                                        ₹{Number(data?.packageDetails?.total || 0).toFixed(0)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <h3 className="text-[20px] sm:text-[24px] md:text-3xl font-sans font-[700] leading-[1.25] text-center sm:text-left px-0 text-slate-900">
                                {data.promoTitle}
                            </h3>
                            <p className="mt-2 md:mt-4 font-sans font-[500] leading-6 md:leading-[27px] text-[14px] md:text-[16px] text-slate-500 text-center sm:text-left">
                                {data.promoText}
                            </p>

                            <div className="mt-6 md:mt-8 w-full block">
                                <div className="flex items-center justify-center gap-3 sm:gap-3">
                                    {data.appBadges?.map((b) => (
                                        <Link key={b.label} href={b.href} target="_blank">
                                            <Image
                                                src={
                                                    b.icon === "google"
                                                        ? "/images/3P1ckGuQQEInpODdTv3kJOEgnYQ.avif"
                                                        : "/images/XFHvXmLh07GYeJbajNiemQLI9MY.avif"
                                                }
                                                alt={b.label}
                                                width={220}
                                                height={60}
                                                className="h-auto w-[140px] sm:w-[200px] md:w-[220px] transition-transform duration-300 hover:scale-105"
                                            />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Right Side: Form */}
                <div className="w-full md:w-[58%] p-8 sm:p-6 md:p-14 bg-white">
                    <h2 className="text-[20px] sm:text-2xl md:text-3xl font-bold text-slate-900 font-sans font-[700] leading-[1.2] ">{data.formTitle}</h2>
                    <p className="mt-1 md:mt-2 font-sans font-[500] leading-6 md:leading-[27px] text-[14px] md:text-[16px] text-slate-500">
                        {data.formSubtitle}
                    </p>

                    <form className="mt-6 md:mt-8 space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
                        {submitSuccess ? (
                            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
                                Thank you! Your enquiry was submitted successfully. Our team will contact you shortly.
                            </div>
                        ) : null}
                        {submitError ? (
                            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                                {submitError}
                            </div>
                        ) : null}
                        <div>
                            <FormLabel className="mb-1.5 text-xs md:text-sm">Full Name</FormLabel>
                            <Input
                                name="fullName"
                                {...formik.getFieldProps('fullName')}
                                disabled={formik.isSubmitting || submitSuccess}
                                placeholder="Enter your full name"
                                hasError={Boolean(formik.touched.fullName && formik.errors.fullName)}
                                className="sm:rounded-xl rounded-full sm:py-3 py-2"
                            />
                            <FormError className="mt-1 text-xs">
                                {formik.touched.fullName && formik.errors.fullName ? formik.errors.fullName : ""}
                            </FormError>
                        </div>

                        <div>
                            <FormLabel className="mb-1.5 text-xs md:text-sm">Phone Number</FormLabel>
                            <Input
                                name="phoneNumber"
                                {...formik.getFieldProps('phoneNumber')}
                                disabled={formik.isSubmitting || submitSuccess}
                                placeholder="Enter your phone number"
                                hasError={Boolean(formik.touched.phoneNumber && formik.errors.phoneNumber)}
                                className="sm:rounded-xl rounded-full sm:py-3 py-2"
                            />
                            <FormError className="mt-1 text-xs">
                                {formik.touched.phoneNumber && formik.errors.phoneNumber ? formik.errors.phoneNumber : ""}
                            </FormError>
                        </div>

                        <div>
                            <FormLabel className="mb-1.5 text-xs md:text-sm">Select Zone</FormLabel>
                            <div className="relative">
                                <Input
                                    as="select"
                                    name="zone"
                                    {...formik.getFieldProps('zone')}
                                    disabled={zonesLoading || formik.isSubmitting || submitSuccess}
                                    hasError={Boolean(formik.touched.zone && formik.errors.zone)}
                                    className="sm:rounded-xl rounded-full sm:py-3 py-2"
                                >
                                    {zonesLoading ? (
                                        <option value="Choose a zone">Loading zones...</option>
                                    ) : (
                                        <option disabled value="Choose a zone">Choose a zone</option>
                                    )}
                                    {!zonesLoading && zones.length > 0
                                        ? zones.map((z) => (
                                            <option key={z} value={z}>
                                                {z}
                                            </option>
                                        ))
                                        : null}
                                    {!zonesLoading && zones.length === 0 ? (
                                        <option value="Choose a zone" disabled>No zones available</option>
                                    ) : null}
                                </Input>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                            </div>
                            <FormError className="mt-1 text-xs">
                                {formik.touched.zone && formik.errors.zone ? formik.errors.zone : ""}
                            </FormError>
                        </div>

                        <button
                            type="submit"
                            disabled={formik.isSubmitting || submitSuccess}
                            className="flex w-full cursor-pointer items-center justify-center gap-2 sm:rounded-xl rounded-full   text-white btn-gradient btn-gradient-glow sm:py-4 py-2.5 font-bold shadow-lg transition-all active:scale-95 disabled:opacity-60"
                        >
                            {formik.isSubmitting ? (
                                <>
                                    <Loader2 className="animate-spin" />
                                    <span>Submitting…</span>
                                </>
                            ) : submitSuccess ? (
                                "Submitted"
                            ) : (
                                "Get in Touch"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LeadModal;