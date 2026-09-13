/** Shared "readable surface" classes for text that sits in front of the
 * fixed cinematic 3D layer (see components/experience/). Applied by
 * SectionShell to every section that uses it, and by hand in Hero.tsx
 * (which doesn't go through SectionShell) — kept in one place so both
 * stay in sync and legibility never depends on what the 3D scene behind
 * them happens to be doing. */
export const SCRIM_CLASSES = "bg-background/55 backdrop-blur-md rounded-2xl border border-white/[0.06] shadow-[0_24px_80px_rgba(0,0,0,.18)]";
