import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { MdOutlineEmail } from "react-icons/md";

export function AppDownloadSection({ data }) {
  if (!data) return null;

  return (
    <section className="bg-white pb-10 pt-10 font-lexend lg:px-0 md:pt-32">
      <Container className="text-center">
        <div className="relative flex w-full justify-center pb-6">
          <Image
            src="/images/Gemini_Generated_Image_f92u21f92u21f92u.png"
            alt="driving app"
            width={550}
            height={540}
            className="h-auto w-full max-w-[550px] transition duration-300 hover:scale-[1.03]"
          />

          {/* Bottom Shadow Gradient */}
          <div className="absolute bottom-0 left-0 w-full h-52 bg-gradient-to-b from-transparent to-white opacity-100" />
        </div>

        <h2 className="md:text-[40px] lg:text-[56px] text-[30px] font-lexend font-[700] text-slate-900 md:leading-[45px] lg:leading-[67px] leading-[36px]">
          Skip searching for driving
          <br />
          schools near me.
        </h2>
        {/* Skip searching for driving schools near me. 
        Download the app and start learning to drive today */}
        <p className="mx-auto mt-4 max-w-2xl text-[16px] font-lexend font-[500] leading-[26px] text-[#666666] md:text-[18px] md:leading-[27px]">
          Download the app and start learning to drive today.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {data.appBadges?.map((b) => (
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
                className="h-auto w-[160px] transition-transform duration-300 hover:scale-105 sm:w-[200px] md:w-[220px]"
              />
            </Link>
          ))}
        </div>


      </Container>
    </section>
  );
}

