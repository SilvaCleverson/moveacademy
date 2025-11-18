"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

// 🎄 PREVIEW MODE: Altere para true para ver o tema natalino agora (para testes)
const PREVIEW_MODE = false; // Mude para false quando quiser usar apenas no período correto

export default function ChristmasThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isChristmas, setIsChristmas] = useState(false);
  const pathname = usePathname();
  const quailCycleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkChristmas = () => {
      // Se preview mode estiver ativo, sempre mostra o tema
      if (PREVIEW_MODE) {
        setIsChristmas(true);
        document.documentElement.classList.add("christmas-theme");
        createSnowflakes();
        return;
      }

      const now = new Date();
      const utcNow = new Date(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate()
      );

      // Data de início: 30/11/2025 (UTC) - Primeiro domingo do Advento
      const startDate = new Date(Date.UTC(2025, 10, 30)); // Mês 10 = Novembro
      // Data de fim: 06/01/2026 (UTC) - Dia de Reis
      const endDate = new Date(Date.UTC(2026, 0, 6)); // Mês 0 = Janeiro

      const isActive =
        utcNow >= startDate && utcNow <= endDate;

      setIsChristmas(isActive);

      // Adiciona/remove classe no body
      if (isActive) {
        document.documentElement.classList.add("christmas-theme");
        createSnowflakes();
      } else {
        document.documentElement.classList.remove("christmas-theme");
        removeSnowflakes();
      }
    };

    const createSnowflakes = () => {
      // Remove flocos existentes
      removeSnowflakes();

      // Cria container de neve se não existir
      let snowContainer = document.getElementById("snow-container");
      if (!snowContainer) {
        snowContainer = document.createElement("div");
        snowContainer.id = "snow-container";
        snowContainer.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 9999;
          overflow: hidden;
        `;
        document.body.appendChild(snowContainer);
      }

      // Cria múltiplos flocos de neve
      const snowflakeCount = 30;
      for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement("div");
        snowflake.textContent = "❄";
        snowflake.style.cssText = `
          position: absolute;
          top: -20px;
          left: ${Math.random() * 100}%;
          font-size: ${Math.random() * 10 + 10}px;
          color: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5});
          animation: snowflake ${Math.random() * 5 + 8}s linear infinite;
          animation-delay: ${Math.random() * 5}s;
          text-shadow: 0 0 3px rgba(255, 255, 255, 0.5);
          pointer-events: none;
        `;
        snowContainer.appendChild(snowflake);
      }

      // Cria codornas natalinas voando
      createChristmasQuails();
      
      // Cria Estrela de Belém no canto superior esquerdo
      createStarOfBethlehem();
    };

    const createSanta = () => {
      // Remove Papai Noel existente
      removeSanta();

      const santaContainer = document.createElement("div");
      santaContainer.id = "santa-container";
      santaContainer.style.cssText = `
        position: fixed;
        top: 5%;
        left: -200px;
        font-size: 3rem;
        z-index: 10000;
        pointer-events: none;
        animation: santa-fly 20s linear infinite;
        animation-delay: 5s;
      `;
      santaContainer.innerHTML = "🎅🛷";
      document.body.appendChild(santaContainer);
    };

    const removeSanta = () => {
      const santaContainer = document.getElementById("santa-container");
      if (santaContainer) {
        santaContainer.remove();
      }
    };

    const createChristmasQuails = () => {
      // Remove codornas existentes
      removeChristmasQuails();

      // Verifica se está em uma página de missão (para não atrapalhar o raciocínio do aluno)
      const isMissionPage = pathname?.includes("/trilhas/") && pathname?.split("/").length === 4; // /trilhas/[slug]/[missao]
      
      if (isMissionPage) {
        // Nas páginas de missão: apenas uma codorna aleatória com delay maior
        const allQuails = [
          { image: "/C1_PN.png", direction: "left" },
          { image: "/C2_PN.png", direction: "right" },
          { image: "/C3_PN.png", direction: "left" },
          { image: "/C4_PN.png", direction: "right" },
          { image: "/C5_PN.png", direction: "right" }
        ];
        
        const randomQuail = allQuails[Math.floor(Math.random() * allQuails.length)];
        const randomDelay = Math.random() * 30 + 60; // Entre 60 e 90 segundos
        
        const quail = {
          ...randomQuail,
          top: 5, // Mais alto
          delay: randomDelay
        };
        
        createSingleQuail(quail, 0);
      } else {
        // Nas outras páginas: todas as codornas com delays espaçados de 30 em 30 segundos
        // Ordem: C1, C3, C5, C2, C4
        const quail1 = {
          image: "/C1_PN.png",
          direction: "left", // da direita para esquerda (já olha para esquerda)
          top: 5,
          delay: 0
        };
        
        const quail3 = {
          image: "/C3_PN.png",
          direction: "left", // da direita para esquerda (já olha para esquerda)
          top: 5.5,
          delay: 30
        };
        
        const quail5 = {
          image: "/C5_PN.png",
          direction: "right", // da esquerda para direita (CORRIGIDO - olha para direita)
          top: 5.8,
          delay: 60
        };
        
        const quail2 = {
          image: "/C2_PN.png",
          direction: "right", // da esquerda para direita (já olha para direita)
          top: 6,
          delay: 90
        };
        
        const quail4 = {
          image: "/C4_PN.png",
          direction: "right", // da esquerda para direita (assumindo que olha para direita)
          top: 5.2,
          delay: 120
        };
        
        [quail1, quail3, quail5, quail2, quail4].forEach((quail, index) => {
          createSingleQuail(quail, index);
        });
        
        // Reinicia o ciclo após todas as codornas aparecerem
        // Último delay: 120s + duração animação: 25s = 145s total
        if (quailCycleTimeoutRef.current) {
          clearTimeout(quailCycleTimeoutRef.current);
        }
        quailCycleTimeoutRef.current = setTimeout(() => {
          createChristmasQuails();
        }, 145000); // 145 segundos = 145000ms
      }
    };

    const createSingleQuail = (quail: { image: string; direction: string; top: number; delay: number }, index: number) => {
      const quailContainer = document.createElement("div");
      quailContainer.id = `quail-container-${index}`;
      
      // Todas as codornas voam da esquerda em direção à Estrela de Belém
      // Usa diferentes trajetórias para variar o caminho
      const starAnimations = ["quail-fly-to-star", "quail-fly-to-star-2", "quail-fly-to-star-3"];
      const animationName = starAnimations[index % starAnimations.length];
      
      // Todas voam para direita, então espelha as que olham para esquerda
      let imageTransform = "";
      if (quail.direction === "left") {
        imageTransform = "scaleX(-1)"; // Espelha se olha para esquerda mas voa para direita
      }
      
      // Animação sem infinite para garantir que apenas uma codorna voe por vez
      // Duração de 25s para garantir que termine antes da próxima começar (delay de 30s)
      quailContainer.style.cssText = `
        position: fixed;
        z-index: 10000;
        pointer-events: none;
        animation: ${animationName} 25s linear;
        animation-delay: ${quail.delay}s;
        animation-fill-mode: forwards;
      `;
      
      const img = document.createElement("img");
      img.src = quail.image;
      img.style.cssText = `
        width: 80px;
        height: auto;
        filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
        transform: ${imageTransform};
      `;
      img.alt = "Codorna Natalina";
      
      quailContainer.appendChild(img);
      document.body.appendChild(quailContainer);
    };

    const createStarOfBethlehem = () => {
      // Remove estrela existente
      removeStarOfBethlehem();

      const starContainer = document.createElement("div");
      starContainer.id = "star-of-bethlehem";
      starContainer.style.cssText = `
        position: fixed;
        top: 0;
        right: -130px;
        width: 250px;
        height: 250px;
        z-index: 9998;
        pointer-events: none;
      `;
      
      // Estrela principal
      const star = document.createElement("div");
      star.style.cssText = `
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        width: 120px;
        height: 120px;
        background: radial-gradient(circle, #FBBF24 0%, #F59E0B 50%, transparent 75%);
        border-radius: 50%;
        animation: star-pulse 3s ease-in-out infinite;
        box-shadow: 
          0 0 60px rgba(251, 191, 36, 0.9),
          0 0 120px rgba(251, 191, 36, 0.7),
          0 0 180px rgba(251, 191, 36, 0.5),
          0 0 250px rgba(245, 158, 11, 0.3);
      `;
      
      // Raios da estrela
      const rays = document.createElement("div");
      rays.style.cssText = `
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        width: 160px;
        height: 160px;
        background: 
          linear-gradient(0deg, transparent 40%, rgba(251, 191, 36, 0.7) 45%, rgba(251, 191, 36, 0.7) 55%, transparent 60%),
          linear-gradient(90deg, transparent 40%, rgba(251, 191, 36, 0.7) 45%, rgba(251, 191, 36, 0.7) 55%, transparent 60%),
          linear-gradient(45deg, transparent 40%, rgba(251, 191, 36, 0.6) 45%, rgba(251, 191, 36, 0.6) 55%, transparent 60%),
          linear-gradient(-45deg, transparent 40%, rgba(251, 191, 36, 0.6) 45%, rgba(251, 191, 36, 0.6) 55%, transparent 60%);
        animation: star-rotate 20s linear infinite;
      `;
      
      starContainer.appendChild(rays);
      starContainer.appendChild(star);
      document.body.appendChild(starContainer);
    };

    const removeStarOfBethlehem = () => {
      const star = document.getElementById("star-of-bethlehem");
      if (star) {
        star.remove();
      }
    };

    const removeChristmasQuails = () => {
      const quail1 = document.getElementById("quail-container-0");
      const quail2 = document.getElementById("quail-container-1");
      const quail3 = document.getElementById("quail-container-2");
      const quail4 = document.getElementById("quail-container-3");
      const quail5 = document.getElementById("quail-container-4");
      if (quail1) quail1.remove();
      if (quail2) quail2.remove();
      if (quail3) quail3.remove();
      if (quail4) quail4.remove();
      if (quail5) quail5.remove();
    };

    const removeSnowflakes = () => {
      const snowContainer = document.getElementById("snow-container");
      if (snowContainer) {
        snowContainer.remove();
      }
      removeChristmasQuails();
      removeStarOfBethlehem();
    };

    checkChristmas();
    // Verifica a cada hora para atualizar automaticamente
    const interval = setInterval(checkChristmas, 3600000); // 1 hora

    return () => {
      clearInterval(interval);
      if (quailCycleTimeoutRef.current) {
        clearTimeout(quailCycleTimeoutRef.current);
        quailCycleTimeoutRef.current = null;
      }
      removeSnowflakes();
      if (!PREVIEW_MODE) {
        document.documentElement.classList.remove("christmas-theme");
      }
    };
  }, [pathname]);

  return <>{children}</>;
}

