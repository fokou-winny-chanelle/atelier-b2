"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useHydrated } from "@/components/useHydrated";
import { locatePart, locateSpeaking, locateWriting } from "@/lib/catalog";
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
    const cards = plan.steps.filter((step) => step.kind === "card" || step.kind === "block");
    return (
      <main className="mx-auto flex min-h-dvh max-w-2xl flex-col justify-center px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-wider text-[#5c4318]">Série terminée</p>
        <h1 className="mt-2 font-serif text-5xl">{plan.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-[#5e584e]">Les questions ratées reviendront dans les prochains jours, pas toutes demain en bloc.</p>
        <p className="mt-2 text-[#5e584e]">{cards.length ? "Les réponses sont enregistrées sur cet appareil." : "Tu peux enchaîner avec autre chose."}</p>
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
      <header className="flex shrink-0 items-center justify-between gap-3 bg-[#16324f] px-4 py-3 text-[#f6f1e7] lg:px-8">
        <button type="button" className="min-h-11 text-sm font-semibold text-[#f6f1e7] disabled:text-[#9eb0c2]" onClick={back} disabled={plan.index === 0}>
          Précédent
        </button>
        <p className="min-w-0 truncate text-center text-sm text-[#e4ebf3]">
          {plan.title} · {progress}
        </p>
        <div className="flex gap-2">
          <Link href="/" className="inline-flex min-h-11 items-center rounded-full border border-[#f6f1e7]/50 px-4 text-sm font-semibold text-[#f6f1e7]">
            Pause
          </Link>
          <button
            type="button"
            className="min-h-11 rounded-full px-3 text-sm font-semibold text-[#f0d7a4]"
            onClick={() => {
              close();
              router.push("/");
            }}
          >
            Abandonner
          </button>
        </div>
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
      <div className="max-h-[55dvh] overflow-y-auto border-t border-[#ddd4c4] bg-white px-4 py-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:max-h-none lg:border-t-0 lg:border-l lg:px-6 lg:py-8">
        {shown.map((question) => (
          <ChoiceBlock key={question.id} question={question} selected={answers[question.id]} shown={Boolean(revealed[question.id])} onSelect={select} />
        ))}
        {open ? (
          <button
            type="button"
            className="mt-2 min-h-12 w-full rounded-full bg-[#16324f] font-semibold text-[#f6f1e7] disabled:bg-[#3d5164] disabled:text-[#f6f1e7]"
            disabled={questions.some((question) => !question.example && !answers[question.id])}
            onClick={() => onReveal(questions.filter((question) => !question.example).map((question) => question.id))}
          >
            Vérifier
          </button>
        ) : (
          <button type="button" className="mt-2 min-h-12 w-full rounded-full bg-[#16324f] font-semibold text-[#f6f1e7]" onClick={onNext}>
            Continuer
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
    <fieldset className="mb-3" disabled={question.example || shown}>
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
              <input className="mt-1" type="radio" name={question.id} checked={on} onChange={() => onSelect(question.id, choice.id)} />
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
          {selected === question.answer ? "Juste. Celle-ci revient plus tard, pas demain." : `Raté. La réponse est ${letterOf(question.answer)}. Elle revient demain.`}
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
              setError("La voix allemande n’a pas démarré. Réessaie, ou ajoute une voix allemande dans Windows.");
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
  if (!located) return null;
  const task: WritingTask = located.task;
  const words = countWords(value);
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
        <textarea value={value} onChange={(event) => onChange(taskId, event.target.value)} className="min-h-64 w-full flex-1 rounded-3xl border border-[#c9bfae] bg-white p-5 text-lg leading-relaxed text-[#1c1915]" />
        <p className={words >= task.minWords ? "mt-2 font-semibold text-[#145c38]" : "mt-2 text-[#5e584e]"}>
          {words} mots · au moins {task.minWords}
        </p>
        <button type="button" className="mt-3 min-h-12 rounded-full bg-[#16324f] font-semibold text-[#f6f1e7] disabled:bg-[#3d5164] disabled:text-[#f6f1e7]" disabled={words < task.minWords} onClick={onNext}>
          J’ai fini ce texte
        </button>
      </div>
    </div>
  );
}

function SpeakStep({ taskId, value, onChange, onNext }: { taskId: string; value: string; onChange: (id: string, value: string) => void; onNext: () => void }) {
  const located = locateSpeaking(taskId);
  if (!located) return null;
  const task: SpeakingTask = located.task;
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
        <textarea value={value} onChange={(event) => onChange(taskId, event.target.value)} placeholder="Notes, pas le discours" className="min-h-48 w-full flex-1 rounded-3xl border border-[#c9bfae] bg-white p-5 text-lg text-[#1c1915]" />
        <button type="button" className="mt-3 min-h-12 rounded-full bg-[#16324f] font-semibold text-[#f6f1e7]" onClick={onNext}>
          J’ai parlé
        </button>
      </div>
    </div>
  );
}
