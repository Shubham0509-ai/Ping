function UsersLoadingSkeleton() {
  return (
    <div className="space-y-2">
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="bg-slate-900/40 p-3 rounded-2xl border border-slate-800/50 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-xl bg-slate-800 shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3.5 bg-slate-800 rounded-md w-3/5" />
              <div className="h-2.5 bg-slate-850 rounded-md w-4/5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UsersLoadingSkeleton;