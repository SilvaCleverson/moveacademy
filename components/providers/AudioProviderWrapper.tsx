"use client";

import { AudioProvider } from "@/contexts/AudioContext";

export default function AudioProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AudioProvider>{children}</AudioProvider>;
}

