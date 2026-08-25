import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { MessageCircleIcon, LockIcon, MailIcon, UserIcon, LoaderIcon, SparklesIcon, ShieldCheckIcon, ZapIcon } from "lucide-react";
import { Link } from "react-router";

function SignUpPage() {
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <div className="w-full flex items-center justify-center p-2 sm:p-4">
      <div className="relative w-full max-w-5xl min-h-155 lg:h-165">
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
                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">Create Account</h2>
                  <p className="text-slate-400 text-sm">Join Ping and start chatting in seconds</p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* FULL NAME */}
                  <div>
                    <label className="auth-input-label">Full Name</label>
                    <div className="relative">
                      <UserIcon className="auth-input-icon" />

                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="input"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

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
                        minLength={6}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="input"
                        placeholder="At least 6 characters"
                      />
                    </div>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <button 
                    className="w-full py-3.5 px-4 font-semibold text-slate-950 rounded-xl bg-linear-to-r from-cyan-400 via-teal-300 to-cyan-300 hover:from-cyan-300 hover:to-teal-200 active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/25 cursor-pointer mt-2" 
                    type="submit" 
                    disabled={isSigningUp}
                  >
                    {isSigningUp ? (
                      <span className="flex items-center justify-center gap-2">
                        <LoaderIcon className="w-5 h-5 animate-spin" />
                        Creating account...
                      </span>
                    ) : (
                      "Create Free Account"
                    )}
                  </button>
                </form>

                <div className="mt-8 text-center text-sm text-slate-400">
                  Already have an account?{" "}
                  <Link to="/login" className="auth-link font-semibold">
                    Sign in
                  </Link>
                </div>
              </div>
            </div>

            {/* FORM ILLUSTRATION - RIGHT SIDE */}
            <div className="hidden md:w-1/2 md:flex flex-col items-center justify-center p-10 bg-linear-to-br from-cyan-950/20 via-slate-900/30 to-indigo-950/20 relative overflow-hidden">
              {/* Background ambient lighting */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-72 bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none" />

              <div className="relative z-10 text-center max-w-xs">
                <div className="animate-float mb-6">
                  <img
                    src="/signup.png"
                    alt="Start your journey"
                    className="w-full max-w-65 mx-auto h-auto object-contain drop-shadow-2xl"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Start your journey today</h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-6">Connect with friends, share media, and never miss a conversation with real-time sync.</p>

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

export default SignUpPage;
