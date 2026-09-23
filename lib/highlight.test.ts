import { describe, expect, it } from "vitest";
import { applyMarks } from "./highlight";

describe("applyMarks", () => {
  it("wraps a quote and leaves the rest intact", () => {
    const pieces = applyMarks("Die Miete ist hoch und bleibt hoch.", [
      { id: "m1", quote: "Miete ist hoch" },
    ]);
    expect(pieces.map((piece) => piece.text).join("")).toBe("Die Miete ist hoch und bleibt hoch.");
    expect(pieces.find((piece) => piece.markId === "m1")?.text).toBe("Miete ist hoch");
  });

  it("skips overlapping quotes", () => {
    const pieces = applyMarks("abcdef", [
      { id: "a", quote: "bcd" },
      { id: "b", quote: "cde" },
    ]);
    expect(pieces.filter((piece) => piece.markId).map((piece) => piece.markId)).toEqual(["a"]);
  });
});
