import type { ProjectVariant } from "./projects";

export interface Capability {
  id: string;
  variant: ProjectVariant;
  title: string;
  outcome: string;
  items: string[];
}

export const CAPABILITIES: Capability[] = [
  {
    id: "engineering",
    variant: "engineering",
    title: "Software Engineering",
    outcome:
      "Full-stack applications that stay maintainable as they grow, from the database up to the interface.",
    items: [
      "Full-stack web applications",
      "Frontend architecture",
      "Backend systems and APIs",
      "Database design",
      "Authentication and authorization",
      "Performance and maintainability",
    ],
  },
  {
    id: "security",
    variant: "security",
    title: "Application Security",
    outcome:
      "Applications assessed and built the way an attacker would look at them, before they ship — not after.",
    items: [
      "Web application testing",
      "API security assessment",
      "Authentication and session testing",
      "Authorization and access-control review",
      "Reconnaissance and attack-surface analysis",
      "Security-conscious development",
    ],
  },
];
