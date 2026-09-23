export type Mode = "pruefung" | "uebung";

export type ClosedModuleId = "lesen" | "hoeren";
export type OpenModuleId = "schreiben" | "sprechen";
export type ModuleId = ClosedModuleId | OpenModuleId;

export interface Choice {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  number: number;
  prompt: string;
  choices: Choice[];
  answer: string;
  explanation: string;
  example?: boolean;
}

export interface AudioClip {
  id: string;
  label: string;
  maxPlays: 1 | 2;
  script: string;
}

export interface Stimulus {
  id: string;
  kicker?: string;
  title?: string;
  body: string;
  audioId?: string;
}

export interface Part {
  id: string;
  title: string;
  suggestedMinutes: number;
  instruction: string;
  /** Each option may be used only once (gaps, headings). */
  exclusive: boolean;
  stimuli: Stimulus[];
  clips: AudioClip[];
  questions: Question[];
}

export interface WritingTask {
  id: string;
  title: string;
  situation: string;
  bullets: string[];
  minWords: number;
  closingNote: string;
  coach: string;
}

export interface SpeakingTask {
  id: string;
  title: string;
  minutes: number;
  situation: string;
  bullets: string[];
  coach: string;
}

export interface ClosedModule {
  id: ClosedModuleId;
  label: string;
  durationMinutes: number;
  parts: Part[];
}

export interface WritingModule {
  id: "schreiben";
  label: string;
  durationMinutes: number;
  tasks: WritingTask[];
}

export interface SpeakingModule {
  id: "sprechen";
  label: string;
  durationMinutes: number;
  tasks: SpeakingTask[];
}

export interface Exam {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  lesen: ClosedModule;
  hoeren: ClosedModule;
  schreiben: WritingModule;
  sprechen: SpeakingModule;
}

export interface HighlightMark {
  id: string;
  blockId: string;
  quote: string;
}

export interface Session {
  id: string;
  examId: string;
  candidate: string;
  mode: Mode;
  phases: ModuleId[];
  phaseIndex: number;
  partIndex: number;
  startedAt: number;
  endsAt: number | null;
  pausedRemainingMs: number | null;
  answers: Record<string, string>;
  flags: Record<string, boolean>;
  highlights: HighlightMark[];
  audioPlays: Record<string, number>;
  writings: Record<string, string>;
  notes: Record<string, string>;
  revealedParts: string[];
  writingChecks: Record<string, Record<string, boolean>>;
  submitted: boolean;
  finishedAt: number | null;
}

export const PASS_POINTS = 60;

export const MODULE_LABEL: Record<ModuleId, string> = {
  lesen: "Lesen",
  hoeren: "Hören",
  schreiben: "Schreiben",
  sprechen: "Sprechen",
};
