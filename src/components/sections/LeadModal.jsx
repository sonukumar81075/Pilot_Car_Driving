"use client";

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { X, ChevronDown, Loader2 } from 'lucide-react';
import Link from 'next/link';

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

const LeadModal = ({ data, isOpen, onClose }) => {
    const validationSchema = Yup.object({
        fullName: Yup.string().min(2, 'Too short').required('Required'),
        phoneNumber: Yup.string().min(10, 'Too short').required('Required'),
        zone: Yup.string().notOneOf(['Choose a zone'], 'Select a zone').required('Required'),
    });

    const formik = useFormik({
        initialValues: { fullName: '', phoneNumber: '', zone: 'Choose a zone' },
        validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            await new Promise((r) => setTimeout(r, 2000));
            console.log(values);
            setSubmitting(false);
            onClose();
        },
    });

    if (!isOpen) return null;

    return (
        <div onClick={(e) => {
            // Only close when clicking on the backdrop, not inside the modal card
            if (e.target === e.currentTarget) {
                onClose();
            }
        }} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 font-lexend">
            {/* Added overflow-y-auto and max-height for mobile */}
            <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[1.5rem] md:rounded-[2.5rem] bg-white shadow-2xl flex flex-col md:flex-row">

                <button onClick={onClose} className="absolute right-4 top-4 md:right-6 md:top-6 z-20 text-slate-400 hover:text-slate-600 cursor-pointer bg-white rounded-full p-1 shadow-sm">
                    <X size={20} />
                </button>

                {/* Left Side: Branding */}
                <div className="w-full md:w-[42%] bg-[#f8fafc] p-6 md:p-10 flex flex-col justify-center">
                    <h3 className="text-3xl font-sans font-[700] leading-[36px]   text-slate-900">{data.promoTitle}</h3>
                    <p className="mt-2 md:mt-4 font-sans font-[500] leading-[27px] text-[16px] text-slate-500">{data.promoText}</p>

                    <div className="mt-6 md:mt-8 w-full">
                        {/* Grid for badges on mobile, stack on desktop */}
                        <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
                            {data.appBadges.map((badge) => (
                                <Link
                                    key={badge.label}
                                    href={badge.href}
                                    target="_blank"
                                    className="flex items-center gap-2 md:gap-3 bg-black text-white px-3 py-2 md:px-4 md:py-3 rounded-xl hover:bg-slate-900 transition-colors border border-slate-800 shadow-sm"
                                >
                                    <div className="flex-shrink-0">
                                        {badge.icon === 'apple' ? <AppleIcon /> : <PlayStoreIcon />}
                                    </div>
                                    <div className="flex flex-col items-start leading-tight">
                                        <span className="text-[8px] md:text-[10px] font-medium uppercase opacity-80">
                                            {badge.icon === 'apple' ? 'App Store' : 'Google Play'}
                                        </span>
                                        <span className="font-bold text-[12px] md:text-[16px] whitespace-nowrap">
                                            {badge.icon === 'apple' ? 'Download' : 'Get it on'}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="w-full md:w-[58%] p-6 md:p-14 bg-white">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 font-sans font-[700] leading-[36px]   text-[24px]">{data.formTitle}</h2>
                    <p className="mt-1 md:mt-2  font-sans font-[500] leading-[27px] text-[16px] text-slate-500">{data.formSubtitle}</p>

                    <form className="mt-6 md:mt-8 space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
                        <div>
                            <label className="block text-xs md:text-sm font-bold text-slate-700 mb-1.5">Full Name</label>
                            <input
                                name="fullName"
                                {...formik.getFieldProps('fullName')}
                                placeholder="John Doe"
                                className={`w-full rounded-xl border px-4 py-3 outline-none transition-all ${formik.touched.fullName && formik.errors.fullName ? 'border-red-500 bg-red-50' : 'border-slate-200 focus:border-blue-500'}`}
                            />
                        </div>

                        <div>
                            <label className="block text-xs md:text-sm font-bold text-slate-700 mb-1.5">Phone Number</label>
                            <input
                                name="phoneNumber"
                                {...formik.getFieldProps('phoneNumber')}
                                placeholder="+1 (555) 000-0000"
                                className={`w-full rounded-xl border px-4 py-3 outline-none transition-all ${formik.touched.phoneNumber && formik.errors.phoneNumber ? 'border-red-500 bg-red-50' : 'border-slate-200 focus:border-blue-500'}`}
                            />
                        </div>

                        <div>
                            <label className="block text-xs md:text-sm font-bold text-slate-700 mb-1.5">Select Zone</label>
                            <div className="relative">
                                <select
                                    name="zone"
                                    {...formik.getFieldProps('zone')}
                                    className={`w-full appearance-none rounded-xl border px-4 py-3 outline-none transition-all ${formik.touched.zone && formik.errors.zone ? 'border-red-500 bg-red-50' : 'border-slate-200'}`}
                                >
                                    <option disabled value="Choose a zone">Choose a zone</option>
                                    {data.zones.map(z => <option key={z} value={z}>{z}</option>)}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={formik.isSubmitting}
                            className="w-full rounded-xl bg-[#2563eb] py-4 font-bold text-white shadow-lg hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                            {formik.isSubmitting ? <Loader2 className="animate-spin" /> : 'Get in Touch'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LeadModal;