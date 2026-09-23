"use client";

import Link from "next/link";
import { AppFrame } from "@/components/shell/AppFrame";
import { useHydrated } from "@/components/useHydrated";
import { SKILLS, trackedQuestions } from "@/lib/catalog";
import { useLearnStore } from "@/lib/learn-store";
import { practiceStreak } from "@/lib/plan";
import { modulePictures } from "@/lib/readiness";

export function ProgressScreen() {
  const hydrated = useHydrated();
  const memory = useLearnStore((state) => state.memory);
  const days = useLearnStore((state) => state.days);
  const cards = trackedQuestions();
  const streak = practiceStreak(days, Date.now());
  const mocks = useLearnStore((state) => state.mocks);
  const productions = useLearnStore((state) => state.productions);
  const modules = modulePictures({ memory, cards, mocks, productions });

  const rows = SKILLS.filter((skill) => skill.id !== "schreiben" && skill.id !== "sprechen").map((skill) => {
    const mine = cards.filter((card) => card.skill === skill.id);
    const seen = mine.filter((card) => memory[card.questionId]);
    const correct = seen.reduce((sum, card) => sum + (memory[card.questionId]?.correct ?? 0), 0);
    const attempts = seen.reduce((sum, card) => sum + (memory[card.questionId]?.seen ?? 0), 0);
    const wrong = seen.reduce((sum, card) => sum + (memory[card.questionId]?.wrong ?? 0), 0);
    const due = mine.filter((card) => {
      const item = memory[card.questionId];
      return Boolean(item && item.wrong > 0 && item.dueAt <= Date.now());
    }).length;
    return { ...skill, attempts, wrong, due, rate: attempts ? Math.round((correct / attempts) * 100) : null };
  });
  const fragile = rows.filter((row) => row.rate != null).sort((a, b) => (a.rate ?? 100) - (b.rate ?? 100))[0];
  const belowPass = rows.filter((row) => row.rate != null && row.rate < 60);
  const dueCount = rows.reduce((sum, row) => sum + row.due, 0);

  return (
    <AppFrame>
      <main className="mx-auto w-full max-w-6xl px-4 pb-[var(--tab-clear,7rem)] pt-6 lg:px-10 lg:pb-16 lg:pt-10">
        <h1 className="text-center font-serif text-4xl leading-none sm:text-left sm:text-5xl lg:text-6xl">Progrès</h1>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {modules.map((module) => (
            <li key={module.id} className="rounded-3xl border border-[#ddd4c4] bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#5c4318]">{module.label}</p>
              <p className="mt-2 font-serif text-3xl text-[#16324f]">{module.status === "seuil" ? "60 atteint" : module.status === "fragile" ? "Sous 60" : module.status === "proche" ? "Proche" : "À commencer"}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#5e584e]">{hydrated ? module.note : "…"}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8 grid gap-4 lg:grid-cols-[18rem_minmax(0,1fr)]">
          <p className="rounded-3xl bg-[#16324f] p-6 text-[#f6f1e7]">
            <span className="block font-serif text-6xl leading-none">{hydrated ? streak : "…"}</span>
            <span className="mt-3 block text-lg">{hydrated ? `jour${streak > 1 ? "s" : ""} d’affilée` : "Calcul…"}</span>
            <span className="mt-2 block text-sm leading-relaxed text-[#e4ebf3]">Un jour compte dès qu’une série est terminée. Ce n’est pas une note d’examen.</span>
          </p>
          <div className="rounded-3xl border border-[#ddd4c4] bg-white p-6 text-base leading-relaxed text-[#1c1915]">
            <p>En examen, un module est réussi à 60 sur 100. Ici, le pourcentage est ta réussite à l’entraînement, sur cet appareil. Ce n’est pas une note officielle.</p>
            {hydrated && dueCount > 0 ? <p className="mt-3 font-semibold">{dueCount} question{dueCount > 1 ? "s" : ""} ratée{dueCount > 1 ? "s" : ""} {dueCount > 1 ? "sont" : "est"} prévue{dueCount > 1 ? "s" : ""} au retour.</p> : null}
            {hydrated && belowPass.length > 0 ? (
              <p className="mt-3">
                Sous le seuil : {belowPass.map((row) => `${row.module} · ${row.title} (${row.rate} %)`).join(", ")}.{" "}
                <Link href="/competences" className="font-semibold text-[#16324f] underline decoration-[#c9bfae] underline-offset-4">
                  S’y remettre
                </Link>
              </p>
            ) : null}
            {hydrated && fragile && fragile.rate != null && fragile.rate < 80 && belowPass.length === 0 ? (
              <p className="mt-3">
                Le point le plus fragile est <strong>{fragile.module} · {fragile.title}</strong>, autour de {fragile.rate} %.{" "}
                <Link href="/competences" className="font-semibold text-[#16324f] underline decoration-[#c9bfae] underline-offset-4">
                  S’y remettre
                </Link>
              </p>
            ) : null}
            {hydrated && rows.every((row) => row.rate == null) ? <p className="mt-3">Termine une série. Chaque erreur est gardée, puis elle revient le lendemain, puis de plus en plus tard si tu la réussis.</p> : null}
          </div>
        </div>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {rows.map((row) => (
            <li key={row.id} className="rounded-3xl border border-[#ddd4c4] bg-white px-5 py-4">
              <div className="flex items-baseline justify-between gap-3">
                <span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#5c4318]">{row.module}</span>
                  <span className="mt-0.5 block text-lg font-semibold">{row.title}</span>
                </span>
                <span className="text-right text-sm font-semibold text-[#5e584e]">
                  {row.rate == null ? "pas encore" : `${row.rate} %`}
                  {row.wrong > 0 ? <span className="mt-0.5 block font-medium text-[#8d342e]">{row.wrong} erreur{row.wrong > 1 ? "s" : ""}</span> : null}
                </span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#e7e1d6]">
                <div className={row.rate != null && row.rate < 60 ? "h-full rounded-full bg-[#8d342e]" : "h-full rounded-full bg-[#1d6b45]"} style={{ width: `${row.rate ?? 0}%` }} />
              </div>
            </li>
          ))}
        </ul>
      </main>
    </AppFrame>
  );
}
