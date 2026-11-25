import React, { useState } from "react";
import { Users, GraduationCap, Search, CheckCircle, Clock } from "lucide-react";

export default function InstStudentsFacultyModule({ mode = "students", search = "" }) {
  const [activeTab, setActiveTab] = useState(mode);

  const students = [
    { id: "STU-101", name: "Aarav Sharma", dept: "CSE", sem: "Semester 6", cgpa: "8.9", attendance: "94%", status: "Honors" },
    { id: "STU-102", name: "Sneha Reddy", dept: "AIML", sem: "Semester 4", cgpa: "9.2", attendance: "98%", status: "Honors" },
    { id: "STU-103", name: "Rohan Varma", dept: "ECE", sem: "Semester 8", cgpa: "8.1", attendance: "86%", status: "Good Standing" },
    { id: "STU-104", name: "Pooja Patel", dept: "CSE", sem: "Semester 6", cgpa: "7.8", attendance: "82%", status: "Good Standing" },
    { id: "STU-105", name: "Karthik Nair", dept: "MECH", sem: "Semester 4", cgpa: "6.9", attendance: "74%", status: "Low Attendance" },
    { id: "STU-106", name: "Divya Iyer", dept: "CIVIL", sem: "Semester 8", cgpa: "8.5", attendance: "91%", status: "Good Standing" },
  ];

  const faculty = [
    { id: "FAC-01", name: "Dr. K. Srinivas", dept: "CSE", designation: "Professor & HOD", courses: "Data Structures, Cloud Arch", exp: "18 Yrs" },
    { id: "FAC-02", name: "Dr. P. Varma", dept: "AIML", designation: "Associate Professor", courses: "Deep Learning, NLP", exp: "12 Yrs" },
    { id: "FAC-03", name: "Dr. R. Ramana", dept: "ECE", designation: "Professor", courses: "VLSI, Digital Signal Proc", exp: "20 Yrs" },
    { id: "FAC-04", name: "Prof. Neha Deshmukh", dept: "CSE", designation: "Assistant Professor", courses: "Java Full Stack, Web Tech", exp: "7 Yrs" },
    { id: "FAC-05", name: "Dr. S. K. Gupta", dept: "MECH", designation: "Professor & HOD", courses: "Thermodynamics, Robotics", exp: "16 Yrs" },
  ];

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.dept.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase())
  );

  const filteredFaculty = faculty.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.dept.toLowerCase().includes(search.toLowerCase()) ||
      f.designation.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="portal-module-container">
      <div className="module-tabs-header">
        <button
          type="button"
          className={`module-tab-btn ${activeTab === "students" ? "active" : ""}`}
          onClick={() => setActiveTab("students")}
        >
          <GraduationCap size={16} />
          <span>Student Directory ({students.length})</span>
        </button>
        <button
          type="button"
          className={`module-tab-btn ${activeTab === "faculty" ? "active" : ""}`}
          onClick={() => setActiveTab("faculty")}
        >
          <Users size={16} />
          <span>Faculty Directory ({faculty.length})</span>
        </button>
      </div>

      {activeTab === "students" ? (
        <div className="table-card">
          <table className="portal-table">
            <thead>
              <tr>
                <th>Roll ID</th>
                <th>Student Name</th>
                <th>Department</th>
                <th>Semester</th>
                <th>CGPA</th>
                <th>Attendance</th>
                <th>Standing</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((s) => (
                <tr key={s.id}>
                  <td><strong>{s.id}</strong></td>
                  <td>{s.name}</td>
                  <td><span className="badge-pill">{s.dept}</span></td>
                  <td>{s.sem}</td>
                  <td><strong>{s.cgpa}</strong></td>
                  <td>
                    <span className={Number(s.attendance.replace("%", "")) < 75 ? "text-danger" : "text-success"}>
                      {s.attendance}
                    </span>
                  </td>
                  <td>
                    <span className={`status-pill ${s.status.toLowerCase().replace(/\s+/g, "-")}`}>
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="table-card">
          <table className="portal-table">
            <thead>
              <tr>
                <th>Faculty ID</th>
                <th>Faculty Name</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Assigned Courses</th>
                <th>Experience</th>
              </tr>
            </thead>
            <tbody>
              {filteredFaculty.map((f) => (
                <tr key={f.id}>
                  <td><strong>{f.id}</strong></td>
                  <td><strong>{f.name}</strong></td>
                  <td><span className="badge-pill">{f.dept}</span></td>
                  <td>{f.designation}</td>
                  <td>{f.courses}</td>
                  <td>{f.exp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
