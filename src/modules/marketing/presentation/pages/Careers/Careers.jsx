import React, { useState, useEffect, useRef } from 'react';
import './CareersHero.css';

import ctaImage from '../../../../../assets/cta_image.png';

const courseIcons = [
  ['Python', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'],
  ['AI', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg'],
  ['Web', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg'],
  ['Java', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg'],
  ['React', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'],
  ['Cloud', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg'],
];

const slides = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80',
    alt: 'Team collaboration',
    label: 'Learn Together',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    alt: 'Students learning together',
    label: 'Build Skills',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80',
    alt: 'Professionals planning a project',
    label: 'Practice with Purpose',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    alt: 'Career team meeting',
    label: 'Grow Your Career',
  },
];

const benefits = [
  ['01', 'Industry-ready skills', 'Learn the tools and workflows modern teams use every day.', '🎓'],
  ['02', 'Hands-on projects', 'Turn every lesson into practical work you can show employers.', '💻'],
  ['03', 'Guided support', 'Get clear direction, feedback, and confidence as you grow.', '🧭'],
  ['04', 'Career momentum', 'Build a profile that makes your next opportunity easier to reach.', '🚀'],
];

const journey = [
  ['Learn', 'Follow focused lessons designed around real career paths.', '01', '📘'],
  ['Practice', 'Apply your knowledge through practical assignments and projects.', '02', '🛠️'],
  ['Prove', 'Earn certifications and build a portfolio that shows your ability.', '03', '🏅'],
  ['Grow', 'Use your new profile and skills to move toward better opportunities.', '04', '🚀'],
];

const stories = [
  ['AS', 'Aarav Sharma', 'Frontend Developer', 'The projects helped me turn theory into a portfolio I could confidently share.'],
  ['MN', 'Meera Nair', 'UI/UX Designer', 'The structure made learning feel clear, practical, and achievable.'],
  ['RV', 'Rohit Verma', 'Full Stack Trainee', 'I gained the confidence to work independently on real-world tasks.'],
];

export default function CareersHero() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  // Auto rotate slides one by one on right side
  useEffect(() => {
    if (isPaused) return;

    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 3500);

    return () => clearInterval(intervalRef.current);
  }, [isPaused, active]);

  const goTo = (index) => setActive(index);
  const next = () => setActive((p) => (p + 1) % slides.length);
  const prev = () => setActive((p) => (p - 1 + slides.length) % slides.length);

  return (
    <div className="page">
      <section className="hero">
        {/* Left Content */}
        <div className="hero__left">
          <div className="hero__badge">
            <span className="hero__badge-dot"></span>
            Careers at Tanvox
          </div>

          <h1 className="hero__title">
            Build Your Career.
            <br />
            <span>Create a Better Tomorrow.</span>
          </h1>

          <p className="hero__sub">
            Learn industry-relevant skills, build real-world projects, earn
            certification and prepare yourself for the future.
          </p>

          <div className="hero__actions">
            <button className="btn btn--primary">Explore Courses →</button>
            <button className="btn btn--outline">Build Your Profile</button>
          </div>

          <div className="impact">
            <div className="impact__item">
              <div className="impact__value">10K+</div>
              <div className="impact__label">Learners</div>
            </div>
            <div className="impact__item">
              <div className="impact__value">50+</div>
              <div className="impact__label">Courses</div>
            </div>
            <div className="impact__item">
              <div className="impact__value">500+</div>
              <div className="impact__label">Projects</div>
            </div>
            <div className="impact__item">
              <div className="impact__value">95%</div>
              <div className="impact__label">Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Right - Images show one by one */}
        <div className="hero__right">
          <div
            className={`hero__slider ${isPaused ? 'is-paused' : ''}`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`slide ${active === index ? 'slide--active' : ''}`}
              >
                <img src={slide.src} alt={slide.alt} />
                <div className="slide__top-badge">
                  <span className="slide__dot-live"></span>
                  <span className="slide__label">{slide.label}</span>
                </div>
              </div>
            ))}

            {/* Dots */}
            <div className="dots">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${active === index ? 'dot--active' : ''}`}
                  onClick={() => goTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <button className="arrow arrow--left" onClick={prev} aria-label="Previous">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button className="arrow arrow--right" onClick={next} aria-label="Next">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <section className="career-section career-section--light">
        <div className="section-heading">
          <span>WHY CHOOSE TANVOX</span>
          <h2>A better way to build your career</h2>
          <p>Everything you need to move from learning to doing with confidence.</p>
        </div>
        <div className="benefit-grid">
          {benefits.map(([number, title, text, icon]) => (
            <article className="benefit-card" key={title}>
              <div className="benefit-card__top">
                <div className="benefit-card__icon">{icon}</div>
                <small>{number}</small>
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="career-outcomes">
        <div className="career-outcomes__intro">
          <span className="career-outcomes__badge">✓&nbsp; Learn · Build · Grow</span>
          <h2>Where a completed course<br /><span>becomes a shortlist</span></h2>
          <p>Complete and assessment-based courses and short and skill-based pathways. Employers filter on the things that was actually measured.</p>
        </div>

        <div className="career-outcomes__cards">
          <article className="outcome-card">
            <div className="outcome-card__icon outcome-card__icon--blue">◎</div>
            <div><span>CAREER PREP</span><h3>Career profile &amp; resume builder</h3><p>Build a profile, create a resume, and get personalized recommendations. Showcase your skills, projects and experience - all in one place. Be ready for what's next.</p></div>
          </article>
          <article className="outcome-card">
            <div className="outcome-card__icon outcome-card__icon--green">▤</div>
            <div><span>SKILL TRACK</span><h3>Skill on job &amp; file scoring</h3><p>Get scored on real-world skills and job-relevant tasks. See where you stand, track your progress, and improve with guided practice and feedback.</p></div>
          </article>
          <article className="outcome-card">
            <div className="outcome-card__icon outcome-card__icon--purple">⌁</div>
            <div><span>INTERNSHIP &amp; JOB</span><h3>Hiring dashboard &amp; drives</h3><p>Real-time job and internship drives, matched to your skills and interest. Get noticed by top employers, and access exclusive opportunities - all in one place.</p></div>
          </article>
        </div>
      </section>

      <section className="career-section journey-section">
        <div className="section-heading section-heading--left">
          <span>YOUR LEARNING JOURNEY</span>
          <h2>From first lesson to next <span>opportunity</span></h2>
          <p>A simple, practical path designed to keep your progress moving forward.</p>
        </div>
        <div className="journey-marquee">
          <div className="journey-grid">
            {[...journey, ...journey].map(([title, text, number, icon], index) => (
              <article className="journey-card" key={`${title}-${index}`}>
                <div className="journey-card__icon">{icon}</div>
                <small>{number}</small>
                <h3>{title}</h3>
                <p>{text}</p>
                <span className="journey-card__arrow">↗</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="profile-banner">
        <div>
          <span>BUILD YOUR LEARNING PROFILE</span>
          <h2>Make your progress visible.</h2>
          <p>Bring your skills, projects, certifications, and ambition into one professional profile.</p>
          <button className="btn btn--primary">Build Your Profile →</button>
        </div>
        <div className="profile-preview">
          <div className="profile-preview__header"><span className="profile-avatar">TN</span><div><strong>Your Name</strong><small>Aspiring Developer</small></div><b>80%</b></div>
          <div className="profile-progress"><i /></div>
          <div className="profile-tags"><span>React</span><span>Projects</span><span>Certification</span></div>
          <p>Your next opportunity starts with a profile that tells your story.</p>
        </div>
      </section>

      <section className="career-section career-section--stories">
        <div className="section-heading">
          <span>SUCCESS STORIES</span>
          <h2>Real growth. Real confidence.</h2>
          <p>See how learners are turning focused practice into career momentum.</p>
        </div>
        <div className="stories-grid">
          {stories.map(([initials, name, role, quote]) => (
            <article className="story-card" key={name}>
              <div className="story-card__person"><span>{initials}</span><div><strong>{name}</strong><small>{role}</small></div></div>
              <div className="story-card__stars">★★★★★</div>
              <p>“{quote}”</p>
            </article>
          ))}
        </div>
      </section>

      <section className="career-cta">
        <div className="career-cta__copy">
          <span className="career-cta__eyebrow">YOUR FUTURE STARTS HERE</span>
          <h2>Your Career Starts Here.</h2>
          <p>Start learning today and build the skills, certification and confidence for your future.</p>
          <button className="career-cta__button">Start Learning <b>→</b></button>
        </div>
        <div className="career-cta__art">
          <div className="career-cta__course-orbit" aria-label="Tanvox course paths">
            {courseIcons.map(([name, image], index) => (
              <span className={`career-cta__course-icon career-cta__course-icon--${index + 1}`} key={name}>
                <img src={image} alt={name} />
              </span>
            ))}
          </div>
          <img src={ctaImage} alt="Student learning on a laptop" />
        </div>
      </section>
    </div>
  );
}