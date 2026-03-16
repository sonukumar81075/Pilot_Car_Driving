"use client";

import { Container } from "@/components/ui/Container";
import { MdOutlineEmail, MdDirectionsCar, MdOutlineTimer } from "react-icons/md";
import { GiSteeringWheel } from "react-icons/gi";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FiHelpCircle } from "react-icons/fi";

 
export default function ContactPage() {
  const contactMethods = [
    {
      title: "Enrollment Support",
      description: "Questions about packages, pricing, or starting your first lesson?",
      value: "enroll@withpilot.com",
      href: "mailto:enroll@withpilot.com",
      icon: <GiSteeringWheel className="text-2xl" />,
    },
    {
      title: "Lesson Coordination",
      description: "Need to reschedule a session or contact your driving instructor?",
      value: "+91 99104 83315",
      href: "tel:+919910483315",
      icon: <MdDirectionsCar className="text-2xl" />,
    },
    {
      title: "License Assistance",
      description: "Help with RTO documentation, slot booking, and permit queries.",
      value: "docs@withpilot.com",
      href: "mailto:docs@withpilot.com",
      icon: <MdOutlineTimer className="text-2xl" />,
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DrivingSchool",
    "name": "Pilot – Learn Car Driving",
    "description": "Premium car driving training with certified instructors and modern vehicles.",
    "url": "https://withpilot.com",
    "telephone": "+91-99104-83315",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Gurugram",
      "addressCountry": "IN"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="pb-6 font-lexend relative overflow-hidden md:pt-6 pt-6">


        <main className="pt-28 md:pt-40">
          <Container>

            <div className="text-center max-w-3xl mx-auto mb-20">
              <SectionHeading
                eyebrow="Pilot Support Hub"
                title="Get Support."
                description="Your journey to the road starts with a simple conversation. Our experts are here to guide you through every turn."
                icon={<GiSteeringWheel className="text-[18px] text-[#262626]" />}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8  ">
              {contactMethods.map((method, idx) => (
                <section
                  key={idx}
                  className="group relative bg-white border border-slate-100 p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-500 flex flex-col items-center text-center"
                >
                  <div className="mb-8 p-5 rounded-2xl bg-slate-50 text-slate-400   group-hover:scale-110 transition-all duration-300 shadow-inner">
                    {method.icon}
                  </div>

                  <h2 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">
                    {method.title}
                  </h2>
                  <p className="text-sm text-slate-500 mb-8 leading-relaxed px-2">
                    {method.description}
                  </p>

                  <a
                    href={method.href}
                    className="mt-auto w-full py-4 px-6 rounded-2xl bg-slate-800 text-white font-sans text-sm tracking-widest transition-all  shadow-xl shadow-slate-200 "
                  >
                    {method.value}
                  </a>
                </section>
              ))}
            </div>
          </Container>
        </main>
      </div>
    </>
  );
}