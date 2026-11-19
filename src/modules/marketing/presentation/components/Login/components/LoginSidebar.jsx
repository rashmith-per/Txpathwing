import React from "react";
import { ShieldCheck } from "lucide-react";

export function LoginSidebar() {
  return (
    <div className="login-left">
      <div className="login-left-content">
        <div className="login-brand">
          <ShieldCheck size={27} />
        </div>

        <span className="login-tagline">
          LEARN
          <span>•</span>
          GROW
          <span>•</span>
          ACHIEVE
        </span>

        <h2>
          Your learning
          <br />
          journey starts here.
        </h2>

        <p>
          Access your courses, track your progress and continue learning from anywhere.
        </p>
      </div>

      <div className="login-stats">
        <div className="stat">
          <strong>10K+</strong>
          <span>Learners</span>
        </div>

        <div className="stats-line" />

        <div className="stat">
          <strong>500+</strong>
          <span>Courses</span>
        </div>

        <div className="stats-line" />

        <div className="stat">
          <strong>24/7</strong>
          <span>Learning</span>
        </div>
      </div>
    </div>
  );
}
