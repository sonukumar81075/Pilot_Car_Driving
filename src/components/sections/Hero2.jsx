import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import Link from "next/link";

export function Hero2({ data }) {
    return (
        <section className="relative overflow-x-clip bg-slate-50 pb-16 pt-20 font-lexend md:pb-20 md:pt-28 lg:pb-28 lg:pt-28 xl:pb-40 xl:pt-36">
            {/* Background — no horizontal bleed */}
            <div
                className="pointer-events-none absolute right-0 top-0 hidden h-full w-[min(55vw,720px)] bg-[var(--brand)]/6 lg:block"
                style={{ clipPath: "polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
            />

            <Container className="relative z-10 w-full max-w-[min(100%,1440px)] px-4 md:px-6 lg:px-8 xl:px-10">
                <div className="mx-auto grid min-w-0 max-w-full grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-16">
                    {/* LEFT */}
                    <div className="min-w-0 max-w-full text-center lg:col-span-7 lg:text-left flex flex-col items-center lg:items-start">
                        <Reveal delay={0.1}>
                            <h1 className="mt-4 max-w-[22ch] text-balance text-3xl font-[700] tracking-tight text-slate-900 sm:max-w-none sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl">
                                The Smarter Way to Learn
                                <span className="bg-gradient-to-r from-[#2563eb] to-[#06b6d4] bg-clip-text text-transparent">
                                    & Drive and Get Licensed.
                                </span>
                            </h1>
                        </Reveal>

                        <Reveal delay={0.2}>
                            <p className="mx-auto mt-5 max-w-xl text-base font-[500] leading-relaxed text-[#666666] sm:text-[17px] sm:leading-[28px] lg:mx-0 lg:text-[18px] lg:leading-[30px]">
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

                        <Reveal delay={0.4}>
                            <div className="mt-8 w-full max-w-full border-t border-slate-200/80 pt-8 text-left">
                                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-8">
                                    {data.whyChoose?.map((item, idx) => (
                                        <div key={idx} className="flex min-w-0 gap-3">
                                            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                                                <svg
                                                    width="14"
                                                    height="14"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="3.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    aria-hidden
                                                >
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-[15px] font-bold leading-snug text-slate-900 sm:text-[16px]">
                                                    {item.title}
                                                </p>
                                                <p className="mt-1 text-xs font-medium leading-snug text-slate-500 sm:text-[13px]">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    {/* RIGHT — contained so floats never cause page scroll */}
                    <div className="relative flex min-w-0 w-full max-w-full justify-center lg:col-span-5 lg:justify-end">
                        <div className="relative w-full max-w-[min(100%,340px)] sm:max-w-[300px] md:max-w-[320px]">
                            <Reveal delay={0.2} className="relative z-20 block">
                                <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[300px] lg:mx-0 lg:max-w-[300px] xl:max-w-[320px] lg:rotate-3 xl:rotate-6 transition-transform duration-700 hover:rotate-0">

                                    {/* Main Phone Image */}
                                    <div className="overflow-hidden rounded-[2.5rem] border-[8px] border-slate-900 bg-white shadow-[0_40px_80px_-24px_rgba(0,0,0,0.28)] sm:rounded-[3rem] sm:border-[10px]">
                                        <Image
                                            src={data.heroImage.src}
                                            alt={data.heroImage.alt}
                                            width={320}
                                            height={640}
                                            className="h-auto w-full"
                                            priority
                                        />
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
                                        <div className="max-w-[180px] rounded-2xl bg-slate-900 p-3 text-white shadow-xl 2xl:max-w-none 2xl:p-4">
                                            <p className="text-[10px] font-medium opacity-90 2xl:text-xs">Next Lesson</p>
                                            <p className="text-sm font-bold italic 2xl:text-lg">Today @ 4:30 PM</p>
                                            <div className="mt-2 h-1.5 w-full rounded-full bg-white/20 overflow-hidden">
                                                {/* Animated progress bar */}
                                                <div className="h-full w-2/3 rounded-full bg-blue-500 animate-pulse" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* --- ANIMATED DECORATIVE RINGS --- */}
                                <div className="absolute left-1/2 top-1/2 -z-10 h-0 w-0">
                                    {/* Innermost Ring */}
                                    <div className="absolute h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-yellow-500/20 animate-ping-slow" />

                                    {/* Middle Ring */}
                                    <div className="absolute h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/20 animate-pulse" />

                                    {/* Outermost Ring (Slow Rotation) */}
                                    <div className="absolute h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-blue-300/20 animate-spin-slower" />

                                    {/* Small Glow Dots on the rings */}
                                    <div className="absolute -top-[250px] left-0 h-2 w-2 rounded-full bg-blue-400/60 blur-sm" />
                                    <div className="absolute top-[250px] left-[100px] h-3 w-3 rounded-full bg-blue-300/30 blur-sm" />
                                </div>

                            </Reveal>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
