"use client";

import React, { useState } from "react";
import LeadModal from "./LeadModal";
import { SectionHeading } from "../ui/SectionHeading";
import { Container } from "../ui/Container";

const LeadSection = ({ data }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section id="lead-form" className="md:pt-32 pt-10 bg-gradient-to-b from-[var(--brand-muted)] to-white font-lexend">
            <Container>
                <SectionHeading
                    // eyebrow="Get Started"
                    title="Start Your Driving Journey Today"
                    description="Fill out the quick form and our team will contact you shortly to help you book your first driving lesson."
                />

                <div className=" border border-gray-100 sm:mt-12 mt-6 mb-10 sm:mb-0  flex flex-col items-center justify-center rounded-3xl btn-gradient btn-gradient-glow  sm:max-w-sm max-w-xs mx-auto  ">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="cursor-pointer rounded-2xl   sm:px-12 px-6 sm:py-12 py-5 text-[16px] font-bold text-white   transition-all hover:brightness-105 active:scale-95"
                    >
                        Book Your Free Trial
                    </button>

                    <LeadModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        data={data}
                    />
                </div>
            </Container>
        </section>
    );
};

export default LeadSection;