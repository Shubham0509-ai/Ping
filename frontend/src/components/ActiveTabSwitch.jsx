import { useChatStore } from "../store/useChatStore";
import { MessageSquareIcon, UsersIcon } from "lucide-react";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className="p-1 bg-slate-900/90 rounded-2xl border border-slate-800 mx-3 sm:mx-4 my-2.5 flex gap-1 shadow-inner">
      <button
        onClick={() => setActiveTab("chats")}
        className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
          activeTab === "chats"
            ? "bg-gradient-to-r from-cyan-500/20 to-teal-500/20 text-cyan-300 border border-cyan-500/30 shadow-md shadow-cyan-950/40"
            : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent"
        }`}
      >
        <MessageSquareIcon className="size-4" />
        <span>Recent Chats</span>
      </button>

      <button
        onClick={() => setActiveTab("contacts")}
        className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
          activeTab === "contacts"
            ? "bg-gradient-to-r from-cyan-500/20 to-teal-500/20 text-cyan-300 border border-cyan-500/30 shadow-md shadow-cyan-950/40"
            : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent"
        }`}
      >
        <UsersIcon className="size-4" />
        <span>All Contacts</span>
      </button>
    </div>
  );
}

export default ActiveTabSwitch;