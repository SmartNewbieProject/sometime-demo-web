import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SOMETIME",
    short_name: "SOMETIME",
    description: "같은 학교, 진짜 인연 — AI 썸메이트 데모",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#7E5BEF",
    icons: [
      { src: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
    ],
  };
}
