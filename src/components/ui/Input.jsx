"use client";

import React from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const baseClassName =
  "w-full rounded-2xl border bg-white sm:py-3.5 py-3 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 disabled:cursor-not-allowed disabled:bg-slate-50";

const Input = React.forwardRef(function Input(
  { as = "input", className = "", hasError = false, withIcon = false, children, ...props },
  ref
) {
  const Component = as;
  return (
    <Component
      ref={ref}
      className={cn(
        baseClassName,
        withIcon ? "pl-12" : "pl-4",
        hasError
          ? "border-rose-400 bg-rose-50/60 focus:border-rose-500 focus:ring-rose-100"
          : "border-slate-200",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
});

export default Input;
