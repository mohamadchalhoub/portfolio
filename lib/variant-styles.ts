// Single source of truth for the small set of category-accent Tailwind
// classes used across Capabilities, Toolbox, ProjectCase and Security —
// previously duplicated verbatim in more than one component.
export type AccentVariant = "engineering" | "security" | "creative";

export const VARIANT_TEXT: Record<AccentVariant, string> = {
  engineering: "text-engineering",
  security: "text-security",
  creative: "text-creative",
};

export const VARIANT_BORDER_TOP: Record<AccentVariant, string> = {
  engineering: "border-t-engineering",
  security: "border-t-security",
  creative: "border-t-creative",
};

export const VARIANT_BORDER_HOVER: Record<AccentVariant, string> = {
  engineering: "hover:border-engineering",
  security: "hover:border-security",
  creative: "hover:border-creative",
};

export const VARIANT_DOT: Record<AccentVariant, string> = {
  engineering: "bg-engineering",
  security: "bg-security",
  creative: "bg-creative",
};
