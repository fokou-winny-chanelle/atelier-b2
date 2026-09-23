"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { DayMark } from "@/components/art/DayMark";
import { AppFrame } from "@/components/shell/AppFrame";
import { useHydrated } from "@/components/useHydrated";
import { EXAMS } from "@/lib/exams";
import { useLearnStore } from "@/lib/learn-store";
import { useExamStore } from "@/lib/store";
import type { ModuleId, Mode } from "@/lib/types";
import { MODULE_LABEL } from "@/lib/types";

export function HomeScreen() {
  const router = useRouter();
  const hydrated = useHydrated();
  const preview = useLearnStore((state) => state.preview);
  const plan = useLearnStore((state) => state.plan);
  const start = useLearnStore((state) => state.start);
  const candidate = useExamStore((state) => state.candidate);
  const setCandidate = useExamStore((state) => state.setCandidate);
  const createSession = useExamStore((state) => state.createSession);
  const [openExam, setOpenExam] = useState<string | null>(null);
  const today = preview("daily");
  const review = preview("review");
  const weekday = new Date().getDay();
  const running = Boolean(hydrated && plan && !plan.finishedAt);

  function openPractice(kind: "daily" | "review" | "skill", skill?: string) {
    if (running) {
      router.push("/pratique");
      return;
    }
    start(kind, skill);
    router.push("/pratique");
  }

  function startExam(examId: string, phases: ModuleId[], mode: Mode) {
    const exam = EXAMS.find((item) => item.id === examId);
    const first = phases[0];
    if (!exam || !first) return;
    const id = crypto.randomUUID();
    createSession({
      id,
      examId,
      candidate: candidate.trim() || "Gast",
      mode,
      phases,
      durationMinutes: exam[first].durationMinutes,
    });
    router.push(`/session/${id}`);
  }

  return (
    <AppFrame>
      <main className="mx-auto w-full max-w-6xl px-4 pb-[var(--tab-clear,7rem)] pt-6 lg:px-10 lg:pb-16 lg:pt-10">
        <header className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#5c4318]">Goethe-Zertifikat B2</p>
            <h1 className="mt-2 font-serif text-5xl leading-none lg:text-6xl">Aujourd’hui</h1>
          </div>
          <DayMark day={weekday} />
        </header>

        <div className="mt-8 grid items-stretch gap-4 lg:grid-cols-12">
          <article className="flex flex-col rounded-3xl bg-[#16324f] p-6 text-[#f6f1e7] lg:col-span-7 lg:p-8">
            <p className="text-sm font-semibold text-[#f0d7a4]">{hydrated ? today.title : "Aujourd’hui"}</p>
            <h2 className="mt-2 max-w-xl font-serif text-3xl leading-tight lg:text-5xl">
              {hydrated ? (running ? plan?.title ?? today.blurb : today.blurb) : "Préparation…"}
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-[#e4ebf3]">
              {running
                ? "Une série est déjà ouverte. Termine-la, ou abandonne-la depuis l’entraînement, avant d’en changer."
                : "Une série différente selon le jour : questions, parfois un bloc, parfois un texte. Compte environ un quart d’heure."}
            </p>
            <button
              type="button"
              onClick={() => openPractice("daily")}
              className="mt-6 min-h-12 w-fit rounded-full bg-[#f6f1e7] px-6 text-base font-semibold text-[#16324f]"
            >
              {running ? "Continuer la série" : "Commencer"}
            </button>
          </article>

          <div className="flex flex-col gap-4 lg:col-span-5">
            <label className="rounded-3xl border border-[#ddd4c4] bg-[#fbf8f2] p-5 text-sm text-[#5e584e]">
              Ton prénom, pour l’examen
              <input
                value={candidate}
                onChange={(event) => setCandidate(event.target.value)}
                placeholder="Prénom"
                maxLength={40}
                className="mt-2 w-full rounded-2xl border border-[#c9bfae] bg-white px-4 py-3 text-base text-[#1c1915]"
              />
            </label>
            <button
              type="button"
              onClick={() => review.count > 0 && openPractice("review")}
              disabled={!hydrated || running || review.count === 0}
              className="flex min-h-28 flex-1 flex-col justify-center rounded-3xl border border-[#ddd4c4] bg-white px-5 py-4 text-left disabled:bg-[#efeae0] disabled:text-[#5e584e]"
            >
              <span className="text-sm text-[#5e584e]">Erreurs à revoir</span>
              <span className="mt-1 text-xl font-semibold text-[#1c1915]">{running ? "Disponible après la série ouverte" : hydrated ? review.blurb : "Chargement…"}</span>
            </button>
          </div>
        </div>

        <section className="mt-8">
          <h2 className="font-serif text-3xl">Examen blanc</h2>
          <p className="mt-2 max-w-3xl text-base leading-relaxed text-[#5e584e]">
            L’examen écrit garde la correction pour la fin. Le mode avec correction la montre à la fin de chaque partie, et la pause est possible.
          </p>
          <ul className="mt-4 grid gap-3 lg:grid-cols-3">
            {EXAMS.map((exam) => {
              const open = openExam === exam.id;
              return (
                <li key={exam.id} className="rounded-3xl border border-[#ddd4c4] bg-white p-4">
                  <button type="button" className="flex min-h-12 w-full items-center justify-between text-left" onClick={() => setOpenExam(open ? null : exam.id)}>
                    <span>
                      <span className="block text-lg font-semibold">{exam.title}</span>
                      <span className="text-sm text-[#5e584e]">{exam.subtitle}</span>
                    </span>
                    <span className="text-[#5e584e] lg:hidden" aria-hidden="true">{open ? "–" : "+"}</span>
                  </button>
                  <div className={open ? "mt-3 flex flex-wrap gap-2" : "mt-3 hidden flex-wrap gap-2 lg:flex"}>
                    <button type="button" className="min-h-11 rounded-full bg-[#16324f] px-4 text-sm font-semibold text-[#f6f1e7]" onClick={() => startExam(exam.id, ["lesen", "hoeren", "schreiben"], "pruefung")}>
                      Examen écrit
                    </button>
                    <button type="button" className="min-h-11 rounded-full border border-[#c9bfae] bg-white px-4 text-sm font-semibold text-[#1c1915]" onClick={() => startExam(exam.id, ["lesen", "hoeren", "schreiben"], "uebung")}>
                      Avec correction
                    </button>
                    {(["lesen", "hoeren", "schreiben", "sprechen"] as ModuleId[]).map((moduleId) => (
                      <button key={moduleId} type="button" className="min-h-11 rounded-full border border-[#c9bfae] bg-white px-4 text-sm text-[#1c1915]" onClick={() => startExam(exam.id, [moduleId], "uebung")}>
                        {MODULE_LABEL[moduleId]}
                      </button>
                    ))}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-[#5e584e]">
          Textes originaux, au format de l’examen. Le livre papier n’est pas reproduit ici. Sur un grand écran, le texte et les questions restent côte à côte. Sur téléphone, ils s’affichent l’un après l’autre.
        </p>
      </main>
    </AppFrame>
  );
}
