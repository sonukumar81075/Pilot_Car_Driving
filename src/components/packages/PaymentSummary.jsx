"use client";

function money(value) {
  return `$${Number(value || 0).toFixed(2)}`;
}

export function PaymentSummary({ baseLabel, basePrice, addonsTotal, taxRate }) {
  const subtotal = Number(basePrice || 0) + Number(addonsTotal || 0);
  const taxAmount = subtotal * Number(taxRate || 0);
  const total = subtotal + taxAmount;

  return (
    <aside className="font-sans rounded-3xl border border-slate-200/90 bg-white/95 p-6 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.35)] backdrop-blur">
      <h3 className="text-[32px] font-extrabold leading-tight tracking-tight font-sans text-slate-900">
        Payment Summary
      </h3>
      <div className="mt-6 space-y-3 text-sm">
        <div className="flex items-center justify-between text-slate-700">
          <span className="font-medium">{baseLabel}</span>
          <span className="font-semibold text-slate-900">{money(basePrice)}</span>
        </div>
        <div className="flex items-center justify-between text-slate-700">
          <span className="font-medium">Add-ons</span>
          <span className="font-semibold text-slate-900">{money(addonsTotal)}</span>
        </div>
      </div>

      <div className="mt-6 space-y-3 border-t border-slate-100 pt-4 text-sm">
        <div className="flex items-center justify-between text-slate-700">
          <span className="font-medium">Subtotal</span>
          <span className="font-semibold text-slate-900">{money(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-slate-700">
          <span className="font-medium">Tax ({Math.round(Number(taxRate || 0) * 100)}%)</span>
          <span className="font-semibold text-slate-900">{money(taxAmount)}</span>
        </div>
      </div>

      <div className="mt-5 rounded-2xl bg-gradient-to-r from-slate-50 to-blue-50 p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wide text-slate-500">Total Amount</span>
          <span className="text-4xl font-black tracking-tight text-slate-900">{money(total)}</span>
        </div>
      </div>

      <button className="btn-gradient btn-gradient-glow mt-6 w-full rounded-2xl py-3.5 text-base font-extrabold text-white transition hover:opacity-95">
        Interested
      </button>
      <p className="mt-3 text-center text-xs font-medium text-slate-400">
        No immediate payment required. We will contact you to finalize the schedule.
      </p>
    </aside>
  );
}
