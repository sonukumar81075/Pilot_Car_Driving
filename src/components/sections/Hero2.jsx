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

                                {/* 🔵 Badge */}
                                {/* <div className="inline-flex items-center gap-3 px-2 py-1 mb-4 relative overflow-hidden">
                                
                                    <span className="text-blue-600 font-light text-xl animate-pulse">[</span>

                                    <div className="flex flex-col items-start">
                                        <span className="text-[12px] font-black tracking-[0.2em] text-slate-800">INDIA'S FIRST</span>
                                        <div className="h-0.5 w-0 bg-blue-500 animate-[grow_2s_infinite]"></div>
                                    </div>
 
                                    <span className="text-blue-600 font-light text-xl animate-pulse">]</span>
 
                                    <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent h-1/2 w-full -translate-y-full animate-[scan_2s_linear_infinite]"></div>

                                    <style>{`
                                    @keyframes grow { 0%, 100% { width: 0%; } 50% { width: 100%; } }
                                    @keyframes scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(200%); } }
                                `}</style>
                                </div> */}

                                {/* <div className="relative inline-flex items-center py-2 pr-4 pl-10 mb-4 bg-slate-50 border border-slate-200 rounded-r-full shadow-inner"> 
                                    <div className="absolute left-0 w-12 h-12 flex items-center justify-center">
                                        <div className="absolute inset-0 border-2 border-dashed border-blue-400 rounded-full animate-[spin_10s_linear_infinite]"></div>
                                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-[10px] font-black shadow-lg animate-[pulse_2s_infinite]">
                                            1st
                                        </div>
                                    </div>

                                    <div className="flex flex-col ml-2">
                                        <span className="text-[10px] text-blue-500 font-bold leading-none">OFFICIALLY</span>
                                        <span className="text-[13px] text-slate-800 font-black tracking-tight">INDIA'S FIRST</span>
                                    </div>
                                </div> */}

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


                                {/* <div className="relative inline-flex items-center justify-center p-4 mb-4 group">
                                    <span className="absolute h-full w-full rounded-full border border-blue-400 animate-[ping_3s_linear_infinite] opacity-20"></span>
                                    <span className="absolute h-3/4 w-3/4 rounded-full border border-blue-500 animate-[ping_2s_linear_infinite] opacity-40"></span>
                                    <div className="relative z-10 px-4 py-1.5 bg-blue-600 rounded-lg text-white text-[12px] font-black tracking-tighter shadow-xl transform group-hover:rotate-3 transition-transform">
                                        INDIA’S FIRST
                                    </div>
                                </div>

                                <div className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-bold text-[12px] shadow-lg animate-[morph_5s_linear_infinite] mb-4">
                                    INDIA’S FIRST
                                    <style>{`
                                            @keyframes morph {
                                            0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
                                            50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
                                            }
                                        `}</style>
                                </div>
 
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 rounded-sm mb-4 border-l-4 border-blue-500">
                                    <div className="h-4 overflow-hidden flex flex-col text-[12px] font-bold text-white uppercase">
                                        <span className="animate-[scrollUp_3s_infinite]">India's First</span>
                                        <span className="animate-[scrollUp_3s_infinite]">India's First</span>
                                    </div>
                                    <style>{`@keyframes scrollUp { 0% { transform: translateY(0); } 100% { transform: translateY(-100%); } }`}</style>
                                </div>

 
                                <div className="relative inline-flex flex-col mb-4 overflow-hidden">
                                    <div className="flex gap-0.5 mb-1">
                                        {[...Array(12)].map((_, i) => (
                                            <div key={i} className={`bg-slate-300 h-2 ${i % 3 === 0 ? 'w-1' : 'w-[2px]'}`}></div>
                                        ))}
                                    </div>
                                    <span className="text-[11px] font-black text-slate-800 tracking-[0.3em]">INDIA'S FIRST</span>
                                    <div className="absolute top-0 left-0 w-full h-[1px] bg-red-500 shadow-[0_0_8px_red] animate-[laser_2s_linear_infinite]"></div>
                                    <style>{`@keyframes laser { 0% { top: 0; } 100% { top: 100%; } }`}</style>
                                </div> 

                                <div className="px-4 py-2 border-2 border-blue-500 rounded-md mb-4 bg-slate-900">
                                    <span className="text-blue-400 text-[12px] font-bold tracking-widest animate-[flicker_2s_infinite]">
                                        INDIA'S FIRST
                                    </span>
                                    <style>{`
                                        @keyframes flicker {
                                        0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; text-shadow: 0 0 10px #3b82f6; }
                                        20%, 22%, 24%, 55% { opacity: 0.4; text-shadow: none; }
                                        }
                                `}</style>
                                </div>

                                <div className="inline-flex items-center justify-center w-28 h-28 bg-blue-100 animate-[pulse_2s_infinite] mb-4" style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }}>
                                    <div className="text-center flex flex-col leading-tight">
                                        <span className="text-[10px] text-blue-500 font-bold">THE</span>
                                        <span className="text-[14px] text-blue-900 font-black">1ST</span>
                                        <span className="text-[9px] text-blue-500 font-bold">INDIA</span>
                                    </div>
                                </div>

                                <div className="inline-flex items-center gap-1 font-mono text-[13px] text-green-600 bg-black px-3 py-1 mb-4 shadow-2xl">
                                    <span className="opacity-50">&gt;</span>
                                    <span className="font-bold tracking-tighter overflow-hidden whitespace-nowrap animate-[typing_4s_steps(13)_infinite]">
                                        INDIA'S FIRST
                                    </span>
                                    <span className="w-2 h-4 bg-green-600 animate-pulse"></span>
                                    <style>{`
                                        @keyframes typing { from { width: 0 } to { width: 100% } }
                                    `}</style>
                                </div>  */}





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
                    <div className="relative flex min-w-0 w-full max-w-full justify-center md:col-span-5 md:justify-end order-2 sm:mt-10 mt-0 md:mt-6 lg:mt-0">

                        <div className="relative w-full max-w-[min(100%,340px)] sm:max-w-[300px] md:max-w-[340px] lg:max-w-[320px] md:pt-4 lg:pt-10 pt-0">

                            <Reveal delay={0.2} className="relative z-20 block">

                                <div className="relative mx-auto w-full max-w-[350px] sm:max-w-[300px] md:mx-0 md:max-w-[260px] lg:max-w-[300px] xl:max-w-[320px] md:rotate-2 lg:rotate-3 xl:rotate-6 transition-transform duration-700 hover:rotate-0">

                                    {/* ✅ MOBILE IMAGE */}
                                    <div className="block md:hidden mt-10">
                                        <Image
                                            src="/images/mobile_view_image.png"
                                            alt="driving app"
                                            width={800}
                                            height={800}
                                            className="h-auto w-full max-w-[100%] transition duration-300 hover:scale-[1.03]"
                                        />
                                    </div>

                                    {/* ✅ DESKTOP IMAGE */}
                                    <div className="hidden md:block">
                                        <div className="overflow-hidden rounded-[2.2rem] border-[7px] border-slate-900 bg-white shadow-[0_30px_60px_-24px_rgba(0,0,0,0.28)] md:rounded-[2.6rem] md:border-[8px] lg:rounded-[3rem] lg:border-[10px]">
                                            <Image
                                                src={data.heroImage.src}
                                                alt={data.heroImage.alt}
                                                width={800}
                                                height={800}
                                                className="h-auto w-full max-w-[400px] lg:max-w-[650px] transition duration-300 hover:scale-[1.03]"
                                                priority
                                            />
                                        </div>
                                    </div>

                                    {/* Floating Card 1 */}
                                    <div className="absolute -left-2 top-[18%] z-30 hidden xl:block 2xl:-left-8 animate-bounce-slow">
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
                                    <div className="absolute -right-2 bottom-[28%] z-30 hidden xl:block 2xl:-right-6 animate-bounce-slower">
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
