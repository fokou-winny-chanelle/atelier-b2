import { describe, expect, it } from "vitest";
import { attemptFinished, listenPhase } from "./listen";

describe("listenPhase", () => {
  it("keeps the first listens blind", () => {
    expect(listenPhase({ revealed: false, attemptPlays: 0, maxPlays: 1, reviewPlays: 0 })).toBe("attempt");
    expect(listenPhase({ revealed: false, attemptPlays: 1, maxPlays: 2, reviewPlays: 0 })).toBe("attempt");
    expect(listenPhase({ revealed: false, attemptPlays: 1, maxPlays: 1, reviewPlays: 0 })).toBe("done");
  });

  it("keeps the text hidden until the last official play has ended", () => {
    const twice = { id: "clip", maxPlays: 2 };
    expect(attemptFinished([], {}, {})).toBe(true);
    expect(attemptFinished([twice], { clip: 1 }, {})).toBe(false);
    expect(attemptFinished([twice], { clip: 2 }, { clip: true })).toBe(false);
    expect(attemptFinished([twice], { clip: 2 }, {})).toBe(true);
  });

  it("opens one read-along after the correction, even if exam plays remain", () => {
    expect(listenPhase({ revealed: true, attemptPlays: 1, maxPlays: 1, reviewPlays: 0 })).toBe("review");
    expect(listenPhase({ revealed: true, attemptPlays: 0, maxPlays: 2, reviewPlays: 0 })).toBe("review");
    expect(listenPhase({ revealed: true, attemptPlays: 2, maxPlays: 2, reviewPlays: 1 })).toBe("done");
  });
});
