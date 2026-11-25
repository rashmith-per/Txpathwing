import { GraduationCap, Briefcase, CheckCircle2, ArrowRight } from 'lucide-react';
import './GetQuotIntro.css';
 
const TRAINING_POINTS = [
  'Industry-relevant technical training tailored to market demand.',
  'Practical, hands-on learning with step-by-step mentor support.',
  'Expert guidance and 1-on-1 code reviews from senior engineers.',
  'Skill development through real-time portfolio projects.',
];
 
const INTERNSHIP_POINTS = [
  'Real-world project experience simulating production workflows.',
  'Opportunities to apply technical knowledge to live problems.',
  'Professional development, sprint reviews, and agile teamwork.',
  'Career readiness, mock interviews, and practical industry exposure.',
];
 
/**
 * Training and Internship Introduction Section component.
 * Appears immediately after the Hero to introduce learning and career development tracks.
 */
export const GetQuotIntro = () => {
  const handleScrollTo = (targetId, focusId) => (e) => {
    e.preventDefault();
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
      if (focusId) {
        const focusEl = document.getElementById(focusId);
        if (focusEl) {
          focusEl.focus({ preventScroll: true });
        }
      }
    }
  };
 
  return (
    <section
      id="training-internship"
      className="training-intro-section"
      aria-labelledby="training-intro-heading"
    >
      <div className="page-container">
        {/* Section Header */}
        <div className="training-intro__header">
          <div className="training-intro__badge">
            <span className="training-intro__badge-dot" aria-hidden="true" />
            <span>Structured Career Pathways</span>
          </div>
          <h2 id="training-intro-heading" className="training-intro__title">
            Learn. Practice. Grow. <span className="training-intro__title-gradient">Build Your Career.</span>
          </h2>
          <p className="training-intro__subtitle">
            Explore industry-focused training programs and internship opportunities designed to help
            students and aspiring professionals develop practical skills, gain real-world experience,
            and prepare for successful careers.
          </p>
        </div>
 
        {/* Two-Column Feature Cards */}
        <div className="training-intro__grid">
          {/* Card 1: Training Programs */}
          <div className="training-card training-card--training">
            <div className="training-card__top">
              <div className="training-card__icon-wrapper" aria-hidden="true">
                <GraduationCap className="training-card__icon" size={28} />
              </div>
              <div className="training-card__meta">
                <span className="training-card__tag">Curriculum & Mentorship</span>
                <h3 className="training-card__heading">Training Programs</h3>
              </div>
            </div>
 
            <p className="training-card__summary">
              Master modern programming languages, frameworks, cloud platforms, and generative AI
              with structured courses designed by tech practitioners.
            </p>
 
            <ul className="training-card__list" aria-label="Training program benefits">
              {TRAINING_POINTS.map((point) => (
                <li key={point} className="training-card__list-item">
                  <CheckCircle2 className="training-card__check" size={18} aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
 
            <div className="training-card__action">
              <a
                href="#gq-courses"
                className="training-card__btn training-card__btn--primary"
                onClick={handleScrollTo('gq-courses', 'gq-courses-title')}
              >
                <span>Explore Training Programs</span>
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
 
          {/* Card 2: Internship Programs */}
          <div className="training-card training-card--internship">
            <div className="training-card__top">
              <div className="training-card__icon-wrapper" aria-hidden="true">
                <Briefcase className="training-card__icon" size={28} />
              </div>
              <div className="training-card__meta">
                <span className="training-card__tag">Hands-on Experience</span>
                <h3 className="training-card__heading">Internship Programs</h3>
              </div>
            </div>
 
            <p className="training-card__summary">
              Bridge the gap between academic theory and tech industry expectations by building
              verified portfolio projects in collaborative team sprints.
            </p>
 
            <ul className="training-card__list" aria-label="Internship program benefits">
              {INTERNSHIP_POINTS.map((point) => (
                <li key={point} className="training-card__list-item">
                  <CheckCircle2 className="training-card__check" size={18} aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
 
            <div className="training-card__action">
              <a
                href="#gq-enquiry"
                className="training-card__btn training-card__btn--secondary"
                onClick={handleScrollTo('gq-enquiry', 'full_name')}
              >
                <span>Explore Internship Opportunities</span>
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};