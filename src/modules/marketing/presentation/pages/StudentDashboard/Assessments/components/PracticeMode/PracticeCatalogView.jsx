import React from "react";
import { ArrowLeft, ArrowRight, HelpCircle, Sparkles } from "lucide-react";
import { renderTopicIcon } from "../TopicExams/TopicExamCard";
import { PRACTICE_QUESTIONS_BY_COURSE } from "../../data/practiceQuestions.data";
import "./PracticeCatalogView.css";

export default function PracticeCatalogView({ exams, onSelectCourse, onBack }) {
  return (
    <div className="topic-exams-page practice-catalog-page">
      <div className="topic-hero-banner practice-hero-banner">
        <div className="topic-hero-text">
          <div className="topic-breadcrumb" onClick={onBack} role="button" tabIndex={0}>
            <span>Assessments</span>
            <span>›</span>
            <span>Practice Mode</span>
          </div>
          <h1 className="topic-hero-title">Practice Test Catalog</h1>
          <p className="topic-hero-subtitle">
            Select any course to begin practicing. 7–8 multiple-choice questions per topic, 4 marks each. No timers, no proctoring, no exit restrictions.
          </p>
        </div>
      </div>

      <div className="practice-back-wrapper">
        <button
          type="button"
          onClick={onBack}
          className="practice-back-choice-btn"
        >
          <ArrowLeft size={16} />
          <span>Back to Assessment Choice</span>
        </button>
      </div>

      <div className="topic-cards-list">
        {exams.map((course) => {
          const coursePracticeQuestions = PRACTICE_QUESTIONS_BY_COURSE[course.id] || [];
          return (
            <div
              key={course.id}
              className="topic-exam-card practice-topic-card"
            >
              <div className="topic-card-icon-box" style={{ backgroundColor: course.iconBg }}>
                {renderTopicIcon(course.id)}
              </div>

              <div className="topic-card-info">
                <div className="topic-card-title-row">
                  <h3 className="topic-card-name">{course.title}</h3>
                  <span className="topic-exams-count-pill practice-count-pill">
                    Practice Test
                  </span>
                </div>

                <p className="topic-card-desc">{course.description}</p>

                <div className="topic-card-meta-row">
                  <span className="topic-meta-chip">
                    <HelpCircle size={13} color="#2563eb" />
                    <span>{coursePracticeQuestions.length || 8} Questions</span>
                  </span>
                  <span className="topic-meta-chip">
                    <Sparkles size={13} color="#16a34a" />
                    <span>4 Marks / Question</span>
                  </span>
                  <span className="topic-meta-chip">
                    <span className="diff-dot dot-easy" />
                    <span>Practice Mode (Unrestricted)</span>
                  </span>
                </div>
              </div>

              <div className="topic-card-action-col">
                <button
                  type="button"
                  className="btn-topic-view-exams practice-start-btn"
                  onClick={() => onSelectCourse(course)}
                >
                  <span>Start Practice</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
