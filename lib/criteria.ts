export type CriterionMark = "tenu" | "fragile" | "manque";

export interface Criterion {
  id: string;
  label: string;
  hint: string;
}

/** Self-check aligned with the Goethe writing sheet. This is not an examiner score. */
export const WRITING_CRITERIA: Criterion[] = [
  { id: "tache", label: "Tâche", hint: "Chaque point demandé est traité, dans le bon type de texte." },
  { id: "coherence", label: "Cohérence", hint: "Une entrée, un développement, une fin. On peut te suivre." },
  { id: "lexique", label: "Vocabulaire", hint: "Des mots précis, pas seulement ceux de la consigne." },
  { id: "structures", label: "Structures", hint: "Des phrases complètes. Les erreurs ne bloquent pas la lecture." },
];

/** Self-check aligned with the Goethe speaking sheet. The introduction is not graded. */
export const SPEAKING_CRITERIA: Criterion[] = [
  { id: "tache", label: "Tâche", hint: "Le sujet est couvert, avec assez de matière." },
  { id: "coherence", label: "Fluidité", hint: "On te suit. Ce n’est pas une liste de mots." },
  { id: "lexique", label: "Vocabulaire", hint: "Tu cherches le mot juste, pas seulement le plus simple." },
  { id: "structures", label: "Structures", hint: "Des phrases. Tu te reprends quand ça casse." },
  { id: "aussprache", label: "Prononciation", hint: "On te comprend sans effort constant." },
];
