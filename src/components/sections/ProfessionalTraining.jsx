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
        accent: "blue",
        colorClass: "bg-blue-50 text-blue-600  ",
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
        accent: "indigo",
        colorClass: "bg-indigo-50 text-indigo-600  ",
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
        accent: "emerald",
        colorClass: "bg-emerald-50 text-emerald-600  ",
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
                    description="Our professional training programs are designed to help you master driving skills with certified instructors, modern vehicles, and practical on-road experience."
                />
                <div className="grid gap-6 pt-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 lg:pt-16">
                    {trainings.map((item) => (
                        <article
                            key={item.id}
                            className="group flex flex-col rounded-[2.25rem] border border-slate-100 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-6 lg:rounded-[2.5rem] lg:p-10"
                        >
                            {/* Icon */}
                            <div
                                className={`mb-8 flex h-14 w-14 items-center justify-center rounded-full ${item.colorClass} text-white transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
                            >
                                <item.icon size={26} strokeWidth={2} className={item.colorClass.split(" ")[1]} />
                            </div>

                            {/* Title */}
                            <h3 className="mb-3 text-[22px] font-bold text-slate-900 lg:text-[24px]">
                                {item.title}
                            </h3>

                            {/* Description */}
                            <p className="mb-6 text-[15px] text-slate-500 lg:text-[16px]">
                                {item.description}
                            </p>

                            {/* Features */}
                            <ul className="mb-10 space-y-4">
                                {item.features.map((feature, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start gap-3 text-sm font-medium text-slate-600"
                                    >
                                        <CheckCircle2
                                            className={`h-5 w-5 opacity-80 ${item.colorClass.split(" ")[1]}`}
                                        />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <div className="mt-auto w-full">
                                <Link
                                    href={`/packages?type=${encodeURIComponent(item.drivingType)}`}
                                    className="inline-flex items-center justify-center gap-2 w-full rounded-xl 
                                    px-4 py-4 text-sm font-semibold text-blue-900 
                                    transition-all duration-300  
                                    group-hover:shadow-lg group-hover:text-white group-hover:bg-blue-800 group-hover:border-blue-800"
                                >
                                    {item.linkText}
                                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
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


