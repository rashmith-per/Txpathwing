import React from "react";
import { Link } from "react-router-dom";
import {
  Cloud,
  Code2,
  Database,
  FileCode2,
  Layers3,
  Server,
  Terminal,
  Workflow,
} from "lucide-react";

import pathwingLogo from "../../../../../assets/tx-icon.jpg";
import "./BlogAnimation.css";

/* =========================================================
   COURSE DATA
   ========================================================= */

const courseCards = [
  {
    icon: Terminal,
    title: "Python",
    description: "Programming",
    position: "python",
  },
  {
    icon: FileCode2,
    title: "JavaScript",
    description: "Programming",
    position: "javascript",
  },
  {
    icon: FileCode2,
    title: "TypeScript",
    description: "Programming",
    position: "typescript",
  },
  {
    icon: Code2,
    title: "HTML & CSS",
    description: "Frontend",
    position: "html",
  },
  {
    icon: Layers3,
    title: "Tailwind CSS",
    description: "Frontend",
    position: "tailwind",
  },
  {
    icon: Cloud,
    title: "AWS",
    description: "Cloud skills",
    position: "aws",
  },
  {
    icon: Code2,
    title: "React",
    description: "Frontend",
    position: "react",
  },
  {
    icon: Server,
    title: "Node.js",
    description: "Backend",
    position: "node",
  },
  {
    icon: Layers3,
    title: "Django",
    description: "Backend",
    position: "django",
  },
  {
    icon: Database,
    title: "SQL",
    description: "Database",
    position: "sql",
  },
  {
    icon: Database,
    title: "MongoDB",
    description: "Database",
    position: "mongo",
  },
  {
    icon: Workflow,
    title: "DevOps",
    description: "CI/CD",
    position: "devops",
  },
];

/* =========================================================
   COURSE CARD
   ========================================================= */

const CourseCard = ({ item }) => {
  const Icon = item.icon;

  return (
    <Link
      to="/explore"
      className={`hero-orbit-link hero-link-${item.position}`}
      aria-label={`Explore ${item.title}`}
    >
      <span className="hero-orbit-card">
        <span className="hero-orbit-icon">
          <Icon size={18} />
        </span>

        <span className="hero-card-copy">
          <strong>{item.title}</strong>
          <small>{item.description}</small>
        </span>
      </span>
    </Link>
  );
};

/* =========================================================
   HERO ORBIT
   ========================================================= */

const BlogAnimation = () => {
  return (
    <div className="hero-orbit-visual">

      {/* Background glow */}
      <div
        className="hero-orbit-glow"
        aria-hidden="true"
      />

      {/* =====================================================
          ORBIT RINGS
         ===================================================== */}

      <div className="hero-orbit-ring hero-orbit-ring-one" />
      <div className="hero-orbit-ring hero-orbit-ring-two" />
      <div className="hero-orbit-ring hero-orbit-ring-three" />
      <div className="hero-orbit-ring hero-orbit-ring-four" />
      <div className="hero-orbit-ring hero-orbit-ring-five" />

      {/* =====================================================
          NETWORK LINES
         ===================================================== */}

      <div
        className="hero-network-lines"
        aria-hidden="true"
      >
        <span className="network-line network-line-one" />
        <span className="network-line network-line-two" />
        <span className="network-line network-line-three" />
      </div>

      {/* =====================================================
          ORBIT PARTICLES
         ===================================================== */}

      <div
        className="hero-orbit-particles"
        aria-hidden="true"
      >
        <i className="hero-particle particle-one" />
        <i className="hero-particle particle-two" />
        <i className="hero-particle particle-three" />
        <i className="hero-particle particle-four" />
        <i className="hero-particle particle-five" />
        <i className="hero-particle particle-six" />
      </div>

      {/* =====================================================
          FIXED CENTER
         ===================================================== */}

      <div className="hero-orbit-center">
        <img
          src={pathwingLogo}
          alt="TX Pathwing"
        />

        <span>TX Pathwing</span>

        <small>
          Learn. Build. Rise.
        </small>
      </div>

      {/* =====================================================
          ROTATING COURSE CARDS
         ===================================================== */}

      {courseCards.map((item) => (
        <CourseCard
          key={item.title}
          item={item}
        />
      ))}
    </div>
  );
};

export default BlogAnimation;
