import React, { useState, useMemo } from "react";
import "./MarketPlace.css";
 
const courses = [
  { id: 'REACT-FS', category: 'Software Development', level: 'Intermediate', title: 'React Full Stack Development', instructor: 'Arjun Mehta', initials: 'AM', duration: '14 weeks', lessons: '96 lessons', tag1: 'Live cohort', tag2: 'Coding labs', price: '₹5,499', oldPrice: '₹8,999' },
  { id: 'PY-FS', category: 'Software Development', level: 'Beginner', title: 'Python Full Stack with Django & React', instructor: 'Sowmya Iyer', initials: 'SI', duration: '16 weeks', lessons: '112 lessons', tag1: 'Hybrid', tag2: 'Placement-linked', price: '₹6,499', oldPrice: '₹9,999' },
  { id: 'JAVA-FS', category: 'Software Development', level: 'Intermediate', title: 'Java Full Stack — Spring Boot & Microservices', instructor: 'Naveen Kulkarni', initials: 'NK', duration: '18 weeks', lessons: '128 lessons', tag1: 'Classroom', tag2: 'Placement-linked', price: '₹6,999', oldPrice: '₹11,999'},
  { id: 'AWS-DOP', category: 'Cloud & DevOps', level: 'Advanced', title: 'AWS DevOps Engineer — Professional Track', instructor: 'Meera Krishnan', initials: 'MK', duration: '12 weeks', lessons: '74 lessons', tag1: '6 labs', tag2: 'Proctored exam', price: '₹6,999', oldPrice: '₹10,999' },
  { id: 'K8S-PRD', category: 'Cloud & DevOps', level: 'Advanced', title: 'Kubernetes for Production Workloads', instructor: 'Meera Krishnan', initials: 'MK', duration: '9 weeks', lessons: '52 lessons', tag1: '4 labs', tag2: 'Production grade', price: '₹5,499', oldPrice: '₹8,499' },
  { id: 'DEVSEC', category: 'Cloud & DevOps', level: 'Intermediate', title: 'Cloud Security & DevSecOps Essentials', instructor: 'Tanvox Technologies', initials: 'TT', duration: '8 weeks', lessons: '44 lessons', tag1: 'Industry module', tag2: 'Case studies', price: '₹5,299', oldPrice: '₹7,999' },
  { id: 'ML-PY', category: 'AI & Data', level: 'Intermediate', title: 'Machine Learning with Python', instructor: 'Dr. Anita Bose', initials: 'AB', duration: '12 weeks', lessons: '62 lessons', tag1: 'Live cohort', tag2: 'Capstone', price: '₹7,499', oldPrice: '₹11,999' },
  { id: 'AGENTIC', category: 'AI & Data', level: 'Advanced', title: 'Agentic AI Platform Engineering', instructor: 'Rohit Sharma', initials: 'RS', duration: '8 weeks', lessons: '46 lessons', tag1: 'New Cohort of 40', tag2: 'Build agents', price: '₹8,999', oldPrice: '₹13,999' },
  { id: 'SQL-DM', category: 'AI & Data', level: 'Beginner', title: 'SQL & Data Modelling for Engineers', instructor: 'Dr. Anita Bose', initials: 'AB', duration: '6 weeks', lessons: '38 lessons', tag1: 'Self paced', tag2: 'Practice set', price: '₹1,999', oldPrice: '₹3,499' },
  { id: 'SEL-AUT', category: 'Testing', level: 'Beginner', title: 'Selenium Automation Testing', instructor: 'Kavitha Reddy', initials: 'KR', duration: '8 weeks', lessons: '54 lessons', tag1: 'Placement-linked', tag2: 'Framework', price: '₹3,499', oldPrice: '₹5,999' },
  { id: 'API-PERF', category: 'Testing', level: 'Intermediate', title: 'API & Performance Testing — Postman + k6', instructor: 'Kavitha Reddy', initials: 'KR', duration: '5 weeks', lessons: '31 lessons', tag1: 'Self paced', tag2: 'Lab heavy', price: '₹2,999' },
  { id: 'CAREER-01', category: 'Career', level: 'Beginner', title: 'Interview Preparation & Resume Lab', instructor: 'Placement Cell', initials: 'PC', duration: '4 weeks', lessons: '22 lessons', tag1: 'Free', tag2: 'Mock interviews', price: '₹0', oldPrice: '₹0'},
  { id: 'CAREER-02', category: 'Career', level: 'Beginner', title: 'Aptitude & Communication for Campus Hiring', instructor: 'Placement Cell', initials: 'PC', duration: '6 weeks', lessons: '40 lessons', tag1: 'Free', tag2: 'Campus ready', price: '₹0', oldPrice: '₹0'},
];
 
export default function Marketplace({ onSelectCourse }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeLevel, setActiveLevel] = useState('All levels');
 
  const filtered = useMemo(() => {
    return courses.filter(c => {
      if (activeCategory !== 'All' && c.category !== activeCategory) return false;
      if (activeLevel !== 'All levels' && c.level !== activeLevel) return false;
      return true;
    });
  }, [activeCategory, activeLevel]);
 
  return (
    <div className="mp-page">
      <div className="mp-container">
        <div className="mp-hero">
          <h1>Buy a course, a practice set,<br/>or a whole cohort seat</h1>
          <p>Instructors publish; Pathwing reviews, hosts under DRM, collects payment,<br/>splits revenue and raises the GST invoice.</p>
        </div>
 
        <div className="mp-filters">
          <div className="filter-row">
            {['All', 'Software Development', 'Cloud & DevOps', 'AI & Data', 'Testing', 'Career'].map(cat => (
              <button key={cat} className={activeCategory === cat ? 'active' : ''} onClick={() => setActiveCategory(cat)}>{cat}</button>
            ))}
          </div>
          <div className="filter-row">
            {['All levels', 'Beginner', 'Intermediate', 'Advanced'].map(lvl => (
              <button key={lvl} className={activeLevel === lvl ? 'active' : ''} onClick={() => setActiveLevel(lvl)}>{lvl}</button>
            ))}
          </div>
        </div>
 
        <div className="mp-grid-2">
          {filtered.map(course => (
            <div key={course.id} className="course-card-big" onClick={() => onSelectCourse(course)}>
              <div className="card-top">
                <div className="card-top-left">
                  <span className="code-pill">{course.id}</span>
                  <span className="level-pill">{course.level}</span>
                </div>
               </div>
 
              <h2 className="card-title">{course.title}</h2>
 
              <div className="card-instructor">
                <div className="avatar">{course.initials}</div>
                <span>{course.instructor}</span>
              </div>
 
              <div className="card-tags">
                <span>🕐 {course.duration}</span>
                <span>📖 {course.lessons}</span>
                <span>{course.tag1}</span>
                <span>{course.tag2}</span>
              </div>
 
              <div className="card-bottom">
                <div className="price"><span className="now">{course.price}</span>{course.oldPrice && <span className="old">{course.oldPrice}</span>}</div>
                <div className="arrow-btn">↗</div>
              </div>
            </div>
          ))}
        </div>
 
        <div className="mp-footer">Showing {filtered.length} of 14 sample courses · full catalogue lists 148.</div>
      </div>
    </div>
  );
}
 
 