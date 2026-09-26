export type ListenKind = "attempt" | "review";
export type ListenPhase = "attempt" | "review" | "done";

/** Blind plays stay on the exam quota. After the correction, one read-along is allowed and does not spend that quota. */
export function listenPhase(input: { revealed: boolean; attemptPlays: number; maxPlays: number; reviewPlays: number }): ListenPhase {
  if (input.revealed) return input.reviewPlays >= 1 ? "done" : "review";
  return input.attemptPlays >= input.maxPlays ? "done" : "attempt";
}

/** The written text waits until every official play has finished, including the one still sounding. */
export function attemptFinished(
  clips: { id: string; maxPlays: number }[],
  plays: Record<string, number>,
  hearing: Record<string, boolean> = {},
): boolean {
  return clips.every((clip) => (plays[clip.id] ?? 0) >= clip.maxPlays && !hearing[clip.id]);
}
