import {
  Users,
  CheckCircle2,
  UserX,
  GraduationCap,
  Briefcase,
  Mail,
} from "lucide-react";

export default function StaffOverview({ stats, activeFilter, onCardFilterClick }) {
  if (!stats) return null;

  const cards = [
    {
      id: "all",
      label: "TOTAL STAFF",
      count: stats.totalStaff ?? 0,
      icon: Users,
      tone: "blue",
      subtext: "Institution workforce",
      filterType: "all",
      filterValue: "All",
    },
    {
      id: "active",
      label: "ACTIVE STAFF",
      count: stats.activeStaff ?? 0,
      icon: CheckCircle2,
      tone: "green",
      subtext: "Currently on duty",
      filterType: "status",
      filterValue: "Active",
    },
    {
      id: "inactive",
      label: "INACTIVE STAFF",
      count: stats.inactiveStaff ?? 0,
      icon: UserX,
      tone: "slate",
      subtext: "Separated or inactive",
      filterType: "status",
      filterValue: "Inactive",
    },
    {
      id: "teaching",
      label: "TEACHING FACULTY",
      count: stats.teachingStaff ?? 0,
      icon: GraduationCap,
      tone: "purple",
      subtext: "Professors & Lecturers",
      filterType: "category",
      filterValue: "Teaching",
    },
    {
      id: "non_teaching",
      label: "NON-TEACHING STAFF",
      count: stats.nonTeachingStaff ?? 0,
      icon: Briefcase,
      tone: "teal",
      subtext: "Admin, Labs & Support",
      filterType: "category",
      filterValue: "Non-Teaching",
    },
    {
      id: "pending",
      label: "PENDING INVITATIONS",
      count: stats.pendingInvitations ?? 0,
      icon: Mail,
      tone: "amber",
      subtext: "Awaiting onboarding",
      filterType: "status",
      filterValue: "Pending Invitation",
    },
  ];

  return (
    <div className="staff-overview-grid" role="region" aria-label="Staff Statistics Overview">
      {cards.map((card) => {
        const Icon = card.icon;
        const isSelected =
          (card.filterType === "all" && activeFilter.status === "All" && activeFilter.category === "All") ||
          (card.filterType === "status" && activeFilter.status === card.filterValue) ||
          (card.filterType === "category" && activeFilter.category === card.filterValue);

        return (
          <button
            key={card.id}
            type="button"
            className={`staff-metric-card staff-metric-${card.tone}${isSelected ? " staff-metric-selected" : ""}`}
            onClick={() => onCardFilterClick(card.filterType, card.filterValue)}
            title={`Click to filter by ${card.label}`}
          >
            <div className="metric-header">
              <span className="metric-title">{card.label}</span>
              <span className={`metric-icon-bubble bubble-${card.tone}`}>
                <Icon size={18} />
              </span>
            </div>

            <div className="metric-body">
              <strong className="metric-number">{card.count}</strong>
              <span className="metric-subtext">{card.subtext}</span>
            </div>

            <div className="metric-footer-accent" aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}
