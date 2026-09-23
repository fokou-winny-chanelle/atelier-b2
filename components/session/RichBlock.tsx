"use client";

import { applyMarks } from "@/lib/highlight";

export function RichBlock({
  body,
  marks,
  gaps,
  onRemove,
}: {
  body: string;
  marks: { id: string; quote: string }[];
  gaps: Record<string, string | undefined>;
  onRemove: (id: string) => void;
}) {
  const chunks = body.split(/(\[\[[^\]]+\]\])/g);

  return (
    <>
      {chunks.map((chunk, index) => {
        const gap = /^\[\[(\d+)\]\]$/.exec(chunk);
        if (gap) {
          const number = gap[1] ?? "";
          const letter = gaps[number];
          return (
            <span key={`${number}-${index}`} className={letter ? "gap is-filled" : "gap"}>
              {letter ? letter.toUpperCase() : number}
            </span>
          );
        }
        const pieces = applyMarks(chunk, marks);
        return pieces.map((piece, pieceIndex) =>
          piece.markId ? (
            <mark
              key={`${index}-${pieceIndex}`}
              className="ink"
              onClick={() => onRemove(piece.markId!)}
              title="Hervorhebung entfernen"
            >
              {piece.text}
            </mark>
          ) : (
            <span key={`${index}-${pieceIndex}`}>{piece.text}</span>
          ),
        );
      })}
    </>
  );
}
