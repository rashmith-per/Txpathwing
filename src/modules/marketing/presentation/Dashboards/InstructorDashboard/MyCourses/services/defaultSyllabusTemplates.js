export function generateDefaultModules(course) {
  const courseId = course?.id || "crs-default";
  const courseTitle = course?.title || "Course";
  const firstWord = courseTitle.split(" ")[0];
  const count = course?.modulesCount || 4;

  const templates = [
    {
      num: 1,
      title: `Foundations of ${firstWord} & Architecture`,
      duration: "12 hours",
      topics: [
        { title: "Core mental models & structural paradigms", duration: "45 mins", description: `Fundamental mental models, architecture overview, and core syntax for ${courseTitle}.` },
        { title: "Environment configuration & dev toolchain", duration: "60 mins", description: "Configuring development containers, linters, formatters, and local debuggers." },
        { title: "Fundamental syntax, primitives & typing", duration: "50 mins", description: "Deep dive into language primitives, memory layout, and type safety constraints." }
      ]
    },
    {
      num: 2,
      title: "Deep Dive into Enterprise Design Patterns",
      duration: "16 hours",
      topics: [
        { title: "Scalable project topology & clean boundaries", duration: "60 mins", description: "Organizing modular monoliths, domain layers, and boundary enforcement." },
        { title: "State management, caching & lifecycle", duration: "75 mins", description: "In-memory caching strategies, invalidation mechanisms, and reactive state stores." },
        { title: "Resilience, fault tolerance & error boundaries", duration: "55 mins", description: "Circuit breakers, retry policies, and structured exception handling." }
      ]
    },
    {
      num: 3,
      title: "Integration, Automation & Cloud Deployment",
      duration: "14 hours",
      topics: [
        { title: "CI/CD pipelines & automated quality gates", duration: "60 mins", description: "Automated regression testing, linting checks, and pipeline triggers." },
        { title: "Production observability & telemetry", duration: "50 mins", description: "Structured JSON logging, OpenTelemetry traces, and health check probes." },
        { title: "Dockerized containerization & registry deployment", duration: "70 mins", description: "Building multi-stage Dockerfiles and publishing to container registries." }
      ]
    },
    {
      num: 4,
      title: "Capstone Project & Industry Portfolio Evaluation",
      duration: "10 hours",
      topics: [
        { title: "End-to-end architecture build & implementation", duration: "90 mins", description: "Architecting a production-ready application addressing real enterprise requirements." },
        { title: "Automated test suites & contract verification", duration: "60 mins", description: "Writing end-to-end tests, integration tests, and API contract specifications." },
        { title: "Mentor review rubric & deployment audit", duration: "45 mins", description: "Comprehensive code review against performance, security, and scalability rubrics." }
      ]
    }
  ];

  return templates.slice(0, count).map((mod, modIdx) => {
    const moduleId = `mod-${courseId}-${mod.num || modIdx + 1}`;
    return {
      id: moduleId,
      num: mod.num || modIdx + 1,
      title: mod.title,
      duration: mod.duration,
      topics: mod.topics.map((top, topIdx) => ({
        id: `top-${moduleId}-${topIdx + 1}`,
        title: top.title,
        description: top.description || "",
        duration: top.duration || "45 mins",
        order: topIdx + 1
      }))
    };
  });
}
