import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getLegalData } from "@/lib/data";

export const metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy explaining how Pilot collects, uses, and protects your data while you learn car driving with our platform.",
};

export default async function PrivacyPolicyPage() {
  const { privacy } = await getLegalData();

  return (
    <main className="min-h-screen pt-28 md:pt-32 xl:pt-44 pb-16 font-lexend">
      <Container>
        <div className="max-w-3xl mx-auto">
          <SectionHeading
            title={privacy.title}
            description={privacy.description}
            align="center"
          />

          <div className="mt-10 space-y-10 text-slate-700">
            {privacy.sections.map((section) => (
              <section key={section.title} className="space-y-4">
                <h2 className="text-[20px] font-lexend font-[700] leading-[28px] text-slate-900">
                  {section.title}
                </h2>
                {section.body.map((para) => (
                  <p
                    key={para}
                    className="text-[17px] font-sans font-[500] leading-[26px] text-[#4c4c4c]"
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

