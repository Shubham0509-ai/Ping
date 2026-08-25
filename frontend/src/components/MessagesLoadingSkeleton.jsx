function MessagesLoadingSkeleton() {
  return (
    <div className="max-w-3xl mx-auto space-y-4 py-2">
      {[
        { isRight: false, width: "w-48 sm:w-64", height: "h-14" },
        { isRight: true, width: "w-40 sm:w-56", height: "h-10" },
        { isRight: false, width: "w-60 sm:w-80", height: "h-20" },
        { isRight: true, width: "w-52 sm:w-72", height: "h-14" },
        { isRight: false, width: "w-36 sm:w-48", height: "h-10" },
      ].map((item, index) => (
        <div
          key={index}
          className={`flex flex-col ${item.isRight ? "items-end" : "items-start"}`}
        >
          <div
            className={`${item.width} ${item.height} ${
              item.isRight
                ? "bg-cyan-600/20 border border-cyan-500/20 rounded-2xl rounded-tr-xs"
                : "bg-slate-800/60 border border-slate-700/40 rounded-2xl rounded-tl-xs"
            } animate-pulse shadow-sm`}
          />
        </div>
      ))}
    </div>
  );
}

export default MessagesLoadingSkeleton;