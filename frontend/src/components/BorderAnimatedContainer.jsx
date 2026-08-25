function BorderAnimatedContainer({ children }) {
  return (
    <div className="w-full h-full [background:linear-gradient(135deg,rgba(15,23,42,0.85),rgba(15,23,42,0.95))_padding-box,conic-gradient(from_var(--border-angle),rgba(51,65,85,0.4)_70%,rgba(6,182,212,0.8)_85%,rgba(56,189,248,0.9)_90%,rgba(99,102,241,0.8)_95%,rgba(51,65,85,0.4)_100%)_border-box] rounded-2xl sm:rounded-3xl border border-transparent animate-border flex overflow-hidden backdrop-blur-2xl shadow-2xl shadow-black/75 ring-1 ring-white/10">
      {children}
    </div>
  );
}
export default BorderAnimatedContainer;