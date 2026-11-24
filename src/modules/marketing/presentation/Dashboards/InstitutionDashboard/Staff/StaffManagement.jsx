import { useState, useMemo } from "react";
import { UserPlus, RefreshCw } from "lucide-react";
import PageHeading from "../Layout/PageHeading.jsx";
import StaffOverview from "./components/StaffOverview.jsx";
import StaffDirectory from "./components/StaffDirectory.jsx";
import AddStaffModal from "./components/AddStaffModal.jsx";
import EditStaffModal from "./components/EditStaffModal.jsx";
import StaffProfileModal from "./components/StaffProfileModal.jsx";
import StaffStatusModal from "./components/StaffStatusModal.jsx";
import StaffDeleteModal from "./components/StaffDeleteModal.jsx";
import StaffRoleSwitcher from "./components/StaffRoleSwitcher.jsx";
import {
  initialStaffRecords,
  STAFF_ROLES,
  STAFF_PERMISSIONS,
  StaffRoleModel
} from "./staffData.js";
import "./Staff.css";

export default function StaffManagement({ search: globalSearch = "", showMessage }) {
  // Active RBAC Role for simulation/testing (pure local state)
  const [activeRole, setActiveRole] = useState(STAFF_ROLES.INSTITUTION_ADMIN);

  // In-memory staff list initialized from static mock records
  const [staffList, setStaffList] = useState(() => initialStaffRecords);

  // Filter & Pagination State
  const [filters, setFilters] = useState({
    search: "",
    department: "All",
    designation: "All",
    employmentType: "All",
    status: "All",
    category: "All",
  });

  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });

  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editStaff, setEditStaff] = useState(null);
  const [viewStaff, setViewStaff] = useState(null);
  const [statusStaff, setStatusStaff] = useState(null);
  const [deleteStaff, setDeleteStaff] = useState(null);

  const effectiveSearch = (filters.search || globalSearch).trim().toLowerCase();

  // Dynamic statistics calculated in-memory
  const stats = useMemo(() => {
    return {
      totalStaff: staffList.length,
      activeStaff: staffList.filter((s) => s.status === "Active").length,
      inactiveStaff: staffList.filter((s) => s.status === "Inactive").length,
      teachingStaff: staffList.filter((s) => s.category === "Teaching").length,
      nonTeachingStaff: staffList.filter((s) => s.category === "Non-Teaching").length,
      onLeaveStaff: staffList.filter((s) => s.status === "On Leave").length,
    };
  }, [staffList]);

  // In-memory filtered and sorted staff list
  const filteredStaff = useMemo(() => {
    let result = staffList.filter((s) => {
      const nameMatch = (s.name || "").toLowerCase().includes(effectiveSearch);
      const emailMatch = (s.email || "").toLowerCase().includes(effectiveSearch);
      const idMatch = (s.staffId || "").toLowerCase().includes(effectiveSearch);
      const matchesSearch = !effectiveSearch || nameMatch || emailMatch || idMatch;

      const matchesDept = filters.department === "All" || s.department === filters.department;
      const matchesDesig = filters.designation === "All" || s.designation === filters.designation;
      const matchesEmp = filters.employmentType === "All" || s.employmentType === filters.employmentType;
      const matchesStatus = filters.status === "All" || s.status === filters.status;
      const matchesCat = filters.category === "All" || s.category === filters.category;

      return matchesSearch && matchesDept && matchesDesig && matchesEmp && matchesStatus && matchesCat;
    });

    result.sort((a, b) => {
      const valA = (a[sortField] || "").toString().toLowerCase();
      const valB = (b[sortField] || "").toString().toLowerCase();
      if (valA < valB) return sortDirection === "asc" ? -1 : 1;
      if (valA > valB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [staffList, effectiveSearch, filters, sortField, sortDirection]);

  // Paginated slice
  const paginatedStaff = useMemo(() => {
    const start = (pagination.page - 1) * pagination.limit;
    return filteredStaff.slice(start, start + pagination.limit);
  }, [filteredStaff, pagination.page, pagination.limit]);

  const totalPages = Math.max(1, Math.ceil(filteredStaff.length / pagination.limit));

  const paginationMeta = {
    page: pagination.page,
    limit: pagination.limit,
    total: filteredStaff.length,
    totalPages,
    hasNextPage: pagination.page < totalPages,
    hasPrevPage: pagination.page > 1,
  };

  // Filter Handlers
  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: "",
      department: "All",
      designation: "All",
      employmentType: "All",
      status: "All",
      category: "All",
    });
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleCardFilterClick = (filterType, filterValue) => {
    if (filterType === "all") {
      handleResetFilters();
    } else if (filterType === "status") {
      setFilters((prev) => ({
        ...prev,
        status: prev.status === filterValue ? "All" : filterValue,
        category: "All",
      }));
      setPagination((prev) => ({ ...prev, page: 1 }));
    } else if (filterType === "category") {
      setFilters((prev) => ({
        ...prev,
        category: prev.category === filterValue ? "All" : filterValue,
        status: "All",
      }));
      setPagination((prev) => ({ ...prev, page: 1 }));
    }
  };

  // Sorting Handler
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  // Role Simulator
  const handleRoleSelect = (newRole) => {
    setActiveRole(newRole);
    const roleDef = StaffRoleModel.getRole(newRole);
    if (showMessage) showMessage(`Switched RBAC simulation role to: ${roleDef.name}`);
  };

  // Action: Add Staff (pure local state)
  const handleSaveNewStaff = (formData) => {
    const newStaff = {
      id: `stf_${Date.now()}`,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      ...formData,
      activityLogs: [
        {
          id: `log_${Date.now()}`,
          timestamp: new Date().toISOString(),
          action: "STAFF_CREATED",
          actorName: "Institution Admin",
          details: "Staff record enrolled into institution registry",
        },
      ],
    };

    setStaffList((prev) => [newStaff, ...prev]);
    if (showMessage) showMessage(`Staff member ${formData.name} successfully enrolled!`);
  };

  // Action: Edit Staff (pure local state)
  const handleSaveEditStaff = (formData) => {
    if (!editStaff) return;
    const updated = {
      ...editStaff,
      ...formData,
    };

    setStaffList((prev) =>
      prev.map((s) => (s.id === editStaff.id ? updated : s))
    );

    if (viewStaff && viewStaff.id === editStaff.id) {
      setViewStaff(updated);
    }

    if (showMessage) showMessage(`Staff profile for ${formData.name} updated successfully!`);
  };

  // Action: Status Change (pure local state)
  const handleConfirmStatusChange = (id, newStatus, reason) => {
    setStaffList((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        const newLog = {
          id: `log_${Date.now()}`,
          timestamp: new Date().toISOString(),
          action: "STATUS_CHANGED",
          actorName: "Institution Admin",
          details: `Status updated to ${newStatus}.${reason ? ` Reason: ${reason}` : ""}`,
        };
        return {
          ...s,
          status: newStatus,
          activityLogs: [newLog, ...(s.activityLogs || [])],
        };
      })
    );

    if (viewStaff && viewStaff.id === id) {
      setViewStaff((prev) => prev ? { ...prev, status: newStatus } : null);
    }

    if (showMessage) showMessage(`Status for ${statusStaff?.name || "Staff member"} updated to ${newStatus}.`);
  };

  // Action: Delete Staff (pure local state)
  const handleConfirmDelete = (id) => {
    const staffName = deleteStaff?.name || "Staff member";
    setStaffList((prev) => prev.filter((s) => s.id !== id));
    if (viewStaff && viewStaff.id === id) {
      setViewStaff(null);
    }
    if (showMessage) showMessage(`${staffName} was successfully deleted from registry.`);
  };

  // Action: Export CSV
  const handleExportCsv = () => {
    if (!staffList.length) {
      if (showMessage) showMessage("No staff records available for CSV export.");
      return;
    }

    const headers = [
      "Staff ID",
      "Full Name",
      "Email",
      "Phone",
      "Department",
      "Designation",
      "Employment Type",
      "Category",
      "Joining Date",
      "Status",
      "Role",
    ];

    const csvRows = [
      headers.join(","),
      ...filteredStaff.map((s) =>
        [
          `"${s.staffId}"`,
          `"${s.name}"`,
          `"${s.email}"`,
          `"${s.phone}"`,
          `"${s.department}"`,
          `"${s.designation}"`,
          `"${s.employmentType}"`,
          `"${s.category}"`,
          `"${s.joiningDate}"`,
          `"${s.status}"`,
          `"${s.roleName || s.role}"`,
        ].join(",")
      ),
    ];

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `KITS_Warangal_Staff_Registry_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (showMessage) showMessage("Staff directory CSV export downloaded.");
  };

  const handleResetToDefaults = () => {
    setStaffList(initialStaffRecords);
    handleResetFilters();
    if (showMessage) showMessage("Staff records reset to initial sample state.");
  };

  const canAddStaff = StaffRoleModel.hasPermission(activeRole, STAFF_PERMISSIONS.STAFF_CREATE);
  const canEditStaff = () =>
    StaffRoleModel.hasPermission(activeRole, STAFF_PERMISSIONS.STAFF_EDIT);

  return (
    <div className="staff-management-page">
      {/* Page Heading with Action Buttons */}
      <PageHeading
        eyebrow="PEOPLE · WORKFORCE"
        title="Staff Management"
        description="Oversee faculty directories, department assignments, employment status, and access roles."
      >
        <button
          type="button"
          className="secondary-action"
          onClick={handleResetToDefaults}
          title="Reset staff records"
        >
          <RefreshCw size={15} />
          <span>Reset Sample Data</span>
        </button>

        {canAddStaff && (
          <button
            type="button"
            className="primary-action"
            onClick={() => setIsAddOpen(true)}
            title="Enroll a new staff member"
          >
            <UserPlus size={16} />
            <span>Add New Staff</span>
          </button>
        )}
      </PageHeading>

      {/* Role Switcher for Testing/Demonstrating RBAC */}
      <StaffRoleSwitcher
        activeRole={activeRole}
        onRoleSelect={handleRoleSelect}
      />

      {/* Dynamic Summary Cards */}
      <StaffOverview
        stats={stats}
        activeFilter={filters}
        onCardFilterClick={handleCardFilterClick}
      />

      {/* Main Staff Directory Table & Toolbar */}
      <StaffDirectory
        staffList={paginatedStaff}
        loading={false}
        error={null}
        pagination={paginationMeta}
        filters={{ ...filters, search: effectiveSearch }}
        sortField={sortField}
        sortDirection={sortDirection}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        onSort={handleSort}
        onPageChange={(p) => setPagination((prev) => ({ ...prev, page: p }))}
        onLimitChange={(lim) => setPagination((prev) => ({ ...prev, limit: lim, page: 1 }))}
        onView={(staff) => setViewStaff(staff)}
        onEdit={(staff) => setEditStaff(staff)}
        onStatusChange={(staff) => setStatusStaff(staff)}
        onDelete={(staff) => setDeleteStaff(staff)}
        onExportCsv={handleExportCsv}
        onRetry={handleResetToDefaults}
        currentUserRole={activeRole}
      />

      {/* Modals */}
      <AddStaffModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSave={handleSaveNewStaff}
      />

      <EditStaffModal
        key={editStaff?.id}
        isOpen={Boolean(editStaff)}
        staff={editStaff}
        onClose={() => setEditStaff(null)}
        onSave={handleSaveEditStaff}
      />

      <StaffProfileModal
        key={viewStaff?.id}
        isOpen={Boolean(viewStaff)}
        staff={viewStaff}
        onClose={() => setViewStaff(null)}
        onEdit={(staff) => setEditStaff(staff)}
        canEdit={canEditStaff()}
      />

      <StaffStatusModal
        key={statusStaff?.id}
        isOpen={Boolean(statusStaff)}
        staff={statusStaff}
        onClose={() => setStatusStaff(null)}
        onConfirm={handleConfirmStatusChange}
      />

      <StaffDeleteModal
        key={deleteStaff?.id}
        isOpen={Boolean(deleteStaff)}
        staff={deleteStaff}
        onClose={() => setDeleteStaff(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
