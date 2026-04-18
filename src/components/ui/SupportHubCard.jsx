// Sub-component mirroring the Screenshot Cards
function SupportHubCard({ icon, title, description, actionLabel, actionHref }) {
  return (
    <div className="flex flex-col h-full items-center text-center sm:p-10 p-6 bg-white border sm:border-slate-100 border-slate-200  rounded-[3rem]   shadow-[0_20px_50px_rgba(0,0,0,0.02)] transition-transform hover:-translate-y-1">

      <div className="sm:w-16 w-12 sm:h-16 h-12 flex items-center justify-center bg-slate-50 text-slate-400 text-2xl sm:rounded-2xl rounded-full mb-8 border border-slate-100">
        {icon}
      </div>

      <h3 className="text-xl font-bold text-[#0f172a] mb-4">
        {title}
      </h3>

      <p className="text-slate-700 font-sans leading-relaxed mb-6 px-4">
        {description}
      </p>

      {/* 🔥 Important: mt-auto */}
      <a
        href={actionHref}
        className="mt-auto inline-flex w-full items-center justify-center py-4 sm:rounded-2xl rounded-full font-bold tracking-tight text-white btn-gradient btn-gradient-glow shadow-lg transition-all hover:brightness-105 active:scale-[0.99]"
      >
        {actionLabel}
      </a>
    </div>
  );
}
export default SupportHubCard;