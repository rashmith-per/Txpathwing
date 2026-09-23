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
    mode: "offline",
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
    mode: "online",
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
    mode: "online",
    img: bootcampImg,
    badge: "BOOTCAMP",
    date: "14 Days",
    title: "Full Stack Bootcamp - MERN",
    desc: "Intensive 14-day bootcamp. Build 3 production apps and deploy them live.",
    meta: "🎓 Beginner to Advanced • Online",
    s1: "Certificate",
    s2: "Live Mentor",
    btn: "Enroll Now",
  },
  {
    id: 4,
    type: "bootcamp",
    mode: "online",
    img: bootcampImg,
    badge: "BOOTCAMP",
    date: "21 Days",
    title: "AI / ML Bootcamp",
    desc: "From Python to LLMs. Build your own AI models and deploy them.",
    meta: "🧠 Intermediate • Online",
    s1: "Capstone Project",
    s2: "Job Assist",
    btn: "Enroll Now",
  },
  {
    id: 5,
    type: "workshop",
    mode: "offline",
    img: workshopImg,
    badge: "WORKSHOP",
    date: "Sep 28, 2026",
    title: "System Design Workshop",
    desc: "Learn how to design scalable systems like Netflix & Instagram with industry experts.",
    meta: "👨‍🏫 Hyderabad • Offline",
    s1: "32 Seats Left",
    s2: "2 Hours Live",
    btn: "Join Workshop",
  },
  {
    id: 6,
    type: "workshop",
    mode: "online",
    img: workshopImg,
    badge: "WORKSHOP",
    date: "Oct 02, 2026",
    title: "Resume & LinkedIn Mastery",
    desc: "Learn how to build a strong resume and LinkedIn profile that gets shortlisted.",
    meta: "💼 Online • Live",
    s1: "Free Workshop",
    s2: "1.5 Hours",
    btn: "Reserve Seat",
  },
  {
    id: 7,
    type: "industrial",
    mode: "online",
    img: bootcampImg,
    badge: "INDUSTRIAL TRAINING",
    date: "30 Days",
    title: "Full Stack Industrial Training",
    desc: "Industry-focused training with real-time projects, coding practice and mentor guidance.",
    meta: "🌐 Online • Live Mentor",
    s1: "Live Projects",
    s2: "Certificate",
    btn: "Apply Now",
  },
  {
    id: 8,
    type: "industrial",
    mode: "offline",
    img: workshopImg,
    badge: "INDUSTRIAL TRAINING",
    date: "45 Days",
    title: "AI & Data Science Industrial Training",
    desc: "Hands-on industrial training covering Python, machine learning, data analysis and projects.",
    meta: "🏢 Hyderabad • Offline",
    s1: "Real Projects",
    s2: "Mentor Support",
    btn: "Apply Now",
  },
];

export default function Events() {
  const [typeFilter, setTypeFilter] = useState("all");
  const [modeFilter, setModeFilter] = useState(null);

  const filteredEvents = events.filter((event) => {
    const matchesType = typeFilter === "all" || event.type === typeFilter;
    const matchesMode = !modeFilter || event.mode === modeFilter;

    return matchesType && matchesMode;
  });

  return (
    <div className="events-page">

      <div className="events-heading">
        <h1>Events</h1>
        <p>
          Learn. Build. Compete. Real events, real skills, real rewards.
        </p>
      </div>

      <div className="event-filters">
        <button
          onClick={() => setTypeFilter("all")}
          className={typeFilter === "all" ? "selected" : ""}
        >
          All Events
        </button>

        <button
          onClick={() => setTypeFilter("hackathon")}
          className={typeFilter === "hackathon" ? "selected" : ""}
        >
          Hackathons
        </button>

        <button
          onClick={() => setTypeFilter("bootcamp")}
          className={typeFilter === "bootcamp" ? "selected" : ""}
        >
          Bootcamps
        </button>

        <button
          onClick={() => setTypeFilter("workshop")}
          className={typeFilter === "workshop" ? "selected" : ""}
        >
          Workshops
        </button>

        <button
          onClick={() => setTypeFilter("industrial")}
          className={typeFilter === "industrial" ? "selected" : ""}
        >
          Industrial Training
        </button>
      </div>

      <div className="online-offline">
        <button
          onClick={() => setModeFilter("online")}
          className={modeFilter === "online" ? "selected" : ""}
        >
          Online
        </button>

        <button
          onClick={() => setModeFilter("offline")}
          className={modeFilter === "offline" ? "selected" : ""}
        >
          Offline
        </button>
      </div>

      
        <div className="event-list">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
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
            ))
          ) : (
            <div className="event-box">
            <div className="no-events">
              <h3>No events found</h3>
              <p>
                There are currently no events available in this category.
              </p>
            </div>
            </div>
          )}
        </div>

    
    </div>
  );
}