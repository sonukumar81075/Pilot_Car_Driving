"use client";

import Image from "next/image";
import OtpLogin from "@/components/OtpLogin";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-start justify-center bg-[#FFFFFF] px-0 pt-4 font-lexend sm:px-4 sm:py-12 md:items-center md:pt-0">
      <section className="mx-auto flex w-full max-w-5xl flex-col overflow-hidden border border-gray-100 bg-[#FFFFFF] shadow-[0_30px_100px_rgba(37,99,235,0.08)] sm:rounded-[40px] md:min-h-[450px] md:flex-row">
        <aside className="relative hidden w-full overflow-hidden bg-[#C1CCDB] md:flex md:w-1/2 md:items-center md:justify-center">
          <div className="absolute right-0 top-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100/50 blur-3xl" />
          <div className="relative flex h-full   w-full items-center justify-center ">
            <Image
              src="/images/pilot_generate_01.png"
              alt="Pilot Logo"
              width={420}
              height={420}
              priority
              className="h-auto w-full max-w-[450px] object-contain scale-150"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </aside>

        {/* Right Side: OTP Login */}
        <div className="flex w-full flex-col justify-center p-0 sm:p-8 md:min-h-[420px] md:w-1/2 md:p-10 lg:px-16">
          <OtpLogin />

        </div>
      </section>
    </main>
  );
}