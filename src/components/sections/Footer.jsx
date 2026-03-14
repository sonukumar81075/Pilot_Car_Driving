import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { MdOutlineEmail } from "react-icons/md";
import Image from "next/image";

export function Footer({ data }) {
  return (
    <footer className="md:pt-32 pt-10 bg-[#FFFFFF] font-lexend lg:px-0 px-4 ">

      {/* CTA */}
      <Container className="  md:pb-16 pb-12 text-center">

        <div className="relative flex justify-center w-full md:pb-6">
          <Image
            src="/images/Gemini_Generated_Image_f92u21f92u21f92u.png"
            alt="driving app"
            width={550}
            height={54}
            className="hover:scale-105 transition duration-300"
          />

          {/* Bottom Shadow Gradient */}
          <div className="absolute bottom-0 left-0 w-full h-52 bg-gradient-to-b from-transparent to-white opacity-100"></div>
        </div>
        <h2 className="md:text-[40px] lg:text-[56px] text-[30px] font-lexend font-[700] text-slate-900 md:leading-[45px] lg:leading-[67px] leading-[36px]">
          Master Car Driving the Smart Way.
          <br />
          Learn with Pilot.
        </h2>

        <p className="mt-4 text-[18px] font-lexend font-[500] leading-[27px] text-[#666666]">
          Professional instructors, flexible lessons, and real-road training to help you become a confident driver.
        </p>

        <div className="flex flex-row justify-center items-center gap-4 mt-8">
          {data.cta.appBadges.map((b) => (
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
                className="w-[170px] sm:w-[200px] md:w-[220px] h-auto transition-transform duration-300 hover:scale-105"
              />
            </Link>
          ))}
        </div>

        {/* Email */}
        <div className="md:mt-20 mt-12">
          <p className="text-[16px] font-lexend font-[500] leading-[24px] text-[#333333]">Feel free to reach us at:</p>


          <div className="inline-flex items-center gap-2 mt-3 px-5 py-2 rounded-full border border-slate-200 bg-[#EEF1F6]">

            <MdOutlineEmail className="text-[26px] text-[#262626]" />

            <p className="text-[18px] font-lexend font-[500] leading-[27px] text-[#262626] border-l border-slate-200 ">
              help@withpilot.com
            </p>

          </div>
        </div>
      </Container>


      {/* Footer Links */}
      <Container className="md:py-14 py-10  border-t border-slate-200">
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
        <div className="  text-[18px] font-lexend font-[500] leading-[27px] text-[#666666] text-right ">
          {data.legal}
        </div>
      </Container>

    </footer>
  );
}