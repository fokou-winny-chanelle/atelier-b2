import type { Exam, Part, SpeakingTask, WritingTask } from "./types";
import { EXAMS } from "./exams";

export interface PoolCard {
  questionId: string;
  partId: string;
  skill: string;
  examId: string;
}

export interface PoolBlock {
  partId: string;
  skill: string;
  examId: string;
  questionIds: string[];
}

export interface PoolPrompt {
  taskId: string;
  examId: string;
}

export interface SkillInfo {
  id: string;
  module: string;
  title: string;
  detail: string;
  exclusive: boolean;
}

export const SKILLS: SkillInfo[] = [
  { id: "lesen-1", module: "Lesen", title: "Quatre personnes", detail: "Lis les phrases d’abord, puis un texte à la fois. Une personne peut revenir plusieurs fois.", exclusive: false },
  { id: "lesen-2", module: "Lesen", title: "Texte à trous", detail: "Deux phrases sont en trop. Chaque phrase ne s’utilise qu’une fois.", exclusive: true },
  { id: "lesen-3", module: "Lesen", title: "Choix a, b ou c", detail: "La bonne réponse reprend l’idée du texte, souvent avec d’autres mots.", exclusive: false },
  { id: "lesen-4", module: "Lesen", title: "Titres et avis", detail: "Un avis ne correspond à aucun titre. L’exemple est déjà utilisé.", exclusive: true },
  { id: "lesen-5", module: "Lesen", title: "Règlements", detail: "Quatre titres sont en trop. Cherche le sujet du paragraphe, pas un mot isolé.", exclusive: true },
  { id: "hoeren-1", module: "Hören", title: "Textes courts", detail: "Lis les deux questions, puis écoute une seule fois.", exclusive: false },
  { id: "hoeren-2", module: "Hören", title: "Interview", detail: "Deux écoutes. Attention aux mots nur, nicht, immer, fast.", exclusive: false },
  { id: "hoeren-3", module: "Hören", title: "Qui le dit ?", detail: "Une seule écoute. La même personne peut revenir.", exclusive: false },
  { id: "hoeren-4", module: "Hören", title: "Exposé", detail: "Deux écoutes. Les chiffres proches sont souvent des pièges.", exclusive: false },
  { id: "schreiben", module: "Schreiben", title: "Écrire", detail: "Traite chaque point demandé, avec une entrée et une fin. Compte les mots.", exclusive: false },
  { id: "sprechen", module: "Sprechen", title: "Parler", detail: "Parle à voix haute. Les notes servent seulement à préparer.", exclusive: false },
];

export function skillOf(moduleId: "lesen" | "hoeren", title: string): string {
  const match = /(\d+)/.exec(title);
  return `${moduleId}-${match?.[1] ?? "1"}`;
}

export function locatePart(partId: string): { exam: Exam; moduleId: "lesen" | "hoeren"; part: Part } | undefined {
  for (const exam of EXAMS) {
    for (const moduleId of ["lesen", "hoeren"] as const) {
      const part = exam[moduleId].parts.find((item) => item.id === partId);
      if (part) return { exam, moduleId, part };
    }
  }
  return undefined;
}

export function locateWriting(taskId: string): { exam: Exam; task: WritingTask } | undefined {
  for (const exam of EXAMS) {
    const task = exam.schreiben.tasks.find((item) => item.id === taskId);
    if (task) return { exam, task };
  }
  return undefined;
}

export function locateSpeaking(taskId: string): { exam: Exam; task: SpeakingTask } | undefined {
  for (const exam of EXAMS) {
    const task = exam.sprechen.tasks.find((item) => item.id === taskId);
    if (task) return { exam, task };
  }
  return undefined;
}

export function poolCards(): PoolCard[] {
  const cards: PoolCard[] = [];
  for (const exam of EXAMS) {
    for (const moduleId of ["lesen", "hoeren"] as const) {
      for (const part of exam[moduleId].parts) {
        if (part.exclusive) continue;
        for (const question of part.questions) {
          if (question.example) continue;
          cards.push({
            questionId: question.id,
            partId: part.id,
            skill: skillOf(moduleId, part.title),
            examId: exam.id,
          });
        }
      }
    }
  }
  return cards;
}

export function poolBlocks(): PoolBlock[] {
  const blocks: PoolBlock[] = [];
  for (const exam of EXAMS) {
    for (const moduleId of ["lesen", "hoeren"] as const) {
      for (const part of exam[moduleId].parts) {
        if (!part.exclusive) continue;
        blocks.push({
          partId: part.id,
          skill: skillOf(moduleId, part.title),
          examId: exam.id,
          questionIds: part.questions.filter((question) => !question.example).map((question) => question.id),
        });
      }
    }
  }
  return blocks;
}

export function trackedQuestions(): PoolCard[] {
  return [
    ...poolCards(),
    ...poolBlocks().flatMap((block) =>
      block.questionIds.map((questionId) => ({
        questionId,
        partId: block.partId,
        skill: block.skill,
        examId: block.examId,
      })),
    ),
  ];
}
export function poolWrites(): PoolPrompt[] {
  return EXAMS.flatMap((exam) => exam.schreiben.tasks.map((task) => ({ taskId: task.id, examId: exam.id })));
}

export function poolSpeaks(): PoolPrompt[] {
  return EXAMS.flatMap((exam) => exam.sprechen.tasks.map((task) => ({ taskId: task.id, examId: exam.id })));
}
