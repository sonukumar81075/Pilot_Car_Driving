// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useEffect, useState, useRef } from "react";
// import { Icon } from "@/components/ui/Icon";
// import { motion, AnimatePresence } from "framer-motion";
// import { IoMdClose } from "react-icons/io";
// import Image from "next/image";
// import { HiMenuAlt3 } from "react-icons/hi";


// export function Navbar({ brand, links }) {
//   const pathname = usePathname();
//   const [open, setOpen] = useState(false);
//   const [visible, setVisible] = useState(true);
//   const [scrolled, setScrolled] = useState(false);
//   const lastScrollY = useRef(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;

//       if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
//         setVisible(false);
//       } else {
//         setVisible(true);
//       }

//       setScrolled(currentScrollY > 20);
//       lastScrollY.current = currentScrollY;
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const leftLinks = links.slice(0, 2);
//   const rightLinks = links.slice(2, 4);

//   return (
//     <>
//       <AnimatePresence>
//         {visible && (
//           <motion.header
//             initial={{ y: -100, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             exit={{ y: -100, opacity: 0 }}
//             transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
//             className="fixed md:top-6 top-0 z-50 w-full md:px-4 px-0 font-lexend"
//           >
//             <div
//               className={[
//                 "w-full md:w-auto mx-auto md:max-w-fit md:rounded-full border border-slate-100 bg-white/80 px-6 py-3 transition-all duration-300 backdrop-blur-md",
//                 scrolled
//                   ? "shadow-xl shadow-[rgba(248,239,29,0.08)] ring-1 ring-slate-900/5"
//                   : "md:shadow-sm shadow-none"
//               ].join(" ")}
//             >
//               <div className="flex items-center justify-between gap-8 md:gap-12 px-2">

//                 {/* Desktop Left Links */}
//                 <nav className="hidden items-center gap-6 md:flex">
//                   {leftLinks.map((l) => (
//                     <Link
//                       key={l.href}
//                       href={l.href}
//                       onClick={() => setOpen(false)}
//                       className="rounded-full px-4 py-2 text-[15px] font-[700] text-blue-900 transition-colors hover:bg-blue-50 hover:text-blue-900"
//                     >
//                       {l.label}
//                     </Link>
//                   ))}
//                 </nav>

//                 {/* Logo */}
//                 <Link
//                   href="/"
//                   // onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//                   className="cursor-pointer flex items-center"
//                 >
//                   <Image
//                     src="/images/logo/Pilot Logo.png"   // 👉 apna logo path
//                     alt="Pilot Logo"
//                     width={120}              // 👉 adjust size
//                     height={40}
//                     priority
//                     className="object-contain"
//                   />
//                 </Link>

//                 {/* Desktop Right Links */}
//                 <nav className="hidden items-center gap-6 md:flex">
//                   {rightLinks.map((l) => (
//                     <Link
//                       key={l.href}
//                       href={l.href}
//                       onClick={() => setOpen(false)}
//                       className="rounded-full px-4 py-2 text-[15px] font-[700] text-blue-900 transition-colors hover:bg-blue-50 hover:text-blue-900"
//                     >
//                       {l.label}
//                     </Link>
//                   ))}
//                 </nav>

//                 {/* Mobile Menu Button */}
//                 <button
//                   onClick={() => setOpen(true)}
//                   className="w-10 h-10 flex items-center md:hidden justify-center rounded-xl bg-slate-900 text-white shadow-lg active:scale-90 transition-transform"
//                   aria-label="Open menu"
//                 >
//                   <HiMenuAlt3 size={22} />
//                 </button>




//               </div>
//             </div>
//           </motion.header>
//         )}
//       </AnimatePresence>

//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.25 }}
//             className="fixed inset-0 z-[999] w-screen h-screen bg-slate-900/30 backdrop-blur-[2px] font-sans"
//             onClick={() => setOpen(false)}
//           >
//             <motion.aside
//               initial={{ x: -40, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               exit={{ x: -40, opacity: 0 }}
//               transition={{ duration: 0.25 }}
//               onClick={(e) => e.stopPropagation()}
//               className="relative   h-[calc(100%)] w-[78vw] max-w-[270px] overflow-hidden  bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 shadow-2xl"
//             >
//               <div className="absolute right-0 top-0 h-full w-12 rounded-l-2xl bg-white/95" />

//               <button
//                 onClick={() => setOpen(false)}
//                 className="absolute right-2 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-blue-900 bg-white text-slate-700"
//               >
//                 <IoMdClose className="h-5 w-5 text-blue-900" />
//               </button>

//               <div className="relative z-10 flex h-full flex-col p-4 pr-16">
//                 <Link
//                   href="/"
//                   onClick={() => setOpen(false)}
//                   className="mb-4 flex items-center gap-2 text-white"
//                 >
//                   <Image
//                     src="/images/logo/Pilot%20Logo%20White.png"
//                     alt="Pilot"
//                     width={90}
//                     height={28}
//                     className="object-contain"
//                   />
//                 </Link>

//                 <div className="mb-3 h-px bg-white/15" />

//                 <nav className="flex flex-col gap-1">
//                   {links.map((l) => (
//                     <Link
//                       key={l.href}
//                       href={l.href}
//                       onClick={() => setOpen(false)}
//                       className="rounded-lg px-2 py-2 text-[14px] font-[700] leading-[20px] text-white/80 transition hover:bg-white/10 hover:text-white"
//                     >
//                       {l.label}
//                     </Link>
//                   ))}
//                 </nav>
//               </div>
//             </motion.aside>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { HiMenuAlt3 } from "react-icons/hi";
import { RiApps2Line } from "react-icons/ri"; // Modern icon for mobile
import Image from "next/image";

export function Navbar({ links }) {
  const pathname = usePathname();
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
            className="fixed top-0 z-50 w-full font-lexend"
          >
            {/* --- DESKTOP VIEW --- */}
            <div className="hidden md:flex mt-6 px-4 justify-center w-full">
              <div className={`
                flex items-center justify-between gap-12 px-8 py-3 rounded-full border border-slate-100 bg-white/80 backdrop-blur-md transition-all duration-300
                ${scrolled ? "shadow-xl ring-1 ring-slate-900/5" : "shadow-sm"}
              `}>
                <nav className="flex items-center gap-6">
                  {leftLinks.map((l) => (
                    <Link key={l.href} href={l.href} className="px-4 py-2 text-[15px] font-bold text-blue-900 hover:text-blue-600 transition-colors">
                      {l.label}
                    </Link>
                  ))}
                </nav>

                <Link href="/" className="flex items-center">
                  <Image src="/images/logo/Pilot Logo.png" alt="Pilot Logo" width={110} height={35} priority />
                </Link>

                <nav className="flex items-center gap-6">
                  {rightLinks.map((l) => (
                    <Link key={l.href} href={l.href} className="px-4 py-2 text-[15px] font-bold text-blue-900 hover:text-blue-600 transition-colors">
                      {l.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>

            {/* --- MOBILE VIEW (New Look) --- */}
            <div className="md:hidden w-full px-4 pt-4">
              <div
                className={`
      flex items-center justify-between px-5 py-3 rounded-2xl 
      border border-transparent
      transition-all duration-300
      ${scrolled
                    ? "bg-white/90 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border-slate-200"
                    : "bg-white shadow-[0_4px_15px_rgba(0,0,0,0.05)]"}
    `}
              >
                <Link href="/">
                  <Image
                    src="/images/logo/Pilot Logo.png"
                    alt="Logo"
                    width={90}
                    height={30}
                    className="object-contain"
                  />
                </Link>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setOpen(true)}
                    className="p-2 bg-slate-900 text-white rounded-xl 
        shadow-[0_4px_15px_rgba(0,0,0,0.2)]
        hover:scale-105 active:scale-90 transition-all duration-200"
                  >
                    <RiApps2Line size={20} />
                  </button>
                </div>
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* --- MOBILE BOTTOM DRAWER MENU --- */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 z-[101] bg-white rounded-t-[40px] p-8 pb-12 shadow-2xl"
            >
              <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-8" />

              <div className="flex flex-col gap-4">
                {links.map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 group active:bg-blue-600 transition-colors"
                    >
                      <span className="text-sm font-black text-slate-900 group-active:text-white uppercase tracking-tight font-sans font-[700] leading-[20px]">
                        {l.label}
                      </span>
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-blue-600">
                        →
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <button
                onClick={() => setOpen(false)}
                className="mt-8 w-full py-4 bg-slate-100 text-slate-500 font-bold rounded-2xl"
              >
                Close Menu
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>




    </>
  );
}
