import { useState } from "react";
import { X, Save, AlertCircle, BookOpen } from "lucide-react";
import { ActionButton, IconButton } from "../../../common/ActionButton.jsx";
import {
  COURSE_CATEGORIES,
  COURSE_LEVELS,
  COURSE_STATUSES,
  validateCourseInput
} from "../../validation/courseValidation.js";
import { EditCourseFormFields } from "./EditCourseFormFields.jsx";

function EditCourseModalContent({ course, onClose, onSave, isSubmitting = false }) {
  const [title, setTitle] = useState(() => course.title || "");
  const [code, setCode] = useState(() => course.code || "");
  const [category, setCategory] = useState(() => course.category || COURSE_CATEGORIES[0]);
  const [level, setLevel] = useState(() => course.level || COURSE_LEVELS[1]);
  const [status, setStatus] = useState(() => course.status || "Published");
  const [price, setPrice] = useState(() => course.price ?? 14999);
  const [totalHours, setTotalHours] = useState(
    () => course.totalHours || course.estimatedHours || 40
  );
  const [targetAudience, setTargetAudience] = useState(() => course.targetAudience || "");
  const [description, setDescription] = useState(() => course.description || "");
  const [errors, setErrors] = useState({});

  const statusChoices =
    course.status === "Archived"
      ? [...COURSE_STATUSES, "Archived"]
      : COURSE_STATUSES;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title,
      code: String(code || "").trim().toUpperCase(),
      category,
      level,
      status,
      price: Number(price),
      totalHours: Number(totalHours),
      targetAudience,
      description
    };

    const validation = validateCourseInput(payload);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    try {
      setErrors({});
      await onSave(payload);
    } catch (err) {
      if (err?.fieldErrors) {
        setErrors(err.fieldErrors);
      } else {
        setErrors({ form: err?.message || "Failed to update course details." });
      }
    }
  };

  const clearFieldError = (field) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="inst-topic-modal-backdrop" onClick={onClose}>
      <div
        className="inst-topic-modal-card inst-course-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-course-modal-title"
      >
        <div className="inst-topic-modal-header">
          <div>
            <div className="inst-topic-modal-badge">
              <BookOpen size={11} /> {course.code || "COURSE"} ·{" "}
              {course.generationMode === "ai" ? "AI-Generated Course" : "Manual Course"}
            </div>
            <h3 id="edit-course-modal-title" className="inst-topic-modal-title">
              Edit Course Details
            </h3>
          </div>
          <IconButton
            icon={X}
            size="sm"
            variant="neutral"
            onClick={onClose}
            tooltip="Close"
            ariaLabel="Close edit course dialog"
            disabled={isSubmitting}
          />
        </div>

        <form onSubmit={handleSubmit} className="inst-topic-modal-form" noValidate>
          {errors.form && (
            <div className="inst-syllabus-alert danger" role="alert">
              <AlertCircle size={15} />
              <span>{errors.form}</span>
            </div>
          )}

          <EditCourseFormFields
            title={title} setTitle={setTitle}
            code={code} setCode={setCode}
            category={category} setCategory={setCategory}
            level={level} setLevel={setLevel}
            status={status} setStatus={setStatus}
            price={price} setPrice={setPrice}
            totalHours={totalHours} setTotalHours={setTotalHours}
            targetAudience={targetAudience} setTargetAudience={setTargetAudience}
            description={description} setDescription={setDescription}
            errors={errors}
            clearFieldError={clearFieldError}
            isSubmitting={isSubmitting}
            courseCategories={COURSE_CATEGORIES}
            courseLevels={COURSE_LEVELS}
            statusChoices={statusChoices}
          />

          <div className="inst-topic-modal-actions">
            <ActionButton
              type="button"
              variant="secondary"
              size="md"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </ActionButton>
            <ActionButton
              type="submit"
              variant="primary"
              size="md"
              icon={Save}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving Changes..." : "Save Course Changes"}
            </ActionButton>
          </div>
        </form>
      </div>
    </div>
  );
}

export function EditCourseModal({
  isOpen,
  course,
  onClose,
  onSave,
  isSubmitting = false
}) {
  if (!isOpen || !course) return null;
  return (
    <EditCourseModalContent
      course={course}
      onClose={onClose}
      onSave={onSave}
      isSubmitting={isSubmitting}
    />
  );
}

export default EditCourseModal;
