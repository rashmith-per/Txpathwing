import React from "react";
import "./Courses.css";

const programs = [
  // =====================================================
  // SOFTWARE DEVELOPMENT
  // =====================================================

  {
    name: "Java Full Stack",
    courses: "22 courses",
    level: "L1–L3",
    category: "Software Development",
    icon: "https://cdn.simpleicons.org/openjdk",
  },
  {
    name: "Python Full Stack",
    courses: "19 courses",
    level: "L1–L3",
    category: "Software Development",
    icon: "https://cdn.simpleicons.org/python",
  },
  {
    name: ".NET Engineering",
    courses: "12 courses",
    level: "L1–L3",
    category: "Software Development",
    icon: "https://cdn.simpleicons.org/dotnet",
  },
  {
    name: "Web Applications",
    courses: "16 courses",
    level: "L1–L2",
    category: "Software Development",
    icon: "https://cdn.simpleicons.org/react",
  },

  // =====================================================
  // CLOUD PLATFORMS
  // =====================================================

  {
    name: "AWS DevOps",
    courses: "16 courses",
    level: "L2–L3",
    category: "Cloud Platforms",
    icon: "https://cdn.simpleicons.org/amazonaws",
  },
  {
    name: "Azure DevOps",
    courses: "11 courses",
    level: "L2–L3",
    category: "Cloud Platforms",
    icon: "https://cdn.simpleicons.org/microsoftazure",
  },
  {
    name: "GCP DevOps",
    courses: "9 courses",
    level: "L2–L3",
    category: "Cloud Platforms",
    icon: "https://cdn.simpleicons.org/googlecloud",
  },
  {
    name: "Cloud & DevSecOps",
    courses: "13 courses",
    level: "L2–L3",
    category: "Cloud Platforms",
    icon: "https://cdn.simpleicons.org/cloudflare",
  },

  // =====================================================
  // AI & EMERGING TECHNOLOGY
  // =====================================================

  {
    name: "AI / ML",
    courses: "18 courses",
    level: "L1–L3",
    category: "AI & Emerging Technology",
    icon: "https://cdn.simpleicons.org/tensorflow",
  },
  {
    name: "Generative AI",
    courses: "10 courses",
    level: "L2–L3",
    category: "AI & Emerging Technology",
    icon: "https://cdn.simpleicons.org/openai",
  },
  {
    name: "AI Agents & Agentic AI",
    courses: "7 courses",
    level: "L3",
    category: "AI & Emerging Technology",
    icon: "https://cdn.simpleicons.org/robotframework",
  },
  {
    name: "Agentic AI Platform Engineering",
    courses: "5 courses",
    level: "L3",
    category: "AI & Emerging Technology",
    icon: "https://cdn.simpleicons.org/kubernetes",
  },
];

// =====================================================
// CATEGORY CONFIGURATION
// =====================================================

const categories = [
  {
    name: "Software Development",
    icon: "</>",
    className: "software-row",
    direction: "move-left-to-right",
  },
  {
    name: "Cloud Platforms",
    icon: "☁",
    className: "cloud-row",
    direction: "move-right-to-left",
  },
  {
    name: "AI & Emerging Technology",
    icon: "AI",
    className: "ai-row",
    direction: "move-left-to-right",
  },
];

// =====================================================
// COURSE CARD
// =====================================================

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
          {program.courses}

          <span> • </span>

          {program.level}
        </p>
      </div>
    </div>
  );
}

// =====================================================
// CATEGORY ROW
// =====================================================

function CategoryRow({ category }) {
  const categoryPrograms = programs.filter(
    (program) => program.category === category.name,
  );

  /*
    Create 3 identical groups.

    Group 1
    Group 2
    Group 3

    Because every group is exactly the same width,
    moving by ONE group creates a seamless loop.
  */

  const groups = [categoryPrograms, categoryPrograms, categoryPrograms];

  return (
    <div className={`category-row ${category.className}`}>
      <div className="marquee-wrapper">
        <div className={`marquee-track ${category.direction}`}>
          {groups.map((group, groupIndex) => (
            <div className="marquee-group" key={groupIndex}>
              {group.map((program, index) => (
                <CourseCard
                  key={`${groupIndex}-${program.name}-${index}`}
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

// =====================================================
// MAIN COURSES COMPONENT
// =====================================================

export default function Courses() {
  return (
    <section className="courses-section">
      <div className="courses-container">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="courses-header">
          <div className="courses-heading">
            {/* <div className="eyebrow">COURSE CATALOGUE</div> */}

            <h1>Build the next version of you</h1>

            <p>
              Industry-aligned programs. Practical learning. Real career
              outcomes.
            </p>
          </div>

          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <div className="courses-illustration">
            <div className="rocket">🚀</div>

            <div className="spark spark-one">✦</div>

            <div className="spark spark-two">✦</div>

            <div className="spark spark-three">✦</div>

            <div className="learn-text">
              <span>Learn</span>

              <span>Build</span>

              <span>Grow</span>
            </div>
          </div>
        </div>

        {/* =================================================
            CATEGORY ROWS
        ================================================= */}

        <div className="courses-categories">
          {categories.map((category) => (
            <CategoryRow key={category.name} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
