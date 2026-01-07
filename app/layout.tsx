import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "儿童识字生成器",
  description: "基于 AI 的儿童识字学习材料生成工具",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
