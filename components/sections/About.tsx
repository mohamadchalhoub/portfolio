import Image from "next/image";
import { ABOUT } from "@/content/about";
import { Reveal } from "@/components/Reveal";
import { SectionShell } from "./SectionShell";

export function About() {
  return (
    <SectionShell id="about">
      <div className="grid gap-12 md:grid-cols-[2fr_1fr] md:items-start">
        <Reveal>
          <h2
            id="about-heading"
            className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            {ABOUT.heading}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {ABOUT.bio}
          </p>
        </Reveal>

        <Reveal delayMs={100}>
          <div className="relative mb-6 aspect-square w-full max-w-[220px] overflow-hidden rounded-sm border border-engineering/20 bg-[#090b24] shadow-[0_20px_60px_rgba(0,0,0,.28)]">
            <Image
              src="/profile.jpg"
              alt="Portrait of Mohamad Chalhoub"
              fill
              sizes="220px"
              className="object-cover object-center"
              priority
            />
          </div>
          <dl className="space-y-5 border-t border-border pt-6 text-sm md:border-t-0 md:border-l md:pl-8 md:pt-0">
            <div>
              <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Based in
              </dt>
              <dd className="mt-1 text-foreground">{ABOUT.facts.location}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Active since
              </dt>
              <dd className="mt-1 text-foreground">{ABOUT.facts.activeSince}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Languages
              </dt>
              <dd className="mt-1 text-foreground">{ABOUT.facts.languages.join(" · ")}</dd>
            </div>
          </dl>
        </Reveal>
      </div>

      <Reveal delayMs={180}>
        <div className="mt-12 grid grid-cols-2 overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02] lg:grid-cols-4">
          {[
            ["2017", "Building products since"],
            ["04", "Shipped case studies"],
            ["02", "Engineering disciplines"],
            ["03", "Working languages"],
          ].map(([value,label],index)=><div key={label} className={`p-5 sm:p-6 ${index%2!==1 ? "border-r border-white/[0.08]" : ""} ${index<2 ? "border-b border-white/[0.08] lg:border-b-0" : ""} ${index===1 ? "lg:border-r" : ""}`}>
            <p className="font-mono text-2xl font-semibold text-engineering">{value}</p><p className="mt-1 text-xs text-muted-foreground">{label}</p>
          </div>)}
        </div>
      </Reveal>
    </SectionShell>
  );
}
