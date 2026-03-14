"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { motion } from "framer-motion";
import Image from "next/image";

export function HowItWorks({ steps }) {
  return (
    <section id="how-it-works" className="md:pt-32 pt-10 bg-[#FFFFFF] font-lexend">
      <Container>

      <SectionHeading
        eyebrow="How it works"
        title="Learn Driving in 3 Easy Steps"
        description="Pilot makes learning car driving easy with professional instructors and practical road training."
      />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-18">
          {steps.map((s, idx) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative"
            >

              <div className="relative h-full bg-white rounded-[2.5rem] border border-slate-100 p-8 pt-12 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(59,130,246,0.1)] hover:-translate-y-2">

                <span className="absolute top-6 right-8 text-7xl font-black text-blue-50/50 select-none group-hover:text-blue-50 transition-colors">
                  {s.step}
                </span>

                <div className="relative z-10 mb-10">
                  <h3 className="text-[24px] font-[700] text-[#1c1c1c] mb-4 font-lexend leading-[34px] transition-colors">
                    {s.title}
                  </h3>

                  <p className="text-[19px] leading-[32px] text-slate-700 font-lexend tracking-tight ">
                    {s.description}
                  </p>
                </div>

                <div className="relative mt-auto pt-4 rounded-[2rem] bg-gradient-to-b from-blue-50 to-white border border-blue-100/50 overflow-hidden">
                  <div className="relative w-full aspect-[4/5] mt-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">

                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      className="object-contain object-top drop-shadow-2xl "
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />

                  </div>
                </div>

                {/* <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-blue-600 rounded-b-full group-hover:w-24 transition-all duration-500" /> */}

              </div>

            </motion.div>
          ))}
        </div>

      </Container>
    </section>
  );
}