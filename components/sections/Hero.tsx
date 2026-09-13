import { Reveal } from "@/components/Reveal";
import { HeroVisual } from "@/components/three/HeroVisual";
import { SCRIM_CLASSES } from "@/lib/scrim";

export function Hero() {
  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      <div className="container mx-auto grid items-center gap-12 px-6 md:grid-cols-2">
        <Reveal className={`min-w-0 ${SCRIM_CLASSES} p-6 md:p-8`}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-engineering/25 bg-engineering/[0.06] px-3 py-1.5">
            <span
              className="h-1.5 w-1.5 rounded-full bg-engineering motion-safe:animate-pulse"
              aria-hidden="true"
            />
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {"/// Software engineering + application security"}
            </span>
          </div>

          <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Secure software.<br /><span className="text-engineering">Engineered to endure.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            I design and build production-grade digital products where sharp
            engineering and application security work as one discipline.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#work"
              className="inline-flex items-center justify-center rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              View selected work
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-sm border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-engineering hover:text-engineering"
            >
              Discuss your project
            </a>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Built across the full delivery surface</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Next.js", "TypeScript", "Supabase", "AppSec", "OWASP"].map((item) => (
                <span key={item} className="rounded-md border border-white/[0.08] bg-white/[0.025] px-2.5 py-1 font-mono text-[11px] text-foreground/70">{item}</span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal
          delayMs={150}
          className="relative aspect-[1.08] w-full min-w-0 max-w-xl justify-self-center"
        >
          <HeroVisual />
        </Reveal>
      </div>
    </section>
  );
}
