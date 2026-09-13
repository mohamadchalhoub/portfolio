import { Linkedin } from "lucide-react";
import { SITE } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="relative z-10 overflow-hidden border-t border-border bg-background pt-14 pb-10">
      <div className="container mx-auto px-6">
        <p className="pointer-events-none whitespace-nowrap text-center text-[12vw] font-bold leading-[.8] tracking-[-.07em] text-white/[0.035] select-none" aria-hidden="true">MOHAMAD</p>
      <div className="mt-10 flex flex-col items-center gap-6 border-t border-white/[0.07] pt-7 md:flex-row md:justify-between">
        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Mohamad Chalhoub on LinkedIn"
            className="text-muted-foreground transition-colors hover:text-engineering"
          >
            <Linkedin className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>
      </div>
      </div>
    </footer>
  );
}
