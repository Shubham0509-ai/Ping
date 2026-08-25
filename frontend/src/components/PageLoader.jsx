import { Loader2Icon, MessageCircleIcon } from "lucide-react";

function PageLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#070b14] text-slate-200">
      <div className="relative mb-4">
        <div className="size-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shadow-xl shadow-cyan-950/50">
          <MessageCircleIcon className="size-8 text-cyan-400" />
        </div>
        <Loader2Icon className="size-20 text-cyan-400/30 animate-spin absolute -inset-2" />
      </div>
      <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Loading Ping...</p>
    </div>
  );
}

export default PageLoader;