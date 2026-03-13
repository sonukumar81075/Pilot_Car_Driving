import { getLandingData } from "@/lib/data";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Services } from "@/components/sections/Services";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/sections/Footer";

export default async function Home() {
  const { hero, stats, services, steps, testimonials, faq, footer } =
    await getLandingData();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-white">
      <Navbar brand={hero.brand} links={hero.nav} />
      <main>
        <Hero data={hero} />
        <Stats stats={stats} />
        <Services services={services} />
        <HowItWorks steps={steps} />
        <Testimonials testimonials={testimonials} />
        <FAQ items={faq} />
      </main>
      <Footer data={footer} />
    </div>
  );
}

