"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export function TestimonialsCarousel({ testimonials }) {
  return (
    <div className="pt-6 font-lexend">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={32}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet !bg-slate-200 !opacity-100',
          bulletActiveClass: '!bg-slate-600 !w-8 rounded-full transition-all duration-300',
        }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="pb-20 !px-4"
      >
        {testimonials.map((item, i) => (
          <SwiperSlide key={i} className="py-8">
            <div className="group relative h-full transition-all duration-500">

              {/* Background Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-400 to-indigo-500 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-10 transition-opacity duration-500" />

              {/* Main Card */}
              <div className="relative h-full bg-white border border-slate-50/80 rounded-[2rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]  transition-all duration-500 flex flex-col justify-between overflow-hidden">
              {/* card hover css :  group-hover:shadow-[0_20px_50px_rgba(59,130,246,0.12)] */}
 

                <div className="relative">
                  {/* Floating Icon */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-600 group-hover:bg-slate-200 group-hover:text-slate-600 transition-colors duration-500">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V12C14.017 12.5523 13.5693 13 13.017 13H11.017V21H14.017ZM5.017 21L5.017 18C5.017 16.8954 5.91243 16 7.017 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H6.017C5.46472 8 5.017 8.44772 5.017 9V12C5.017 12.5523 4.56928 13 4.017 13H2.017V21H5.017Z" />
                      </svg>
                    </div>
                  </div>

                  <blockquote className="text-[19px] leading-[32px] text-slate-700 font-medium tracking-tight">
                    {item.quote}
                  </blockquote>
                </div>

                {/* Author Section */}
                <div className="mt-10 flex items-center gap-4">
                  <div className="relative">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded-2xl object-cover w-14 h-14   group-hover:ring-slate-100 transition-all duration-500"
                    />
                    <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-slate-500 rounded-full border-2 border-white" />
                  </div>

                  <div>
                    <p className="text-[16px] font-bold text-slate-900 group-hover:text-slate-600 transition-colors">
                      {item.name}
                    </p>
                    {item.title && (
                      <p className="text-[13px] font-bold uppercase tracking-wider text-slate-500/80 mt-0.5">
                        {item.title}
                      </p>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}