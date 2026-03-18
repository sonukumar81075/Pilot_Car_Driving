import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { MdOutlineEmail } from "react-icons/md";

export function AppDownloadSection({ data }) {
  if (!data) return null;

  return (
    <section className="md:pt-32 pt-10 bg-[#FFFFFF] pb-10 font-lexend lg:px-0 px-4">
      <Container className="  text-center">
        <div className="relative flex justify-center w-full md:pb-6">
          <Image
            src="/images/Gemini_Generated_Image_f92u21f92u21f92u.png"
            alt="driving app"
            width={550}
            height={540}
            className="hover:scale-105 transition duration-300"
          />

          {/* Bottom Shadow Gradient */}
          <div className="absolute bottom-0 left-0 w-full h-52 bg-gradient-to-b from-transparent to-white opacity-100" />
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
                className="w-[170px] sm:w-[200px] md:w-[220px] h-auto transition-transform duration-300 hover:scale-105"
              />
            </Link>
          ))}
        </div>


      </Container>
    </section>
  );
}

