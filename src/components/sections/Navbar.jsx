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
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { HiMenuAlt3 } from "react-icons/hi";
import { RiApps2Line } from "react-icons/ri"; // Modern icon for mobile
import Image from "next/image";
import { getStoredAuthContext, normalizeLearnerProfile } from "@/lib/profile";

export function Navbar({ links }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const userMenuRef = useRef(null);

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

  useEffect(() => {
    const auth = getStoredAuthContext();
    if (!auth?.token || !auth?.learnerID) {
      setLoggedInUser(null);
      return;
    }

    const profile = normalizeLearnerProfile(auth.parsedUser);
    const displayName = profile.name || "Learner";
    const displayEmail = profile.email || "";
    const initials = displayName.trim().charAt(0).toUpperCase();

    setLoggedInUser({
      name: displayName,
      email: displayEmail,
      learnerID: auth.learnerID,
      initials: initials || "L",
    });
  }, [pathname]);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (!userMenuRef.current) return;
      if (!userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  function handleLogout() {
    sessionStorage.removeItem("pilotUser");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("profileCompleted");
    localStorage.removeItem("pilotUser");
    localStorage.removeItem("token");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("profileCompleted");
    document.cookie = "pilot_auth=; path=/; max-age=0; samesite=lax";
    setLoggedInUser(null);
    setIsUserMenuOpen(false);
    router.replace("/");
  }

  const leftLinks = links.slice(0, 2);
  const rightLinks = links.slice(2, 4);

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full font-lexend transition-all duration-300 ease-out ${visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
          }`}
      >
        {loggedInUser ? (
          <div ref={userMenuRef} className="pointer-events-none absolute right-4 top-[25px] hidden md:block">
            <button
              type="button"
              onClick={() => setIsUserMenuOpen((prev) => !prev)}
              className="pointer-events-auto block w-[248px] rounded-2xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70"
            >
              <div
                className={`flex items-center gap-2 border border-slate-200 bg-white/95 px-3 py-3 shadow-sm backdrop-blur transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md ${
                  isUserMenuOpen ? "rounded-t-2xl rounded-b-none" : "rounded-2xl"
                }`}
              >
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-[11px] font-bold text-blue-900">
                  {loggedInUser.initials}
                  <span className="absolute right-0.5 -top-1 flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                    <span className="relative inline-flex h-3 w-3 rounded-full border border-white bg-blue-600" />
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold leading-tight text-slate-900">
                    {loggedInUser.name}
                  </p>
                  <p className="truncate text-[11px] font-medium text-slate-500">{loggedInUser.email}</p>
                </div>
              </div>
            </button>
            <div
              className={`pointer-events-auto absolute right-0 top-[calc(100%-2px)] w-[248px] origin-top-right rounded-b-2xl border border-slate-200 border-t-0 bg-white p-1.5 shadow-lg transition-all duration-200  pb-2 ${
                isUserMenuOpen ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-1 scale-95 opacity-0"
              }`}
            >
              <button
                type="button"
                onClick={handleLogout}
                className="block w-full rounded-lg px-3 border border-red-100 py-2 text-center text-sm font-semibold text-red-600 transition hover:bg-red-100 bg-red-50"
              >
                Logout
              </button>
            </div>
          </div>
        ) : null}
        {/* --- DESKTOP VIEW --- */}
        <div className="hidden md:flex mt-6 px-4 w-full">
          <div className="relative mx-auto w-full max-w-[1280px]">
            <div className={`
                flex items-center justify-between gap-12 px-8 py-3 rounded-full border border-slate-100 bg-white/80 backdrop-blur-md transition-all duration-300
                ${scrolled ? "shadow-xl ring-1 ring-slate-900/5" : "shadow-sm"} mx-auto w-fit
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
        </div>

        {/* --- MOBILE VIEW (New Look) --- */}
        {/* <div className="md:hidden w-full px-4 pt-4">
              <div
                className={`
      flex items-center justify-between px-5 py-3 rounded-2xl 
      border border-white/25
      transition-all duration-300
      ${scrolled
                    ? "bg-white/25 backdrop-blur-xl shadow-[0_8px_30px_rgba(2,6,23,0.22)]"
                    : "bg-white/15 backdrop-blur-lg shadow-[0_4px_18px_rgba(2,6,23,0.16)]"}
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
                    className="p-2 rounded-xl bg-[#0f2f86]/90 text-white border border-white/20
        shadow-[0_4px_15px_rgba(15,47,134,0.35)]
        hover:scale-105 active:scale-90 transition-all duration-200"
                  >
                    <RiApps2Line size={20} />
                  </button>
                </div>
              </div>
            </div> */}
        <div className="md:hidden fixed top-0 left-0 w-full z-50 transition-all duration-300">
          <div
            className={`
              flex items-center justify-between px-7 py-4
              transition-all duration-500 ease-in-out
              ${scrolled
                ? "bg-white/80 backdrop-blur-md shadow-sm  "
                : "bg-transparent"}
    `}
          >
            <Link href="/" className="flex items-center group">
              <div className="relative">
                <Image
                  src="/images/logo/Pilot Logo.png"
                  alt="Logo"
                  width={85}
                  height={28}
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>

            <div className="flex items-center gap-3">
              {loggedInUser ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsUserMenuOpen((prev) => !prev)}
                    className={`relative flex h-10 w-10 items-center justify-center bg-blue-100 text-[14px] font-bold text-blue-900 shadow-sm ${
                      isUserMenuOpen ? "rounded-t-full rounded-b-none" : "rounded-full"
                    }`}
                    aria-label="Open user menu"
                  >
                    {loggedInUser.initials}
                    <span className="absolute right-0 top-0 flex h-3 w-3 rounded-full">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                      <span className="relative inline-flex h-3 w-3 rounded-full border border-white bg-blue-600" />
                    </span>
                  </button>
                  <div
                    className={`absolute right-0 top-[calc(100%-2px)] z-[110] w-[180px] origin-top-right rounded-b-2xl border border-slate-200 border-t-0 bg-white p-1.5 shadow-lg transition-all duration-200 ${
                      isUserMenuOpen ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-1 scale-95 opacity-0"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="block w-full rounded-lg px-3 py-2 text-center text-sm font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : null}
              <button
                onClick={() => setOpen(true)}
                className={`
          relative flex items-center justify-center p-2.5 rounded-full
          transition-all duration-300 active:scale-90
          ${scrolled
                    ? "btn-gradient btn-gradient-glow text-white shadow-lg shadow-[#0f2f86]/20"
                    : "bg-white text-[#0f2f86] shadow-md"}
        `}
              >
                <RiApps2Line size={22} />

              </button>
            </div>
          </div>
        </div>





      </header>

      {/* --- MOBILE BOTTOM DRAWER MENU --- */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <div className="fixed bottom-0 left-0 right-0 z-[101] rounded-t-[40px] bg-white p-8 pb-12 shadow-2xl">
            <div className="mx-auto mb-8 h-1.5 w-12 rounded-full bg-slate-200" />

            <div className="flex flex-col gap-4">
              {links.map((l) => (
                <div key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-4 transition-colors active:bg-blue-600"
                  >
                    <span className="font-sans text-[13px] font-[700] font-black uppercase leading-[20px] tracking-tight text-slate-900 group-active:text-white">
                      {l.label}
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-blue-600">
                      →
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            <button
              onClick={() => setOpen(false)}
              className="mt-8 w-full rounded-2xl bg-slate-100 py-4 font-bold text-slate-500"
            >
              Close Menu
            </button>
          </div>
        </>
      )}




    </>
  );
}
