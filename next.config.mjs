// A strict nonce-based script-src would force every page to render
// dynamically per request (next/headers' headers() inside a layout opts out
// of static generation) purely to thread the nonce through — a real cost
// against this site's own performance targets. This codebase has no
// dangerouslySetInnerHTML with user-controlled content (the one use, in
// app/layout.tsx, renders only our own static JSON-LD), so the inline-script
// XSS surface a nonce would close is already effectively closed. A static
// CSP that keeps 'unsafe-inline' for script-src (required for Next's own
// inline hydration/RSC-streaming scripts, which can't be pre-hashed) while
// locking down everything else — no plugins, no framing, no foreign
// script/connect origins — is the better trade-off here.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    // Frame-ancestors/X-Frame-Options block the page from rendering inside
    // any embedded preview (VS Code's Simple Browser, a webview, an iframe-
    // based tool) — fine for the deployed site, actively hostile to local
    // development, where those previews are exactly how you'd check your
    // work. Security headers are a production concern; only ship them then.
    if (process.env.NODE_ENV !== "production") {
      return [];
    }

    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Content-Security-Policy", value: csp },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
