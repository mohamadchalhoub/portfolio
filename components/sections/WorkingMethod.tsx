import { PROCESS_STEPS } from "@/content/process";
import { Reveal } from "@/components/Reveal";
import { SectionShell } from "./SectionShell";

export function WorkingMethod() {
  return (
    <SectionShell id="method">
      <Reveal>
        <h2 id="method-heading" className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Working Method
        </h2>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Engineering, design and security are handled together at every
          stage, not treated as separate hand-offs.
        </p>
      </Reveal>

      <div className="mt-12 divide-y divide-border border-y border-border">
        {PROCESS_STEPS.map((step) => (
          <details key={step.id} className="group rounded-xl px-3 py-5 transition-colors open:bg-white/[0.025] hover:bg-white/[0.02]">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
              <span className="flex items-center gap-4">
                <span className="grid h-8 w-8 place-items-center rounded-md border border-engineering/15 bg-engineering/[0.04] font-mono text-xs text-engineering">
                  {String(step.order).padStart(2, "0")}
                </span>
                <span className="text-base font-medium text-foreground sm:text-lg">{step.title}</span>
              </span>
              <span
                className="font-mono text-muted-foreground transition-transform group-open:rotate-45"
                aria-hidden="true"
              >
                +
              </span>
            </summary>
            <p className="mt-4 max-w-2xl pl-12 text-sm leading-relaxed text-muted-foreground">
              {step.description}
            </p>
          </details>
        ))}
      </div>
    </SectionShell>
  );
}
