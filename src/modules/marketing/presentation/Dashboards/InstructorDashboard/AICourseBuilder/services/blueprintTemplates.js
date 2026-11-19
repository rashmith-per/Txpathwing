import { normalizeModulesList } from "../../MyCourses/utils/topicOperations.js";

export const DEFAULT_AGENTIC_TOPIC = "Autonomous AI Agents & Multi-Agent Orchestration";

export function createDefaultAgenticModules(scopeId) {
  const raw = [
    {
      num: 1,
      title: "Foundations of Autonomous Agents & LLM Function Calling",
      duration: "8 hours",
      topics: [
        {
          title: "Prompt orchestration",
          duration: "60 mins",
          description: "Designing structured system prompts, role contracts, and deterministic output schemas."
        },
        {
          title: "Structured tool calling with JSON Schema",
          duration: "75 mins",
          description: "Binding external APIs and validation schemas cleanly to LLM tool invocations."
        },
        {
          title: "Memory systems (Short-term & Vector Store)",
          duration: "75 mins",
          description: "Combining conversation context buffers with semantic vector retrieval pipelines."
        }
      ]
    },
    {
      num: 2,
      title: "LangGraph & State Machine Agent Workflows",
      duration: "10 hours",
      topics: [
        {
          title: "Stateful graph topologies",
          duration: "60 mins",
          description: "Modeling execution nodes, shared state reducers, and deterministic edge transitions."
        },
        {
          title: "Cyclic execution loops",
          duration: "70 mins",
          description: "Implementing bounded retry cycles, critic reflections, and step termination checks."
        },
        {
          title: "Human-in-the-loop validation checkpoints",
          duration: "60 mins",
          description: "Pausing autonomous graphs cleanly for operator review and state resumption."
        }
      ]
    },
    {
      num: 3,
      title: "Multi-Agent Collaboration & Role Delegation",
      duration: "10 hours",
      topics: [
        {
          title: "Hierarchical supervisor architecture",
          duration: "60 mins",
          description: "Coordinating planner, executor, and verifier subagents under supervisor routing."
        },
        {
          title: "Peer-to-peer consensus",
          duration: "60 mins",
          description: "Building critique rounds and voting consensus across specialized domain agents."
        },
        {
          title: "Subagent task distribution",
          duration: "65 mins",
          description: "Parallelizing isolated research and synthesis tasks cleanly across agents."
        }
      ]
    },
    {
      num: 4,
      title: "Real-World Sandboxed Coding & Browser Automation",
      duration: "8 hours",
      topics: [
        {
          title: "Dockerized sandbox execution",
          duration: "60 mins",
          description: "Running untrusted generated code inside isolated containers with resource limits."
        },
        {
          title: "Playwright & Chrome DevTools Protocol",
          duration: "70 mins",
          description: "Automating authenticated DOM interactions, assertions, and screenshot verification."
        },
        {
          title: "Security sandboxing",
          duration: "55 mins",
          description: "Enforcing network allowlists, permission boundaries, and secret isolation."
        }
      ]
    },
    {
      num: 5,
      title: "Production Observability & Token Cost Optimization",
      duration: "8 hours",
      topics: [
        {
          title: "OpenTelemetry tracing",
          duration: "55 mins",
          description: "Instrumenting multi-step agent traces, latency spans, and tool failure diagnostics."
        },
        {
          title: "Latency mitigation & caching",
          duration: "60 mins",
          description: "Applying prompt prefix caching and tiered model routing for lower response times."
        },
        {
          title: "Rate limiting & failovers",
          duration: "50 mins",
          description: "Handling provider throttling gracefully with exponential backoff and fallbacks."
        }
      ]
    },
    {
      num: 6,
      title: "Capstone Project: Enterprise AI Coding Assistant",
      duration: "8 hours",
      topics: [
        {
          title: "End-to-end repository indexing",
          duration: "75 mins",
          description: "Building AST symbol graphs and incremental codebase retrieval indexes."
        },
        {
          title: "Automated unit test generation",
          duration: "75 mins",
          description: "Synthesizing targeted regression suites and verifying assertions in CI."
        },
        {
          title: "Pull request self-healing",
          duration: "90 mins",
          description: "Reading build logs automatically to repair failing checks before final review."
        }
      ]
    }
  ];

  return normalizeModulesList(scopeId, raw);
}

export function createTopicAwareModules(scopeId, topicTitle, category, level) {
  return createGenericModules(scopeId, topicTitle, category, level);
}

export function createGenericModules(scopeId, topicTitle, category, level) {
  const cleanTitle = topicTitle || DEFAULT_AGENTIC_TOPIC;
  const raw = [
    {
      num: 1,
      title: `Foundations of ${cleanTitle}`,
      duration: "8 hours",
      topics: [
        {
          title: `Core architecture & mental models for ${cleanTitle}`,
          duration: "55 mins",
          description: `Establish ${level.toLowerCase()} foundations across ${category}.`
        },
        {
          title: "Tooling setup, standards & workspace configuration",
          duration: "60 mins",
          description: "Configure local development, linting, and reproducible test workflows."
        }
      ]
    },
    {
      num: 2,
      title: `Core Implementation Patterns in ${category}`,
      duration: "10 hours",
      topics: [
        {
          title: "Modular domain decomposition & clean boundaries",
          duration: "65 mins",
          description: "Design loosely coupled modules with strict interfaces."
        },
        {
          title: "State management, validation & error handling",
          duration: "60 mins",
          description: "Implement schema validation and resilient error recovery workflows."
        }
      ]
    },
    {
      num: 3,
      title: "Testing, Observability & Production Hardening",
      duration: "8 hours",
      topics: [
        {
          title: "Automated integration & contract testing",
          duration: "60 mins",
          description: "Verify component behavior under edge cases and regressions."
        },
        {
          title: "Deployment pipelines & runtime diagnostics",
          duration: "55 mins",
          description: "Configure release telemetry, alerts, and health verification."
        }
      ]
    },
    {
      num: 4,
      title: `Capstone: Production ${cleanTitle} System`,
      duration: "8 hours",
      topics: [
        {
          title: "End-to-end capstone build & review",
          duration: "90 mins",
          description: "Deliver a production-ready capstone evaluated against industry rubrics."
        }
      ]
    }
  ];

  return normalizeModulesList(scopeId, raw);
}


