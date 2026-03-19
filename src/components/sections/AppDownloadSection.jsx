import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { MdOutlineEmail } from "react-icons/md";
import { SectionHeading } from "../ui/SectionHeading";

export function AppDownloadSection({ data }) {
  if (!data) return null;

  return (
    <section className="pb-3 pt-10 font-lexend lg:px-0 md:pt-24 md:pb-4">
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
        <div className="mt-6 max-w-4xl mx-auto">
          <SectionHeading
            // eyebrow="Get Started"
            title="Skip searching for driving schools near me."
            description="Download the app and start learning to drive today."
          />
        </div> 

        <div className="mt-8 pb-16 flex flex-wrap items-center justify-center gap-4">
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

