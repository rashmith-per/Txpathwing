import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MarketPlace.css";
import MarketHeroSec from "./MarketHeroSec";
import { courses } from "./coursesList";


export default function Marketplace({ onSelectCourse }) {
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState("All");
  const [activeLevel, setActiveLevel] = useState("All levels");
  const [activePrice, setActivePrice] = useState("All");

  const filtered = useMemo(() => {
    return courses.filter((course) => {
      if (
        activeCategory !== "All" &&
        course.category !== activeCategory
      ) {
        return false;
      }

      if (
        activeLevel !== "All levels" &&
        course.level !== activeLevel
      ) {
        return false;
      }

      if (
        activePrice === "Free" &&
        course.price !== "₹0"
      ) {
        return false;
      }

      if (
        activePrice === "Paid" &&
        course.price === "₹0"
      ) {
        return false;
      }

      return true;
    });
  }, [activeCategory, activeLevel, activePrice]);

  const handleCourseClick = (course) => {
    if (onSelectCourse) {
      onSelectCourse(course);
    }

    navigate(`/course/${course.id.toLowerCase()}`);
  };

  return (
    <div className="mp-page">
      <div className="mp-container">

        <MarketHeroSec />

        <section className="mp-hero">
          <h1>
            Buy a course, a practice set,
            <br />
            or a whole cohort seat
          </h1>

          <p>
            Instructors publish; Pathwing reviews, hosts under DRM,
            collects payment,
            <br />
            splits revenue and raises the GST invoice.
          </p>
        </section>

        <div className="mp-filters">

          <div className="filter-group">
            {[
              "All",
              "Software Development",
              "Cloud & DevOps",
              "AI & Data",
              "Testing",
              "Career",
            ].map((category) => (
              <button
                key={category}
                className={
                  activeCategory === category
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setActiveCategory(category)
                }
              >
                {category}
              </button>
            ))}
          </div>

          <div className="filter-divider" />

          <div className="filter-group">
            {[
              "All levels",
              "Beginner",
              "Intermediate",
              "Advanced",
            ].map((level) => (
              <button
                key={level}
                className={
                  activeLevel === level
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setActiveLevel(level)
                }
              >
                {level}
              </button>
            ))}
          </div>

          <div className="filter-divider" />

          <div className="filter-group">
            {["All", "Free", "Paid"].map((price) => (
              <button
                key={price}
                className={
                  activePrice === price
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setActivePrice(price)
                }
              >
                {price}
              </button>
            ))}
          </div>

        </div>

        <div className="mp-grid-2">
          {filtered.map((course) => (
            <div
              key={course.id}
              className="course-card-big"
              onClick={() =>
                handleCourseClick(course)
              }
            >
              <div className="card-top">
                <div className="card-top-left">
                  <span className="code-pill">
                    {course.id}
                  </span>

                  <span className="level-pill">
                    {course.level}
                  </span>
                </div>
              </div>

              <h2 className="card-title">
                {course.title}
              </h2>

              <div className="card-instructor">
                <div className="avatar">
                  {course.initials}
                </div>

                <span>
                  {course.instructor}
                </span>
              </div>

              <div className="card-tags">
                <span>
                  🕐 {course.duration}
                </span>

                <span>
                  📖 {course.lessons}
                </span>

                <span>
                  {course.tag1}
                </span>

                <span>
                  {course.tag2}
                </span>
              </div>

              <div className="card-bottom">
                <div className="price">
                  <span className="now">
                    {course.price}
                  </span>

                  {course.oldPrice && (
                    <span className="old">
                      {course.oldPrice}
                    </span>
                  )}
                </div>

                <div className="arrow-btn">
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      handleCourseClick(course);
                    }}
                  >
                    ↗
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mp-footer">
          Showing {filtered.length} of 14 sample courses ·
          full catalogue lists 148.
        </div>

      </div>
    </div>
  );
}