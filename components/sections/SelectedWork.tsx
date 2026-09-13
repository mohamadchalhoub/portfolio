import { AlertTriangle, ArrowRight, Bug, KeyRound, ShieldCheck } from "lucide-react";
import { PROJECTS } from "@/content/projects";
import { Reveal } from "@/components/Reveal";
import { ProjectCase } from "./ProjectCase";
import { SectionShell } from "./SectionShell";

const primary = PROJECTS.filter((project) =>
  ["kidscorner", "abdul-kader-al-bay", "awtad"].includes(project.slug),
);

const bugClasses = [
  ["Authorization", "Access-control and object-level permission issues", KeyRound],
  ["Session security", "Login, token and session lifecycle weaknesses", ShieldCheck],
  ["Input handling", "Validation issues that can expose unsafe behavior", Bug],
  ["Configuration", "Headers, policy and deployment hardening gaps", AlertTriangle],
];

export function SelectedWork() {
  return (
    <SectionShell id="work">
      <Reveal>
        <h2 id="work-heading" className="max-w-2xl text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Evidence of how I think,
          <br />
          <span className="text-muted-foreground">and what I have shipped.</span>
        </h2>
        <p className="mt-5 max-w-xl text-muted-foreground">
          Selected client projects, plus anonymized security findings presented without exposing private platforms.
        </p>
      </Reveal>

      <Reveal delayMs={80} className="mt-12">
        <section className="tech-panel relative overflow-hidden border border-engineering/20 bg-[linear-gradient(135deg,#101438,#080a1d)] p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
            <div>
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.18em] text-engineering">
                <ShieldCheck className="h-4 w-4" /> Responsible disclosure experience
              </div>
              <h3 className="mt-5 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Anonymized security findings
              </h3>
              <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
                I include bug classes and remediation thinking only at a high level. Platform names, private reports,
                proofs of concept and client-sensitive details stay confidential.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-engineering">
                Real experience, integrity-first presentation <ArrowRight className="h-4 w-4" />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {bugClasses.map(([title, text, Icon]) => (
                <article key={title as string} className="border border-white/[0.08] bg-white/[0.025] p-4">
                  <Icon className="h-4 w-4 text-engineering" />
                  <h4 className="mt-4 text-sm font-semibold text-foreground">{title as string}</h4>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">{text as string}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <div className="mt-14">
        <Reveal>
          <div className="mb-6">
            <p className="font-mono text-[10px] uppercase tracking-[.18em] text-engineering">Selected client delivery</p>
            <h3 className="mt-2 text-2xl font-semibold">Products built end-to-end</h3>
          </div>
        </Reveal>
        <div className="grid gap-5 lg:grid-cols-3">
          {primary.map((project, index) => (
            <Reveal key={project.slug} delayMs={index * 80}>
              <ProjectCase project={project} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
