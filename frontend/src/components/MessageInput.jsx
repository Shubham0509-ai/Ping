import { useRef, useState } from "react";
import useKeyboardSound from "../hooks/useKeyboardSound";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";
import { ImageIcon, SendIcon, XIcon } from "lucide-react";

function MessageInput() {
  const { playRandomKeyStrokeSound } = useKeyboardSound();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const fileInputRef = useRef(null);

  const { sendMessage, isSoundEnabled } = useChatStore();

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    if (isSoundEnabled) playRandomKeyStrokeSound();

    sendMessage({
      text: text.trim(),
      image: imageFile,
    });

    setText("");
    setImagePreview(null);
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image file size must be less than 10MB");
      return;
    }

    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="p-3 sm:p-4 border-t border-slate-800/80 bg-slate-950/50 backdrop-blur-xl shrink-0">
      {/* Image Preview floating card */}
      {imagePreview && (
        <div className="max-w-3xl mx-auto mb-3 flex items-center">
          <div className="relative group rounded-2xl overflow-hidden border border-cyan-500/40 shadow-xl shadow-cyan-950/30 bg-slate-900">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-24 h-24 object-cover"
            />
            <button
              onClick={removeImage}
              className="absolute top-1.5 right-1.5 size-6 rounded-full bg-slate-950/80 border border-white/20 flex items-center justify-center text-slate-300 hover:text-white hover:bg-rose-600 transition-all cursor-pointer shadow-md"
              type="button"
              title="Remove image"
            >
              <XIcon className="size-3.5" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto flex items-center gap-2 sm:gap-3">
        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        {/* Attach Image Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`p-3 rounded-2xl border transition-all duration-200 cursor-pointer shrink-0 ${
            imagePreview
              ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/40 shadow-sm"
              : "bg-slate-900/70 text-slate-400 border-slate-800 hover:text-cyan-300 hover:bg-slate-850 hover:border-slate-700"
          }`}
          title="Attach image"
        >
          <ImageIcon className="size-5" />
        </button>

        {/* Text Input Field */}
        <div className="flex-1 relative">
          <input
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              isSoundEnabled && playRandomKeyStrokeSound();
            }}
            className="w-full bg-slate-900/80 border border-slate-700/60 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder:text-slate-500 rounded-2xl py-3 px-4 text-sm sm:text-base outline-none transition-all duration-200 shadow-inner"
            placeholder="Type your message..."
          />
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className="p-3 sm:px-5 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-300 hover:from-cyan-300 hover:to-teal-200 text-slate-950 font-semibold shadow-lg shadow-cyan-500/20 active:scale-95 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center shrink-0"
          title="Send message"
        >
          <SendIcon className="size-5" />
        </button>
      </form>
    </div>
  );
}

export default MessageInput;