import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

const WIDTH = 1200;
const HEIGHT = 630;

function trimText(value: string, max: number) {
  if (!value) return "";
  return value.length > max ? `${value.slice(0, max - 1)}…` : value;
}

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams;
  const kind = search.get("kind") === "profile" ? "profile" : "blog";

  const title = trimText(search.get("title") ?? "Ethioweb", 90);
  const subtitle = trimText(search.get("subtitle") ?? "Digital Presence Platform", 140);
  const tag = kind === "profile" ? "Public Profile" : "Blog Article";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(circle at 20% 20%, rgba(102,195,255,0.28), transparent 45%), radial-gradient(circle at 80% 75%, rgba(243,178,95,0.24), transparent 38%), linear-gradient(135deg, #09152b 0%, #102343 48%, #162f57 100%)",
          color: "#edf4ff",
          padding: "56px 64px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "#66c3ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#09152b",
              fontWeight: 900,
              fontSize: "24px",
            }}
          >
            E
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "20px", fontWeight: 700 }}>Ethioweb</span>
            <span style={{ fontSize: "14px", opacity: 0.84 }}>{tag}</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <h1
            style={{
              margin: 0,
              fontSize: "62px",
              lineHeight: 1.05,
              fontWeight: 900,
              maxWidth: "100%",
            }}
          >
            {title}
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: "30px",
              lineHeight: 1.35,
              opacity: 0.9,
              maxWidth: "92%",
            }}
          >
            {subtitle}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "20px",
            opacity: 0.88,
          }}
        >
          <span>ethioweb.net</span>
          <span>Build your digital identity</span>
        </div>
      </div>
    ),
    {
      width: WIDTH,
      height: HEIGHT,
    },
  );
}