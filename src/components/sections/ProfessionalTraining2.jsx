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
  },
  {
    id: "bike",
    title: "Bike Training",
    description: "Agile movement and high-performance safety for two-wheeled enthusiasts.",
    image: "/images/Man-riding-motorcycle-on-transparent-background-PNG-removebg-preview.png",
    features: ["Dynamic balance tech", "Defensive maneuvering", "Track-ready precision"],
    linkText: "CHOOSE YOUR PACKAGE",
    drivingType: "Bike",
  },
  {
    id: "license",
    title: "License Assistance",
    description: "Bureaucracy managed. We handle the paperwork, you handle the road.",
    image: "/images/license.png",
    features: ["Document verification", "Slot booking priority", "Zero-stress filing"],
    linkText: "CHOOSE YOUR PACKAGE",
    drivingType: "License",
  },
];

const ProfessionalTraining2 = () => {
  return (
    <section className="md:pt-32 pt-10 bg-gradient-to-b from-[var(--brand-muted)] to-white font-lexend">
      <Container>
        <SectionHeading
          title="Start Your Driving Journey Today"
          description="Professional courses tailored for your success."
        />

        {/* ✅ DESKTOP - SAME OLD GRID */}
        <div className="hidden lg:grid gap-8 pt-12 lg:grid-cols-3">
          {trainings.map((item) => (
            <Card item={item} key={item.id} />
          ))}
        </div>

        {/* ✅ MOBILE - ONLY SLIDER */}
        <div className="lg:hidden pt-10 relative">
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: ".next-btn",
              prevEl: ".prev-btn",
            }}
          >
            {trainings.map((item) => (
              <SwiperSlide key={item.id}>
                <Card item={item} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* BUTTONS */}
          <div className="flex justify-center gap-4 mt-6">
            <button className="prev-btn w-10 h-10 rounded-full bg-white shadow flex items-center justify-center">
              <ChevronLeft />
            </button>
            <button className="next-btn w-10 h-10 rounded-full bg-white shadow flex items-center justify-center">
              <ChevronRight />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};


// ✅ SAME EXACT CARD (NO CHANGE)
const Card = ({ item }) => {
  return (
    <article className="group relative flex flex-col rounded-[3rem] bg-[#2D5BFF] p-10 shadow-2xl overflow-hidden min-h-[520px] transition-transform duration-300 hover:-translate-y-2">

      {/* IMAGE */}
      <div className="absolute top-12 -right-12 w-[280px] h-[280px] opacity-20 pointer-events-none transition-transform duration-500 group-hover:scale-110">
        <Image
          src={item.image}
          alt=""
          fill
          className="object-contain object-right"
        />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col h-full">
        <h3 className="mb-4 text-[32px] font-bold text-white leading-tight max-w-[200px]">
          {item.title}
        </h3>

        <p className="mb-10 text-[16px] text-white/80 leading-relaxed max-w-[240px]">
          {item.description}
        </p>

        <ul className="mb-12 space-y-6">
          {item.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-4 text-white font-medium">
              <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white/20">
                <CheckCircle2 className="h-4 w-4 text-white" />
              </div>
              <span className="text-[15px]">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto">
          <Link
            href={`/packages?type=${item.drivingType}`}
            className="flex items-center justify-center w-full rounded-full bg-white py-3.5 text-[14px] font-bold text-[#2D5BFF] transition-all hover:bg-slate-50 shadow-lg tracking-widest"
          >
            {item.linkText}
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProfessionalTraining2;
