"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CriteriaMarks } from "@/components/coach/CriteriaMarks";
import { useHydrated } from "@/components/useHydrated";
import { locatePart, locateSpeaking, locateWriting } from "@/lib/catalog";
import { SPEAKING_CRITERIA, WRITING_CRITERIA, type CriterionMark } from "@/lib/criteria";
import { heldCount } from "@/lib/readiness";
import { useLearnStore } from "@/lib/learn-store";
import { speakGerman, type SpeakHandle } from "@/lib/speak";
import { countWords } from "@/lib/scoring";
import type { AudioClip, Part, Question, SpeakingTask, WritingTask } from "@/lib/types";

function filledBody(body: string, questions: Question[], answers: Record<string, string>): string {
  return body.replace(/\[\[(\d+)\]\]/g, (_, number: string) => {
    const question = questions.find((item) => item.number === Number(number));
    const choice = question ? answers[question.id] : undefined;
    return choice ? choice.toUpperCase() : "_____";
  });
}

function seriesTally(plan: NonNullable<ReturnType<typeof useLearnStore.getState>["plan"]>): { asked: number; correct: number; wrong: number; misses: string[] } {
  let correct = 0;
  let wrong = 0;
  const misses: string[] = [];
  for (const step of plan.steps) {
    if (step.kind !== "card" && step.kind !== "block") continue;
    const located = locatePart(step.partId);
    if (!located) continue;
    const ids = step.kind === "card" && step.questionId ? [step.questionId] : located.part.questions.filter((question) => !question.example).map((question) => question.id);
    for (const id of ids) {
      const question = located.part.questions.find((item) => item.id === id);
      if (!question || question.example || !plan.revealed[id]) continue;
      if (plan.answers[id] === question.answer) correct += 1;
      else {
        wrong += 1;
        if (misses.length < 3) misses.push(question.prompt);
      }
    }
  }
  return { asked: correct + wrong, correct, wrong, misses };
}

function compte(count: number, one: string, many: string): string {
  return `${count} ${count === 1 ? one : many}`;
}

function letterOf(id: string): string {
  if (id === "r") return "R";
  if (id === "f") return "F";
  return id.toUpperCase();
}

export function PracticeScreen() {
  const hydrated = useHydrated();
  const plan = useLearnStore((state) => state.plan);
  const answer = useLearnStore((state) => state.answer);
  const reveal = useLearnStore((state) => state.reveal);
  const next = useLearnStore((state) => state.next);
  const bumpAudio = useLearnStore((state) => state.bumpAudio);
  const refundAudio = useLearnStore((state) => state.refundAudio);
  const close = useLearnStore((state) => state.close);
  const back = useLearnStore((state) => state.back);
  const router = useRouter();

  if (!hydrated) return <p className="p-8">Préparation…</p>;
  if (!plan) {
    return (
      <main className="mx-auto flex min-h-dvh max-w-xl flex-col justify-center px-6">
        <h1 className="font-serif text-4xl">Aucune série en cours</h1>
        <Link href="/" className="mt-6 inline-flex min-h-12 w-fit items-center rounded-full bg-[#16324f] px-5 font-semibold text-[#f6f1e7]">
          Retour
        </Link>
      </main>
    );
  }
  if (plan.finishedAt || plan.index >= plan.steps.length) {
    const tally = seriesTally(plan);
    return (
      <main className="mx-auto flex min-h-dvh max-w-2xl flex-col justify-center px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-wider text-[#5c4318]">Série terminée</p>
        <h1 className="mt-2 font-serif text-5xl">{plan.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-[#1c1915]">
          {tally.asked === 0 ? "Pas de question fermée dans cette série. L’écrit ou l’oral est gardé à part." : `${compte(tally.correct, "juste", "justes")} · ${compte(tally.wrong, "ratée", "ratées")}.`}
        </p>
        {tally.misses.length > 0 ? (
          <>
            <p className="mt-4 font-semibold">À retenir</p>
            <ul className="mt-2 grid gap-2">
              {tally.misses.map((miss) => (
                <li key={miss} className="rounded-2xl bg-white px-4 py-3 text-[#1c1915]">{miss}</li>
              ))}
            </ul>
            {tally.wrong > tally.misses.length ? <p className="mt-2 text-sm text-[#5e584e]">Les autres reviennent demain aussi.</p> : null}
          </>
        ) : null}
        <p className="mt-4 text-[#5e584e]">Une erreur revient demain. Une bonne réponse revient plus tard.</p>
        <Link href="/" onClick={() => close()} className="mt-8 inline-flex min-h-12 w-fit items-center justify-center rounded-full bg-[#16324f] px-6 font-semibold text-[#f6f1e7]">
          Retour à aujourd’hui
        </Link>
      </main>
    );
  }

  const step = plan.steps[plan.index];
  if (!step) return null;
  const progress = `${plan.index + 1} / ${plan.steps.length}`;

  return (
    <div className="flex min-h-dvh flex-col bg-[#f3efe6] text-[#1c1915]">
      <header className="shrink-0 bg-[#16324f] px-3 py-2 text-[#f6f1e7] lg:px-8">
        <div className="mx-auto grid w-full max-w-3xl grid-cols-3 items-center">
          <button type="button" className="min-h-11 justify-self-start px-2 text-sm font-semibold text-[#f6f1e7] disabled:text-[#9eb0c2]" onClick={back} disabled={plan.index === 0}>
            Précédent
          </button>
          <p className="text-center text-sm font-semibold text-[#f6f1e7]">{progress}</p>
          <Link href="/" className="min-h-11 justify-self-end px-2 py-2 text-sm font-semibold text-[#f6f1e7]">
            Pause
          </Link>
        </div>
        <p className="pb-1 text-center text-xs text-[#e4ebf3]">{plan.title}</p>
        <p className="pb-1 text-center">
          <button
            type="button"
            className="min-h-11 px-3 text-sm font-semibold text-[#f0d7a4]"
            onClick={() => {
              close();
              router.push("/");
            }}
          >
            Abandonner
          </button>
        </p>
      </header>
      {step.kind === "card" || step.kind === "block" ? (
        <QuestionStep
          key={plan.index}
          partId={step.partId}
          questionId={step.kind === "card" ? step.questionId : undefined}
          answers={plan.answers}
          revealed={plan.revealed}
          audioPlays={plan.audioPlays}
          onAnswer={answer}
          onReveal={reveal}
          onNext={next}
          onPlay={bumpAudio}
          onRefund={refundAudio}
        />
      ) : null}
      {step.kind === "write" ? <WriteStep taskId={step.taskId} value={plan.answers[step.taskId] ?? ""} onChange={answer} onNext={next} /> : null}
      {step.kind === "speak" ? <SpeakStep taskId={step.taskId} value={plan.answers[step.taskId] ?? ""} onChange={answer} onNext={next} /> : null}
    </div>
  );
}

function QuestionStep({
  partId,
  questionId,
  answers,
  revealed,
  audioPlays,
  onAnswer,
  onReveal,
  onNext,
  onPlay,
  onRefund,
}: {
  partId: string;
  questionId?: string;
  answers: Record<string, string>;
  revealed: Record<string, boolean>;
  audioPlays: Record<string, number>;
  onAnswer: (questionId: string, choiceId: string) => void;
  onReveal: (questionIds: string[]) => void;
  onNext: () => void;
  onPlay: (audioId: string) => void;
  onRefund: (audioId: string) => void;
}) {
  const located = locatePart(partId);
  const scroller = useRef<HTMLDivElement>(null);
  const answersPane = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 });
  }, [questionId, partId]);
  if (!located) return <p className="p-4">Exercice introuvable.</p>;
  const part: Part = located.part;
  const scored = part.questions.filter((question) => !question.example);
  const questions = questionId ? scored.filter((question: Question) => question.id === questionId) : scored;
  const qIndex = questionId ? scored.findIndex((question: Question) => question.id === questionId) : -1;
  const stimuli =
    questionId && part.clips.length > 0 && part.stimuli.length > 1 && qIndex >= 0
      ? [part.stimuli[Math.min(part.stimuli.length - 1, Math.floor((qIndex * part.stimuli.length) / Math.max(scored.length, 1)))]].filter((item) => item != null)
      : part.stimuli;
  const shown = questionId ? questions : part.questions;
  const open = questions.some((question) => !revealed[question.id]);
  const wrongCount = questions.filter((question) => !question.example && revealed[question.id] && answers[question.id] !== question.answer).length;

  function select(questionIdToSet: string, choiceId: string) {
    const reserved = part.questions.filter((item) => item.example).map((item) => item.answer);
    if (reserved.includes(choiceId)) return;
    if (part.exclusive) {
      for (const other of part.questions) {
        if (other.example || other.id === questionIdToSet) continue;
        if (answers[other.id] === choiceId) onAnswer(other.id, "");
      }
    }
    onAnswer(questionIdToSet, choiceId);
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(22rem,0.85fr)] lg:overflow-hidden">
      <div ref={scroller} className="min-h-0 flex-1 overflow-y-auto px-4 py-4 lg:px-10 lg:py-8">
        <p className="max-w-2xl text-base leading-relaxed text-[#5e584e]">{part.instruction}</p>
        {stimuli.map((stimulus) => {
          const clip = part.clips.find((item) => item.id === stimulus.audioId);
          return (
            <article key={stimulus.id} className="mt-6 max-w-2xl">
              {stimulus.kicker ? <p className="text-xs font-semibold uppercase tracking-wider text-[#5c4318]">{stimulus.kicker}</p> : null}
              {stimulus.title ? <h2 className="font-serif text-3xl">{stimulus.title}</h2> : null}
              <p className="mt-3 whitespace-pre-wrap font-serif text-xl leading-relaxed">{filledBody(stimulus.body, part.questions, answers)}</p>
              {clip ? <ClipPlayer clip={clip} plays={audioPlays[clip.id] ?? 0} showScript={!open} onPlay={onPlay} onRefund={onRefund} /> : null}
            </article>
          );
        })}
      </div>
      <div ref={answersPane} className="max-h-[55dvh] overflow-y-auto border-t border-[#ddd4c4] bg-white px-4 py-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:max-h-none lg:border-t-0 lg:border-l lg:px-6 lg:py-8">
        {!open ? (
          <p className={wrongCount === 0 ? "mb-3 rounded-2xl bg-[#e5f3eb] px-4 py-3 font-semibold text-[#145c38]" : "mb-3 rounded-2xl bg-[#f8e8e6] px-4 py-3 font-semibold text-[#8d342e]"}>
            {wrongCount === 0 ? "Juste. Lis pourquoi : ça sert la prochaine fois." : `${compte(wrongCount, "erreur à retenir", "erreurs à retenir")}. La bonne lettre est en vert, avec la raison.`}
          </p>
        ) : null}
        {part.exclusive && open ? (
          <p className="mb-3 text-sm leading-relaxed text-[#5e584e]">Une lettre ne sert qu’une fois. La recocher l’enlève de l’autre question.</p>
        ) : null}
        {shown.map((question) => (
          <ChoiceBlock key={question.id} question={question} selected={answers[question.id]} shown={Boolean(revealed[question.id])} onSelect={select} />
        ))}
        {open ? (
          <button
            type="button"
            className="mt-2 min-h-12 w-full rounded-full bg-[#16324f] font-semibold text-[#f6f1e7] disabled:bg-[#3d5164] disabled:text-[#f6f1e7]"
            disabled={questions.some((question) => !question.example && !answers[question.id])}
            onClick={() => {
              onReveal(questions.filter((question) => !question.example).map((question) => question.id));
              window.setTimeout(() => answersPane.current?.scrollTo({ top: 0 }), 0);
            }}
          >
            Vérifier
          </button>
        ) : (
          <button type="button" className="mt-2 min-h-12 w-full rounded-full bg-[#16324f] font-semibold text-[#f6f1e7]" onClick={onNext}>
            J’ai compris
          </button>
        )}
      </div>
    </div>
  );
}

function ChoiceBlock({
  question,
  selected,
  shown,
  onSelect,
}: {
  question: Question;
  selected?: string;
  shown: boolean;
  onSelect: (questionId: string, choiceId: string) => void;
}) {
  return (
    <fieldset className="mb-3">
      <legend className="mb-2 text-base font-semibold">{question.example ? "Exemple" : question.prompt}</legend>
      <div className="grid gap-2">
        {question.choices.map((choice) => {
          const on = (question.example ? question.answer : selected) === choice.id;
          const right = shown && choice.id === question.answer;
          const wrong = shown && on && choice.id !== question.answer;
          return (
            <label
              key={choice.id}
              className={`flex min-h-12 items-start gap-3 rounded-2xl border px-3 py-2 ${right ? "border-[#1d6b45] bg-[#e5f3eb]" : wrong ? "border-[#8d342e] bg-[#f8e8e6]" : on ? "border-[#16324f] bg-[#e7f0f8]" : "border-stone-200"}`}
            >
              <input className="mt-1" type="radio" name={question.id} checked={on} disabled={question.example || shown} onChange={() => onSelect(question.id, choice.id)} />
              <span>
                <span className="mr-2 font-semibold">{letterOf(choice.id)}</span>
                {choice.text}
              </span>
            </label>
          );
        })}
      </div>
      {shown && !question.example ? (
        <p className={selected === question.answer ? "mt-2 text-sm font-semibold text-[#145c38]" : "mt-2 text-sm font-semibold text-[#8d342e]"}>
          {selected === question.answer ? "Juste. Elle reviendra plus tard, pas demain." : `Raté. La bonne réponse est ${letterOf(question.answer)}. Elle revient demain.`}
        </p>
      ) : null}
      {shown && !question.example ? <p className="mt-1 text-sm leading-relaxed text-[#5e584e]">{question.explanation}</p> : null}
    </fieldset>
  );
}

function ClipPlayer({
  clip,
  plays,
  showScript,
  onPlay,
  onRefund,
}: {
  clip: AudioClip;
  plays: number;
  showScript: boolean;
  onPlay: (audioId: string) => void;
  onRefund: (audioId: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const handle = useRef<SpeakHandle | null>(null);
  const left = Math.max(0, clip.maxPlays - plays);
  useEffect(() => () => handle.current?.cancel(), []);

  return (
    <div className="mt-3">
      <p className="mb-2 text-sm leading-relaxed text-[#5e584e]">
        {showScript ? "Texte entendu, après ta réponse." : "Le texte entendu apparaît ici après Vérifier. Écoute, coche, puis vérifie."}
      </p>
      <button
        type="button"
        disabled={left <= 0 || busy}
        className="min-h-12 rounded-full bg-[#16324f] px-4 font-semibold text-[#f6f1e7] disabled:bg-[#3d5164] disabled:text-[#f6f1e7]"
        onClick={() => {
          if (left <= 0 || busy) return;
          setError("");
          onPlay(clip.id);
          setBusy(true);
          handle.current = speakGerman(clip.script, {
            onend: () => setBusy(false),
            onerror: () => {
              onRefund(clip.id);
              setBusy(false);
              setError("La voix n’a pas démarré. Monte le volume, coupe le mode silencieux, puis réessaie.");
            },
          });
        }}
      >
        {busy ? "Écoute…" : left > 0 ? `Écouter · encore ${left}` : "Écoute terminée"}
      </button>
      {error ? <p className="mt-2 text-sm text-[#8d342e]">{error}</p> : null}
      {showScript ? <p className="mt-3 border-l-2 border-[#5c4318] pl-3 text-base leading-relaxed text-[#1c1915]">{clip.script}</p> : null}
    </div>
  );
}

function WriteStep({ taskId, value, onChange, onNext }: { taskId: string; value: string; onChange: (id: string, value: string) => void; onNext: () => void }) {
  const located = locateWriting(taskId);
  const saveProduction = useLearnStore((state) => state.saveProduction);
  const [marks, setMarks] = useState<Record<string, CriterionMark | undefined>>({});
  const [draft, setDraft] = useState(value);
  const [seenTask, setSeenTask] = useState(taskId);
  const draftTimer = useRef(0);
  if (taskId !== seenTask) {
    setSeenTask(taskId);
    setDraft(value);
  }
  useEffect(() => () => window.clearTimeout(draftTimer.current), []);
  if (!located) return null;
  const task: WritingTask = located.task;
  const words = countWords(draft);
  return (
    <div className="grid min-h-0 flex-1 grid-cols-1 gap-6 overflow-y-auto px-4 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] lg:grid-cols-2 lg:overflow-hidden lg:px-10">
      <div className="lg:overflow-y-auto lg:pr-4">
        <h1 className="font-serif text-4xl">{task.title}</h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed">{task.situation}</p>
        <ul className="mt-4 list-disc space-y-1 pl-5 text-base">
          {task.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#5e584e]">{task.coach}</p>
      </div>
      <div className="flex min-h-0 flex-col">
        <textarea
          value={draft}
          onChange={(event) => {
            const next = event.target.value;
            setDraft(next);
            window.clearTimeout(draftTimer.current);
            draftTimer.current = window.setTimeout(() => onChange(taskId, next), 200);
          }}
          onBlur={() => onChange(taskId, draft)}
          className="min-h-64 w-full flex-1 rounded-3xl border border-[#c9bfae] bg-white p-5 text-lg leading-relaxed text-[#1c1915]"
        />
        <p className={words >= task.minWords ? "mt-2 font-semibold text-[#145c38]" : "mt-2 text-[#5e584e]"}>
          {words} mots · au moins {task.minWords}
        </p>
        <CriteriaMarks items={WRITING_CRITERIA} value={marks} onChange={(id, mark) => setMarks((current) => ({ ...current, [id]: mark }))} />
        <p className="mt-2 text-sm text-[#5e584e]">Ce n’est pas une note d’examinateur. Tu dis toi-même si chaque critère tient.</p>
        <button
          type="button"
          className="mt-3 min-h-12 rounded-full bg-[#16324f] font-semibold text-[#f6f1e7] disabled:bg-[#3d5164] disabled:text-[#f6f1e7]"
          disabled={words < task.minWords}
          onClick={() => {
            saveProduction({
              kind: "schreiben",
              taskId,
              examId: located.exam.id,
              at: Date.now(),
              words,
              minWords: task.minWords,
              held: heldCount(marks, WRITING_CRITERIA.map((item) => item.id)),
              asked: WRITING_CRITERIA.length,
            });
            onNext();
          }}
        >
          J’ai fini ce texte
        </button>
      </div>
    </div>
  );
}

function SpeakStep({ taskId, value, onChange, onNext }: { taskId: string; value: string; onChange: (id: string, value: string) => void; onNext: () => void }) {
  const located = locateSpeaking(taskId);
  const saveProduction = useLearnStore((state) => state.saveProduction);
  const [marks, setMarks] = useState<Record<string, CriterionMark | undefined>>({});
  const [left, setLeft] = useState<number | null>(null);
  const [draft, setDraft] = useState(value);
  const [seenTask, setSeenTask] = useState(taskId);
  const draftTimer = useRef(0);
  if (taskId !== seenTask) {
    setSeenTask(taskId);
    setDraft(value);
  }
  useEffect(() => () => window.clearTimeout(draftTimer.current), []);
  useEffect(() => {
    if (left == null || left <= 0) return;
    const timer = window.setTimeout(() => setLeft(left - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [left]);
  if (!located) return null;
  const task: SpeakingTask = located.task;
  const clock = left == null ? `${task.minutes}:00` : `${Math.floor(left / 60)}:${String(left % 60).padStart(2, "0")}`;
  return (
    <div className="grid min-h-0 flex-1 grid-cols-1 gap-6 overflow-y-auto px-4 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] lg:grid-cols-2 lg:overflow-hidden lg:px-10">
      <div className="lg:overflow-y-auto lg:pr-4">
        <h1 className="font-serif text-4xl">{task.title}</h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed">{task.situation}</p>
        <ul className="mt-4 list-disc space-y-1 pl-5">
          {task.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#5e584e]">{task.coach}</p>
      </div>
      <div className="flex min-h-0 flex-col">
        <textarea
          value={draft}
          placeholder="Notes, pas le discours"
          onChange={(event) => {
            const next = event.target.value;
            setDraft(next);
            window.clearTimeout(draftTimer.current);
            draftTimer.current = window.setTimeout(() => onChange(taskId, next), 200);
          }}
          onBlur={() => onChange(taskId, draft)}
          className="min-h-48 w-full flex-1 rounded-3xl border border-[#c9bfae] bg-white p-5 text-lg text-[#1c1915]"
        />
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <p className="font-serif text-3xl tabular-nums text-[#16324f]">{clock}</p>
          <button type="button" className="min-h-11 rounded-full border border-[#c9bfae] bg-white px-4 text-sm font-semibold" onClick={() => setLeft(left == null || left <= 0 ? task.minutes * 60 : null)}>
            {left != null && left > 0 ? "Arrêter" : "Lancer le temps de parole"}
          </button>
        </div>
        <CriteriaMarks items={SPEAKING_CRITERIA} value={marks} onChange={(id, mark) => setMarks((current) => ({ ...current, [id]: mark }))} />
        <p className="mt-2 text-sm text-[#5e584e]">Ce n’est pas une note d’examinateur. Tu dis toi-même si chaque critère tient.</p>
        <button
          type="button"
          className="mt-3 min-h-12 rounded-full bg-[#16324f] font-semibold text-[#f6f1e7]"
          onClick={() => {
            saveProduction({
              kind: "sprechen",
              taskId,
              examId: located.exam.id,
              at: Date.now(),
              words: countWords(draft),
              minWords: 0,
              held: heldCount(marks, SPEAKING_CRITERIA.map((item) => item.id)),
              asked: SPEAKING_CRITERIA.length,
            });
            onNext();
          }}
        >
          J’ai parlé
        </button>
      </div>
    </div>
  );
}
