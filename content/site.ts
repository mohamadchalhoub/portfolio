// Single source of truth for site-wide identity, contact info and the
// "secure systems" palette. Tailwind config and the 3D layer both read
// PALETTE from here so colors never drift between CSS and WebGL.

export const PALETTE = {
  background: "#09091E",
  surface: "#0E1030",
  ink: "#E8EDF5",
  muted: "#8899CC",
  // Primary interactive accent — buttons, links, focus rings, the 3D core's
  // emissive color. Kept singular on purpose (one restrained accent) rather
  // than spreading equal weight across every category color.
  engineering: "#00D4C8",
  // Category tags only, not used for primary UI chrome.
  security: "#FFB547",
  creative: "#806BFF",
} as const;

export const SITE = {
  name: "Mohamad Chalhoub",
  title: "Mohamad Chalhoub | Software Engineer & Security Specialist",
  description:
    "Mohamad Chalhoub designs and engineers secure web applications and reliable full-stack digital products.",
  url: "https://mohamadchalhoub.com",
  linkedin: "https://www.linkedin.com/in/mohamad-chalhoub-91851126b",
} as const;

export const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "capabilities", label: "Capabilities" },
  { id: "work", label: "Work" },
  { id: "security", label: "Security" },
  { id: "contact", label: "Contact" },
] as const;
