import React from "react";

export const P = {
  plus: "M12 5v14M5 12h14", cal: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4", clock: "M12 21a9 9 0 100-18 9 9 0 000 18zM12 7v5l3 2",
  users: "M9 11a3 3 0 100-6 3 3 0 000 6zM3 19c0-3 3-5 6-5s6 2 6 5M16 5.5a3 3 0 010 5.5M18 14c2 .6 3 2.2 3 5",
  live: "M12 12h.01M8.5 8.5a5 5 0 000 7M15.5 8.5a5 5 0 010 7M5.6 5.6a9 9 0 000 12.8M18.4 5.6a9 9 0 010 12.8", play: "M8 5l11 7-11 7z",
  check: "M5 12.5l4.5 4.5L19 7", trash: "M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13",
  link: "M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1", video: "M3 6h12v12H3zM15 10l6-3v10l-6-3",
  book: "M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2zM4 19V5", bolt: "M13 3L5 14h6l-1 7 8-11h-6z", back: "M15 5l-7 7 7 7",
  search: "M11 18a7 7 0 100-14 7 7 0 000 14zM20 20l-4-4", sparkle: "M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z",
  star: "M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"
};

export const Icon = ({ n, s = 18 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={P[n]} />
  </svg>
);
