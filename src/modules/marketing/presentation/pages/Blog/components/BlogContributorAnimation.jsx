import React, { useState, useEffect } from "react";
import { PenTool, Users, Star, Sparkles, Eye } from "lucide-react";

export const SHOWCASE_DATA = [
  {
    id: 0,
    badge: "SHARE WHAT YOU KNOW",
    badgeColor: "blue",
    title: "Demystifying Full-Stack System Design",
    desc: "Step-by-step breakdown of microservices, caching, and database indexing for production.",
    author: "Alumni Tech Lead",
    metric: "3.4k Reads",
    metricIcon: Eye,
    icon: PenTool,
    accent: "#2563EB"
  },
  {
    id: 1,
    badge: "REACH LEARNERS",
    badgeColor: "purple",
    title: "From Campus to Senior Dev: Placement Lessons",
    desc: "Key technical mindset shifts and interview preparation frameworks that actually work.",
    author: "Senior Software Engineer",
    metric: "15,000+ Impacted",
    metricIcon: Users,
    icon: Users,
    accent: "#7C3AED"
  },
  {
    id: 2,
    badge: "BUILD YOUR PRESENCE",
    badgeColor: "emerald",
    title: "Verified TX Author Spotlight",
    desc: "Elevate your professional profile, share expertise, and connect with top technology employers.",
    author: "Featured Author Badge",
    metric: "Top Contributor ⭐ 4.9",
    metricIcon: Star,
    icon: Star,
    accent: "#059669"
  }
];

export function BlogContributorAnimation() {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % SHOWCASE_DATA.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  const current = SHOWCASE_DATA[activeTab];
  const CurrentIcon = current.icon;
  const MetricIcon = current.metricIcon;

  return (
    <div className="write-visual">
      <div className="showcase-card-wrapper">
        <div className="showcase-card">
          <div className="showcase-card-header">
            <span className={`showcase-tag ${current.badgeColor}`}>
              <Sparkles size={12} />
              {current.badge}
            </span>
          </div>

          <h3 className="showcase-card-title">{current.title}</h3>
          <p className="showcase-card-desc">{current.desc}</p>

          <div className="showcase-card-footer">
            <div className="showcase-author-info">
              <div className="author-avatar-badge">
                <CurrentIcon size={14} style={{ color: current.accent }} />
              </div>
              <span className="author-name">{current.author}</span>
            </div>

            <div className="showcase-metric-pill">
              <MetricIcon size={12} style={{ color: current.accent }} />
              <span>{current.metric}</span>
            </div>
          </div>
        </div>

        <div className="showcase-tabs">
          {SHOWCASE_DATA.map((tab, idx) => (
            <button
              key={tab.id}
              type="button"
              className={`showcase-tab-dot ${idx === activeTab ? "active" : ""}`}
              onClick={() => setActiveTab(idx)}
              aria-label={`Show ${tab.badge}`}
            >
              <span className="tab-progress-fill" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
