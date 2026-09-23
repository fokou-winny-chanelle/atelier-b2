import type { Exam } from "../types";

export function examIssues(exam: Exam): string[] {
  const issues: string[] = [];
  const ids = new Set<string>();

  const track = (id: string) => {
    if (ids.has(id)) issues.push(`${exam.id}: duplicate id ${id}`);
    ids.add(id);
  };

  for (const moduleId of ["lesen", "hoeren"] as const) {
    const numbers = new Set<number>();
    for (const part of exam[moduleId].parts) {
      const clipIds = new Set(part.clips.map((clip) => clip.id));
      for (const clip of part.clips) track(clip.id);
      for (const stimulus of part.stimuli) {
        track(stimulus.id);
        if (stimulus.audioId && !clipIds.has(stimulus.audioId)) {
          issues.push(`${exam.id}: ${stimulus.id} missing audio ${stimulus.audioId}`);
        }
      }
      for (const match of part.stimuli.flatMap((stimulus) => [...stimulus.body.matchAll(/\[\[(\d+)\]\]/g)])) {
        const number = Number(match[1]);
        if (!part.questions.some((question) => question.number === number)) {
          issues.push(`${exam.id}: ${part.id} gap ${number} has no question`);
        }
      }
      const chosen: string[] = [];
      for (const question of part.questions) {
        track(question.id);
        if (!question.example) {
          if (numbers.has(question.number)) issues.push(`${exam.id}: duplicate number ${moduleId} ${question.number}`);
          numbers.add(question.number);
        }
        if (!question.choices.some((choice) => choice.id === question.answer)) {
          issues.push(`${exam.id}: ${question.id} answer not in choices`);
        }
        if (question.explanation.trim().length < 8) issues.push(`${exam.id}: ${question.id} explanation too short`);
        chosen.push(question.answer);
      }
      if (part.exclusive && new Set(chosen).size !== chosen.length) {
        issues.push(`${exam.id}: ${part.id} reuses an exclusive option`);
      }
    }
  }

  for (const task of exam.schreiben.tasks) track(task.id);
  for (const task of exam.sprechen.tasks) track(task.id);
  return issues;
}
