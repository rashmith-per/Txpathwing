import { useState, useMemo, useEffect } from "react";
import { getCategoryForCourse } from "../batchUtils.js";

export function useBatchesState({
  batches = [],
  courses = [],
  onAddBatch,
  onUpdateBatch,
  onDeleteBatch
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState("grouped");
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [formError, setFormError] = useState("");

  const [editMode, setEditMode] = useState(false);
  const [editEnrolled, setEditEnrolled] = useState(0);
  const [editCapacity, setEditCapacity] = useState(100);
  const [editCompletion, setEditCompletion] = useState(0);
  const [editSchedule, setEditSchedule] = useState("");
  const [editStatus, setEditStatus] = useState("Active");

  const [newBatchName, setNewBatchName] = useState("");
  const [newCourseName, setNewCourseName] = useState("Java Full Stack Development");
  const [newSchedule, setNewSchedule] = useState("Mon, Wed, Fri · 6:00 PM – 8:00 PM");
  const [newCapacity, setNewCapacity] = useState("120");

  const availableCourses = useMemo(() => {
    const list = [
      "Java Full Stack Development",
      "AWS DevOps Engineer Professional",
      "React 19 & Next.js Full Stack Engineering",
      "Distributed Microservices & Kubernetes Architecture"
    ];
    if (courses && courses.length > 0) {
      courses.forEach((c) => {
        const title = c.title || c.name;
        if (title && !list.includes(title)) {
          list.push(title);
        }
      });
    }
    return list;
  }, [courses]);

  const processedBatches = useMemo(() => {
    const uniqueMap = new Map();
    batches.forEach((b) => {
      if (!b || !b.id) return;
      const key = (b.name || "").trim().toLowerCase();
      if (!uniqueMap.has(key)) {
        const category = b.category || getCategoryForCourse(b.courseName);
        uniqueMap.set(key, { ...b, category });
      }
    });
    return Array.from(uniqueMap.values());
  }, [batches]);

  const categoriesList = useMemo(() => {
    const set = new Set();
    processedBatches.forEach((b) => {
      if (b.category) set.add(b.category);
    });
    return Array.from(set);
  }, [processedBatches]);

  const filteredBatches = useMemo(() => {
    return processedBatches.filter((b) => {
      const query = search.trim().toLowerCase();
      const matchSearch =
        !query ||
        (b.name + " " + b.courseName + " " + (b.code || "") + " " + (b.category || ""))
          .toLowerCase()
          .includes(query);
      const matchStatus = statusFilter === "All" || b.status === statusFilter;
      const matchCategory = selectedCategory === "All" || b.category === selectedCategory;
      return matchSearch && matchStatus && matchCategory;
    });
  }, [processedBatches, search, statusFilter, selectedCategory]);

  const groupedBatches = useMemo(() => {
    const groups = {};
    filteredBatches.forEach((b) => {
      const cat = b.category || "General";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(b);
    });
    return groups;
  }, [filteredBatches]);

  const activeCount = processedBatches.filter((b) => b.status === "Active").length;
  const totalEnrolled = processedBatches.reduce((sum, b) => sum + (Number(b.enrolled) || 0), 0);
  const totalCapacity = processedBatches.reduce((sum, b) => sum + (Number(b.capacity) || 0), 0);
  const overallFill = totalCapacity > 0 ? Math.round((totalEnrolled / totalCapacity) * 100) : 0;
  const avgProgress =
    processedBatches.length > 0
      ? Math.round(
          processedBatches.reduce((sum, b) => sum + (Number(b.completion) || 0), 0) /
            processedBatches.length
        )
      : 0;
  const totalCategories = categoriesList.length;

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 4500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  useEffect(() => {
    if (selectedBatch) {
      setEditEnrolled(selectedBatch.enrolled || 0);
      setEditCapacity(selectedBatch.capacity || 100);
      setEditCompletion(selectedBatch.completion || 0);
      setEditSchedule(selectedBatch.schedule || "");
      setEditStatus(selectedBatch.status || "Active");
      setEditMode(false);
    }
  }, [selectedBatch]);

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    const trimmedName = newBatchName.trim();
    if (!trimmedName) {
      setFormError("Please enter a Batch Name.");
      return;
    }

    const isDuplicate = processedBatches.some(
      (b) => b.name.trim().toLowerCase() === trimmedName.toLowerCase()
    );
    if (isDuplicate) {
      setFormError(`A batch named "${trimmedName}" already exists. Duplicate batches are not stored.`);
      return;
    }

    setFormError("");
    const category = getCategoryForCourse(newCourseName);

    const initials = newCourseName
      .split(" ")
      .filter((w) => !["and", "&", "in", "the", "for", "of"].includes(w.toLowerCase()))
      .map((w) => w[0].toUpperCase())
      .slice(0, 3)
      .join("");
    const yearMatch = trimmedName.match(/20\d{2}/);
    const year = yearMatch ? yearMatch[0].slice(-2) : "27";

    let codeCandidate = `${initials || "BAT"}-${year}A`;
    let letterIndex = 0;
    while (processedBatches.some((b) => b.code === codeCandidate)) {
      letterIndex++;
      codeCandidate = `${initials || "BAT"}-${year}${String.fromCharCode(65 + letterIndex)}`;
    }

    const newBatchItem = {
      id: `batch-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name: trimmedName,
      code: codeCandidate,
      courseId: `crs-${Date.now()}`,
      courseName: newCourseName,
      category: category,
      schedule: newSchedule.trim() || "Mon, Wed, Fri · 6:00 PM – 8:00 PM",
      enrolled: 0,
      capacity: Number(newCapacity) || 120,
      startDate: "Starts Nov 2026",
      endDate: "Ends Feb 2027",
      status: "Active",
      completion: 0,
      createdAt: new Date().toISOString()
    };

    if (onAddBatch) {
      onAddBatch(newBatchItem);
    }

    setNewBatchName("");
    setNewCourseName("Java Full Stack Development");
    setNewSchedule("Mon, Wed, Fri · 6:00 PM – 8:00 PM");
    setNewCapacity("120");
    setShowCreateModal(false);
    setToastMessage(`✓ Batch "${newBatchItem.name}" successfully created and saved in category "${category}"!`);

    if (selectedCategory !== "All" && selectedCategory !== category) {
      setSelectedCategory("All");
    }
  };

  const handleSaveBatchEdits = () => {
    if (!selectedBatch) return;
    const updated = {
      ...selectedBatch,
      enrolled: Number(editEnrolled) || 0,
      capacity: Number(editCapacity) || 100,
      completion: Number(editCompletion) || 0,
      schedule: editSchedule.trim() || selectedBatch.schedule,
      status: editStatus
    };

    if (onUpdateBatch) {
      onUpdateBatch(updated);
    }
    setSelectedBatch(updated);
    setEditMode(false);
    setToastMessage(`Updated details for batch "${updated.name}"!`);
  };

  const handleDelete = (batchId, batchName) => {
    if (window.confirm(`Are you sure you want to delete "${batchName}"?`)) {
      if (onDeleteBatch) {
        onDeleteBatch(batchId);
      }
      if (selectedBatch && selectedBatch.id === batchId) {
        setSelectedBatch(null);
      }
      setToastMessage(`Deleted batch "${batchName}".`);
    }
  };

  return {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    selectedCategory,
    setSelectedCategory,
    viewMode,
    setViewMode,
    selectedBatch,
    setSelectedBatch,
    showCreateModal,
    setShowCreateModal,
    toastMessage,
    setToastMessage,
    formError,
    setFormError,
    editMode,
    setEditMode,
    editEnrolled,
    setEditEnrolled,
    editCapacity,
    setEditCapacity,
    editCompletion,
    setEditCompletion,
    editSchedule,
    setEditSchedule,
    editStatus,
    setEditStatus,
    newBatchName,
    setNewBatchName,
    newCourseName,
    setNewCourseName,
    newSchedule,
    setNewSchedule,
    newCapacity,
    setNewCapacity,
    availableCourses,
    processedBatches,
    categoriesList,
    filteredBatches,
    groupedBatches,
    activeCount,
    totalEnrolled,
    overallFill,
    avgProgress,
    totalCategories,
    handleCreateSubmit,
    handleSaveBatchEdits,
    handleDelete
  };
}
