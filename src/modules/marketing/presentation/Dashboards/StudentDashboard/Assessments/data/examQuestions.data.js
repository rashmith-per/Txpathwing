import { examLanguages } from "./examData/examLanguages.data.js";
import { examSystems } from "./examData/examSystems.data.js";

export const EXAM_QUESTIONS_BY_TOPIC = {
  ...examLanguages,
  ...examSystems
};
