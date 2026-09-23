export function DayMark({ day }: { day: number }) {
  const tones = ["#8d6430", "#16324f", "#1d6b45", "#21486f", "#8d342e", "#16324f", "#8d6430"];
  const color = tones[day] ?? "#16324f";
  return (
    <svg viewBox="0 0 80 80" className="h-16 w-16 shrink-0" aria-hidden="true">
      <rect width="80" height="80" rx="18" fill="#f3efe6" />
      <rect x="18" y="16" width="36" height="46" rx="4" fill={color} />
      <rect x="26" y="24" width="20" height="3" rx="1.5" fill="#f6f1e7" />
      <rect x="26" y="32" width="16" height="3" rx="1.5" fill="#f0d7a4" />
      <rect x="26" y="40" width="18" height="3" rx="1.5" fill="#f6f1e7" />
      <circle cx="58" cy="54" r="12" fill="#f0d7a4" />
    </svg>
  );
}
