import { practiceLanguages } from "./practiceData/practiceLanguages.data.js";
import { practiceWebData } from "./practiceData/practiceWebData.data.js";
import { practiceSystems } from "./practiceData/practiceSystems.data.js";

export const PRACTICE_QUESTIONS_BY_COURSE = {
  ...practiceLanguages,
  ...practiceWebData,
  ...practiceSystems
};
