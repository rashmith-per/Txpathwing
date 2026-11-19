import { examLanguages } from "./examData/examLanguages.data";
import { examSystems } from "./examData/examSystems.data";

export const EXAM_QUESTIONS_BY_TOPIC = {
  ...examLanguages,
  ...examSystems
};
