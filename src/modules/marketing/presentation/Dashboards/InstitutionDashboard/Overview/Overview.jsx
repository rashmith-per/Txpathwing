import { ArrowRight, FileUp } from "lucide-react";
import PageHeading from "../Layout/PageHeading.jsx";
import EventRow from "../Events/EventRow.jsx";
import { departments, metrics } from "./overviewData.js";
import { initialEvents } from "../Events/eventsData.js";
import { navigation } from "../sidebarData.js";
import { matchesSearch } from "../utils.js";
import "./Overview.css";

export default function Overview({ search, onNavigate, onSelectEvent }) {
  const visibleEvents = initialEvents.filter((event) => matchesSearch(event, search));

  return (
    <>
      <PageHeading
        eyebrow="INSTITUTION OVERVIEW"
        title="KITS Warangal"
        description="2,140 learners across 6 departments · industry-academia programme, batch 2026–27"
      >
        <button className="primary-action" type="button" onClick={() => onNavigate("Learners")}>
          <FileUp size={16} />Bulk import learners
        </button>
      </PageHeading>

      <div className="metric-grid">
        {metrics.map((metric) => {
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
