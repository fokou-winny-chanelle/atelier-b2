import { describe, expect, it } from "vitest";
import { bandFor, countWords, gradeQuestions } from "./scoring";
import type { Question } from "./types";

const questions: Question[] = [
  {
    id: "q0",
    number: 0,
    prompt: "Beispiel",
    choices: [{ id: "a", text: "A" }],
    answer: "a",
    explanation: "exemple",
    example: true,
  },
  {
    id: "q1",
    number: 1,
    prompt: "Eins",
    choices: [
      { id: "a", text: "A" },
      { id: "b", text: "B" },
    ],
    answer: "a",
    explanation: "a",
  },
  {
    id: "q2",
    number: 2,
    prompt: "Zwei",
    choices: [
      { id: "a", text: "A" },
      { id: "b", text: "B" },
    ],
    answer: "b",
    explanation: "b",
  },
];

describe("countWords", () => {
  it("counts German words and ignores extra spaces", () => {
    expect(countWords("  Das ist ein Satz.  ")).toBe(4);
    expect(countWords("")).toBe(0);
    expect(countWords("Größe überprüfen")).toBe(2);
  });
});

describe("gradeQuestions", () => {
  it("ignores the example and converts the ratio to points out of 100", () => {
    const result = gradeQuestions(questions, { q1: "a", q2: "a" });
    expect(result).toMatchObject({ correct: 1, total: 2, points: 50, passed: false });
  });

  it("passes at 60", () => {
    const result = gradeQuestions(questions, { q1: "a", q2: "b" });
    expect(result.points).toBe(100);
    expect(result.passed).toBe(true);
  });
});

describe("bandFor", () => {
  it("uses the Goethe result bands", () => {
    expect(bandFor(59).passed).toBe(false);
    expect(bandFor(60).de).toBe("ausreichend");
    expect(bandFor(90).de).toBe("sehr gut");
  });
});
