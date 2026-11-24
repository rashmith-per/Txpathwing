import { ShieldCheck, UserCheck, Briefcase, GraduationCap, Headphones, Info } from "lucide-react";
import { STAFF_ROLES, ROLE_DEFINITIONS } from "../staffData.js";

const ROLE_ITEMS = [
  {
    role: STAFF_ROLES.INSTITUTION_ADMIN,
    name: "Institution Admin",
    icon: ShieldCheck,
    desc: "Full administrative CRUD, status & deletion access",
  },
  {
    role: STAFF_ROLES.HR_MANAGER,
    name: "HR Manager",
    icon: Briefcase,
    desc: "Enroll, edit, and manage status across all departments",
  },
  {
    role: STAFF_ROLES.DEPT_HEAD,
    name: "Dept Head (CSE)",
    icon: UserCheck,
    dept: "CSE",
    desc: "Manage and monitor faculty within CSE department",
  },
  {
    role: STAFF_ROLES.FACULTY,
    name: "Faculty",
    icon: GraduationCap,
    desc: "View directory and personal profile details",
  },
  {
    role: STAFF_ROLES.SUPPORT_STAFF,
    name: "Support Staff",
    icon: Headphones,
    desc: "Read-only access to directory records",
  },
];

export default function StaffRoleSwitcher({ activeRole, onRoleSelect }) {
  const currentDef = ROLE_DEFINITIONS[activeRole] || ROLE_DEFINITIONS[STAFF_ROLES.INSTITUTION_ADMIN];

  return (
    <div className="staff-role-switcher-strip">
      <div className="switcher-info-part">
        <span className="switcher-label">
          <Info size={13} />
          <strong>RBAC Simulation:</strong>
        </span>
        <span className="switcher-active-tag">
          Active: <strong>{currentDef.name}</strong>
        </span>
      </div>

      <div className="switcher-buttons-group">
        {ROLE_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeRole === item.role;

          return (
            <button
              key={item.role}
              type="button"
              className={`role-switch-btn ${isActive ? "active-role-btn" : ""}`}
              onClick={() => onRoleSelect(item.role, item.dept || null)}
              title={item.desc}
            >
              <Icon size={13} />
              <span>{item.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
