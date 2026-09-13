import { PALETTE } from "@/content/site";

/** Static threat-intelligence globe for reduced-motion and no-WebGL clients. */
export function HeroCoreFallback(){
  const nodes=[[59,75],[131,62],[151,111],[91,139],[45,119]];
  return <div className="flex h-full w-full items-center justify-center" role="img" aria-label="Global secure software network">
    <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
      <defs><radialGradient id="globeGlow"><stop offset="0" stopColor="#11263a"/><stop offset=".72" stopColor="#07101e"/><stop offset="1" stopColor="#030713"/></radialGradient><filter id="softGlow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
      <circle cx="100" cy="100" r="72" fill="url(#globeGlow)" stroke={PALETTE.engineering} strokeOpacity=".45"/>
      <ellipse cx="100" cy="100" rx="72" ry="29" fill="none" stroke={PALETTE.engineering} strokeOpacity=".22"/>
      <ellipse cx="100" cy="100" rx="31" ry="72" fill="none" stroke={PALETTE.engineering} strokeOpacity=".2"/>
      <path d="M29 82c37-16 105-13 142 8M31 124c39 13 103 10 138-7" fill="none" stroke={PALETTE.engineering} strokeOpacity=".13"/>
      <path d="M59 75Q96 28 131 62M131 62q37 7 20 49M151 111q-34 42-60 28M91 139Q44 149 45 119M45 119Q35 88 59 75" fill="none" stroke={PALETTE.engineering} strokeOpacity=".55"/>
      {nodes.map(([x,y],i)=><circle key={i} cx={x} cy={y} r={i===1?3:2} fill={i===1?PALETTE.security:PALETTE.engineering} filter="url(#softGlow)"/>)}
      <ellipse cx="100" cy="100" rx="88" ry="49" transform="rotate(-18 100 100)" fill="none" stroke={PALETTE.engineering} strokeOpacity=".25" strokeDasharray="2 4"/>
    </svg>
  </div>;
}
