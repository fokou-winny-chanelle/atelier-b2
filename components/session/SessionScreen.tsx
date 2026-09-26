"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AudioButton } from "@/components/session/AudioButton";
import { RichBlock } from "@/components/session/RichBlock";
import { useHydrated } from "@/components/useHydrated";
import { getExam } from "@/lib/exams";
import { countWords, unansweredInPart } from "@/lib/scoring";
import { useExamStore } from "@/lib/store";
import type { Mode, ModuleId, Part, Question, Session } from "@/lib/types";
import { MODULE_LABEL } from "@/lib/types";

const UMLAUTS = ["ä", "ö", "ü", "ß", "Ä", "Ö", "Ü"] as const;

function unitCount(exam: NonNullable<ReturnType<typeof getExam>>, moduleId: ModuleId): number {
  if (moduleId === "lesen" || moduleId === "hoeren") return exam[moduleId].parts.length;
  return exam[moduleId].tasks.length;
}

function useExamExpired(mode: string | undefined, endsAt: number | null): boolean {
  const [expired, setExpired] = useState(() => mode === "pruefung" && endsAt != null && endsAt <= Date.now());
  useEffect(() => {
    if (mode !== "pruefung" || endsAt == null) {
      setExpired(false);
      return;
    }
    if (endsAt <= Date.now()) {
      setExpired(true);
      return;
    }
    const timer = window.setInterval(() => {
      if (endsAt <= Date.now()) {
        setExpired(true);
        window.clearInterval(timer);
      }
    }, 1000);
    return () => window.clearInterval(timer);
  }, [endsAt, mode]);
  return expired;
}

function ClockDisplay({ endsAt, pausedRemainingMs }: { endsAt: number | null; pausedRemainingMs: number | null }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (endsAt == null) return;
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [endsAt]);
  const remaining = endsAt != null ? endsAt - now : (pausedRemainingMs ?? 0);
  const tone = remaining < 60_000 ? "timer is-danger" : remaining < 5 * 60_000 ? "timer is-warn" : "timer";
  return <span className={tone}>{clock(remaining)}</span>;
}

function clock(ms: number): string {
  const total = Math.max(0, Math.ceil(ms / 1000));
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function letterOf(id: string): string {
  if (id === "r") return "R";
  if (id === "f") return "F";
  return id.toUpperCase();
}

export function SessionScreen({ sessionId }: { sessionId: string }) {
  const router = useRouter();
  const hydrated = useHydrated();
  const session = useExamStore((state) => state.sessions[sessionId]);
  const setAnswer = useExamStore((state) => state.setAnswer);
  const clearAnswer = useExamStore((state) => state.clearAnswer);
  const toggleFlag = useExamStore((state) => state.toggleFlag);
  const addHighlight = useExamStore((state) => state.addHighlight);
  const removeHighlight = useExamStore((state) => state.removeHighlight);
  const setWriting = useExamStore((state) => state.setWriting);
  const setNote = useExamStore((state) => state.setNote);
  const setPartIndex = useExamStore((state) => state.setPartIndex);
  const revealPart = useExamStore((state) => state.revealPart);
  const pause = useExamStore((state) => state.pause);
  const resume = useExamStore((state) => state.resume);
  const advancePhase = useExamStore((state) => state.advancePhase);
  const submit = useExamStore((state) => state.submit);

  const [highlightOn, setHighlightOn] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [overviewOpen, setOverviewOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [leftPct, setLeftPct] = useState(46);
  const [mobilePane, setMobilePane] = useState<"texte" | "questions">("texte");
  const expired = useExamExpired(session?.mode, session?.endsAt ?? null);

  const exam = session ? getExam(session.examId) : undefined;

  useEffect(() => {
    document.documentElement.dataset.exam = "1";
    return () => {
      delete document.documentElement.dataset.exam;
    };
  }, []);

  useEffect(() => {
    if (!session || session.submitted) return;
    const onLeave = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };
    window.addEventListener("beforeunload", onLeave);
    return () => window.removeEventListener("beforeunload", onLeave);
  }, [session]);

  useEffect(() => {
    if (session?.submitted) router.replace(`/session/${sessionId}/ergebnis`);
  }, [router, session, sessionId]);

  if (!hydrated) return <p className="boot">Salle d’examen…</p>;
  if (!session || !exam) {
    return (
      <main className="boot-card">
        <h1>Session introuvable</h1>
        <Link href="/" className="mt-4 inline-flex min-h-11 items-center font-semibold text-[#16324f]">Retour à l’accueil</Link>
      </main>
    );
  }

  const moduleId = session.phases[session.phaseIndex] ?? "lesen";
  const locked = expired;

  return (
    <div className="room" onContextMenu={(event) => session.mode === "pruefung" && event.preventDefault()}>
      <header className="mast">
        <div className="mast-brand">
          <span className="mark">B2</span>
          <div>
            <p className="eyebrow">Goethe-Zertifikat B2 · simulation</p>
            <strong>{exam.title}</strong>
          </div>
        </div>
        <ol className="phase-trail">
          {session.phases.map((phase, index) => (
            <li key={phase} className={index === session.phaseIndex ? "is-now" : index < session.phaseIndex ? "is-done" : ""}>
              {MODULE_LABEL[phase]}
            </li>
          ))}
        </ol>
        <div className="mast-side">
          <span className="who">{session.candidate || "Teilnehmer/in"}</span>
          <ClockDisplay endsAt={session.endsAt} pausedRemainingMs={session.pausedRemainingMs} />
          <button type="button" className="text-btn" onClick={() => setHelpOpen(true)}>
            Aide
          </button>
          <Link href="/" className="text-btn">
            Salon
          </Link>
        </div>
      </header>

      <div className={`flex min-h-0 flex-1 flex-col ${mobilePane === "questions" ? "pane-questions" : "pane-texte"}`}>
        <div className="grid grid-cols-2 border-b border-[#ddd4c4] bg-[#fbf8f2] md:hidden">
          <button type="button" className={mobilePane === "texte" ? "min-h-12 bg-white text-center font-semibold text-[#16324f]" : "min-h-12 text-center text-stone-500"} onClick={() => setMobilePane("texte")}>
            Texte
          </button>
          <button type="button" className={mobilePane === "questions" ? "min-h-12 bg-white text-center font-semibold text-[#16324f]" : "min-h-12 text-center text-stone-500"} onClick={() => setMobilePane("questions")}>
            Questions
          </button>
        </div>

      {moduleId === "lesen" || moduleId === "hoeren" ? (
        <ClosedModule
          session={session}
          moduleId={moduleId}
          parts={exam[moduleId].parts}
          leftPct={leftPct}
          setLeftPct={setLeftPct}
          highlightOn={highlightOn}
          locked={locked}
          onSelect={(part, question, choiceId) => {
            if (locked || question.example || session.revealedParts.includes(part.id)) return;
            const reserved = new Set(part.questions.filter((item) => item.example).map((item) => item.answer));
            if (reserved.has(choiceId)) return;
            if (part.exclusive) {
              for (const other of part.questions) {
                if (other.example || other.id === question.id) continue;
                if (session.answers[other.id] === choiceId) clearAnswer(session.id, other.id);
              }
            }
            setAnswer(session.id, question.id, choiceId);
          }}
          onFlag={(questionId) => toggleFlag(session.id, questionId)}
          onHighlight={(blockId, quote) =>
            addHighlight(session.id, { id: crypto.randomUUID(), blockId, quote })
          }
          onRemoveHighlight={(markId) => removeHighlight(session.id, markId)}
        />
      ) : moduleId === "schreiben" ? (
        <WritingRoom session={session} tasks={exam.schreiben.tasks} leftPct={leftPct} setLeftPct={setLeftPct} locked={locked} onChange={setWriting} />
      ) : (
        <SpeakingRoom session={session} tasks={exam.sprechen.tasks} leftPct={leftPct} setLeftPct={setLeftPct} onChange={setNote} />
      )}
      </div>

      <Footer
        session={session}
        moduleId={moduleId}
        examParts={unitCount(exam, moduleId)}
        highlightOn={highlightOn}
        onHighlight={() => setHighlightOn((value) => !value)}
        onOverview={() => setOverviewOpen(true)}
        onPart={(index) => {
          setPartIndex(session.id, index);
          setMobilePane("texte");
        }}
        onPause={() => (session.pausedRemainingMs != null ? resume(session.id) : pause(session.id))}
        onNext={() => {
          const count = moduleId === "lesen" || moduleId === "hoeren" ? exam[moduleId].parts.length : exam[moduleId].tasks.length;
          if (session.partIndex < count - 1) {
            setPartIndex(session.id, session.partIndex + 1);
            setMobilePane("texte");
          } else setConfirmOpen(true);
        }}
        onPrev={() => {
          if (session.partIndex > 0) {
            setPartIndex(session.id, session.partIndex - 1);
            setMobilePane("texte");
          }
        }}
        onReveal={
          session.mode === "uebung" && (moduleId === "lesen" || moduleId === "hoeren")
            ? () => revealPart(session.id, exam[moduleId].parts[session.partIndex]?.id ?? "")
            : undefined
        }
        showUmlauts={moduleId === "schreiben"}
        onUmlaut={(char) => insertUmlaut(char)}
      />

      {expired ? (
        <dialog open className="sheet">
          <h2>Die Zeit ist abgelaufen</h2>
          <p>En mode examen, le module se ferme quand le temps est écoulé. Tes réponses sont déjà enregistrées.</p>
          <button type="button" className="primary" onClick={() => finish(session, moduleId, exam, advancePhase, submit, router)}>
            Continuer
          </button>
        </dialog>
      ) : null}

      {confirmOpen ? (
        <ConfirmLeave
          session={session}
          moduleId={moduleId}
          exam={exam}
          onClose={() => setConfirmOpen(false)}
          onConfirm={() => finish(session, moduleId, exam, advancePhase, submit, router)}
        />
      ) : null}

      {overviewOpen && (moduleId === "lesen" || moduleId === "hoeren") ? (
        <Overview
          session={session}
          parts={exam[moduleId].parts}
          onClose={() => setOverviewOpen(false)}
          onJump={(partIndex, questionId) => {
            setPartIndex(session.id, partIndex);
            setMobilePane("questions");
            setOverviewOpen(false);
            window.setTimeout(() => {
              document.getElementById(`q-${questionId}`)?.scrollIntoView({ block: "center" });
            }, 40);
          }}
        />
      ) : null}

      {helpOpen ? <Help moduleId={moduleId} mode={session.mode} onClose={() => setHelpOpen(false)} /> : null}
    </div>
  );
}

function finish(
  session: Session,
  moduleId: ModuleId,
  exam: NonNullable<ReturnType<typeof getExam>>,
  advancePhase: (sessionId: string, minutes: number) => void,
  submit: (sessionId: string) => void,
  router: ReturnType<typeof useRouter>,
) {
  const next = session.phaseIndex + 1;
  if (next >= session.phases.length) {
    submit(session.id);
    router.push(`/session/${session.id}/ergebnis`);
    return;
  }
  const nextId = session.phases[next] ?? moduleId;
  advancePhase(session.id, exam[nextId].durationMinutes);
}

function ClosedModule({
  session,
  moduleId,
  parts,
  leftPct,
  setLeftPct,
  highlightOn,
  locked,
  onSelect,
  onFlag,
  onHighlight,
  onRemoveHighlight,
}: {
  session: Session;
  moduleId: "lesen" | "hoeren";
  parts: Part[];
  leftPct: number;
  setLeftPct: (value: number) => void;
  highlightOn: boolean;
  locked: boolean;
  onSelect: (part: Part, question: Question, choiceId: string) => void;
  onFlag: (questionId: string) => void;
  onHighlight: (blockId: string, quote: string) => void;
  onRemoveHighlight: (markId: string) => void;
}) {
  const part = parts[session.partIndex] ?? parts[0];
  if (!part) return null;
  const revealed = session.revealedParts.includes(part.id);
  const clips = new Map(part.clips.map((clip) => [clip.id, clip]));
  const gaps = Object.fromEntries(
    part.questions.map((question) => [String(question.number), session.answers[question.id]]),
  );
  const taken = new Map<string, string>();
  if (part.exclusive) {
    for (const question of part.questions) {
      const choice = question.example ? question.answer : session.answers[question.id];
      if (choice) taken.set(choice, question.example ? "Beispiel" : `Aufgabe ${question.number}`);
    }
  }

  return (
    <div className="split">
      <section className="col stimulus" style={{ flexBasis: `${leftPct}%` }} onCopy={(event) => session.mode === "pruefung" && event.preventDefault()}>
        <p className="instruction">{part.instruction}</p>
        <p className="hint-time">Vorgeschlagene Zeit für diesen Teil: {part.suggestedMinutes} Minuten. Die Uhr oben gilt für das ganze Modul {MODULE_LABEL[moduleId]}.</p>
        {moduleId === "hoeren" ? <p className="hint-time">{heardCue(session.mode, revealed)}</p> : null}
        {moduleId === "lesen" && part.exclusive && !revealed ? (
          <p className="hint-time">Une lettre ne sert qu’une fois. Si tu la recoches, elle quitte l’autre question.</p>
        ) : null}
        {part.stimuli.map((stimulus) => {
          const clip = stimulus.audioId ? clips.get(stimulus.audioId) : undefined;
          return (
            <article
              key={stimulus.id}
              className={highlightOn ? "passage is-marking" : "passage"}
              onMouseUp={() => {
                if (!highlightOn) return;
                const quote = window.getSelection()?.toString().trim() ?? "";
                if (quote.length < 2 || quote.length > 280) return;
                onHighlight(stimulus.id, quote);
                window.getSelection()?.removeAllRanges();
              }}
            >
              {stimulus.kicker ? <p className="kicker">{stimulus.kicker}</p> : null}
              {stimulus.title ? <h2>{stimulus.title}</h2> : null}
              <div className="body">
                <RichBlock
                  body={stimulus.body}
                  gaps={gaps}
                  marks={session.highlights.filter((mark) => mark.blockId === stimulus.id)}
                  onRemove={onRemoveHighlight}
                />
              </div>
              {clip ? (
                <AudioButton
                  sessionId={session.id}
                  clip={clip}
                  plays={session.audioPlays[clip.id] ?? 0}
                  showScript={session.mode === "uebung" && revealed}
                />
              ) : null}
            </article>
          );
        })}
      </section>
      <div
        className="gutter"
        role="separator"
        aria-orientation="vertical"
        onPointerDown={(event) => {
          const startX = event.clientX;
          const start = leftPct;
          const width = window.innerWidth;
          const move = (ev: PointerEvent) => setLeftPct(Math.min(68, Math.max(28, start + ((ev.clientX - startX) / width) * 100)));
          const up = () => {
            window.removeEventListener("pointermove", move);
            window.removeEventListener("pointerup", up);
          };
          window.addEventListener("pointermove", move);
          window.addEventListener("pointerup", up);
        }}
      />
      <section className="col questions">
        {part.questions.map((question) => (
          <QuestionCard
            key={question.id}
            question={question}
            selected={question.example ? question.answer : session.answers[question.id]}
            flagged={Boolean(session.flags[question.id])}
            revealed={revealed}
            locked={locked || Boolean(question.example) || revealed}
            taken={taken}
            onSelect={(choiceId) => onSelect(part, question, choiceId)}
            onFlag={() => onFlag(question.id)}
          />
        ))}
      </section>
    </div>
  );
}

function QuestionCard({
  question,
  selected,
  flagged,
  revealed,
  locked,
  taken,
  onSelect,
  onFlag,
}: {
  question: Question;
  selected?: string;
  flagged: boolean;
  revealed: boolean;
  locked: boolean;
  taken: Map<string, string>;
  onSelect: (choiceId: string) => void;
  onFlag: () => void;
}) {
  return (
    <fieldset id={`q-${question.id}`} className={flagged ? "q is-flagged" : "q"}>
      <legend>{question.example ? "Beispiel" : `Aufgabe ${question.number}`}</legend>
      <div className="q-top">
        <p>{question.prompt}</p>
        {question.example ? null : (
          <button type="button" className={flagged ? "flag is-on" : "flag"} aria-pressed={flagged} onClick={onFlag}>
            Markieren
          </button>
        )}
      </div>
      <div className="choices">
        {question.choices.map((choice) => {
          const on = selected === choice.id;
          const owner = taken.get(choice.id);
          const right = revealed && choice.id === question.answer;
          const wrong = revealed && on && choice.id !== question.answer;
          return (
            <label key={choice.id} className={on ? "choice is-on" : "choice"}>
              <input
                type="radio"
                name={question.id}
                value={choice.id}
                checked={on}
                disabled={locked}
                onChange={() => onSelect(choice.id)}
              />
              <span className={right ? "pip is-right" : wrong ? "pip is-wrong" : "pip"}>{letterOf(choice.id)}</span>
              <span>
                {choice.text}
                {owner && owner !== (question.example ? "Beispiel" : `Aufgabe ${question.number}`) ? (
                  <small className="taken"> belegt · {owner}</small>
                ) : null}
              </span>
            </label>
          );
        })}
      </div>
      {question.example ? <p className="example-note">Lösung: {letterOf(question.answer)}. Dieses Beispiel wird nicht gewertet.</p> : null}
      {revealed && !question.example ? <p className="why">{question.explanation}</p> : null}
    </fieldset>
  );
}

function WritingRoom({
  session,
  tasks,
  leftPct,
  setLeftPct,
  locked,
  onChange,
}: {
  session: Session;
  tasks: { id: string; title: string; situation: string; bullets: string[]; minWords: number; closingNote: string }[];
  leftPct: number;
  setLeftPct: (value: number) => void;
  locked: boolean;
  onChange: (sessionId: string, taskId: string, value: string) => void;
}) {
  const task = tasks[session.partIndex] ?? tasks[0];
  if (!task) return null;
  return (
    <div className="split">
      <section className="col stimulus" style={{ flexBasis: `${leftPct}%` }}>
        <p className="kicker">{task.title}</p>
        <div className="body">
          <p>{task.situation}</p>
          <ul>
            {task.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
          <p>{task.closingNote}</p>
          <p className="hint-time">
            {session.mode === "pruefung"
              ? "Coller est bloqué. Ce texte n’est pas noté ici : à la fin, tu coches les points traités."
              : "Pause arrête l’horloge. Ce texte n’est pas noté ici : à la fin, tu coches les points traités."}
          </p>
        </div>
      </section>
      <Gutter leftPct={leftPct} setLeftPct={setLeftPct} />
      <section className="col questions">
        <DraftField
          label="Ihr Text"
          taskId={task.id}
          value={session.writings[task.id] ?? ""}
          disabled={locked}
          minWords={task.minWords}
          blockPaste={session.mode === "pruefung"}
          onCommit={(next) => onChange(session.id, task.id, next)}
        />
      </section>
    </div>
  );
}

function SpeakingRoom({
  session,
  tasks,
  leftPct,
  setLeftPct,
  onChange,
}: {
  session: Session;
  tasks: { id: string; title: string; minutes: number; situation: string; bullets: string[]; coach: string }[];
  leftPct: number;
  setLeftPct: (value: number) => void;
  onChange: (sessionId: string, taskId: string, value: string) => void;
}) {
  const task = tasks[session.partIndex] ?? tasks[0];
  if (!task) return null;
  return (
    <div className="split">
      <section className="col stimulus" style={{ flexBasis: `${leftPct}%` }}>
        <p className="kicker">{task.title} · ca. {task.minutes} Min.</p>
        <div className="body">
          <p>{task.situation}</p>
          <ul>
            {task.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
          <p className="why">{task.coach}</p>
          <p className="hint-time">Les notes ne sont pas le discours. L’horloge en haut compte le module. À l’examen, les 15 minutes de préparation se font avant d’entrer.</p>
        </div>
      </section>
      <Gutter leftPct={leftPct} setLeftPct={setLeftPct} />
      <section className="col questions">
        <DraftField
          label="Notizen für die Vorbereitung"
          taskId={task.id}
          value={session.notes[task.id] ?? ""}
          onCommit={(next) => onChange(session.id, task.id, next)}
        />
      </section>
    </div>
  );
}

function DraftField({
  label,
  taskId,
  value,
  disabled,
  minWords,
  blockPaste,
  onCommit,
}: {
  label: string;
  taskId: string;
  value: string;
  disabled?: boolean;
  minWords?: number;
  blockPaste?: boolean;
  onCommit: (value: string) => void;
}) {
  const [draft, setDraft] = useState(value);
  const timer = useRef(0);
  const seenTask = useRef(taskId);
  useEffect(() => {
    if (seenTask.current === taskId) return;
    seenTask.current = taskId;
    setDraft(value);
  }, [taskId, value]);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const words = countWords(draft);
  return (
    <>
      <label className="writer">
        <span>{label}</span>
        <textarea
          value={draft}
          disabled={disabled}
          spellCheck
          onChange={(event) => {
            const next = event.target.value;
            setDraft(next);
            window.clearTimeout(timer.current);
            timer.current = window.setTimeout(() => onCommit(next), 200);
          }}
          onBlur={() => {
            window.clearTimeout(timer.current);
            onCommit(draft);
          }}
          onPaste={(event) => blockPaste && event.preventDefault()}
          onDrop={(event) => blockPaste && event.preventDefault()}
        />
      </label>
      {minWords != null ? (
        <p className={words >= minWords ? "words is-ok" : "words"}>
          {words} Wörter · mindestens {minWords}
        </p>
      ) : null}
    </>
  );
}

function Gutter({ leftPct, setLeftPct }: { leftPct: number; setLeftPct: (value: number) => void }) {
  return (
    <div
      className="gutter"
      role="separator"
      aria-orientation="vertical"
      onPointerDown={(event) => {
        const startX = event.clientX;
        const start = leftPct;
        const width = window.innerWidth;
        const move = (ev: PointerEvent) => setLeftPct(Math.min(68, Math.max(28, start + ((ev.clientX - startX) / width) * 100)));
        const up = () => {
          window.removeEventListener("pointermove", move);
          window.removeEventListener("pointerup", up);
        };
        window.addEventListener("pointermove", move);
        window.addEventListener("pointerup", up);
      }}
    />
  );
}

function Footer({
  session,
  moduleId,
  examParts,
  highlightOn,
  onHighlight,
  onOverview,
  onPart,
  onPause,
  onNext,
  onPrev,
  onReveal,
  showUmlauts,
  onUmlaut,
}: {
  session: Session;
  moduleId: ModuleId;
  examParts: number;
  highlightOn: boolean;
  onHighlight: () => void;
  onOverview: () => void;
  onPart: (index: number) => void;
  onPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onReveal?: () => void;
  showUmlauts: boolean;
  onUmlaut: (char: string) => void;
}) {
  const labels = Array.from({ length: examParts }, (_, index) => `Teil ${index + 1}`);
  return (
    <footer className="dock">
      <div className="dock-left">
        <button type="button" onClick={onPrev} disabled={session.partIndex === 0}>
          Zurück
        </button>
        <div className="teils">
          {labels.map((label, index) => (
            <button key={label} type="button" className={index === session.partIndex ? "teil is-on" : "teil"} onClick={() => onPart(index)}>
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="dock-tools">
        {moduleId === "lesen" || moduleId === "hoeren" ? (
          <button type="button" onClick={onOverview}>
            Übersicht
          </button>
        ) : null}
        {moduleId === "lesen" ? (
          <button type="button" className={highlightOn ? "is-on" : ""} aria-pressed={highlightOn} onClick={onHighlight}>
            Textmarker
          </button>
        ) : null}
        {onReveal ? (
          <button type="button" onClick={onReveal}>
            Teil korrigieren
          </button>
        ) : null}
        {session.mode === "uebung" ? (
          <button type="button" onClick={onPause}>
            {session.pausedRemainingMs != null ? "Weiterlaufen" : "Pause"}
          </button>
        ) : null}
        {showUmlauts
          ? UMLAUTS.map((char) => (
              <button
              key={char}
              type="button"
              className="umlaut"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => onUmlaut(char)}
            >
                {char}
              </button>
            ))
          : null}
      </div>
      <button type="button" className="primary" onClick={onNext}>
        {session.partIndex < examParts - 1 ? "Nächster Teil" : "Modul abgeben"}
      </button>
    </footer>
  );
}

function insertUmlaut(char: string) {
  const field = document.activeElement;
  if (!(field instanceof HTMLTextAreaElement)) return;
  const start = field.selectionStart ?? field.value.length;
  const end = field.selectionEnd ?? start;
  field.setRangeText(char, start, end, "end");
  field.dispatchEvent(new InputEvent("input", { bubbles: true, data: char, inputType: "insertText" }));
}

function Overview({
  session,
  parts,
  onClose,
  onJump,
}: {
  session: Session;
  parts: Part[];
  onClose: () => void;
  onJump: (partIndex: number, questionId: string) => void;
}) {
  const scored = parts.flatMap((part) => part.questions.filter((question) => !question.example));
  const done = scored.filter((question) => session.answers[question.id]).length;
  return (
    <dialog open className="sheet wide" onClose={onClose}>
      <header className="sheet-head">
        <h2>Übersicht</h2>
        <button type="button" onClick={onClose}>
          Schließen
        </button>
      </header>
      <p>
        {done} von {scored.length} beantwortet. Grün = Antwort. Gelb = markiert. Weiß = offen.
      </p>
      {parts.map((part, partIndex) => (
        <div key={part.id}>
          <h3>{part.title}</h3>
          <div className="overview-cells">
            {part.questions
              .filter((question) => !question.example)
              .map((question) => {
                const answered = Boolean(session.answers[question.id]);
                const flagged = Boolean(session.flags[question.id]);
                const tone = flagged ? "is-flag" : answered ? "is-done" : "";
                return (
                  <button key={question.id} type="button" className={`cell ${tone}`} onClick={() => onJump(partIndex, question.id)}>
                    {question.number}
                  </button>
                );
              })}
          </div>
        </div>
      ))}
    </dialog>
  );
}

function ConfirmLeave({
  session,
  moduleId,
  exam,
  onClose,
  onConfirm,
}: {
  session: Session;
  moduleId: ModuleId;
  exam: NonNullable<ReturnType<typeof getExam>>;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const openCount = useMemo(() => {
    if (moduleId !== "lesen" && moduleId !== "hoeren") return 0;
    return exam[moduleId].parts.reduce((sum, part) => sum + unansweredInPart(part, session.answers), 0);
  }, [exam, moduleId, session.answers]);
  const last = session.phaseIndex >= session.phases.length - 1;
  return (
    <dialog open className="sheet">
      <h2>{last ? "Prüfung beenden?" : `${MODULE_LABEL[moduleId]} abgeben?`}</h2>
      {openCount > 0 ? <p>{openCount} Aufgaben sind noch offen.</p> : <p>Alle Aufgaben dieses Moduls haben eine Antwort.</p>}
      <div className="row">
        <button type="button" onClick={onClose}>
          Zurück
        </button>
        <button type="button" className="primary" onClick={onConfirm}>
          {last ? "Auswerten" : "Nächstes Modul"}
        </button>
      </div>
    </dialog>
  );
}

function heardCue(mode: Mode, revealed: boolean): string {
  if (revealed) return "Le texte entendu est sous Audio starten. La raison est sous chaque question.";
  if (mode === "pruefung") return "Le texte entendu reste caché jusqu’à la page de résultat. Lis les questions, puis Audio starten.";
  return "Le texte entendu reste caché, comme à l’examen. Il apparaît sous Audio starten après Teil korrigieren.";
}

function Help({ moduleId, mode, onClose }: { moduleId: ModuleId; mode: Mode; onClose: () => void }) {
  const phone = helpLines(moduleId, mode, true);
  const desk = helpLines(moduleId, mode, false);
  return (
    <dialog open className="sheet wide">
      <header className="sheet-head">
        <h2>Aide · {MODULE_LABEL[moduleId]}</h2>
        <button type="button" onClick={onClose}>
          Fermer
        </button>
      </header>
      <ul className="help help-phone">
        {phone.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      <ul className="help help-desk">
        {desk.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </dialog>
  );
}

function helpLines(moduleId: ModuleId, mode: Mode, phone: boolean): string[] {
  const place = phone ? "Texte et Questions sont deux écrans. Touche le bandeau sous le titre pour passer de l’un à l’autre." : "Le texte est à gauche, les questions à droite. Chaque colonne défile seule. Tu peux tirer la barre entre les deux.";
  if (moduleId === "hoeren") {
    const audio =
      mode === "pruefung"
        ? "Audio starten joue le texte une ou deux fois, sans pause. Le texte entendu reste caché jusqu’à la page de résultat."
        : `Audio starten joue le texte une ou deux fois, sans pause. Le texte entendu reste caché. Il apparaît ${phone ? "sur Texte" : "à gauche"} après Teil korrigieren, dans la barre du bas.`;
    return [place, audio, "Lis les questions, écoute, puis coche. Markieren garde une question. Übersicht : vert = répondu, jaune = marqué."];
  }
  if (moduleId === "lesen") {
    const correction =
      mode === "pruefung"
        ? "La correction attend la page de résultat. Textmarker, dans la barre du bas : active-le, reviens au texte, sélectionne un passage."
        : "Teil korrigieren, dans la barre du bas, montre la bonne lettre et la raison. Textmarker : active-le, reviens au texte, sélectionne un passage.";
    return [place, "Une seule case par question. Dans les trous et les titres, une lettre ne sert qu’une fois : la recocher l’enlève ailleurs.", correction];
  }
  if (moduleId === "schreiben") {
    const where = phone ? "La consigne est sur Texte, ton texte sur Questions. Le compteur est sous le champ." : "La consigne est à gauche, ton texte à droite. Le compteur est sous le champ.";
    const grade =
      mode === "pruefung"
        ? "Coller est bloqué. Ce texte n’est pas noté ici : à la fin, tu coches les points que tu as vraiment traités."
        : "Pause, dans la barre du bas, arrête l’horloge. Ce texte n’est pas noté ici : à la fin, tu coches les points que tu as vraiment traités.";
    return [where, "ä ö ü ß s’insèrent là où est le curseur. Touche d’abord le texte.", grade];
  }
  const where = phone ? "La situation est sur Texte, tes notes sur Questions." : "La situation est à gauche, tes notes à droite.";
  return [where, "Les notes ne sont pas le discours. L’horloge en haut compte le module. À l’examen, les 15 minutes de préparation se font avant d’entrer.", "Nächster Teil change de situation. À la fin, les notes restent. Elles ne deviennent pas une note."];
}
