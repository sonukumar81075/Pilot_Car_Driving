"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTop() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShow(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    if (!show) return null;

    return (
        <button
            onClick={scrollTop}
            className="fixed bottom-6 right-6 z-[999] flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500 text-white shadow-lg   transition cursor-pointer animate-float"
            aria-label="Scroll to top"
        >
            <FaArrowUp className="w-4 h-4" />
        </button>
    );
}