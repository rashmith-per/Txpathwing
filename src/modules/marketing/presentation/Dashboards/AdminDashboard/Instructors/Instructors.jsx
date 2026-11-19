import React, { useMemo, useState } from "react";
import "./Instructors.css";
import { GraduationCap, Plus, SearchX } from "lucide-react";
import { InstructorMetrics } from "./components/InstructorMetrics";
import { AddInstructorForm } from "./components/AddInstructorForm";
import { InstructorDetailView } from "./components/InstructorDetailView";
import { InstructorToolbar } from "./components/InstructorToolbar";
import { InstructorGridView } from "./components/InstructorGridView";
import { InstructorTableView } from "./components/InstructorTableView";

export function Instructors({
  instructors,
  setInstructors,
  setNotice,
  setPage
}) {
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [search, setSearch] = useState("");
  const [domainFilter, setDomainFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewMode, setViewMode] = useState("grid"); // "grid" (Design Box) | "list" (Table)
  const [showAddForm, setShowAddForm] = useState(false);

  const filtered = useMemo(() => {
    return instructors.filter(inst => {
      const query = search.trim().toLowerCase();
      const matchSearch =
        !query ||
        `${inst.name} ${inst.email} ${inst.organization} ${inst.domain} ${inst.specialization || ""} ${inst.city || ""}`
          .toLowerCase()
          .includes(query);
      const matchDomain = domainFilter === "All" || inst.domain === domainFilter;
      const matchStatus = statusFilter === "All" || inst.status === statusFilter;
      return matchSearch && matchDomain && matchStatus;
    });
  }, [instructors, search, domainFilter, statusFilter]);

  function handleAddInstructor(newInst) {
    setInstructors(prev => [newInst, ...prev]);
    setShowAddForm(false);
    if (setNotice) setNotice(`Instructor "${newInst.name}" has been successfully added.`);
  }

  function handleToggleStatus(instId) {
    setInstructors(prev =>
      prev.map(i => {
        if (i.id === instId) {
          const updated = {
            ...i,
            status: i.status === "Active" ? "Inactive" : "Active"
          };
          if (selectedInstructor && selectedInstructor.id === instId) {
            setSelectedInstructor(updated);
          }
          return updated;
        }
        return i;
      })
    );
    if (setNotice) setNotice("Instructor status updated.");
  }

  function handleDeleteInstructor(instId) {
    const inst = instructors.find(i => i.id === instId);
    setInstructors(prev => prev.filter(i => i.id !== instId));
    if (selectedInstructor && selectedInstructor.id === instId) {
      setSelectedInstructor(null);
    }
    if (setNotice) setNotice(`Instructor "${inst?.name || "record"}" has been deleted.`);
  }

  return (
    <>
      {/* 1. Top Metrics Grid */}
      <InstructorMetrics instructors={instructors} />

      {/* 2. Add Instructor Inline Form */}
      {showAddForm && (
        <AddInstructorForm
          onAdd={handleAddInstructor}
          onClose={() => setShowAddForm(false)}
        />
      )}

      {/* 3. Detail View or Directory Content */}
      {selectedInstructor ? (
        <InstructorDetailView
          instructor={selectedInstructor}
          onBack={() => setSelectedInstructor(null)}
          onToggleStatus={handleToggleStatus}
          onDelete={handleDeleteInstructor}
          onNavigateCourses={() => setPage("Courses")}
        />
      ) : (
        <>
          {/* Toolbar: Filters & View Switcher */}
          <InstructorToolbar
            search={search}
            setSearch={setSearch}
            domainFilter={domainFilter}
            setDomainFilter={setDomainFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            viewMode={viewMode}
            setViewMode={setViewMode}
            onOpenAddForm={() => setShowAddForm(true)}
          />

          {/* Directory Content Area */}
          {instructors.length === 0 ? (
            <div className="inst-empty-container">
              <div className="inst-empty-icon-circle">
                <GraduationCap size={36} />
              </div>
              <h3 className="inst-empty-title">No instructors added yet</h3>
              <p className="inst-empty-desc">
                The instructor directory is currently empty. Click the button below to register and save your first faculty instructor.
              </p>
              <button className="inst-add-btn" onClick={() => setShowAddForm(true)}>
                <Plus size={16} />
                <span>Add Instructor</span>
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="inst-empty-container">
              <SearchX size={36} style={{ color: "#94a3b8" }} />
              <h3 className="inst-empty-title">No matching instructors found</h3>
              <p className="inst-empty-desc">No faculty records match your current search or filter criteria.</p>
              <button
                className="inst-action-btn toggle"
                style={{ border: "1px solid #cbd5e1", padding: "8px 16px" }}
                onClick={() => {
                  setSearch("");
                  setDomainFilter("All");
                  setStatusFilter("All");
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : viewMode === "grid" ? (
            <InstructorGridView
              instructors={filtered}
              onSelect={setSelectedInstructor}
              onDelete={handleDeleteInstructor}
              onToggleStatus={handleToggleStatus}
            />
          ) : (
            <InstructorTableView
              instructors={filtered}
              onSelect={setSelectedInstructor}
              onDelete={handleDeleteInstructor}
            />
          )}
        </>
      )}
    </>
  );
}
