import { memo, useMemo } from "react";
import "./SkillsOrbit.css";
import skillsData from "./skillsData";
import logo1 from "../../../../../assets/tx-icon.jpg"
function SkillsOrbit() {

  const stars = useMemo(() => {
    return Array.from({ length: 90 }, (_, i) => ({
      id: i,

      left: `${Math.random() * 100}%`,

      top: `${Math.random() * 100}%`,

      size: `${1 + Math.random() * 2.5}px`,

      delay: `${Math.random() * 8}s`,

      duration: `${5 + Math.random() * 8}s`,
    }));
  }, []);

  return (
    <div className="orbit-wrapper">

      <div className="stars">
        {stars.map((star) => (
          <span
            key={star.id}
            className="star"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              animationDelay: star.delay,
              animationDuration: star.duration,

              backgroundColor: [
                "#38bdf8",
                "#60a5fa",
                "#818cf8",
                "#a78bfa",
                "#c084fc",
                "#f472b6",
                "#22d3ee",
                "#34d399",
                "#fbbf24",
              ][star.id % 9],

              color: [
                "#38bdf8",
                "#60a5fa",
                "#818cf8",
                "#a78bfa",
                "#c084fc",
                "#f472b6",
                "#22d3ee",
                "#34d399",
                "#fbbf24",
              ][star.id % 9],
            }}
          />
        ))}
      </div>


      <div className="scene">

        <div className="center-glow" />

        <div className="center-circle">

          <div className="center-logo-wrapper">

            <img
              src={logo1}
              alt="TX Pathwing"
              className="center-logo"
            />

          </div>

          <div className="center-brand">
            TX PATHWAY
          </div>

          <div className="center-divider" />

        </div>

        {skillsData.map((ring, ringIndex) => {

          const direction =
            ring.direction ||
            (ringIndex % 2 === 0
              ? "clockwise"
              : "anticlockwise");


          const speed = ring.speed || 25;


          return (
            <div
              key={ringIndex}
              className={`orbit-ring orbit-ring-${ringIndex + 1} ${
                direction === "clockwise"
                  ? "rotate-cw"
                  : "rotate-ccw"
              }`}
              style={{
                width: `${ring.radius * 2}px`,
                height: `${ring.radius * 2}px`,
                animationDuration: `${speed}s`,
              }}
            >

              {ring.skills.map((skill, skillIndex) => {

                const angle =
                  (360 / ring.skills.length) * skillIndex;


                return (
                  <div
                    key={skill}
                    className="skill-position"
                    style={{
                      transform: `
                        rotate(${angle}deg)
                        translateX(${ring.radius}px)
                      `,
                    }}
                  >

                    <div
                      className={`skill ${
                        skillIndex % 2 === 0
                          ? "skill-white"
                          : "skill-black"
                      } ${
                        direction === "clockwise"
                          ? "skill-counter-cw"
                          : "skill-counter-ccw"
                      }`}
                      style={{
                        animationDuration: `${speed}s`,
                      }}
                    >

                      {skill}

                    </div>

                  </div>
                );
              })}

            </div>
          );
        })}

      </div>
    </div>
  );
}

export default memo(SkillsOrbit);