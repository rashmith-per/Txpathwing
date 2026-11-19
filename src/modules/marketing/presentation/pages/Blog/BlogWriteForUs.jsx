import React, { useState } from "react";
import { ArrowRight, PenTool, Users, Star } from "lucide-react";
import { BlogContributorAnimation } from "./components/BlogContributorAnimation";
import { BlogContributorModal } from "./components/BlogContributorModal";
import "./BlogWriteForUs.css";

const initialForm = {
  name: "",
  email: "",
  role: "Student",
  category: "Career Guidance & Roadmaps",
  pitch: "",
};

const BlogWriteForUs = () => {
  const [showContributorModal, setShowContributorModal] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim() && formData.email.trim()) {
      setIsSubmitted(true);
    }
  };

  const closeModal = () => {
    setShowContributorModal(false);
    setIsSubmitted(false);
    setFormData(initialForm);
  };

  return (
    <section className="write-section">
      <div className="write-container">
        <div className="write-card">
          <div className="write-glow write-glow-one" />
          <div className="write-glow write-glow-two" />

          <div className="write-content">
            <h2 className="write-title">
              Your Experience
              <br />
              <span>Can Inspire Someone.</span>
            </h2>

            <p className="write-description">
              Have a project, career lesson, technical insight, or learning
              experience worth sharing? Turn your knowledge into something
              useful for the next generation of learners.
            </p>

            <div className="write-benefits">
              <div className="write-benefit">
                <div className="benefit-icon benefit-blue">
                  <PenTool size={17} />
                </div>
                <div>
                  <h4>Share What You Know</h4>
                  <p>
                    Tutorials, projects, career lessons and practical insights.
                  </p>
                </div>
              </div>

              <div className="write-benefit">
                <div className="benefit-icon benefit-purple">
                  <Users size={17} />
                </div>
                <div>
                  <h4>Reach Learners</h4>
                  <p>
                    Put your ideas in front of students and technology enthusiasts.
                  </p>
                </div>
              </div>

              <div className="write-benefit">
                <div className="benefit-icon benefit-green">
                  <Star size={17} />
                </div>
                <div>
                  <h4>Build Your Presence</h4>
                  <p>
                    Showcase your knowledge and strengthen your professional profile.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="write-button"
              onClick={() => setShowContributorModal(true)}
            >
              <span>Become a Contributor</span>
              <ArrowRight size={17} />
            </button>
          </div>

          <BlogContributorAnimation />
        </div>
      </div>

      {showContributorModal && (
        <BlogContributorModal
          formData={formData}
          setFormData={setFormData}
          isSubmitted={isSubmitted}
          handleSubmit={handleSubmit}
          closeModal={closeModal}
        />
      )}
    </section>
  );
};

export default BlogWriteForUs;
