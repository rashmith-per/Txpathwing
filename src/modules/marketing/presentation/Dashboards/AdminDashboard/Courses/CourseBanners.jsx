import React from "react";
import { BannerJava, BannerPython, BannerWeb } from "./banners/CodeBanners";
import { BannerCloud, BannerSecurity } from "./banners/CloudSecurityBanners";
import { BannerDataScience, BannerDesign, BannerBusiness } from "./banners/AnalyticsDesignBanners";

export {
  BannerJava,
  BannerPython,
  BannerWeb,
  BannerCloud,
  BannerSecurity,
  BannerDataScience,
  BannerDesign,
  BannerBusiness
};

// Automatically detect the best banner theme based on course title and category
export function detectBannerType(title = "", category = "") {
  const text = `${title} ${category}`.toLowerCase();

  if (text.includes("java") && !text.includes("javascript")) {
    return "java";
  }

  if (
    text.includes("full stack") ||
    text.includes("python") ||
    text.includes("django") ||
    text.includes("flask") ||
    text.includes("fastapi") ||
    text.includes("backend") ||
    text.includes("software development") ||
    text.includes("software engineering")
  ) {
    return "python";
  }

  if (
    text.includes("react") ||
    text.includes("web") ||
    text.includes("frontend") ||
    text.includes("javascript") ||
    text.includes("typescript") ||
    text.includes("next.js") ||
    text.includes("html") ||
    text.includes("css") ||
    text.includes("angular") ||
    text.includes("vue") ||
    text.includes("node")
  ) {
    return "web";
  }

  if (
    text.includes("cloud") ||
    text.includes("aws") ||
    text.includes("devops") ||
    text.includes("azure") ||
    text.includes("gcp") ||
    text.includes("kubernetes") ||
    text.includes("docker") ||
    text.includes("terraform") ||
    text.includes("linux") ||
    text.includes("infrastructure")
  ) {
    return "cloud";
  }

  if (
    text.includes("security") ||
    text.includes("cyber") ||
    text.includes("ethical hacking") ||
    text.includes("soc") ||
    text.includes("penetration") ||
    text.includes("network")
  ) {
    return "security";
  }

  if (
    text.includes("data") ||
    text.includes("ai") ||
    text.includes("machine learning") ||
    text.includes("deep learning") ||
    text.includes("analytics") ||
    text.includes("power bi") ||
    text.includes("tableau") ||
    text.includes("sql")
  ) {
    return "datascience";
  }

  if (
    text.includes("design") ||
    text.includes("ui") ||
    text.includes("ux") ||
    text.includes("figma") ||
    text.includes("graphic")
  ) {
    return "uiux";
  }

  if (
    text.includes("business") ||
    text.includes("management") ||
    text.includes("product") ||
    text.includes("marketing") ||
    text.includes("finance") ||
    text.includes("leadership")
  ) {
    return "business";
  }

  const cat = category.toLowerCase();
  if (cat.includes("software") || cat.includes("development")) return "python";
  if (cat.includes("cloud")) return "cloud";
  if (cat.includes("security")) return "security";
  if (cat.includes("data") || cat.includes("ai")) return "datascience";
  if (cat.includes("design")) return "uiux";
  if (cat.includes("business")) return "business";

  return "cloud";
}

// Map helper to pick the vector card images matching each course
export function CourseBanner({ type, title = "", category = "", imageUrl = "", image = "" }) {
  const customImg = imageUrl || image;
  if (customImg && typeof customImg === "string" && (customImg.startsWith("http") || customImg.startsWith("data:"))) {
    return (
      <img
        src={customImg}
        alt={title || "Course banner"}
        className="adm-banner-img"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block"
        }}
      />
    );
  }

  let resolvedKey = (type || "").toLowerCase();

  if (!resolvedKey || resolvedKey === "auto") {
    resolvedKey = detectBannerType(title, category);
  }

  switch (resolvedKey) {
    case "java":
      return <BannerJava />;
    case "python":
    case "fullstack":
      return <BannerPython />;
    case "web":
      return <BannerWeb />;
    case "cloud":
    case "aws":
      return <BannerCloud />;
    case "security":
    case "cyber":
    case "cybersecurity":
      return <BannerSecurity />;
    case "datascience":
    case "data":
    case "ai":
      return <BannerDataScience />;
    case "uiux":
    case "design":
      return <BannerDesign />;
    case "business":
      return <BannerBusiness />;
    default: {
      const fallback = detectBannerType(title, category);
      if (fallback === "java") return <BannerJava />;
      if (fallback === "datascience") return <BannerDataScience />;
      if (fallback === "security") return <BannerSecurity />;
      if (fallback === "uiux") return <BannerDesign />;
      if (fallback === "business") return <BannerBusiness />;
      if (fallback === "python" || fallback === "fullstack") return <BannerPython />;
      return <BannerCloud />;
    }
  }
}
