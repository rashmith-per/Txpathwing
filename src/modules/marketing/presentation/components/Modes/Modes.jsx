import React from "react";
import { School, Video, MonitorSmartphone } from "lucide-react";
import { motion } from "framer-motion";
import "./Modes.css";

const Mode = () => {
  const modes = [
    {
      title: "Online Live",
      desc: "Join instructor-led sessions from anywhere with real-time interaction, discussion and guided learning.",
      icon: <Video size={38} />,
      bgGradient: "linear-gradient(to bottom right, #38bdf8, #2563eb)",
    },
    {
      title: "Classroom",
      desc: "Learn face-to-face with instructors and peers in a focused, structured classroom environment.",
      icon: <School size={38} />,
      bgGradient: "linear-gradient(to bottom right, #22d3ee, #3b82f6)",
    },
    {
      title: "Hybrid",
      desc: "Combine classroom learning with online sessions for a flexible experience without losing instructor connection.",
      icon: <MonitorSmartphone size={38} />,
      bgGradient: "linear-gradient(to bottom right, #60a5fa, #3b82f6)",
    },
  ];

  return (
    <section id="modes" className="modes-section">
      <div className="modes-container">

        {/* Heading */}
        <div className="modes-header">
          <p className="modes-eyebrow">DELIVERY</p>

          <h2 className="modes-title">
            Three modes, the same{" "}
            <span>record of progress.</span>
          </h2>

          <p className="modes-subtitle">
            Learn in the environment that works best for you — live online,
            face-to-face in the classroom, or a flexible combination of both.
          </p>
        </div>

        {/* Cards */}
        <div className="modes-grid">
          {modes.map((mode, index) => (
            <motion.div
              key={mode.title}
              initial="rest"
              whileHover="hover"
              animate="rest"
              className="mode-card"
              style={{
                animationDelay: `${index * 0.12}s`,
              }}
            >

              {/* Expanding Circle Background */}
              <motion.div
                variants={{
                  rest: {
                    scale: 0,
                  },
                  hover: {
                    scale: 8,
                  },
                }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                }}
                className="mode-expanding-circle"
                style={{
                  background: mode.bgGradient,
                }}
              />

              {/* Card Content */}
              <div className="mode-content">

                {/* Icon */}
                <motion.div
                  variants={{
                    rest: {
                      backgroundColor: "#f0f9ff",
                      color: "#0ea5e9",
                      scale: 1,
                    },
                    hover: {
                      backgroundColor: "rgba(255,255,255,0.2)",
                      color: "#ffffff",
                      scale: 1.1,
                    },
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="mode-icon-wrapper"
                >
                  {mode.icon}
                </motion.div>

                {/* Title */}
                <motion.h3
                  variants={{
                    rest: {
                      color: "#1e293b",
                      y: 0,
                    },
                    hover: {
                      color: "#ffffff",
                      y: -6,
                    },
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="mode-title-text"
                >
                  {mode.title}
                </motion.h3>

                {/* Description */}
                <motion.p
                  variants={{
                    rest: {
                      color: "#64748b",
                    },
                    hover: {
                      color: "#ffffff",
                    },
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="mode-desc-text"
                >
                  {mode.desc}
                </motion.p>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Mode;