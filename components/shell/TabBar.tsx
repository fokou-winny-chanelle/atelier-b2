"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/", label: "Aujourd’hui" },
  { href: "/competences", label: "Compétences" },
  { href: "/progres", label: "Progrès" },
];

const NAV_HEIGHT = 64;

function useToolbarLift() {
  const [lift, setLift] = useState(0);
  useEffect(() => {
    const update = () => {
      const viewport = window.visualViewport;
      const covered = viewport ? Math.max(0, Math.round(window.innerHeight - viewport.offsetTop - viewport.height)) : 0;
      setLift(covered);
      document.documentElement.style.setProperty("--tab-clear", `${NAV_HEIGHT + covered + 16}px`);
    };
    update();
    window.visualViewport?.addEventListener("resize", update);
    window.visualViewport?.addEventListener("scroll", update);
    window.addEventListener("resize", update);
    return () => {
      window.visualViewport?.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return lift;
}

export function TabBar() {
  const pathname = usePathname();
  const lift = useToolbarLift();
  return (
    <>
      <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col border-r border-[#ddd4c4] bg-[#fbf8f2] px-5 py-7 lg:flex">
        <Link href="/" className="font-serif text-3xl leading-none text-[#16324f]">
          Atelier B2
        </Link>
        <p className="mt-2 text-sm text-[#5e584e]">Entraînement Goethe B2</p>
        <nav className="mt-8 flex flex-col gap-1" aria-label="Sections">
          {LINKS.map((link) => {
            const on = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={on ? "page" : undefined}
                className={on ? "rounded-2xl bg-[#16324f] px-4 py-3 text-base font-semibold text-[#f6f1e7]" : "rounded-2xl px-4 py-3 text-base text-[#1c1915] hover:bg-white"}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <nav
        className="fixed inset-x-0 z-40 border-t border-[#c9bfae] bg-[#fbf8f2] shadow-[0_-8px_24px_rgba(28,25,21,0.06)] lg:hidden"
        style={{ bottom: lift, paddingBottom: "env(safe-area-inset-bottom)" }}
        aria-label="Sections"
      >
        <ul className="grid h-16 grid-cols-3">
          {LINKS.map((link) => {
            const on = pathname === link.href;
            return (
              <li key={link.href} className="min-w-0">
                <Link
                  href={link.href}
                  aria-current={on ? "page" : undefined}
                  className={on ? "flex h-full items-center justify-center border-t-2 border-[#16324f] px-1 text-center text-sm font-semibold leading-tight text-[#16324f]" : "flex h-full items-center justify-center border-t-2 border-transparent px-1 text-center text-sm font-medium leading-tight text-[#3f3a33]"}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
