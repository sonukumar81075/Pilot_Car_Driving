import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { MdOutlineEmail } from "react-icons/md";
import { SectionHeading } from "../ui/SectionHeading";

export function AppDownloadSection({ data }) {
  if (!data) return null;

  return (
    <section className="pb-3 pt-8 sm:pt-10 font-lexend lg:px-0 md:pt-24  bg-gradient-to-b from-[var(--brand-muted)] to-white">
      <Container className="text-center ">
        <div className="relative flex w-full justify-center  ">
          {/* <Image
            src="/images/Group 1707480911.png"
            alt="driving app"
            width={550}
            height={540}
            className="h-auto w-full max-w-[750px] transition duration-300 hover:scale-[1.03]"
          /> */}

          <Image
            src="/images/Group 1707480911.png"
            alt="driving app"
            width={1200}
            height={1200}
            quality={100}
            className="h-auto object-contain w-full max-w-[800px] transition duration-300 hover:scale-[1.03]"
          />

        </div>
        <div className=" max-w-4xl mx-auto -mt-0 sm:-mt-6">
          <SectionHeading
            // eyebrow="Get Started"
            title="Stop searching for driving schools near me."
            highlightText="driving schools near me"
            description="Download the app and start learning to drive today."
          />
        </div>

        <div className="mt-6 sm:mt-8 pb-14 sm:pb-16 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
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
                className="h-auto w-[140px] sm:w-[200px] md:w-[220px] transition-transform duration-300 hover:scale-105"
              />
            </Link>
          ))}
        </div>


      </Container>
    </section>
  );
}

