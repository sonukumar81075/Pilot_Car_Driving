"use client";

import Link from "next/link";
import { FaApple, FaWhatsapp } from "react-icons/fa6";

// ✅ Google Play SVG
const GooglePlayIcon = () => (
    <svg width="24" height="24" viewBox="0 0 48 48" fill="none">
        <path d="M7 6.15552V41.8445C7 43.1417 8.35857 43.9912 9.53125 43.435L42.5312 25.5905C43.8229 24.8913 43.8229 23.1087 42.5312 22.4095L9.53125 4.56502C8.35857 4.00877 7 4.85834 7 6.15552Z" fill="#1A73E8" />
        <path d="M7 6.15552V41.8445C7 42.4931 7.33964 43.0483 7.84821 43.3444L25.3393 25.8533L7 7.51403C7 7.06521 7.15179 6.64557 7.41964 6.30628L7 6.15552Z" fill="#00E676" />
        <path d="M42.5312 22.4095L33.6607 17.5881L25.3393 25.8533L33.6607 34.1185L42.5312 25.5905C43.8229 24.8913 43.8229 23.1087 42.5312 22.4095Z" fill="#FFD600" />
        <path d="M7.41964 6.30628L33.6607 17.5881L25.3393 25.8533L7.84821 43.3444C8.35857 43.9912 9.53125 43.435 9.53125 43.435L7.41964 6.30628Z" fill="#FF3D00" />
    </svg>
);

// ✅ DATA ARRAY
const actions = [
    {
        label: "PLAY STORE",
        href: "https://play.google.com/store/apps/details?id=com.pilot.pilotlearner&pcampaignid=web_share",
        icon: <GooglePlayIcon />,
        textColor: "text-[#3c4043]",
        hover: "hover:bg-slate-50",
    },
    {
        label: "APP STORE",
        href: "https://apps.apple.com/in/app/pilot-learner/id6756785250",
        icon: <FaApple size={24} />,
        textColor: "text-black",
        bg: "bg-slate-50",
    },
    {
        label: "WHATSAPP",
        href: "https://wa.me/+918065489040",
        icon: <FaWhatsapp size={24} color="#25D366" />,
        textColor: "text-[#128C7E]",
        hover: "hover:bg-green-50",
        target: "_blank",
    },
];

export default function MobileStickyBar() {
    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md md:hidden">
            <div className="flex items-center justify-around px-2 py-3 rounded-full bg-[#f8fafc] shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100">

                {actions.map((item, idx) => (
                    <Link
                        key={idx}
                        href={item.href}
                        target={item.target || "_self"}
                        className={`flex flex-col items-center justify-center gap-1.5 px-4 py-1.5 rounded-2xl transition-all active:scale-95 
            ${item.bg || ""} ${item.hover || ""}`}
                    >
                        {item.icon}
                        <span className={`text-[9px] font-extrabold tracking-wider ${item.textColor}`}>
                            {item.label}
                        </span>
                    </Link>
                ))}

            </div>
        </div>
    );
}
