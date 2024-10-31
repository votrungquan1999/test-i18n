import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Test I18N",
  description: "Test I18N",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
