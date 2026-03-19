import React from 'react';
import { ShoppingCart, Check, Car, Bike } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { PricingCard } from '../ui/PricingCard';

export function PricingSection({ data }) {
    return (
        <section id="pricing" className="md:pt-16 pt-10 bg-[#FFFFFF] font-lexend">
            <div className="container mx-auto px-4 text-center ">
                {/* Header Section */}
                <SectionHeading
                    title={data.headline}
                    description={data.subtitle}
                />
                {/* Pricing Cards Grid */}
                <PricingCard data={data} />
                {/* Footer Disclaimer */}
                <p className="mt-12 text-sm text-slate-400">
                    * Prices are inclusive of service taxes. RTO government fees are to be paid separately at the venue.
                </p>
            </div>
        </section>
    );
}