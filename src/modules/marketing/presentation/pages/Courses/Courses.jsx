import React from "react";
import "./Courses.css";
import { Route , Routes } from "react-router-dom";
import { programs, categories } from "./coursesData";
import Marketplace from "../MarketPlace/MarketPlace";
import CourseDetail from "../CourseDetails/CourseDetails";
import { Link } from "react-router-dom";


function CourseCard({ program }) {
  return (
    <div className="course-card">
      <div className="course-icon">
        <img
          src={program.icon}
          alt={`${program.name} logo`}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.style.display = "none";
            event.currentTarget.parentElement.classList.add("icon-fallback");
          }}
        />
      </div>

      <div className="course-card-content">
        <h3>{program.name}</h3>
        <p>
          {program.courses} <span>•</span> {program.level}
        </p>
      </div>
    </div>
  );
}


function CategoryRow({ category }) {
  const categoryPrograms = programs.filter(
    (program) => program.category === category.name
  );

  const groups = Array(3).fill(categoryPrograms);

  return (
    <div className={`category-row ${category.className}`}>
      <div className="marquee-wrapper">
        <div className={`marquee-track ${category.direction}`}>
          {groups.map((group, groupIndex) => (
            <div className="marquee-group" key={groupIndex}>
              {group.map((program) => (
                <CourseCard
                  key={`${groupIndex}-${program.name}`}
                  program={program}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


export default function Courses() {
  return (
    <section className="courses-section">
      <div className="courses-container">

        <div className="courses-header">
          <div className="courses-heading">
            <h1>Build the next version of you</h1>
            <p>
              Industry-aligned programs. Practical learning. Real career
              outcomes.
            </p>
          </div>

          {/* COURSE DISCOVERY */}

          <div className="courses-illustration">
            <span className="discovery-dot discovery-dot-one" />
            <span className="discovery-dot discovery-dot-two" />

            {/* COURSE ILLUSTRATION */}

            <div className="course-visual">
              <svg
                className="course-illustration-svg"
                viewBox="0 0 190 125"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                {/* LAPTOP */}

                <rect x="12" y="30" width="102" height="65" rx="7" fill="#FFFFFF" stroke="#AAA4DF" strokeWidth="2" />
                <rect x="21" y="39" width="84" height="47" rx="4" fill="#F5F4FD" />

                {/* COURSE CONTENT */}

                <rect x="29" y="47" width="29" height="5" rx="2.5" fill="#8B82D9" />
                <rect x="29" y="57" width="44" height="4" rx="2" fill="#D3D0EF" />
                <rect x="29" y="66" width="35" height="4" rx="2" fill="#D3D0EF" />

                {/* PROGRESS BLOCKS */}

                <rect x="29" y="76" width="12" height="5" rx="2" fill="#AAA4DF" />
                <rect x="45" y="76" width="12" height="5" rx="2" fill="#C9C5EA" />
                <rect x="61" y="76" width="12" height="5" rx="2" fill="#DDD9F3" />

                {/* LAPTOP BASE */}

                <path d="M5 96H121L112 102H14L5 96Z" fill="#A8A2DD" />
                <rect x="48" y="98" width="31" height="2.5" rx="1.25" fill="#DCD9F3" />

                {/* BOOKS */}

                <rect x="47" y="88" width="91" height="15" rx="4" fill="#C3BEEA" />
                <rect x="47" y="88" width="27" height="3" rx="1.5" fill="#AAA4DF" />

                <rect x="42" y="78" width="96" height="15" rx="4" fill="#E6E4F8" />
                <rect x="42" y="78" width="31" height="3" rx="1.5" fill="#D0CCEE" />

                {/* GRADUATION CAP */}

                <path d="M51 45L89 29L127 45L89 60L51 45Z" fill="#57528E" />
                <path d="M66 49V59C66 66 75 70 89 70C103 70 112 66 112 59V49L89 58L66 49Z" fill="#6862A4" />

                {/* TASSEL */}

                <path d="M127 45V68" stroke="#C79B3C" strokeWidth="2" />
                <circle cx="127" cy="71" r="4" fill="#C79B3C" />

                {/* PLANT */}

                <path d="M14 88C9 78 12 67 20 61" stroke="#6E9D7C" strokeWidth="2" strokeLinecap="round" />
                <path d="M17 72C9 68 4 70 2 76C8 77 13 76 17 72Z" fill="#7FA98A" />
                <path d="M18 65C18 58 22 53 28 52C29 59 25 64 18 65Z" fill="#8DB596" />
                <path d="M15 80C20 73 27 73 32 77C28 82 22 83 15 80Z" fill="#759F83" />
                <path d="M9 88H28L25 99H12L9 88Z" fill="#D5D7EA" />

                {/* DECORATIVE STAR */}

                <path d="M145 20L147 25L152 27L147 29L145 34L143 29L138 27L143 25L145 20Z" fill="#8176DF" opacity="0.75" />
              </svg>
            </div>

            {/* DISCOVERY CONTENT */}

            <div className="courses-discovery">
              <h3>
                Explore
                <br />
                your potential
              </h3>

              <Link to="/marketplace" className="view-button">View All Courses</Link>
            </div>
          </div>
        </div>

        <div className="courses-categories">
          {categories.map((category) => (
            <CategoryRow key={category.name} category={category} />
          ))}
        </div>

      </div>
    </section>
  );
}