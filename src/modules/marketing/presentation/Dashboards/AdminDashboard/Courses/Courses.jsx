import React, { useMemo, useState, useEffect } from "react";
import "./Courses.css";
import {
  GraduationCap, Search, X, Clock, Users, Star, ArrowRight,
  LayoutGrid, List, CheckCircle2, ChevronDown, Eye, Plus, Pencil,
  Trash2, AlertTriangle, BookOpen, Upload, Sparkles, Image as ImageIcon
} from "lucide-react";
import { Badge } from "../common/Badge";
import { DetailField, InlineDetailView } from "../common/DetailSection";
import { CourseBanner } from "./CourseBanners";

export const SAMPLE_COURSES_DATA = [
  {
    id: "crs-1",
    title: "Advanced Java Bootcamp",
    instructor: "Dr. R. Sharma",
    organization: "Tech Academy",
    category: "Programming",
    level: "Advanced",
    duration: "12 Weeks",
    enrollments: 420,
    rating: 4.8,
    status: "Published",
    imageType: "java",
    imageUrl: "",
    price: "₹6,499",
    description: "Master enterprise Java, Spring Boot, Microservices, and cloud deployments with real-world architecture patterns.",
    prerequisites: "Basic Java or OOP fundamentals",
    modulesCount: 14,
    submittedDate: "12 Jan 2026",
    slaWindow: "48 Hours",
    slaStatus: "Approved",
    assignedReviewer: "Senior Tech Panel",
    syllabus: [
      "1. Advanced OOP & JVM Internals",
      "2. Spring Boot 3 & Spring Security",
      "3. Distributed Microservices & Kafka",
      "4. Containerization with Docker & K8s"
    ]
  },
  {
    id: "crs-2",
    title: "Full Stack Development",
    instructor: "Vikram Patel",
    organization: "Data Labs",
    category: "Programming",
    level: "Intermediate",
    duration: "16 Weeks",
    enrollments: 760,
    rating: 4.7,
    status: "Upcoming",
    imageType: "fullstack",
    imageUrl: "",
    price: "₹8,999",
    description: "End-to-end full stack web development with Python, Django, React, RESTful APIs, and cloud deployments.",
    prerequisites: "Basic programming concepts",
    modulesCount: 18,
    submittedDate: "15 Jan 2026",
    slaWindow: "24 Hours",
    slaStatus: "Pending Review",
    assignedReviewer: "Review Team Alpha",
    syllabus: [
      "1. Python Core & Modern JavaScript ES6+",
      "2. React Frontend Architecture",
      "3. Django / Node Backend & PostgreSQL",
      "4. Production CI/CD & Cloud Deployment"
    ]
  },
  {
    id: "crs-3",
    title: "Cloud Fundamentals & AWS",
    instructor: "Priya Mehta",
    organization: "Cloud Academy",
    category: "Cloud Computing",
    level: "Beginner to Intermediate",
    duration: "8 Weeks",
    enrollments: 1150,
    rating: 4.9,
    status: "Published",
    imageType: "cloud",
    imageUrl: "",
    price: "₹5,499",
    description: "Comprehensive AWS cloud architecture training covering EC2, S3, Lambda, VPC, IAM, and Solutions Architect certification prep.",
    prerequisites: "General computer science fundamentals",
    modulesCount: 10,
    submittedDate: "08 Jan 2026",
    slaWindow: "48 Hours",
    slaStatus: "Approved",
    assignedReviewer: "Cloud Architecture Lead",
    syllabus: [
      "1. Cloud Concepts & Global Infrastructure",
      "2. Compute (EC2, Lambda, ECS)",
      "3. Storage, Database & Networking",
      "4. Security, Compliance & Cost Management"
    ]
  },
  {
    id: "crs-4",
    title: "Cybersecurity Analyst",
    instructor: "Neha Kapoor",
    organization: "SecureTech",
    category: "Cybersecurity",
    level: "Intermediate",
    duration: "14 Weeks",
    enrollments: 310,
    rating: 4.8,
    status: "Ongoing",
    imageType: "security",
    imageUrl: "",
    price: "₹7,299",
    description: "Hands-on threat intelligence, SOC operations, SIEM tools, network defense, ethical penetration testing, and incident response.",
    prerequisites: "Networking fundamentals",
    modulesCount: 12,
    submittedDate: "20 Jan 2026",
    slaWindow: "72 Hours",
    slaStatus: "Ongoing Operations",
    assignedReviewer: "InfoSec Lead",
    syllabus: [
      "1. Network Protocols & Attack Vectors",
      "2. Threat Detection & SIEM (Splunk)",
      "3. Incident Handling & Digital Forensics",
      "4. Penetration Testing & Vulnerability Assessment"
    ]
  },
  {
    id: "crs-5",
    title: "Data Science with Python",
    instructor: "Ankit Verma",
    organization: "Data Labs",
    category: "Data Science",
    level: "Intermediate",
    duration: "12 Weeks",
    enrollments: 620,
    rating: 4.7,
    status: "Published",
    imageType: "datascience",
    imageUrl: "",
    price: "₹6,999",
    description: "Practical data science from wrangling to machine learning with Pandas, NumPy, Scikit-Learn, and statistical modeling.",
    prerequisites: "Basic Python and High School Math",
    modulesCount: 14,
    submittedDate: "10 Jan 2026",
    slaWindow: "48 Hours",
    slaStatus: "Approved",
    assignedReviewer: "AI/ML Review Board",
    syllabus: [
      "1. Exploratory Data Analysis with Pandas & Seaborn",
      "2. Statistical Inference & Hypothesis Testing",
      "3. Supervised & Unsupervised Machine Learning",
      "4. Model Evaluation & Production Pipelines"
    ]
  },
  {
    id: "crs-6",
    title: "UI/UX Design Fundamentals",
    instructor: "Sneha Reddy",
    organization: "Design Studio",
    category: "Design",
    level: "Beginner",
    duration: "10 Weeks",
    enrollments: 480,
    rating: 4.6,
    status: "Upcoming",
    imageType: "uiux",
    imageUrl: "",
    price: "₹4,499",
    description: "Learn user research, wireframing, interactive prototyping, and design systems in Figma from scratch to industry portfolio.",
    prerequisites: "No prior experience required",
    modulesCount: 10,
    submittedDate: "18 Jan 2026",
    slaWindow: "24 Hours",
    slaStatus: "Pending Review",
    assignedReviewer: "Design Guild",
    syllabus: [
      "1. User Research & Information Architecture",
      "2. Wireframing & Low-Fidelity Prototyping",
      "3. Visual Hierarchy & Figma Design Systems",
      "4. Usability Testing & Portfolio Case Study"
    ]
  }
];

const INITIAL_FORM = {
  id: "",
  title: "",
  instructor: "",
  organization: "",
  category: "Programming",
  level: "Beginner",
  duration: "12 Weeks",
  enrollments: 100,
  rating: 4.8,
  status: "Published",
  imageType: "auto",
  imageUrl: "",
  price: "₹4,999",
  description: "",
  prerequisites: "",
  modulesCount: 12
};

export function Courses({
  courses,
  setCourses,
  selectedCourse,
  setSelectedCourse,
  setNotice,
  setPage
}) {
  const [search, setSearch] = useState("");
  const [selectedOrg, setSelectedOrg] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" | "edit"
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [courseToDelete, setCourseToDelete] = useState(null);

  // Derive unique organizations from courses
  const organizations = useMemo(() => {
    return Array.from(new Set(courses.map(c => c.organization).filter(Boolean)));
  }, [courses]);

  // Filter & sort logic
  const filteredCourses = useMemo(() => {
    return courses
      .filter(c => {
        // Search filter
        const query = search.trim().toLowerCase();
        const matchSearch =
          !query ||
          `${c.title} ${c.instructor} ${c.organization} ${c.category || ""} ${c.level || ""}`
            .toLowerCase()
            .includes(query);

        // Organization filter
        const matchOrg = selectedOrg === "all" || c.organization === selectedOrg;

        // Status filter
        const matchStatus =
          selectedStatus === "all" ||
          (c.status || "").toLowerCase() === selectedStatus.toLowerCase();

        return matchSearch && matchOrg && matchStatus;
      })
      .sort((a, b) => {
        if (sortBy === "popular") {
          return (b.enrollments || 0) - (a.enrollments || 0);
        }
        if (sortBy === "rating") {
          return (b.rating || 0) - (a.rating || 0);
        }
        if (sortBy === "duration") {
          return (parseInt(a.duration, 10) || 0) - (parseInt(b.duration, 10) || 0);
        }
        if (sortBy === "title") {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
  }, [courses, search, selectedOrg, selectedStatus, sortBy]);

  // Modal Handlers
  function handleLoadSampleCourses() {
    setCourses(SAMPLE_COURSES_DATA);
    if (setNotice) setNotice("Loaded 6 reference courses from catalog design.");
  }

  function openAddModal() {
    setModalMode("add");
    setFormData({
      ...INITIAL_FORM,
      id: `crs-${Date.now()}`
    });
    setIsModalOpen(true);
  }

  function openEditModal(course) {
    setModalMode("edit");
    setFormData({
      id: course.id,
      title: course.title || "",
      instructor: course.instructor || "",
      organization: course.organization || "",
      category: course.category || "Programming",
      level: course.level || "Beginner",
      duration: course.duration || "12 Weeks",
      enrollments: course.enrollments || 0,
      rating: course.rating || 4.8,
      status: course.status || "Published",
      imageType: course.imageType || "auto",
      imageUrl: course.imageUrl || course.image || "",
      price: course.price || "₹4,999",
      description: course.description || "",
      prerequisites: course.prerequisites || "",
      modulesCount: course.modulesCount || 12
    });
    setIsModalOpen(true);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (modalMode === "add") {
      const newCourse = {
        ...formData,
        id: formData.id || `crs-${Date.now()}`,
        enrollments: Number(formData.enrollments) || 0,
        rating: Number(formData.rating) || 4.8,
        modulesCount: Number(formData.modulesCount) || 12,
        submittedDate: new Date().toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' }),
        slaWindow: "48 Hours",
        slaStatus: formData.status === "Published" ? "Approved" : "Pending Review",
        assignedReviewer: "Platform Review Team",
        syllabus: [
          "1. Core Principles & Architecture",
          "2. Modern Tooling & Implementation",
          "3. Advanced Case Studies & Hands-on Labs",
          "4. Production Deployment & Best Practices"
        ]
      };
      setCourses(prev => [newCourse, ...prev]);
      if (setNotice) setNotice(`Course "${newCourse.title}" has been successfully added.`);
    } else {
      // Edit mode
      setCourses(prev =>
        prev.map(c => {
          if (c.id === formData.id) {
            const updated = {
              ...c,
              ...formData,
              enrollments: Number(formData.enrollments) || 0,
              rating: Number(formData.rating) || 4.8,
              modulesCount: Number(formData.modulesCount) || 12
            };
            if (selectedCourse && selectedCourse.id === c.id) {
              setSelectedCourse(updated);
            }
            return updated;
          }
          return c;
        })
      );
      if (setNotice) setNotice(`Course "${formData.title}" has been updated.`);
    }

    setIsModalOpen(false);
  }

  function handleConfirmDelete() {
    if (!courseToDelete) return;

    setCourses(prev => prev.filter(c => c.id !== courseToDelete.id));
    if (selectedCourse && selectedCourse.id === courseToDelete.id) {
      setSelectedCourse(null);
    }
    if (setNotice) setNotice(`Course "${courseToDelete.title}" has been deleted.`);
    setCourseToDelete(null);
  }

  function handlePublish(courseId) {
    setCourses(prev =>
      prev.map(c => {
        if (c.id === courseId) {
          const updated = { ...c, status: "Published", slaStatus: "Approved" };
          if (selectedCourse && selectedCourse.id === courseId) {
            setSelectedCourse(updated);
          }
          return updated;
        }
        return c;
      })
    );
    if (setNotice) setNotice(`Course "${selectedCourse?.title}" has been published.`);
  }

  function handleUnpublish(courseId) {
    setCourses(prev =>
      prev.map(c => {
        if (c.id === courseId) {
          const updated = { ...c, status: "Upcoming" };
          if (selectedCourse && selectedCourse.id === courseId) {
            setSelectedCourse(updated);
          }
          return updated;
        }
        return c;
      })
    );
    if (setNotice) setNotice(`Course "${selectedCourse?.title}" updated to upcoming status.`);
  }

  function handleAssignReviewer(courseId, reviewer) {
    setCourses(prev =>
      prev.map(c => {
        if (c.id === courseId) {
          const updated = { ...c, assignedReviewer: reviewer };
          if (selectedCourse && selectedCourse.id === courseId) {
            setSelectedCourse(updated);
          }
          return updated;
        }
        return c;
      })
    );
    if (setNotice) setNotice(`Reviewer "${reviewer}" assigned to course.`);
  }

  // Render detail view if a course is selected
  if (selectedCourse) {
    return (
      <div className="adm-detail-container">
        <InlineDetailView
          title={selectedCourse.title}
          subtitle={`${selectedCourse.category} · ${selectedCourse.organization}`}
          status={selectedCourse.status}
          id={selectedCourse.id}
          onBack={() => setSelectedCourse(null)}
          actions={
            <>
              <button
                className="secondary btn-sm"
                onClick={() => openEditModal(selectedCourse)}
              >
                <Pencil size={14} /> Edit Course
              </button>
              <button
                className="secondary btn-sm"
                style={{ color: "#dc2626", borderColor: "#fecaca" }}
                onClick={() => setCourseToDelete(selectedCourse)}
              >
                <Trash2 size={14} /> Delete Course
              </button>
              {selectedCourse.status !== "Published" ? (
                <button
                  className="primary btn-sm"
                  onClick={() => handlePublish(selectedCourse.id)}
                >
                  <CheckCircle2 size={14} /> Approve & Publish Course
                </button>
              ) : (
                <button
                  className="secondary btn-sm"
                  onClick={() => handleUnpublish(selectedCourse.id)}
                >
                  Unpublish to Upcoming
                </button>
              )}
              {(selectedCourse.status === "Overdue" || selectedCourse.status === "Pending Review") && (
                <button
                  className="secondary btn-sm"
                  onClick={() => setPage("Moderation")}
                >
                  Open in Moderation Queue
                </button>
              )}
            </>
          }
        >
          <div className="detail-grid">
            <div className="detail-col">
              <h3>Course Meta & Overview</h3>
              <div className="detail-fields-list">
                <DetailField label="Course Title" value={selectedCourse.title} />
                <DetailField label="Lead Instructor" value={selectedCourse.instructor} />
                <DetailField label="Host Organization" value={selectedCourse.organization} />
                <DetailField label="Subject Domain" value={selectedCourse.category} />
                <DetailField label="Complexity Level" value={selectedCourse.level} />
                <DetailField label="Course Duration" value={selectedCourse.duration} />
                <DetailField label="Retail Price" value={selectedCourse.price} />
              </div>
            </div>

            <div className="detail-col">
              <h3>Enrollment & SLA Moderation</h3>
              <div className="detail-fields-list">
                <DetailField label="Total Enrollments" value={selectedCourse.enrollments ? `${selectedCourse.enrollments.toLocaleString()} Students` : "None"} />
                <DetailField label="Average Student Rating">
                  <span className="rating-pill">
                    <Star size={13} className="text-warning fill-warning" /> {selectedCourse.rating || "Not rated"}
                  </span>
                </DetailField>
                <DetailField label="Submission Date" value={selectedCourse.submittedDate} />
                <DetailField label="SLA Window" value={selectedCourse.slaWindow} />
                <DetailField label="SLA Health">
                  <Badge tone={selectedCourse.status === "Overdue" ? "danger" : selectedCourse.status === "Published" ? "success" : "warning"}>
                    {selectedCourse.slaStatus || selectedCourse.status}
                  </Badge>
                </DetailField>
                <DetailField label="Assigned Reviewer">
                  <select
                    className="select-inline"
                    value={selectedCourse.assignedReviewer || "Unassigned"}
                    onChange={e => handleAssignReviewer(selectedCourse.id, e.target.value)}
                  >
                    <option value="Unassigned">Unassigned</option>
                    <option value="Sunil Nambiar">Sunil Nambiar (Platform Admin)</option>
                    <option value="Vikram Patel">Vikram Patel (Senior Faculty)</option>
                    <option value="Platform Review Team">Platform Review Team</option>
                  </select>
                </DetailField>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3>Course Description & Learning Outcomes</h3>
            <p className="detail-prose">{selectedCourse.description}</p>
            <DetailField label="Prerequisites" value={selectedCourse.prerequisites} />
          </div>

          {selectedCourse.syllabus && selectedCourse.syllabus.length > 0 && (
            <div className="detail-section">
              <h3>Curriculum Modules & Syllabus</h3>
              <div className="syllabus-list">
                {selectedCourse.syllabus.map((item, index) => (
                  <div className="syllabus-item" key={index}>
                    <span className="syllabus-idx">{index + 1}</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </InlineDetailView>

        {/* Delete Confirmation Modal inside Detail View */}
        {courseToDelete && (
          <div className="adm-modal-overlay" onClick={() => setCourseToDelete(null)}>
            <div className="adm-delete-modal" onClick={e => e.stopPropagation()}>
              <div className="adm-delete-icon-wrap">
                <AlertTriangle size={32} className="adm-delete-icon" />
              </div>
              <h3 className="adm-delete-title">Delete Course</h3>
              <p className="adm-delete-message">
                Are you sure you want to delete <strong>"{courseToDelete.title}"</strong>? This will permanently remove the course and its enrollment records from the platform.
              </p>
              <div className="adm-delete-actions">
                <button className="adm-btn-secondary" onClick={() => setCourseToDelete(null)}>
                  Cancel
                </button>
                <button className="adm-btn-danger" onClick={handleConfirmDelete}>
                  Yes, Delete Course
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal inside Detail View */}
        {isModalOpen && (
          <CourseModal
            mode={modalMode}
            formData={formData}
            setFormData={setFormData}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleFormSubmit}
            organizations={organizations}
          />
        )}
      </div>
    );
  }

  return (
    <div className="adm-courses-page">
      {/* 1. Header Section */}
      <div className="adm-courses-header">
        <div className="adm-header-left">
          <div className="adm-icon-bubble">
            <GraduationCap className="adm-icon-grad" size={28} />
          </div>
          <div className="adm-header-text">
            <h1 className="adm-title">Courses</h1>
            <p className="adm-subtitle">Explore our courses and start learning today</p>
          </div>
        </div>

        <div className="adm-header-right">
          <div className="adm-search-container">
            <Search size={18} className="adm-search-icon" />
            <input
              type="text"
              className="adm-search-input"
              placeholder="Search courses..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button className="adm-search-clear" onClick={() => setSearch("")} aria-label="Clear search">
                <X size={14} />
              </button>
            )}
          </div>

          <button className="adm-add-course-btn" onClick={openAddModal}>
            <Plus size={16} />
            <span>Add Course</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar & View Switcher */}
      <div className="adm-toolbar">
        <div className="adm-filters-left">
          {/* Organizations dropdown */}
          <div className="adm-select-box">
            <select
              className="adm-dropdown-select"
              value={selectedOrg}
              onChange={e => setSelectedOrg(e.target.value)}
            >
              <option value="all">All Organizations</option>
              {organizations.map(org => (
                <option key={org} value={org}>
                  {org}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="adm-chevron" />
          </div>

          {/* Status dropdown */}
          <div className="adm-select-box">
            <select
              className="adm-dropdown-select"
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
            </select>
            <ChevronDown size={14} className="adm-chevron" />
          </div>

          {/* Sort dropdown */}
          <div className="adm-select-box">
            <select
              className="adm-dropdown-select"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
            >
              <option value="popular">Sort By: Popular</option>
              <option value="rating">Sort By: Highest Rated</option>
              <option value="duration">Sort By: Duration</option>
              <option value="title">Sort By: Title</option>
            </select>
            <ChevronDown size={14} className="adm-chevron" />
          </div>
        </div>

        {/* View mode buttons */}
        <div className="adm-view-switch">
          <button
            className={`adm-view-btn-icon ${viewMode === "grid" ? "active" : ""}`}
            onClick={() => setViewMode("grid")}
            title="Grid view"
            aria-label="Grid view"
          >
            <LayoutGrid size={18} />
          </button>
          <button
            className={`adm-view-btn-icon ${viewMode === "list" ? "active" : ""}`}
            onClick={() => setViewMode("list")}
            title="List view"
            aria-label="List view"
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {/* Course Cards / Content Area */}
      {courses.length === 0 ? (
        <div className="adm-empty-box">
          <div className="adm-empty-icon-bubble">
            <BookOpen size={32} className="adm-empty-icon" />
          </div>
          <h3>No courses added yet</h3>
          <p>Click the "Add Course" button to create and display your course card.</p>
          <div className="adm-empty-actions-row">
            <button className="adm-add-course-btn" onClick={openAddModal}>
              <Plus size={16} />
              <span>Add Course</span>
            </button>
          </div>
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="adm-empty-box">
          <Search size={36} className="adm-empty-icon" />
          <h3>No matching courses found</h3>
          <p>No courses matched your current search or filter criteria.</p>
          <button
            className="adm-reset-btn"
            onClick={() => {
              setSearch("");
              setSelectedOrg("all");
              setSelectedStatus("all");
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="adm-courses-grid">
          {filteredCourses.map(course => {
            const statusKey = (course.status || "").toLowerCase().replace(/\s+/g, "-");
            return (
              <div
                key={course.id}
                className="adm-course-card"
                onClick={() => setSelectedCourse(course)}
              >
                {/* Banner Area (Height: 160px) */}
                <div className="adm-card-banner">
                  {/* Floating Status Badge on Top-Left */}
                  <div className={`adm-card-badge status-${statusKey}`}>
                    <span className="adm-badge-dot" />
                    <span>{course.status}</span>
                  </div>

                  {/* High Quality Banner SVG / Image based on Course */}
                  <CourseBanner
                    type={course.imageType}
                    title={course.title}
                    category={course.category}
                    imageUrl={course.imageUrl || course.image}
                  />
                </div>

                {/* Card Body Area */}
                <div className="adm-card-body">
                  <h3 className="adm-card-title" title={course.title}>
                    {course.title}
                  </h3>
                  <p className="adm-card-subtitle">
                    By {course.instructor} • {course.organization}
                  </p>

                  {/* Card Meta Items (Duration, Enrollments, Rating) */}
                  <div className="adm-card-meta-row">
                    <div className="adm-meta-item">
                      <Clock size={14} className="adm-meta-icon" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="adm-meta-item">
                      <Users size={14} className="adm-meta-icon" />
                      <span>{course.enrollments ? course.enrollments.toLocaleString() : 0}</span>
                    </div>
                    <div className="adm-meta-item rating">
                      <Star size={14} className="adm-star-filled" />
                      <span>{course.rating}</span>
                    </div>
                  </div>

                  {/* Card Footer: Action Buttons (Edit, Delete) & View Details */}
                  <div className="adm-card-footer">
                    <div className="adm-card-actions-left">
                      <button
                        type="button"
                        className="adm-card-action-btn edit"
                        onClick={e => {
                          e.stopPropagation();
                          openEditModal(course);
                        }}
                        title="Edit course"
                        aria-label="Edit course"
                      >
                        <Pencil size={13} />
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        className="adm-card-action-btn delete"
                        onClick={e => {
                          e.stopPropagation();
                          setCourseToDelete(course);
                        }}
                        title="Delete course"
                        aria-label="Delete course"
                      >
                        <Trash2 size={13} />
                        <span>Delete</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      className="adm-view-btn"
                      onClick={e => {
                        e.stopPropagation();
                        setSelectedCourse(course);
                      }}
                    >
                      <span>View Details</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List / Table View Mode */
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Category</th>
                <th>Instructor & Organization</th>
                <th>Duration</th>
                <th>Enrollments</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map(course => (
                <tr
                  key={course.id}
                  className="adm-table-row"
                  onClick={() => setSelectedCourse(course)}
                >
                  <td>
                    <div className="adm-table-cell-course">
                      <div className="adm-table-thumb">
                        <CourseBanner
                          type={course.imageType}
                          title={course.title}
                          category={course.category}
                          imageUrl={course.imageUrl || course.image}
                        />
                      </div>
                      <div>
                        <strong>{course.title}</strong>
                        <div className="adm-table-sub">{course.level || "Certificate Track"}</div>
                      </div>
                    </div>
                  </td>
                  <td>{course.category}</td>
                  <td>
                    <strong>{course.instructor}</strong>
                    <div className="adm-table-sub">{course.organization}</div>
                  </td>
                  <td>{course.duration}</td>
                  <td>{course.enrollments?.toLocaleString() || 0}</td>
                  <td>
                    <span className="rating-pill">
                      <Star size={12} className="adm-star-filled" /> {course.rating}
                    </span>
                  </td>
                  <td>
                    <div className={`adm-card-badge status-${(course.status || "").toLowerCase().replace(/\s+/g, "-")}`}>
                      <span className="adm-badge-dot" />
                      <span>{course.status}</span>
                    </div>
                  </td>
                  <td>
                    <div className="adm-table-actions">
                      <button
                        className="adm-view-btn adm-view-btn-sm"
                        onClick={e => {
                          e.stopPropagation();
                          setSelectedCourse(course);
                        }}
                        title="View details"
                      >
                        <Eye size={13} />
                        <span>View</span>
                      </button>
                      <button
                        className="adm-table-action-icon edit"
                        onClick={e => {
                          e.stopPropagation();
                          openEditModal(course);
                        }}
                        title="Edit course"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        className="adm-table-action-icon delete"
                        onClick={e => {
                          e.stopPropagation();
                          setCourseToDelete(course);
                        }}
                        title="Delete course"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {courseToDelete && (
        <div className="adm-modal-overlay" onClick={() => setCourseToDelete(null)}>
          <div className="adm-delete-modal" onClick={e => e.stopPropagation()}>
            <div className="adm-delete-icon-wrap">
              <AlertTriangle size={32} className="adm-delete-icon" />
            </div>
            <h3 className="adm-delete-title">Delete Course</h3>
            <p className="adm-delete-message">
              Are you sure you want to delete <strong>"{courseToDelete.title}"</strong>? This will permanently remove the course and its enrollment records from the platform.
            </p>
            <div className="adm-delete-actions">
              <button className="adm-btn-secondary" onClick={() => setCourseToDelete(null)}>
                Cancel
              </button>
              <button className="adm-btn-danger" onClick={handleConfirmDelete}>
                Yes, Delete Course
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Course Modal */}
      {isModalOpen && (
        <CourseModal
          mode={modalMode}
          formData={formData}
          setFormData={setFormData}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleFormSubmit}
          organizations={organizations}
        />
      )}
    </div>
  );
}

// Modal Form Component
function CourseModal({ mode, formData, setFormData, onClose, onSubmit, organizations }) {
  function handleChange(field, value) {
    setFormData(prev => ({ ...prev, [field]: value }));
  }

  return (
    <div className="adm-modal-overlay" onClick={onClose}>
      <div className="adm-modal-window" onClick={e => e.stopPropagation()}>
        <div className="adm-modal-header">
          <div className="adm-modal-title-group">
            <div className="adm-modal-icon-wrap">
              {mode === "add" ? <Plus size={20} /> : <Pencil size={18} />}
            </div>
            <div>
              <h2 className="adm-modal-heading">{mode === "add" ? "Add New Course" : "Edit Course"}</h2>
              <p className="adm-modal-desc">
                {mode === "add"
                  ? "Configure catalog metadata, instructor, and publication status."
                  : "Update course curriculum, instructor, or status settings."}
              </p>
            </div>
          </div>
          <button className="adm-modal-close" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="adm-modal-form">
          <div className="adm-modal-body">
            <div className="adm-form-grid">
              {/* Title */}
              <div className="adm-form-field full-width">
                <label>Course Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Advanced Java Bootcamp"
                  value={formData.title}
                  onChange={e => handleChange("title", e.target.value)}
                />
              </div>

              {/* Instructor */}
              <div className="adm-form-field">
                <label>Lead Instructor *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. R. Sharma"
                  value={formData.instructor}
                  onChange={e => handleChange("instructor", e.target.value)}
                />
              </div>

              {/* Organization */}
              <div className="adm-form-field">
                <label>Organization / Academy *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tech Academy"
                  value={formData.organization}
                  onChange={e => handleChange("organization", e.target.value)}
                />
              </div>

              {/* Category */}
              <div className="adm-form-field">
                <label>Category *</label>
                <select
                  value={formData.category}
                  onChange={e => handleChange("category", e.target.value)}
                >
                  <option value="Programming">Programming</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Cloud Computing">Cloud Computing</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="Design">Design</option>
                  <option value="Business">Business</option>
                </select>
              </div>

              {/* Status */}
              <div className="adm-form-field">
                <label>Publication Status</label>
                <select
                  value={formData.status}
                  onChange={e => handleChange("status", e.target.value)}
                >
                  <option value="Published">Published</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Pending Review">Pending Review</option>
                </select>
              </div>

              {/* Duration */}
              <div className="adm-form-field">
                <label>Course Duration</label>
                <input
                  type="text"
                  placeholder="e.g. 12 Weeks"
                  value={formData.duration}
                  onChange={e => handleChange("duration", e.target.value)}
                />
              </div>

              {/* Complexity Level */}
              <div className="adm-form-field">
                <label>Complexity Level</label>
                <select
                  value={formData.level}
                  onChange={e => handleChange("level", e.target.value)}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              {/* Enrollments */}
              <div className="adm-form-field">
                <label>Enrollments Count</label>
                <input
                  type="number"
                  min="0"
                  placeholder="e.g. 420"
                  value={formData.enrollments}
                  onChange={e => handleChange("enrollments", e.target.value)}
                />
              </div>

              {/* Rating */}
              <div className="adm-form-field">
                <label>Rating (1.0 - 5.0)</label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  placeholder="e.g. 4.8"
                  value={formData.rating}
                  onChange={e => handleChange("rating", e.target.value)}
                />
              </div>

              {/* Price */}
              <div className="adm-form-field">
                <label>Retail Price</label>
                <input
                  type="text"
                  placeholder="e.g. ₹4,999"
                  value={formData.price}
                  onChange={e => handleChange("price", e.target.value)}
                />
              </div>

              {/* Description */}
              <div className="adm-form-field full-width">
                <label>Course Description</label>
                <textarea
                  rows={3}
                  placeholder="Provide a brief summary of the course syllabus and learning outcomes..."
                  value={formData.description}
                  onChange={e => handleChange("description", e.target.value)}
                />
              </div>

              {/* Prerequisites */}
              <div className="adm-form-field full-width">
                <label>Prerequisites</label>
                <input
                  type="text"
                  placeholder="e.g. Basic programming knowledge, OOP fundamentals"
                  value={formData.prerequisites}
                  onChange={e => handleChange("prerequisites", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="adm-modal-footer">
            <button type="button" className="adm-btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="adm-btn-primary">
              {mode === "add" ? "Create Course" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
