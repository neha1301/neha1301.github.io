import { ImageResponse } from "next/og";

import { site } from "@/config/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08090b",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Accent glow */}
        <div
          style={{
            position: "absolute",
            top: -180,
            left: 220,
            width: 760,
            height: 460,
            borderRadius: 999,
            background:
              "radial-gradient(ellipse at center, rgba(74,222,155,0.22), rgba(8,9,11,0) 70%)",
          }}
        />

        {/* Top row */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.14)",
              background: "#0e1116",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m4 17 6-6-6-6" stroke="#4ade9b" />
              <path d="M12 19h8" stroke="#8b7cf6" />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#e8ebef", fontSize: 26, fontWeight: 600 }}>
              {site.name}
            </span>
            <span style={{ color: "#98a1ae", fontSize: 19 }}>
              {site.location}
            </span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              color: "#e8ebef",
              fontSize: 66,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
              maxWidth: 900,
            }}
          >
            Engineering Reliable Systems.
          </span>
          <span
            style={{
              color: "#4ade9b",
              fontSize: 66,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
            }}
          >
            Building for Scale.
          </span>
          <span
            style={{
              marginTop: 26,
              color: "#98a1ae",
              fontSize: 25,
              maxWidth: 880,
            }}
          >
            Site Reliability Engineer · DevOps Engineer · Platform Engineering
          </span>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          {[
            "Open to opportunities",
            "Kubernetes · AWS · GCP",
            "Prometheus · Grafana",
            "AI-assisted debugging",
          ].map((chip) => (
            <div
              key={chip}
              style={{
                display: "flex",
                border: "1px solid rgba(255,255,255,0.13)",
                background: "#0e1116",
                color: "#98a1ae",
                borderRadius: 999,
                padding: "9px 18px",
                fontSize: 18,
              }}
            >
              {chip}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
