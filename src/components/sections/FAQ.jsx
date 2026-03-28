import { FiHelpCircle } from "react-icons/fi";
import { Container } from "../ui/Container";
import { FaqAccordion } from "./FaqAccordion";
import { SectionHeading } from "../ui/SectionHeading";

export function FAQ({ items }) {
  return (
    <section id="faq" className="md:pt-32 pt-10  bg-gradient-to-b from-white to-[var(--brand-muted)] font-lexend overflow-hidden">
      <Container>

        <SectionHeading
          // eyebrow="FAQ’s"
          title="Frequently Asked Questions"
          description="Everything you need to know before you start learning with Pilot."
        />
        <div className="mt-14 max-w-4xl mx-auto">
          <FaqAccordion items={items} />
        </div>

      </Container>
    </section>
  );
}