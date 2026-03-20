import { motion } from "framer-motion";

export function WhyChooseCard({ feature, idx }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="group relative flex flex-col justify-between items-center text-center 
              p-4 rounded-[1.5rem] bg-white border sm:border-slate-200/50 border-slate-200 
              h-full min-h-[140px]" // 👈 important
        >
            {/* TOP CONTENT */}
            <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-blue-900 mb-2">
                    <feature.icon strokeWidth={1.5} className="text-blue-900 size-6 md:size-8" />
                </div>

                <h3 className="text-sm sm:text-[20px]  font-semibold font-lexend text-slate-900">
                    {feature.title}
                </h3>
                <p className="text-slate-500 text-[14px] sm:text-[16px] font-lexend font-[500] sm:px-0 px-2">
                    {feature.description}
                </p>
            </div>

            {/* NUMBER */}
            <span className="absolute top-2 right-3 opacity-[0.05] text-3xl font-black">
                0{idx + 1}
            </span>
        </motion.div>
    );
}