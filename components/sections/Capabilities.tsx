import { CAPABILITIES } from "@/content/capabilities";
import { Reveal } from "@/components/Reveal";
import { VARIANT_TEXT, VARIANT_BORDER_TOP } from "@/lib/variant-styles";
import { SectionShell } from "./SectionShell";

export function Capabilities() {
  return (
    <SectionShell id="capabilities">
      <Reveal className="mb-16 max-w-xl">
        <h2
          id="capabilities-heading"
          className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
        >
          What I bring to a build
        </h2>
        <p className="mt-4 text-muted-foreground">
          Two disciplines, applied together rather than handed off
          between specialists.
        </p>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2">
        {CAPABILITIES.map((capability, index) => (
          <Reveal key={capability.id} delayMs={index * 100}>
            <article
              className={`tech-panel group relative h-full border border-border border-t-2 bg-card/90 p-7 transition-all hover:-translate-y-1 hover:border-engineering/25 ${VARIANT_BORDER_TOP[capability.variant]}`}
            >
              <span className="absolute right-6 top-5 font-mono text-4xl font-semibold text-white/[0.035]">0{index+1}</span>
              <p className="mb-5 font-mono text-[9px] uppercase tracking-[.18em] text-muted-foreground">SVC // {capability.variant}</p>
              <h3 className={`text-lg font-semibold ${VARIANT_TEXT[capability.variant]}`}>
                {capability.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {capability.outcome}
              </p>
              <ul className="mt-5 space-y-2 border-t border-border pt-5">
                {capability.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-foreground/80">
                    <span className="text-engineering/60">+</span>{item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
