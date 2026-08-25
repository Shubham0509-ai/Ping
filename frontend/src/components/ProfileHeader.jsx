import { useState, useRef } from "react";
import { LogOutIcon, VolumeOffIcon, Volume2Icon, CameraIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

function ProfileHeader() {
  const { logout, authUser, updateProfile } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const fileInputRef = useRef(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show a quick local preview in UI
    const localPreview = URL.createObjectURL(file);
    setSelectedImg(localPreview);

    // Create Form Data to match Multer expectation
    const formData = new FormData();
    formData.append("profilePic", file);

    await updateProfile(formData);
  };

  return (
    <div className="p-4 sm:p-5 border-b border-slate-800/80 bg-slate-950/40">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          {/* AVATAR */}
          <div className="relative group shrink-0">
            <button
              className="size-12 sm:size-13 rounded-2xl overflow-hidden relative ring-2 ring-cyan-500/30 group-hover:ring-cyan-400 transition-all cursor-pointer shadow-md bg-slate-800"
              onClick={() => fileInputRef.current?.click()}
              title="Click to update profile photo"
            >
              <img
                src={selectedImg || authUser?.profilePic || "/avatar.png"}
                alt={authUser?.fullName || "User"}
                className="size-full object-cover"
              />
              <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all duration-200 backdrop-blur-[2px]">
                <CameraIcon className="size-4 text-cyan-400 mb-0.5" />
                <span className="text-white text-[10px] font-medium">Edit</span>
              </div>
            </button>

            {/* Pulse online dot */}
            <span className="absolute -bottom-0.5 -right-0.5 size-3.5 bg-emerald-500 border-2 border-slate-950 rounded-full shadow-sm">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
            </span>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* USERNAME & ONLINE TEXT */}
          <div className="min-w-0">
            <h3 className="text-white font-semibold text-sm sm:text-base truncate tracking-tight">
              {authUser?.fullName || "User"}
            </h3>

            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="size-1.5 rounded-full bg-emerald-400" />
              <p className="text-emerald-400 text-xs font-medium">Active now</p>
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-2 items-center shrink-0">
          {/* SOUND TOGGLE BTN */}
          <button
            className={`p-2.5 rounded-xl border transition-all duration-200 cursor-pointer ${
              isSoundEnabled
                ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/20 shadow-sm"
                : "bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800"
            }`}
            onClick={() => {
              mouseClickSound.currentTime = 0;
              mouseClickSound.play().catch((error) => console.log("Audio play failed:", error));
              toggleSound();
            }}
            title={isSoundEnabled ? "Sound enabled (Click to mute)" : "Sound muted (Click to unmute)"}
          >
            {isSoundEnabled ? (
              <Volume2Icon className="size-4" />
            ) : (
              <VolumeOffIcon className="size-4" />
            )}
          </button>

          {/* LOGOUT BTN */}
          <button
            className="p-2.5 rounded-xl bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/30 transition-all duration-200 cursor-pointer"
            onClick={logout}
            title="Sign out"
          >
            <LogOutIcon className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;