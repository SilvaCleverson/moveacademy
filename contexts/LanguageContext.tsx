"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "pt" | "en" | "es";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("pt");

  // Carrega o idioma do localStorage ao montar
  useEffect(() => {
    const savedLang = localStorage.getItem("moveacademy-lang") as Language | null;
    if (savedLang && (savedLang === "pt" || savedLang === "en" || savedLang === "es")) {
      setLangState(savedLang);
    }
  }, []);

  // Salva o idioma no localStorage quando muda
  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("moveacademy-lang", newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

