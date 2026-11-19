import React, { useMemo, useState } from "react";
import "./Courses.css";
import { BookOpen, Plus, Search } from "lucide-react";
import { SAMPLE_COURSES_DATA, INITIAL_FORM } from "./coursesData";
import { CourseCardGrid } from "./components/CourseCardGrid";
import { CourseTableView } from "./components/CourseTableView";
import { CourseDetailView } from "./components/CourseDetailView";
import { CourseModal } from "./components/CourseModal";
import { CoursesToolbar } from "./components/CoursesToolbar";
import { CourseDeleteModal } from "./components/CourseDeleteModal";

export { SAMPLE_COURSES_DATA };

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
  const [viewMode, setViewMode] = useState("grid");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [courseToDelete, setCourseToDelete] = useState(null);

  const organizations = useMemo(() => {
    return Array.from(new Set(courses.map((c) => c.organization).filter(Boolean)));
  }, [courses]);

  const filteredCourses = useMemo(() => {
    return courses
      .filter((course) => {
        const query = search.trim().toLowerCase();
        const matchesSearch =
          !query ||
          course.title.toLowerCase().includes(query) ||
          course.instructor.toLowerCase().includes(query) ||
          course.category.toLowerCase().includes(query) ||
          course.organization.toLowerCase().includes(query);

        const matchesOrg = selectedOrg === "all" || course.organization === selectedOrg;
        const matchesStatus =
          selectedStatus === "all" ||
          (course.status && course.status.toLowerCase() === selectedStatus.toLowerCase());

        return matchesSearch && matchesOrg && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === "popular") return (b.enrollments || 0) - (a.enrollments || 0);
        if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
        if (sortBy === "title") return a.title.localeCompare(b.title);
        return 0;
      });
  }, [courses, search, selectedOrg, selectedStatus, sortBy]);

  function openAddModal() {
    setModalMode("add");
    setFormData({ ...INITIAL_FORM, id: `crs-${Date.now()}` });
    setIsModalOpen(true);
  }

  function openEditModal(course) {
    setModalMode("edit");
    setFormData({
      id: course.id,
      title: course.title,
      instructor: course.instructor,
      organization: course.organization,
      category: course.category,
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
      modulesCount: course.modulesCount || 12,
      syllabus: course.syllabus || []
    });
    setIsModalOpen(true);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    if (modalMode === "add") {
      const newCourse = {
        ...formData,
        id: `crs-${Date.now()}`,
        enrollments: Number(formData.enrollments) || 0,
        rating: Number(formData.rating) || 4.8,
        submittedDate: "Today",
        slaWindow: "48 Hours",
        slaStatus: "Approved",
        syllabus: [
          "1. Core Concepts & Foundations",
          "2. Architecture & Design Patterns",
          "3. Advanced Implementation & Testing",
          "4. Real-World Capstone Project"
        ]
      };
      setCourses((prev) => [newCourse, ...prev]);
      if (setNotice) setNotice(`Course "${newCourse.title}" has been successfully added.`);
    } else {
      setCourses((prev) =>
        prev.map((c) =>
          c.id === formData.id
            ? { ...c, ...formData, enrollments: Number(formData.enrollments) || c.enrollments, rating: Number(formData.rating) || c.rating }
            : c
        )
      );
      if (selectedCourse && selectedCourse.id === formData.id) {
        setSelectedCourse((prev) => ({ ...prev, ...formData }));
      }
      if (setNotice) setNotice(`Course "${formData.title}" updated successfully.`);
    }
    setIsModalOpen(false);
  }

  function handleConfirmDelete() {
    if (!courseToDelete) return;
    setCourses((prev) => prev.filter((c) => c.id !== courseToDelete.id));
    if (selectedCourse && selectedCourse.id === courseToDelete.id) {
      setSelectedCourse(null);
    }
    if (setNotice) setNotice(`Course "${courseToDelete.title}" deleted.`);
    setCourseToDelete(null);
  }

  function handlePublish(courseId) {
    setCourses((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, status: "Published", slaStatus: "Approved" } : c))
    );
    if (selectedCourse && selectedCourse.id === courseId) {
      setSelectedCourse((prev) => ({ ...prev, status: "Published", slaStatus: "Approved" }));
    }
    if (setNotice) setNotice("Course approved and published to catalog.");
  }

  function handleUnpublish(courseId) {
    setCourses((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, status: "Upcoming", slaStatus: "Unpublished" } : c))
    );
    if (selectedCourse && selectedCourse.id === courseId) {
      setSelectedCourse((prev) => ({ ...prev, status: "Upcoming", slaStatus: "Unpublished" }));
    }
    if (setNotice) setNotice("Course moved to Upcoming.");
  }

  function handleAssignReviewer(courseId, reviewer) {
    setCourses((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, assignedReviewer: reviewer } : c))
    );
    if (selectedCourse && selectedCourse.id === courseId) {
      setSelectedCourse((prev) => ({ ...prev, assignedReviewer: reviewer }));
    }
    if (setNotice) setNotice(`Reviewer "${reviewer}" assigned to course.`);
  }

  if (selectedCourse) {
    return (
      <div className="adm-detail-container">
        <CourseDetailView
          course={selectedCourse}
          onBack={() => setSelectedCourse(null)}
          onEdit={openEditModal}
          onDelete={setCourseToDelete}
          onPublish={handlePublish}
          onUnpublish={handleUnpublish}
          onOpenModeration={() => setPage("Moderation")}
          onAssignReviewer={handleAssignReviewer}
        />
        <CourseDeleteModal
          course={courseToDelete}
          onCancel={() => setCourseToDelete(null)}
          onConfirm={handleConfirmDelete}
        />
        {isModalOpen && (
          <CourseModal
            mode={modalMode}
            formData={formData}
            setFormData={setFormData}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleFormSubmit}
          />
        )}
      </div>
    );
  }

  return (
    <div className="adm-courses-page">
      <CoursesToolbar
        search={search}
        setSearch={setSearch}
        selectedOrg={selectedOrg}
        setSelectedOrg={setSelectedOrg}
        organizations={organizations}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        sortBy={sortBy}
        setSortBy={setSortBy}
        viewMode={viewMode}
        setViewMode={setViewMode}
        openAddModal={openAddModal}
      />

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
        <CourseCardGrid
          courses={filteredCourses}
          onSelect={setSelectedCourse}
          onSelectCourse={setSelectedCourse}
          onEdit={openEditModal}
          onEditCourse={openEditModal}
          onDelete={setCourseToDelete}
          onDeleteCourse={setCourseToDelete}
        />
      ) : (
        <CourseTableView
          courses={filteredCourses}
          onSelect={setSelectedCourse}
          onSelectCourse={setSelectedCourse}
          onEdit={openEditModal}
          onEditCourse={openEditModal}
          onDelete={setCourseToDelete}
          onDeleteCourse={setCourseToDelete}
        />
      )}

      <CourseDeleteModal
        course={courseToDelete}
        onCancel={() => setCourseToDelete(null)}
        onConfirm={handleConfirmDelete}
      />

      {isModalOpen && (
        <CourseModal
          mode={modalMode}
          formData={formData}
          setFormData={setFormData}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
}
