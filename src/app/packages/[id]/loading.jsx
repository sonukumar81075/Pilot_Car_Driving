export default function LoadingPackageDetails() {
  return (
    <main className="min-h-screen bg-[#F3F7FB] pb-16 pt-24 md:pt-28">
      <div className="mx-auto w-full max-w-7xl px-4">
        <div className="h-10 w-72 animate-pulse rounded-lg bg-slate-200" />
        <div className="mt-3 h-5 w-96 animate-pulse rounded bg-slate-200" />

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
          <section>
            <div className="h-8 w-64 animate-pulse rounded bg-slate-200" />
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="h-72 animate-pulse rounded-2xl bg-white" />
              <div className="h-72 animate-pulse rounded-2xl bg-white" />
            </div>

            <div className="mt-8 h-8 w-56 animate-pulse rounded bg-slate-200" />
            <div className="mt-4 space-y-3">
              <div className="h-20 animate-pulse rounded-xl bg-white" />
              <div className="h-20 animate-pulse rounded-xl bg-white" />
              <div className="h-20 animate-pulse rounded-xl bg-white" />
            </div>
          </section>

          <aside className="h-80 animate-pulse rounded-2xl bg-white" />
        </div>
      </div>
    </main>
  );
}
