// "use client";

// import { Container } from "@/components/ui/Container";
// import { SectionHeading } from "@/components/ui/SectionHeading";
// import { motion } from "framer-motion";
// import Image from "next/image";

// export function HowItWorks({ steps }) {
//   // Ensure we are handling exactly 4 steps
//   const displaySteps = steps.slice(0, 4);

//   return (
//     <section id="how-it-works" className="md:pt-32 pt-16 bg-[#FFFFFF] font-lexend">
//       <Container>
//         <SectionHeading
//           eyebrow="How it works"
//           title="Learn Driving in 4 Easy Steps"
//           description="Pilot makes learning car driving easy with professional instructors and practical road training."
//         />

//         {/* Grid adjusted to 4 columns on large screens, 2 on medium */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-16">
//           {displaySteps.map((s, idx) => (
//             <motion.div
//               key={idx}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: idx * 0.1 }}
//               className="group relative"
//             >
//               <div className="relative h-full bg-white rounded-[2.5rem] border border-slate-100 p-7 pt-12 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(59,130,246,0.08)] flex flex-col">

//                 {/* Background Large Number - Matched to Screenshot */}
//                 <span className="absolute top-6 right-8 text-7xl font-black text-slate-50/80 group-hover:text-blue-50/50 transition-colors duration-500 select-none">
//                   0{idx + 1}
//                 </span>

//                 {/* Text Content */}
//                 <div className="relative z-10 mb-8 min-h-[140px]">
//                   <h3 className="text-[22px] font-[700] text-[#1c1c1c] mb-3 leading-[30px]">
//                     {s.title}
//                   </h3>
//                   <p className="text-[15px] leading-[26px] text-slate-500 font-medium">
//                     {s.description}
//                   </p>
//                 </div>

//                 {/* Bottom Image Container (The Light Blue "Bucket") */}
//                 <div className="relative mt-auto pt-6 rounded-[2rem] bg-gradient-to-b from-[#f0f7ff] to-[#ffffff] border border-blue-50 overflow-hidden">
//                   <div className="relative w-full aspect-[4/5] transform translate-y-2 group-hover:translate-y-0 transition-transform duration-700 ease-in-out">
//                     <Image
//                       src={s.image}
//                       alt={s.title}
//                       fill
//                       className="object-contain object-top drop-shadow-xl"
//                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
//                     />
//                   </div>
//                 </div>

//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </Container>
//     </section>
//   );
// }

"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { motion } from "framer-motion";
import Image from "next/image";

export function HowItWorks({ steps }) {
  const displaySteps = steps.slice(0, 4);

  return (
    <section id="how-it-works" className="md:pt-32 pt-16 bg-gradient-to-b from-[var(--brand-muted)] to-white font-lexend overflow-hidden">
      <Container className="relative">
 

        <SectionHeading
          eyebrow="The Process"
          title="Drive with Confidence in 4 Steps"
          description="A structured path designed to take you from a beginner to a licensed pro seamlessly."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 pt-20 pb-12">
          {displaySteps.map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              /* Unique: Odd cards shifted down, even cards shifted up for a staggered look */
              className={`relative group ${idx % 2 !== 0 ? "lg:mt-16" : ""}`}
            >
              {/* Step Circle Badge */}
              <div className="absolute -top-5 left-10 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-[#F1F5F9] border border-blue-900 text-blue-900 font-bold shadow-lg shadow-[rgba(49, 5, 100, 0.35)]">
                {idx + 1}
              </div>

              <div className="relative h-full rounded-[2rem]     bg-white p-6 shadow-[0_15px_40px_rgba(0,0,0,0.04)] transition-all duration-500 group-hover:-translate-y-2 group-hover:border-[var(--accent)]/20">

                {/* Content Area */}
                <div className="pt-6 mb-6">
                  <h3 className="text-[20px] font-bold text-slate-900 mb-2   transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-[14px] text-slate-500 leading-relaxed">
                    {s.description}
                  </p>
                </div>

                {/* The "Phone Hub" - Concentric circles background effect */}
                <div className="relative mt-auto aspect-[1/1.2] overflow-hidden rounded-2xl bg-gradient-to-b from-[#eef4ff] to-[#f8fbff] flex items-end justify-center">

                  {/* Decorative Circles behind the phone */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-40">
                    <div className="absolute h-32 w-32 rounded-full border border-[var(--accent)]/30 group-hover:scale-150 transition-transform duration-1000" />
                    <div className="absolute h-48 w-48 rounded-full border border-[var(--brand)]/20 group-hover:scale-125 transition-transform duration-1000" />
                  </div>

                  <div className="relative w-[85%] h-[90%] transition-transform duration-700 group-hover:scale-105">
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      className="object-contain object-bottom drop-shadow-[-10px_20px_30px_rgba(0,0,0,0.15)]"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}