export const examSystems = {
database: [
    {
      id: 1,
      number: "Question 1 of 5",
      type: "Multiple choice",
      marks: "2 marks",
      prompt: "Which SQL JOIN returns only the rows that have matching values in both joined tables?",
      options: [
        { id: "A", text: "INNER JOIN" },
        { id: "B", text: "FULL OUTER JOIN" },
        { id: "C", text: "CROSS JOIN" },
        { id: "D", text: "LEFT OUTER JOIN" }
      ],
      correct: "A"
    },
    {
      id: 2,
      number: "Question 2 of 5",
      type: "Multiple choice",
      marks: "2 marks",
      prompt: "What is the primary goal of Database Normalization (1NF, 2NF, 3NF)?",
      options: [
        { id: "A", text: "To minimize data redundancy and prevent update, insert, and delete anomalies" },
        { id: "B", text: "To duplicate all columns across every table" },
        { id: "C", text: "To remove all primary keys from the schema" },
        { id: "D", text: "To disable SQL indexing" }
      ],
      correct: "A"
    },
    {
      id: 3,
      number: "Question 3 of 5",
      type: "Multiple choice",
      marks: "2 marks",
      prompt: "Which SQL clause is used to filter grouped records produced by a GROUP BY clause?",
      options: [
        { id: "A", text: "WHERE" },
        { id: "B", text: "HAVING" },
        { id: "C", text: "ORDER BY" },
        { id: "D", text: "LIMIT" }
      ],
      correct: "B"
    },
    {
      id: 4,
      number: "Question 4 of 5",
      type: "Multiple choice",
      marks: "2 marks",
      prompt: "What does the 'A' in ACID database transactions stand for?",
      options: [
        { id: "A", text: "Atomicity (all operations succeed completely or none are applied)" },
        { id: "B", text: "Asynchronous replication" },
        { id: "C", text: "Automatic indexing" },
        { id: "D", text: "Array partitioning" }
      ],
      correct: "A"
    },
    {
      id: 5,
      number: "Question 5 of 5",
      type: "Multiple choice",
      marks: "2 marks",
      prompt: "How does a B-Tree database index improve SELECT query performance?",
      options: [
        { id: "A", text: "By allowing logarithmic O(log n) lookups instead of full sequential table scans" },
        { id: "B", text: "By compressing images stored on disk" },
        { id: "C", text: "By deleting unreferenced foreign keys" },
        { id: "D", text: "By converting relational tables into flat CSV files" }
      ],
      correct: "A"
    }
  ],
  "web-dev": [
    {
      id: 1,
      number: "Question 1 of 5",
      type: "Multiple choice",
      marks: "2 marks",
      prompt: "In React, which Hook is used to perform side effects such as data fetching or subscriptions in functional components?",
      options: [
        { id: "A", text: "useEffect" },
        { id: "B", text: "useMemo" },
        { id: "C", text: "useContext" },
        { id: "D", text: "useReducer" }
      ],
      correct: "A"
    },
    {
      id: 2,
      number: "Question 2 of 5",
      type: "Multiple choice",
      marks: "2 marks",
      prompt: "Which CSS layout module is specifically designed for two-dimensional layouts (rows and columns simultaneously)?",
      options: [
        { id: "A", text: "CSS Grid Layout" },
        { id: "B", text: "Float Layout" },
        { id: "C", text: "Inline Block" },
        { id: "D", text: "Z-Index Stacking" }
      ],
      correct: "A"
    },
    {
      id: 3,
      number: "Question 3 of 5",
      type: "Multiple choice",
      marks: "2 marks",
      prompt: "Which HTTP status code indicates that a resource was successfully created on the server (e.g. after a POST request)?",
      options: [
        { id: "A", text: "201 Created" },
        { id: "B", text: "304 Not Modified" },
        { id: "C", text: "400 Bad Request" },
        { id: "D", text: "500 Internal Server Error" }
      ],
      correct: "A"
    },
    {
      id: 4,
      number: "Question 4 of 5",
      type: "Multiple choice",
      marks: "2 marks",
      prompt: "Why are 'key' props important when rendering lists of elements in React?",
      options: [
        { id: "A", text: "They help React identify which items have changed, been added, or been removed during reconciliation" },
        { id: "B", text: "They automatically style list items with CSS borders" },
        { id: "C", text: "They encrypt component props in localStorage" },
        { id: "D", text: "They make state variables global across all components" }
      ],
      correct: "A"
    },
    {
      id: 5,
      number: "Question 5 of 5",
      type: "Multiple choice",
      marks: "2 marks",
      prompt: "In Node.js and Express, what is middleware?",
      options: [
        { id: "A", text: "Functions that have access to the request (req), response (res), and the next function in the request-response cycle" },
        { id: "B", text: "A hardware router installed between client and server" },
        { id: "C", text: "A relational database engine built into Chrome" },
        { id: "D", text: "A CSS preprocessor for responsive media queries" }
      ],
      correct: "A"
    }
  ],
  "system-design": [
    {
      id: 1,
      number: "Question 1 of 5",
      type: "Multiple choice",
      marks: "2 marks",
      prompt: "What is the primary role of a Load Balancer in a distributed system architecture?",
      options: [
        { id: "A", text: "Distributing incoming network traffic evenly across multiple backend servers to ensure high availability" },
        { id: "B", text: "Compiling frontend TypeScript files in the browser" },
        { id: "C", text: "Storing user passwords in plain text" },
        { id: "D", text: "Replacing all database indexes with local files" }
      ],
      correct: "A"
    },
    {
      id: 2,
      number: "Question 2 of 5",
      type: "Multiple choice",
      marks: "2 marks",
      prompt: "According to the CAP Theorem, a distributed data store can simultaneously provide at most two of which three guarantees?",
      options: [
        { id: "A", text: "Consistency, Availability, and Partition Tolerance" },
        { id: "B", text: "Caching, Authentication, and Polling" },
        { id: "C", text: "Concurrency, Atomicity, and Persistence" },
        { id: "D", text: "Compression, Aggregation, and Pipelining" }
      ],
      correct: "A"
    },
    {
      id: 3,
      number: "Question 3 of 5",
      type: "Multiple choice",
      marks: "2 marks",
      prompt: "Which caching strategy writes data to both the cache (e.g., Redis) and the underlying database synchronously?",
      options: [
        { id: "A", text: "Write-Through Cache" },
        { id: "B", text: "Cache Eviction Only" },
        { id: "C", text: "Dead-Letter Queueing" },
        { id: "D", text: "DNS Round Robin" }
      ],
      correct: "A"
    },
    {
      id: 4,
      number: "Question 4 of 5",
      type: "Multiple choice",
      marks: "2 marks",
      prompt: "How does a Content Delivery Network (CDN) reduce latency for end users?",
      options: [
        { id: "A", text: "By serving static assets from geographically distributed edge servers closer to the user" },
        { id: "B", text: "By disabling HTTPS encryption on all requests" },
        { id: "C", text: "By running database migrations inside the client browser" },
        { id: "D", text: "By blocking concurrent connections" }
      ],
      correct: "A"
    },
    {
      id: 5,
      number: "Question 5 of 5",
      type: "Multiple choice",
      marks: "2 marks",
      prompt: "What is Database Sharding in high-scale system design?",
      options: [
        { id: "A", text: "Horizontal partitioning of data across multiple independent database instances" },
        { id: "B", text: "Deleting historical backups every hour" },
        { id: "C", text: "Combining all microservices into a single monolith file" },
        { id: "D", text: "Rendering HTML on the client side" }
      ],
      correct: "A"
    }
  ]
};
