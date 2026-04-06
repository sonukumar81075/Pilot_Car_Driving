"use client";

export function AddonItem({ addon, checked, onToggle }) {
  const finalPrice = Number(addon?.price || 0);
  const basePrice = Number(addon?.base_price || 0);
  const offAmount = Math.max(basePrice - finalPrice, 0);
  const hasDiscount = offAmount > 0;

  return (
    <label
      className={[
        "font-sans group flex cursor-pointer items-center gap-3 rounded-xl sm:rounded-2xl border bg-white p-3 sm:p-4 shadow-sm transition-all duration-200",
        checked
          ? "border-blue-300 ring-2 ring-blue-100"
          : "border-slate-200 hover:border-slate-300",
      ].join(" ")}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onToggle(addon.id)}
        className="sr-only"
      />
      <span
        className={[
          "flex h-5 w-5 shrink-0 self-center items-center justify-center rounded-full border",
          checked ? "border-blue-600 bg-blue-600" : "border-slate-200 bg-white",
        ].join(" ")}
      >
        {checked ? <span className="h-1.5 w-1.5 rounded-full bg-white" /> : null}
      </span>
      <div className="flex-1">
        <p className="text-[14px] sm:text-[18px] md:text-[18px] font-bold leading-tight text-slate-800">{addon.title}</p>
        {addon.description ? (
          <p className="text-[11px] sm:text-sm font-medium leading-5 sm:leading-6 text-slate-500">{addon.description}</p>
        ) : null}
      </div>
      <div className="shrink-0 self-center text-right leading-none">
        <div className="text-[20px] sm:text-[20px] md:text-[24px] font-black tracking-tight text-slate-800">
          +₹{finalPrice.toLocaleString("en-IN")}
        </div>
        {hasDiscount ? (
          <div className="mt-1 text-[11px] sm:text-xs font-semibold text-slate-500">
            <span className="mr-2 text-red-500 line-through">
              ₹{basePrice.toLocaleString("en-IN")}
            </span>
            <span>₹{offAmount.toLocaleString("en-IN")} off</span>
          </div>
        ) : null}
      </div>
    </label>
  );
}
