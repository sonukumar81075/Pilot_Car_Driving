"use client";

import Image from "next/image";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-white px-4">
      <section className="mx-auto flex w-full max-w-lg flex-col items-center justify-center text-center">
        <div className="mb-6">
          <Image
            src="/images/404_image.png"
            alt="404 - Page not found"
            width={400} 
            height={320}
            priority
            className="h-auto w-[240px] sm:w-[400px] object-contain"
          />
        </div>

        <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">Page Not Found</h1>
        <p className="mt-2 text-sm font-medium text-slate-500 sm:text-base">
          The page you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="btn-gradient btn-gradient-glow mt-6 rounded-full px-6 py-2.5 text-sm font-bold text-white"
        >
          Go to Home
        </Link>
      </section>
    </main>
  );
}
