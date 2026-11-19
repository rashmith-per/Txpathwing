import React, { useMemo, useState } from "react";
import "./Tenants.css";
import { TenantMetrics } from "./components/TenantMetrics";
import { AddTenantForm } from "./components/AddTenantForm";
import { TenantDetailView } from "./components/TenantDetailView";
import { TenantTableView } from "./components/TenantTableView";

export function Tenants({
  tenants,
  setTenants,
  selectedTenant,
  setSelectedTenant,
  setNotice
}) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showOnboard, setShowOnboard] = useState(false);

  const filtered = useMemo(() => {
    return tenants.filter(t => {
      const matchSearch = `${t.name} ${t.type} ${t.domain} ${t.status} ${t.contactName || ""} ${t.city || ""}`
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchType = typeFilter === "All" || t.type === typeFilter;
      const matchStatus = statusFilter === "All" || t.status === statusFilter;
      return matchSearch && matchType && matchStatus;
    });
  }, [tenants, search, typeFilter, statusFilter]);

  function handleCreateTenant(newTenant) {
    setTenants(prev => [newTenant, ...prev]);
    setSelectedTenant(newTenant);
    setShowOnboard(false);
    setNotice(`Organization "${newTenant.name}" registered successfully in Onboarding status.`);
  }

  function handleApproveOnboarding(tenantId) {
    setTenants(prev =>
      prev.map(t => {
        if (t.id === tenantId) {
          const updated = {
            ...t,
            status: "Active",
            onboardingProgress: 100,
            domain: t.domain.includes("Provisioning") ? `${t.name.toLowerCase().replace(/[^a-z0-9]/g, "")}.pathwing.in` : t.domain
          };
          if (selectedTenant && selectedTenant.id === tenantId) {
            setSelectedTenant(updated);
          }
          return updated;
        }
        return t;
      })
    );
    setNotice(`Onboarding approved for ${selectedTenant?.name || "organization"}. Access provisioned.`);
  }

  function handleExpandSeats(tenantId) {
    setTenants(prev =>
      prev.map(t => {
        if (t.id === tenantId) {
          const updatedSeats = t.seats + 500;
          const updated = {
            ...t,
            seats: updatedSeats,
            status: t.used / updatedSeats >= 0.9 ? "Seats near cap" : "Active"
          };
          if (selectedTenant && selectedTenant.id === tenantId) {
            setSelectedTenant(updated);
          }
          return updated;
        }
        return t;
      })
    );
    setNotice(`Added +500 contracted seats. New limit: ${(selectedTenant?.seats || 0) + 500} seats.`);
  }

  function handleToggleStatus(tenantId) {
    setTenants(prev =>
      prev.map(t => {
        if (t.id === tenantId) {
          const newStatus = t.status === "Suspended" ? "Active" : "Suspended";
          const updated = { ...t, status: newStatus };
          if (selectedTenant && selectedTenant.id === tenantId) {
            setSelectedTenant(updated);
          }
          return updated;
        }
        return t;
      })
    );
    setNotice(`Organization status updated to ${selectedTenant?.status === "Suspended" ? "Active" : "Suspended"}.`);
  }

  return (
    <>
      <TenantMetrics tenants={tenants} />

      {showOnboard && (
        <AddTenantForm
          onAdd={handleCreateTenant}
          onClose={() => setShowOnboard(false)}
        />
      )}

      {selectedTenant ? (
        <TenantDetailView
          tenant={selectedTenant}
          onBack={() => setSelectedTenant(null)}
          onApproveOnboarding={handleApproveOnboarding}
          onExpandSeats={handleExpandSeats}
          onToggleStatus={handleToggleStatus}
        />
      ) : (
        <TenantTableView
          filtered={filtered}
          tenants={tenants}
          search={search}
          setSearch={setSearch}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          onOpenOnboard={() => setShowOnboard(true)}
          onSelectTenant={setSelectedTenant}
        />
      )}
    </>
  );
}
