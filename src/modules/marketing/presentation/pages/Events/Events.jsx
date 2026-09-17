import { useState } from "react";
import hackathonImg from "../../../../../assets/premium_hackathon_trophy.png";
import hackathonimg2 from "../../../../../assets/Hackathon_2.jpg";
import bootcampImg from "../../../../../assets/bootcamp_3d_illustration.png";
import workshopImg from "../../../../../assets/workshop_lightbulb_idea.png";
import "./Events.css";

const events = [
  {
    id: 1,
    type: "hackathon",
    img: hackathonImg,
    badge: "HACKATHON",
    date: "Oct 24-26, 2026",
    title: "AI Innovation Hackathon 2026",
    desc: "48-hour hackathon to build AI solutions for real-world problems. Mentors from top tech companies.",
    meta: "📍 Hyderabad • Offline",
    s1: "₹2L Prize",
    s2: "450+ Joined",
    btn: "Register Now",
  },
  {
    id: 2,
    type: "hackathon",
    img: hackathonimg2,
    badge: "HACKATHON",
    date: "Nov 10-12, 2026",
    title: "Web3 Build Hackathon",
    desc: "Build decentralized apps on Polygon. Grants and hiring opportunities for winners.",
    meta: "🌐 Remote • Global",
    s1: "₹1.5L Grants",
    s2: "200+ Teams",
    btn: "Register Now",
  },
  {
    id: 3,
    type: "bootcamp",
    img: bootcampImg,
    badge: "BOOTCAMP",
    date: "14 Days",
    title: "Full Stack Bootcamp - MERN",
    desc: "Intensive 14-day bootcamp. Build 3 production apps and deploy them live.",
    meta: "🎓 Beginner to Advanced",
    s1: "Certificate",
    s2: "Live Mentor",
    btn: "Enroll Now",
  },
  {
    id: 4,
    type: "bootcamp",
    img: bootcampImg,
    badge: "BOOTCAMP",
    date: "21 Days",
    title: "AI / ML Bootcamp",
    desc: "From Python to LLMs. Build your own AI models and deploy them.",
    meta: "🧠 Intermediate • Live",
    s1: "Capstone Project",
    s2: "Job Assist",
    btn: "Enroll Now",
  },
  {
    id: 5,
    type: "workshop",
    img: workshopImg,
    badge: "WORKSHOP",
    date: "Sep 28, 2026",
    title: "System Design Workshop",
    desc: "Learn how to design scalable systems like Netflix & Instagram with FAANG architect.",
    meta: "👨‍🏫 Ex-Google Architect",
    s1: "32 Seats Left",
    s2: "2 Hours Live",
    btn: "Join Workshop",
  },
  {
    id: 6,
    type: "workshop",
    img: workshopImg,
    badge: "WORKSHOP",
    date: "Oct 02, 2026",
    title: "Resume & LinkedIn Mastery",
    desc: "How to make FAANG-level resume and LinkedIn profile that gets shortlisted.",
    meta: "💼 TX Hiring Team",
    s1: "Free Workshop",
    s2: "1.5 Hours",
    btn: "Reserve Seat",
  },
];

export default function Events() {
  const [filter, setFilter] = useState("all");

  const filteredEvents =
    filter === "all"
      ? events
      : events.filter((event) => event.type === filter);

  return (
    <div className="events-page">
      <div className="events-heading">
        <h1>Events</h1>
        <p>
          Learn. Build. Compete. Real events, real skills, real rewards.
        </p>
      </div>

      <div className="event-filters">
        {["all", "hackathon", "bootcamp", "workshop"].map((filterName) => (
          <button
            key={filterName}
            onClick={() => setFilter(filterName)}
            className={filter === filterName ? "selected" : ""}
          >
            {filterName === "all"
              ? "All Events"
              : filterName.charAt(0).toUpperCase() +
                filterName.slice(1) +
                "s"}
          </button>
        ))}
      </div>

      <div className="event-list">
        {filteredEvents.map((event, index) => (
          <div
            key={event.id}
            className="event-card"
            style={{
              animationDelay: `${index * 0.08}s`,
            }}
          >
            <div className="event-image">
              <img src={event.img} alt={event.title} />

              <div className="event-type">
                {event.badge}
              </div>

              <div className="event-date">
                {event.date}
              </div>
            </div>

            <div className="event-details">
              <h3>{event.title}</h3>

              <p className="event-description">
                {event.desc}
              </p>

              <div className="event-info">
                {event.meta}
              </div>

              <div className="event-stats">
                <span>{event.s1}</span>
                <span>{event.s2}</span>
              </div>

              <button className="event-action">
                {event.btn}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}