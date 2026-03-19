"use client";

import React from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { Container } from "../ui/Container";
import Link from "next/link";
import { Car, Bike, FileText, CheckCircle2, ArrowRight } from "lucide-react";

const trainings = [
    {
        id: "car",
        title: "Car Driving Classes",
        description: "Start from zero and drive with confidence on real roads.",
        icon: Car,
        features: [
            "Learn step-by-step with patient instructors",
            "Practice in real traffic conditions",
            "Get ready for your driving test",
        ],
        linkText: "Choose Your Driving Package",
        drivingType: "Car",
    },
    {
        id: "bike",
        title: "Bike Training",
        description: "Master bike riding with confidence, control, and safety.",
        icon: Bike,
        features: [
            "Hands-on training from day one",
            "Improve balance and road awareness",
            "Learn safe riding techniques",
        ],
        linkText: "Start Your Bike Training",
        drivingType: "Bike",
    },
    {
        id: "license",
        title: "License Assistance",
        description: "Skip the confusion — get your license without the stress.",
        icon: FileText,
        features: [
            "Complete support for documentation",
            "Guidance for RTO test preparation",
            "Smooth and hassle-free process",
        ],
        linkText: "Get License Support",
        drivingType: "License",
    },
];

const ProfessionalTraining = () => {
    return (
        <section id="services" className="md:pt-32 pt-10 bg-gradient-to-b from-white to-[var(--brand-muted)] font-lexend">
            <Container>
                <SectionHeading
                    title="Start Your Driving Journey Today"
                    description="Our professional training programs are designed to help you master driving skills."
                />

                <div className="grid gap-6 pt-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 lg:pt-16">
                    {trainings.map((item) => (
                        <article
                            key={item.id}
                            /* Changed to Solid Blue Background and White Text */
                            className="group flex flex-col rounded-[2.5rem] bg-[#2D5BFF] p-8 shadow-xl transition-all duration-300 hover:-translate-y-2 lg:p-10"
                        >
                            {/* Icon - White Circle with Blue Icon */}
                            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#2D5BFF] shadow-sm">
                                <item.icon size={26} strokeWidth={2} />
                            </div>

                            {/* Title - Bold White */}
                            <h3 className="mb-3 text-[22px] font-bold text-white lg:text-[24px]">
                                {item.title}
                            </h3>

                            {/* Description - Semi-transparent White for hierarchy */}
                            <p className="mb-8 text-[15px] text-blue-50/90 lg:text-[16px] leading-relaxed">
                                {item.description}
                            </p>

                            {/* Features - White text with simple Check Icons */}
                            <ul className="mb-10 space-y-4">
                                {item.features.map((feature, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start gap-3 text-sm font-medium text-white"
                                    >
                                        <CheckCircle2 className="h-5 w-5 text-white/80" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            {/* CTA - White Button with Blue Text as per image */}
                            <div className="mt-auto w-full">
                                <Link
                                    href={`/packages?type=${encodeURIComponent(item.drivingType)}`}
                                    className="relative inline-flex items-center justify-center gap-2 w-full rounded-xl 
                                        px-4 py-4 text-sm font-bold overflow-hidden
                                        bg-white text-[#2D5BFF] transition-all duration-500 ease-out
                                        group"
                                >
                                    {/* Gradient Layer */}
                                    <span className="absolute inset-0 bg-gradient-to-r from-[#2D5BFF] to-[#6EA8FF] 
                                        opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"></span>

                                    {/* Content */}
                                    <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                                        {item.linkText}
                                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
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