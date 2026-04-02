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

const features = [
  {
    title: "Doorstep Learning",
    description: "Get picked up from your preferred location and start learning with ease.",
    icon: UserCheck,
    image: "/images/whyChoose/Doorstep-Learning.png",
  },
  {
    title: "Flexible Time Slots",
    description: "Learn when it works for you, not when a driving school says so.",
    icon: Calendar,
    image: "/images/whyChoose/Flexible-Time-Slots.jpg.jpeg",
  },
  {
    title: "Trusted Instructors",
    description: "Learn from verified professionals who help you build confidence behind the wheel.",
    icon: Smartphone,
    image: "/images/whyChoose/Trusted-Instructors.png",
  },
  {
    title: "Reschedule Anytime",
    description: "Plans changed? Easily reschedule your lessons without hassle.",
    icon: BookOpen,
    image: "/images/whyChoose/Reschedule-Anytime.jpg.jpeg",
  },
  {
    title: "License Assistance",
    description: "Get end-to-end support for your driving license journey.",
    icon: RefreshCcw,
    image: "/images/whyChoose/License-Assistance.jpg.jpeg",
  },
  {
    title: "Start with a Free Trial",
    description: "Experience your first lesson before committing to a full learning package.",
    icon: BadgeCheck,
    image: "/images/whyChoose/Start-with-a-Free-Trial.png",
  },
];

export function WhyChoosePilot3() {
  return (
    <section className="md:pt-20 pt-10 pb-16 bg-[#F8FAFC] font-sans">
      <Container>
        {/* HEADER */}
        <div className="mb-10 text-center">
          <SectionHeading
            title="Why Choose Pilot?"
            description="Because learning driving should feel easy — not stressful."
          />
        </div>




        {/* ✅ MOBILE CARD STACK (Visible on Mobile Only) */}

        <h1 className="text-2xl font-bold text-center sm:hidden">1</h1>
        <div className="flex sm:hidden  grid grid-cols-2 gap-3  ">
          {features.slice(0, 2).map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl   p-4  shadow-sm border-b-2 border-l-2 border-r-2 border-blue-100 flex flex-col items-center"
            >
              <div className="w-full h-26 rounded-2xl   bg-[#F1F5F9] flex items-center justify-center p-3 mb-3 overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="max-w-full max-h-full object-contain rounded-lg  "
                />
              </div>

              <div className="text-center pb-2">
                <h3 className="text-[12px] font-[500] text-slate-600 leading-tight text-center px-2 font-lexend">
                  {feature.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
        <h1 className="text-2xl font-bold text-center sm:hidden">2</h1>
        <div className="flex sm:hidden grid grid-cols-2 gap-4 px-4 py-2">
          {features.slice(0, 2).map((feature, idx) => (
            <div
              key={idx}
              className="group relative bg-white rounded-[1.5rem] p-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-50 flex flex-col items-center transition-all duration-300 active:scale-95"
            >
              <div className="relative w-full aspect-square rounded-[2rem] bg-gradient-to-b from-slate-50 to-blue-50/50 flex items-center justify-center p-3 mb-4 overflow-hidden">

                <div className="absolute inset-0 bg-white/40 rounded-full scale-150 blur-2xl group-hover:bg-blue-100/50 transition-colors" />

                <img
                  src={feature.image}
                  alt={feature.title}
                  className="relative z-10 w-full h-full object-cover rounded-[0.5rem] shadow-sm transform transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="text-center pb-3">
                <h3 className="text-[13px] font-bold text-slate-700 leading-tight tracking-tight font-lexend px-1 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>

                <div className="mt-2 w-1 h-1 bg-blue-400 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
        <h1 className="text-2xl font-bold text-center sm:hidden">3</h1>
        <div className="flex sm:hidden  grid grid-cols-2 gap-3  ">
          {features.slice(0, 2).map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-tl-[17%] rounded-br-[17%] p-4  shadow-sm border-b-2 border-l-2 border-r-2 border-blue-100 flex flex-col items-center"
            >
              <div className="w-full h-24 rounded-tl-[17%] rounded-br-[17%] bg-[#F1F5F9] flex items-center justify-center   mb-3 overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="max-w-full max-h-full object-contain rounded-tl-[17%] rounded-br-[17%]"
                />
              </div>

              <div className="text-center pb-2">
                <h3 className="text-[12px] font-[500] text-slate-600 leading-tight text-center px-2 font-lexend">
                  {feature.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
        <h1 className="text-2xl font-bold text-center sm:hidden">4</h1>
        <div className="grid grid-cols-2 sm:hidden  gap-5 px-4 py-4">
          {features.slice(0, 2).map((feature, idx) => (
            <div key={idx} className="relative group">
              {/* Decorative back layer */}
              <div className="absolute inset-0 bg-blue-100 rounded-2xl rotate-3  rotate-6 group-hover:rotate-8 transition-transform" />
              {/* Main Card */}
              <div className="relative bg-white rounded-2xl p-3 border border-blue-50 flex flex-col items-center">
                <div className="w-full aspect-video rounded-xl bg-slate-50 mb-3 overflow-hidden">
                  <img src={feature.image} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-[13px] font-bold text-slate-700 font-lexend leading-none mb-1">
                  {feature.title}
                </h3>
                <div className="h-1 w-8 bg-blue-600 rounded-full" />
              </div>
            </div>
          ))}
        </div>
        <h1 className="text-2xl font-bold text-center sm:hidden">5</h1>

        <div className="grid grid-cols-2 sm:hidden  gap-6 px-5">
          {features.slice(0, 2).map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center group">
              <div className="relative w-full aspect-square rounded-full p-1 bg-white shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff] transition-all group-hover:shadow-inner">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-white">
                  <img src={feature.image} className="w-full h-full object-cover" />
                </div>
              </div>
              <h3 className="mt-4 text-[13px] font-semibold text-slate-600 font-lexend text-center group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:hidden  gap-3 px-4">
          {features.slice(0, 2).map((feature, idx) => (
            <div key={idx} className="bg-white border-2 border-slate-900 rounded-xl p-0 overflow-hidden shadow-[4px_4px_0px_#0f172a] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all">
              <div className="h-24 bg-slate-100 border-b-2 border-slate-900">
                <img src={feature.image} className="w-full h-full object-cover" />
              </div>
              <div className="p-3 bg-white">
                <h3 className="text-[12px] font-black text-slate-900 leading-tight">
                  {feature.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
        <h1 className="text-2xl font-bold text-center sm:hidden">6</h1>
        <div className="grid grid-cols-2 sm:hidden  gap-4 px-4 py-2">
          {features.slice(0, 2).map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center  rounded-tl-[17%] rounded-br-[17%]">
              <div className="relative w-full overflow-hidden rounded-tl-[17%] rounded-br-[17%]   p-1 group">
                <div className="bg-white rounded-tl-[17%] rounded-br-[17%]   overflow-hidden aspect-[4/5]">
                  <img src={feature.image} className="w-full h-full object-cover   group-hover:grayscale-0 transition-all duration-500" />
                </div>
                {/* Animated Badge */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white px-2 py-1  rounded-tl-[17%] rounded-br-[17%] shadow-md">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                </div>
              </div>
              <h3 className="mt-2 text-[12px] font-bold text-slate-500 font-lexend text-center">
                {feature.title}
              </h3>
            </div>
          ))}
        </div>

        {/* ✅ DESKTOP GRID (Stays as your original professional layout) */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="group relative h-full bg-white rounded-[1.5rem] p-8 shadow-md border border-slate-100 transition-all duration-500 flex flex-col items-start overflow-hidden hover:shadow-xl"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-blue-50 to-transparent blur-2xl"></div>

              {/* ICON */}
              <div className="w-14 h-14 rounded-xl bg-slate-50 flex items-center justify-center text-blue-900 group-hover:bg-blue-100 transition mb-6">
                <feature.icon strokeWidth={1.5} className="size-7" />
              </div>

              <div className="relative z-10">
                <h3 className="text-[20px] font-semibold text-slate-900 mb-2 font-lexend group-hover:text-blue-900 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-500 text-[14px] font-medium leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* BACKGROUND NUMBER */}
              <span className="absolute top-4 right-6 opacity-[0.05] text-5xl font-black group-hover:opacity-20 group-hover:text-blue-900 transition-all">
                0{idx + 1}
              </span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}