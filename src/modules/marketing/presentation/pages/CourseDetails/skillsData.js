import { extendedDevCourses } from "./extendedDevCourses.data";
import { extendedSpecializedCourses } from "./extendedSpecializedCourses.data";

export * from "./marketplaceCatalog.data";

export const extendedCoursesData = {
  ...extendedDevCourses,
  ...extendedSpecializedCourses,
};
