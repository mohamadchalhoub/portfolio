"use client";

import { useEffect, useState } from "react";

export function SystemHud() {
  const [progress,setProgress] = useState(0);
  const [clock,setClock] = useState("--:--:--");
  const [viewport,setViewport] = useState("---- × ----");
  useEffect(()=>{
    const update=()=>{
      const max=document.documentElement.scrollHeight-window.innerHeight;
      setProgress(max>0 ? window.scrollY/max : 0);
      setViewport(`${window.innerWidth} × ${window.innerHeight}`);
    };
    const tick=()=>setClock(new Intl.DateTimeFormat("en-GB",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:false}).format(new Date()));
    update(); tick();
    const timer=window.setInterval(tick,1000);
    window.addEventListener("scroll",update,{passive:true}); window.addEventListener("resize",update);
    return()=>{window.clearInterval(timer);window.removeEventListener("scroll",update);window.removeEventListener("resize",update);};
  },[]);
  return <div className="pointer-events-none fixed inset-0 z-40 hidden font-mono text-[9px] uppercase tracking-[.18em] text-muted-foreground/45 lg:block" aria-hidden="true">
    <div className="absolute left-0 top-0 h-[2px] bg-engineering shadow-[0_0_10px_rgba(0,212,200,.5)]" style={{width:`${progress*100}%`}}/>
    <div className="absolute bottom-7 left-7 space-y-1"><p><span className="text-muted-foreground/25">SYS</span> MC/PORTFOLIO</p><p><span className="text-muted-foreground/25">VIEW</span> {viewport}</p><p className="text-engineering/60">SECURE BUILD ACTIVE</p></div>
    <div className="absolute bottom-7 right-7 space-y-1 text-right"><p><span className="text-muted-foreground/25">LOCAL</span> {clock}</p><p><span className="text-muted-foreground/25">ZONE</span> ASIA/BEIRUT</p><p className="text-emerald-400/60">● SESSION ONLINE</p></div>
    <i className="absolute bottom-5 left-5 h-5 w-5 border-b border-l border-white/10"/><i className="absolute bottom-5 right-5 h-5 w-5 border-b border-r border-white/10"/>
  </div>;
}
