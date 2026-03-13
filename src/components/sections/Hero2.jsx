import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import Link from "next/link";

export function Hero2({ data }) {
    return (
        <section className="relative overflow-hidden bg-slate-50 pt-20 md:pt-24 pb-20 lg:pt-32 lg:pb-40 font-lexend   ">

            {/* Background Shape */}
            <div
                className="absolute right-0 top-0 h-full w-1/2 bg-blue-600/5 hidden lg:block"
                style={{ clipPath: "polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
            />

            <Container className="relative z-10 mx-auto px-4 md:px-6 max-w-[1440px] w-full    lg:px-12 xl:px-0">

                <div className="grid items-center gap-16 lg:grid-cols-12">

                    {/* LEFT CONTENT */}
                    <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start">

                        {/* Heading */}
                        <Reveal delay={0.1}>
                            <h1 className="mt-6 text-4xl font-[700] tracking-tight text-slate-900 sm:text-5xl xl:text-7xl">
                                The smart way to <br />
                                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                                    Master the Road.
                                </span>
                            </h1>
                        </Reveal>

                        {/* Subtitle */}
                        <Reveal delay={0.2}>
                            <p className="mt-6 max-w-xl text-[18px] font-sans font-[500] leading-[30px] text-[#666666]  mx-auto lg:mx-0">
                                {data.subtitle}
                            </p>
                        </Reveal>

                        {/* CTA Buttons */}
                        <Reveal delay={0.3}>
                            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 mt-8">

                                {/* Desktop Button */}
                                <Link href="#how-it-works" className="xl:block hidden">
                                    <button className="bg-blue-400 hover:bg-blue-500 text-white rounded-2xl h-[56px] px-8 text-lg shadow-xl cursor-pointer shadow-blue-200   hidden md:flex items-center">
                                        {data.primaryCta.label}
                                    </button>
                                </Link>

                                {/* App Badges */}
                                <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4">
                                    {data?.appBadges?.map((b) => (
                                        <Link
                                            key={b.label}
                                            href={b.href}
                                            target="_blank"
                                            className="flex items-center justify-center"
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
                                                className="h-[50px] md:h-[60px] w-auto transition-transform duration-300 hover:scale-105"
                                            />
                                        </Link>
                                    ))}
                                </div>

                            </div>
                        </Reveal>


                        <Reveal delay={0.4}>
                            <div className="mt-12 flex items-center gap-8 border-t border-slate-200 pt-8">
                                {data.highlights.slice(0, 2).map((h) => (
                                    <div key={h.title} className="pr-6">
                                        <p className="text-[24px] font-[700] text-slate-900 font-sans">{h.title.split(' ')[0]}</p>
                                        <p className="text-[16px] text-slate-500 font-[500] font-sans">{h.description.split(',')[0]}</p>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>

                    {/* RIGHT PHONE */}
                    <div className="relative lg:col-span-5 flex justify-center">

                        <Reveal delay={0.2} className="relative z-20">

                            <div className="relative mx-auto w-[260px] sm:w-[280px] xl:w-[320px] transform lg:rotate-6 hover:rotate-0 transition-transform duration-700">

                                {/* Phone */}
                                <div className="overflow-hidden rounded-[3rem] border-[10px] border-slate-900 bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)]">
                                    <Image
                                        src={data.heroImage.src}
                                        alt={data.heroImage.alt}
                                        width={320}
                                        height={640}
                                        className="h-auto w-full"
                                    />
                                </div>

                                {/* Floating Card 1 */}
                                <div className="absolute -left-16 top-20 hidden lg:block animate-bounce-slow">
                                    <div className="rounded-2xl bg-white p-4 shadow-xl ring-1 ring-slate-900/5">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                                                ✓
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-400 uppercase">
                                                    Lesson Status
                                                </p>
                                                <p className="text-sm font-bold text-slate-900">
                                                    Parallel Park Mastered
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Card 2 */}
                                <div className="absolute -right-20 bottom-32 hidden lg:block animate-bounce-slower">
                                    <div className="rounded-2xl bg-blue-600 p-4 shadow-xl text-white">
                                        <p className="text-xs font-medium opacity-80">
                                            Next Lesson
                                        </p>
                                        <p className="text-lg font-bold italic">
                                            Today @ 4:30 PM
                                        </p>
                                        <div className="mt-2 h-1.5 w-full rounded-full bg-white/20">
                                            <div className="h-full w-2/3 rounded-full bg-white" />
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* Decorative Circles */}
                            <div className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-100" />
                            <div className="absolute left-1/2 top-1/2 -z-10 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-50/50" />

                        </Reveal>

                    </div>

                </div>
            </Container>
        </section>
    );
}