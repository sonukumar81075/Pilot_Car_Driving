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
        <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-900 border border-blue-100">
          {eyebrow}
        </span>
      ) : null}

      <h2 className="heading-primary mt-4 text-3xl font-bold md:text-4xl lg:text-[56px] font-lexend leading-9 md:leading-[45px] lg:leading-[67px]">
        {title}
      </h2>

      {description ? (
        <p className="sm:mt-5 mt-2 text-lg text-[#1e3a8a] max-w-2xl mx-auto leading-relaxed font-sans">
          {description}
        </p>
      ) : null}
    </header>
  );
}