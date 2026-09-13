import { HeroCoreFallback } from "./HeroCoreFallback";
import { SecurityConsole } from "./SecurityConsole";

/** Hero's own bounded 3D box now only needs to hold a visual under
 * prefers-reduced-motion: when the fixed cinematic layer
 * (components/experience/) is mounted, it already renders the same core
 * large across the page, so this box stays an empty, transparent spacer
 * and lets that layer show through behind the hero text. Under reduced
 * motion the cinematic layer never mounts at all, so this static SVG
 * becomes the one visual here — rendered directly (no WebGL/GLB lazy
 * chunk) since a static fallback never needs the 3D bundle in the first
 * place. */
export function HeroVisual() {
  return (
    <>
      <div className="h-full w-full motion-safe:hidden" aria-hidden="true">
        <HeroCoreFallback />
      </div>
      <div className="hidden h-full w-full motion-safe:block">
        <SecurityConsole />
      </div>
    </>
  );
}
