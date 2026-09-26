import { SKILLS, type PoolBlock, type PoolCard, type PoolListen, type PoolPrompt } from "./catalog";

export interface MemoryItem {
  seen: number;
  correct: number;
  wrong: number;
  streak: number;
  dueAt: number;
}

export type PlanStep =
  | { kind: "card"; questionId: string; partId: string; examId: string }
  | { kind: "block"; partId: string; examId: string }
  | { kind: "listen"; stimulusId: string; partId: string; examId: string; questionIds: string[] }
  | { kind: "write"; taskId: string; examId: string }
  | { kind: "speak"; taskId: string; examId: string };

const DAY = 86_400_000;
const EXCLUSIVE_SKILLS = new Set(["lesen-2", "lesen-4", "lesen-5"]);

export function nextMemory(prev: MemoryItem | undefined, correct: boolean, now: number): MemoryItem {
  const base = prev ?? { seen: 0, correct: 0, wrong: 0, streak: 0, dueAt: 0 };
  const streak = correct ? base.streak + 1 : 0;
  const waits = [1, 2, 5, 12, 21];
  const wait = correct ? waits[Math.min(streak, waits.length - 1)] : 1;
  return {
    seen: base.seen + 1,
    correct: base.correct + (correct ? 1 : 0),
    wrong: base.wrong + (correct ? 0 : 1),
    streak,
    dueAt: now + wait * DAY,
  };
}

export function localDay(now: number): string {
  const date = new Date(now);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function hash(seed: string): number {
  let value = 2166136261;
  for (let index = 0; index < seed.length; index += 1) {
    value = Math.imul(value ^ seed.charCodeAt(index), 16777619);
  }
  return value >>> 0;
}

export function shuffle<T>(items: T[], seed: string): T[] {
  const copy = [...items];
  let state = hash(seed) || 1;
  for (let index = copy.length - 1; index > 0; index -= 1) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    const swap = state % (index + 1);
    const current = copy[index];
    copy[index] = copy[swap] as T;
    copy[swap] = current as T;
  }
  return copy;
}

function isDue(memory: Record<string, MemoryItem>, questionId: string, now: number): boolean {
  const item = memory[questionId];
  return Boolean(item && item.dueAt <= now);
}

function cardStep(card: PoolCard): PlanStep {
  return { kind: "card", questionId: card.questionId, partId: card.partId, examId: card.examId };
}

function openCount(
  block: PoolBlock,
  input: { now: number; memory: Record<string, MemoryItem> },
): number {
  return block.questionIds.filter((questionId) => !input.memory[questionId] || isDue(input.memory, questionId, input.now)).length;
}

export function buildPlan(input: {
  now: number;
  memory: Record<string, MemoryItem>;
  cards: PoolCard[];
  blocks: PoolBlock[];
  writes: PoolPrompt[];
  speaks: PoolPrompt[];
  listens?: PoolListen[];
  kind: "daily" | "review" | "skill";
  skill?: string;
  salt?: string;
}): { title: string; blurb: string; steps: PlanStep[] } {
  const seed = `${localDay(input.now)}:${input.kind}:${input.skill ?? ""}:${input.salt ?? ""}`;
  const weekday = new Date(input.now).getDay();

  if (input.kind === "review") {
    const dueCards = shuffle(
      input.cards.filter((card) => !isListening(card.skill) && isDue(input.memory, card.questionId, input.now)),
      seed,
    ).slice(0, 12);
    const dueBlocks = shuffle(
      input.blocks.filter((block) => block.questionIds.some((questionId) => isDue(input.memory, questionId, input.now))),
      `${seed}:blocks`,
    ).slice(0, 2);
    const dueListens = takeListens(
      shuffle(
        (input.listens ?? []).filter((unit) => unit.questionIds.some((questionId) => isDue(input.memory, questionId, input.now))),
        `${seed}:listen`,
      ),
      12,
    );
    const steps: PlanStep[] = [
      ...dueListens.map(listenStep),
      ...dueBlocks.map((block) => ({ kind: "block" as const, partId: block.partId, examId: block.examId })),
      ...dueCards.map(cardStep),
    ];
    return {
      title: "À revoir",
      blurb: steps.length === 0 ? "Rien à revoir pour le moment." : steps.length === 1 ? "1 exercice à revoir aujourd’hui." : `${steps.length} exercices à revoir aujourd’hui.`,
      steps,
    };
  }

  if (input.kind === "skill" && input.skill) {
    return skillPlan(input, seed);
  }

  const steps: PlanStep[] = [];
  const blocked = new Set<string>();
  const listen = pickListen(input.listens ?? [], input.memory, input.now, seed);
  if (listen) {
    steps.push({
      kind: "listen",
      stimulusId: listen.stimulusId,
      partId: listen.partId,
      examId: listen.examId,
      questionIds: listen.questionIds,
    });
    for (const questionId of listen.questionIds) blocked.add(questionId);
  }

  if (weekday === 6 && input.writes.length > 0) {
    const task = input.writes[Math.floor(input.now / (7 * DAY)) % input.writes.length];
    if (task) steps.push({ kind: "write", taskId: task.taskId, examId: task.examId });
  }
  if (weekday === 0 && input.speaks.length > 0) {
    const task = input.speaks[Math.floor(input.now / (7 * DAY)) % input.speaks.length];
    if (task) steps.push({ kind: "speak", taskId: task.taskId, examId: task.examId });
  }
  if (weekday === 2 || weekday === 4) {
    const skill = weekday === 2 ? "lesen-2" : weekday === 4 ? "lesen-4" : "lesen-5";
    const block = shuffle(
      input.blocks.filter((item) => item.skill === skill),
      seed,
    )[0];
    if (block) {
      steps.push({ kind: "block", partId: block.partId, examId: block.examId });
      for (const questionId of block.questionIds) blocked.add(questionId);
    }
  }

  const readable = (card: PoolCard) => !isListening(card.skill) && !blocked.has(card.questionId);
  const due = shuffle(
    input.cards.filter((card) => readable(card) && isDue(input.memory, card.questionId, input.now)),
    `${seed}:due`,
  );
  const unseen = shuffle(
    input.cards.filter((card) => readable(card) && !input.memory[card.questionId]),
    `${seed}:new`,
  );
  const rest = shuffle(
    input.cards.filter((card) => readable(card)),
    `${seed}:rest`,
  );
  const baseTarget = weekday === 6 || weekday === 0 ? 4 : 10;
  const target = Math.max(0, baseTarget - blocked.size);
  const picked: PoolCard[] = [];
  for (const card of [...due, ...unseen, ...rest]) {
    if (picked.length >= target) break;
    if (picked.some((item) => item.questionId === card.questionId)) continue;
    picked.push(card);
  }
  steps.push(...picked.map(cardStep));

  const cards = steps.filter((step) => step.kind === "card").length;
  const hasBlock = steps.some((step) => step.kind === "block");
  const hasListen = steps.some((step) => step.kind === "listen");
  const hasWrite = steps.some((step) => step.kind === "write" || step.kind === "speak");
  const bits = [
    hasListen ? "une écoute" : "",
    hasWrite ? "un texte ou un oral" : "",
    hasBlock ? "une partie entière" : "",
    cards === 1 ? "1 question" : cards > 1 ? `${cards} questions` : "",
  ].filter(Boolean);
  const joined = bits.join(", ").replace(/, ([^,]*)$/, " et $1");
  const blurb = joined ? `${joined.charAt(0).toUpperCase()}${joined.slice(1)}.` : "Une série courte.";

  return { title: "Aujourd’hui", blurb, steps };
}

function isListening(skill: string): boolean {
  return skill.startsWith("hoeren");
}

function listenStep(unit: PoolListen): PlanStep {
  return { kind: "listen", stimulusId: unit.stimulusId, partId: unit.partId, examId: unit.examId, questionIds: unit.questionIds };
}

function takeListens(units: PoolListen[], limit: number): PoolListen[] {
  const picked: PoolListen[] = [];
  let count = 0;
  for (const unit of units) {
    if (picked.length > 0 && count + unit.questionIds.length > limit) break;
    picked.push(unit);
    count += unit.questionIds.length;
    if (count >= limit) break;
  }
  return picked;
}

function pickListen(listens: PoolListen[], memory: Record<string, MemoryItem>, now: number, seed: string): PoolListen | undefined {
  if (listens.length === 0) return undefined;
  const due = listens.filter((unit) => unit.questionIds.some((questionId) => isDue(memory, questionId, now)));
  const unseen = listens.filter((unit) => unit.questionIds.every((questionId) => !memory[questionId]));
  const pool = due.length > 0 ? due : unseen.length > 0 ? unseen : listens;
  return shuffle(pool, `${seed}:listen`)[0];
}

function skillPlan(
  input: {
    now: number;
    memory: Record<string, MemoryItem>;
    cards: PoolCard[];
    blocks: PoolBlock[];
    writes: PoolPrompt[];
    speaks: PoolPrompt[];
    listens?: PoolListen[];
    skill?: string;
  },
  seed: string,
): { title: string; blurb: string; steps: PlanStep[] } {
  const skill = input.skill ?? "";
  if (skill === "schreiben") {
    const task = shuffle(input.writes, seed)[0];
    return {
      title: "Écrire",
      blurb: "Un seul texte, à ton rythme.",
      steps: task ? [{ kind: "write", taskId: task.taskId, examId: task.examId }] : [],
    };
  }
  if (skill === "sprechen") {
    const task = shuffle(input.speaks, seed)[0];
    return {
      title: "Parler",
      blurb: "Prépare, puis dis-le à voix haute.",
      steps: task ? [{ kind: "speak", taskId: task.taskId, examId: task.examId }] : [],
    };
  }
  const named = SKILLS.find((item) => item.id === skill)?.title;
  if (isListening(skill)) {
    const mine = (input.listens ?? []).filter((unit) => unit.skill === skill);
    const ordered = [
      ...shuffle(mine.filter((unit) => unit.questionIds.some((questionId) => isDue(input.memory, questionId, input.now))), `${seed}:due`),
      ...shuffle(mine.filter((unit) => unit.questionIds.every((questionId) => !input.memory[questionId])), `${seed}:new`),
      ...shuffle(mine, `${seed}:rest`),
    ];
    const unique: PoolListen[] = [];
    for (const unit of ordered) {
      if (unique.some((item) => item.stimulusId === unit.stimulusId)) continue;
      unique.push(unit);
    }
    return {
      title: named ?? "Écoute",
      blurb: "Tu écoutes chaque texte en entier, sans le lire, puis tu vois pourquoi.",
      steps: takeListens(unique, 8).map(listenStep),
    };
  }
  if (EXCLUSIVE_SKILLS.has(skill)) {
    const ranked = input.blocks
      .filter((item) => item.skill === skill)
      .slice()
      .sort((left, right) => openCount(right, input) - openCount(left, input));
    const block = ranked[0];
    return {
      title: named ?? "Partie entière",
      blurb: "Tu réponds à toute la partie, puis tu vois pourquoi.",
      steps: block ? [{ kind: "block", partId: block.partId, examId: block.examId }] : [],
    };
  }
  const mine = input.cards.filter((card) => card.skill === skill);
  const ordered = [
    ...shuffle(mine.filter((card) => !input.memory[card.questionId]), `${seed}:new`),
    ...shuffle(mine.filter((card) => isDue(input.memory, card.questionId, input.now)), `${seed}:due`),
    ...shuffle(mine, `${seed}:rest`),
  ];
  const picked: PoolCard[] = [];
  for (const card of ordered) {
    if (picked.length >= 8) break;
    if (picked.some((item) => item.questionId === card.questionId)) continue;
    picked.push(card);
  }
  return {
    title: named ?? "Questions",
    blurb: picked.length === 1 ? "1 question, avec la raison." : `${picked.length} questions, une par une, avec la raison.`,
    steps: picked.map(cardStep),
  };
}

export function practiceStreak(days: string[], now: number): number {
  const seen = new Set(days);
  const date = new Date(now);
  if (!seen.has(localDay(date.getTime()))) date.setDate(date.getDate() - 1);
  if (!seen.has(localDay(date.getTime()))) return 0;
  let count = 0;
  while (seen.has(localDay(date.getTime()))) {
    count += 1;
    date.setDate(date.getDate() - 1);
  }
  return count;
}

export function dayKey(now: number): string {
  return localDay(now);
}
