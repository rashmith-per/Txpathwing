export const practiceSystems = {
"web-dev": [
    {
      id: 501,
      number: "Question 1 of 8",
      type: "Multiple Choice",
      marks: "4 marks",
      prompt: "In the CSS Box Model, which layer is immediately surrounding the content area?",
      options: [
        { id: "A", text: "Border" },
        { id: "B", text: "Padding" },
        { id: "C", text: "Margin" },
        { id: "D", text: "Outline" }
      ],
      correct: "B",
      explanation: "Padding clears an area around the content inside of the border."
    },
    {
      id: 502,
      number: "Question 2 of 8",
      type: "Multiple Choice",
      marks: "4 marks",
      prompt: "Which HTTP status code indicates a successful resource creation on the server?",
      options: [
        { id: "A", text: "200 OK" },
        { id: "B", text: "201 Created" },
        { id: "C", text: "204 No Content" },
        { id: "D", text: "301 Moved" }
      ],
      correct: "B",
      explanation: "201 Created indicates the request succeeded and led to resource generation."
    },
    {
      id: 503,
      number: "Question 3 of 8",
      type: "Multiple Choice",
      marks: "4 marks",
      prompt: "Which HTML5 semantic element is best suited for navigation links?",
      options: [
        { id: "A", text: "<section>" },
        { id: "B", text: "<nav>" },
        { id: "C", text: "<aside>" },
        { id: "D", text: "<menuitem>" }
      ],
      correct: "B",
      explanation: "<nav> represents a section of a page intended for navigational links."
    },
    {
      id: 504,
      number: "Question 4 of 8",
      type: "Multiple Choice",
      marks: "4 marks",
      prompt: "What does CORS stand for in browser web security?",
      options: [
        { id: "A", text: "Cross-Origin Resource Sharing" },
        { id: "B", text: "Cross-Online Routing Security" },
        { id: "C", text: "Content Oriented Resource Standard" },
        { id: "D", text: "Centralized Origin Request System" }
      ],
      correct: "A",
      explanation: "Cross-Origin Resource Sharing is an HTTP-header based mechanism for domain resource access control."
    },
    {
      id: 505,
      number: "Question 5 of 8",
      type: "Multiple Choice",
      marks: "4 marks",
      prompt: "Which CSS display value enables a 2-dimensional grid layout system?",
      options: [
        { id: "A", text: "flex" },
        { id: "B", text: "grid" },
        { id: "C", text: "inline-block" },
        { id: "D", text: "table-row" }
      ],
      correct: "B",
      explanation: "CSS Grid layout provides 2-dimensional column and row alignment."
    },
    {
      id: 506,
      number: "Question 6 of 8",
      type: "Multiple Choice",
      marks: "4 marks",
      prompt: "What does the 'rel=noopener' attribute prevent when opening links with target='_blank'?",
      options: [
        { id: "A", text: "Prevents search engine crawling" },
        { id: "B", text: "Prevents the new page from accessing window.opener" },
        { id: "C", text: "Disables HTTPS encryption" },
        { id: "D", text: "Blocks CSS stylesheet loading" }
      ],
      correct: "B",
      explanation: "noopener ensures the new tab cannot manipulate the opening window object via window.opener."
    },
    {
      id: 507,
      number: "Question 7 of 8",
      type: "Multiple Choice",
      marks: "4 marks",
      prompt: "Which storage mechanism allows saving data in the browser with no expiration date?",
      options: [
        { id: "A", text: "sessionStorage" },
        { id: "B", text: "localStorage" },
        { id: "C", text: "Cookies" },
        { id: "D", text: "Memory Cache" }
      ],
      correct: "B",
      explanation: "localStorage data persists across browser sessions and tab restarts until cleared."
    },
    {
      id: 508,
      number: "Question 8 of 8",
      type: "Multiple Choice",
      marks: "4 marks",
      prompt: "In React, which hook handles side-effects like data fetching and subscriptions?",
      options: [
        { id: "A", text: "useState" },
        { id: "B", text: "useReducer" },
        { id: "C", text: "useEffect" },
        { id: "D", text: "useMemo" }
      ],
      correct: "C",
      explanation: "useEffect lets functional React components synchronize with external APIs and side-effects."
    }
  ],
  "system-design": [
    {
      id: 601,
      number: "Question 1 of 8",
      type: "Multiple Choice",
      marks: "4 marks",
      prompt: "In the CAP theorem for distributed systems, what does the 'P' represent?",
      options: [
        { id: "A", text: "Performance" },
        { id: "B", text: "Partition Tolerance" },
        { id: "C", text: "Persistence" },
        { id: "D", text: "Parallelism" }
      ],
      correct: "B",
      explanation: "Partition Tolerance means the system continues operating despite network message drops between nodes."
    },
    {
      id: 602,
      number: "Question 2 of 8",
      type: "Multiple Choice",
      marks: "4 marks",
      prompt: "Which caching strategy writes data to both cache and storage simultaneously?",
      options: [
        { id: "A", text: "Write-through cache" },
        { id: "B", text: "Write-back cache" },
        { id: "C", text: "Write-around cache" },
        { id: "D", text: "Cache-aside" }
      ],
      correct: "A",
      explanation: "Write-through cache writes data synchronously to both cache and database before confirming."
    },
    {
      id: 603,
      number: "Question 3 of 8",
      type: "Multiple Choice",
      marks: "4 marks",
      prompt: "What is horizontal scaling (scaling out)?",
      options: [
        { id: "A", text: "Adding more CPU/RAM to an existing single server" },
        { id: "B", text: "Adding more machine instances to distribute the load" },
        { id: "C", text: "Optimizing database index structures" },
        { id: "D", text: "Switching from SQL to NoSQL" }
      ],
      correct: "B",
      explanation: "Horizontal scaling involves adding more servers to handle distributed traffic."
    },
    {
      id: 604,
      number: "Question 4 of 8",
      type: "Multiple Choice",
      marks: "4 marks",
      prompt: "What component directs incoming client requests evenly across multiple backend server instances?",
      options: [
        { id: "A", text: "Reverse Proxy / Load Balancer" },
        { id: "B", text: "Message Broker" },
        { id: "C", text: "Database Replicator" },
        { id: "D", text: "API Gateway Filter" }
      ],
      correct: "A",
      explanation: "Load Balancers distribute network or application traffic across a cluster of servers."
    },
    {
      id: 605,
      number: "Question 5 of 8",
      type: "Multiple Choice",
      marks: "4 marks",
      prompt: "What is the primary benefit of consistent hashing in distributed caching?",
      options: [
        { id: "A", text: "Minimizes key redistribution when nodes are added or removed" },
        { id: "B", text: "Encrypts payload communications" },
        { id: "C", text: "Ensures ACID compliance on distributed nodes" },
        { id: "D", text: "Compresses stored memory keys" }
      ],
      correct: "A",
      explanation: "Consistent hashing maps both servers and keys to a ring, minimizing key reshuffling on cluster changes."
    },
    {
      id: 606,
      number: "Question 6 of 8",
      type: "Multiple Choice",
      marks: "4 marks",
      prompt: "Which communication pattern uses publish/subscribe topics to decouple microservices?",
      options: [
        { id: "A", text: "REST polling" },
        { id: "B", text: "Event-driven asynchronous messaging" },
        { id: "C", text: "Synchronous RPC" },
        { id: "D", text: "Server-Sent Events only" }
      ],
      correct: "B",
      explanation: "Event-driven messaging (e.g. Apache Kafka, RabbitMQ) decouples service communication asynchronously."
    },
    {
      id: 607,
      number: "Question 7 of 8",
      type: "Multiple Choice",
      marks: "4 marks",
      prompt: "What pattern prevents repeated calls to a failing remote service to allow it time to recover?",
      options: [
        { id: "A", text: "Retry loop" },
        { id: "B", text: "Circuit Breaker" },
        { id: "C", text: "Singleton pattern" },
        { id: "D", text: "Bulkhead isolation" }
      ],
      correct: "B",
      explanation: "Circuit Breaker pattern detects failures and trips the circuit to prevent cascading failures."
    },
    {
      id: 608,
      number: "Question 8 of 8",
      type: "Multiple Choice",
      marks: "4 marks",
      prompt: "Which database replication topology uses a single node for writes while multiple nodes handle read queries?",
      options: [
        { id: "A", text: "Multi-master replication" },
        { id: "B", text: "Leader-Follower (Master-Slave) replication" },
        { id: "C", text: "Peer-to-peer quorum" },
        { id: "D", text: "Sharded cluster" }
      ],
      correct: "B",
      explanation: "Leader-follower replication routes write traffic to the primary leader and read queries to replica followers."
    }
  ]
};
