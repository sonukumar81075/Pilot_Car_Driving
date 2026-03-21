"use client";

import Link from "next/link";
import { FaApple, FaWhatsapp } from "react-icons/fa6";

// Custom Google Play SVG for Multi-color effect
const GooglePlayIcon = () => (
    <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 6.15552V41.8445C7 43.1417 8.35857 43.9912 9.53125 43.435L42.5312 25.5905C43.8229 24.8913 43.8229 23.1087 42.5312 22.4095L9.53125 4.56502C8.35857 4.00877 7 4.85834 7 6.15552Z" fill="#1A73E8" />
        <path d="M7 6.15552V41.8445C7 42.4931 7.33964 43.0483 7.84821 43.3444L25.3393 25.8533L7 7.51403C7 7.06521 7.15179 6.64557 7.41964 6.30628L7 6.15552Z" fill="#00E676" />
        <path d="M42.5312 22.4095L33.6607 17.5881L25.3393 25.8533L33.6607 34.1185L42.5312 25.5905C43.8229 24.8913 43.8229 23.1087 42.5312 22.4095Z" fill="#FFD600" />
        <path d="M7.41964 6.30628L33.6607 17.5881L25.3393 25.8533L7.84821 43.3444C8.35857 43.9912 9.53125 43.435 9.53125 43.435L7.41964 6.30628Z" fill="#FF3D00" />
    </svg>
);

export default function MobileStickyBar() {
    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md md:hidden ">
            <div className="flex items-center justify-around px-2 py-3 rounded-[2rem] bg-[#f8fafc] shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100">

                {/* LEFT → Play Store (Multi-color) */}
                <Link
                    href="#"
                    className="flex flex-col items-center justify-center gap-1.5 px-4 py-2 rounded-2xl transition-all active:scale-95 hover:bg-slate-50"
                >
                    <GooglePlayIcon />
                    <span className="text-[9px] font-extrabold tracking-wider text-[#3c4043]">PLAY STORE</span>
                </Link>

                {/* CENTER → App Store (Classic Black/Silver) */}
                <Link
                    href="#"
                    className="flex flex-col items-center justify-center gap-1.5 px-5 py-2 rounded-2xl bg-slate-50 text-black transition-all active:scale-95 shadow-sm"
                >
                    <FaApple size={24} />
                    <span className="text-[9px] font-extrabold tracking-wider">APP STORE</span>
                </Link>

                {/* RIGHT → WhatsApp (Official Brand Green) */}
                <Link
                    href="https://wa.me/your-number"
                    target="_blank"
                    className="flex flex-col items-center justify-center gap-1.5 px-4 py-2 rounded-2xl transition-all active:scale-95 hover:bg-green-50"
                >
                    <FaWhatsapp size={24} color="#25D366" />
                    <span className="text-[9px] font-extrabold tracking-wider text-[#128C7E]">WHATSAPP</span>
                </Link>

            </div>
        </div>
    );
}



// second code 
// "use client";

// import Link from "next/link";
// import { FaApple, FaWhatsapp } from "react-icons/fa6";

// // Custom Google Play SVG
// const GooglePlayIcon = () => (
//     <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M7 6.15552V41.8445C7 43.1417 8.35857 43.9912 9.53125 43.435L42.5312 25.5905C43.8229 24.8913 43.8229 23.1087 42.5312 22.4095L9.53125 4.56502C8.35857 4.00877 7 4.85834 7 6.15552Z" fill="#1A73E8" />
//         <path d="M7 6.15552V41.8445C7 42.4931 7.33964 43.0483 7.84821 43.3444L25.3393 25.8533L7 7.51403C7 7.06521 7.15179 6.64557 7.41964 6.30628L7 6.15552Z" fill="#00E676" />
//         <path d="M42.5312 22.4095L33.6607 17.5881L25.3393 25.8533L33.6607 34.1185L42.5312 25.5905C43.8229 24.8913 43.8229 23.1087 42.5312 22.4095Z" fill="#FFD600" />
//         <path d="M7.41964 6.30628L33.6607 17.5881L25.3393 25.8533L7.84821 43.3444C8.35857 43.9912 9.53125 43.435 9.53125 43.435L7.41964 6.30628Z" fill="#FF3D00" />
//     </svg>
// );

// export default function MobileStickyBar() {
//     return (
//         // Fixed to bottom-0 and w-full with no translate-x needed since it spans the whole width
//         <div className="fixed bottom-0 left-0 right-0 z-50 w-full md:hidden">
//             {/* rounded-t-[2.5rem] for the top curves, rounded-b-none to stay flat at bottom */}
//             <div className="flex items-center justify-around px-4 pt-4 pb-6 rounded-t-[2.5rem] bg-white shadow-[0_-8px_30px_rgb(0,0,0,0.08)] border-t border-slate-100">

//                 {/* PLAY STORE */}
//                 <Link
//                     href="#"
//                     className="flex flex-col items-center justify-center  px-4  rounded-2xl transition-all active:scale-95"
//                 >
//                     <GooglePlayIcon />
//                 </Link>

//                 <Link
//                     href="#"
//                     className="flex flex-col items-center justify-center  px-6  rounded-2xl  text-black transition-all active:scale-95    "
//                 >
//                     <FaApple size={32} />
//                 </Link>

//                 {/* WHATSAPP */}
//                 <Link
//                     href="https://wa.me/your-number"
//                     target="_blank"
//                     className="flex flex-col items-center justify-center  px-4  rounded-2xl transition-all active:scale-95"
//                 >
//                     <FaWhatsapp size={32} color="#25D366" />
//                 </Link>

//             </div>
//         </div>
//     );
// }