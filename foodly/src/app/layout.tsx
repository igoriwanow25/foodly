import 'bootstrap/dist/css/bootstrap.min.css';
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
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
