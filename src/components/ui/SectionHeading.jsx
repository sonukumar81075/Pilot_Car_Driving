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
        <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-800 border border-slate-200">
          {eyebrow}
        </span>
      ) : null}

      <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl lg:text-[56px] font-lexend leading-9 md:leading-[45px] lg:leading-[67px] tracking-tight">
        {title}
      </h2>

      {description ? (
        <p className="mt-5 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed font-sans">
          {description}
        </p>
      ) : null}
    </header>
  );
}