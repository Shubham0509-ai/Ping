import { MessageSquarePlusIcon, HandMetalIcon, SmileIcon, CalendarIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

const NoChatHistoryPlaceholder = ({ name }) => {
  const { sendMessage } = useChatStore();

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6 sm:p-10 relative">
      <div className="size-16 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-slate-800 to-teal-500/20 border border-cyan-500/30 flex items-center justify-center mb-5 shadow-lg shadow-cyan-950/30 animate-float">
        <MessageSquarePlusIcon className="size-8 text-cyan-400" />
      </div>

      <h3 className="text-lg sm:text-xl font-bold text-white mb-2 tracking-tight">
        Say Hello to {name}!
      </h3>

      <div className="flex flex-col space-y-3 max-w-sm mb-6">
        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
          This is the beginning of your direct conversation. Break the ice with a quick greeting:
        </p>
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent mx-auto" />
      </div>

      {/* Suggestion Chips */}
      <div className="flex flex-wrap gap-2.5 justify-center max-w-md">
        <button
          onClick={() => sendMessage({ text: "👋 Say Hello" })}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-cyan-300 bg-slate-900/80 border border-cyan-500/30 rounded-full hover:bg-cyan-500/20 hover:border-cyan-400 hover:text-white hover:-translate-y-0.5 transition-all duration-200 cursor-pointer shadow-sm"
        >
          <HandMetalIcon className="size-3.5 text-cyan-400" />
          <span>👋 Say Hello</span>
        </button>

        <button
          onClick={() => sendMessage({ text: "🤝 How are you doing?" })}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-cyan-300 bg-slate-900/80 border border-cyan-500/30 rounded-full hover:bg-cyan-500/20 hover:border-cyan-400 hover:text-white hover:-translate-y-0.5 transition-all duration-200 cursor-pointer shadow-sm"
        >
          <SmileIcon className="size-3.5 text-teal-400" />
          <span>🤝 How are you?</span>
        </button>

        <button
          onClick={() => sendMessage({ text: "📅 Meet up soon?" })}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-cyan-300 bg-slate-900/80 border border-cyan-500/30 rounded-full hover:bg-cyan-500/20 hover:border-cyan-400 hover:text-white hover:-translate-y-0.5 transition-all duration-200 cursor-pointer shadow-sm"
        >
          <CalendarIcon className="size-3.5 text-indigo-400" />
          <span>📅 Meet up soon?</span>
        </button>
      </div>
    </div>
  );
};

export default NoChatHistoryPlaceholder;