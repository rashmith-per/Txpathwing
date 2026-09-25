import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./MarketPlace.css";
import MarketHeroSec from "./MarketHeroSec";
import { courses } from "./coursesList";
import Login from "../../components/Login/Login";


export default function Marketplace() {
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState("All");
  const [activeLevel, setActiveLevel] = useState("All levels");
  const [activePrice, setActivePrice] = useState("All");

  // Login popup state
  const [loginOpen, setLoginOpen] = useState(false);
  const [redirectTo, setRedirectTo] = useState("/");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const categoryMap = {
    All: "All",
    "Software Development": "Software Development",
    Testing: "Testing",
    "UI/UX Design": "UI/UX Design",
    DevOps: "Cloud & DevOps",
    "AI/ML": "AI & Data",
    "Data Science": "Data Science",
    "Soft Skills": "Soft Skills",
  };

  const filtered = useMemo(() => {
    const selectedCategory =
      categoryMap[activeCategory] || activeCategory;

    return courses.filter((course) => {
      if (
        selectedCategory !== "All" &&
        course.category !== selectedCategory
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
    const coursePath = `/course/${course.id.toLowerCase()}`;
    setSelectedCourse(coursePath);
    setLoginOpen(true);
  };

  const handleAddToCart = (event, course) => {
    event.stopPropagation();

    try {
      const existingCart = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );

      const cart = Array.isArray(existingCart)
        ? existingCart
        : [];

      const alreadyInCart = cart.some(
        (item) => item.id === course.id
      );

      if (!alreadyInCart) {
        const updatedCart = [...cart, course];

        localStorage.setItem(
          "cart",
          JSON.stringify(updatedCart)
        );

        window.dispatchEvent(
          new Event("cartUpdated")
        );
      }

    } catch (error) {
      localStorage.setItem(
        "cart",
        JSON.stringify([course])
      );

      window.dispatchEvent(
        new Event("cartUpdated")
      );

      navigate("/cart");
    }
  };

  return (
    <div className="mp-page">
      <Login
        isOpen={loginOpen}
        initialView="signup"
        onClose={() => setLoginOpen(false)}
        onLoginSuccess={() => {
          setIsLoggedIn(true);
          setLoginOpen(false);

          if (selectedCourse) {
            navigate(selectedCourse);
          }
        }}
      />

      <div className="mp-container">
        <MarketHeroSec />

        <section className="mp-hero">
          <div className="mp-hero-accent">
            EXPLORE • LEARN • BUILD
          </div>

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

        <div className="marketplace-layout">
          <aside className="mp-sidebar">
            <div className="sidebar-title">
              FILTER CATEGORIES
            </div>

            <div className="category-list">
              {[
                "All",
                "Software Development",
                "Testing",
                "UI/UX Design",
                "DevOps",
                "AI/ML",
                "Data Science",
                "Soft Skills",
              ].map((category) => (
                <button
                  key={category}
                  type="button"
                  className={
                    activeCategory === category
                      ? "category-button active"
                      : "category-button"
                  }
                  onClick={() =>
                    setActiveCategory(category)
                  }
                >
                  {category}
                </button>
              ))}
            </div>
          </aside>

          <main className="mp-course-area">
            <div className="course-results-header">
              <div className="course-results">
                <span className="results-count">
                  {filtered.length}
                </span>

                <span className="results-text">
                  courses available
                </span>
              </div>
            </div>

            <div className="mp-course-grid">
              {filtered.map((course) => (
                <article
                  key={course.id}
                  className="market-course-card"
                  onClick={() =>
                    handleCourseClick(course)
                  }
                >
                  <div className="course-image-wrapper">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="course-image"
                    />
                  </div>

                  <div className="course-card-content">
                    <div className="course-category">
                      {course.category}
                    </div>

                    <h2 className="market-course-title">
                      {course.title}
                    </h2>

                    <div className="course-meta">
                      <span>
                        {course.students ||
                          "1,240 students"}
                      </span>

                      <span className="meta-dot">
                        •
                      </span>

                      <span>
                        {course.lessons}
                      </span>
                    </div>

                    <div className="market-price">
                      <span className="current-price">
                        {course.price}
                      </span>

                      {course.oldPrice &&
                        course.oldPrice !== "₹0" && (
                          <span className="previous-price">
                            {course.oldPrice}
                          </span>
                        )}
                    </div>

                    <div className="course-actions">
                      <button
                        type="button"
                        className="enroll-button"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleCourseClick(course);
                        }}
                      >
                        View Details
                      </button>

                      <button
                        type="button"
                        className="cart-button"
                        aria-label={`Add ${course.title} to cart`}
                        onClick={(event) =>
                          handleAddToCart(
                            event,
                            course
                          )
                        }
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="empty-courses">
                <div className="empty-icon">
                  🔎
                </div>

                <h3>
                  No courses found
                </h3>

                <p>
                  Try changing your category,
                  level or price filter.
                </p>
              </div>
            )}
          </main>
        </div>

        <div className="mp-footer">
          Showing {filtered.length} of 14 sample courses · full
          catalogue lists 148.
        </div>
      </div>
    </div>
  );
}