export function Container({ children, className = "" }) {
  return (
    <div className={`mx-auto  w-full max-w-6xl px-8 sm:px-12   xl:px-0 ${className}`}>
      {children}
    </div>
  );
}

