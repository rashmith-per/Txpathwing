import React from "react";
import { Users, UserCheck, Shield } from "lucide-react";
import { Metric } from "../../common/Metric";

export function UserMetrics({ users = [] }) {
  const studentsCount = users.filter(u => u.role === "Student").length;
  const mentorsCount = users.filter(u => u.role === "Mentor").length;
  const adminsCount = users.filter(u => u.role === "Org Admin" || u.role === "Super Admin").length;

  return (
    <div className="metrics-grid four">
      <Metric
        label="TOTAL USERS"
        value={String(41208 + users.length - 7)}
        foot="Across all tenants"
        icon={Users}
      />
      <Metric
        label="STUDENTS"
        value={String(38420 + studentsCount - 2)}
        foot="Enrolled learners"
        icon={UserCheck}
      />
      <Metric
        label="MENTORS"
        value={String(1842 + mentorsCount - 2)}
        foot="Faculty & experts"
        icon={Shield}
      />
      <Metric
        label="ADMINS"
        value={String(946 + adminsCount - 3)}
        foot="Platform & tenant admins"
        icon={Shield}
      />
    </div>
  );
}
