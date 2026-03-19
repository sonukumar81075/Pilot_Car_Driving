import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";

export function Testimonials({ testimonials }) {
  return (
    <section id="testimonials" className="md:pt-20 pt-10 bg-[#FFFFFF] font-lexend">
      <Container>
        <SectionHeading
          eyebrow="Our Testimonials"
          title="User reviews and feedback"
          description="See how Pronto has transformed users' experiences through their own words"
        />
        <Reveal className="mt-8">
          <TestimonialsCarousel testimonials={testimonials} />
        </Reveal>
      </Container>
    </section>
  );
}

