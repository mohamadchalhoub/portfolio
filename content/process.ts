export interface ProcessStep {
  id: string;
  order: number;
  title: string;
  description: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: "understand",
    order: 1,
    title: "Understand",
    description:
      "Start with the problem, not the tech. Clarify what the product needs to do, who it serves, and what 'done' actually looks like.",
  },
  {
    id: "architect",
    order: 2,
    title: "Architect",
    description:
      "Design the data model, the API surface, and the trust boundaries together — authentication and authorization are decided at this stage, not bolted on later.",
  },
  {
    id: "build",
    order: 3,
    title: "Build",
    description:
      "Implement in typed, componentized code with content and presentation kept apart, so the product stays easy to extend after launch.",
  },
  {
    id: "test",
    order: 4,
    title: "Test",
    description:
      "Verify behavior across devices and edge cases, not just the happy path — including how the interface degrades without JavaScript or WebGL.",
  },
  {
    id: "secure",
    order: 5,
    title: "Secure",
    description:
      "Review the same application from an attacker's perspective: input handling, session management, access control, and the server-side validation that backs every client-side check.",
  },
  {
    id: "deliver",
    order: 6,
    title: "Deliver",
    description:
      "Ship something that performs, reads clearly, and holds up — with the reasoning behind each decision documented, not just the code.",
  },
];
