"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { browserStorage } from "./persist-storage";
import { poolBlocks, poolCards, poolSpeaks, poolWrites } from "./catalog";
import { EXAMS } from "./exams";
import { buildPlan, dayKey, nextMemory, type MemoryItem, type PlanStep } from "./plan";
import type { MockModuleScore, MockRecord, ProductionRecord } from "./readiness";

export interface ActivePlan {
  id: string;
  kind: "daily" | "review" | "skill";
  title: string;
  blurb: string;
  steps: PlanStep[];
  index: number;
  answers: Record<string, string>;
  revealed: Record<string, boolean>;
  audioPlays: Record<string, number>;
  startedAt: number;
  finishedAt: number | null;
}

interface LearnState {
  memory: Record<string, MemoryItem>;
  days: string[];
  plan: ActivePlan | null;
  mocks: MockRecord[];
  productions: ProductionRecord[];
  absorbed: string[];
  preview: (kind: "daily" | "review" | "skill", skill?: string) => { title: string; blurb: string; count: number };
  start: (kind: "daily" | "review" | "skill", skill?: string) => void;
  startMissed: (questionIds: string[]) => boolean;
  absorbExam: (input: { sessionId: string; examId: string; at: number; modules: MockModuleScore[]; items: { questionId: string; correct: boolean }[] }) => void;
  saveProduction: (input: Omit<ProductionRecord, "id">) => void;
  answer: (questionId: string, choiceId: string) => void;
  reveal: (questionIds: string[]) => void;
  bumpAudio: (audioId: string) => void;
  refundAudio: (audioId: string) => void;
  next: () => void;
  back: () => void;
  close: () => void;
}

function makePlan(kind: "daily" | "review" | "skill", memory: Record<string, MemoryItem>, skill?: string, salt?: string): ActivePlan {
  const now = Date.now();
  const built = buildPlan({
    now,
    memory,
    cards: poolCards(),
    blocks: poolBlocks(),
    writes: poolWrites(),
    speaks: poolSpeaks(),
    kind,
    skill,
    salt,
  });
  return {
    id: crypto.randomUUID(),
    kind,
    title: built.title,
    blurb: built.blurb,
    steps: built.steps,
    index: 0,
    answers: {},
    revealed: {},
    audioPlays: {},
    startedAt: now,
    finishedAt: null,
  };
}

export const useLearnStore = create<LearnState>()(
  persist(
    (set, get) => ({
      memory: {},
      days: [],
      plan: null,
      mocks: [],
      productions: [],
      absorbed: [],
      preview: (kind, skill) => {
        const built = buildPlan({
          now: Date.now(),
          memory: get().memory,
          cards: poolCards(),
          blocks: poolBlocks(),
          writes: poolWrites(),
          speaks: poolSpeaks(),
          kind,
          skill,
        });
        return { title: built.title, blurb: built.blurb, count: built.steps.length };
      },
      start: (kind, skill) =>
        set((state) => ({
          plan: makePlan(kind, state.memory, skill, kind === "daily" && state.plan?.finishedAt ? String(state.days.length) : undefined),
        })),
      startMissed: (questionIds) => {
        const state = get();
        if (state.plan && !state.plan.finishedAt) return false;
        const steps = stepsForMissed(questionIds);
        if (steps.length === 0) return false;
        set({
          plan: {
            id: crypto.randomUUID(),
            kind: "review",
            title: "Erreurs de l’examen",
            blurb: "Les questions ratées au blanc, puis la correction.",
            steps,
            index: 0,
            answers: {},
            revealed: {},
            audioPlays: {},
            startedAt: Date.now(),
            finishedAt: null,
          },
        });
        return true;
      },
      absorbExam: (input) =>
        set((state) => {
          if (state.absorbed.includes(input.sessionId)) return state;
          const memory = { ...state.memory };
          for (const item of input.items) {
            memory[item.questionId] = nextMemory(memory[item.questionId], item.correct, input.at);
          }
          const mock: MockRecord = { sessionId: input.sessionId, examId: input.examId, at: input.at, modules: input.modules };
          return {
            memory,
            absorbed: [...state.absorbed, input.sessionId].slice(-80),
            mocks: [...state.mocks, mock].slice(-40),
          };
        }),
      saveProduction: (input) =>
        set((state) => ({
          productions: [...state.productions, { ...input, id: crypto.randomUUID() }].slice(-40),
        })),
      answer: (questionId, choiceId) =>
        set((state) =>
          state.plan
            ? { plan: { ...state.plan, answers: { ...state.plan.answers, [questionId]: choiceId } } }
            : {},
        ),
      reveal: (questionIds) =>
        set((state) => {
          if (!state.plan) return {};
          const now = Date.now();
          const memory = { ...state.memory };
          const revealed = { ...state.plan.revealed };
          for (const questionId of questionIds) {
            if (revealed[questionId]) continue;
            const located = findAnswer(questionId);
            if (!located) continue;
            memory[questionId] = nextMemory(memory[questionId], state.plan.answers[questionId] === located, now);
            revealed[questionId] = true;
          }
          return { memory, plan: { ...state.plan, revealed } };
        }),
      bumpAudio: (audioId) =>
        set((state) =>
          state.plan
            ? {
                plan: {
                  ...state.plan,
                  audioPlays: { ...state.plan.audioPlays, [audioId]: (state.plan.audioPlays[audioId] ?? 0) + 1 },
                },
              }
            : {},
        ),
      refundAudio: (audioId) =>
        set((state) =>
          state.plan
            ? {
                plan: {
                  ...state.plan,
                  audioPlays: {
                    ...state.plan.audioPlays,
                    [audioId]: Math.max(0, (state.plan.audioPlays[audioId] ?? 1) - 1),
                  },
                },
              }
            : {},
        ),
      next: () =>
        set((state) => {
          if (!state.plan) return {};
          const index = state.plan.index + 1;
          if (index < state.plan.steps.length) return { plan: { ...state.plan, index } };
          const today = dayKey(Date.now());
          return {
            days: state.days.includes(today) ? state.days : [...state.days, today].slice(-120),
            plan: { ...state.plan, index, finishedAt: Date.now() },
          };
        }),
      back: () =>
        set((state) => {
          if (!state.plan || state.plan.index <= 0 || state.plan.finishedAt) return {};
          return { plan: { ...state.plan, index: state.plan.index - 1 } };
        }),
      close: () => set({ plan: null }),
    }),
    {
      name: "atelier-b2-learn-v1",
      version: 2,
      storage: browserStorage(),
      migrate: (persisted) => {
        const state = persisted as Partial<LearnState>;
        return {
          memory: state.memory ?? {},
          days: state.days ?? [],
          plan: state.plan ?? null,
          mocks: state.mocks ?? [],
          productions: state.productions ?? [],
          absorbed: state.absorbed ?? [],
        };
      },
    },
  ),
);

function stepsForMissed(questionIds: string[]): PlanStep[] {
  const cards = poolCards();
  const blocks = poolBlocks();
  const steps: PlanStep[] = [];
  const seen = new Set<string>();
  for (const questionId of questionIds) {
    const card = cards.find((item) => item.questionId === questionId);
    if (card) {
      if (seen.has(questionId)) continue;
      seen.add(questionId);
      steps.push({ kind: "card", questionId, partId: card.partId, examId: card.examId });
      continue;
    }
    const block = blocks.find((item) => item.questionIds.includes(questionId));
    if (block && !steps.some((step) => step.kind === "block" && step.partId === block.partId)) {
      steps.push({ kind: "block", partId: block.partId, examId: block.examId });
    }
    if (steps.length >= 12) break;
  }
  return steps.slice(0, 12);
}

function findAnswer(questionId: string): string | undefined {
  for (const exam of EXAMS) {
    for (const moduleId of ["lesen", "hoeren"] as const) {
      for (const part of exam[moduleId].parts) {
        const question = part.questions.find((item) => item.id === questionId);
        if (question) return question.answer;
      }
    }
  }
  return undefined;
}
