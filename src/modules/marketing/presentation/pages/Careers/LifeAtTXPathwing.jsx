import React, { useState } from "react";
import trainingImg from "../../../../../assets/workshop_lightbulb_idea.png";
import eventImg from "../../../../../assets/Hackathon_2.jpg";
import studentsImg from "../../../../../assets/contact-students.png";
import whyChooseImg from "../../../../../assets/Why-choose.png";
import aboutImg from "../../../../../assets/about-classroom.png";
import contact1Img from "../../../../../assets/featured-student.png";
import "./LifeAtTXPathwing.css";

const galleryCategories = [
  "All",
  "Team Collaboration",
  "Training Sessions",
  "Workshops",
  "Events",
  "Office Environment"
];

const galleryData = [
  {
    id: 1,
    title: "Team Collaboration",
    category: "Team Collaboration",
    caption: "Engineers, mentors, and designers brainstorming next-gen learning features.",
    image: studentsImg
  },
  {
    id: 2,
    title: "Hands-on Training Sessions",
    category: "Training Sessions",
    caption: "Engaging, practical code workshops where theoretical concepts come to life.",
    image: trainingImg
  },
  {
    id: 3,
    title: "Tech Events & Hackathons",
    category: "Events",
    caption: "Celebrating student project completions and milestone achievements together.",
    image: eventImg
  },
  {
    id: 4,
    title: "Curriculum Innovation Workshops",
    category: "Workshops",
    caption: "Regular curriculum reviews ensuring our coursework matches industry demands.",
    image: whyChooseImg
  },
  {
    id: 5,
    title: "Modern Learning Center",
    category: "Office Environment",
    caption: "Dynamic learning spaces engineered for focus, creativity, and peer support.",
    image: aboutImg
  },
  {
    id: 6,
    title: "1-on-1 Mentorship",
    category: "Training Sessions",
    caption: "Dedicated code review sessions helping students debug and master new tools.",
    image: contact1Img
  }
];

const LifeAtTXPathwing = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = galleryData.filter(
    (item) => activeCategory === "All" || item.category === activeCategory
  );

  return (
    <section id="life-at-txpathwing" className="life-section" aria-labelledby="life-heading">
      <div className="careers-container">
        <div className="section-header-center">
          <span className="section-eyebrow">CULTURE & COMMUNITY</span>
          <h2 id="life-heading" className="section-title">
            Life at TX Pathwing
          </h2>
          <p className="section-subtitle">
            Work. Learn. Collaborate. Celebrate.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="life-category-tabs" role="tablist" aria-label="Gallery category filters">
          {galleryCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat}
              className={`life-tab-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="life-gallery-grid">
          {filteredItems.map((item) => (
            <figure key={item.id} className="gallery-card">
              <div className="gallery-card-img-wrap">
                <img
                  src={item.image}
                  alt={item.title}
                  className="gallery-img"
                  loading="lazy"
                />
                <div className="gallery-overlay">
                  <span className="gallery-tag">{item.category}</span>
                  <h4 className="gallery-item-title">{item.title}</h4>
                  <p className="gallery-item-caption">{item.caption}</p>
                </div>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LifeAtTXPathwing;
