import { getLandingData } from "@/lib/data";
import { PricingSection } from "@/components/sections/PricingSection";

export default async function PricingPage() {
  const { pricing } = await getLandingData();

  return (
    <main className="min-h-screen pt-24 md:pt-28 pb-16">
      <PricingSection data={pricing} />
    </main>
  );
}