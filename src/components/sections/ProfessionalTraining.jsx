"use client";

import React from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { Container } from "../ui/Container";
import Link from "next/link";
import { Car, FileText, Zap } from "lucide-react";


const trainings = [
    {
        id: "car",
        title: " Car Driving Classes",
        description: "Start from zero and drive with confidence on real roads. ",
        icon: Car,
        iconBg: "bg-[var(--brand)]",
        features: ["Learn step-by-step with patient instructors", "Practice in real traffic conditions", "Get ready for your driving test"],
        linkText: "Choose Your Driving Package  ",
        drivingType: "Car",
    },
    {
        id: "bike",
        title: "Bike Training",
        description: "Master bike riding with confidence, control, and safety. ",
        icon: Zap, // Using Zap/Lightning for the bike icon per screenshot
        iconBg: "bg-orange-500",
        features: ["Hands-on training from day one", "Improve balance and road awareness", "Learn safe riding techniques"],
        linkText: "Start Your Bike Training",
        drivingType: "Bike",
    },
    {
        id: "license",
        title: "Driving License Assistance",
        description: "ESkip the confusion — get your license without the stress. ",
        icon: FileText,
        iconBg: "bg-[#1e293b]", // Dark slate/navy
        features: ["Complete support for documentation", "Guidance for RTO test preparation", "Smooth and hassle-free process"],
        linkText: "Get License Support",
        drivingType: "License",
    },
];


const ProfessionalTraining = () => {

    return (
        <section id="services" className="md:pt-32 pt-10 bg-[#FFFFFF] font-lexend">
            <Container>
                <SectionHeading
                    title="Start Your Driving Journey Today"
                    description="Our professional training programs are designed to help you master driving skills with certified instructors, modern vehicles, and practical on-road experience."
                />
                <div className="grid gap-6 pt-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 lg:pt-16">
                    {trainings.map((item) => (
                        <article
                            key={item.id}
                            className="flex flex-col rounded-[2.25rem] border border-slate-100 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8 lg:rounded-[2.5rem] lg:p-10"
                        >
                            {/* Circular Icon Container */}
                            <div className={`mb-6 flex h-12 w-12 items-center justify-center rounded-full ${item.iconBg} ${item.iconBg.includes("brand") ? "text-slate-900" : "text-white"} shadow-lg shadow-inherit lg:mb-8`}>
                                <item.icon size={20} strokeWidth={2.5} />
                            </div>

                            <h3 className="mb-3 font-sans text-[22px] font-[700] leading-tight text-slate-900 lg:mb-4 lg:text-[24px] lg:leading-[36px]">
                                {item.title}
                            </h3>

                            <p className="mb-6 font-sans text-[15px] font-[500] leading-[26px] text-slate-500 lg:mb-8 lg:text-[16px] lg:leading-[27px]">
                                {item.description}
                            </p>

                            <ul className="mb-8 space-y-3 lg:mb-10">
                                {item.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-3 font-sans text-[15px] font-[500] leading-[22px] text-slate-500 lg:text-[16px] lg:leading-[22px]">
                                        <svg className="mt-1 h-3.5 w-3.5 text-slate-700 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-auto">
                                <Link
                                    href={`/packages?type=${encodeURIComponent(item.drivingType)}`}
                                    className="group inline-flex items-center text-sm font-bold link-brand-subtle"
                                >
                                    {item.linkText}
                                    <span className="ml-1 transition-transform group-hover:translate-x-1">
                                        →
                                    </span>
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>

            </Container>
        </section>
    );
};

export default ProfessionalTraining;



