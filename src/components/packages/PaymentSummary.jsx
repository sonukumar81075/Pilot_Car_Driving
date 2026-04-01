"use client";

function money(value) {
  return `$${Number(value || 0).toFixed(2)}`;
}

export function PaymentSummary({
  baseLabel,
  basePrice,
  addonsTotal,
  taxRate,
  actionLabel = "Interested",
  onActionClick,
}) {
  const subtotal = Number(basePrice || 0) + Number(addonsTotal || 0);
  const taxAmount = subtotal * Number(taxRate || 0);
  const total = subtotal + taxAmount;

  return (
    <aside className="font-sans rounded-2xl sm:rounded-3xl border-t-6 border-blue-100 bg-white p-4 sm:p-6 shadow-[0_12px_30px_-22px_rgba(15,23,42,0.35)] sm:mt-6 mt-6 ">
      <h3 className="text-[20px] sm:text-[24px] md:text-[28px] font-semibold leading-tight tracking-tight font-sans text-slate-900">
        Payment Summary
      </h3>
      <div className="mt-4 sm:mt-6 space-y-2.5 sm:space-y-3 text-xs sm:text-sm">
        <div className="flex items-center justify-between text-slate-700">
          <span className="font-medium">{baseLabel}</span>
          <span className="font-semibold text-slate-900">{money(basePrice)}</span>
        </div>
        <div className="flex items-center justify-between text-slate-700">
          <span className="font-medium">Add-ons</span>
          <span className="font-semibold text-slate-900">{money(addonsTotal)}</span>
        </div>
      </div>

      <div className="mt-5 sm:mt-6 space-y-2.5 sm:space-y-3 border-t border-slate-100 pt-3 sm:pt-4 text-xs sm:text-sm">
        <div className="flex items-center justify-between text-slate-700">
          <span className="font-medium">Subtotal</span>
          <span className="font-semibold text-slate-900">{money(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-slate-700">
          <span className="font-medium">Tax ({Math.round(Number(taxRate || 0) * 100)}%)</span>
          <span className="font-semibold text-slate-900">{money(taxAmount)}</span>
        </div>
      </div>

      <div className="mt-4 sm:mt-5 rounded-xl sm:rounded-2xl bg-slate-50 p-3 sm:p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wide text-slate-500">Total Amount</span>
          <span className="text-[20px] leading-none sm:text-3xl md:text-3xl font-extrabold tracking-tight text-slate-900">{money(total)}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={onActionClick}
        className="mt-5 sm:mt-6 w-full rounded-xl sm:rounded-2xl btn-gradient btn-gradient-glow py-2.5 sm:py-3.5 text-xs sm:text-base font-extrabold text-white cursor-pointer shadow-lg transition hover:opacity-95"
      >
        {actionLabel === "Interested" ? "Interested   " : actionLabel}
      </button>
      <p className="mt-3 text-center text-xs font-medium text-slate-400">
        No immediate payment required. We will contact you to finalize the schedule.
      </p>
    </aside>
  );
}
