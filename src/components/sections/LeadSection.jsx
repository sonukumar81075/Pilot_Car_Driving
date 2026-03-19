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

                <div className=" border border-gray-100 mt-12 flex flex-col items-center justify-center rounded-3xl    p-4 py-10  ">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="cursor-pointer rounded-2xl btn-gradient btn-gradient-glow px-8 py-3.5 text-[16px] font-bold text-white shadow-xl transition-all hover:brightness-105 active:scale-95"
                    >
                        Book Your First Lesson
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