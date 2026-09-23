import { describe, expect, it } from "vitest";
import { advise } from "./readiness";
import type { MemoryItem } from "./plan";

const skills = [
  { id: "lesen-1", module: "Lesen", title: "Quatre personnes" },
  { id: "hoeren-1", module: "Hören", title: "Textes courts" },
];

const cards = [
  { questionId: "l1", skill: "lesen-1" },
  { questionId: "h1", skill: "hoeren-1" },
];

const wrong: MemoryItem = { seen: 2, correct: 0, wrong: 2, streak: 0, dueAt: 0 };

describe("advise", () => {
  const now = Date.UTC(2026, 8, 23);

  it("keeps an open series in front of everything else", () => {
    const advice = advise({ now, running: true, dueSteps: 4, memory: {}, cards, skills, mocks: [], productions: [] });
    expect(advice.action).toBe("continue");
  });

  it("sends due mistakes back before a new daily series", () => {
    const advice = advise({ now, running: false, dueSteps: 3, memory: { l1: wrong }, cards, skills, mocks: [], productions: [] });
    expect(advice.action).toBe("review");
  });

  it("starts a new learner on the daily questions", () => {
    const advice = advise({ now, running: false, dueSteps: 0, memory: {}, cards, skills, mocks: [], productions: [] });
    expect(advice.action).toBe("daily");
  });

  it("points at the closed module that is under the pass line", () => {
    const advice = advise({
      now,
      running: false,
      dueSteps: 0,
      memory: { l1: { ...wrong, dueAt: now + 86_400_000 } },
      cards,
      skills,
      mocks: [],
      productions: [],
    });
    expect(advice.action).toBe("skill");
    expect(advice.skill).toBe("lesen-1");
  });
});
