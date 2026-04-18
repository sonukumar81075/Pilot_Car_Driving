"use client";

import { usePathname } from "next/navigation";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { Navbar } from "@/components/sections/Navbar";
import { FooterShell } from "@/components/sections/FooterShell";
import MobileStickyBar from "@/components/ui/MobileStickyBar";

function isAuthOnlyRoute(pathname = "") {
  return pathname === "/login" || pathname === "/register" || pathname.startsWith("/login/") || pathname.startsWith("/register/");
}

export default function AppShell({ children, heroBrand, heroLinks, footer }) {
  const pathname = usePathname() || "";
  const hideGlobalChrome = isAuthOnlyRoute(pathname);

  if (hideGlobalChrome) {
    return (
      <div className="min-h-screen flex flex-col bg-[var(--brand-muted)]">
        <main className="flex-1 bg-white">{children}</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--brand-muted)]">
      <Navbar brand={heroBrand} links={heroLinks} />
      <main className="flex-1 bg-white">{children}</main>
      <FooterShell footer={footer} />
      <ScrollToTop />
      <MobileStickyBar />
    </div>
  );
}
