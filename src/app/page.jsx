import { getLandingData } from "@/lib/data";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Services } from "@/components/sections/Services";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/sections/Footer";
import { PricingSection } from "@/components/sections/PricingSection"; 
import LeadSection from "@/components/sections/LeadSection";
import ProfessionalTraining from "@/components/sections/ProfessionalTraining";

export default async function Home() {
  const { hero, stats, services, steps, testimonials, faq, footer, pricing, leadModal } =
    await getLandingData();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-white">
      <Navbar brand={hero.brand} links={hero.nav} />
      <main>
        <Hero data={hero} />
        <Stats stats={stats} />
        <ProfessionalTraining />
        <Services services={services} />
        <HowItWorks steps={steps} />
        <Testimonials testimonials={testimonials} />
        <PricingSection data={pricing} />
        <LeadSection data={leadModal} />
        <FAQ items={faq} />
      </main>
      <Footer data={footer} />
    </div>
  );
}

