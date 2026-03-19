"use client";

import React, { useState } from "react";
import LeadModal from "./LeadModal";
import { SectionHeading } from "../ui/SectionHeading";
import { Container } from "../ui/Container";

const LeadSection = ({ data }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section id="lead-form" className="md:pt-32 pt-10 bg-white font-lexend">
            <Container>
                <SectionHeading
                    // eyebrow="Get Started"
                    title="Start Your Driving Journey Today"
                    description="Fill out the quick form and our team will contact you shortly to help you book your first driving lesson."
                />

                <div className="flex flex-col items-center justify-center mt-8 p-4 border border-gray-50 rounded-3xl py-10 mb-6 bg-[#FFFFFF] shadow-md">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="rounded-2xl bg-slate-600 hover:bg-slate-700  px-8 py-3.5 text-[16px] cursor-pointer font-bold text-white shadow-xl  transition-all   active:scale-95"
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