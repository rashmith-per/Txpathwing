import React, { useState, useEffect, useRef } from "react";
import { ORBIT_NODES, ORBIT_CYCLE_DURATION } from "../aboutData";

export function AboutOrbitAnimation() {
  const [progress, setProgress] = useState(0);
  const [, setIsHired] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  const [, setConfetti] = useState([]);
  const animRef = useRef(null);
  const startTimeRef = useRef(0);
  const prevProgressRef = useRef(0);
  const hiredTimerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const loop = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const norm = ((timestamp - startTimeRef.current) % ORBIT_CYCLE_DURATION) / ORBIT_CYCLE_DURATION;
      if (prevProgressRef.current > 0.88 && norm < 0.12) {
        setIsHired(true);
        setConfetti(
          Array.from({ length: 14 }, (_, idx) => ({
            x: (Math.random() - 0.5) * 160,
            y: (Math.random() - 0.5) * 160,
            r: 4 + Math.random() * 6,
            c: ["#60A5FA", "#93C5FD", "#BFDBFE", "#DBEAFE", "#EFF6FF"][idx % 5],
            d: Math.random() * 360,
          }))
        );
        if (hiredTimerRef.current) window.clearTimeout(hiredTimerRef.current);
        hiredTimerRef.current = window.setTimeout(() => {
          setIsHired(false);
          setConfetti([]);
        }, 1800);
      }
      prevProgressRef.current = norm;
      setProgress(norm);
      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      if (hiredTimerRef.current) clearTimeout(hiredTimerRef.current);
    };
  }, []);

  const isSmallMobile = windowWidth < 400;
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1200;
  const stageSize = isSmallMobile
    ? Math.max(220, Math.min(270, windowWidth - 50))
    : isMobile
    ? Math.min(320, windowWidth - 40)
    : isTablet
    ? 410
    : 490;
  const radius = Math.round(stageSize * 0.34);
  const nodeSize = isSmallMobile ? 34 : isMobile ? 40 : isTablet ? 48 : 52;
  const viewBoxSize = 520;
  const centerCoord = viewBoxSize / 2;
  const svgRadius = 190;
  const activeNodeIdx = Math.floor(progress * ORBIT_NODES.length + 0.18);

  return (
    <div className="about-orbit-wrapper">
      <div className="about-orbit-box">
        <div className="about-orbit-stage" style={{ width: stageSize, height: stageSize }}>
          <svg className="about-orbit-svg" viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}>
            <circle
              className="about-orbit-dash-bg"
              cx={centerCoord}
              cy={centerCoord}
              r={svgRadius}
              fill="none"
              stroke="#C7D9FF"
              strokeWidth="0.8"
            />
            <circle
              className="about-orbit-glow-stroke"
              cx={centerCoord}
              cy={centerCoord}
              r={svgRadius}
              fill="none"
              stroke="#2563EB"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * svgRadius}
              strokeDashoffset={2 * Math.PI * svgRadius * (1 - progress)}
              transform={`rotate(-90 ${centerCoord} ${centerCoord})`}
            />
          </svg>
          {ORBIT_NODES.map((item, idx) => {
            const rad = (-90 + item.angle) * (Math.PI / 180);
            const x = Math.cos(rad) * radius;
            const y = Math.sin(rad) * radius;
            const isActive = idx <= activeNodeIdx;
            const isCurrent = idx === activeNodeIdx;
            return (
              <div
                key={item.label}
                className="about-orbit-node-anchor"
                style={{
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  zIndex: isActive ? 3 : 2,
                }}
              >
                <div
                  className={`about-orbit-node-bubble ${isActive ? "is-active" : ""} ${
                    isCurrent && isActive ? "is-current" : ""
                  }`}
                  style={{ width: nodeSize, height: nodeSize }}
                >
                  <span
                    className="about-orbit-emoji"
                    style={{
                      fontSize: isSmallMobile ? 15 : isMobile ? 18 : 22,
                      filter: isActive ? "brightness(1.08) saturate(1.05)" : "saturate(0.85) brightness(1.05)",
                    }}
                  >
                    {item.emoji}
                  </span>
                  <div
                    className="about-orbit-node-badge"
                    style={{ opacity: isActive ? 1 : 0, transform: isActive ? "scale(1)" : "scale(0.4)" }}
                  >
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
