"use client";

import { useEffect, useState } from "react";
import { NAV_ITEMS, SITE } from "@/content/site";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full border-b transition-colors duration-300 ${
        isScrolled
          ? "border-border/80 bg-background/85 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <a
          href="#top"
          aria-label={SITE.name}
          className="flex min-w-0 items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-foreground"
          onClick={() => setIsMenuOpen(false)}
        >
          <span className="relative grid h-9 w-9 place-items-center border border-engineering/35 bg-engineering/[0.06] font-mono text-[10px] font-semibold tracking-normal text-engineering">
            MC<i className="absolute -right-px -top-px h-2 w-2 border-r border-t border-engineering"/>
          </span>
          <span className="hidden min-[390px]:inline sm:hidden">Mohamad</span>
          <span className="hidden sm:inline">{SITE.name}</span>
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-engineering"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href="#contact"
            className="rounded-sm border border-border px-4 py-2 text-sm text-foreground transition-colors hover:border-engineering hover:text-engineering"
          >
            Start a Project
          </a>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="flex h-9 w-9 items-center justify-center text-foreground md:hidden"
        >
          <div className="flex h-4 w-5 flex-col justify-between">
            <span
              className={`h-px w-full bg-current transition-transform duration-300 ${
                isMenuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-full bg-current transition-opacity duration-300 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`h-px w-full bg-current transition-transform duration-300 ${
                isMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Mobile"
        aria-hidden={!isMenuOpen}
        // React 18's types (and its runtime attribute whitelist) don't know
        // about the `inert` HTML attribute yet, so a real boolean gets
        // dropped with a console warning instead of being applied — passing
        // a string instead makes it land on the DOM node correctly.
        {...({ inert: isMenuOpen ? undefined : "" } as Record<string, string | undefined>)}
        className={`overflow-hidden border-t border-border/60 bg-background/95 backdrop-blur-md transition-[max-height,visibility] duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "visible max-h-96" : "invisible max-h-0"
        }`}
      >
        <ul className="container mx-auto flex flex-col px-6 py-4">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setIsMenuOpen(false)}
                className="block py-3 text-sm text-muted-foreground transition-colors hover:text-engineering"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="mt-2 block py-3 text-sm font-medium text-engineering"
            >
              Start a Project
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
