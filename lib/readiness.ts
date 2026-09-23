import type { CriterionMark } from "./criteria";
import type { MemoryItem } from "./plan";
import type { ModuleId } from "./types";
import { MODULE_LABEL } from "./types";

export interface MockModuleScore {
  id: "lesen" | "hoeren";
  points: number;
  passed: boolean;
}

export interface MockRecord {
  sessionId: string;
  examId: string;
  at: number;
  modules: MockModuleScore[];
}

export interface ProductionRecord {
  id: string;
  kind: "schreiben" | "sprechen";
  taskId: string;
  examId: string;
  at: number;
  words: number;
  minWords: number;
  held: number;
  asked: number;
}

export interface SkillSnapshot {
  id: string;
  module: string;
  title: string;
}

export interface ModulePicture {
  id: ModuleId;
  label: string;
  rate: number | null;
  wrong: number;
  lastPoints: number | null;
  status: "inconnu" | "fragile" | "proche" | "seuil";
  note: string;
}

export interface Advice {
  title: string;
  detail: string;
  button: string;
  action: "continue" | "review" | "daily" | "skill";
  skill?: string;
}

const DAY = 86_400_000;

function rateOf(memory: Record<string, MemoryItem>, ids: string[]): { rate: number | null; wrong: number } {
  let correct = 0;
  let attempts = 0;
  let wrong = 0;
  for (const id of ids) {
    const item = memory[id];
    if (!item) continue;
    correct += item.correct;
    attempts += item.seen;
    wrong += item.wrong;
  }
  return { rate: attempts ? Math.round((correct / attempts) * 100) : null, wrong };
}

function lastMock(mocks: MockRecord[], id: "lesen" | "hoeren"): MockModuleScore | null {
  const found = [...mocks].reverse().flatMap((mock) => mock.modules.filter((module) => module.id === id)).at(0);
  return found ?? null;
}

function lastProduction(productions: ProductionRecord[], kind: "schreiben" | "sprechen"): ProductionRecord | null {
  return [...productions].reverse().find((item) => item.kind === kind) ?? null;
}

export function modulePictures(input: {
  memory: Record<string, MemoryItem>;
  cards: { questionId: string; skill: string }[];
  mocks: MockRecord[];
  productions: ProductionRecord[];
}): ModulePicture[] {
  return (["lesen", "hoeren", "schreiben", "sprechen"] as ModuleId[]).map((id) => {
    if (id === "lesen" || id === "hoeren") {
      const ids = input.cards.filter((card) => card.skill.startsWith(`${id}-`)).map((card) => card.questionId);
      const { rate, wrong } = rateOf(input.memory, ids);
      const mock = lastMock(input.mocks, id);
      const lastPoints = mock?.points ?? null;
      let status: ModulePicture["status"] = "inconnu";
      if (mock?.passed) status = "seuil";
      else if (mock || (rate != null && rate < 60)) status = "fragile";
      else if (rate != null) status = "proche";
      const note = mock
        ? `Dernier blanc : ${mock.points}/100`
        : rate == null
          ? "Pas encore travaillé"
          : `${rate} % à l’entraînement`;
      return { id, label: MODULE_LABEL[id], rate, wrong, lastPoints, status, note };
    }
    const latest = lastProduction(input.productions, id);
    let status: ModulePicture["status"] = "inconnu";
    if (latest && (latest.words < latest.minWords || (latest.asked > 0 && latest.held / latest.asked < 0.6))) status = "fragile";
    else if (latest) status = "proche";
    const note = latest
      ? status === "fragile"
        ? "Dernier texte ou oral encore fragile"
        : "Produit et relu. Ce n’est pas une note d’examinateur."
      : "Pas encore produit";
    return { id, label: MODULE_LABEL[id], rate: null, wrong: 0, lastPoints: null, status, note };
  });
}

export function advise(input: {
  now: number;
  running: boolean;
  dueSteps: number;
  memory: Record<string, MemoryItem>;
  cards: { questionId: string; skill: string }[];
  skills: SkillSnapshot[];
  mocks: MockRecord[];
  productions: ProductionRecord[];
}): Advice {
  if (input.running) {
    return {
      title: "Série ouverte",
      detail: "Termine-la, ou abandonne-la depuis l’entraînement, avant d’en changer.",
      button: "Continuer la série",
      action: "continue",
    };
  }
  if (input.dueSteps > 0) {
    return {
      title: "Erreurs à revoir",
      detail: `${input.dueSteps} retour${input.dueSteps > 1 ? "s" : ""} prévu${input.dueSteps > 1 ? "s" : ""} aujourd’hui. C’est ça qui fait monter un module.`,
      button: "Revoir",
      action: "review",
    };
  }
  const pictures = modulePictures(input);
  const fragileClosed = pictures.filter((module) => (module.id === "lesen" || module.id === "hoeren") && module.status === "fragile");
  if (fragileClosed.length > 0) {
    const target = fragileClosed.slice().sort((a, b) => (a.rate ?? a.lastPoints ?? 100) - (b.rate ?? b.lastPoints ?? 100))[0];
    if (target) {
      const skill = weakestSkill(input, target.id);
      return {
        title: `${target.label} est sous le seuil`,
        detail: `${target.note}. Un module se réussit seul à 60. Un autre module ne le rattrape pas.`,
        button: `Travailler ${target.label}`,
        action: "skill",
        skill: skill?.id,
      };
    }
  }
  const closed = pictures.filter((module) => module.id === "lesen" || module.id === "hoeren");
  if (closed.some((module) => module.status === "inconnu")) {
    return {
      title: "Série du jour",
      detail: "Commence par les questions. Chaque module se réussit seul à 60, et les erreurs reviennent.",
      button: "Commencer",
      action: "daily",
    };
  }
  const schreiben = pictures.find((module) => module.id === "schreiben");
  const sprechen = pictures.find((module) => module.id === "sprechen");
  const write = lastProduction(input.productions, "schreiben");
  const speak = lastProduction(input.productions, "sprechen");
  if (schreiben && (schreiben.status === "inconnu" || schreiben.status === "fragile" || !write || input.now - write.at > 6 * DAY)) {
    return {
      title: "Écrire",
      detail: "Le forum et le message se notent à part. Un texte relu vaut mieux qu’une question de plus.",
      button: "Écrire un texte",
      action: "skill",
      skill: "schreiben",
    };
  }
  if (sprechen && (sprechen.status === "inconnu" || sprechen.status === "fragile" || !speak || input.now - speak.at > 6 * DAY)) {
    return {
      title: "Parler",
      detail: "À l’examen, tu as 15 minutes pour préparer, puis tu parles. Ici, tu le fais à voix haute.",
      button: "Parler",
      action: "skill",
      skill: "sprechen",
    };
  }
  return {
    title: "Série du jour",
    detail: "Questions nouvelles et questions dues. Compte environ un quart d’heure.",
    button: "Commencer",
    action: "daily",
  };
}

function weakestSkill(
  input: { memory: Record<string, MemoryItem>; cards: { questionId: string; skill: string }[]; skills: SkillSnapshot[] },
  moduleId: ModuleId,
): SkillSnapshot | undefined {
  const mine = input.skills.filter((skill) => skill.id.startsWith(`${moduleId}-`));
  const ranked = mine
    .map((skill) => {
      const ids = input.cards.filter((card) => card.skill === skill.id).map((card) => card.questionId);
      return { skill, ...rateOf(input.memory, ids) };
    })
    .sort((a, b) => (a.rate ?? 101) - (b.rate ?? 101) || b.wrong - a.wrong);
  return ranked[0]?.skill ?? mine[0];
}

export function heldCount(marks: Record<string, CriterionMark | undefined>, ids: string[]): number {
  return ids.filter((id) => marks[id] === "tenu").length;
}
