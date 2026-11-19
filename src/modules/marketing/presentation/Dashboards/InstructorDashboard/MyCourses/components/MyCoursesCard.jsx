import React from "react";
import {
  Users,
  CheckCircle2,
  Star,
  Clock,
  Eye,
  Pencil,
  BookOpen,
  RotateCcw,
  Archive,
  Trash2,
  Sparkles,
  EyeOff,
  Send
} from "lucide-react";
import { Badge } from "../../common/Badge";
import { ActionButton, IconButton } from "../../common/ActionButton.jsx";
import { MoreActionsMenu } from "../../common/MoreActionsMenu.jsx";

export function MyCoursesCard({
  course,
  getStatusTone,
  isSubmitting,
  setViewingCourseId,
  setEditingCourse,
  setSelectedSyllabusCourseId,
  handleRestoreCourseClick,
  handleRequestDeleteOrArchive,
  handleTogglePublishCourse,
  handleOpenStudioForCourse,
  onNavigate,
}) {
  const tone = getStatusTone(course.status);
  const isArchived = String(course.status || "").toLowerCase() === "archived";
  const enrolledCount = Number(course.enrolledLearners || 0);

  return (
    <article className={`inst-mc-card ${isArchived ? "archived-card" : ""}`}>
      <div className="inst-mc-card-head">
        <div className="inst-mc-code-cluster">
          <span className="inst-mc-code-tag">{course.code}</span>
          {course.generationMode === "ai" && (
            <span className="inst-mc-ai-badge" title="Created with AI Course Builder">
              <Sparkles size={10} /> AI
            </span>
          )}
        </div>
        <Badge tone={tone}>{course.status}</Badge>
      </div>

      <h3 className="inst-mc-course-title">{course.title}</h3>
      <span className="inst-mc-course-subtitle">
        {course.category} · {course.level}
      </span>

      <div className="inst-mc-metrics-box">
        <div className="inst-mc-metric">
          <Users size={14} />
          <span>{enrolledCount.toLocaleString("en-IN")} Students</span>
        </div>
        <div className="inst-mc-metric">
          <CheckCircle2 size={14} />
          <span>{course.completionRate || 0}% Done</span>
        </div>
        <div className="inst-mc-metric">
          <Star size={14} className="star-icon" />
          <span>
            {course.rating || 4.9} ({course.reviewsCount || 0})
          </span>
        </div>
        <div className="inst-mc-metric">
          <Clock size={14} />
          <span>
            {course.modulesCount || 0} Modules ({course.totalHours || 40}h)
          </span>
        </div>
      </div>

      <div className="inst-mc-card-foot">
        <div className="inst-mc-revenue">
          <small>{course.revenue ? "Generated Revenue" : "Course Fee"}</small>
          <strong>
            ₹{Number(course.revenue || course.price || 0).toLocaleString("en-IN")}
          </strong>
        </div>

        <div className="inst-mc-actions">
          <IconButton
            icon={Eye}
            size="sm"
            variant="view"
            onClick={() => setViewingCourseId(course.id)}
            tooltip="View Course Details"
            ariaLabel={`View course ${course.title}`}
          />

          <IconButton
            icon={Pencil}
            size="sm"
            variant="edit"
            onClick={() => setEditingCourse(course)}
            tooltip="Edit Course Details"
            ariaLabel={`Edit course ${course.title}`}
          />

          <ActionButton
            icon={BookOpen}
            size="sm"
            variant="outline-blue"
            onClick={() => setSelectedSyllabusCourseId(course.id)}
            tooltip="View & Manage Syllabus Modules and Topics"
          >
            Syllabus
          </ActionButton>

          {isArchived ? (
            <ActionButton
              icon={RotateCcw}
              size="sm"
              variant="restore-outline"
              onClick={() => handleRestoreCourseClick(course)}
              disabled={isSubmitting}
              tooltip="Restore course to active list"
            >
              Restore
            </ActionButton>
          ) : (
            <IconButton
              icon={enrolledCount > 0 ? Archive : Trash2}
              size="sm"
              variant={enrolledCount > 0 ? "archive" : "delete"}
              onClick={() => handleRequestDeleteOrArchive(course)}
              disabled={isSubmitting}
              tooltip={
                enrolledCount > 0
                  ? "Archive course (enrolled learners exist)"
                  : "Delete course"
              }
              ariaLabel={`${enrolledCount > 0 ? "Archive" : "Delete"} course ${course.title}`}
            />
          )}

          <MoreActionsMenu
            size="sm"
            tooltip="More Course Actions"
            ariaLabel={`More actions for ${course.title}`}
            items={[
              !isArchived && {
                id: "toggle-publish",
                icon: String(course.status || "").toLowerCase() === "published" ? EyeOff : Send,
                label:
                  String(course.status || "").toLowerCase() === "published"
                    ? "Unpublish (Move to Draft)"
                    : "Publish Course",
                tone:
                  String(course.status || "").toLowerCase() === "published"
                    ? "default"
                    : "primary",
                disabled: isSubmitting,
                onClick: () => handleTogglePublishCourse(course)
              },
              {
                id: "open-studio",
                icon: Sparkles,
                label: "Manage in Course Studio",
                tone: "primary",
                onClick: () => handleOpenStudioForCourse(course)
              },
              {
                id: "view-learners",
                icon: Users,
                label: "View Enrolled Learners",
                dividerBefore: true,
                onClick: () => onNavigate && onNavigate("Learners")
              }
            ]}
          />
        </div>
      </div>
    </article>
  );
}
