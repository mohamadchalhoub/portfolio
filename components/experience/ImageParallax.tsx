"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const MAX_SCALE_DELTA = 0.06;

/** Grows its child slightly as it crosses the viewport center (scroll-
 * scrubbed via GSAP ScrollTrigger) and lets it settle back down — the
 * "layered image depth" effect for Selected Work, done on the existing
 * next/image markup so next/image optimization and the card's own
 * clickable target are untouched.
 *
 * Deliberately 2D-only (scale, no `translateZ`/`perspective`): an earlier
 * version used a real CSS 3D transform here, and — because this page also
 * has a fixed, always-mounted WebGL canvas behind everything
 * (components/experience/Experience.tsx) — that combination produced a
 * compositor bug where the canvas visually bled through on top of these
 * images despite correct DOM stacking (confirmed via
 * document.elementsFromPoint, which reported the image on top; only the
 * painted pixels were wrong). Two real, GPU-composited 3D contexts
 * sharing the same screen region is a known trouble spot across browser
 * compositors, so the fix is to just not create a second one here. */
export function ImageParallax({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        const depth = Math.sin(self.progress * Math.PI);
        gsap.set(el, { scale: 1 + depth * MAX_SCALE_DELTA, force3D: false });
      },
    });

    return () => trigger.kill();
  }, [prefersReducedMotion]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
