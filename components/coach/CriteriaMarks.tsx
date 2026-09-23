import type { Criterion, CriterionMark } from "@/lib/criteria";

const MARKS: { id: CriterionMark; label: string }[] = [
  { id: "tenu", label: "Tenu" },
  { id: "fragile", label: "Fragile" },
  { id: "manque", label: "Manqué" },
];

export function CriteriaMarks({
  items,
  value,
  onChange,
}: {
  items: Criterion[];
  value: Record<string, CriterionMark | undefined>;
  onChange: (id: string, mark: CriterionMark) => void;
}) {
  return (
    <ul className="mt-4 grid gap-3">
      {items.map((item) => (
        <li key={item.id} className="rounded-2xl border border-[#ddd4c4] bg-white p-3">
          <p className="font-semibold">{item.label}</p>
          <p className="mt-1 text-sm leading-relaxed text-[#5e584e]">{item.hint}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {MARKS.map((mark) => {
              const on = value[item.id] === mark.id;
              return (
                <button
                  key={mark.id}
                  type="button"
                  aria-pressed={on}
                  className={on ? "min-h-10 rounded-full bg-[#16324f] px-3 text-sm font-semibold text-[#f6f1e7]" : "min-h-10 rounded-full border border-[#c9bfae] bg-white px-3 text-sm text-[#1c1915]"}
                  onClick={() => onChange(item.id, mark.id)}
                >
                  {mark.label}
                </button>
              );
            })}
          </div>
        </li>
      ))}
    </ul>
  );
}
