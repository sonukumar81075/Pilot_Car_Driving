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
    // image: "/images/trusted-experts-mobile.png",
  },
  {
    title: "Flexible Time Slots",
    description: "Learn when it works for you, not when a driving school says so.",
    icon: Calendar,
    image: "/images/whyChoose/Flexible-Time-Slots.jpg.jpeg",
    // image: "/images/reschedule-or-cancel-mobile.svg",
  },
  {
    title: "Trusted Instructors",
    description: "Learn from verified professionals who help you build confidence behind the wheel.",
    icon: Smartphone,
    // image: "/images/flexible-booking-mobile.svg",
    image: "/images/whyChoose/Trusted-Instructors.png",

  },
  {
    title: "Reschedule Anytime",
    description: "Plans changed? Easily reschedule your lessons without hassle.",
    icon: BookOpen,
    // image: "/images/maid.png",
    image: "/images/whyChoose/Reschedule-Anytime.jpg.jpeg",
  },
  {
    title: "License Assistance",
    description: "Get end-to-end support for your driving license journey.",
    icon: RefreshCcw,
    // image: "/images/rating-mobile.svg",
    image: "/images/whyChoose/License-Assistance.jpg.jpeg",
  },
  {
    title: "Start with a Free Trial",
    description: "Experience your first lesson before committing to a full learning package.",
    icon: BadgeCheck,
    // image: "/images/trusted-by-numbers.svg",
    image: "/images/whyChoose/Start-with-a-Free-Trial.png",
  },
];
export function WhyChoosePilot3() {
  return (
    <section className="md:pt-20 pt-10 pb-16 bg-gradient-to-b from-[var(--brand-muted)] to-whitefont-sans">
      <Container>
        {/* HEADER */}
        <div className="mb-10 text-center">
          <SectionHeading
            title="Why Choose Pilot?"
            description="Because learning driving should feel easy — not stressful."
          />
        </div>




        {/* ✅ MOBILE CARD STACK (Visible on Mobile Only) */}

        <div className="grid grid-cols-2 gap-4 p  sm:hidden">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-[#F1F3F5] rounded-[22px] overflow-hidden border border-slate-200 shadow-[0_1px_3px_rgba(0,0,0,0.09)] flex flex-col"
            >
              {/* Image Section */}
              <div className="h-[152px] bg-[#f8fafc] flex items-center justify-center rounded-t-[22px]   overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className={`w-full h-full ${feature.image.endsWith(".svg") ? "object-contain p-2" : "object-cover p-2 rounded-t-[22px]"}`}
                />
              </div>

              {/* Text Section */}
              <div className="bg-[#FFFFFF] px-2 pb-2 flex items-center justify-center min-h-[76px]">
                <h3 className="text-[13px] font-normal text-slate-700 text-center leading-[1.25] font-lexend">
                  {feature.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 bg-[#F8F9F5] sm:hidden">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group relative h-[220px] sm:h-[400px] w-full overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 active:scale-95 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'both' }}
            > 
              <img
                src={feature.image}
                alt={feature.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
 
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-80" />
 
              <div className="absolute right-2 top-2 sm:right-4 sm:top-4 flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-3 h-3 sm:w-4 sm:h-4"
                >
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
              </div>
 
              <div className="absolute bottom-0 left-0 w-full p-3 sm:p-6 text-white transition-transform duration-300 group-hover:-translate-y-1">
                <h3 className="text-sm sm:text-2xl font-bold tracking-tight font-lexend leading-tight mb-1">
                  {feature.title}
                </h3>
                <p className="text-[10px] sm:text-sm font-light text-gray-200 line-clamp-1 opacity-90 transition-opacity duration-300 group-hover:opacity-100">
                  {feature.description || "Dramatic coastlines"}
                </p>
 
                <div className="h-0.5 w-0 bg-white/60 transition-all duration-500 group-hover:w-12 mt-2 rounded-full" />
              </div>
            </div>
          ))}
        </div> */}

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