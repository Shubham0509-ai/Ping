import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";
import { useAuthStore } from "../store/useAuthStore";

function ChatsList() {
  const { getMyChatPartners, chats, isUsersLoading, setSelectedUser, selectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;
  if (!chats || chats.length === 0) return <NoChatsFound />;

  return (
    <div className="space-y-1.5">
      {chats.map((chat) => {
        const isSelected = selectedUser?._id === chat._id;
        const isOnline = onlineUsers?.includes(chat._id);

        return (
          <div
            key={chat._id}
            className={`p-3 rounded-2xl cursor-pointer transition-all duration-200 border relative group ${
              isSelected
                ? "bg-gradient-to-r from-cyan-500/15 via-slate-800/90 to-slate-800/60 border-cyan-500/40 shadow-lg shadow-cyan-950/20"
                : "bg-slate-900/40 hover:bg-slate-800/60 border-slate-800/50 hover:border-slate-700/70"
            }`}
            onClick={() => setSelectedUser(chat)}
          >
            {isSelected && (
              <span className="absolute left-0 top-3 bottom-3 w-1 bg-cyan-400 rounded-r-full shadow-sm shadow-cyan-400" />
            )}

            <div className="flex items-center gap-3">
              {/* AVATAR WITH ONLINE DOT */}
              <div className="relative shrink-0">
                <div className={`size-11 sm:size-12 rounded-xl overflow-hidden bg-slate-800 ring-2 transition-all ${
                  isSelected ? "ring-cyan-400/60" : "ring-slate-700/60 group-hover:ring-slate-600"
                }`}>
                  <img
                    src={chat.profilePic || "/avatar.png"}
                    alt={chat.fullName}
                    className="size-full object-cover"
                  />
                </div>
                {isOnline && (
                  <span className="absolute -bottom-0.5 -right-0.5 size-3 bg-emerald-500 border-2 border-slate-950 rounded-full shadow-sm" />
                )}
              </div>

              {/* USER INFO */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <h4 className={`font-semibold text-sm truncate ${
                    isSelected ? "text-cyan-200" : "text-slate-200 group-hover:text-white"
                  }`}>
                    {chat.fullName}
                  </h4>
                  <span className={`text-[10px] font-medium shrink-0 ${
                    isOnline ? "text-emerald-400" : "text-slate-500"
                  }`}>
                    {isOnline ? "Online" : "Offline"}
                  </span>
                </div>
                <p className="text-slate-400 text-xs truncate mt-0.5">
                  Click to open conversation
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ChatsList;