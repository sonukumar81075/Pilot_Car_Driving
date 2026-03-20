import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import Link from "next/link";

export function Hero2({ data }) {
    return (
        <section className="section-surface relative overflow-x-clip pb-16 pt-32 font-lexend md:pb-20 md:pt-28 lg:pb-28 lg:pt-28 xl:pb-40 xl:pt-36">
            {/* Background — no horizontal bleed */}
            <div
                className="pointer-events-none absolute right-0 top-0 hidden h-full w-[min(55vw,720px)] bg-gradient-to-b from-[var(--brand-light)]/25 to-[var(--accent)]/10 lg:block"
                style={{ clipPath: "polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
            />

            <Container className="relative z-10 w-full max-w-[min(100%,1440px)] px-4 md:px-6 lg:px-8 xl:px-10">
                <div className="mx-auto grid min-w-0 max-w-full grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-16">
                    {/* LEFT */}


                    <div className="min-w-0 max-w-full lg:col-span-7 flex flex-col items-center lg:items-start order-2 lg:order-1">
                        {/* 1. Badge & Main Heading */}
                        <Reveal delay={0.1}>


                            <h1 className="max-w-[18ch] text-balance text-center lg:text-left text-4xl font-[800] tracking-tight text-slate-900 sm:text-5xl md:text-6xl xl:text-7xl leading-[1.1]">
                                The Smarter Way to{" "}

                                <span className="bg-[#1D4ED8] bg-clip-text text-transparent">
                                    Learn & Drive
                                </span>

                                {" "}and Get Licensed.
                            </h1>
                        </Reveal>

                        {/* 2. Subtitle with better line-height */}
                        <Reveal delay={0.2}>
                            <p className="mx-auto mt-6 max-w-xl text-center lg:text-left text-base font-[500] leading-relaxed text-slate-500 sm:text-lg lg:mx-0">
                                {data.subtitle}
                            </p>
                        </Reveal>

                        <Reveal delay={0.3}>
                            <div className="mt-8 flex w-full max-w-full flex-wrap items-center justify-center gap-3 sm:gap-4 lg:justify-start">
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
                                            className="h-[44px] w-auto sm:h-[50px] md:h-[56px] lg:h-[60px] transition-transform duration-300 hover:scale-[1.03]"
                                        />
                                    </Link>
                                ))}
                            </div>
                        </Reveal>
                        {/* 4. Enhanced Feature Grid (The "Red Box" Fix) */}
                        <Reveal delay={0.4}>
                            <div className="mt-14 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
                                {data.whyChoose?.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="group flex items-center gap-4 rounded-[2rem] border border-slate-100 bg-white p-2 pr-6 transition-all duration-300  hover:bg-blue-50/30 hover:shadow-sm"
                                    >
                                        <div className="flex xl:h-12 h-8 w-8 xl:w-12 shrink-0 items-center justify-center rounded-full 
                                                bg-slate-50 text-blue-900 
                                                transition-all duration-500 ease-out 
                                                group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-blue-800 
                                                group-hover:text-white shadow-inner">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[15px] font-bold text-slate-900">{item.title}</span>
                                            <span className="text-[12px] font-medium text-slate-400 group-hover:text-slate-500">{item.description}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>

                    {/* RIGHT — contained so floats never cause page scroll */}
                    <div className="relative flex min-w-0 w-full max-w-full justify-center lg:col-span-5 lg:justify-end order-1 lg:order-2 mt-28 lg:mt-0">
                        <div className="relative w-full max-w-[min(100%,340px)] sm:max-w-[300px] md:max-w-[320px]">
                            <Reveal delay={0.2} className="relative z-20 block">
                                <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[300px] lg:mx-0 lg:max-w-[300px] xl:max-w-[320px] lg:rotate-3 xl:rotate-6 transition-transform duration-700 hover:rotate-0">

                                    {/* Main Phone Image */}
                                    {/* Mobile Image (below md) */}
                                    <div className="block lg:hidden mb-8 sm:mb-32">
                                        <Image
                                            src="/images/mobile_image.png"
                                            alt="driving app"
                                            width={550}
                                            height={540}
                                            className="h-auto w-full max-w-[550px] transition duration-300 hover:scale-[1.03]"
                                        />
                                    </div>

                                    {/* Desktop / Tablet Image (md and above) */}
                                    <div className="hidden lg:block">
                                        <div className="overflow-hidden rounded-[2.5rem] border-[8px] border-slate-900 bg-white shadow-[0_40px_80px_-24px_rgba(0,0,0,0.28)] sm:rounded-[3rem] sm:border-[10px]">
                                            <Image
                                                src={data.heroImage.src}
                                                alt={data.heroImage.alt}
                                                width={550}
                                                height={540}
                                                className="h-auto w-full max-w-[650px] transition duration-300 hover:scale-[1.03]"
                                                priority
                                            />
                                        </div>
                                    </div>

                                    {/* Floating Card 1: Lesson Status */}
                                    <div className="absolute -left-2 top-[18%] z-30 hidden xl:block 2xl:-left-8 animate-bounce-slow">
                                        <div className="max-w-[200px] rounded-2xl bg-white p-3 shadow-xl ring-1 ring-slate-900/5 2xl:max-w-none 2xl:p-4">
                                            <div className="flex items-center gap-2 2xl:gap-3">
                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm text-green-600 2xl:h-10 2xl:w-10">
                                                    ✓
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-[10px] font-bold uppercase text-slate-400 2xl:text-xs">Lesson Status</p>
                                                    <p className="text-xs font-bold text-slate-900 2xl:text-sm">Parallel Park Mastered</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Floating Card 2: Next Lesson */}
                                    <div className="absolute -right-2 bottom-[28%] z-30 hidden xl:block 2xl:-right-6 animate-bounce-slower">
                                        <div className="max-w-[180px] rounded-2xl bg-gradient-to-r from-[var(--brand)] to-[var(--accent)] p-3 text-white shadow-xl 2xl:max-w-none 2xl:p-4">
                                            <p className="text-[10px] font-medium opacity-90 2xl:text-xs">Next Lesson</p>
                                            <p className="text-sm font-bold italic 2xl:text-lg">Today @ 4:30 PM</p>
                                            <div className="mt-2 h-1.5 w-full rounded-full bg-white/20 overflow-hidden">
                                                {/* Animated progress bar */}
                                                <div className="h-full w-2/3 rounded-full bg-[var(--accent)] animate-pulse" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute left-1/2 top-1/2 -z-10">

                                    {/* Innermost Ring */}
                                    <div className="
  absolute 
  h-[180px] w-[180px] 
  sm:h-[250px] sm:w-[250px] 
  md:h-[350px] md:w-[350px] 
  -translate-x-1/2 -translate-y-1/2 
  rounded-full border border-[var(--accent)]/20 
  animate-ping-slow
" />

                                    {/* Middle Ring */}
                                    <div className="
  absolute 
  h-[300px] w-[300px] 
  sm:h-[350px] sm:w-[350px] 
  md:h-[500px] md:w-[500px] 
  -translate-x-1/2 -translate-y-1/2 
  rounded-full border border-[var(--brand)]/20 
  animate-pulse
" />

                                    {/* Outer Ring */}
                                    <div className="
  absolute 
  h-[350px] w-[350px] 
  sm:h-[480px] sm:w-[480px] 
  md:h-[650px] md:w-[650px] 
  -translate-x-1/2 -translate-y-1/2 
  rounded-full border border-dashed border-[var(--brand-light)]/30 
  animate-spin-slower
" />

                                    {/* Glow Dots */}
                                    <div className="absolute -top-[120px] sm:-top-[180px] md:-top-[250px] left-0 h-2 w-2 rounded-full bg-[var(--accent)]/60 blur-sm" />
                                    <div className="absolute top-[120px] sm:top-[180px] md:top-[250px] left-[60px] sm:left-[80px] md:left-[100px] h-3 w-3 rounded-full bg-[var(--brand-light)]/40 blur-sm" />

                                </div>

                            </Reveal>
                        </div>
                    </div>

                </div>
            </Container>
        </section>
    );
}
