import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MoveAcademy · Aprenda Move",
  description: "Plataforma de ensino focada na linguagem Move para blockchains como Sui",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

