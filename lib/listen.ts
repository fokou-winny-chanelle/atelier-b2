export type ListenKind = "attempt" | "review";
export type ListenPhase = "attempt" | "review" | "done";

/** Blind plays stay on the exam quota. After the correction, one read-along is allowed and does not spend that quota. */
export function listenPhase(input: { revealed: boolean; attemptPlays: number; maxPlays: number; reviewPlays: number }): ListenPhase {
  if (input.revealed) return input.reviewPlays >= 1 ? "done" : "review";
  return input.attemptPlays >= input.maxPlays ? "done" : "attempt";
}
