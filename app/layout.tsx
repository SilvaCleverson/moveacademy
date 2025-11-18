import type { Metadata } from "next";
import "./globals.css";
import { LanguageProviderWrapper } from "@/components/providers/LanguageProviderWrapper";
import AudioProviderWrapper from "@/components/providers/AudioProviderWrapper";
import ChristmasThemeProvider from "@/components/providers/ChristmasThemeProvider";
import Footer from "@/components/Footer";

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
      <body suppressHydrationWarning>
      <LanguageProviderWrapper>
        <AudioProviderWrapper>
          <ChristmasThemeProvider>
            {children}
            <Footer />
          </ChristmasThemeProvider>
        </AudioProviderWrapper>
      </LanguageProviderWrapper>
      </body>
    </html>
  );
}

