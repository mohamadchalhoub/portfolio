import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SCRIM_CLASSES } from "@/lib/scrim";

interface SectionShellProps {
  id: string;
  className?: string;
  containerClassName?: string;
  /** Wraps the content in a readable scrim so text stays legible over the
   * fixed cinematic 3D layer behind it (see components/experience/). True
   * by default; pass false only where a section deliberately lets the
   * scene show through unobstructed. */
  scrim?: boolean;
  children: ReactNode;
}

/** Shared section wrapper — the `<section aria-labelledby><div class="container">`
 * shell every section on the page needs, previously copy-pasted six times.
 * Each section still owns its own `<h2 id={`${id}-heading`}>`. */
export function SectionShell({
  id,
  className,
  containerClassName,
  scrim = true,
  children,
}: SectionShellProps) {
  const labels: Record<string, string> = { about:"01 /// PROFILE", capabilities:"02 /// CAPABILITIES", toolbox:"03 /// STACK", work:"04 /// SELECTED_WORK", security:"05 /// APPLICATION_SECURITY", method:"06 /// DELIVERY_PROTOCOL", contact:"07 /// SECURE_CHANNEL" };
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={cn("relative py-20 sm:py-28", className)}>
      <div className={cn("container mx-auto px-6", containerClassName)}>
        <div className={cn(scrim && `${SCRIM_CLASSES} p-6 sm:p-8 md:p-12`)}>
          {labels[id] && <p className="mb-7 font-mono text-[10px] uppercase tracking-[0.2em] text-engineering">{labels[id]}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}
