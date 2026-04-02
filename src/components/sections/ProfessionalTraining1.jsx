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
import "swiper/css/pagination";

import { Autoplay, Navigation, Pagination } from "swiper/modules";

const trainings = [
    {
        id: "car",
        title: "Car Driving Classes",
        description: "Learn to drive with confidence through structured lessons, real-road practice, and expert guidance designed for beginners and learners of all levels",
        image: "/images/car-removebg-preview.png",
        features: ["Step-by-step practical learning", "Real traffic driving practice", "Test-ready training support"],
        linkText: "CHOOSE YOUR PACKAGE",
        drivingType: "Car",
        // New Design Tokens
        bgColor: "bg-indigo-50/50",
        accentColor: "text-indigo-600",
        btnColor: "bg-indigo-600",
        glowColor: "bg-indigo-400",
        imageOffsetMobile: "-top-5",
        imageOffset: "md:-top-14 lg:-top-20",
    },
    {
        id: "bike",
        title: "Bike Training",
        description: "Build control, balance, and road confidence with guided bike training that helps you ride safely and independently in real traffic conditions.",
        image: "/images/Bike-removebg-preview.png",
        features: ["Balance and control practice", "Safe riding techniques", "Traffic-ready confidence building"],
        linkText: "CHOOSE YOUR PACKAGE",
        drivingType: "Bike",
        // New Design Tokens
        bgColor: "bg-indigo-50/50",
        accentColor: "text-indigo-600",
        btnColor: "bg-indigo-600",
        glowColor: "bg-indigo-400",
        imageOffsetMobile: "-top-0",
        imageOffset: "md:-top-16 lg:-top-20",
    },
    {
        id: "license",
        title: "License Assistance",
        description: "Get complete support for your driving license process with expert help for documentation, slot booking, and application guidance.",
        image: "/images/license-removebg-preview.png",
        features: ["Document guidance support", "Slot booking assistance", "Smooth and stress-free process"],
        linkText: "CHOOSE YOUR PACKAGE",
        drivingType: "License",
        // New Design Tokens
        bgColor: "bg-indigo-50/50",
        accentColor: "text-indigo-600",
        btnColor: "bg-indigo-600",
        glowColor: "bg-indigo-400",
        imageOffsetMobile: "top-3",
        imageOffset: "md:-top-15 lg:-top-20",
    },
];

const ProfessionalTraining1 = () => {
    return (
        <section className="md:pt-32 pt-16 bg-gradient-to-b from-white to-[var(--brand-muted)] font-lexend overflow-hidden ">
            <Container>
                <SectionHeading
                    title="Start Your Driving Journey Today"
                    highlightText="Driving Journey"
                    description="Professional courses tailored for your success."
                />

                {/* DESKTOP GRID */}
                <div className="hidden lg:grid gap-8 pt-16 lg:grid-cols-3 ">
                    {trainings.map((item) => (
                        <Card item={item} key={item.id} />
                    ))}
                </div>




                <div

                    className="
                        lg:hidden pt-12 relative px-4

                        [&_.swiper-pagination]:!bottom-0
                        [&_.swiper-pagination]:flex
                        [&_.swiper-pagination]:justify-center
                        [&_.swiper-pagination]:gap-2

                        [&_.swiper-pagination-bullet]:!w-8
                        sm:[&_.swiper-pagination-bullet]:!h-[4px]
                        [&_.swiper-pagination-bullet]:!h-[3px]
                        [&_.swiper-pagination-bullet]:!rounded-full 
                        [&_.swiper-pagination-bullet]:!bg-blue-900/50
                        [&_.swiper-pagination-bullet]:!opacity-100

                        [&_.swiper-pagination-bullet-active]:!bg-blue-900/100
                        [&_.swiper-pagination-bullet-active]:!w-10
                        [&_.swiper-pagination-bullet-active]:transition-all
                        [&_.swiper-pagination-bullet-active]:duration-300
                    "
                >
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={24}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{
                            delay: 3500,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                    >
                        {trainings.map((item) => (
                            <SwiperSlide key={item.id} className="pb-4">
                                <Card item={item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>





            </Container>
        </section>
    );
};

// CLEANER, MODERN CARD COMPONENT
const Card = ({ item }) => {
    return (
        <article className={`group relative flex flex-col rounded-[2.5rem] ${item.bgColor} border border-slate-100 shadow-sm transition-all duration-700 ease-out hover:shadow-xl hover:-translate-y-2 overflow-hidden md:overflow-visible mb-6 mt-0 md:mt-20  z-20`}>

            {/* Decorative Blur Background */}
            <div className={`absolute -top-20 -right-20 h-64 w-64 rounded-full blur-[80px] opacity-20 ${item.glowColor}`}></div>

            {/* IMAGE CONTAINER */}
            <div className="relative w-full sm:h-48 h-40 sm:mb-10 mb-8 overflow-hidden md:overflow-visible  bg-[#1C4FD8] rounded-t-[2.5rem] flex items-start justify-center">
                <Image
                    src={item.image}
                    alt={item.title}
                    width={220}
                    height={140}
                    className={`h-auto min-w-[130px] w-[190px] sm:min-w-[220px] sm:w-[238px] object-contain drop-shadow-2xl transition-transform duration-700 ease-out group-hover:scale-105 group-hover:-translate-y-1 absolute ${item.imageOffsetMobile || "-top-3"} md:top-0 ${item.imageOffset} z-20`}
                />
            </div>

            {/* TEXT CONTENT */}
            <div className="relative z-10 flex flex-col h-full sm:pb-8 pb-6 sm:px-8 px-6 xl:pb-10 xl:px-10 ">
                <h3 className="sm:mb-4 mb-2 sm:text-[26px] text-[18px] font-extrabold text-slate-900 leading-tight">
                    {item.title}
                </h3>

                <p className="sm:mb-6 mb-4 sm:text-[15px] text-[13px] text-slate-500 leading-relaxed font-medium">
                    {item.description}
                </p>

                {/* FEATURE LIST */}
                <ul className=" sm:mb-0 mb-6  space-y-1 sm:space-y-3">
                    {item.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3 transition-transform duration-500 ease-out group-hover:translate-x-0.5">
                            <div className={`flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full ${item.bgColor} border border-white shadow-sm transition-all duration-500 ease-out group-hover:shadow-md`}>
                                <CheckCircle2 className={`h-3 w-3 sm:h-4 sm:w-4 ${item.accentColor}`} />
                            </div>
                            <span className="sm:text-sm text-[12px] sm:font-bold font-medium text-slate-600 font-lexend  tracking-tight">{feature}</span>
                        </li>
                    ))}
                </ul>

                {/* CTA BUTTON */}
                <div className=" mt-auto">
                    <Link
                        href={`/packages?type=${item.drivingType}`}
                        className={`flex items-center justify-center w-full rounded-2xl btn-gradient btn-gradient-glow sm:py-4.5 py-3 text-[12px] xl:text-[13px] font-black transition-all duration-500 ease-out hover:brightness-110 hover:shadow-xl hover:-translate-y-0.5 shadow-lg uppercase xl:tracking-[0.15em] tracking-[0.1em] `}
                    >
                        {item.linkText}
                    </Link>
                </div>
            </div>
        </article>
    );
};

export default ProfessionalTraining1;