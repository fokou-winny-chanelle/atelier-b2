"use client";

import { useEffect, useRef, useState } from "react";
import { listenPhase, type ListenKind, type ListenPhase } from "@/lib/listen";
import type { AudioClip } from "@/lib/types";
import { speakGerman, type SpeakHandle } from "@/lib/speak";
import { useExamStore } from "@/lib/store";

export function AudioButton({
  sessionId,
  clip,
  plays,
  reviewPlays,
  revealed,
  showScript,
  onBusy,
}: {
  sessionId: string;
  clip: AudioClip;
  plays: number;
  reviewPlays: number;
  revealed: boolean;
  showScript: boolean;
  onBusy?: (busy: boolean) => void;
}) {
  const bumpAudio = useExamStore((state) => state.bumpAudio);
  const refundAudio = useExamStore((state) => state.refundAudio);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const handle = useRef<SpeakHandle | null>(null);
  const charged = useRef<ListenKind | null>(null);
  const onBusyRef = useRef(onBusy);
  onBusyRef.current = onBusy;
  const phase: ListenPhase = listenPhase({ revealed, attemptPlays: plays, maxPlays: clip.maxPlays, reviewPlays });
  const left = Math.max(0, clip.maxPlays - plays);

  useEffect(() => {
    return () => {
      handle.current?.cancel();
      onBusyRef.current?.(false);
    };
  }, []);

  function play() {
    if (phase === "done" || busy) return;
    const kind: ListenKind = phase === "review" ? "review" : "attempt";
    setError("");
    charged.current = kind;
    bumpAudio(sessionId, clip.id, kind);
    setBusy(true);
    onBusy?.(true);
    handle.current = speakGerman(clip.script, {
      onend: () => {
        charged.current = null;
        setBusy(false);
        onBusy?.(false);
      },
      oninterrupt: () => {
        if (charged.current) refundAudio(sessionId, clip.id, charged.current);
        charged.current = null;
        setBusy(false);
        onBusy?.(false);
      },
      onerror: () => {
        if (charged.current) refundAudio(sessionId, clip.id, charged.current);
        charged.current = null;
        setBusy(false);
        onBusy?.(false);
        setError("La lecture n’a pas démarré. Monte le volume, coupe le mode silencieux, puis réessaie.");
      },
    });
  }

  const withText = phase === "review" || (phase === "done" && showScript);
  const label = busy ? "Wiedergabe läuft" : phase === "review" ? "Nochmal hören" : phase === "attempt" ? "Audio starten" : withText ? "Nochmal gehört" : "Wiedergabe aufgebraucht";

  return (
    <div className="audio">
      <button type="button" className="audio-play" onClick={play} disabled={phase === "done" || busy}>
        {label}
      </button>
      <p className="audio-meta">{withText ? "Einmal mit Text" : `${clip.maxPlays === 1 ? "Einmal hörbar" : "Zweimal hörbar"} · noch ${left}`}</p>
      <p className="audio-note">Ohne Vorspulen. In der Prüfung kann der Text nicht angehalten werden. Auf dem iPhone die Lautstärke während der Wiedergabe stellen.</p>
      {error ? <p className="audio-error">{error}</p> : null}
      {showScript ? (
        <>
          <p className="audio-note">Texte entendu</p>
          <p className="transcript">{clip.script}</p>
        </>
      ) : null}
    </div>
  );
}
