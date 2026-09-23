"use client";

import { useEffect, useRef, useState } from "react";
import type { AudioClip } from "@/lib/types";
import { speakGerman, type SpeakHandle } from "@/lib/speak";
import { useExamStore } from "@/lib/store";

export function AudioButton({
  sessionId,
  clip,
  plays,
  showScript,
}: {
  sessionId: string;
  clip: AudioClip;
  plays: number;
  showScript: boolean;
}) {
  const bumpAudio = useExamStore((state) => state.bumpAudio);
  const refundAudio = useExamStore((state) => state.refundAudio);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const handle = useRef<SpeakHandle | null>(null);
  const left = Math.max(0, clip.maxPlays - plays);

  useEffect(() => {
    return () => handle.current?.cancel();
  }, []);

  function play() {
    if (left <= 0 || busy) return;
    setError("");
    bumpAudio(sessionId, clip.id);
    setBusy(true);
    handle.current = speakGerman(clip.script, {
      onend: () => setBusy(false),
      onerror: () => {
        refundAudio(sessionId, clip.id);
        setBusy(false);
        setError("La lecture n’a pas démarré. Réessaie. Sur ordinateur, vérifie qu’une voix allemande est installée.");
      },
    });
  }

  return (
    <div className="audio">
      <button type="button" className="audio-play" onClick={play} disabled={left <= 0 || busy}>
        {busy ? "Wiedergabe läuft" : left > 0 ? "Audio starten" : "Wiedergabe aufgebraucht"}
      </button>
      <p className="audio-meta">
        {clip.maxPlays === 1 ? "Einmal hörbar" : "Zweimal hörbar"} · noch {left}
      </p>
      <p className="audio-note">Ohne Vorspulen. In der Prüfung kann der Text nicht angehalten werden.</p>
      {error ? <p className="audio-error">{error}</p> : null}
      {showScript ? <p className="transcript">{clip.script}</p> : null}
    </div>
  );
}
