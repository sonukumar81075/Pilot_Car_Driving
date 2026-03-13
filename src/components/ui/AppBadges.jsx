import { Icon } from "@/components/ui/Icon";

export function AppBadges({ badges }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {badges.map((b) => (
        <a
          key={b.label}
          href={b.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-white/10 transition hover:bg-slate-800"
        >
          <Icon name={b.icon} className="h-5 w-5 text-white" title={b.label} />
          <span className="leading-none">
            <span className="block text-[10px] font-medium text-white/70">
              {b.icon === "apple" ? "Download on" : "Get it on"}
            </span>
            <span className="block">
              {b.icon === "apple" ? "App Store" : "Google Play"}
            </span>
          </span>
        </a>
      ))}
    </div>
  );
}

