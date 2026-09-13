export interface SecurityCapability {
  id: string;
  title: string;
}

export const SECURITY_CAPABILITIES: SecurityCapability[] = [
  { id: "pentest", title: "Web and API penetration testing" },
  { id: "recon", title: "Reconnaissance" },
  { id: "attack-surface", title: "Attack-surface analysis" },
  { id: "auth-session", title: "Authentication and session assessment" },
  { id: "authorization", title: "Authorization testing" },
  { id: "input-validation", title: "Input-validation testing" },
  { id: "owasp", title: "Common OWASP vulnerability classes" },
  { id: "reporting", title: "Security reporting and remediation guidance" },
  { id: "architecture", title: "Secure application architecture" },
];

export const SECURITY_INTRO =
  "Alongside client work, I conduct independent security research and participate in bug-bounty programs on public disclosure platforms, following responsible-disclosure practices: findings go to the affected organization first, on their terms, before anything is made public.";

export const SECURITY_METHOD_NOTE =
  "Specific findings and the organizations involved stay confidential, in line with responsible disclosure. What's demonstrable is the methodology: systematic reconnaissance, structured testing against authentication, authorization and input handling, and remediation guidance written for the team that has to act on it.";
