import { XIcon, ArrowLeftIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers?.includes(selectedUser?._id) || false;

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") setSelectedUser(null);
    };

    window.addEventListener("keydown", handleEscKey);

    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  if (!selectedUser) return null;

  return (
    <div className="flex justify-between items-center bg-slate-950/40 border-b border-slate-800/80 px-4 sm:px-6 py-3.5 shrink-0 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        {/* Mobile Back Button */}
        <button
          onClick={() => setSelectedUser(null)}
          className="md:hidden p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200 cursor-pointer"
        >
          <ArrowLeftIcon className="size-4" />
        </button>

        {/* User Avatar */}
        <div className="relative shrink-0">
          <div className="size-10 sm:size-11 rounded-xl overflow-hidden bg-slate-800 ring-2 ring-slate-700/60 shadow-md">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="size-full object-cover"
            />
          </div>
          {isOnline && (
            <span className="absolute -bottom-0.5 -right-0.5 size-3 bg-emerald-500 border-2 border-slate-950 rounded-full shadow-sm" />
          )}
        </div>

        <div>
          <h3 className="text-white font-semibold text-sm sm:text-base tracking-tight leading-tight">
            {selectedUser.fullName}
          </h3>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className={`size-1.5 rounded-full ${isOnline ? "bg-emerald-400" : "bg-slate-500"}`} />
            <p className={`text-xs font-medium ${isOnline ? "text-emerald-400" : "text-slate-400"}`}>
              {isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={() => setSelectedUser(null)}
        className="p-2 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 transition-all cursor-pointer"
        title="Close conversation (Esc)"
      >
        <XIcon className="size-4" />
      </button>
    </div>
  );
}

export default ChatHeader;