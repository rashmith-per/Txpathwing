import React from "react";
import { MapPin, Briefcase, Clock, ArrowRight, Sparkles } from "lucide-react";
import "./JobCard.css";

const JobCard = ({ job, onViewDetails, onApplyNow }) => {
  return (
    <article className="job-card" aria-labelledby={`job-title-${job.id}`}>
      <div className="job-card-top">
        <div className="job-card-badges">
          <span className="job-badge-department">{job.department}</span>
          {job.employmentType === "Internship" && (
            <span className="job-badge-intern">
              <Sparkles size={12} /> Internship
            </span>
          )}
        </div>
        <span className="job-type-pill">{job.employmentType}</span>
      </div>

      <h3 id={`job-title-${job.id}`} className="job-card-title">
        {job.title}
      </h3>

      <div className="job-card-meta">
        <span className="job-meta-item">
          <MapPin size={14} /> {job.location}
        </span>
        <span className="job-meta-item">
          <Briefcase size={14} /> {job.experience || "Flexible"}
        </span>
      </div>

      <p className="job-card-description">{job.description}</p>

      <div className="job-card-skills">
        {job.skills.slice(0, 4).map((skill) => (
          <span key={skill} className="job-skill-tag">
            {skill}
          </span>
        ))}
        {job.skills.length > 4 && (
          <span className="job-skill-more">+{job.skills.length - 4}</span>
        )}
      </div>

      <div className="job-card-actions">
        <button
          type="button"
          className="job-btn-details"
          onClick={() => onViewDetails(job)}
          aria-label={`View details for ${job.title}`}
        >
          View Details
        </button>
        <button
          type="button"
          className="job-btn-apply"
          onClick={() => onApplyNow(job)}
          aria-label={`Apply now for ${job.title}`}
        >
          <span>Apply</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </article>
  );
};

export default JobCard;
