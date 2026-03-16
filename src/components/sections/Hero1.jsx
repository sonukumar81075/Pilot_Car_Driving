import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import Link from "next/link";

export function Hero1({ data }) {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50 to-blue-100 pt-16 md:pt-24 pb-24 font-lexend">

            {/* Dynamic Blue Background Elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute left-1/2 top-[-10%] h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-blue-50/50 blur-3xl" />
                <div className="absolute -left-20 top-1/4 h-96 w-96 rounded-full bg-blue-100/30 blur-3xl" />
                <div className="absolute -right-20 top-1/4 h-96 w-96 rounded-full bg-cyan-100/20 blur-3xl" />
            </div>

            <Container className="relative flex flex-col items-center text-center">

                {/* Hero Text */}
                <div className="mt-12 max-w-5xl px-2 md:px-0">

                    <Reveal delay={0.1}>
                        <h1 className="text-[40px] font-lexend font-[700] leading-[48px] text-slate-900 sm:text-7xl">
                            Master the Road
                            <span className="text-[#1d4ed7] px-3">with Pilot.</span>
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
                        <div className="flex flex-row justify-center items-center gap-4 mt-8">
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
                                        className="w-[160px] sm:w-[180px] md:w-[220px] h-auto transition-transform duration-300 hover:scale-105"
                                    />
                                </Link>
                            ))}
                        </div>
                    </Reveal>

                </div>

                {/* Phones Layout */}
                <div className="relative mt-20 flex justify-center items-end gap-6">

                    {/* LEFT PHONE */}
                    <Reveal delay={0.4}>
                        <div className="hidden md:block transform translate-y-12 scale-90 opacity-90">
                            <div className="relative w-[320px] overflow-hidden rounded-[2rem] shadow-xl">
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
                            <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-blue-600/20 blur-3xl" />

                            <div className="w-[320px] overflow-hidden rounded-[2.8rem] border-[8px] border-slate-900 bg-white shadow-2xl">
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
                            <div className="relative w-[320px] overflow-hidden rounded-[2rem] shadow-xl">
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
            <div className="pointer-events-none absolute bottom-0 left-0 w-full h-48 bg-gradient-to-b from-transparent via-blue-50/70 to-white"></div>

        </section>
    );
}