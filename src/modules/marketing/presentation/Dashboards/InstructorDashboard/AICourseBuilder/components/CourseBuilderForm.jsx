import React from "react";
import { Sparkles, RefreshCw, FolderPlus } from "lucide-react";
import {
  COURSE_CATEGORIES,
  COURSE_LEVELS,
  COURSE_STATUSES
} from "../../MyCourses/validation/courseValidation.js";

export function CourseBuilderForm({
  topic,
  setTopic,
  code,
  setCode,
  status,
  setStatus,
  category,
  setCategory,
  level,
  setLevel,
  price,
  setPrice,
  totalHours,
  setTotalHours,
  targetAudience,
  setTargetAudience,
  description,
  setDescription,
  builderMode,
  isGenerating,
  handleGenerate,
  handleInitializeManual,
  openAddModule,
  generatedSyllabus,
  isEditingExisting
}) {
  return (
    <div className="card builder-input-card">
      <h3 className="section-heading">Course Details & Specifications</h3>

      <div className="form-group">
        <label htmlFor="ai-course-topic">Course Title / Topic *</label>
        <input
          id="ai-course-topic"
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. Full Stack Microservices with Spring Boot & Docker"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="ai-course-code">Course Code *</label>
          <input
            id="ai-course-code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="e.g. MICRO-ARCH"
          />
        </div>

        <div className="form-group">
          <label htmlFor="ai-course-status">Publishing Status</label>
          <select
            id="ai-course-status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {COURSE_STATUSES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
            {isEditingExisting && status === "Archived" && (
              <option value="Archived">Archived</option>
            )}
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="ai-course-category">Domain Category</label>
          <select
            id="ai-course-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {!COURSE_CATEGORIES.includes(category) && (
              <option value={category}>{category}</option>
            )}
            {COURSE_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="ai-course-level">Target Proficiency</label>
          <select
            id="ai-course-level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            {!COURSE_LEVELS.includes(level) && <option value={level}>{level}</option>}
            {COURSE_LEVELS.map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="ai-course-price">Course Fee (INR ₹)</label>
          <input
            id="ai-course-price"
            type="number"
            min={0}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="ai-course-hours">Estimated Hours</label>
          <input
            id="ai-course-hours"
            type="number"
            min={1}
            value={totalHours}
            onChange={(e) => setTotalHours(e.target.value)}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="ai-course-audience">Target Audience</label>
        <input
          id="ai-course-audience"
          type="text"
          value={targetAudience}
          onChange={(e) => setTargetAudience(e.target.value)}
          placeholder="e.g. Senior engineers preparing for cloud architecture certification"
        />
      </div>

      <div className="form-group">
        <label htmlFor="ai-course-description">Course Description</label>
        <textarea
          id="ai-course-description"
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Concise overview of prerequisites, projects, and outcomes..."
        />
      </div>

      {builderMode === "ai" ? (
        <button
          type="button"
          className="btn-generate-ai"
          onClick={handleGenerate}
          disabled={isGenerating || !topic.trim()}
        >
          {isGenerating ? (
            <>
              <RefreshCw size={16} className="spinner" />
              <span>Generating Curriculum with AI...</span>
            </>
          ) : (
            <>
              <Sparkles size={16} />
              <span>
                {generatedSyllabus
                  ? "Regenerate Curriculum with AI"
                  : "Generate Curriculum Outline"}
              </span>
            </>
          )}
        </button>
      ) : (
        <button
          type="button"
          className="btn-generate-ai"
          onClick={generatedSyllabus ? openAddModule : handleInitializeManual}
          disabled={!topic.trim()}
        >
          <FolderPlus size={16} />
          <span>
            {generatedSyllabus ? "Add Module to Manual Course" : "Initialize Course Structure"}
          </span>
        </button>
      )}
    </div>
  );
}
