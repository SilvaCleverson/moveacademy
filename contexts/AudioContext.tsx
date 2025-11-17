"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Howl, Howler } from "howler";

interface AudioContextType {
  playSound: (soundName: SoundName) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  isMuted: boolean;
  volume: number;
}

type SoundName = 
  | "compile" 
  | "success" 
  | "error" 
  | "xp" 
  | "click" 
  | "unlock"
  | "complete";

const AudioContext = createContext<AudioContextType | undefined>(undefined);

// Cache de sons para evitar recriar
const soundCache: Map<SoundName, Howl> = new Map();

// Gera um som sintetizado simples (WAV)
const generateTone = (frequency: number, duration: number, type: "sine" | "square" | "sawtooth" = "sine"): string => {
  const sampleRate = 44100;
  const numSamples = Math.floor(sampleRate * duration);
  const buffer = new ArrayBuffer(44 + numSamples * 2);
  const view = new DataView(buffer);
  
  // WAV header
  const writeString = (offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };
  
  writeString(0, "RIFF");
  view.setUint32(4, 36 + numSamples * 2, true);
  writeString(8, "WAVE");
  writeString(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, "data");
  view.setUint32(40, numSamples * 2, true);
  
  // Gera onda
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    let sample = 0;
    if (type === "sine") {
      sample = Math.sin(2 * Math.PI * frequency * t);
    } else if (type === "square") {
      sample = Math.sign(Math.sin(2 * Math.PI * frequency * t));
    } else if (type === "sawtooth") {
      sample = 2 * (t * frequency - Math.floor(t * frequency + 0.5));
    }
    
    // Aplica envelope (fade out)
    const envelope = 1 - (i / numSamples);
    sample *= envelope * 0.3;
    
    const intSample = Math.max(-32768, Math.min(32767, Math.floor(sample * 32768)));
    view.setInt16(44 + i * 2, intSample, true);
  }
  
  const blob = new Blob([buffer], { type: "audio/wav" });
  return URL.createObjectURL(blob);
};

// Sons sintetizados
const getSound = (soundName: SoundName): Howl => {
  if (soundCache.has(soundName)) {
    return soundCache.get(soundName)!;
  }
  
  let sound: Howl;
  
  switch (soundName) {
    case "compile":
      sound = new Howl({
        src: [generateTone(440, 0.1, "sine")],
        volume: 0.3,
      });
      break;
    case "success":
      sound = new Howl({
        src: [generateTone(523.25, 0.2, "sine")],
        volume: 0.4,
        onend: () => {
          // Toca acorde
          setTimeout(() => {
            const sound2 = new Howl({
              src: [generateTone(659.25, 0.15, "sine")],
              volume: 0.4,
            });
            sound2.play();
          }, 50);
        },
      });
      break;
    case "error":
      sound = new Howl({
        src: [generateTone(200, 0.3, "sawtooth")],
        volume: 0.3,
      });
      break;
    case "xp":
      sound = new Howl({
        src: [generateTone(523.25, 0.15, "sine")],
        volume: 0.5,
        onend: () => {
          setTimeout(() => {
            const sound2 = new Howl({
              src: [generateTone(659.25, 0.15, "sine")],
              volume: 0.5,
            });
            sound2.play();
          }, 50);
        },
      });
      break;
    case "click":
      sound = new Howl({
        src: [generateTone(800, 0.05, "square")],
        volume: 0.2,
      });
      break;
    case "unlock":
      sound = new Howl({
        src: [generateTone(523.25, 0.1, "sine")],
        volume: 0.4,
      });
      break;
    case "complete":
      sound = new Howl({
        src: [generateTone(523.25, 0.15, "sine")],
        volume: 0.5,
      });
      break;
    default:
      sound = new Howl({
        src: [generateTone(440, 0.1, "sine")],
        volume: 0.3,
      });
  }
  
  soundCache.set(soundName, sound);
  return sound;
};

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(0.7);

  // Carrega preferências do localStorage
  useEffect(() => {
    const savedMuted = localStorage.getItem("moveacademy-audio-muted");
    const savedVolume = localStorage.getItem("moveacademy-audio-volume");
    
    if (savedMuted === "true") {
      setIsMuted(true);
      Howler.mute(true);
    }
    
    if (savedVolume) {
      const vol = parseFloat(savedVolume);
      if (!isNaN(vol) && vol >= 0 && vol <= 1) {
        setVolumeState(vol);
        Howler.volume(vol);
      }
    } else {
      Howler.volume(volume);
    }
  }, []);

  const playSound = (soundName: SoundName) => {
    if (isMuted) return;
    
    try {
      const sound = getSound(soundName);
      sound.play();
    } catch (error) {
      // Ignora erros de áudio silenciosamente
      console.debug("Audio error:", error);
    }
  };

  const setVolume = (newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolumeState(clampedVolume);
    Howler.volume(clampedVolume);
    localStorage.setItem("moveacademy-audio-volume", clampedVolume.toString());
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    Howler.mute(newMuted);
    localStorage.setItem("moveacademy-audio-muted", newMuted.toString());
  };

  return (
    <AudioContext.Provider
      value={{
        playSound,
        setVolume,
        toggleMute,
        isMuted,
        volume,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}

