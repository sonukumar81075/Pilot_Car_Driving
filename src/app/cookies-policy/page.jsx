import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getCookiesPolicyData } from "@/lib/data";

export const metadata = {
    title: "Cookies Policy",
    description:
        "This Cookies Policy explains how we use cookies and similar technologies to enhance your experience on our website.",
};

export default async function CookiesPolicyPage() {
    const { cookies } = await getCookiesPolicyData();

    return (
        <main className="min-h-screen pt-28 md:pt-32 xl:pt-40 pb-6 font-lexend">
            <Container>
                <div className="max-w-4xl mx-auto">
                    <SectionHeading
                        title={cookies.title}
                        description={cookies.description}
                        align="center"
                    />

                    <div className="mt-10 space-y-4 text-slate-700">
                        {cookies.sections.map((section) => {
                            const isSupportSection = section.isSupport === true;

                            return (
                                <section
                                    key={section.title}
                                    className="space-y-4 rounded-3xl border border-slate-100 bg-white p-8 shadow-[0_8px_30px_rgba(15,23,42,0.04)]"
                                >
                                    <h2 className="text-[24px] font-sans font-[700] leading-[28px] text-slate-900">
                                        {section.title}
                                    </h2>

                                    {isSupportSection ? (
                                        <>
                                            {section.body[0] && (
                                                <p className="mb-6 text-[17px] font-sans font-[500] leading-[26px] text-[#4c4c4c]">
                                                    {section.body[0]}
                                                </p>
                                            )}
                                            <div className="flex flex-col items-start gap-2">
                                                <div className="text-[15px] font-sans font-[600] leading-[24px] text-slate-900">
                                                    Email:{" "}
                                                    <a
                                                        href="mailto:support@pilotnow.in"
                                                        className="font-sans font-[600] leading-[24px] text-[#2563eb] hover:underline"
                                                    >
                                                        support@pilotnow.in
                                                    </a>
                                                </div>
                                                <div className="text-[15px] font-sans font-[600] leading-[24px] text-slate-900">
                                                    Phone:{" "}
                                                    <a
                                                        href="tel:+918065489040"
                                                        className="font-sans font-[600] leading-[24px] text-[#2563eb] hover:underline"
                                                    >
                                                        +91 80654 89040
                                                    </a>
                                                </div>
                                            </div>
                                        </>
                                    ) : section.isList ? (
                                        <>
                                            {section.body[0] && (
                                                <p className="text-[17px] font-sans font-[500] leading-[26px] text-[#4c4c4c]">
                                                    {section.body[0]}
                                                </p>
                                            )}
                                            <ul className="list-disc pl-6 space-y-1">
                                                {section.body.slice(1).map((item) => (
                                                    <li
                                                        key={item}
                                                        className="text-[17px] font-sans font-[500] leading-[26px] text-[#4c4c4c]"
                                                    >
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    ) : (
                                        section.body.map((para) => (
                                            <p
                                                key={para}
                                                className="text-[17px] font-sans font-[500] leading-[26px] text-[#4c4c4c]"
                                            >
                                                {para}
                                            </p>
                                        ))
                                    )}
                                </section>
                            );
                        })}
                    </div>
                </div>
            </Container>
        </main>
    );
}
