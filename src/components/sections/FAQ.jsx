import { FiHelpCircle } from "react-icons/fi";
import { Container } from "../ui/Container";
import { FaqAccordion } from "./FaqAccordion";

export function FAQ({ items }) {
  return (
    <section id="faq" className="md:pt-28 pt-10 bg-[#FFFFFF] font-lexend">
      <Container>

        <div className="text-center ">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#EEF1F6] px-4 py-2 text-[15px] font-medium text-[#262626] border border-[#E3E6EC]">

            <FiHelpCircle className="text-[18px] text-[#262626]" />
            FAQ’s
          </span>

          <h2 className="mt-4 md:text-[40px] lg:text-[56px] text-[30px] font-lexend font-[700] text-slate-900 md:leading-[45px] lg:leading-[67px] leading-[36px]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mt-14 max-w-4xl mx-auto">
          <FaqAccordion items={items} />
        </div>

      </Container>
    </section>
  );
}