"use client";

import React from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { Container } from "../ui/Container";
import Link from "next/link";
import { Car, FileText, Zap } from "lucide-react";


const trainings = [
    {
        id: "car",
        title: "Car Training",
        description: "Personalized manual and automatic car lessons with certified instructors.",
        icon: Car,
        iconBg: "bg-blue-600",
        features: ["Dual control vehicles", "Mock driving tests"],
        href: "#how-it-works",
    },
    {
        id: "bike",
        title: "Bike Training",
        description: "Safety-first motorcycle training for beginners and advanced riders.",
        icon: Zap, // Using Zap/Lightning for the bike icon per screenshot
        iconBg: "bg-orange-500",
        features: ["Safety gear provided", "Track & Road sessions"],
        href: "/pricing",
    },
    {
        id: "license",
        title: "License Assistance",
        description: "End-to-end support for your learner's and permanent driving license.",
        icon: FileText,
        iconBg: "bg-[#1e293b]", // Dark slate/navy
        features: ["Documentation support", "Fast-track processing"],
        href: "/pricing",
    },
];


const ProfessionalTraining = () => {

    return (
        <section id="lead-form" className="md:pt-32 pt-10 bg-white font-lexend">
            <Container>
                <SectionHeading
                    title="Our Professional Training"
                    description="Our professional training programs are designed to help you master driving skills with certified instructors, modern vehicles, and practical on-road experience."
                />
                <div className="grid gap-8 md:grid-cols-3 pt-16">
                    {trainings.map((item) => (
                        <article
                            key={item.id}
                            className="flex flex-col rounded-[2.5rem] bg-white p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 "
                        >
                            {/* Circular Icon Container */}
                            <div className={`flex h-12 w-12 items-center justify-center rounded-full ${item.iconBg} text-white mb-8 shadow-lg shadow-inherit`}>
                                <item.icon size={20} strokeWidth={2.5} />
                            </div>

                            <h3 className="  text-slate-900 font-sans font-[700] leading-[36px]   text-[24px] mb-4">
                                {item.title}
                            </h3>

                            <p className=" text-slate-500 font-sans font-[500] leading-[27px]   text-[16px] mb-8">
                                {item.description}
                            </p>

                            <ul className="space-y-3 mb-10">
                                {item.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-3   text-slate-400 font-sans font-[500] leading-[20px]   text-[16px]">
                                        <svg className="h-3.5 w-3.5 text-blue-500 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-auto">
                                <a
                                    href={item.href}
                                    className="inline-flex items-center text-sm font-bold text-blue-600 hover:text-blue-700 group"
                                >
                                    Learn More
                                    <span className="ml-1 transition-transform group-hover:translate-x-1">
                                        →
                                    </span>
                                </a>
                            </div>
                        </article>
                    ))}
                </div>

            </Container>
        </section>
    );
};

export default ProfessionalTraining;



