import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { MdOutlineEmail } from "react-icons/md";

export function Footer({ data }) {
  return (
    <footer className="  bg-[#FFFFFF] font-lexend lg:px-0 px-4">
      {/* Footer Links */}
      <div className="md:my-20 my-12 mx-auto text-center">
        <p className="text-[16px] font-lexend font-[500] leading-[24px] text-[#333333]">
          Feel free to reach us at:
        </p>

        <div className="inline-flex items-center gap-2 mt-3 px-5 py-2 rounded-full border border-slate-200 bg-[#EEF1F6]">
          <MdOutlineEmail className="text-[26px] text-[#262626]" />

          <p className="text-[18px] font-lexend font-[500] leading-[27px] text-[#262626] border-l border-slate-200 ">
            help@withpilot.com
          </p>
        </div>
      </div>
      <Container className="md:py-14 py-10 border-t border-slate-200">

        <div className="grid md:grid-cols-4 gap-12 items-start">

          {/* Columns */}
          <div className=" flex flex-col justify-between gap-10 md:flex-row md:col-span-3">
            {data.columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-[14px] font-lexend font-[400] leading-[17px] text-[#666666a1] uppercase tracking-[3px]">
                  {col.title}
                </h3>

                <ul className="mt-4 space-y-3 text-sm text-slate-700">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className={`text-[18px] font-lexend font-[500] leading-[27px]   ${l.href.startsWith("mailto:")
                          ? "text-[#1d4ed7] underline decoration-dotted underline-offset-4 "
                          : "text-[#333333]"
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

          {/* Social */}
          <div className="flex md:justify-end gap-3">
            {data.social.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid h-11 w-11 place-items-center rounded-full bg-[#334155] text-white transition-all duration-300 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1"
              >
                <Icon
                  name={s.icon}
                  className="h-[22px] w-[22px] transition-transform duration-300 group-hover:scale-110"
                />
              </Link>
            ))}
          </div>

        </div>

        {/* Copyright */}
        <div className="text-[18px] font-lexend font-[500] leading-[27px] text-[#666666] text-right">
          {data.legal}
        </div>
      </Container>

    </footer>
  );
}