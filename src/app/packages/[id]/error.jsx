"use client";

export default function PackageDetailsError({ error, reset }) {
  return (
    <main className="min-h-screen bg-[#F3F7FB] px-4 pb-16 pt-24 md:pt-28">
      <div className="mx-auto max-w-3xl rounded-2xl border border-red-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Could not load package details</h1>
        <p className="mt-2 text-sm text-slate-600">
          We were unable to fetch this package right now. Please try again.
        </p>
        <p className="mt-2 text-xs text-red-600">{error?.message}</p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
        >
          Retry
        </button>
      </div>
    </main>
  );
}
