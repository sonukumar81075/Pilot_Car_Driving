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
        <div className="flex md:hidden  grid grid-cols-2 gap-3  ">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl   p-4  shadow-sm border-b-2 border-l-2 border-r-2 border-blue-100 flex flex-col items-center"
            > 
              <div className="w-full h-24 rounded-2xl   bg-[#F1F5F9] flex items-center justify-center p-3 mb-3 overflow-hidden">
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


        {/* <div className="flex md:hidden  grid grid-cols-2 gap-3  ">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-tl-[17%] rounded-br-[17%] p-4  shadow-sm border-b-2 border-l-2 border-r-2 border-blue-100 flex flex-col items-center"
            >
              <div className="w-full h-24 rounded-tl-[17%] rounded-br-[17%] bg-[#F1F5F9] flex items-center justify-center p-3 mb-3 overflow-hidden">
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
        </div> */}





        {/* ✅ DESKTOP GRID (Stays as your original professional layout) */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
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