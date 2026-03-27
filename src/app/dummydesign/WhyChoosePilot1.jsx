"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  UserCheck,
  BookOpen,
  Smartphone,
  Calendar,
  RefreshCcw,
  BadgeCheck,
} from "lucide-react";
import { motion } from "framer-motion";

// ✅ Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const features = [
  { title: "Certified Instructors", description: "Verified safety experts.", icon: UserCheck },
  { title: "Structured Learning", description: "Data-driven curriculum.", icon: BookOpen },
  { title: "App-Based Booking", description: "Manage on our mobile app.", icon: Smartphone },
  { title: "Flexible Scheduling", description: "Slots that fit your life.", icon: Calendar },
  { title: "Easy Reschedule", description: "One-tap session changes.", icon: RefreshCcw },
  { title: "License Assistance", description: "We handle RTO paperwork.", icon: BadgeCheck },
];

export function WhyChoosePilot1() {
  return (
    <section className="md:pt-20 sm:pt-16 pt-4 sm:pb-10 bg-gradient-to-b from-[var(--brand-muted)] to-white font-lexend">
      <Container>
        {/* HEADER */}
        <div className="sm:mb-14 mb-8 text-center">

          <SectionHeading
            title="Why Choose Pilot?"
            description="Premium driving education simplified."
          />


        </div>
        {/* ✅ MOBILE GRID POINTS */}
        {/* ✅ MOBILE SIMPLE GRID LIST */}
        <div className="block md:hidden grid grid-cols-2 gap-x-4 gap-y-2">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-2">

              {/* ✅ CHECK ICON */}
              <span className="text-blue-600 text-[12px] mt-[2px] flex items-center justify-center w-6 h-6 rounded-full bg-slate-100">✓</span>

              <div className="flex flex-col text-left">
                <h3 className="text-[13px] font-semibold text-slate-900 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-slate-500 text-[12px] font-medium leading-snug">
                  {feature.description}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* ✅ DESKTOP GRID */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="group relative h-full bg-white rounded-[1.5rem] p-8 shadow-md border border-slate-100 transition-all duration-500 flex flex-col items-center text-center overflow-hidden hover:shadow-xl"
            >

              {/* 🔵 Background Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-blue-50 via-transparent to-blue-100 blur-2xl"></div>

              {/* CONTENT */}
              <div className="relative z-10 flex flex-col items-center">

                {/* ICON */}
                <div className="w-14 h-14 rounded-xl bg-slate-50 flex items-center justify-center text-blue-900 mb-4 group-hover:bg-blue-100 transition">
                  <feature.icon
                    strokeWidth={1.5}
                    className="text-blue-900 size-8 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* TITLE */}
                <h3 className="text-[18px] font-semibold text-slate-900 mb-2 group-hover:text-blue-900 transition-colors">
                  {feature.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-slate-500 text-[14px] font-medium leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* NUMBER */}
              <span className="absolute top-3 right-4 opacity-[0.02] text-5xl font-black transition-all duration-500 group-hover:opacity-20 group-hover:text-blue-900">
                0{idx + 1}
              </span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}