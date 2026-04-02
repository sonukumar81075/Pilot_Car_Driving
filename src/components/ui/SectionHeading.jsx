function renderHighlightedTitle(title, highlightText) {
  const text = String(title || "");
  const highlight = String(highlightText || "").trim();

  if (highlight) {
    const lowerTitle = text.toLowerCase();
    const lowerHighlight = highlight.toLowerCase();
    const start = lowerTitle.indexOf(lowerHighlight);

    if (start !== -1) {
      const end = start + highlight.length;
      const before = text.slice(0, start);
      const match = text.slice(start, end);
      const after = text.slice(end);

      return (
        <>
          {before}
          <span className="relative inline-block bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
            {match}
          </span>
          {after}
        </>
      );
    }
  }

  const words = text.split(" ");
  const lastWord = words.pop() || "";
  const leadingText = words.join(" ");

  return (
    <>
      {leadingText}
      {leadingText ? " " : ""}
      <span className="relative inline-block bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
        {lastWord}
      </span>
    </>
  );
}

export function SectionHeading({ eyebrow, title, description, align = "center", highlightText }) {
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

      <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-lexend font-black text-[#1e293b] uppercase sm:capitalize leading-tight pb-2">
        {renderHighlightedTitle(title, highlightText)}
      </h2>

      {description && (
        <div className={`sm:mt-4 mt-1 flex sm:items-center items-start gap-3 ${isRight ? "flex-row-reverse" : "flex-row"}`}>
          <div className="w-[3px] h-5 bg-blue-600 rounded-full flex-shrink-0 mt-1 sm:mt-0" />
          <p className="text-slate-500 text-sm sm:text-base md:text-lg font-medium tracking-tight">
            {description}
          </p>
        </div>
      )}
    </header>
  );
}