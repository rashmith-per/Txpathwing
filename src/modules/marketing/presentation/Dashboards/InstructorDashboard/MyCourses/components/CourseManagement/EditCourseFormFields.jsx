import React from "react";
import { AlertCircle } from "lucide-react";

export function EditCourseFormFields({
  title, setTitle,
  code, setCode,
  category, setCategory,
  level, setLevel,
  status, setStatus,
  price, setPrice,
  totalHours, setTotalHours,
  targetAudience, setTargetAudience,
  description, setDescription,
  errors,
  clearFieldError,
  isSubmitting,
  courseCategories,
  courseLevels,
  statusChoices,
}) {
  return (
    <>
      <div className="inst-form-grid-2">
        <div className="inst-form-group">
          <label htmlFor="edit-course-title" className="inst-form-label">
            Course Title <span className="inst-required">*</span>
          </label>
          <input
            id="edit-course-title"
            type="text"
            className={`inst-form-input ${errors.title ? "is-invalid" : ""}`}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              clearFieldError("title");
            }}
            disabled={isSubmitting}
            autoFocus
          />
          {errors.title && (
            <span className="inst-form-error" role="alert">
              <AlertCircle size={13} /> {errors.title}
            </span>
          )}
        </div>

        <div className="inst-form-group">
          <label htmlFor="edit-course-code" className="inst-form-label">
            Course Code <span className="inst-required">*</span>
          </label>
          <input
            id="edit-course-code"
            type="text"
            className={`inst-form-input ${errors.code ? "is-invalid" : ""}`}
            value={code}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase());
              clearFieldError("code");
            }}
            disabled={isSubmitting}
          />
          {errors.code && (
            <span className="inst-form-error" role="alert">
              <AlertCircle size={13} /> {errors.code}
            </span>
          )}
        </div>
      </div>

      <div className="inst-form-grid-2">
        <div className="inst-form-group">
          <label htmlFor="edit-course-category" className="inst-form-label">
            Category
          </label>
          <select
            id="edit-course-category"
            className="inst-form-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={isSubmitting}
          >
            {!courseCategories.includes(category) && (
              <option value={category}>{category}</option>
            )}
            {courseCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="inst-form-group">
          <label htmlFor="edit-course-level" className="inst-form-label">
            Proficiency Level
          </label>
          <select
            id="edit-course-level"
            className="inst-form-input"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            disabled={isSubmitting}
          >
            {!courseLevels.includes(level) && <option value={level}>{level}</option>}
            {courseLevels.map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="inst-form-grid-3">
        <div className="inst-form-group">
          <label htmlFor="edit-course-status" className="inst-form-label">
            Status
          </label>
          <select
            id="edit-course-status"
            className="inst-form-input"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            disabled={isSubmitting}
          >
            {statusChoices.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        <div className="inst-form-group">
          <label htmlFor="edit-course-price" className="inst-form-label">
            Enrollment Fee (INR ₹)
          </label>
          <input
            id="edit-course-price"
            type="number"
            min={0}
            className={`inst-form-input ${errors.price ? "is-invalid" : ""}`}
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
              clearFieldError("price");
            }}
            disabled={isSubmitting}
          />
          {errors.price && (
            <span className="inst-form-error" role="alert">
              <AlertCircle size={13} /> {errors.price}
            </span>
          )}
        </div>

        <div className="inst-form-group">
          <label htmlFor="edit-course-hours" className="inst-form-label">
            Estimated Hours
          </label>
          <input
            id="edit-course-hours"
            type="number"
            min={1}
            max={500}
            className={`inst-form-input ${errors.totalHours ? "is-invalid" : ""}`}
            value={totalHours}
            onChange={(e) => {
              setTotalHours(e.target.value);
              clearFieldError("totalHours");
            }}
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="inst-form-group">
        <label htmlFor="edit-course-audience" className="inst-form-label">
          Target Audience
        </label>
        <input
          id="edit-course-audience"
          type="text"
          className="inst-form-input"
          value={targetAudience}
          onChange={(e) => setTargetAudience(e.target.value)}
          disabled={isSubmitting}
        />
      </div>

      <div className="inst-form-group">
        <label htmlFor="edit-course-desc" className="inst-form-label">
          Course Description <span className="inst-required">*</span>
        </label>
        <textarea
          id="edit-course-desc"
          rows={3}
          className={`inst-form-textarea ${errors.description ? "is-invalid" : ""}`}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            clearFieldError("description");
          }}
          disabled={isSubmitting}
        />
        {errors.description && (
          <span className="inst-form-error" role="alert">
            <AlertCircle size={13} /> {errors.description}
          </span>
        )}
      </div>
    </>
  );
}
