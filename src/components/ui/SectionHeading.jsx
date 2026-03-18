import { FiHelpCircle } from "react-icons/fi";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  icon, // NEW
}) {
  const a = align === "left" ? "text-left" : "text-center";
  const Icon = icon || FiHelpCircle; // default icon

  return (
    <header className={`${a} md:px-0 px-2`}>
      {eyebrow ? (
        <span className="inline-flex items-center gap-2 rounded-full bg-[#EEF1F6] px-4 py-2 text-[15px] font-medium text-[#262626] border border-[#E3E6EC]">
          {/* <Icon className="text-[18px] text-[#262626]" /> */}
          {eyebrow}
        </span>
      ) : null}

      <h2 className="mt-4 md:text-[40px] lg:text-[56px] text-[30px] font-lexend font-[700] text-slate-900 md:leading-[45px] lg:leading-[67px] leading-[36px] ">
        {title}
      </h2>

      {description ? (
        <p className="mt-5 text-[18px] font-sans text-slate-500 max-w-2xl mx-auto leading-relaxed mx-auto max-w-xl">
          {description}
        </p>
      ) : null}
    </header>
  );
}