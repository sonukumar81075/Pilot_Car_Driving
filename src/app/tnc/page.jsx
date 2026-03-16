import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getLegalData } from "@/lib/data";

export const metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and conditions for using Pilot to learn car driving, book instructors, and manage your lessons.",
};

export default async function TermsAndConditionsPage() {
  const { terms } = await getLegalData();

  return (
    <main className="min-h-screen pt-28 md:pt-32 xl:pt-44 pb-16 font-lexend">
      <Container>
        <div className="max-w-2xl mx-auto">
          <SectionHeading
            title={terms.title}
            description={terms.description}
            align="center"
          />

          <div className="mt-10 space-y-10 text-slate-700">
            {terms.sections.map((section) => (
              <section key={section.title} className="space-y-4">
                <h2 className="text-[20px] font-lexend font-[700] leading-[28px] text-slate-900">
                  {section.title}
                </h2>
                {section.body.map((para) => (
                  <p
                    key={para}
                    className="text-[17px] font-lexend font-[500] leading-[26px] text-[#4c4c4c]"
                  >
                    {para}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}


