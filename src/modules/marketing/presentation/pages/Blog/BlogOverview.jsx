import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { OFFERING_CARDS, STATS_ITEMS } from "./blogOverviewData";
import { BlogAboutModal } from "./components/BlogAboutModal";
import { BlogOfferingsModal } from "./components/BlogOfferingsModal";
import "./BlogOverview.css";

const BlogOverview = () => {
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showOfferingsModal, setShowOfferingsModal] = useState(false);

  return (
    <section className="tx-overview-section">
      <div className="tx-overview-container">
        <div className="tx-offerings-wrap">
          <div className="tx-offerings-header">
            <div>
              <div className="tx-section-tagline" />
              <h2 className="tx-offerings-title">Explore What You Can Do</h2>
              <p className="tx-offerings-subtitle">
                Everything you need to learn, grow, and get industry ready — in one place.
              </p>
            </div>

            <button
              type="button"
              className="tx-view-all-btn"
              onClick={() => setShowOfferingsModal(true)}
            >
              <span>View All</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="tx-offerings-grid">
            {OFFERING_CARDS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className={`tx-offering-card ${item.theme}`}
                  onClick={() => setShowOfferingsModal(true)}
                >
                  <div className="tx-offering-icon-wrap">
                    <Icon size={22} className="tx-offering-icon" />
                  </div>
                  <h4 className="tx-offering-name">{item.title}</h4>
                  <p className="tx-offering-text">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="tx-stats-banner">
          {STATS_ITEMS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="tx-stat-item">
                <div className="tx-stat-icon-wrap">
                  <Icon size={22} className="tx-stat-icon" />
                </div>
                <div className="tx-stat-text-wrap">
                  <span className="tx-stat-value">{stat.value}</span>
                  <span className="tx-stat-label">{stat.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showAboutModal && (
        <BlogAboutModal onClose={() => setShowAboutModal(false)} />
      )}

      {showOfferingsModal && (
        <BlogOfferingsModal onClose={() => setShowOfferingsModal(false)} />
      )}
    </section>
  );
};

export default BlogOverview;
