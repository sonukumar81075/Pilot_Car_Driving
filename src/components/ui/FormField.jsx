"use client";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function FormLabel({ htmlFor, children, className = "" }) {
  return (
    <label htmlFor={htmlFor} className={cn("mb-2 block text-sm font-bold text-slate-700", className)}>
      {children}
    </label>
  );
}

export function FormError({ children, className = "" }) {
  if (!children) return null;
  return <p className={cn("mt-1.5 text-xs font-medium text-rose-500", className)}>{children}</p>;
}

export function FormInput({
  className = "",
  hasError = false,
  withIcon = false,
  ...props
}) {
  return (
    <input
      {...props}
      className={cn(
        "w-full rounded-2xl border bg-white py-3.5 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 disabled:cursor-not-allowed disabled:bg-slate-50",
        withIcon ? "pl-12" : "pl-4",
        hasError ? "border-rose-400 bg-rose-50/60 focus:border-rose-500 focus:ring-rose-100" : "border-slate-200",
        className
      )}
    />
  );
}

export function FormTextarea({ className = "", hasError = false, ...props }) {
  return (
    <textarea
      {...props}
      className={cn(
        "w-full min-h-[110px] resize-none rounded-2xl border bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 disabled:cursor-not-allowed disabled:bg-slate-50",
        hasError ? "border-rose-400 bg-rose-50/60 focus:border-rose-500 focus:ring-rose-100" : "border-slate-200",
        className
      )}
    />
  );
}

export function FormSelect({ className = "", hasError = false, ...props }) {
  return (
    <select
      {...props}
      className={cn(
        "w-full appearance-none rounded-2xl border bg-white px-4 py-3.5 pr-10 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50 disabled:cursor-not-allowed disabled:bg-slate-50",
        hasError ? "border-rose-400 bg-rose-50/60 focus:border-rose-500 focus:ring-rose-100" : "border-slate-200",
        className
      )}
    />
  );
}

export function FormCheckbox({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={cn(
        "h-4 w-4 rounded border-slate-300 text-blue-600 transition focus:ring-2 focus:ring-blue-400",
        className
      )}
    />
  );
}
