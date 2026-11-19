import { extendedDevCourses } from "./extendedDevCourses.data.js";
import { extendedSpecializedCourses } from "./extendedSpecializedCourses.data.js";

export * from "./marketplaceCatalog.data.js";

export const extendedCoursesData = {
  ...extendedDevCourses,
  ...extendedSpecializedCourses,
};
