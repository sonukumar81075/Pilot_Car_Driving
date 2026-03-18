import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";

export function Footer({ data }) {
  return (
    <footer className="bg-white font-lexend border-t border-slate-100 mt-12">
      <Container className="py-16">
        {/* Top Section: Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {data.columns.map((col) => (
            <div key={col.title} className="flex flex-col">
              <h3 className="text-[14px] font-[500] text-[#999999] uppercase tracking-[2px] mb-6">
                {col.title}
              </h3>
              <ul className="space-y-4">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className={`text-[16px] font-[500] transition-colors hover:opacity-70 ${
                        l.href.startsWith("mailto:")
                          ? "text-[#1d4ed7] underline decoration-dotted underline-offset-4"
                          : "text-[#262626]"
                      }`}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section: Copyright & Socials */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8">
          {/* Copyright - Left Aligned in Design */}
          <div className="text-[16px] font-[600] text-[#666666] order-2 md:order-1 mt-6 md:mt-0">
            {data.legal}
          </div>

          {/* Social Icons - Right Aligned in Design */}
          <div className="flex flex-wrap justify-center gap-3 order-1 md:order-2">
            {data.social.map((s) => {
              let bg = "#334155";
              switch (s.icon) {
                case "linkedin": bg = "#0A66C2"; break;
                case "facebook": bg = "#1877F2"; break;
                case "instagram": bg = "linear-gradient(135deg,#F58529,#FEDA77,#DD2A7B,#8134AF,#515BD4)"; break;
                case "youtube": bg = "#FF0000"; break;
                case "pinterest": bg = "#E60023"; break;
                case "twitter": bg = "#000000"; break;
                case "mail": bg = "#3B82F6"; break;
              }

              const isMailto = s.href.startsWith("mailto:");
              const style = s.icon === "instagram" ? { backgroundImage: bg } : { backgroundColor: bg };
              const className = "grid h-10 w-10 place-items-center rounded-full text-white transition-transform hover:-translate-y-1 shadow-sm";

              return isMailto ? (
                <a key={s.label} href={s.href} className={className} style={style} aria-label={s.label}>
                  <Icon name={s.icon} className="h-5 w-5" />
                </a>
              ) : (
                <Link key={s.label} href={s.href} target="_blank" rel="noopener" className={className} style={style}>
                  <Icon name={s.icon} className="h-5 w-5" />
                </Link>
              );
            })}
          </div>
        </div>
      </Container>
    </footer>
  );
}