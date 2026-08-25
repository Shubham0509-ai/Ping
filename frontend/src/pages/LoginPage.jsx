import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { MessageCircleIcon, MailIcon, LoaderIcon, LockIcon, SparklesIcon, ShieldCheckIcon, ZapIcon } from "lucide-react";
import { Link } from "react-router";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="w-full flex items-center justify-center p-2 sm:p-4">
      <div className="relative w-full max-w-5xl min-h-[580px] lg:h-[620px]">
        <BorderAnimatedContainer>
          <div className="w-full h-full flex flex-col md:flex-row">
            {/* FORM COLUMN - LEFT SIDE */}
            <div className="w-full md:w-1/2 p-6 sm:p-10 flex items-center justify-center md:border-r border-slate-800/80 bg-slate-950/40">
              <div className="w-full max-w-sm">
                {/* HEADING TEXT */}
                <div className="text-center mb-8">
                  <div className="inline-flex p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mb-4 shadow-lg shadow-cyan-500/10">
                    <MessageCircleIcon className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">Welcome Back</h2>
                  <p className="text-slate-400 text-sm">Sign in to continue to your conversations</p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* EMAIL INPUT */}
                  <div>
                    <label className="auth-input-label">Email Address</label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon" />

                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="input"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  {/* PASSWORD INPUT */}
                  <div>
                    <label className="auth-input-label">Password</label>
                    <div className="relative">
                      <LockIcon className="auth-input-icon" />

                      <input
                        type="password"
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="input"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <button 
                    className="w-full py-3.5 px-4 font-semibold text-slate-950 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-300 hover:from-cyan-300 hover:to-teal-200 active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/25 cursor-pointer mt-2" 
                    type="submit" 
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? (
                      <span className="flex items-center justify-center gap-2">
                        <LoaderIcon className="w-5 h-5 animate-spin" />
                        Signing in...
                      </span>
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </form>

                <div className="mt-8 text-center text-sm text-slate-400">
                  Don't have an account?{" "}
                  <Link to="/signup" className="auth-link font-semibold">
                    Create account
                  </Link>
                </div>
              </div>
            </div>

            {/* FORM ILLUSTRATION - RIGHT SIDE */}
            <div className="hidden md:w-1/2 md:flex flex-col items-center justify-center p-10 bg-gradient-to-br from-cyan-950/20 via-slate-900/30 to-indigo-950/20 relative overflow-hidden">
              {/* Background ambient lighting */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-72 bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none" />

              <div className="relative z-10 text-center max-w-xs">
                <div className="animate-float mb-6">
                  <img
                    src="/login.png"
                    alt="Ping messaging preview"
                    className="w-full max-w-[260px] mx-auto h-auto object-contain drop-shadow-2xl"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Connect instantly with Ping</h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-6">Experience lightning-fast real-time messaging with your friends and teammates.</p>

                <div className="flex flex-wrap justify-center gap-2">
                  <span className="auth-badge">
                    <ZapIcon className="size-3" /> Realtime
                  </span>
                  <span className="auth-badge">
                    <ShieldCheckIcon className="size-3" /> Encrypted
                  </span>
                  <span className="auth-badge">
                    <SparklesIcon className="size-3" /> Free
                  </span>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}

export default LoginPage;
