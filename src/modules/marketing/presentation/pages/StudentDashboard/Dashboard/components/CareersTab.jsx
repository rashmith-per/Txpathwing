import React from "react";
import { Link } from "react-router-dom";
import { Briefcase } from "lucide-react";

export default function CareersTab() {
  return (
    <div className="careers-container">
      <div className="careers-header">
        <Briefcase size={24} color="#2563eb" />
        <h2 className="careers-title">Career & Placement Tracks</h2>
      </div>
      <p className="careers-desc">
        Connect directly with hiring partners, review job opportunities tailored to your coursework, and prepare for technical interviews.
      </p>
      <div>
        <Link to="/careers" className="careers-explore-btn">
          View Open Positions
        </Link>
      </div>
    </div>
  );
}
