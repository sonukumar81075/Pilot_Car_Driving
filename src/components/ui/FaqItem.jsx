import { AnimatePresence, motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";


export function FaqItem({ item, isOpen, onClick }) {
    return (
        <div className="rounded-2xl bg-[#EEF1F6] border border-slate-200 ">

            {/* Question */}
            <button
                onClick={onClick}
                className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left cursor-pointer"
            >
                <span className="text-[14px] sm:text-[17px] font-[700] text-[#1c1c1c] leading-[22px] sm:leading-[28px] flex-1">
                    {item.question}
                </span>

                {/* Icon */}
                <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-center h-6 sm:h-10 w-6 sm:w-10 sm:min-w-[40px]  min-w-[20px] rounded-full border border-blue-800 text-blue-700 bg-white"
                >
                    <FiChevronDown className="sm:size-6 size-4" />
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

                        <p className="px-5 sm:px-6 pb-5 sm:pb-6 sm:pt-6 pt-3 text-[14px] sm:text-[17px] font-[500] text-[#4c4c4c] leading-[22px] sm:leading-[26px]">
                            {item.answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}