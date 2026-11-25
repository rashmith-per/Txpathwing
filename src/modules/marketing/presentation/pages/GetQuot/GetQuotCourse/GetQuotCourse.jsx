import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Clock3, Pause, Play } from "lucide-react";
import "./GetQuotCourse.css";

const MARQUEE_SECONDS = 55;

const COURSES = [
  ["PY", "Python Full Stack with Gen AI", "Python, Django, React & Gen AI projects.", "6 Months"],
  ["JV", "Java Full Stack with Gen AI", "Core Java, Spring Boot, React & AI tools.", "6 Months"],
  ["ME", "MERN Stack with Gen AI", "MongoDB, Express, React, Node + AI features.", "5 Months"],
  ["DA", "Data Analytics", "Excel, SQL, Power BI & real dashboards.", "4 Months"],
  ["AI", "AI & Machine Learning", "Python, ML models & applied AI projects.", "6 Months"],
  ["QA", "QA Testing", "Manual + automation testing, live test cases.", "3 Months"],
  ["DO", "DevOps & AWS", "Cloud foundations, CI/CD workflows and AWS tools.", "Project based"],
];

function getTranslateOffset(element) {
  const transform = getComputedStyle(element).transform;
  if (!transform || transform === "none") return 0;
  return Math.abs(new DOMMatrix(transform).m41);
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function GetQuotCourse({ selectedCourse = "", onSelectCourse }) {
  const trackRef = useRef(null);
  const touchStartXRef = useRef(null);
  const manualOffsetRef = useRef(0);
  const pendingStepRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isManual, setIsManual] = useState(false);
  const [marqueeDelay, setMarqueeDelay] = useState("0s");

  const applyManualStep = useCallback((track, baseOffset, direction, step, needsSnap) => {
    const halfWidth = track.scrollWidth / 2;
    const transitionValue = prefersReducedMotion()
      ? "none"
      : "transform 0.42s cubic-bezier(0.22, 1, 0.36, 1)";

    let start = baseOffset;
    let wrapped = needsSnap;

    if (direction < 0 && start < step && halfWidth > 0) {
      start += halfWidth;
      wrapped = true;
    } else if (direction > 0 && halfWidth > 0 && start >= halfWidth) {
      start -= halfWidth;
      wrapped = true;
    }

    const target = Math.max(0, start + direction * step);
    manualOffsetRef.current = target;

    if (wrapped) {
      track.style.transition = "none";
      track.style.transform = `translate3d(${-start}px, 0, 0)`;
      void track.offsetWidth;
    }

    track.style.transition = transitionValue;
    track.style.transform = `translate3d(${-target}px, 0, 0)`;
  }, []);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    if (!isManual) {
      track.style.transition = "";
      track.style.transform = "";
      return;
    }

    if (pendingStepRef.current) {
      const { baseOffset, direction, step } = pendingStepRef.current;
      pendingStepRef.current = null;
      applyManualStep(track, baseOffset, direction, step, true);
    }
  }, [isManual, applyManualStep]);

  const move = (direction) => {
    const track = trackRef.current;
    const card = track?.querySelector(".gq-course-card");
    if (!track || !card) return;

    const step = card.offsetWidth + 20;

    if (!isManual) {
      pendingStepRef.current = {
        baseOffset: getTranslateOffset(track),
        direction,
        step,
      };
      setIsManual(true);
      setIsPaused(true);
      return;
    }

    applyManualStep(track, manualOffsetRef.current, direction, step, false);
  };

  const togglePlayback = () => {
    if (isManual) {
      const track = trackRef.current;
      const halfWidth = track ? track.scrollWidth / 2 : 0;
      if (track && halfWidth > 0) {
        const currentOffset = getTranslateOffset(track) % halfWidth;
        const delaySeconds = -((currentOffset / halfWidth) * MARQUEE_SECONDS);
        setMarqueeDelay(`${delaySeconds.toFixed(3)}s`);
      } else {
        setMarqueeDelay("0s");
      }
      setIsManual(false);
      setIsPaused(false);
      return;
    }

    setIsPaused((prev) => !prev);
  };

  const handleTouchStart = (event) => {
    touchStartXRef.current = event.changedTouches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event) => {
    if (touchStartXRef.current === null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartXRef.current;
    const deltaX = endX - touchStartXRef.current;
    touchStartXRef.current = null;
    if (Math.abs(deltaX) > 40) {
      move(deltaX < 0 ? 1 : -1);
    }
  };

  const select = (name) => {
    onSelectCourse?.(name);
    document.getElementById("gq-enquiry")?.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  const renderCards = (isClone = false) =>
    COURSES.map(([code, name, description, duration]) => {
      const selected = selectedCourse === name;
      return (
        <article
          className={`gq-course-card${selected ? " gq-course-card-selected" : ""}`}
          key={isClone ? `${code}-clone` : code}
          role={isClone ? undefined : "listitem"}
        >
          <div className="gq-course-card-top">
            <span className="gq-course-code">{code}</span>
            <ArrowRight size={19} aria-hidden="true" />
          </div>
          <h3>{name}</h3>
          <p>{description}</p>
          <div className="gq-course-tags">
            <span>
              <Clock3 size={13} aria-hidden="true" /> {duration}
            </span>
            <span>Offline + Online</span>
          </div>
          <button
            className="gq-course-select"
            type="button"
            tabIndex={isClone ? -1 : undefined}
            onClick={() => select(name)}
            aria-pressed={selected}
          >
            {selected ? "Selected for enquiry" : "Select this course"}{" "}
            <ArrowRight size={15} aria-hidden="true" />
          </button>
        </article>
      );
    });

  return (
    <section className="gq-courses" id="gq-courses" aria-labelledby="gq-courses-title">
      <div className="gq-page-container">
        <div className="gq-courses-heading">
          <div className="gq-section-heading gq-section-heading-left">
            <span className="gq-section-eyebrow">FIND YOUR FIT</span>
            <h2 id="gq-courses-title" tabIndex={-1}>Explore a course.<br />{" "}<span>Picture what’s next.</span></h2>
            <p>Browse practical tech programmes and choose a course for your enquiry.</p>
          </div>
          <div className="gq-carousel-controls">
           
            <button type="button" onClick={() => move(-1)} aria-label="Previous course">
              <ChevronLeft aria-hidden="true" />
            </button>
            <button type="button" onClick={() => move(1)} aria-label="Next course">
              <ChevronRight aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          className="gq-carousel-window"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={`gq-course-track${!isManual ? " is-marquee" : ""}${isPaused ? " is-paused" : ""}`}
            ref={trackRef}
            style={!isManual ? { "--gq-marquee-delay": marqueeDelay } : undefined}
          >
            <div className="gq-course-group" role="list" aria-label="Available courses">
              {renderCards(false)}
            </div>
            <div className="gq-course-group" aria-hidden="true">
              {renderCards(true)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
