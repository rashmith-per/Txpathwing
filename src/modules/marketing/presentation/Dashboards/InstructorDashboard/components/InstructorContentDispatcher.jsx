import React from "react";
import { Overview } from "../Overview/Overview";
import { MyCourses } from "../MyCourses/MyCourses";
import { AICourseBuilder } from "../AICourseBuilder/AICourseBuilder";
import { Batches } from "../Batches/Batches";
import { AssessmentEvaluationModule } from "../Evaluation/AssessmentEvaluationModule";
import { Assignments } from "../Assignments/Assignments";
import { Learners } from "../Learners/Learners";
import { LiveSessions } from "../LiveSessions/LiveSessions";
import { Certificates } from "../Certificates/Certificates";
import { QnA } from "../QnA/QnA";
import { Reviews } from "../Reviews/Reviews";
import { Analytics } from "../Analytics/Analytics";
import { RevenueAnalytics } from "../RevenueAnalytics";
import { Settings } from "../Settings/Settings";

export function InstructorContentDispatcher({
  page,
  profile,
  courses,
  earnings,
  attentionItems,
  learners,
  reviews,
  assignments,
  batches,
  batchAssessments,
  assessmentAssignments,
  studentEvaluations,
  liveSessions,
  qna,
  certificates,
  analytics,
  assessmentSubView,
  setAssessmentSubView,
  pendingOpenCreateCourse,
  setPendingOpenCreateCourse,
  handleNavigate,
  handleCreateCourse,
  handleUpdateCourse,
  handleDeleteOrArchiveCourse,
  handleRestoreCourse,
  handleSyncCourseSyllabus,
  handleAddBatch,
  handleDeleteBatch,
  handleUpdateBatch,
  handleGradeAssignment,
  handleCreateBatchAssessment,
  handleAssignAssessmentStudents,
  handleSaveStudentEvaluation,
  handleAddLiveSession,
  handleIssueCertificate,
  handleAnswerQnA,
  handleResolveAttentionItem,
  handleUpdateProfile
}) {
  return (
    <main className="instructor-main">
      {page === "Dashboard" && (
        <Overview
          instructorProfile={profile}
          earningsData={earnings}
          attentionItems={attentionItems}
          reviews={reviews}
          onNavigate={handleNavigate}
          onCreateCourse={() => {
            setPendingOpenCreateCourse(true);
            handleNavigate("My Courses");
          }}
          onResolveItem={handleResolveAttentionItem}
        />
      )}

      {page === "My Courses" && (
        <MyCourses
          courses={courses}
          learners={learners}
          batches={batches}
          instructorProfile={profile}
          initialOpenCreate={pendingOpenCreateCourse}
          onConsumeOpenCreate={() => setPendingOpenCreateCourse(false)}
          onCreateCourse={handleCreateCourse}
          onUpdateCourse={handleUpdateCourse}
          onDeleteOrArchiveCourse={handleDeleteOrArchiveCourse}
          onRestoreCourse={handleRestoreCourse}
          onSyncSyllabus={handleSyncCourseSyllabus}
          onNavigate={handleNavigate}
          onSelectCourse={() => handleNavigate("AI Course Builder")}
        />
      )}

      {page === "AI Course Builder" && (
        <AICourseBuilder
          instructorProfile={profile}
          learners={learners}
          batches={batches}
          onSaveCourse={handleCreateCourse}
          onNavigate={handleNavigate}
          onCloseBuilder={() => handleNavigate("My Courses")}
        />
      )}

      {page === "Batches" && (
        <Batches
          batches={batches}
          onAddBatch={handleAddBatch}
          onDeleteBatch={handleDeleteBatch}
          onUpdateBatch={handleUpdateBatch}
          courses={courses}
          onNavigate={handleNavigate}
        />
      )}

      {page === "Learners" && <Learners learners={learners} />}

      {page === "Assessment & Evaluation" && (
        <AssessmentEvaluationModule
          batches={batches}
          courses={courses}
          learners={learners}
          batchAssessments={batchAssessments}
          assessmentAssignments={assessmentAssignments}
          onCreateAssessment={handleCreateBatchAssessment}
          onAssignAssessmentStudents={handleAssignAssessmentStudents}
          studentEvaluations={studentEvaluations}
          onSaveEvaluation={handleSaveStudentEvaluation}
          subView={assessmentSubView}
          onChangeSubView={setAssessmentSubView}
          onNavigate={handleNavigate}
        />
      )}

      {page === "Assignments" && (
        <Assignments
          assignments={assignments}
          onGradeAssignment={handleGradeAssignment}
        />
      )}

      {page === "Live Sessions" && (
        <LiveSessions
          sessions={liveSessions}
          onAddSession={handleAddLiveSession}
        />
      )}

      {page === "Certificates" && (
        <Certificates
          certificates={certificates}
          onIssueCertificate={handleIssueCertificate}
        />
      )}

      {page === "QnA Forum" && (
        <QnA questions={qna} onAnswerQuestion={handleAnswerQnA} />
      )}

      {page === "Reviews" && <Reviews reviews={reviews} />}

      {page === "Analytics" && <Analytics analytics={analytics} />}

      {page === "Revenue Analytics" && (
        <RevenueAnalytics
          instructorProfile={profile}
          courses={courses}
          batches={batches}
        />
      )}

      {page === "Settings" && (
        <Settings
          instructorProfile={profile}
          onUpdateProfile={handleUpdateProfile}
        />
      )}
    </main>
  );
}
