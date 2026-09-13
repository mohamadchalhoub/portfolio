import { ImageResponse } from "next/server";
import { PALETTE, SITE } from "@/content/site";

export const runtime = "edge";
export const alt = SITE.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: PALETTE.background,
          color: PALETTE.ink,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", gap: "12px", marginBottom: "36px" }}>
          <div style={{ width: "48px", height: "6px", background: PALETTE.engineering }} />
          <div style={{ width: "48px", height: "6px", background: PALETTE.security }} />
          <div style={{ width: "48px", height: "6px", background: PALETTE.creative }} />
        </div>
        <div style={{ display: "flex", fontSize: 64, fontWeight: 600, lineHeight: 1.15 }}>
          {SITE.name}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "24px",
            fontSize: 32,
            color: PALETTE.muted,
            maxWidth: "900px",
          }}
        >
          Software Engineer, Creative Developer &amp; Security Researcher
        </div>
      </div>
    ),
    { ...size }
  );
}
