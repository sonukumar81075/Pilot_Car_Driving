import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";

export function Testimonials({ testimonials }) {
  return (
    <section id="testimonials" className="md:pt-32 pt-10 bg-gradient-to-b from-white to-[var(--brand-muted)] font-lexend">
      <Container>
        <SectionHeading
          // eyebrow="Our Testimonials"
          title="What Our Learners Say Testimonials"
          description="Real experiences from people who started their driving journey with Pilot."
        />
        <Reveal className="mt-8">
          <TestimonialsCarousel testimonials={testimonials} />
        </Reveal>
      </Container>
    </section>
  );
}

