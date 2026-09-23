"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppFrame } from "@/components/shell/AppFrame";
import { useHydrated } from "@/components/useHydrated";
import { SKILLS } from "@/lib/catalog";
import { useLearnStore } from "@/lib/learn-store";

export function SkillsScreen() {
  const router = useRouter();
  const hydrated = useHydrated();
  const start = useLearnStore((state) => state.start);
  const plan = useLearnStore((state) => state.plan);
  const running = Boolean(hydrated && plan && !plan.finishedAt);
  const modules = [...new Set(SKILLS.map((skill) => skill.module))];

  return (
    <AppFrame>
      <main className="mx-auto w-full max-w-6xl px-4 pb-[var(--tab-clear,7rem)] pt-6 lg:px-10 lg:pb-16 lg:pt-10">
        <h1 className="text-center font-serif text-4xl leading-none sm:text-left sm:text-5xl lg:text-6xl">Compétences</h1>
        <p className="mx-auto mt-3 max-w-2xl text-center text-base leading-relaxed text-[#5e584e] sm:mx-0 sm:text-left">Choisis une compétence. La série se prépare toute seule, et la fiche dit quoi faire.</p>
        {running ? (
          <p className="mt-5 max-w-3xl rounded-3xl border border-[#ddd4c4] bg-white p-5 text-base leading-relaxed text-[#1c1915]">
            Une série est déjà ouverte.{" "}
            <Link href="/pratique" className="font-semibold text-[#16324f] underline decoration-[#c9bfae] underline-offset-4">
              La reprendre
            </Link>
            , ou abandonne-la dans l’entraînement, avant d’en choisir une autre.
          </p>
        ) : null}
        {modules.map((moduleName) => (
          <section key={moduleName} className="mt-8">
            <h2 className="font-serif text-3xl text-[#16324f]">{moduleName}</h2>
            <ul className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {SKILLS.filter((skill) => skill.module === moduleName).map((skill) => (
                <li key={skill.id} className="flex flex-col rounded-3xl border border-[#ddd4c4] bg-white p-5">
                  <h3 className="text-xl font-semibold">{skill.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[#5e584e]">{skill.detail}</p>
                  <button
                    type="button"
                    className="mt-4 min-h-11 w-full rounded-full bg-[#16324f] px-4 text-sm font-semibold text-[#f6f1e7] disabled:bg-[#3d5164] disabled:text-[#f6f1e7] sm:w-fit"
                    disabled={running}
                    onClick={() => {
                      start("skill", skill.id);
                      router.push("/pratique");
                    }}
                  >
                    S’entraîner
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>
    </AppFrame>
  );
}
