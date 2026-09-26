export interface SpeakHandle {
  cancel: () => void;
}

function onPhone(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

export function isIosUserAgent(userAgent: string, platform = "", maxTouchPoints = 0): boolean {
  if (/iPhone|iPad|iPod/i.test(userAgent)) return true;
  return platform === "MacIntel" && maxTouchPoints > 1;
}

function onIos(): boolean {
  if (typeof navigator === "undefined") return false;
  return isIosUserAgent(navigator.userAgent, navigator.platform, navigator.maxTouchPoints);
}

export function pickGermanVoice<T extends { lang: string; localService: boolean }>(voices: T[], ios: boolean): T | null {
  const german = voices.filter((voice) => voice.lang.toLowerCase().startsWith("de"));
  const local = german.find((voice) => voice.localService);
  if (ios) return local ?? null;
  return local ?? german[0] ?? null;
}

/** iPhone spoken voice follows the ringer, so the volume buttons do nothing. Playback uses the media volume instead. */
function useMediaVolume(): void {
  const session = (navigator as Navigator & { audioSession?: { type: string } }).audioSession;
  if (!session) return;
  try {
    session.type = "playback";
  } catch {
    /* The assignment is only accepted inside the tap that starts speech. */
  }
}

function germanVoice(synth: SpeechSynthesis, ios: boolean): SpeechSynthesisVoice | null {
  return pickGermanVoice(synth.getVoices(), ios);
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

/** The playback that currently owns the speaker. A new tap releases it so the previous screen does not stay “still playing”. */
let releaseCurrent: (() => void) | null = null;

/**
 * Speaks German in the same turn as the tap. Phones reject speech that starts
 * after a delay, and iOS drops an utterance that follows cancel() immediately.
 */
export function speakGerman(
  text: string,
  handlers: { onend: () => void; onerror: () => void; oninterrupt?: () => void },
): SpeakHandle {
  const synth = typeof window !== "undefined" ? window.speechSynthesis : undefined;
  if (!synth) {
    handlers.onerror();
    return { cancel: () => undefined };
  }

  const phone = onPhone();
  const ios = onIos();
  const chunks = chunksOf(text);
  const voice = germanVoice(synth, ios);
  let index = 0;
  let stopped = false;

  if (ios) useMediaVolume();
  releaseCurrent?.();
  releaseCurrent = null;

  const keepalive = ios
    ? window.setInterval(() => {
        if (!stopped) synth.resume();
      }, 8000)
    : phone
      ? 0
      : window.setInterval(() => {
          if (stopped || !synth.speaking || synth.paused) return;
          synth.pause();
          synth.resume();
        }, 10000);

  const release = () => {
    if (stopped) return;
    stopped = true;
    window.clearInterval(keepalive);
    if (releaseCurrent === release) releaseCurrent = null;
    (handlers.oninterrupt ?? handlers.onerror)();
  };
  releaseCurrent = release;

  const finish = (ok: boolean) => {
    if (stopped) return;
    stopped = true;
    window.clearInterval(keepalive);
    if (releaseCurrent === release) releaseCurrent = null;
    if (ok) handlers.onend();
    else handlers.onerror();
  };

  const speakChunk = (chunk: string, last: boolean) => {
    const utterance = new SpeechSynthesisUtterance(chunk);
    utterance.lang = "de-DE";
    utterance.volume = 1;
    utterance.rate = ios ? 1 : 0.95;
    if (voice) utterance.voice = voice;
    utterance.onend = () => {
      if (stopped) return;
      if (last) finish(true);
      else speakNext();
    };
    utterance.onerror = (event) => {
      if (stopped) return;
      if (event.error === "interrupted" || event.error === "canceled") {
        release();
        return;
      }
      finish(false);
    };
    synth.speak(utterance);
  };

  const speakNext = () => {
    if (stopped) return;
    if (index >= chunks.length) {
      finish(true);
      return;
    }
    const chunk = chunks[index] ?? "";
    const last = index === chunks.length - 1;
    index += 1;
    try {
      speakChunk(chunk, last);
    } catch {
      finish(false);
    }
  };

  if (synth.paused) synth.resume();
  if (!phone && (synth.speaking || synth.pending)) synth.cancel();
  speakNext();

  return {
    cancel: () => {
      stopped = true;
      window.clearInterval(keepalive);
      if (releaseCurrent === release) releaseCurrent = null;
      synth.cancel();
    },
  };
}

export function hasGermanVoice(): boolean {
  if (typeof window === "undefined" || !window.speechSynthesis) return false;
  return window.speechSynthesis.getVoices().some((voice) => voice.lang.toLowerCase().startsWith("de"));
}
