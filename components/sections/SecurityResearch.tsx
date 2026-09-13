import { SECURITY_CAPABILITIES, SECURITY_INTRO, SECURITY_METHOD_NOTE } from "@/content/security";
import { Reveal } from "@/components/Reveal";
import { SectionShell } from "./SectionShell";

export function SecurityResearch() {
  return (
    <SectionShell id="security">
      <Reveal className="max-w-3xl">
        <h2
          id="security-heading"
          className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
        >
          Security is part of the architecture.
        </h2>
        <p className="mt-5 text-muted-foreground">{SECURITY_INTRO}</p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {SECURITY_METHOD_NOTE}
        </p>
      </Reveal>

      <Reveal delayMs={100}>
        <div className="mt-12 overflow-hidden rounded-2xl border border-white/[0.09] bg-[#080a20]/90 shadow-[0_30px_80px_rgba(0,0,0,.3)]">
          <div className="flex items-center justify-between border-b border-white/[0.08] bg-white/[0.025] px-5 py-4">
            <div><p className="font-mono text-[10px] uppercase tracking-[.18em] text-engineering">Assessment coverage</p><p className="mt-1 text-xs text-muted-foreground">Application surface · structured methodology</p></div>
            <span className="rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-3 py-1 font-mono text-[9px] uppercase tracking-wider text-emerald-400">Responsible disclosure</span>
          </div>
          <div className="grid md:grid-cols-[.72fr_1.28fr]">
            <div className="border-b border-white/[0.08] p-6 md:border-b-0 md:border-r">
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Method</p>
              <div className="mt-6 space-y-5">{["Map the attack surface","Test trust boundaries","Report actionable fixes"].map((item,index)=><div key={item} className="flex items-center gap-3"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-engineering/20 bg-engineering/[0.05] font-mono text-[10px] text-engineering">0{index+1}</span><span className="text-sm text-foreground/80">{item}</span></div>)}</div>
            </div>
            <ul className="grid gap-px bg-white/[0.06] sm:grid-cols-2">
          {SECURITY_CAPABILITIES.map((capability) => (
            <li key={capability.id} className="flex items-start gap-3 bg-[#0d102c] p-4 text-xs text-foreground/80 transition-colors hover:bg-engineering/[0.04]">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-security shadow-[0_0_8px_rgba(255,181,71,.5)]" aria-hidden="true" />
              {capability.title}
            </li>
          ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}
