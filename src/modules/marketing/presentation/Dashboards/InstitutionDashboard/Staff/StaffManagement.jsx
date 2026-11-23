import { useState, useEffect, useCallback } from "react";
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
import { staffApi } from "./services/staffApi.js";
import { STAFF_ROLES, STAFF_PERMISSIONS, StaffRoleModel } from "./backend/models/StaffRoleModel.js";
import "./Staff.css";

export default function StaffManagement({ search: globalSearch = "", showMessage }) {
  // Active RBAC Role for simulation/testing
  const [activeRole, setActiveRole] = useState(() => {
    try {
      return localStorage.getItem("tx_active_staff_test_role") || STAFF_ROLES.INSTITUTION_ADMIN;
    } catch {
      return STAFF_ROLES.INSTITUTION_ADMIN;
    }
  });

  // Data & State
  const [staffList, setStaffList] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    total: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const [dataVersion, setDataVersion] = useState(0);

  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editStaff, setEditStaff] = useState(null);
  const [viewStaff, setViewStaff] = useState(null);
  const [statusStaff, setStatusStaff] = useState(null);
  const [deleteStaff, setDeleteStaff] = useState(null);

  const effectiveSearch = filters.search || globalSearch;

  // Fetch statistics
  const fetchStatistics = useCallback(async () => {
    try {
      const res = await staffApi.getStaffStatistics();
      if (res && res.data) {
        setStats(res.data);
      }
    } catch (err) {
      console.warn("Could not load staff statistics:", err);
    }
  }, []);

  // Load directory data
  useEffect(() => {
    let isCurrent = true;

    async function loadData() {
      setLoading(true);
      setError(null);

      try {
        const res = await staffApi.getStaffList({
          search: effectiveSearch,
          department: filters.department === "All" ? "" : filters.department,
          designation: filters.designation === "All" ? "" : filters.designation,
          employmentType: filters.employmentType === "All" ? "" : filters.employmentType,
          status: filters.status === "All" ? "" : filters.status,
          category: filters.category === "All" ? "" : filters.category,
          sortField,
          sortDirection,
          page: pagination.page,
          limit: pagination.limit,
        });

        if (isCurrent && res && res.data) {
          setStaffList(res.data);
          if (res.pagination) {
            setPagination(res.pagination);
          }
        }
      } catch (err) {
        if (isCurrent) {
          setError(err.message || "Failed to fetch staff members.");
        }
      } finally {
        if (isCurrent) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isCurrent = false;
    };
  }, [
    effectiveSearch,
    filters.department,
    filters.designation,
    filters.employmentType,
    filters.status,
    filters.category,
    sortField,
    sortDirection,
    pagination.page,
    pagination.limit,
    dataVersion,
  ]);

  // Load stats once and on external directory updates
  useEffect(() => {
    let mounted = true;
    const refreshStats = async () => {
      try {
        const res = await staffApi.getStaffStatistics();
        if (mounted && res?.data) {
          setStats(res.data);
        }
      } catch (err) {
        console.warn("Could not load staff statistics:", err);
      }
    };

    refreshStats();

    const handleUpdate = () => {
      refreshStats();
      setDataVersion((v) => v + 1);
    };

    window.addEventListener("institution_staff_updated", handleUpdate);
    window.addEventListener("staff_record_created", handleUpdate);
    window.addEventListener("staff_record_updated", handleUpdate);
    window.addEventListener("staff_status_changed", handleUpdate);
    window.addEventListener("staff_record_deleted", handleUpdate);

    return () => {
      mounted = false;
      window.removeEventListener("institution_staff_updated", handleUpdate);
      window.removeEventListener("staff_record_created", handleUpdate);
      window.removeEventListener("staff_record_updated", handleUpdate);
      window.removeEventListener("staff_status_changed", handleUpdate);
      window.removeEventListener("staff_record_deleted", handleUpdate);
    };
  }, []);

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
  const handleRoleSelect = (newRole, dept = null) => {
    setActiveRole(newRole);
    try {
      localStorage.setItem("tx_active_staff_test_role", newRole);
      if (dept) {
        localStorage.setItem("tx_active_staff_test_dept", dept);
      } else {
        localStorage.removeItem("tx_active_staff_test_dept");
      }
    } catch (err) {
      console.warn("Failed to store simulation test role:", err);
    }
    const roleDef = StaffRoleModel.getRole(newRole);
    showMessage(`Switched RBAC simulation role to: ${roleDef.name}`);
    setDataVersion((v) => v + 1);
  };

  // Action: Add Staff
  const handleSaveNewStaff = async (formData) => {
    const res = await staffApi.createStaff(formData);
    showMessage(`Staff member ${formData.name} successfully enrolled!`);
    setDataVersion((v) => v + 1);
    fetchStatistics();
    return res;
  };

  // Action: Edit Staff
  const handleSaveEditStaff = async (id, formData) => {
    const res = await staffApi.updateStaff(id, formData);
    showMessage(`Staff profile for ${formData.name} updated successfully!`);
    setDataVersion((v) => v + 1);
    fetchStatistics();
    if (viewStaff && viewStaff.id === id) {
      setViewStaff(res.data);
    }
    return res;
  };

  // Action: Status Change
  const handleConfirmStatusChange = async (id, newStatus, reason) => {
    const res = await staffApi.updateStaffStatus(id, newStatus, reason);
    showMessage(`Status for ${statusStaff.name} updated to ${newStatus}.`);
    setDataVersion((v) => v + 1);
    fetchStatistics();
    return res;
  };

  // Action: Delete Staff
  const handleConfirmDelete = async (id) => {
    const staffName = deleteStaff?.name || "Staff member";
    const res = await staffApi.deleteStaff(id);
    showMessage(`${staffName} was successfully deleted from registry.`);
    setDataVersion((v) => v + 1);
    fetchStatistics();
    return res;
  };

  // Action: Export CSV
  const handleExportCsv = async () => {
    try {
      const allStaff = await staffApi.getStaffList({ limit: 1000 });
      if (!allStaff?.data?.length) {
        showMessage("No staff records available for CSV export.");
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
        ...allStaff.data.map((s) =>
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

      showMessage("Staff directory CSV export downloaded.");
    } catch (err) {
      showMessage(`Export failed: ${err.message}`);
    }
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
          onClick={() => {
            fetchStatistics();
            setDataVersion((v) => v + 1);
            showMessage("Staff directory refreshed.");
          }}
          title="Refresh staff records"
        >
          <RefreshCw size={15} />
          <span>Refresh</span>
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
        staffList={staffList}
        loading={loading}
        error={error}
        pagination={pagination}
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
        onRetry={() => setDataVersion((v) => v + 1)}
        currentUserRole={activeRole}
      />

      {/* Modals */}
      <AddStaffModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSave={handleSaveNewStaff}
      />

      <EditStaffModal
        isOpen={Boolean(editStaff)}
        staff={editStaff}
        onClose={() => setEditStaff(null)}
        onSave={handleSaveEditStaff}
      />

      <StaffProfileModal
        isOpen={Boolean(viewStaff)}
        staff={viewStaff}
        onClose={() => setViewStaff(null)}
        onEdit={(staff) => setEditStaff(staff)}
        canEdit={canEditStaff()}
      />

      <StaffStatusModal
        isOpen={Boolean(statusStaff)}
        staff={statusStaff}
        onClose={() => setStatusStaff(null)}
        onConfirm={handleConfirmStatusChange}
      />

      <StaffDeleteModal
        isOpen={Boolean(deleteStaff)}
        staff={deleteStaff}
        onClose={() => setDeleteStaff(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
