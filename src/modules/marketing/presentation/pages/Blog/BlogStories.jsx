import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import "./BlogStories.css";

const stories = [
  {
    id: 1,
    name: "Nagaraju K.",
    role: "Full Stack Developer",
    initials: "NK",
    quote:
      "TX-Path-Wing helped me gain practical skills and confidence. The training and guidance were exactly what I needed.",
  },
  {
    id: 2,
    name: "Vishnu B.",
    role: "Software Developer",
    initials: "VB",
    quote:
      "The internship program gave me real industry exposure and helped me get placed in a great company.",
  },
  {
    id: 3,
    name: "Abhilash Reddy",
    role: "Cloud Solutions Engineer",
    initials: "AR",
    quote:
      "Hands-on practice in cloud virtual labs and mentor reviews gave me the exact skills tech recruiters were evaluating.",
  },
  {
    id: 4,
    name: "Vasavi",
    role: "B.Tech Student",
    initials: "VS",
    quote:
      "The mentors are very supportive and the learning experience is amazing. I highly recommend TX-Path-Wing to every student.",
  },
  {
    id: 5,
    name: "Hima Teja",
    role: "Data Science Trainee",
    initials: "HT",
    quote:
      "Working on live projects alongside industry mentors helped me bridge the gap between college theory and real tech jobs.",
  },
  {
    id: 6,
    name: "Srinu",
    role: "Associate Software Engineer",
    initials: "SR",
    quote:
      "Structured learning pathways and prompt code reviews made all the difference in cracking my tech placement.",
  },
];

const BlogStories = () => {
  const [startIndex, setStartIndex] = useState(0);

  const handlePrevious = () => {
    setStartIndex((current) =>
      current === 0 ? stories.length - 3 : current - 1
    );
  };

  const handleNext = () => {
    setStartIndex((current) =>
      current >= stories.length - 3 ? 0 : current + 1
    );
  };

  const visibleStories = stories.slice(startIndex, startIndex + 3);

  return (
    <section className="stories-section">
      <div className="stories-container">

        {/* Section heading */}
        <div className="stories-heading">

          <div className="heading-copy">
            <div className="section-label">
             
            </div>

            <h2>
              Stories That
              <span> Inspire.</span>
            </h2>

            <p>
              Real experiences from students, educators, and technology
              professionals growing with TX-Path-Wing.
            </p>
          </div>

          <div className="stories-controls">
            <button
              type="button"
              onClick={handlePrevious}
              className="story-control"
              aria-label="Previous stories"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="story-control"
              aria-label="Next stories"
            >
              <ChevronRight size={18} />
            </button>
          </div>

        </div>

        {/* Story cards */}
        <div className="stories-list">
          {visibleStories.map((story) => (
            <article key={story.id} className="story-card">

              <div className="story-top">
                <div className="quote-mark">
                  <Quote size={22} />
                </div>

                <div className="story-avatar">
                  {story.initials}
                </div>
              </div>

              <p className="story-message">
                “{story.quote}”
              </p>

              <div className="story-footer">
                <div className="story-person">
                  <h3>{story.name}</h3>
                  <span>{story.role}</span>
                </div>

                <div className="story-line" />
              </div>

            </article>
          ))}
        </div>

        {/* Slider indicator */}
        <div className="stories-indicator">
          {stories.slice(0, stories.length - 2).map((_, index) => (
            <span
              key={index}
              className={`indicator-dot ${
                index === startIndex ? "active" : ""
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default BlogStories;
