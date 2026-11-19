import { practiceLanguages } from "./practiceData/practiceLanguages.data";
import { practiceWebData } from "./practiceData/practiceWebData.data";
import { practiceSystems } from "./practiceData/practiceSystems.data";

export const PRACTICE_QUESTIONS_BY_COURSE = {
  ...practiceLanguages,
  ...practiceWebData,
  ...practiceSystems
};
