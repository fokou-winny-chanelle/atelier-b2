export interface TextPiece {
  text: string;
  markId?: string;
}

/** Wraps the first non-overlapping occurrence of each quote. */
export function applyMarks(source: string, quotes: { id: string; quote: string }[]): TextPiece[] {
  const ranges: { start: number; end: number; id: string }[] = [];
  const used: { start: number; end: number }[] = [];

  for (const mark of quotes) {
    const quote = mark.quote.trim();
    if (quote.length < 2) continue;
    const start = source.indexOf(quote);
    if (start < 0) continue;
    const end = start + quote.length;
    const overlaps = used.some((range) => start < range.end && end > range.start);
    if (overlaps) continue;
    used.push({ start, end });
    ranges.push({ start, end, id: mark.id });
  }

  ranges.sort((a, b) => a.start - b.start);
  if (ranges.length === 0) return [{ text: source }];

  const pieces: TextPiece[] = [];
  let cursor = 0;
  for (const range of ranges) {
    if (range.start > cursor) pieces.push({ text: source.slice(cursor, range.start) });
    pieces.push({ text: source.slice(range.start, range.end), markId: range.id });
    cursor = range.end;
  }
  if (cursor < source.length) pieces.push({ text: source.slice(cursor) });
  return pieces;
}
