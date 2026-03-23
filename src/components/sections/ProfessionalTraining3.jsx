"use client";

import React from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { Container } from "../ui/Container";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

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
        features: ["Step-by-step learning", "Real-world traffic", "Test preparation"],
        linkText: "CHOOSE YOUR PACKAGE",
        drivingType: "Car",
        accentColor: "group-hover:text-indigo-600",
        borderColor: "group-hover:border-indigo-500",
        btnBg: "bg-indigo-600",
        iconBg: "bg-indigo-50",
    },
    {
        id: "bike",
        title: "Bike Training",
        description: "Agile movement and high-performance safety for two-wheeled enthusiasts.",
        image: "/images/Man-riding-motorcycle-on-transparent-background-PNG-removebg-preview.png",
        features: ["Dynamic balance tech", "Defensive maneuvering", "Track-ready precision"],
        linkText: "CHOOSE YOUR PACKAGE",
        drivingType: "Bike",
        accentColor: "group-hover:text-rose-600",
        borderColor: "group-hover:border-rose-500",
        btnBg: "bg-rose-600",
        iconBg: "bg-rose-50",
    },
    {
        id: "license",
        title: "License Assistance",
        description: "Bureaucracy managed. We handle the paperwork, you handle the road.",
        image: "/images/license.png",
        features: ["Document verification", "Slot booking priority", "Zero-stress filing"],
        linkText: "CHOOSE YOUR PACKAGE",
        drivingType: "License",
        accentColor: "group-hover:text-amber-600",
        borderColor: "group-hover:border-amber-500",
        btnBg: "bg-amber-600",
        iconBg: "bg-amber-50",
    },
];

const ProfessionalTraining3 = () => {
    return (
        <section className="py-24 bg-gradient-to-b from-white to-[var(--brand-muted)] overflow-hidden">
            <Container>
                <SectionHeading
                    title="Start Your Driving Journey Today"
                    description="Professional courses tailored for your success."
                />
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">


                    {/* NAV BUTTONS FOR DESKTOP & MOBILE */}
                    <div className="flex gap-3">
                        <button className="prev-btn w-14 h-14 rounded-2xl bg-white border border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-900 transition-all flex items-center justify-center shadow-sm">
                            <ChevronLeft size={24} />
                        </button>
                        <button className="next-btn w-14 h-14 rounded-2xl bg-white border border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-900 transition-all flex items-center justify-center shadow-sm">
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>

                <div className="relative">
                    <Swiper
                        modules={[Autoplay, Navigation]}
                        spaceBetween={30}
                        slidesPerView={1}
                        breakpoints={{
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        loop={true}
                        autoplay={{ delay: 4000 }}
                        navigation={{
                            nextEl: ".next-btn",
                            prevEl: ".prev-btn",
                        }}
                    >
                        {trainings.map((item) => (
                            <SwiperSlide key={item.id} className="h-auto">
                                <Card item={item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </Container>
        </section>
    );
};

const Card = ({ item }) => {
    return (
        <article className={`group relative bg-white border-2 border-slate-100 rounded-[2rem] p-8 transition-all duration-500 hover:border-transparent hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] flex flex-col h-full mb-6`}>

            {/* Subtle Bottom Accent Line */}
            <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1.5 transition-all duration-500 rounded-t-full ${item.btnBg} group-hover:w-1/2`}></div>

            {/* ICON/IMAGE HEADER */}
            <div className={`w-20 h-20 rounded-3xl ${item.iconBg} flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                <div className="relative w-12 h-12">
                    <Image
                        src={item.image}
                        alt=""
                        fill
                        className="object-contain"
                    />
                </div>
            </div>

            {/* TEXT CONTENT */}
            <h3 className={`text-2xl font-bold text-slate-900 mb-4 transition-colors duration-300 ${item.accentColor}`}>
                {item.title}
            </h3>

            <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
                {item.description}
            </p>

            {/* FEATURE LIST */}
            <ul className="space-y-4 mb-10">
                {item.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                        <CheckCircle2 size={18} className="text-slate-300 group-hover:text-slate-900 transition-colors" />
                        <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">
                            {feature}
                        </span>
                    </li>
                ))}
            </ul>

            {/* BUTTON */}
            <div className="mt-auto">
                <Link
                    href={`/packages?type=${item.drivingType}`}
                    className={`flex items-center justify-between w-full rounded-xl border-2 border-slate-100 px-6 py-4 text-xs font-black tracking-widest text-slate-900 transition-all duration-300  `}
                >
                    {item.linkText}
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
            </div>
        </article>
    );
};

export default ProfessionalTraining3;