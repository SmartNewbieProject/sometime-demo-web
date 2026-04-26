import type { Metadata, Viewport } from "next";
import { Inter, Geist } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import "./globals.css";
import { cn } from "@/shared/lib/utils";
import { QueryProvider } from "@/shared/lib/query-provider";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SOMETIME · 같은 학교, 진짜 인연",
  description:
    "AI 썸메이트와 가입 없이 먼저 대화해보세요. 같은 학교 사람과 자연스럽게 매칭되는 캠퍼스 데이팅 데모.",
  metadataBase: new URL("https://sometime-demo.vercel.app"),
  openGraph: {
    title: "SOMETIME · 같은 학교, 진짜 인연",
    description: "AI 썸메이트와 가입 없이 먼저 대화해보세요",
    type: "website",
    locale: "ko_KR",
    images: [{ url: "/api/og", width: 1200, height: 630, alt: "SOMETIME" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SOMETIME · 같은 학교, 진짜 인연",
    description: "AI 썸메이트와 가입 없이 먼저 대화해보세요",
    images: ["/api/og"],
  },
};

export const viewport: Viewport = {
  themeColor: "#7E5BEF",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className={cn("h-full", "antialiased", inter.variable, "font-sans", geist.variable)}>
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <QueryProvider>{children}</QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
