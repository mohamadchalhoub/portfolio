const events = [
  { time: "09:41:02", level: "PASS", text: "Authentication boundary verified" },
  { time: "09:41:04", level: "PASS", text: "Row-level access policies active" },
  { time: "09:41:07", level: "INFO", text: "Production surface mapped · 24 routes" },
  { time: "09:41:09", level: "PASS", text: "Input validation checks complete" },
];

export function SecurityConsole() {
  return (
    <div className="absolute inset-3 flex items-center justify-center sm:inset-6">
      <div className="tech-panel relative w-full overflow-hidden border border-white/10 bg-[#0b1020]/75 shadow-[0_32px_90px_rgba(0,0,0,.65),0_0_70px_rgba(0,212,200,.08)] backdrop-blur-lg">
        <i className="absolute left-2 top-2 z-20 h-3 w-3 border-l border-t border-engineering/50"/><i className="absolute bottom-2 right-2 z-20 h-3 w-3 border-b border-r border-engineering/50"/>
        <div className="flex items-center gap-2 border-b border-white/[0.08] bg-white/[0.025] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff6159]"/><span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]"/><span className="h-2.5 w-2.5 rounded-full bg-[#28c941]"/>
          <span className="ml-3 font-mono text-[10px] tracking-wide text-muted-foreground">mohamad@secure-build ~/production</span>
          <span className="ml-auto flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[.16em] text-emerald-400"><i className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"/> live</span>
        </div>
        <div className="p-5 font-mono sm:p-6">
          <div className="mb-6 flex items-end justify-between border-b border-white/[0.07] pb-5">
            <div><p className="text-[10px] uppercase tracking-[.18em] text-engineering">Security pipeline</p><p className="mt-2 text-sm font-medium text-foreground">release/production</p></div>
            <div className="text-right"><p className="text-2xl font-semibold text-foreground">100%</p><p className="text-[9px] uppercase tracking-wider text-muted-foreground">checks passed</p></div>
          </div>
          <div className="space-y-3">
            {events.map((event, index) => <div key={event.text} className="flex items-center gap-3 text-[10px] sm:text-[11px]" style={{animationDelay:`${index*130}ms`}}>
              <span className="text-muted-foreground/55">{event.time}</span>
              <span className={event.level === "PASS" ? "text-emerald-400" : "text-engineering"}>{event.level}</span>
              <span className="truncate text-foreground/75">{event.text}</span>
            </div>)}
          </div>
          <div className="mt-6 flex items-center gap-2 rounded-lg border border-engineering/15 bg-engineering/[0.04] px-3 py-2.5 text-[10px] text-engineering">
            <span>$</span><span className="text-foreground/70">deploy --secure --verified</span><span className="h-3 w-1.5 animate-pulse bg-engineering"/>
          </div>
        </div>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-engineering/70 to-transparent"/>
      </div>
    </div>
  );
}
