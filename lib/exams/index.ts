import type { Exam } from "../types";
import { modellsatz01 } from "./modellsatz-01";
import { modellsatz02 } from "./modellsatz-02";
import { modellsatz03 } from "./modellsatz-03";
import { modellsatz04 } from "./modellsatz-04";
import { modellsatz05 } from "./modellsatz-05";

export const EXAMS: Exam[] = [modellsatz01, modellsatz02, modellsatz03, modellsatz04, modellsatz05];

export function getExam(id: string): Exam | undefined {
  return EXAMS.find((exam) => exam.id === id);
}
