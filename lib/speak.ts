export interface SpeakHandle {
  cancel: () => void;
}

/**
 * Speaks German text in sentence chunks. Chrome drops long utterances;
 * a keepalive pause/resume and short chunks keep the voice alive.
 */
export function speakGerman(
  text: string,
  handlers: { onend: () => void; onerror: () => void },
): SpeakHandle {
  const synth = window.speechSynthesis;
  synth.cancel();

  const chunks = text
    .match(/[^.!?]+[.!?]+(?:\s|$)|[^.!?]+$/g)
    ?.map((chunk) => chunk.trim())
    .filter(Boolean) ?? [text];

  const voice =
    synth.getVoices().find((item) => item.lang.toLowerCase().startsWith("de")) ?? null;

  let index = 0;
  let stopped = false;
  let started = false;

  const keepalive = window.setInterval(() => {
    if (synth.speaking && !synth.paused) {
      synth.pause();
      synth.resume();
    }
  }, 10000);

  const finish = (ok: boolean) => {
    if (stopped) return;
    stopped = true;
    window.clearInterval(keepalive);
    if (ok) handlers.onend();
    else handlers.onerror();
  };

  const speakNext = () => {
    if (stopped) return;
    if (index >= chunks.length) {
      finish(true);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(chunks[index] ?? "");
    index += 1;
    utterance.lang = "de-DE";
    utterance.rate = 0.95;
    if (voice) utterance.voice = voice;
    utterance.onend = speakNext;
    utterance.onerror = (event) => {
      if (stopped) return;
      if (event.error === "interrupted" || event.error === "canceled") return;
      finish(false);
    };
    synth.speak(utterance);
  };

  const start = () => {
    if (started || stopped) return;
    started = true;
    speakNext();
  };
  if (synth.getVoices().length === 0) {
    synth.addEventListener("voiceschanged", start, { once: true });
    window.setTimeout(start, 400);
  } else {
    start();
  }

  return {
    cancel: () => {
      stopped = true;
      window.clearInterval(keepalive);
      synth.cancel();
    },
  };
}

export function hasGermanVoice(): boolean {
  if (typeof window === "undefined" || !window.speechSynthesis) return false;
  return window.speechSynthesis.getVoices().some((voice) => voice.lang.toLowerCase().startsWith("de"));
}
