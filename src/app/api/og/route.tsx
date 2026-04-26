import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const locale = searchParams.get("locale") ?? "ko";
  const title = locale === "ja" ? "同じ大学、本物の出会い" : "같은 학교, 진짜 인연";
  const sub =
    locale === "ja"
      ? "AIそメイトと話してみよう"
      : "AI 썸메이트와 가입 없이 먼저 대화해보세요";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "linear-gradient(135deg, #FFFFFF 0%, #F5F1FF 100%)",
          fontFamily: "system-ui",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 32,
              fontWeight: 600,
              color: "#7E5BEF",
              letterSpacing: 4,
            }}
          >
            SOMETIME
          </div>
          <div
            style={{
              fontSize: 88,
              fontWeight: 800,
              color: "#0A0A0F",
              marginTop: 32,
              lineHeight: 1.1,
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 28, color: "#6B6B7B", marginTop: 24 }}>{sub}</div>
        </div>
        <div style={{ fontSize: 22, color: "#8B8B97" }}>
          가입 없이 체험 · sometime-demo.vercel.app
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
