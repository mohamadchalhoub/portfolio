export type ProjectVariant = "engineering" | "security" | "creative";

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  variant: ProjectVariant;
  image: string;
  imageAlt: string;
  liveUrl: string;
  problem: string;
  solution: string;
  features: string[];
  contribution: string;
  stack: string[];
  architecture: string;
  security: string;
}

// Case studies for the four shipped projects. Copy is written only from
// what already exists in this repository's own project descriptions and
// live URLs — no invented metrics, clients or functionality.
export const PROJECTS: Project[] = [
  {
    slug: "abdul-kader-al-bay",
    name: "Abdul Kader Al Bay",
    tagline: "Photography portfolio with a bilingual content workflow",
    variant: "creative",
    image: "/abdulKaderAlBayWebScreenShot.PNG",
    imageAlt: "Abdul Kader Al Bay photography portfolio homepage",
    liveUrl: "https://abdulkaderalbay.vercel.app",
    problem:
      "A working photographer needed a portfolio that could present a growing body of visual work while staying easy to update without touching code, across two languages.",
    solution:
      "A Next.js site backed by Supabase, with an admin dashboard for managing galleries and content directly, and multi-language support built into the routing and data model rather than bolted on.",
    features: [
      "Admin dashboard for publishing and organizing galleries",
      "Supabase-backed content and media storage",
      "Multi-language content delivery",
      "Responsive, image-first layout tuned for portfolio browsing",
    ],
    contribution:
      "Designed and built end-to-end: information architecture, the public site, the admin dashboard, and the Supabase schema behind both.",
    stack: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS"],
    architecture:
      "Server-rendered Next.js pages read gallery content from Supabase; an authenticated admin area writes back to the same tables, so the public site and the dashboard share one data model instead of duplicating content.",
    security:
      "Admin routes sit behind Supabase-authenticated sessions, and write access is scoped to the admin role so the public-facing pages remain read-only.",
  },
  {
    slug: "awtad",
    name: "AWTAD",
    tagline: "Steel design & engineering company website",
    variant: "engineering",
    image: "/awtadScreenShot.PNG",
    imageAlt: "AWTAD steel design and engineering website homepage",
    liveUrl: "https://awtad-website.vercel.app",
    problem:
      "AWTAD, a structural steel design and engineering firm, needed a professional web presence that communicated technical credibility to prospective clients.",
    solution:
      "A responsive Next.js and Supabase site presenting the firm's services and engineering focus with a clean, content-led layout built for clarity over decoration.",
    features: [
      "Structured service and capability pages",
      "Supabase-backed content so copy can be updated without a redeploy",
      "Responsive layout tested across desktop and mobile breakpoints",
    ],
    contribution:
      "Designed and built the full site — layout, content structure and Supabase integration.",
    stack: ["Next.js", "Supabase", "Responsive design"],
    architecture:
      "A Next.js front end renders content sourced from Supabase, keeping page structure and copy decoupled so the site's content can evolve independently of its code.",
    security:
      "Content-editing access is restricted to authenticated accounts; the public site only ever performs read queries against Supabase.",
  },
  {
    slug: "kidscorner",
    name: "KidsCorner",
    tagline: "Children's fashion e-commerce platform",
    variant: "security",
    image: "/e-commerce.PNG",
    imageAlt: "KidsCorner children's fashion e-commerce homepage",
    liveUrl: "https://kidsfashion.vercel.app",
    problem:
      "A children's fashion retailer needed a full online store — catalog, cart and checkout — plus a way to manage products, orders and inventory without a developer in the loop.",
    solution:
      "A full-stack e-commerce platform built with Next.js, TypeScript and Supabase, pairing a customer-facing storefront with an administration dashboard for day-to-day operations.",
    features: [
      "Product catalog with cart and checkout flow",
      "User authentication for customer accounts",
      "Payment processing integration",
      "Admin dashboard for products, orders and inventory",
    ],
    contribution:
      "Designed and built the storefront, the authentication and checkout flow, and the admin dashboard end-to-end.",
    stack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    architecture:
      "Next.js App Router pages handle the storefront and checkout; authenticated API routes and Supabase policies gate order and inventory writes, keeping the admin dashboard and the public store on separate trust levels.",
    security:
      "Authentication guards both checkout and the admin dashboard, sensitive operations run server-side rather than in the browser, and role checks separate customer accounts from administrative access.",
  },
];
