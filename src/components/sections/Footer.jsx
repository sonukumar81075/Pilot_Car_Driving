import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";

export function Footer({ data }) {
  return (
    <footer className="relative w-full  h-screen overflow-hidden pt-6 border-t border-white/10 bg-gradient-to-b from-[#0b1f45] via-[#071633] to-[#020b1b] font-lexend">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-16 left-1/2 h-72 w-[46rem] -translate-x-1/2 rounded-full bg-[var(--brand)]/20 blur-3xl" />
      {/* <FooterCarAnimation /> */}

      <Container className="relative z-10 pb-24 pt-12 md:pb-28 md:pt-16">
        {/* Card style columns like reference */}
        <div className="grid grid-cols-1 gap-6 pb-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {data.columns.map((col) => (
            <div
              key={col.title}
              className="rounded-3xl  p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-sm"
            >
              <h3 className="text-[28px] font-semibold text-white">{col.title}</h3>
              <div className="mb-5 mt-2 h-[2px] w-24 rounded-full bg-gradient-to-r from-[var(--brand-light)] to-transparent" />

              <ul className="space-y-2.5">
                {col.links.map((l) => {
                  const isMailto = l.href.startsWith("mailto:");
                  const className = isMailto
                    ? "text-[15px] font-[500] text-[var(--brand-light)] underline decoration-dotted underline-offset-4 transition-colors hover:text-white"
                    : "text-[15px] font-[500] text-slate-200/90 transition-colors hover:text-[var(--brand-light)]";

                  return (
                    <li key={l.label}>
                      <Link href={l.href} className={className}>
                        {l.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Full-width divider */}
        {/* <div className="relative left-1/2 h-px w-screen -translate-x-1/2 bg-white/10" /> */}

        {/* Bottom row */}
        <div className="flex flex-col items-center justify-between gap-5 pb-10 pt-8 md:flex-row">
          <div className="flex items-center gap-3 self-center md:self-center">
            <Image
              src="/images/logo/Pilot Logo White.png"
              alt="Pilot logo"
              width={108}
              height={36}
              className="h-12 w-auto object-contain"
            />
          </div>

          <div className="text-[14px] font-[500] text-slate-400">{data.legal}</div>

          <div className="flex flex-wrap justify-center gap-3">
            {data.social.map((s) => {
              const isMailto = s.href.startsWith("mailto:");
              const className =
                "grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-slate-300 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[var(--brand-light)] hover:bg-[var(--brand)] hover:text-white";

              return isMailto ? (
                <a key={s.label} href={s.href} className={className} aria-label={s.label}>
                  <Icon name={s.icon} className="h-4 w-4" />
                </a>
              ) : (
                <Link key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className={className}>
                  <Icon name={s.icon} className="h-4 w-4" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Full-width divider */}
        <div className="relative left-1/2 h-px w-screen -translate-x-1/2 bg-white/10" />
      </Container>

      {/* Watermark visual at bottom like reference */}
      <div className="pointer-events-none absolute bottom-[60px] left-1/2 -translate-x-1/2 opacity-[0.05] z-0">
        <Image
          src="/images/logo/Pilot Logo White.png"
          alt=""
          width={1200}
          height={400}
          className="h-auto w-[1000px] md:w-[1200px] lg:w-[1400px] blur-[2px] scale-125"
          style={{
            transform: "perspective(1000px) rotateX(65deg) rotateZ(-10deg)",
          }}
        />
      </div>
    </footer>
  );
}