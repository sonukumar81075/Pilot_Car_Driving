"use client";

export function AddonItem({ addon, checked, onToggle }) {
  return (
    <label
      className={[
        "font-sans group flex cursor-pointer items-start gap-4 rounded-2xl border bg-white/95 p-4 shadow-sm transition-all duration-200",
        checked
          ? "border-blue-300 ring-2 ring-blue-100"
          : "border-slate-200/90 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md",
      ].join(" ")}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onToggle(addon.id)}
        className="mt-1 h-6 w-6 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
      />
      <div className="flex-1">
        <p className="text-[20px] font-extrabold leading-tight text-slate-800">{addon.title}</p>
        {addon.description ? (
          <p className="text-sm font-medium leading-6 text-slate-500">{addon.description}</p>
        ) : null}
      </div>
      <div className="text-[24px] font-black tracking-tight text-slate-800">
        +${Number(addon.price || 0).toFixed(0)}
      </div>
    </label>
  );
}
