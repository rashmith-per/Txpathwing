import { useEffect, useState } from "react";
import { ArrowRight, FileUp, Users, TrendingUp, Award, BriefcaseBusiness, UserCheck } from "lucide-react";
import PageHeading from "../Layout/PageHeading.jsx";
import EventRow from "../Events/EventRow.jsx";
import { departments } from "./overviewData.js";
import { initialEvents } from "../Events/eventsData.js";
import { navigation } from "../sidebarData.js";
import { matchesSearch } from "../utils.js";
import { learnerApi } from "../Learners/services/learnerApi.js";
import { staffApi } from "../Staff/services/staffApi.js";
import { learningApi } from "../Learnings/services/learningApi.js";
import "./Overview.css";

export default function Overview({ search, onNavigate, onSelectEvent }) {
  const [learnerStats, setLearnerStats] = useState({ total: 12, placementReady: 4, averageProgress: 76 });
  const [staffStats, setStaffStats] = useState({ activeStaff: 10, totalStaff: 12 });
  const [learningStats, setLearningStats] = useState({ totalPrograms: 5, activePrograms: 4 });

  useEffect(() => {
    let isCurrent = true;

    const fetchAllStats = () => {
      const getLearnerStatsPromise = typeof learnerApi?.getStatistics === "function"
        ? learnerApi.getStatistics().catch(() => ({}))
        : Promise.resolve({});

      const getStaffStatsPromise = typeof staffApi?.getStatistics === "function"
        ? staffApi.getStatistics().catch(() => ({}))
        : typeof staffApi?.getStaffStatistics === "function"
        ? staffApi.getStaffStatistics().then((res) => (res && res.data ? res.data : res)).catch(() => ({}))
        : Promise.resolve({});

      const getLearningStatsPromise = typeof learningApi?.getStatistics === "function"
        ? learningApi.getStatistics().catch(() => ({}))
        : Promise.resolve({});

      Promise.all([getLearnerStatsPromise, getStaffStatsPromise, getLearningStatsPromise])
        .then(([lStats, sStats, progStats]) => {
          if (!isCurrent) return;
          if (lStats && lStats.total !== undefined) setLearnerStats(lStats);
          if (sStats && sStats.activeStaff !== undefined) setStaffStats(sStats);
          if (progStats && progStats.totalPrograms !== undefined) setLearningStats(progStats);
        })
        .catch(() => {});
    };

    fetchAllStats();

    const handleUpdate = () => {
      if (isCurrent) fetchAllStats();
    };

    window.addEventListener("institution_learning_updated", handleUpdate);
    window.addEventListener("institution_learners_updated", handleUpdate);
    window.addEventListener("staff_record_created", handleUpdate);
    window.addEventListener("staff_record_updated", handleUpdate);
    window.addEventListener("staff_record_deleted", handleUpdate);
    window.addEventListener("staff_status_changed", handleUpdate);

    return () => {
      isCurrent = false;
      window.removeEventListener("institution_learning_updated", handleUpdate);
      window.removeEventListener("institution_learners_updated", handleUpdate);
      window.removeEventListener("staff_record_created", handleUpdate);
      window.removeEventListener("staff_record_updated", handleUpdate);
      window.removeEventListener("staff_record_deleted", handleUpdate);
      window.removeEventListener("staff_status_changed", handleUpdate);
    };
  }, []);

  const visibleEvents = initialEvents.filter((event) => matchesSearch(event, search));

  const dynamicMetrics = [
    {
      label: "ENROLLED LEARNERS",
      value: learnerStats.total ? learnerStats.total.toLocaleString() : "12",
      note: `${learnerStats.activeThisTerm || 0} active this term`,
      page: "Learners",
      positive: true,
      icon: Users,
      tone: "blue"
    },
    {
      label: "ACTIVE FACULTY & STAFF",
      value: staffStats.activeStaff ? staffStats.activeStaff.toString() : "10",
      note: `${staffStats.teachingStaff || 0} teaching faculty`,
      page: "Staff Management",
      positive: true,
      icon: UserCheck,
      tone: "indigo"
    },
    {
      label: "PROGRAMME COMPLETION",
      value: `${learnerStats.averageProgress || 76}%`,
      note: "Cohort 2026–27",
      page: "Programmes",
      positive: true,
      icon: TrendingUp,
      tone: "green"
    },
    {
      label: "PLACEMENT-READY",
      value: learnerStats.placementReady ? learnerStats.placementReady.toString() : "4",
      note: "Interview eligible",
      page: "Learners",
      positive: true,
      icon: BriefcaseBusiness,
      tone: "teal"
    },
    {
      label: "ACTIVE PROGRAMMES",
      value: learningStats.activePrograms ? learningStats.activePrograms.toString() : "4",
      note: `${learningStats.totalPrograms || 5} pathways total`,
      page: "Learning",
      positive: false,
      icon: Award,
      tone: "amber"
    }
  ];

  return (
    <>
      <PageHeading
        eyebrow="INSTITUTION OVERVIEW"
        title="KITS Warangal"
        description={`${learnerStats.total || 12} enrolled learners across 6 departments · industry-academia programme, batch 2026–27`}
      >
        <button className="primary-action" type="button" onClick={() => onNavigate("Learners")}>
          <FileUp size={16} />Learners Directory
        </button>
      </PageHeading>

      <div className="metric-grid">
        {dynamicMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <button
              className="metric-card metric-card-button"
              type="button"
              key={metric.label}
              onClick={() => onNavigate(metric.page)}
            >
              <div className="metric-card-top">
                <div className="metric-label">{metric.label}</div>
                <span className={`metric-icon metric-icon-${metric.tone}`}><Icon size={17} /></span>
              </div>
              <strong className="metric-value">{metric.value}</strong>
              <div className={`metric-note${metric.positive ? " metric-positive" : ""}`}>
                {metric.positive && <span aria-hidden="true">↑</span>}
                {metric.note}
                <ArrowRight size={13} />
              </div>
            </button>
          );
        })}
      </div>

      <div className="dashboard-panels">
        <section className="panel completion-panel">
          <header className="panel-header">
            <h2>Completion by department</h2>
            <span>Current term</span>
          </header>
          <div className="department-chart" role="img" aria-label="Programme completion by department">
            {departments.map((department) => (
              <div className="department-row" key={department.name}>
                <span className="department-name">{department.name}</span>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${department.completion}%` }} />
                </div>
                <strong>{department.completion}%</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="panel calendar-panel">
          <header className="panel-header">
            <h2>Programme calendar</h2>
            <button className="text-action" type="button" onClick={() => onNavigate("Events")}>
              All events <ArrowRight size={14} />
            </button>
          </header>
          <div className="event-list">
            {visibleEvents.length
              ? visibleEvents.map((event) => <EventRow key={event.title} event={event} onSelect={onSelectEvent} />)
              : <p className="empty-events">No matching events.</p>}
          </div>
        </section>
      </div>

      <section className="panel overview-shortcuts">
        <header className="panel-header">
          <h2>Institution workspace</h2>
          <span>Quick access</span>
        </header>
        <div className="shortcut-grid">
          {navigation.slice(1).map((item) => {
            const Icon = item.icon;
            return (
              <button type="button" className="shortcut-item" key={item.label} onClick={() => onNavigate(item.label)}>
                <Icon size={18} /><span>{item.label}</span><ArrowRight size={14} />
              </button>
            );
          })}
        </div>
      </section>
    </>
  );
}
