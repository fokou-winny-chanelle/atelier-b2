"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { browserStorage } from "./persist-storage";
import type { HighlightMark, Mode, ModuleId, Session } from "./types";

interface CreateInput {
  id: string;
  examId: string;
  candidate: string;
  mode: Mode;
  phases: ModuleId[];
  durationMinutes: number;
}

interface ExamState {
  candidate: string;
  sessions: Record<string, Session>;
  setCandidate: (name: string) => void;
  createSession: (input: CreateInput) => void;
  setAnswer: (sessionId: string, questionId: string, choiceId: string) => void;
  clearAnswer: (sessionId: string, questionId: string) => void;
  toggleFlag: (sessionId: string, questionId: string) => void;
  addHighlight: (sessionId: string, mark: HighlightMark) => void;
  removeHighlight: (sessionId: string, markId: string) => void;
  bumpAudio: (sessionId: string, audioId: string) => void;
  refundAudio: (sessionId: string, audioId: string) => void;
  setWriting: (sessionId: string, taskId: string, value: string) => void;
  setNote: (sessionId: string, taskId: string, value: string) => void;
  setPartIndex: (sessionId: string, index: number) => void;
  revealPart: (sessionId: string, partId: string) => void;
  pause: (sessionId: string) => void;
  resume: (sessionId: string) => void;
  advancePhase: (sessionId: string, durationMinutes: number) => void;
  toggleWritingCheck: (sessionId: string, taskId: string, key: string) => void;
  submit: (sessionId: string) => void;
  deleteSession: (sessionId: string) => void;
}

function patch(sessions: Record<string, Session>, id: string, recipe: (session: Session) => Session) {
  const current = sessions[id];
  if (!current) return sessions;
  return { ...sessions, [id]: recipe(current) };
}

export const useExamStore = create<ExamState>()(
  persist(
    (set) => ({
      candidate: "",
      sessions: {},
      setCandidate: (name) => set({ candidate: name }),
      createSession: (input) =>
        set((state) => ({
          candidate: input.candidate,
          sessions: {
            ...state.sessions,
            [input.id]: {
              id: input.id,
              examId: input.examId,
              candidate: input.candidate,
              mode: input.mode,
              phases: input.phases,
              phaseIndex: 0,
              partIndex: 0,
              startedAt: Date.now(),
              endsAt: Date.now() + input.durationMinutes * 60_000,
              pausedRemainingMs: null,
              answers: {},
              flags: {},
              highlights: [],
              audioPlays: {},
              writings: {},
              notes: {},
              revealedParts: [],
              writingChecks: {},
              submitted: false,
              finishedAt: null,
            },
          },
        })),
      setAnswer: (sessionId, questionId, choiceId) =>
        set((state) => ({
          sessions: patch(state.sessions, sessionId, (session) => ({
            ...session,
            answers: { ...session.answers, [questionId]: choiceId },
          })),
        })),
      clearAnswer: (sessionId, questionId) =>
        set((state) => ({
          sessions: patch(state.sessions, sessionId, (session) => {
            const answers = { ...session.answers };
            delete answers[questionId];
            return { ...session, answers };
          }),
        })),
      toggleFlag: (sessionId, questionId) =>
        set((state) => ({
          sessions: patch(state.sessions, sessionId, (session) => ({
            ...session,
            flags: { ...session.flags, [questionId]: !session.flags[questionId] },
          })),
        })),
      addHighlight: (sessionId, mark) =>
        set((state) => ({
          sessions: patch(state.sessions, sessionId, (session) => ({
            ...session,
            highlights: [...session.highlights.filter((item) => item.quote !== mark.quote || item.blockId !== mark.blockId), mark],
          })),
        })),
      removeHighlight: (sessionId, markId) =>
        set((state) => ({
          sessions: patch(state.sessions, sessionId, (session) => ({
            ...session,
            highlights: session.highlights.filter((item) => item.id !== markId),
          })),
        })),
      bumpAudio: (sessionId, audioId) =>
        set((state) => ({
          sessions: patch(state.sessions, sessionId, (session) => ({
            ...session,
            audioPlays: { ...session.audioPlays, [audioId]: (session.audioPlays[audioId] ?? 0) + 1 },
          })),
        })),
      refundAudio: (sessionId, audioId) =>
        set((state) => ({
          sessions: patch(state.sessions, sessionId, (session) => ({
            ...session,
            audioPlays: {
              ...session.audioPlays,
              [audioId]: Math.max(0, (session.audioPlays[audioId] ?? 1) - 1),
            },
          })),
        })),
      setWriting: (sessionId, taskId, value) =>
        set((state) => ({
          sessions: patch(state.sessions, sessionId, (session) => ({
            ...session,
            writings: { ...session.writings, [taskId]: value },
          })),
        })),
      setNote: (sessionId, taskId, value) =>
        set((state) => ({
          sessions: patch(state.sessions, sessionId, (session) => ({
            ...session,
            notes: { ...session.notes, [taskId]: value },
          })),
        })),
      setPartIndex: (sessionId, index) =>
        set((state) => ({
          sessions: patch(state.sessions, sessionId, (session) => ({ ...session, partIndex: index })),
        })),
      revealPart: (sessionId, partId) =>
        set((state) => ({
          sessions: patch(state.sessions, sessionId, (session) => ({
            ...session,
            revealedParts: session.revealedParts.includes(partId)
              ? session.revealedParts
              : [...session.revealedParts, partId],
          })),
        })),
      pause: (sessionId) =>
        set((state) => ({
          sessions: patch(state.sessions, sessionId, (session) => {
            if (session.mode !== "uebung" || session.endsAt == null) return session;
            return {
              ...session,
              pausedRemainingMs: Math.max(0, session.endsAt - Date.now()),
              endsAt: null,
            };
          }),
        })),
      resume: (sessionId) =>
        set((state) => ({
          sessions: patch(state.sessions, sessionId, (session) => {
            if (session.pausedRemainingMs == null) return session;
            return {
              ...session,
              endsAt: Date.now() + session.pausedRemainingMs,
              pausedRemainingMs: null,
            };
          }),
        })),
      advancePhase: (sessionId, durationMinutes) =>
        set((state) => ({
          sessions: patch(state.sessions, sessionId, (session) => ({
            ...session,
            phaseIndex: session.phaseIndex + 1,
            partIndex: 0,
            endsAt: Date.now() + durationMinutes * 60_000,
            pausedRemainingMs: null,
          })),
        })),
      toggleWritingCheck: (sessionId, taskId, key) =>
        set((state) => ({
          sessions: patch(state.sessions, sessionId, (session) => {
            const current = session.writingChecks[taskId] ?? {};
            return {
              ...session,
              writingChecks: {
                ...session.writingChecks,
                [taskId]: { ...current, [key]: !current[key] },
              },
            };
          }),
        })),
      submit: (sessionId) =>
        set((state) => ({
          sessions: patch(state.sessions, sessionId, (session) => ({
            ...session,
            submitted: true,
            finishedAt: Date.now(),
            endsAt: null,
            pausedRemainingMs: null,
          })),
        })),
      deleteSession: (sessionId) =>
        set((state) => {
          const sessions = { ...state.sessions };
          delete sessions[sessionId];
          return { sessions };
        }),
    }),
    { name: "atelier-b2-v1", version: 1, storage: browserStorage() },
  ),
);
