import React, { useMemo, useState } from "react";
import "./Users.css";
import { UserMetrics } from "./components/UserMetrics";
import { AddUserForm } from "./components/AddUserForm";
import { UserDetailView } from "./components/UserDetailView";
import { UserTableView } from "./components/UserTableView";

export function UsersModule({
  users,
  setUsers,
  tenants,
  setNotice
}) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showAddUser, setShowAddUser] = useState(false);

  const filtered = useMemo(() => {
    return users.filter(u => {
      const matchSearch = `${u.name} ${u.email} ${u.tenant} ${u.role}`
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchRole = roleFilter === "All" || u.role === roleFilter;
      const matchStatus = statusFilter === "All" || u.status === statusFilter;
      return matchSearch && matchRole && matchStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  function handleCreateUser(userObj) {
    setUsers(prev => [userObj, ...prev]);
    setSelectedUser(userObj);
    setShowAddUser(false);
    setNotice(`User account created for ${userObj.name} (${userObj.role}).`);
  }

  function handleToggleStatus(userId) {
    setUsers(prev =>
      prev.map(u => {
        if (u.id === userId) {
          const nextStatus = u.status === "Active" ? "Inactive" : "Active";
          const updated = { ...u, status: nextStatus };
          if (selectedUser && selectedUser.id === userId) {
            setSelectedUser(updated);
          }
          return updated;
        }
        return u;
      })
    );
    setNotice(`User status updated to ${selectedUser?.status === "Active" ? "Inactive" : "Active"}.`);
  }

  function handleRoleChange(userId, targetRole) {
    setUsers(prev =>
      prev.map(u => {
        if (u.id === userId) {
          const updated = { ...u, role: targetRole };
          if (selectedUser && selectedUser.id === userId) {
            setSelectedUser(updated);
          }
          return updated;
        }
        return u;
      })
    );
    setNotice(`Role for ${selectedUser?.name} changed to ${targetRole}.`);
  }

  function handleResetPassword(email) {
    setNotice(`Security reset token generated. Verification link dispatched to ${email}.`);
  }

  return (
    <>
      <UserMetrics users={users} />

      {showAddUser && (
        <AddUserForm
          tenants={tenants}
          onAdd={handleCreateUser}
          onClose={() => setShowAddUser(false)}
        />
      )}

      {selectedUser ? (
        <UserDetailView
          user={selectedUser}
          onBack={() => setSelectedUser(null)}
          onToggleStatus={handleToggleStatus}
          onResetPassword={handleResetPassword}
          onRoleChange={handleRoleChange}
        />
      ) : (
        <UserTableView
          filtered={filtered}
          search={search}
          setSearch={setSearch}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          onOpenAddUser={() => setShowAddUser(true)}
          onSelectUser={setSelectedUser}
        />
      )}
    </>
  );
}
