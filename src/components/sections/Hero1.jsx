import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import Link from "next/link";

export function Hero1({ data }) {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-white via-[var(--brand-muted,#fefce8)] to-[#fef9c3] pt-16 pb-24 font-lexend md:pt-32">

            {/* Dynamic Blue Background Elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute left-1/2 top-[-10%] h-[560px] w-[760px] -translate-x-1/2 rounded-full bg-[var(--brand)]/15 blur-3xl" />
                <div className="absolute -left-20 top-1/4 h-96 w-96 rounded-full bg-[var(--brand)]/18 blur-3xl" />
                <div className="absolute -right-20 top-1/4 h-96 w-96 rounded-full bg-amber-100/30 blur-3xl" />
            </div>

            <Container className="relative flex flex-col items-center text-center">

                {/* Hero Text */}
                <div className="mt-12 max-w-5xl px-2 md:px-0">

                    <Reveal delay={0.1}>
                        <h1 className="text-balance text-4xl font-lexend font-[700] leading-tight text-slate-900 sm:text-6xl lg:text-7xl">
                            Master the Road
                            <span className="mx-2 inline-block rounded-xl bg-[var(--brand)] px-3 py-1 text-slate-900">with Pilot.</span>
                        </h1>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <p className="mt-6 text-[18px] font-lexend font-[500] leading-[27px] text-[#666666] mx-auto max-w-2xl">
                            {data.subtitle ||
                                "The smartest way to book professional driving lessons. Track your progress, choose your instructor, and get licensed faster."}
                        </p>
                    </Reveal>

                    {/* App Badges */}
                    <Reveal delay={0.3}>
                        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                            {data?.appBadges?.map((b) => (
                                <Link key={b.label} href={b.href} target="_blank">
                                    <Image
                                        src={
                                            b.icon === "google"
                                                ? "/images/3P1ckGuQQEInpODdTv3kJOEgnYQ.avif"
                                                : "/images/XFHvXmLh07GYeJbajNiemQLI9MY.avif"
                                        }
                                        alt={b.label}
                                        width={220}
                                        height={60}
                                        className="h-auto w-[160px] transition-transform duration-300 hover:scale-105 sm:w-[180px] md:w-[220px]"
                                    />
                                </Link>
                            ))}
                        </div>
                    </Reveal>

                </div>

                {/* Phones Layout */}
                <div className="relative mt-14 flex flex-wrap items-end justify-center gap-4 sm:mt-16 md:mt-20 md:flex-nowrap md:gap-6">

                    {/* LEFT PHONE */}
                    <Reveal delay={0.4}>
                        <div className="hidden md:block transform translate-y-12 scale-90 opacity-90">
                            <div className="relative w-[320px] overflow-hidden rounded-[3rem] shadow-xl">
                                <Image
                                    src="/images/Easy_Steps/01.png"
                                    alt="Driving Instructor"
                                    width={320}
                                    height={640}
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>
                    </Reveal>

                    {/* CENTER PHONE */}
                    <Reveal delay={0.2}>
                        <div className="relative z-20">

                            {/* Glow */}
                            <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-[var(--brand)]/28 blur-3xl" />

                            <div className="w-[260px] overflow-hidden rounded-[3rem] border-[8px] border-slate-900 bg-white shadow-2xl sm:w-[320px]">
                                <Image
                                    src={data.heroImage.src}
                                    alt="Pilot App Interface"
                                    width={320}
                                    height={640}
                                    className="w-full h-auto"
                                />
                            </div>

                        </div>
                    </Reveal>

                    {/* RIGHT PHONE */}
                    <Reveal delay={0.4}>
                        <div className="hidden md:block transform translate-y-12 scale-90 opacity-90">
                            <div className="relative w-[320px] overflow-hidden rounded-[3rem] shadow-xl ">
                                <Image
                                    src="/images/Easy_Steps/03.png"
                                    alt="Happy Learner"
                                    width={320}
                                    height={640}
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>
                    </Reveal>

                </div>

            </Container>

            {/* Bottom Smooth Fade to Next Section */}
            <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-full bg-gradient-to-b from-transparent via-[var(--brand-muted,#fefce8)]/80 to-white"></div>

        </section>
    );
}