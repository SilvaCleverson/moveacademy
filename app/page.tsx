"use client";

import { useState } from "react";

const badgeText = {
  pt: "EM CONSTRUÇÃO",
  en: "UNDER CONSTRUCTION",
  es: "EN CONSTRUCCIÓN",
};

const content = {
  pt: {
    title: "Aprenda Move com trilhas guiadas e desafios de código.",
    subtitle: (
      <>
        Plataforma de ensino focada na linguagem <span className="highlight">Move</span> para
        blockchains como <span className="highlight">Sui</span>, com trilhas interativas,
        exercícios práticos e feedback em tempo real.
      </>
    ),
    tagline: (
      <>
        Em breve aqui em <strong>moveacademy.site</strong> — começando pelo básico até projetos on-chain.
      </>
    ),
  },
  en: {
    title: "Learn Move with guided tracks and real code challenges.",
    subtitle: (
      <>
        An education platform focused on the <span className="highlight">Move</span> language for
        blockchains like <span className="highlight">Sui</span>, with interactive paths,
        hands-on exercises and real-time feedback.
      </>
    ),
    tagline: (
      <>
        Coming soon at <strong>moveacademy.site</strong> — from the basics to on-chain projects.
      </>
    ),
  },
  es: {
    title: "Aprende Move con rutas guiadas y desafíos de código.",
    subtitle: (
      <>
        Plataforma de aprendizaje centrada en el lenguaje <span className="highlight">Move</span>
        para cadenas como <span className="highlight">Sui</span>, con rutas interactivas,
        ejercicios prácticos y retroalimentación en tiempo real.
      </>
    ),
    tagline: (
      <>
        Muy pronto en <strong>moveacademy.site</strong> — desde lo básico hasta proyectos on-chain.
      </>
    ),
  },
};

export default function Home() {
  const [lang, setLang] = useState<"pt" | "en" | "es">("pt");

  const handleLangChange = (newLang: "pt" | "en" | "es") => {
    setLang(newLang);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 sm:p-4 bg-gradient-deep-night text-[#E5E7EB]">
      <div className="max-w-[760px] w-full flex items-center justify-center">
        <main className="w-full bg-gradient-to-br from-[rgba(74,222,128,0.18)] via-transparent to-[rgba(106,215,229,0.22)] bg-[rgba(15,23,42,0.96)] rounded-[28px] sm:rounded-[22px] p-[26px] sm:p-5 sm:px-[18px] border border-[rgba(106,215,229,0.45)] shadow-[0_26px_70px_rgba(0,0,0,0.75)] relative overflow-hidden">
          <div className="absolute top-4 right-4 z-10">
            <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-[rgba(234,179,8,0.25)] border border-[rgba(234,179,8,0.5)] text-[#FCD34D] text-[10px] font-semibold tracking-wider uppercase shadow-[0_4px_12px_rgba(234,179,8,0.3)]">
              🧪 Site de Homologação
            </div>
          </div>
          <div className="flex justify-between items-center mb-3 gap-4">
            <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-[rgba(15,118,110,0.2)] text-[#A7F3D0] text-[11px] tracking-widest uppercase">
              {badgeText[lang]}
            </div>
            <div className="inline-flex p-0.5 rounded-full bg-[rgba(15,23,42,0.9)] border border-[rgba(148,163,184,0.65)] gap-0.5">
              <button
                onClick={() => handleLangChange("pt")}
                className={`px-2.5 py-1 rounded-full text-[11px] tracking-wider uppercase transition-all ${
                  lang === "pt"
                    ? "bg-gradient-sui-move text-[#020617] font-semibold"
                    : "bg-transparent text-[#9CA3AF] hover:text-[#E5E7EB]"
                }`}
              >
                PT
              </button>
              <button
                onClick={() => handleLangChange("en")}
                className={`px-2.5 py-1 rounded-full text-[11px] tracking-wider uppercase transition-all ${
                  lang === "en"
                    ? "bg-gradient-sui-move text-[#020617] font-semibold"
                    : "bg-transparent text-[#9CA3AF] hover:text-[#E5E7EB]"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => handleLangChange("es")}
                className={`px-2.5 py-1 rounded-full text-[11px] tracking-wider uppercase transition-all ${
                  lang === "es"
                    ? "bg-gradient-sui-move text-[#020617] font-semibold"
                    : "bg-transparent text-[#9CA3AF] hover:text-[#E5E7EB]"
                }`}
              >
                ES
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-2 mt-0.5">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center relative overflow-hidden"
              style={{
                background:
                  "radial-gradient(circle at 30% 20%, #FFFFFF 0, rgba(255,255,255,0.15) 18%, transparent 60%), radial-gradient(circle at 80% 80%, rgba(63,254,149,0.65), transparent 60%), radial-gradient(circle at 20% 80%, rgba(106,215,229,0.85), transparent 55%), #0F233E",
                boxShadow:
                  "0 0 0 1px rgba(148,163,184,0.5), 0 14px 40px rgba(0,0,0,0.85)",
              }}
              aria-hidden="true"
            >
              <div
                className="absolute w-[58%] h-[58%] rounded-full border-2 border-[rgba(226,232,240,0.75)] border-t-transparent border-r-transparent"
                style={{ transform: "rotate(-28deg)" }}
              />
            </div>
            <div>
              <div className="text-[26px] sm:text-[22px] font-bold tracking-wide bg-gradient-to-r from-sui-blue to-sui-cyan bg-clip-text text-transparent">
                MoveAcademy
              </div>
              <div className="text-xs text-[#9CA3AF] tracking-widest uppercase -mt-0.5">
                MOVE · SUI · LEARN
              </div>
            </div>
          </div>

          <section className="mt-2.5">
            <h1 className="text-[22px] sm:text-[19px] font-semibold text-[#F9FAFB] mb-2.5">
              {content[lang].title}
            </h1>
            <p className="text-sm text-[#CBD5F5] leading-relaxed mb-4.5">
              {content[lang].subtitle}
            </p>
            <p className="text-[13px] text-[#A5B4FC] mb-4.5">{content[lang].tagline}</p>
          </section>

          <div className="flex flex-wrap gap-2.5 items-center mb-1.5">
            <button
              disabled
              className="rounded-full px-[18px] py-2.5 text-[13px] font-semibold cursor-default bg-gradient-sui-move text-[#020617] shadow-[0_10px_30px_rgba(0,0,0,0.55)]"
            >
              🚧 Plataforma em construção
            </button>
            <div className="text-[11px] text-[#9CA3AF]">
              Focada em <strong className="text-[#E5E7EB] font-medium">Move</strong>, inspirada pela{" "}
              <strong className="text-[#E5E7EB] font-medium">Sui</strong>.
            </div>
          </div>

          <p className="mt-3 text-[11px] text-[#6B7280]">
            MoveAcademy · identidade visual inspirada no ecossistema{" "}
            <span className="text-[#A5B4FC]">Sui</span> — feita para builders que querem aprender
            Move.
          </p>
        </main>
      </div>
    </div>
  );
}

