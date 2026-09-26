export interface SpeakHandle {
  cancel: () => void;
}

function onPhone(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

function germanVoice(synth: SpeechSynthesis): SpeechSynthesisVoice | null {
  const voices = synth.getVoices().filter((voice) => voice.lang.toLowerCase().startsWith("de"));
  return voices.find((voice) => voice.localService) ?? voices[0] ?? null;
}

function chunksOf(text: string): string[] {
  const pieces =
    text
      .match(/[^.!?]+[.!?]+(?:\s|$)|[^.!?]+$/g)
      ?.map((chunk) => chunk.trim())
      .filter(Boolean) ?? [text];
  const short: string[] = [];
  for (const piece of pieces) {
    if (piece.length <= 180) {
      short.push(piece);
      continue;
    }
    const words = piece.split(/\s+/);
    let line = "";
    for (const word of words) {
      const next = line ? `${line} ${word}` : word;
      if (next.length > 180 && line) {
        short.push(line);
        line = word;
      } else {
        line = next;
      }
    }
    if (line) short.push(line);
  }
  return short.length > 0 ? short : [text];
}

if (typeof window !== "undefined" && window.speechSynthesis) {
  const synth = window.speechSynthesis;
  const load = () => synth.getVoices();
  load();
  synth.addEventListener?.("voiceschanged", load);
}

/**
 * Speaks German in the same turn as the tap. Phones reject speech that starts
 * after a delay, and iOS drops an utterance that follows cancel() immediately.
 */
export function speakGerman(
  text: string,
  handlers: { onend: () => void; onerror: () => void },
): SpeakHandle {
  const synth = typeof window !== "undefined" ? window.speechSynthesis : undefined;
  if (!synth) {
    handlers.onerror();
    return { cancel: () => undefined };
  }

  const phone = onPhone();
  const chunks = chunksOf(text);
  const voice = germanVoice(synth);
  let index = 0;
  let stopped = false;

  const keepalive = phone
    ? 0
    : window.setInterval(() => {
        if (stopped || !synth.speaking || synth.paused) return;
        synth.pause();
        synth.resume();
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
    try {
      synth.speak(utterance);
    } catch {
      finish(false);
    }
  };

  if (phone || synth.paused) synth.resume();
  if (!phone && (synth.speaking || synth.pending)) synth.cancel();
  speakNext();

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
