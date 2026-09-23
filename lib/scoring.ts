import type { Exam, ModuleId, Part, Question } from "./types";
import { PASS_POINTS } from "./types";

export interface GradeBand {
  de: string;
  fr: string;
  passed: boolean;
}

export function bandFor(points: number): GradeBand {
  if (points >= 90) return { de: "sehr gut", fr: "Très bien", passed: true };
  if (points >= 80) return { de: "gut", fr: "Bien", passed: true };
  if (points >= 70) return { de: "befriedigend", fr: "Satisfaisant", passed: true };
  if (points >= 60) return { de: "ausreichend", fr: "Passable", passed: true };
  return { de: "nicht bestanden", fr: "Non réussi", passed: false };
}

export function countWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).filter(Boolean).length;
}

export function scoredQuestions(part: Part): Question[] {
  return part.questions.filter((question) => !question.example);
}

/** Goethe-Zertifikat B2: 30 items × 3,33, rounded. 18 right answers = 60, the pass line. */
const POINTS_FOR_30 = [0, 3, 7, 10, 13, 17, 20, 23, 27, 30, 33, 37, 40, 43, 47, 50, 53, 57, 60, 63, 67, 70, 73, 77, 80, 83, 87, 90, 93, 97, 100];

export function checkpointPoints(correct: number, total: number): number {
  if (total <= 0) return 0;
  const safe = Math.max(0, Math.min(total, correct));
  if (total === 30) return POINTS_FOR_30[safe] ?? 0;
  return Math.round((safe / total) * 100);
}

export function gradeQuestions(
  questions: Question[],
  answers: Record<string, string>,
): { correct: number; total: number; points: number; passed: boolean } {
  const scored = questions.filter((question) => !question.example);
  const total = scored.length;
  const correct = scored.filter((question) => answers[question.id] === question.answer).length;
  const points = checkpointPoints(correct, total);
  return { correct, total, points, passed: points >= PASS_POINTS };
}

export function partsFor(exam: Exam, moduleId: ModuleId): Part[] {
  if (moduleId === "lesen" || moduleId === "hoeren") return exam[moduleId].parts;
  return [];
}

export function allScoredQuestions(parts: Part[]): Question[] {
  return parts.flatMap(scoredQuestions);
}

export function unansweredInPart(part: Part, answers: Record<string, string>): number {
  return scoredQuestions(part).filter((question) => !answers[question.id]).length;
}

export function durationFor(exam: Exam, moduleId: ModuleId): number {
  return exam[moduleId].durationMinutes;
}
