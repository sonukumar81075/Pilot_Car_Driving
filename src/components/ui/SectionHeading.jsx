export function SectionHeading({ eyebrow, title, description, align = "center" }) {
  const isLeft = align === "left";
  const isRight = align === "right";

  const alignmentClasses = isLeft 
    ? "items-start text-left" 
    : isRight 
    ? "items-end text-right" 
    : "items-center text-center mx-auto";

  return (
    <header className={`flex flex-col ${alignmentClasses} max-w-4xl w-full`}>
      {eyebrow && (
        <div className="flex items-center gap-2 mb-3">
          <span className="h-[1px] w-6 bg-blue-600" />
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">{eyebrow}</span>
        </div>
      )}

      <h2 className="text-4xl md:text-5xl lg:text-6xl font-lexend font-black text-[#1e293b] leading-tight pb-2">
        {title.split(' ').slice(0, -1).join(' ')} 
        <span className="relative inline-block italic ml-2 bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent px-2 -mr-2">
          {/* Added: 
            1. px-2: To give the italic letters space so they don't cut off.
            2. -mr-2: To offset the padding so the spacing looks natural.
            3. pb-2: On the H2 to prevent the bottom of the letters from cutting.
          */}
          {title.split(' ').pop()}
        </span>
      </h2>

      {description && (
        <div className={`mt-4 flex sm:items-center items-start gap-3 ${isRight ? "flex-row-reverse" : "flex-row"}`}>
          <div className="w-[3px] h-5 bg-blue-600 rounded-full flex-shrink-0 mt-1 sm:mt-0" />
          <p className="text-slate-500 text-lg font-medium tracking-tight">
            {description}
          </p>
        </div>
      )}
    </header>
  );
}