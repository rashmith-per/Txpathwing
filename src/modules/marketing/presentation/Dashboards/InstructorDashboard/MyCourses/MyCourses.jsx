import { useState, useMemo } from "react";
import { Plus, AlertCircle, CheckCircle2, X } from "lucide-react";
import { ActionButton, IconButton } from "../common/ActionButton.jsx";
import { AICourseBuilder } from "../AICourseBuilder/AICourseBuilder.jsx";
import { MyCoursesList } from "./components/MyCoursesList.jsx";
import { MyCoursesModals } from "./components/MyCoursesModals.jsx";
import { useMyCoursesFilter } from "./hooks/useMyCoursesFilter.js";
import "./MyCourses.css";

function getStatusTone(status) {
  const norm = String(status || "").toLowerCase();
  if (norm === "published") return "success";
  if (norm === "draft") return "warning";
  if (norm === "archived") return "neutral";
  return "neutral";
}

export function MyCourses({
  courses = [],
  onCreateCourse,
  onUpdateCourse,
  onDeleteOrArchiveCourse,
  onRestoreCourse,
  onSyncSyllabus,
  learners = [],
  batches = [],
  instructorProfile,
  onNavigate,
  initialWorkspaceMode = "list",
  initialStudioCourseId = null
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [workspaceMode, setWorkspaceMode] = useState(() =>
    initialWorkspaceMode === "create" ? "create" : "list"
  );
  const [studioCourseId, setStudioCourseId] = useState(initialStudioCourseId);
  const [viewingCourseId, setViewingCourseId] = useState(null);
  const [selectedSyllabusCourseId, setSelectedSyllabusCourseId] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const showBanner = (type, text) => {
    setFeedback({ type, text });
    setTimeout(() => setFeedback(null), 4000);
  };

  const {
    activeCoursesCount,
    totalEnrolled,
    averageRating,
    statusCounts,
    filteredCourses,
  } = useMyCoursesFilter(courses, search, statusFilter);

  const viewingCourse = useMemo(() => courses.find((c) => c.id === viewingCourseId) || null, [courses, viewingCourseId]);
  const selectedSyllabusCourse = useMemo(() => courses.find((c) => c.id === selectedSyllabusCourseId) || null, [courses, selectedSyllabusCourseId]);
  const studioCourse = useMemo(() => courses.find((c) => c.id === studioCourseId) || null, [courses, studioCourseId]);

  const handleOpenCreate = () => {
    setStudioCourseId(null);
    setWorkspaceMode("create");
  };

  const handleOpenStudioForCourse = (course) => {
    setViewingCourseId(null);
    setSelectedSyllabusCourseId(null);
    setStudioCourseId(course.id);
    setWorkspaceMode("edit-studio");
  };

  const handleRequestDeleteOrArchive = (course) => {
    if (!course) return;
    const enrolled = Number(course.enrolledLearners || 0);
    setDeleteTarget({
      course,
      impact: {
        hasEnrolledStudents: enrolled > 0,
        enrolledLearners: enrolled,
        linkedLearnersCount: enrolled,
        linkedBatchesCount: 0,
        requiresArchive: enrolled > 0
      }
    });
  };

  const handleConfirmDeleteOrArchive = async () => {
    if (!deleteTarget?.course) return;
    const { course } = deleteTarget;
    setIsSubmitting(true);
    try {
      const res = await onDeleteOrArchiveCourse(course.id, {
        learners,
        batches,
        forceArchive: deleteTarget.impact?.requiresArchive
      });
      setDeleteTarget(null);
      if (res?.action === "archived") {
        showBanner("success", `Course "${course.title}" was safely archived.`);
      } else {
        showBanner("success", `Course "${course.title}" was permanently deleted.`);
      }
    } catch (err) {
      showBanner("error", err?.message || "Failed to remove course.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRestoreCourseClick = async (course) => {
    if (!course || typeof onRestoreCourse !== "function") return;
    setIsSubmitting(true);
    try {
      await onRestoreCourse(course.id);
      setStatusFilter("all");
      showBanner("success", `Restored "${course.title}" back to active courses.`);
    } catch (err) {
      showBanner("error", err?.message || "Failed to restore course.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveCourseMetadata = async (updatedFields) => {
    if (!editingCourse) return;
    setIsSubmitting(true);
    try {
      await onUpdateCourse(editingCourse.id, updatedFields);
      const updatedTitle = updatedFields.title || editingCourse.title;
      setEditingCourse(null);
      showBanner("success", `Saved course updates for "${updatedTitle}".`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTogglePublishCourse = async (course) => {
    if (!course || typeof onUpdateCourse !== "function") return;
    const isPublished = String(course.status || "").toLowerCase() === "published";
    const nextStatus = isPublished ? "Draft" : "Published";
    setIsSubmitting(true);
    try {
      await onUpdateCourse(course.id, { status: nextStatus });
      showBanner(
        "success",
        isPublished
          ? `Moved "${course.title}" back to Draft.`
          : `Published "${course.title}" to the course catalog.`
      );
    } catch (err) {
      showBanner("error", err?.message || "Failed to update course publication.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (workspaceMode === "create" || (workspaceMode === "edit-studio" && studioCourse)) {
    return (
      <div className="inst-mc-container">
        <AICourseBuilder
          key={workspaceMode === "edit-studio" ? `edit-${studioCourse.id}` : "new-course"}
          instructorProfile={instructorProfile}
          embedded={true}
          initialMode={studioCourse?.generationMode || "ai"}
          editingCourse={workspaceMode === "edit-studio" ? studioCourse : null}
          learners={learners}
          batches={batches}
          onSaveCourse={async (savedCourse, meta) => {
            if (meta?.isUpdate && typeof onUpdateCourse === "function") {
              await onUpdateCourse(savedCourse.id, savedCourse);
            } else if (typeof onCreateCourse === "function") {
              await onCreateCourse(savedCourse);
            }
          }}
          onDeleteCourse={async (courseId, options) => {
            const res = await onDeleteOrArchiveCourse(courseId, options);
            setWorkspaceMode("list");
            setStudioCourseId(null);
            if (res?.action === "archived") {
              showBanner("success", `Course archived with enrolled learner records preserved.`);
            } else {
              showBanner("success", `Course deleted successfully.`);
            }
            return res;
          }}
          onCloseBuilder={(statusMessage) => {
            setWorkspaceMode("list");
            setStudioCourseId(null);
            if (statusMessage) showBanner("success", statusMessage);
          }}
        />
      </div>
    );
  }

  return (
    <div className="inst-mc-container">
      <div className="inst-mc-header">
        <div className="inst-mc-title-wrap">
          <div className="breadcrumb-nav">
            <span>TX Pathwing</span>
            <span className="separator">/</span>
            <span>Instructor</span>
            <span className="separator">/</span>
            <strong className="current">My Courses</strong>
          </div>
          <h1 className="inst-mc-title">My Courses</h1>
          <p className="inst-mc-subtitle">
            Create courses manually or with AI, manage syllabi modules and topics, and organize your catalog.
          </p>
        </div>

        <ActionButton
          icon={Plus}
          variant="primary"
          size="lg"
          onClick={handleOpenCreate}
          tooltip="Create a new manual or AI-assisted course"
        >
          Create Course
        </ActionButton>
      </div>

      {feedback && (
        <div
          className={`inst-mc-feedback-banner ${feedback.type}`}
          role={feedback.type === "error" ? "alert" : "status"}
        >
          {feedback.type === "error" ? <AlertCircle size={17} /> : <CheckCircle2 size={17} />}
          <span>{feedback.text}</span>
          <IconButton
            icon={X}
            size="xs"
            variant="ghost"
            className="inst-cb-banner-dismiss"
            onClick={() => setFeedback(null)}
            tooltip="Dismiss message"
            ariaLabel="Dismiss message"
          />
        </div>
      )}

      <MyCoursesList
        activeCoursesCount={activeCoursesCount}
        totalEnrolled={totalEnrolled}
        averageRating={averageRating}
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        statusCounts={statusCounts}
        filteredCourses={filteredCourses}
        getStatusTone={getStatusTone}
        isSubmitting={isSubmitting}
        setViewingCourseId={setViewingCourseId}
        setEditingCourse={setEditingCourse}
        setSelectedSyllabusCourseId={setSelectedSyllabusCourseId}
        handleRestoreCourseClick={handleRestoreCourseClick}
        handleRequestDeleteOrArchive={handleRequestDeleteOrArchive}
        handleTogglePublishCourse={handleTogglePublishCourse}
        handleOpenStudioForCourse={handleOpenStudioForCourse}
        onNavigate={onNavigate}
      />

      <MyCoursesModals
        viewingCourse={viewingCourse}
        setViewingCourseId={setViewingCourseId}
        selectedSyllabusCourse={selectedSyllabusCourse}
        setSelectedSyllabusCourseId={setSelectedSyllabusCourseId}
        editingCourse={editingCourse}
        setEditingCourse={setEditingCourse}
        deleteTarget={deleteTarget}
        setDeleteTarget={setDeleteTarget}
        handleRequestDeleteOrArchive={handleRequestDeleteOrArchive}
        handleRestoreCourseClick={handleRestoreCourseClick}
        handleTogglePublishCourse={handleTogglePublishCourse}
        handleOpenStudioForCourse={handleOpenStudioForCourse}
        handleSaveCourseMetadata={handleSaveCourseMetadata}
        handleConfirmDeleteOrArchive={handleConfirmDeleteOrArchive}
        onSyncSyllabus={onSyncSyllabus}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

export default MyCourses;
