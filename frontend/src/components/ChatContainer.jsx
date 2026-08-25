import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
import { CheckCheckIcon, CheckIcon, XIcon, DownloadIcon } from "lucide-react";

function ChatContainer() {
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const scrollAreaRef = useRef(null);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    if (!selectedUser?._id) return;

    getMessagesByUserId(selectedUser._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser?._id, getMessagesByUserId, subscribeToMessages, unsubscribeFromMessages]);

  // Scroll strictly within the messages container to avoid shifting page/window or hiding headers
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  if (!authUser) return null;

  if (!selectedUser) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-900/50 text-slate-400 p-6 h-full">
        <p className="text-sm">Select a contact or conversation to start chatting</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full min-h-0 overflow-hidden relative">
      <ChatHeader />

      {/* Messages Scroll Area */}
      <div ref={scrollAreaRef} className="flex-1 px-4 sm:px-6 overflow-y-auto py-6 space-y-4 min-h-0">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="max-w-3xl mx-auto space-y-4">
            {messages.map((msg) => {
              const isSentByMe = msg.senderId === authUser._id;

              return (
                <div
                  key={msg._id}
                  className={`flex flex-col ${isSentByMe ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`relative group max-w-[88%] sm:max-w-md p-3 transition-all duration-200 ${
                      isSentByMe
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl rounded-tr-xs shadow-lg shadow-cyan-950/40"
                        : "bg-slate-800/90 text-slate-100 border border-slate-700/60 rounded-2xl rounded-tl-xs shadow-md shadow-black/20"
                    }`}
                  >
                    {/* Image Attachment */}
                    {msg.image && (
                      <div className="mb-2 rounded-xl overflow-hidden bg-black/30 border border-white/10 flex justify-center">
                        <img
                          src={msg.image}
                          alt="Shared attachment"
                          className="max-h-72 w-full object-contain rounded-xl cursor-pointer hover:opacity-90 active:scale-[0.99] transition-all"
                          onClick={() => setModalImage(msg.image)}
                          onLoad={() => {
                            if (scrollAreaRef.current) {
                              scrollAreaRef.current.scrollTo({
                                top: scrollAreaRef.current.scrollHeight,
                                behavior: "smooth",
                              });
                            }
                          }}
                        />
                      </div>
                    )}

                    {/* Text Message */}
                    {msg.text && (
                      <p className="text-sm leading-relaxed whitespace-pre-wrap break-words px-0.5">
                        {msg.text}
                      </p>
                    )}

                    {/* Timestamp & Status */}
                    <div
                      className={`flex items-center gap-1 mt-1 text-[10px] ${
                        isSentByMe ? "text-cyan-100/75 justify-end" : "text-slate-400 justify-start"
                      }`}
                    >
                      <span>
                        {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      {isSentByMe && (
                        msg.isOptimistic ? (
                          <CheckIcon className="size-3 opacity-60" />
                        ) : (
                          <CheckCheckIcon className="size-3 text-cyan-200" />
                        )
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceholder name={selectedUser.fullName} />
        )}
      </div>

      <MessageInput />

      {/* Fullscreen Image Lightbox Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setModalImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={modalImage}
              alt="Full Preview"
              className="max-h-[80vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-white/10"
            />
            <div className="flex gap-3 mt-4">
              <a
                href={modalImage}
                target="_blank"
                rel="noreferrer"
                download
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/90 text-slate-200 hover:text-white border border-slate-700 hover:border-slate-600 transition-all text-xs font-semibold"
              >
                <DownloadIcon className="size-4" />
                <span>Open Full Size</span>
              </a>
              <button
                onClick={() => setModalImage(null)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/90 text-slate-200 hover:text-white border border-slate-700 hover:border-slate-600 transition-all text-xs font-semibold cursor-pointer"
              >
                <XIcon className="size-4" />
                <span>Close</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatContainer;