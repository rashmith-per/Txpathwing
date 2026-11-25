import { useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Clock3 } from "lucide-react";
import "./GetQuotCourse.css";

const COURSES = [
  ["PY", "Python Full Stack with Gen AI", "Python, Django, React & Gen AI projects.", "6 Months"],
  ["JV", "Java Full Stack with Gen AI", "Core Java, Spring Boot, React & AI tools.", "6 Months"],
  ["ME", "MERN Stack with Gen AI", "MongoDB, Express, React, Node + AI features.", "5 Months"],
  ["DA", "Data Analytics", "Excel, SQL, Power BI & real dashboards.", "4 Months"],
  ["AI", "AI & Machine Learning", "Python, ML models & applied AI projects.", "6 Months"],
  ["QA", "QA Testing", "Manual + automation testing, live test cases.", "3 Months"],
  ["DO", "DevOps & AWS", "Cloud foundations, CI/CD workflows and AWS tools.", "Project based"],
];

export default function GetQuotCourse({ selectedCourse = "", onSelectCourse }) {
  const trackRef = useRef(null);

  const move = (direction) => {
    const track = trackRef.current;
    const card = track?.querySelector(".gq-course-card");
    if (track && card) {
      track.scrollBy({ left: direction * (card.offsetWidth + 20), behavior: "smooth" });
    }
  };

  const select = (name) => {
    onSelectCourse?.(name);
    document.getElementById("gq-enquiry")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="gq-courses" id="gq-courses" aria-labelledby="gq-courses-title">
      <div className="gq-page-container">
        <div className="gq-courses-heading">
          <div className="gq-section-heading gq-section-heading-left">
            <span className="gq-section-eyebrow">FIND YOUR FIT</span>
            <h1 id="gq-courses-title">Explore a course.<br /><span>Picture what’s next.</span></h1>
            <p>Browse practical tech programmes and choose a course for your enquiry.</p>
          </div>
          <div className="gq-carousel-controls">
            <button type="button" onClick={() => move(-1)} aria-label="Previous course"><ChevronLeft /></button>
            <button type="button" onClick={() => move(1)} aria-label="Next course"><ChevronRight /></button>
          </div>
        </div>

        <div className="gq-carousel-window">
          <div className="gq-course-track" ref={trackRef} role="list" aria-label="Available courses">
            {COURSES.map(([code, name, description, duration]) => {
              const selected = selectedCourse === name;
              return (
                <article className={`gq-course-card${selected ? " gq-course-card-selected" : ""}`} key={code} role="listitem">
                  <div className="gq-course-card-top">
                    <span className="gq-course-code">{code}</span><ArrowRight size={19} />
                  </div>
                  <h3>{name}</h3>
                  <p>{description}</p>
                  <div className="gq-course-tags"><span><Clock3 size={13} /> {duration}</span><span>Offline + Online</span></div>
                  <button className="gq-course-select" type="button" onClick={() => select(name)} aria-pressed={selected}>
                    {selected ? "Selected for enquiry" : "Select this course"} <ArrowRight size={15} />
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
