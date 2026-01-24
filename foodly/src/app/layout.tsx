import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Foodly",
  description: "Intelligent Recipe Extractor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
