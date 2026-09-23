"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useHydrated } from "@/components/useHydrated";
import { getExam } from "@/lib/exams";
import { useLearnStore } from "@/lib/learn-store";
import { allScoredQuestions, bandFor, countWords, gradeQuestions, scoredQuestions } from "@/lib/scoring";
import { useExamStore } from "@/lib/store";
import type { ClosedModuleId, Exam, Session } from "@/lib/types";
import { MODULE_LABEL } from "@/lib/types";

export function ResultsScreen({ sessionId }: { sessionId: string }) {
  const router = useRouter();
  const hydrated = useHydrated();
  const session = useExamStore((state) => state.sessions[sessionId]);
  const toggleWritingCheck = useExamStore((state) => state.toggleWritingCheck);
  const absorbExam = useLearnStore((state) => state.absorbExam);
  const startMissed = useLearnStore((state) => state.startMissed);
  const plan = useLearnStore((state) => state.plan);
  const exam = session ? getExam(session.examId) : undefined;
  const running = Boolean(plan && !plan.finishedAt);

  useEffect(() => {
    if (!hydrated || !session?.submitted || !exam) return;
    const phases = session.phases.filter((phase): phase is "lesen" | "hoeren" => phase === "lesen" || phase === "hoeren");
    const modules = phases.map((phase) => {
      const grade = gradeQuestions(allScoredQuestions(exam[phase].parts), session.answers);
      return { id: phase, points: grade.points, passed: grade.passed };
    });
    const items = phases.flatMap((phase) =>
      allScoredQuestions(exam[phase].parts).map((question) => ({
        questionId: question.id,
        correct: session.answers[question.id] === question.answer,
      })),
    );
    absorbExam({ sessionId: session.id, examId: exam.id, at: session.finishedAt ?? Date.now(), modules, items });
  }, [absorbExam, exam, hydrated, session]);

  if (!hydrated) return <p className="boot">Résultat…</p>;
  if (!session || !exam) {
    return (
      <main className="boot-card">
        <h1>Résultat introuvable</h1>
        <Link href="/">Retour</Link>
      </main>
    );
  }

  const scoredPhases = session.phases.filter((phase): phase is ClosedModuleId => phase === "lesen" || phase === "hoeren");
  const missed = scoredPhases.flatMap((phase) =>
    allScoredQuestions(exam[phase].parts)
      .filter((question) => session.answers[question.id] !== question.answer)
      .map((question) => question.id),
  );

  return (
    <main className="results">
      <header className="results-head">
        <p className="eyebrow">Correction · {session.candidate}</p>
        <h1>{exam.title}</h1>
        <p>
          {session.mode === "pruefung" ? "Mode examen" : "Mode entraînement"} ·{" "}
          {session.finishedAt ? new Date(session.finishedAt).toLocaleString("fr-FR") : "en cours"}
        </p>
        <div className="row">
          <Link href="/" className="text-btn">
            Accueil
          </Link>
          <button type="button" onClick={() => window.print()}>
            Imprimer
          </button>
        </div>
      </header>

      <section className="score-row">
        {scoredPhases.map((phase) => {
          const grade = gradeQuestions(allScoredQuestions(exam[phase].parts), session.answers);
          const band = bandFor(grade.points);
          return (
            <article key={phase} className={band.passed ? "score is-pass" : "score"}>
              <p>{MODULE_LABEL[phase]}</p>
              <strong>{grade.points}</strong>
              <span>
                {grade.correct}/{grade.total} · {band.fr}
              </span>
              <small>{band.de}</small>
            </article>
          );
        })}
      </section>
      <p className="fine">
        Chaque module se réussit seul à 60 sur 100. Pour Lesen et Hören, 30 réponses justes font 100, et 18 font 60.
        Un bon module ne rattrape pas un module raté. Les questions ratées ici reviennent dans l’entraînement.
      </p>
      <div className="row">
        {running ? (
          <Link href="/pratique" className="text-btn">
            Reprendre la série ouverte
          </Link>
        ) : (
          <button
            type="button"
            className="primary"
            onClick={() => {
              if (missed.length === 0 || !startMissed(missed)) {
                router.push("/");
                return;
              }
              router.push("/pratique");
            }}
          >
            {missed.length === 0 ? "Retour à aujourd’hui" : `S’entraîner sur ${missed.length} erreur${missed.length > 1 ? "s" : ""}`}
          </button>
        )}
      </div>

      {scoredPhases.map((phase) => (
        <ModuleReview key={phase} phase={phase} exam={exam} session={session} />
      ))}

      {session.phases.includes("schreiben") ? (
        <section className="dossier">
          <h2>Schreiben — autoévaluation</h2>
          <p>Le texte n’est pas noté automatiquement. Cochez ce que vous avez vraiment fait, puis relisez avec le rappel.</p>
          {exam.schreiben.tasks.map((task) => {
            const text = session.writings[task.id] ?? "";
            const words = countWords(text);
            const checks = session.writingChecks[task.id] ?? {};
            return (
              <article key={task.id} className="dossier-card">
                <h3>{task.title}</h3>
                <p className={words >= task.minWords ? "words is-ok" : "words"}>
                  {words} Wörter · mindestens {task.minWords}
                </p>
                <ul className="checks">
                  {task.bullets.map((bullet) => (
                    <li key={bullet}>
                      <label>
                        <input
                          type="checkbox"
                          checked={Boolean(checks[bullet])}
                          onChange={() => toggleWritingCheck(session.id, task.id, bullet)}
                        />
                        {bullet}
                      </label>
                    </li>
                  ))}
                </ul>
                <p className="why">{task.coach}</p>
                <pre>{text || "—"}</pre>
              </article>
            );
          })}
        </section>
      ) : null}

      {session.phases.includes("sprechen") ? (
        <section className="dossier">
          <h2>Sprechen — notes</h2>
          {exam.sprechen.tasks.map((task) => (
            <article key={task.id} className="dossier-card">
              <h3>{task.title}</h3>
              <p className="why">{task.coach}</p>
              <pre>{session.notes[task.id] || "—"}</pre>
            </article>
          ))}
        </section>
      ) : null}
    </main>
  );
}

function ModuleReview({ phase, exam, session }: { phase: ClosedModuleId; exam: Exam; session: Session }) {
  return (
    <section className="review">
      <h2>{MODULE_LABEL[phase]}</h2>
      {exam[phase].parts.map((part) => {
        const partGrade = gradeQuestions(scoredQuestions(part), session.answers);
        return (
          <div key={part.id} className="review-part">
            <h3>
              {part.title} · {partGrade.correct}/{partGrade.total}
            </h3>
            {part.clips.map((clip) => (
              <details key={clip.id}>
                <summary>Transcription · {clip.label}</summary>
                <p>{clip.script}</p>
              </details>
            ))}
            <ol>
              {part.questions
                .filter((question) => !question.example)
                .map((question) => {
                  const given = session.answers[question.id];
                  const ok = given === question.answer;
                  const givenText = question.choices.find((choice) => choice.id === given)?.text ?? "—";
                  const answerText = question.choices.find((choice) => choice.id === question.answer)?.text ?? question.answer;
                  return (
                    <li key={question.id} className={ok ? "item is-ok" : "item is-bad"}>
                      <p>
                        <strong>{question.number}.</strong> {question.prompt}
                      </p>
                      <p>Votre réponse : {givenText}</p>
                      {ok ? null : <p>Solution : {answerText}</p>}
                      <p className="why">{question.explanation}</p>
                    </li>
                  );
                })}
            </ol>
          </div>
        );
      })}
    </section>
  );
}
