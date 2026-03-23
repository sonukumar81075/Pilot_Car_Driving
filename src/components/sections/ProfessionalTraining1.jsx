"use client";

import React from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { Container } from "../ui/Container";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

// SWIPER
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Autoplay, Navigation } from "swiper/modules";

const trainings = [
    {
        id: "car",
        title: "Car Driving Classes",
        description: "Master the art of executive driving with our signature sedan curriculum.",
        image: "/images/realistic-isolated-hands-driver-car_1284-17520-removebg-preview.png",
        features: ["Learn step-by-step", "Practice in traffic", "Get ready for test"],
        linkText: "CHOOSE YOUR PACKAGE",
        drivingType: "Car",
        // New Design Tokens
        bgColor: "bg-indigo-50/50",
        accentColor: "text-indigo-600",
        btnColor: "bg-indigo-600",
        glowColor: "bg-indigo-400",
    },
    {
        id: "bike",
        title: "Bike Training",
        description: "Agile movement and high-performance safety for two-wheeled enthusiasts.",
        image: "/images/Man-riding-motorcycle-on-transparent-background-PNG-removebg-preview.png",
        features: ["Dynamic balance tech", "Defensive maneuvering", "Track-ready precision"],
        linkText: "CHOOSE YOUR PACKAGE",
        drivingType: "Bike",
        // New Design Tokens
        bgColor: "bg-rose-50/50",
        accentColor: "text-rose-600",
        btnColor: "bg-rose-600",
        glowColor: "bg-rose-400",
    },
    {
        id: "license",
        title: "License Assistance",
        description: "Bureaucracy managed. We handle the paperwork, you handle the road.",
        image: "/images/license.png",
        features: ["Document verification", "Slot booking priority", "Zero-stress filing"],
        linkText: "CHOOSE YOUR PACKAGE",
        drivingType: "License",
        // New Design Tokens
        bgColor: "bg-amber-50/50",
        accentColor: "text-amber-600",
        btnColor: "bg-amber-600",
        glowColor: "bg-amber-400",
    },
];

const ProfessionalTraining1 = () => {
    return (
        <section className="md:pt-32 pt-16 bg-gradient-to-b from-white to-[var(--brand-muted)] font-lexend overflow-hidden ">
            <Container>
                <SectionHeading
                    title="Start Your Driving Journey Today"
                    description="Professional courses tailored for your success."
                />

                {/* DESKTOP GRID */}
                <div className="hidden lg:grid gap-8 pt-16 lg:grid-cols-3">
                    {trainings.map((item) => (
                        <Card item={item} key={item.id} />
                    ))}
                </div>

                {/* MOBILE SLIDER */}
                <div className="lg:hidden pt-12  relative px-4">
                    <Swiper
                        modules={[Autoplay, Navigation]}
                        spaceBetween={24}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{
                            delay: 3500,
                            disableOnInteraction: false,
                        }}
                        navigation={{
                            nextEl: ".next-btn",
                            prevEl: ".prev-btn",
                        }}
                    >
                        {trainings.map((item) => (
                            <SwiperSlide key={item.id} className="pb-12">
                                <Card item={item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* CUSTOM NAVIGATION */}
                    <div className="flex justify-center gap-6 mt-2">
                        <button className="prev-btn w-12 h-12 rounded-full bg-slate-100 text-slate-600 transition-all hover:bg-slate-200 flex items-center justify-center">
                            <ChevronLeft size={20} />
                        </button>
                        <button className="next-btn w-12 h-12 rounded-full bg-slate-900 text-white transition-all hover:bg-slate-800 flex items-center justify-center">
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </Container>
        </section>
    );
};

// CLEANER, MODERN CARD COMPONENT
const Card = ({ item }) => {
    return (
        <article className={`group relative flex flex-col rounded-[2.5rem] ${item.bgColor} border border-slate-100 p-8 md:p-10 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 overflow-hidden min-h-[580px] mb-6`}>

            {/* Decorative Blur Background */}
            <div className={`absolute -top-20 -right-20 h-64 w-64 rounded-full blur-[80px] opacity-20 ${item.glowColor}`}></div>

            {/* IMAGE CONTAINER */}
            <div className="relative w-full h-44 mb-10 overflow-visible">
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-3"
                />
            </div>

            {/* TEXT CONTENT */}
            <div className="relative z-10 flex flex-col h-full">
                <h3 className="mb-4 text-3xl font-extrabold text-slate-900 leading-tight">
                    {item.title}
                </h3>

                <p className="mb-8 text-[15px] text-slate-600 leading-relaxed font-medium">
                    {item.description}
                </p>

                {/* FEATURE LIST */}
                <ul className="  space-y-4">
                    {item.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3">
                            <div className={`flex items-center justify-center w-6 h-6 rounded-full ${item.bgColor} border border-white shadow-sm`}>
                                <CheckCircle2 className={`h-4 w-4 ${item.accentColor}`} />
                            </div>
                            <span className="text-sm font-bold text-slate-700 uppercase tracking-tight">{feature}</span>
                        </li>
                    ))}
                </ul>

                {/* CTA BUTTON */}
                <div className="mt-auto">
                    <Link
                        href={`/packages?type=${item.drivingType}`}
                        className={`flex items-center justify-center w-full rounded-2xl ${item.btnColor} py-4.5 text-[13px] font-black text-white transition-all hover:brightness-110 shadow-lg uppercase tracking-[0.15em]`}
                    >
                        {item.linkText}
                    </Link>
                </div>
            </div>
        </article>
    );
};

export default ProfessionalTraining1;