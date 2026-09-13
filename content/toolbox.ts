import { SECURITY_CAPABILITIES } from "./security";

export interface ToolboxGroup {
  id: string;
  title: string;
  items: string[];
}

// Concrete tools and technologies grouped by domain — deliberately not a
// wall of logos.
export const TOOLBOX_GROUPS: ToolboxGroup[] = [
  {
    id: "security",
    title: "Cybersecurity",
    items: SECURITY_CAPABILITIES.map((capability) => capability.title),
  },
  {
    id: "engineering",
    title: "Software Engineering & Development",
    items: [
      "React & Next.js",
      "Node.js & Express",
      "TypeScript / JavaScript",
      "MySQL & MongoDB",
      "Java & Android (native)",
      "Three.js / React Three Fiber",
    ],
  },
];
