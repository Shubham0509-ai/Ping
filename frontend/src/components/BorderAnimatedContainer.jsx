function BorderAnimatedContainer({ children }) {
  return (
    <div className="w-full h-full [background:linear-gradient(45deg,#0a1b14,--theme(--color-emerald-950)_50%,#0a1b14)_padding-box,conic-gradient(from_var(--border-angle),--theme(--color-emerald-800/.30)_80%,--theme(--color-emerald-500)_86%,--theme(--color-mint-400)_90%,--theme(--color-emerald-500)_94%,--theme(--color-emerald-800/.30))_border-box] rounded-2xl border border-transparent animate-border flex overflow-hidden">
      {children}
    </div>
  );
}

export default BorderAnimatedContainer;
