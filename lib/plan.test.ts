import { describe, expect, it } from "vitest";
import { buildPlan, nextMemory, shuffle } from "./plan";
import type { PoolBlock, PoolCard } from "./catalog";

const cards: PoolCard[] = Array.from({ length: 6 }, (_, index) => ({
  questionId: `q${index}`,
  partId: "p",
  skill: "lesen-1",
  examId: "ms-01",
}));

describe("nextMemory", () => {
  it("brings a wrong answer back the next day and spaces a correct one", () => {
    const now = Date.UTC(2026, 8, 23);
    const wrong = nextMemory(undefined, false, now);
    expect(wrong.wrong).toBe(1);
    expect(wrong.dueAt - now).toBe(86_400_000);
    const again = nextMemory(wrong, true, now);
    expect(again.streak).toBe(1);
    expect(again.dueAt - now).toBe(2 * 86_400_000);
  });
});

describe("buildPlan", () => {
  const now = new Date(2026, 8, 23, 9, 0, 0).getTime();

  it("does not repeat a question inside one series", () => {
    const plan = buildPlan({
      now,
      memory: {},
      cards,
      blocks: [],
      writes: [],
      speaks: [],
      kind: "daily",
    });
    const ids = plan.steps.flatMap((step) => (step.kind === "card" ? [step.questionId] : []));
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("changes order when the day changes", () => {
    const first = shuffle(cards, "2026-9-23:daily::");
    const second = shuffle(cards, "2026-9-24:daily::");
    expect(first.map((card) => card.questionId).join()).not.toBe(second.map((card) => card.questionId).join());
  });

  it("reviews only what is due", () => {
    const plan = buildPlan({
      now,
      memory: { q1: { seen: 1, correct: 0, wrong: 1, streak: 0, dueAt: now - 1 } },
      cards,
      blocks: [],
      writes: [],
      speaks: [],
      kind: "review",
    });
    expect(plan.steps).toEqual([{ kind: "card", questionId: "q1", partId: "p", examId: "ms-01" }]);
  });

  it("brings a due matching exercise back as one block", () => {
    const block: PoolBlock = { partId: "gap", skill: "lesen-2", examId: "ms-01", questionIds: ["bq"] };
    const plan = buildPlan({
      now,
      memory: { bq: { seen: 1, correct: 0, wrong: 1, streak: 0, dueAt: now - 1 } },
      cards,
      blocks: [block],
      writes: [],
      speaks: [],
      kind: "review",
    });
    expect(plan.steps[0]).toEqual({ kind: "block", partId: "gap", examId: "ms-01" });
  });
});
