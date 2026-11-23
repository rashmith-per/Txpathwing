import React, { useState } from "react";
import { BookOpen, Calendar, Layers, Clock, Users } from "lucide-react";

export default function InstCoursesBatchesModule({ mode = "courses", search = "" }) {
  const [activeTab, setActiveTab] = useState(mode);

  const courses = [
    { code: "CS-301", title: "Distributed Systems & Cloud Computing", dept: "CSE", credits: 4, faculty: "Dr. K. Srinivas", sem: "Sem 6", enrolled: 240 },
    { code: "AI-202", title: "Machine Learning & Neural Architectures", dept: "AIML", credits: 4, faculty: "Dr. P. Varma", sem: "Sem 4", enrolled: 180 },
    { code: "EC-401", title: "Embedded IoT & VLSI Design", dept: "ECE", credits: 3, faculty: "Dr. R. Ramana", sem: "Sem 8", enrolled: 160 },
    { code: "CS-205", title: "Object Oriented Java & Spring Boot", dept: "CSE", credits: 4, faculty: "Prof. Neha Deshmukh", sem: "Sem 4", enrolled: 320 },
    { code: "MB-102", title: "Corporate Finance & Venture Strategy", dept: "MBA", credits: 3, faculty: "Dr. Ananya Sen", sem: "Sem 2", enrolled: 120 },
  ];

  const batches = [
    { name: "B.Tech CSE (2024 - 2028)", cohort: "Freshmen Batch", sections: 4, students: 240, sem: "Sem 2", completion: "2028" },
    { name: "B.Tech AIML (2023 - 2027)", cohort: "Sophomore Batch", sections: 3, students: 180, sem: "Sem 4", completion: "2027" },
    { name: "B.Tech CSE (2022 - 2026)", cohort: "Pre-Final Batch", sections: 4, students: 240, sem: "Sem 6", completion: "2026" },
    { name: "B.Tech ECE (2021 - 2025)", cohort: "Graduating Batch", sections: 3, students: 180, sem: "Sem 8", completion: "2025" },
    { name: "MBA Executive (2023 - 2025)", cohort: "PG Cohort", sections: 2, students: 120, sem: "Sem 4", completion: "2025" },
  ];

  const filteredCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.code.toLowerCase().includes(search.toLowerCase()) ||
    c.dept.toLowerCase().includes(search.toLowerCase())
  );

  const filteredBatches = batches.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.cohort.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="portal-module-container">
      <div className="module-tabs-header">
        <button
          type="button"
          className={`module-tab-btn ${activeTab === "courses" ? "active" : ""}`}
          onClick={() => setActiveTab("courses")}
        >
          <BookOpen size={16} />
          <span>Curriculum Courses ({courses.length})</span>
        </button>
        <button
          type="button"
          className={`module-tab-btn ${activeTab === "batches" ? "active" : ""}`}
          onClick={() => setActiveTab("batches")}
        >
          <Calendar size={16} />
          <span>Academic Batches ({batches.length})</span>
        </button>
      </div>

      {activeTab === "courses" ? (
        <div className="table-card">
          <table className="portal-table">
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Course Title</th>
                <th>Department</th>
                <th>Credits</th>
                <th>Faculty Incharge</th>
                <th>Semester</th>
                <th>Enrolled</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((c) => (
                <tr key={c.code}>
                  <td><strong>{c.code}</strong></td>
                  <td><strong>{c.title}</strong></td>
                  <td><span className="badge-pill">{c.dept}</span></td>
                  <td>{c.credits} Credits</td>
                  <td>{c.faculty}</td>
                  <td>{c.sem}</td>
                  <td>{c.enrolled} Students</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="batch-grid">
          {filteredBatches.map((b, idx) => (
            <div key={idx} className="batch-card">
              <div className="batch-top">
                <span className="batch-cohort-tag">{b.cohort}</span>
                <span className="batch-year">Class of {b.completion}</span>
              </div>
              <h3 className="batch-name">{b.name}</h3>
              <div className="batch-stats">
                <div className="batch-stat">
                  <Users size={14} />
                  <span>{b.students} Students</span>
                </div>
                <div className="batch-stat">
                  <Layers size={14} />
                  <span>{b.sections} Sections</span>
                </div>
                <div className="batch-stat">
                  <Clock size={14} />
                  <span>Current: {b.sem}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
