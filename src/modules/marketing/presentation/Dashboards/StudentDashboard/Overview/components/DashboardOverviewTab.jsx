import React from "react";
import WelcomeHero from "./WelcomeHero";
import StatsCards from "./StatsCards";
import ContinueLearning from "./ContinueLearning";
import RecommendedSection from "./RecommendedSection";
import SkillProfileSection from "./SkillProfileSection";
import ComingUpSection from "./ComingUpSection";
import AchievementsSection from "./AchievementsSection";

export default function DashboardOverviewTab({
  userProfile,
  streakDays,
  learningHours,
  activeCoursesCount,
  enrollments,
  filteredEnrollments,
  recommendedCourses,
  courseFilter,
  onCourseFilterChange,
  onResumeLesson,
  onOpenLearningDetails,
  onQuickEnroll,
  onOpenRecommendedDetails,
}) {
  return (
    <>
      <WelcomeHero
        userName={userProfile?.name}
        streakDays={streakDays}
        learningHours={learningHours}
        activeCoursesCount={activeCoursesCount}
        lastCourse={enrollments[0]}
        onResume={onResumeLesson}
      />

      <StatsCards
        activeCoursesCount={activeCoursesCount}
        learningHours={learningHours}
        streakDays={streakDays}
      />

      <div className="dashboard-main-grid">
        <div className="main-column">
          <ContinueLearning
            enrollments={filteredEnrollments}
            courseFilter={courseFilter}
            onFilterChange={onCourseFilterChange}
            onResume={onResumeLesson}
            onOpenDetails={onOpenLearningDetails}
          />

          <RecommendedSection
            recommendedCourses={recommendedCourses}
            onEnroll={onQuickEnroll}
            onViewDetails={onOpenRecommendedDetails}
          />
        </div>

        <div className="sidebar-column">
          <SkillProfileSection />
          <ComingUpSection />
          <AchievementsSection />
        </div>
      </div>
    </>
  );
}
