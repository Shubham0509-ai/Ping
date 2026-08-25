import { useChatStore } from "../store/useChatStore";

import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();

  return (
    <div className="relative w-full max-w-6xl h-[90vh] max-h-[860px] min-h-[580px] transition-all">
      <BorderAnimatedContainer>
        {/* LEFT SIDEBAR */}
        <div
          className={`${
            selectedUser ? "hidden md:flex" : "flex"
          } w-full md:w-84 lg:w-96 bg-slate-950/60 md:border-r border-slate-800/80 backdrop-blur-xl flex-col shrink-0 h-full min-h-0`}
        >
          <ProfileHeader />
          <ActiveTabSwitch />

          <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1.5 scroll-smooth min-h-0">
            {activeTab === "chats" ? <ChatsList /> : <ContactList />}
          </div>
        </div>

        {/* RIGHT CHAT AREA */}
        <div
          className={`${
            !selectedUser ? "hidden md:flex" : "flex"
          } flex-1 flex-col bg-slate-900/30 backdrop-blur-xl relative overflow-hidden h-full min-h-0`}
        >
          {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
        </div>
      </BorderAnimatedContainer>
    </div>
  );
}

export default ChatPage;