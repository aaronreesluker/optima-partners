import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Optima Partners — Regulatory & Cybersecurity Advisory";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "88px",
          backgroundColor: "#FFFFFF",
          color: "#151817",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 24,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#123C44",
          }}
        >
          Regulatory &amp; Cybersecurity Advisory
        </div>
        <div style={{ fontSize: 88, marginTop: 28, fontWeight: 600 }}>
          Optima Partners
        </div>
        <div
          style={{
            width: 1024,
            height: 1,
            backgroundColor: "#E7E9E8",
            marginTop: 40,
          }}
        />
        <div style={{ fontSize: 30, marginTop: 40, color: "#6E7573" }}>
          Regulatory confidence for institutions that cannot afford ambiguity.
        </div>
      </div>
    ),
    { ...size },
  );
}
