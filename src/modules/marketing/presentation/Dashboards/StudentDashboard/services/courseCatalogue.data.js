import { javaCourse } from "./catalogueData/javaCourse.data.js";
import { awsCourse } from "./catalogueData/awsCourse.data.js";
import { fullstackCourses } from "./catalogueData/fullstackCourses.data.js";
import { aiDataCourses } from "./catalogueData/aiDataCourses.data.js";
import { qaCareerCourses } from "./catalogueData/qaCareerCourses.data.js";

export const DEMO_VIDEOS = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
];

export const COURSE_CATALOGUE = [
  ...javaCourse,
  ...awsCourse,
  ...fullstackCourses,
  ...aiDataCourses,
  ...qaCareerCourses,
];

export const COURSE_MAP = COURSE_CATALOGUE.reduce((map, course) => {
  if (course.id) map[course.id.toLowerCase()] = course;
  if (course.code) map[course.code.toLowerCase()] = course;
  return map;
}, {});

export function getCourseByIdOrCode(idOrCode) {
  if (!idOrCode) return null;
  return COURSE_MAP[idOrCode.toLowerCase()] || null;
}
