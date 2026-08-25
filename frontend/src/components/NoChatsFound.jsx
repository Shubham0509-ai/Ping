import { MessageSquareDashedIcon, UsersIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

function NoChatsFound() {
  const { setActiveTab } = useChatStore();

  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
      <div className="size-14 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-slate-800 to-indigo-500/20 border border-cyan-500/30 flex items-center justify-center mb-4 shadow-lg shadow-cyan-950/20">
        <MessageSquareDashedIcon className="size-7 text-cyan-400" />
      </div>

      <h4 className="text-white font-semibold text-sm mb-1">No active chats yet</h4>
      <p className="text-slate-400 text-xs px-4 mb-5 leading-relaxed">
        Start a new conversation by picking any user from your contacts list.
      </p>

      <button
        onClick={() => setActiveTab("contacts")}
        className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 rounded-xl hover:from-cyan-300 hover:to-teal-200 shadow-md shadow-cyan-500/20 active:scale-95 transition-all duration-200 cursor-pointer"
      >
        <UsersIcon className="size-3.5" />
        <span>Browse Contacts</span>
      </button>
    </div>
  );
}

export default NoChatsFound;