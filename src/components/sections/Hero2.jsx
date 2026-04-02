"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import Link from "next/link";

export function Hero2({ data }) {
    return (
        <section className="section-surface relative overflow-x-clip pb-16 sm:pt-32 pt-28 font-lexend md:pb-20 md:pt-28 lg:pb-28 lg:pt-28 xl:pb-40 xl:pt-36">

            {/* Background */}
            <div
                className="pointer-events-none absolute right-0 top-0 hidden h-full w-[min(55vw,720px)] bg-gradient-to-b from-[var(--brand-light)]/25 to-[var(--accent)]/10 lg:block"
                style={{ clipPath: "polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
            />

            <Container className="relative z-10 w-full max-w-[min(100%,1440px)] px-4 md:px-6 lg:px-8 xl:px-10">

                <div className="mx-auto grid min-w-0 max-w-full grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-8 lg:gap-10 xl:gap-16">

                    {/* LEFT CONTENT */}
                    <div className="min-w-0 max-w-full md:col-span-7 flex flex-col items-center md:items-start order-1 text-center md:text-left">

                        {/* Heading */}
                        <Reveal delay={0.1}>
                            <h1 className="max-w-[20ch] text-balance text-center md:block hidden md:text-left text-3xl sm:text-4xl md:text-[44px] lg:text-5xl xl:text-6xl leading-[1.1] font-[800] text-slate-900 md:pt-6 lg:pt-10 pt-0">
                                The Smarter Way to{" "}
                                <span className="bg-[#1D4ED8] bg-clip-text text-transparent">
                                    Learn & Drive
                                </span>{" "}
                                and Get Licensed.
                            </h1>

                            {/* ✅ MOBILE DESIGN */}
                            <div className="md:hidden flex flex-col items-start">


                                <div className="inline-flex flex-col items-center mb-4">
                                    <div className="bg-blue-600 text-white text-[9px] px-2 py-0.5 rounded-t-md font-bold animate-[slideDown_0.5s_ease-out]">
                                        RANKED #1
                                    </div>
                                    <div className="bg-white border-x border-b border-slate-200 px-4 py-1 flex items-center gap-2 shadow-sm">
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></div>
                                        <span className="text-[12px] font-black text-slate-700">INDIA'S FIRST</span>
                                    </div>

                                    <style>{`
                                        @keyframes slideDown { from { transform: translateY(5px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
                                    `}</style>
                                </div>






                                <h1 className="overflow-visible pb-2 text-[30px] sm:text-4xl font-black tracking-tight leading-[1.28] flex flex-wrap justify-center">

                                    <span className="inline-block bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent italic mr-2 px-[2px] -mx-[2px]">
                                        Driving
                                    </span>

                                    <span className="text-slate-900 mr-2">
                                        Learning
                                    </span>

                                    <span className="relative text-slate-900">
                                        App
                                        <span className="absolute left-0 -bottom-1 h-[3px] w-full bg-blue-600 rounded-full"></span>
                                    </span>

                                </h1>

                                <div className="relative mt-6 w-full flex items-end justify-end">

                                    <span className="absolute w-6 h-6 rounded-full bg-blue-400 opacity-30 animate-ping"></span>

                                    <span className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 shadow-md"></span>

                                </div>

                            </div>
                        </Reveal>

                        {/* Subtitle */}
                        <Reveal delay={0.2}>
                            <p className="mx-auto mt-4 lg:mt-5 max-w-md text-center md:text-left text-[14px] lg:text-[15px] font-medium leading-relaxed text-slate-500 md:mx-0 md:block hidden">
                                {data.subtitle}
                            </p>

                            <p className="mx-auto mt-4 max-w-md text-center text-[15px] sm:text-[16px] font-medium leading-relaxed text-blue-900 md:hidden">
                                Book doorstep driving lessons with verified instructors, flexible time slots, and structured learning made easy.
                            </p>
                        </Reveal>

                        {/* App Buttons */}
                        <Reveal delay={0.3}>
                            <div className="mt-5 md:mt-6 flex w-full flex-wrap items-center justify-center gap-3 sm:gap-4 md:justify-start">
                                {data?.appBadges?.map((b) => (
                                    <Link
                                        key={b.label}
                                        href={b.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex shrink-0 items-center justify-center"
                                    >
                                        <Image
                                            src={
                                                b.icon === "google"
                                                    ? "/images/3P1ckGuQQEInpODdTv3kJOEgnYQ.avif"
                                                    : "/images/XFHvXmLh07GYeJbajNiemQLI9MY.avif"
                                            }
                                            alt={b.label}
                                            width={220}
                                            height={60}
                                            className="h-[44px] w-auto sm:h-[50px] md:h-[48px] lg:h-[56px] xl:h-[60px] transition-transform duration-300 hover:scale-[1.05]"
                                        />
                                    </Link>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                    {/* RIGHT IMAGE */}
                    <div className="relative flex min-w-0 w-full max-w-full justify-center md:col-span-5 md:justify-center md:items-center order-2 sm:mt-10 mt-0 md:mt-0">

                        <div className="relative w-full max-w-[min(100%,340px)] sm:max-w-[300px] 2xl:h-[650px] lg:h-[600px] md:h-[550px] sm:h-[450px] h-[350px] md:max-w-full md:min-h-[680px] mx-auto flex justify-center items-center pt-0">

                            <Reveal delay={0.2} className="relative z-20 block">

                                <div className="relative mx-auto w-full max-w-[350px] h-full sm:max-w-[300px] md:mx-auto md:max-w-[min(100%,460px)] lg:max-w-[min(100%,540px)] xl:max-w-[min(100%,620px)] 2xl:max-w-[680px]">

                                    {/* ✅ MOBILE IMAGE */}
                                    <div className="block md:hidden mt-10">
                                        <Image
                                            src="/images/Main-Image 1.png"
                                            alt="driving app"
                                            width={800}
                                            height={800}
                                            className="h-[600px] object-contain w-full max-w-[100%] transition duration-300 hover:scale-[1.03]"
                                        />
                                    </div>

                                    {/* ✅ DESKTOP IMAGE */}
                                    <div className="hidden md:flex md:justify-center md:items-center w-full">
                                        {/* MAIN IMAGE CONTAINER — desktop width + max height */}
                                        <div className="overflow-hidden rounded-[2.2rem] shadow-[0_30px_60px_-24px_rgba(0,0,0,0.28)] md:rounded-[2.6rem] w-full max-w-[460px] lg:max-w-[540px] xl:max-w-[620px] 2xl:max-w-[680px] transition duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.35)]">
                                            <Image
                                                src={data.heroImage.src}
                                                alt={data.heroImage.alt}
                                                width={1200}
                                                height={900}
                                                sizes="(min-width: 1536px) 600px, (min-width: 1280px) 560px, (min-width: 1024px) 500px, (min-width: 768px) 440px, 100vw"
                                                className="h-auto w-full max-h-[min(660px,72vh)] lg:max-h-[min(720px,74vh)] xl:max-h-[min(780px,76vh)] object-contain object-center transition duration-700 group-hover:scale-[1.05]"
                                                priority
                                            />
                                        </div>
                                    </div>



                                    {/* Floating Card 1 */}
                                    <div className="absolute -right-2 -top-[18%] z-30 hidden xl:block 2xl:-right-8 animate-bounce-slow">
                                        <div className="max-w-[200px] rounded-2xl bg-white p-3 shadow-xl ring-1 ring-slate-900/5 2xl:max-w-none 2xl:p-4">
                                            <div className="flex items-center gap-2 2xl:gap-3">
                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm text-green-600 2xl:h-10 2xl:w-10">
                                                    ✓
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-[10px] font-bold uppercase text-slate-400 2xl:text-xs">
                                                        Lesson Status
                                                    </p>
                                                    <p className="text-xs font-bold text-slate-900 2xl:text-sm">
                                                        Parallel Park Mastered
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Floating Card 2 */}
                                    <div className="absolute -left-2 -bottom-[28%] z-30 hidden xl:block 2xl:-left-6 animate-bounce-slower">
                                        <div className="max-w-[180px] rounded-2xl bg-gradient-to-r from-[var(--brand)] to-[var(--accent)] p-3 text-white shadow-xl 2xl:max-w-none 2xl:p-4">
                                            <p className="text-[10px] font-medium opacity-90 2xl:text-xs">
                                                Next Lesson
                                            </p>
                                            <p className="text-sm font-bold italic 2xl:text-lg">
                                                Today @ 4:30 PM
                                            </p>
                                            <div className="mt-2 h-1.5 w-full rounded-full bg-white/20 overflow-hidden">
                                                <div className="h-full w-2/3 rounded-full bg-[var(--accent)] animate-pulse" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Background Rings */}
                                <div className="absolute left-1/2 top-1/2 -z-10">

                                    <div className="absolute h-[180px] w-[180px] sm:h-[250px] sm:w-[250px] md:h-[350px] md:w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--accent)]/20 animate-ping-slow" />

                                    <div className="absolute h-[300px] w-[300px] sm:h-[350px] sm:w-[350px] md:h-[500px] md:w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--brand)]/20 animate-pulse" />

                                    <div className="absolute h-[350px] w-[350px] sm:h-[480px] sm:w-[480px] md:h-[650px] md:w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[var(--brand-light)]/30 animate-spin-slower" />

                                </div>

                            </Reveal>
                        </div>
                    </div>

                </div>
            </Container>
        </section>
    );
}
