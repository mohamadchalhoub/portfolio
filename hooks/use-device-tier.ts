"use client";

import * as React from "react";

export type DeviceTier = "full" | "reduced";

function computeTier(): DeviceTier {
  if (typeof window === "undefined") return "full";
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  return coarsePointer || window.innerWidth < 768 ? "reduced" : "full";
}

/** Cheap, one-shot device-capability check for the cinematic 3D layer —
 * touch/narrow-viewport devices get a lighter render (lower dpr, no
 * ContactShadows, sparser procedural geometry) rather than the full
 * desktop-tier scene. Re-evaluated on resize (debounced) so rotating a
 * tablet or resizing a window updates it. */
export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = React.useState<DeviceTier>(computeTier);

  React.useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => setTier(computeTier()), 200);
    };
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return tier;
}
