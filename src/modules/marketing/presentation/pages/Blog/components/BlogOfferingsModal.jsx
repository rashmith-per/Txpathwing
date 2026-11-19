import React from "react";
import { ArrowRight, X } from "lucide-react";
import { OFFERING_CARDS } from "../blogOverviewData";

export function BlogOfferingsModal({ onClose }) {
  return (
    <div className="tx-modal-backdrop" onClick={onClose}>
      <div className="tx-overview-modal" onClick={(e) => e.stopPropagation()}>
        <div className="tx-overview-modal-head">
          <div>
            <div className="tx-section-tagline">
              <span className="tx-tagline-bar" />
              <span className="tx-tagline-label">OUR OFFERINGS</span>
            </div>
            <h2 className="tx-modal-headline">Explore What You Can Do</h2>
            <p className="tx-modal-subheadline">
              Everything you need to learn, build, and become industry ready in one place.
            </p>
          </div>
          <button
            type="button"
            className="tx-modal-close-btn"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <div className="tx-overview-modal-body">
          <div className="tx-modal-offerings-grid">
            {OFFERING_CARDS.map((offering) => {
              const Icon = offering.icon;
              return (
                <div
                  key={offering.id}
                  className={`tx-modal-offering-card ${offering.theme}`}
                >
                  <div className="tx-modal-offering-top">
                    <div className="tx-offering-icon-wrap">
                      <Icon size={22} className="tx-offering-icon" />
                    </div>
                    <span className="tx-modal-offering-tag">Active Program</span>
                  </div>
                  <h4 className="tx-modal-offering-title">{offering.title}</h4>
                  <p className="tx-modal-offering-desc">{offering.desc}</p>
                  <p className="tx-modal-offering-details">{offering.details}</p>
                </div>
              );
            })}
          </div>

          <div className="tx-modal-cta-box">
            <div>
              <h4>Start Your Practical Learning Pathway</h4>
              <p>Step through our structured Learn, Practice, Build & Certify roadmap.</p>
            </div>
            <div className="tx-modal-btn-row">
              <a href="/learner-journey" className="tx-modal-primary-btn">
                <span>Go to Programs</span>
                <ArrowRight size={15} />
              </a>
              <button
                type="button"
                className="tx-modal-secondary-btn"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
