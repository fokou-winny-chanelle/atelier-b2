import { describe, expect, it } from "vitest";
import { poolBlocks, poolCards, poolListens, poolSpeaks, poolWrites, type PoolBlock, type PoolCard, type PoolListen } from "./catalog";
import { EXAMS } from "./exams";
import { buildPlan, nextMemory, shuffle } from "./plan";

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

  it("starts the day with one listening clip and does not repeat those questions", () => {
    const listen: PoolListen = {
      stimulusId: "clip",
      partId: "hear",
      examId: "ms-01",
      skill: "hoeren-1",
      questionIds: ["h1", "h2"],
    };
    const plan = buildPlan({
      now,
      memory: {},
      cards: [
        ...cards,
        { questionId: "h1", partId: "hear", skill: "hoeren-1", examId: "ms-01" },
        { questionId: "h2", partId: "hear", skill: "hoeren-1", examId: "ms-01" },
        { questionId: "h3", partId: "hear", skill: "hoeren-1", examId: "ms-01" },
      ],
      blocks: [],
      writes: [],
      speaks: [],
      listens: [listen],
      kind: "daily",
    });
    expect(plan.steps[0]).toEqual({
      kind: "listen",
      stimulusId: "clip",
      partId: "hear",
      examId: "ms-01",
      questionIds: ["h1", "h2"],
    });
    const cardIds = plan.steps.flatMap((step) => (step.kind === "card" ? [step.questionId] : []));
    expect(cardIds).not.toContain("h1");
    expect(cardIds).not.toContain("h2");
    expect(cardIds).not.toContain("h3");
  });

  it("reviews a missed listening question with the whole clip", () => {
    const plan = buildPlan({
      now,
      memory: { h1: { seen: 1, correct: 0, wrong: 1, streak: 0, dueAt: now - 1 } },
      cards: [{ questionId: "h1", partId: "hear", skill: "hoeren-1", examId: "ms-01" }],
      blocks: [],
      writes: [],
      speaks: [],
      listens: [{ stimulusId: "clip", partId: "hear", examId: "ms-01", skill: "hoeren-1", questionIds: ["h1", "h2"] }],
      kind: "review",
    });
    expect(plan.steps).toEqual([
      { kind: "listen", stimulusId: "clip", partId: "hear", examId: "ms-01", questionIds: ["h1", "h2"] },
    ]);
  });

  it("trains a listening skill as whole clips", () => {
    const plan = buildPlan({
      now,
      memory: {},
      cards: [{ questionId: "h1", partId: "hear", skill: "hoeren-2", examId: "ms-01" }],
      blocks: [],
      writes: [],
      speaks: [],
      listens: [{ stimulusId: "talk", partId: "hear", examId: "ms-01", skill: "hoeren-2", questionIds: ["h1", "h2", "h3", "h4", "h5", "h6"] }],
      kind: "skill",
      skill: "hoeren-2",
    });
    expect(plan.steps.every((step) => step.kind === "listen")).toBe(true);
    expect(plan.steps[0]).toMatchObject({ questionIds: ["h1", "h2", "h3", "h4", "h5", "h6"] });
  });

  it("keeps the two questions of a short listening text together", () => {
    const shorts = poolListens().filter((unit) => unit.skill === "hoeren-1");
    expect(shorts).toHaveLength(25);
    expect(shorts.every((unit) => unit.questionIds.length === 2)).toBe(true);
  });

  it("keeps each recording whole and out of the single-question cards", () => {
    const units = poolListens();
    expect(new Set(units.map((unit) => unit.stimulusId)).size).toBe(units.length);
    for (const exam of EXAMS) {
      for (const part of exam.hoeren.parts) {
        const mine = units.filter((unit) => unit.partId === part.id);
        const scored = part.questions.filter((question) => !question.example);
        expect(mine.flatMap((unit) => unit.questionIds).sort()).toEqual(scored.map((question) => question.id).sort());
        const teil = Number(/Teil (\d+)/.exec(part.title)?.[1]);
        const plays = teil === 2 || teil === 4 ? 2 : 1;
        expect(part.clips.every((clip) => clip.maxPlays === plays)).toBe(true);
        expect(mine).toHaveLength(teil === 1 ? part.stimuli.length : 1);
      }
    }
    const day = buildPlan({
      now,
      memory: {},
      cards: poolCards(),
      blocks: poolBlocks(),
      writes: poolWrites(),
      speaks: poolSpeaks(),
      listens: units,
      kind: "daily",
    });
    const listenSteps = day.steps.filter((step) => step.kind === "listen");
    expect(listenSteps).toHaveLength(1);
    expect(
      day.steps.every((step) => step.kind !== "card" || !step.questionId.startsWith("ms") || !units.some((unit) => unit.questionIds.includes(step.questionId))),
    ).toBe(true);
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
