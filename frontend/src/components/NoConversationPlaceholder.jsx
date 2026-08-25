import { MessageCircleIcon, SparklesIcon } from "lucide-react";

const NoConversationPlaceholder = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6 sm:p-10 relative overflow-hidden">
      {/* Glow aura */}
      <div className="absolute size-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-sm flex flex-col items-center">
        <div className="size-20 rounded-3xl bg-gradient-to-tr from-cyan-500/20 via-slate-800 to-indigo-500/20 border border-cyan-500/30 flex items-center justify-center mb-6 shadow-xl shadow-cyan-950/40 animate-float">
          <MessageCircleIcon className="size-10 text-cyan-400 drop-shadow-md" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold mb-3">
          <SparklesIcon className="size-3.5" />
          <span>Real-time Messaging</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight">
          Select a Conversation
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed">
          Choose a chat from the sidebar to start exchanging messages, sharing photos, and chatting in real-time.
        </p>
      </div>
    </div>
  );
};

export default NoConversationPlaceholder;