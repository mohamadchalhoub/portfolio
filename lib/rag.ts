import { aiIntegration, type ChatTurn } from "./ai-integration";

const PORTFOLIO_KNOWLEDGE = `
Mohamad Chalhoub is a Beirut-based software engineer and application-security specialist building full-stack products since 2017.

Core work:
- Full-stack product engineering with React, Next.js, TypeScript, Node.js, Express, Supabase, MySQL and MongoDB.
- Application security: web and API assessment, authentication, session and authorization review, attack-surface analysis, secure architecture, responsible disclosure and remediation guidance.
- Immersive web: Three.js, React Three Fiber, WebGL optimization and scroll-controlled experiences.

Working method: Understand, Architect, Build, Test, Secure, Deliver. Engineering and security are applied together throughout delivery.

Security experience:
- The portfolio presents anonymized vulnerability categories only. It must not name platforms, disclose private reports, expose proofs of concept, or imply permission to publish confidential findings.
- Relevant bug classes include authorization/access-control issues, session and authentication weaknesses, unsafe input handling, webhook/replay risks, and configuration or security-header gaps.
- Security claims should be framed as practical assessment and remediation experience, not as undisclosed client results or unverifiable metrics.

Selected client delivery:
- KidsCorner: e-commerce catalog, cart, authentication, checkout and administration using Next.js, Supabase, TypeScript and Tailwind CSS.
- Abdul Kader Al Bay: bilingual photography portfolio with an authenticated administration workflow using Next.js and Supabase.
- AWTAD: responsive steel engineering company website using Next.js and Supabase.

Privacy and contact:
- Repository links, direct email addresses, phone numbers, home address and downloadable CV are private and must never be disclosed or guessed.
- Visitors can contact Mohamad through the secure contact form on this website or connect through the public LinkedIn button.
- Employment specifics, rates, certifications, client metrics and confidential security findings are not confirmed. Direct those questions to Mohamad through the contact form.
`;

export class PortfolioRAG {
  public isInitialized = false;

  async initialize() {
    this.isInitialized = true;
  }

  private fallback(query: string) {
    const q = query.toLowerCase();
    if (/github|repo|source|phone|email|address|resume|\bcv\b/.test(q)) {
      return "Those details are kept private. You can review the public case studies here or contact Mohamad through the secure form in the Contact section.";
    }
    if (/contact|hire|available|price|rate|budget|work together|start/.test(q)) {
      return "Use the secure contact form near the bottom of the portfolio. Share the product, current stage, expected timeline, and where you need engineering or security support; Mohamad will reply privately.";
    }
    if (/bug|finding|vulnerab|security|cyber|pentest|owasp|auth|session|authorization|research/.test(q)) {
      return "Mohamad presents security experience as anonymized bug classes only: authorization and access-control issues, session/authentication weaknesses, unsafe input handling, replay risks, and configuration hardening gaps. Platform names, private reports and proofs of concept are intentionally not disclosed.";
    }
    if (/project|work|case|build/.test(q)) {
      return "The public work section highlights KidsCorner, Abdul Kader Al Bay and AWTAD as selected end-to-end deliveries, alongside anonymized application-security findings that show security thinking without exposing private platforms.";
    }
    if (/skill|stack|technolog|next|react|node|supabase|3d|webgl/.test(q)) {
      return "Mohamad works across Next.js, React, TypeScript, Node.js, Supabase and relational/data architecture, with application-security testing built into delivery. He also creates performance-conscious WebGL experiences using Three.js and React Three Fiber.";
    }
    return "I can help you understand Mohamad's engineering capabilities, security approach, selected client work, anonymized vulnerability experience, or how to start a project. What would you like to explore?";
  }

  async generateComprehensiveResponse(query: string, history: ChatTurn[] = []) {
    try {
      const reply = await aiIntegration.generatePortfolioResponse(query, PORTFOLIO_KNOWLEDGE, history);
      if (reply) return reply;
    } catch (error) {
      console.error("Portfolio assistant provider error", error instanceof Error ? error.message : "Unknown provider error");
    }
    return this.fallback(query);
  }
}

export const portfolioRAG = new PortfolioRAG();
