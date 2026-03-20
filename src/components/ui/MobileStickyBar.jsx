"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function MobileStickyBar() {
    return (
        <div className="fixed bottom-3 left-1/2 -translate-x-1/2   z-50 w-[92%] md:hidden">

            <div className="flex items-center justify-between px-8 py-2 rounded-full bg-white shadow-lg border border-slate-200">

                {/* LEFT → Play Store */}
                <Link href="#" className="flex items-center justify-center">
                    <Image
                        src="/images/121144.png"
                        alt="Play Store"
                        width={40}
                        height={40}
                        className="h-8 w-auto rounded-full"
                    />
                </Link>


                {/* CENTER → Pilot */}
                <div className="text-sm font-bold text-blue-700 tracking-wide">
                    <Link href="#" className="flex items-center justify-center">
                        <Image
                            src="/images/googleplay.png"
                            alt="Play Store"
                            width={40}
                            height={40}
                            className="h-8 w-auto"
                        />
                    </Link>
                </div>

                {/* RIGHT → WhatsApp */}
                <Link
                    href="https://wa.me/your-number"
                    target="_blank"
                    className="flex items-center justify-center bg-green-500 text-white rounded-full w-9 h-9 shadow-md"
                >
                    <MessageCircle size={18} />
                </Link>
            </div>
        </div>
    );
}