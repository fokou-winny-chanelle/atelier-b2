import { describe, expect, it } from "vitest";
import { EXAMS } from "./index";
import { examIssues } from "./validate";
import { allScoredQuestions, gradeQuestions } from "../scoring";

describe("exam integrity", () => {
  it("keeps every built-in paper internally consistent", () => {
    const issues = EXAMS.flatMap(examIssues);
    expect(issues).toEqual([]);
  });

  it("scores a perfect Lesen paper at 100 from 30 items", () => {
    for (const exam of EXAMS) {
      const questions = allScoredQuestions(exam.lesen.parts);
      expect(questions).toHaveLength(30);
      const answers = Object.fromEntries(questions.map((question) => [question.id, question.answer]));
      expect(gradeQuestions(questions, answers).points).toBe(100);
      expect(allScoredQuestions(exam.hoeren.parts)).toHaveLength(30);
    }
  });
});
