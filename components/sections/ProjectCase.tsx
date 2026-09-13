import Image from "next/image";
import { Check } from "lucide-react";
import type { Project } from "@/content/projects";
import { ImageParallax } from "@/components/experience/ImageParallax";
import { VARIANT_TEXT } from "@/lib/variant-styles";

export function ProjectCase({ project, index }: { project: Project; index: number }) {
  return (
    <article className="group tech-panel relative flex h-full flex-col overflow-hidden border border-white/[0.08] bg-card/90 transition-all duration-500 hover:-translate-y-1 hover:border-engineering/30 hover:shadow-[0_22px_70px_rgba(0,0,0,.26),0_0_36px_rgba(0,212,200,.05)]">
      <i className="pointer-events-none absolute left-3 top-3 z-20 h-3 w-3 border-l border-t border-engineering/45" />
      <i className="pointer-events-none absolute bottom-3 right-3 z-20 h-3 w-3 border-b border-r border-engineering/45" />

      <div className="relative h-44 overflow-hidden bg-[#070817] p-3">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(0,212,200,.1),transparent_62%)]" />
        <div className="relative h-full overflow-hidden border border-white/10 bg-[#0e1030] shadow-xl">
          <ImageParallax className="relative h-full overflow-hidden">
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </ImageParallax>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[9px] uppercase tracking-[.16em] text-muted-foreground">
            Case study {String(index + 1).padStart(2, "0")}
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-wider text-emerald-400">
            <i className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Shipped
          </span>
        </div>

        <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground">{project.name}</h3>
        <p className={`mt-2 text-xs font-medium ${VARIANT_TEXT[project.variant]}`}>{project.tagline}</p>
        <p className="mt-4 line-clamp-4 text-sm leading-6 text-muted-foreground">{project.solution}</p>

        <ul className="mt-5 space-y-2">
          {project.features.slice(0, 3).map((item) => (
            <li key={item} className="flex gap-2 text-xs leading-5 text-foreground/75">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-engineering" />
              {item}
            </li>
          ))}
        </ul>

        <ul className="mt-auto flex flex-wrap gap-2 pt-5" aria-label="Technology stack">
          {project.stack.slice(0, 4).map((tech) => (
            <li key={tech} className="border border-white/[0.08] bg-white/[0.025] px-2 py-1 font-mono text-[9px] text-muted-foreground">
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
