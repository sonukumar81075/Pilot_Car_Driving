"use client";

import { usePathname } from "next/navigation";
import { AppDownloadSection } from "@/components/sections/AppDownloadSection";
import { Footer } from "@/components/sections/Footer";

export function FooterShell({ footer }) {
  const pathname = usePathname();
  const isPackageDetailsPage = /^\/packages\/[^/]+$/.test(pathname || "");

  return (
    <>
      {pathname === "/" && <AppDownloadSection data={footer.cta} />}
      {isPackageDetailsPage ? (
        <div className="hidden md:block">
          <Footer data={footer} />
        </div>
      ) : (
        <Footer data={footer} />
      )}
    </>
  );
}

