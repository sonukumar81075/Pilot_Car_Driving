"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

export function FaqAccordion({ items }) {
  const [open, setOpen] = useState(null);

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {items.map((item, idx) => {
        const isOpen = open === idx;

        return (
          <div
            key={item.question}
            className="rounded-2xl bg-[#EEF1F6] border border-slate-200"
          >
            {/* Question */}
            <button
              onClick={() => setOpen(isOpen ? null : idx)}
              className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left cursor-pointer"
            >
              <span className="text-[18px] sm:text-[20px] font-urbanist font-[700] text-[#1c1c1c] leading-[28px] flex-1">
                {item.question}
              </span>

              {/* Animated Icon Container */}
              <motion.span 
                animate={{ 
                  rotate: isOpen ? 180 : 0,
                  backgroundColor: isOpen ? "#64748b" : "#475569" 
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex items-center justify-center h-10 w-10 min-w-[40px] rounded-full text-white flex-shrink-0"
              >
                <FiChevronDown size={20} />
              </motion.span>
            </button>

            {/* Answer */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-slate-200 mx-6"></div>
                  <p className="px-6 pb-6 pt-6 text-[17px] font-sans font-[500] text-[#4c4c4c] leading-[26px]">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}