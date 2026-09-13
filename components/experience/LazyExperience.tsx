"use client";

import dynamic from "next/dynamic";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { useDeviceTier } from "@/hooks/use-device-tier";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const Experience = dynamic(() => import("./Experience").then((m) => m.Experience), {
  ssr: false,
});

/** Public entry point for the fixed cinematic 3D layer. Never mounts under
 * prefers-reduced-motion — every section already renders its full content
 * without it, so "no 3D" is a complete, accessible fallback rather than a
 * degraded one. If WebGL/the GLB throws after mounting, the ErrorBoundary
 * silently drops the layer instead of taking the page down with it. */
export function LazyExperience() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const deviceTier = useDeviceTier();

  if (prefersReducedMotion) return null;

  return (
    <ErrorBoundary fallback={null}>
      <Experience deviceTier={deviceTier} />
    </ErrorBoundary>
  );
}
