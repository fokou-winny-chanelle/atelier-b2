"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { poolBlocks, poolCards, poolSpeaks, poolWrites } from "./catalog";
import { EXAMS } from "./exams";
import { buildPlan, dayKey, nextMemory, type MemoryItem, type PlanStep } from "./plan";

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
  preview: (kind: "daily" | "review" | "skill", skill?: string) => { title: string; blurb: string; count: number };
  start: (kind: "daily" | "review" | "skill", skill?: string) => void;
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
    { name: "atelier-b2-learn-v1", version: 1 },
  ),
);

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
