"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import {
  UserCheck,
  BookOpen,
  Smartphone,
  Calendar,
  RefreshCcw,
  BadgeCheck,
} from "lucide-react";

// ✅ Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; // 👈 important
import "swiper/css";
import { WhyChooseCard } from "../ui/WhyChooseCard";

const features = [
  { title: "Certified Instructors", description: "Verified safety experts.", icon: UserCheck },
  { title: "Structured Learning", description: "Data-driven curriculum.", icon: BookOpen },
  { title: "App-Based Booking", description: "Manage on our mobile app.", icon: Smartphone },
  { title: "Flexible Scheduling", description: "Slots that fit your life.", icon: Calendar },
  { title: "Easy Reschedule", description: "One-tap session changes.", icon: RefreshCcw },
  { title: "License Assistance", description: "We handle RTO paperwork.", icon: BadgeCheck },
];

export function WhyChoosePilot() {
  return (
    <section className="md:pt-20 sm:pt-16 pt-4 bg-gradient-to-b from-[var(--brand-muted)] to-white font-lexend">
      <Container>
        <div className="sm:mb-14 mb-8 text-center">
          <SectionHeading
            title="Why Choose Pilot?"
            description="Premium driving education simplified."
          />
        </div>

        {/* ✅ MOBILE SLIDER */}
        <div className="block md:hidden">
          <Swiper
            modules={[Autoplay]} // 👈 enable autoplay
            spaceBetween={12}
            slidesPerView={2}
            slidesPerGroup={2}
            loop={true} // 👈 infinite
            autoplay={{
              delay: 2500, // 👈 speed (2.5 sec)
              disableOnInteraction: false, // 👈 user swipe ke baad bhi continue
            }}
          >
            {features.map((feature, idx) => (
              <SwiperSlide key={idx}>
                <WhyChooseCard feature={feature} idx={idx} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ✅ DESKTOP GRID */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, idx) => (
            <WhyChooseCard key={idx} feature={feature} idx={idx} />
          ))}
        </div>
      </Container>
    </section>
  );
}
