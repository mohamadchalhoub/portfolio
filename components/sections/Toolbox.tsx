import { TOOLBOX_GROUPS } from "@/content/toolbox";
import { Reveal } from "@/components/Reveal";
import { SectionShell } from "./SectionShell";

export function Toolbox() {
  return (
    <SectionShell id="toolbox">
      <Reveal>
        <h2
          id="toolbox-heading"
          className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
        >
          Technical Toolbox
        </h2>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Grouped by domain, not stacked as a wall of logos.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {TOOLBOX_GROUPS.map((group, index) => (
          <Reveal key={group.id} delayMs={index * 100} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-6 transition-colors hover:border-engineering/20 hover:bg-engineering/[0.025]">
            <h3 className="font-mono text-xs uppercase tracking-wider text-engineering">
              {group.title}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-white/[0.08] bg-[#090a21]/70 px-2.5 py-1 text-xs text-foreground/80 transition-colors hover:border-engineering/25 hover:text-engineering"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
