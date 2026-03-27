"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiHome } from "react-icons/hi2";
import { FaWhatsapp, FaApple, FaGooglePlay } from "react-icons/fa6";

// ✅ DATA ARRAY
const navItems = [
    {
        label: "HOME",
        href: "/",
        icon: <HiHome size={22} />,
        isHome: true, // Marker for scroll-to-top logic
    },
    {
        label: "PLAY STORE",
        href: "https://play.google.com/store/apps/details?id=com.pilot.pilotlearner&pcampaignid=web_share",
        icon: <FaGooglePlay size={20} />,
        isExternal: true,
    },
    {
        label: "APP STORE",
        href: "https://apps.apple.com/in/app/pilot-learner/id6756785250",
        icon: <FaApple size={22} />,
        isExternal: true,
    },
    {
        label: "WHATSAPP",
        href: "https://wa.me/+918065489040",
        icon: <FaWhatsapp size={22} />,
        isExternal: true,
    },
];

export default function MobileStickyBar() {
    const pathname = usePathname();

    const handleHomeClick = (e, href, isHome) => {
        // If it's the home button and we're already home, just scroll up
        if (isHome && pathname === href) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <div className="fixed -bottom-0 left-0 right-0 z-50 md:hidden">
            {/* Main Nav Container */}
            <div className="bg-white border-t border-slate-100 px-2 pt-3 pb-8 flex items-center justify-around rounded-t-[30px] shadow-[0_-10px_30px_rgba(0,0,0,0.08)]">

                {navItems.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            target={item.isExternal ? "_blank" : "_self"}
                            onClick={(e) => handleHomeClick(e, item.href, item.isHome)}
                            className="flex flex-col items-center justify-center gap-1.5 min-w-[75px] transition-all active:scale-90"
                        >
                            {/* Icon Styling */}
                            <div className={`${isActive ? "text-[#1e3a8a]" : "text-[#94a3b8] opacity-80"}`}>
                                {item.icon}
                            </div>

                            {/* Label Styling - matching your screenshot's faded gray vs dark blue */}
                            <span className={`text-[9px] font-black tracking-widest ${isActive ? "text-[#1e3a8a]" : "text-[#cbd5e1]"
                                }`}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}

            </div>
        </div>
    );
}
