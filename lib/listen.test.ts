import { describe, expect, it } from "vitest";
import { listenPhase } from "./listen";

describe("listenPhase", () => {
  it("keeps the first listens blind", () => {
    expect(listenPhase({ revealed: false, attemptPlays: 0, maxPlays: 1, reviewPlays: 0 })).toBe("attempt");
    expect(listenPhase({ revealed: false, attemptPlays: 1, maxPlays: 2, reviewPlays: 0 })).toBe("attempt");
    expect(listenPhase({ revealed: false, attemptPlays: 1, maxPlays: 1, reviewPlays: 0 })).toBe("done");
  });

  it("opens one read-along after the correction, even if exam plays remain", () => {
    expect(listenPhase({ revealed: true, attemptPlays: 1, maxPlays: 1, reviewPlays: 0 })).toBe("review");
    expect(listenPhase({ revealed: true, attemptPlays: 0, maxPlays: 2, reviewPlays: 0 })).toBe("review");
    expect(listenPhase({ revealed: true, attemptPlays: 2, maxPlays: 2, reviewPlays: 1 })).toBe("done");
  });
});
