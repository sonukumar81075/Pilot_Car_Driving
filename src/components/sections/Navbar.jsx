"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { Icon } from "@/components/ui/Icon";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";


export function Navbar({ brand, links }) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setScrolled(currentScrollY > 20);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const leftLinks = links.slice(0, 2);
  const rightLinks = links.slice(2, 4);

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="fixed md:top-6 top-0 z-50 w-full md:px-4 px-0 font-lexend"
          >
            <div
              className={[
                "w-full md:w-auto mx-auto md:max-w-fit md:rounded-full border border-slate-100 bg-white/80 px-6 py-3 transition-all duration-300 backdrop-blur-md",
                scrolled
                  ? "shadow-xl shadow-blue-500/5 ring-1 ring-slate-900/5"
                  : "md:shadow-sm shadow-none"
              ].join(" ")}
            >
              <div className="flex items-center justify-between gap-8 md:gap-12">

                {/* Desktop Left Links */}
                <nav className="hidden items-center gap-8 md:flex">
                  {leftLinks.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      className="text-[15px] font-semibold text-slate-600 transition-colors hover:text-blue-600"
                    >
                      {l.label}
                    </a>
                  ))}
                </nav>

                {/* Logo */}
                <span
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="text-3xl font-black tracking-tighter text-[#1d4ed7] cursor-pointer"
                >
                  {brand || "pilot"}
                </span>

                {/* Desktop Right Links */}
                <nav className="hidden items-center gap-8 md:flex">
                  {rightLinks.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      className="text-[15px] font-semibold text-slate-600 transition-colors hover:text-blue-600"
                    >
                      {l.label}
                    </a>
                  ))}
                </nav>

                {/* Mobile Menu Button */}
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="md:hidden flex items-center justify-center h-10 w-10 rounded-full bg-slate-700 text-white"
                  aria-label="Open menu"
                >
                  <Icon name="menu" className="h-5 w-5" />
                </button>

              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[999] w-screen h-screen bg-white font-lexend flex flex-col items-center pt-28"
          >

            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute right-6 top-6 flex items-center justify-center h-10 w-10 rounded-full border-2 border-blue-500 text-blue-500"
            >
              <IoMdClose className="h-6 w-6" />
            </button>

            {/* Logo */}
            <div className="absolute left-6 top-6 text-3xl font-black text-[#1d4ed7]">
              {brand}
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col items-center gap-8 text-lg font-semibold text-slate-700">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="hover:text-[#1d4ed7] transition"
                >
                  {l.label}
                </a>
              ))}
            </nav>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}