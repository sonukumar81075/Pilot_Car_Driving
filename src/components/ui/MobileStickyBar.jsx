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
        href: "https://wa.me/...",
        icon: <FaWhatsapp size={22} />,
        isExternal: true,
    },
];

export default function MobileStickyBar() {
    const pathname = usePathname();

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden px-0">
            {/* The Container with the specific UI curve and shadow */}
            <div className="bg-white border-t border-slate-50 px-2 pt-4 pb-8 flex items-center justify-around rounded-t-[35px] shadow-[0_-15px_50px_-12px_rgba(0,0,0,0.1)]">

                {navItems.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            target={item.isExternal ? "_blank" : "_self"}
                            className="flex flex-col items-center justify-center gap-1.5 min-w-[70px] transition-all active:scale-95"
                        >
                            {/* Icon Color Logic: Navy for Active, Muted Gray for others */}
                            <div className={`${isActive ? "text-[#1a237e]" : "text-[#94a3b8]"}`}>
                                {item.icon}
                            </div>

                            {/* Label: Bold, Uppercase, and specifically spaced */}
                            <span className={`text-[9px] font-black tracking-widest ${isActive ? "text-[#1a237e]" : "text-[#cbd5e1]"
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