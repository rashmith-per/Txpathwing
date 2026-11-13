// Practice Questions Bank (7 to 8 questions per course, 4 marks each, Multiple Choice)
export const PRACTICE_QUESTIONS_BY_COURSE = {
  java: [
    {
      id: 101,
      number: "Question 1 of 8",
      type: "Multiple Choice",
      marks: "4 marks",
      prompt: "Which keyword in Java is used to inherit a class and reuse its methods and properties?",
      options: [
        { id: "A", text: "implements" },
        { id: "B", text: "extends" },
        { id: "C", text: "inherits" },
        { id: "D", text: "instanceof" }
      ],
      correct: "B",
      explanation: "The 'extends' keyword is used in Java to create a child subclass from a parent superclass."
    },
    {
      id: 102,
      number: "Question 2 of 8",
      type: "Multiple Choice",
      marks: "4 marks",
      prompt: "What is the default initial capacity of an ArrayList in Java Collections Framework?",
      options: [
        { id: "A", text: "5" },
        { id: "B", text: "10" },
        { id: "C", text: "16" },
        { id: "D", text: "0" }
      ],
      correct: "B",
      explanation: "Java's ArrayList creates an internal array with default initial capacity of 10 upon first element addition."
    },
    {
      id: 103,
      number: "Question 3 of 8",
      type: "Multiple Choice",
      marks: "4 marks",
      prompt: "Which Java exception is thrown when an application attempts to use null where an object reference is required?",
      options: [
        { id: "A", text: "IllegalArgumentException" },
        { id: "B", text: "NullPointerException" },
        { id: "C", text: "ClassNotFoundException" },
        { id: "D", text: "IllegalStateException" }
      ],
      correct: "B",
      explanation: "NullPointerException is an unchecked RuntimeException thrown when invoking methods or fields on a null reference."
    },
    {
      id: 104,
      number: "Question 4 of 8",
      type: "Multiple Choice",
      marks: "4 marks",
      prompt: "Which of the following creates a thread-safe synchronized List wrapper in Java?",
      options: [
        { id: "A", text: "Collections.synchronizedList(new ArrayList<>())" },
        { id: "B", text: "new ArrayList<>().setSynchronized(true)" },
        { id: "C", text: "Arrays.asListSynchronized()" },
        { id: "D", text: "new ListConcurrent<>()" }
      ],
      correct: "A",
      explanation: "Collections.synchronizedList returns a thread-safe wrapper around the backing list collection."
    },
    {
      id: 105,
      number: "Question 5 of 8",
      type: "Multiple Choice",
      marks: "4 marks",
      prompt: "What is the memory size of a 'float' primitive data type in Java?",
      options: [
        { id: "A", text: "16 bits (2 bytes)" },
        { id: "B", text: "32 bits (4 bytes)" },
        { id: "C", text: "64 bits (8 bytes)" },
        { id: "D", text: "128 bits (16 bytes)" }
      ],
      correct: "B",
      explanation: "A Java float uses 32-bit single-precision IEEE 754 floating point representation."
    },
    {
      id: 106,
      number: "Question 6 of 8",
      type: "Multiple Choice",
      marks: "4 marks",
      prompt: "Which method in Java is invoked directly by the Garbage Collector before an object is reclaimed?",
      options: [
        { id: "A", text: "destroy()" },
        { id: "B", text: "dispose()" },
        { id: "C", text: "finalize()" },
        { id: "D", text: "cleanup()" }
      ],
      correct: "C",
      explanation: "finalize() is declared in java.lang.Object and historically called before garbage collecting the object."
    },
    {
      id: 107,
      number: "Question 7 of 8",
      type: "Multiple Choice",
      marks: "4 marks",
      prompt: "Which collection interface allows accessing elements using unique keys without duplicate keys?",
      options: [
        { id: "A", text: "Set" },
        { id: "B", text: "List" },
        { id: "C", text: "Map" },
        { id: "D", text: "Queue" }
      ],
      correct: "C",
      explanation: "Map stores key-value pairs where each key is unique and maps to exactly one value."
    },
    {
      id: 108,
      number: "Question 8 of 8",
      type: "Multiple Choice",
      marks: "4 marks",
      prompt: "What does the 'final' keyword signify when declared before a class name?",
      options: [
        { id: "A", text: "The class cannot be instantiated" },
        { id: "B", text: "The class cannot be subclassed or extended" },
        { id: "C", text: "All methods in the class become abstract" },
        { id: "D", text: "The class can only contain static variables" }
      ],
      correct: "B",
      explanation: "Declaring a class as final prevents inheritance, ensuring subclasses cannot extend it (e.g. java.lang.String)."
    }
  ],
  python: [
    {
      id: 201,
      number: "Question 1 of 8",
      type: "Multiple Choice",
      marks: "4 marks",
      prompt: "Which of the following data structures in Python is immutable?",
      options: [
        { id: "A", text: "list" },
        { id: "B", text: "dict" },
        { id: "C", text: "tuple" },
        { id: "D", text: "set" }
      ],
      correct: "C",
      explanation: "Tuples in Python cannot be modified, added to, or deleted after creation."
    },
    {
      id: 202,
      number: "Question 2 of 8",
      type: "Multiple Choice",
      marks: "4 marks",
      prompt: "What keyword is used in Python to turn a function into a lazy generator?",
      options: [
        { id: "A", text: "return" },
        { id: "B", text: "yield" },
        { id: "C", text: "generate" },
        { id: "D", text: "resume" }
      ],
      correct: "B",
      explanation: "The yield keyword pauses function execution and produces intermediate values on demand."
    },
    {
      id: 203,
      number: "Question 3 of 8",
      type: "Multiple Choice",
      marks: "4 marks",
      prompt: "Which built-in Python function returns the length of an iterable object?",
      options: [
        { id: "A", text: "size()" },
        { id: "B", text: "count()" },
        { id: "C", text: "len()" },
        { id: "D", text: "length()" }
      ],
      correct: "C",
      explanation: "len() returns the number of items in sequences like strings, lists, tuples, or dictionaries."
    },
    {
      id: 204,
      number: "Question 4 of 8",
      type: "Multiple Choice",
      marks: "4 marks",
      prompt: "What does the *args parameter allow in a Python function definition?",
      options: [
        { id: "A", text: "Pass keyword arguments as a dictionary" },
        { id: "B", text: "Pass a variable number of positional arguments as a tuple" },
        { id: "C", text: "Enforce static typing" },
        { id: "D", text: "Define private attributes" }
      ],
      correct: "B",
      explanation: "*args collects arbitrary positional arguments passed to the function into a tuple."
    },
    {
      id: 205,
      number: "Question 5 of 8",
      type: "Multiple Choice",
      marks: "4 marks",
      prompt: "What is the output of bool([]) in Python?",
      options: [
        { id: "A", text: "True" },
        { id: "B", text: "False" },
        { id: "C", text: "None" },
        { id: "D", text: "ValueError" }
      ],
      correct: "B",
      explanation: "Empty collections including empty lists [] evaluate to falsy (False) in boolean context."
    },
    {
      id: 206,
      number: "Question 6 of 8",
      type: "Multiple Choice",
      marks: "4 marks",
      prompt: "Which statement is used to handle exceptions gracefully in Python?",
      options: [
        { id: "A", text: "try ... catch" },
        { id: "B", text: "try ... except" },
        { id: "C", text: "do ... error" },
        { id: "D", text: "catch ... finally" }
      ],
      correct: "B",
      explanation: "Python uses try ... except blocks to catch and handle exceptions."
    },
    {
      id: 207,
      number: "Question 7 of 8",
      type: "Multiple Choice",
      marks: "4 marks",
      prompt: "What method removes and returns the last element from a Python list?",
      options: [
        { id: "A", text: "remove()" },
        { id: "B", text: "delete()" },
        { id: "C", text: "pop()" },
        { id: "D", text: "shift()" }
      ],
      correct: "C",
      explanation: "list.pop() removes and returns the element at the given index, defaulting to the last item."
    },
    {
      id: 208,
      number: "Question 8 of 8",
      type: "Multiple Choice",
      marks: "4 marks",
      prompt: "Which dunder method represents the constructor initializer in a Python class?",
      options: [
        { id: "A", text: "__construct__" },
        { id: "B", text: "__init__" },
        { id: "C", text: "__start__" },
        { id: "D", text: "__new__" }
      ],
      correct: "B",
      explanation: "__init__ initializes state attributes when a new class instance is created."
    }
  ],
  javascript: [
    {
      id: 301,
      number: "Question 1 of 8",
      type: "Multiple Choice",
      marks: "4 marks",
      prompt: "Which keyword declares a block-scoped variable that can be reassigned in modern JavaScript?",
      options: [
        { id: "A", text: "var" },
        { id: "B", text: "let" },
        { id: "C", text: "const" },
        { id: "D", text: "def" }
      ],
      correct: "B",
      explanation: "let allows block-scoped mutable variable declaration."
    },
    {
      id: 302,
      number: "Question 2 of 8",
      type: "Multiple Choice",
      marks: "4 marks",
      prompt: "What does the strict equality operator (===) compare in JavaScript?",
      options: [
        { id: "A", text: "Values only with automatic type coercion" },
        { id: "B", text: "Both value and data type without coercion" },
        { id: "C", text: "Memory address pointers only" },
        { id: "D", text: "Length of the variables" }
      ],
      correct: "B",
      explanation: "=== checks both value and type without converting types implicitly."
    },
    {
      id: 303,
      number: "Question 3 of 8",
      type: "Multiple Choice",
      marks: "4 marks",
      prompt: "Which array method creates a new array populated with the results of calling a provided function on every element?",
      options: [
        { id: "A", text: "forEach()" },
        { id: "B", text: "map()" },
        { id: "C", text: "filter()" },
        { id: "D", text: "reduce()" }
      ],
      correct: "B",
      explanation: "map() applies the transform callback to each element and returns the new transformed array."
    },
    {
      id: 304,
      number: "Question 4 of 8",
      type: "Multiple Choice",
      marks: "4 marks",
      prompt: "What is the return value of typeof NaN in JavaScript?",
      options: [
        { id: "A", text: "'undefined'" },
        { id: "B", text: "'number'" },
        { id: "C", text: "'nan'" },
        { id: "D", text: "'object'" }
      ],
      correct: "B",
      explanation: "In JavaScript, NaN (Not a Number) is a numeric data type per IEEE 754 spec."
    },
    {
      id: 305,
      number: "Question 5 of 8",
      type: "Multiple Choice",
      marks: "4 marks",
      prompt: "Which object handles asynchronous operations and eventual completion or failure in ES6?",
      options: [
        { id: "A", text: "Promise" },
        { id: "B", text: "AsyncCallback" },
        { id: "C", text: "EventLoop" },
        { id: "D", text: "DeferredObject" }
      ],
      correct: "A",
      explanation: "A Promise represents the eventual completion or failure of an asynchronous operation."
    },
    {
      id: 306,
      number: "Question 6 of 8",
      type: "Multiple Choice",
      marks: "4 marks",
      prompt: "What syntax allows unpacking properties from objects or arrays into distinct variables?",
      options: [
        { id: "A", text: "Spread operator" },
        { id: "B", text: "Destructuring assignment" },
        { id: "C", text: "Type casting" },
        { id: "D", text: "Splice syntax" }
      ],
      correct: "B",
      explanation: "Destructuring (e.g. const { a, b } = obj) extracts values into dedicated local variables."
    },
    {
      id: 307,
      number: "Question 7 of 8",
      type: "Multiple Choice",
      marks: "4 marks",
      prompt: "Which method converts a JavaScript object into a JSON formatted string?",
      options: [
        { id: "A", text: "JSON.parse()" },
        { id: "B", text: "JSON.stringify()" },
        { id: "C", text: "JSON.encode()" },
        { id: "D", text: "JSON.toString()" }
      ],
      correct: "B",
      explanation: "JSON.stringify() serializes a JavaScript value or object into a JSON string."
    },
    {
      id: 308,
      number: "Question 8 of 8",
      type: "Multiple Choice",
      marks: "4 marks",
      prompt: "What mechanism allows JavaScript functions to retain access to variables in their lexical scope even when called outside that scope?",
      options: [
        { id: "A", text: "Hoisting" },
        { id: "B", text: "Closure" },
        { id: "C", text: "Currying" },
        { id: "D", text: "Prototypal Inheritance" }
      ],
      correct: "B",
      explanation: "A closure bundles a function with references to its surrounding lexical state."
    }
  ],
  database: [
    {
      id: 401,
      number: "Question 1 of 8",
      type: "Multiple Choice",
      marks: "4 marks",
      prompt: "Which SQL clause is used to filter records aggregated by a GROUP BY clause?",
      options: [
        { id: "A", text: "WHERE" },
        { id: "B", text: "HAVING" },
        { id: "C", text: "ORDER BY" },
        { id: "D", text: "LIMIT" }
      ],
      correct: "B",
      explanation: "HAVING filters aggregated grouped results, while WHERE filters individual rows before grouping."
    },
    {
      id: 402,
      number: "Question 2 of 8",
      type: "Multiple Choice",
      marks: "4 marks",
      prompt: "What does the ACID acronym stand for in relational database transactions?",
      options: [
        { id: "A", text: "Atomicity, Consistency, Isolation, Durability" },
        { id: "B", text: "Accuracy, Concurrency, Integrity, Delivery" },
        { id: "C", text: "Action, Connection, Indexing, Data" },
        { id: "D", text: "Access, Control, Identity, Distribution" }
      ],
      correct: "A",
      explanation: "ACID properties ensure reliable database transaction processing."
    },
    {
      id: 403,
      number: "Question 3 of 8",
      type: "Multiple Choice",
      marks: "4 marks",
      prompt: "Which type of JOIN returns all records from the left table and matched records from the right table?",
      options: [
        { id: "A", text: "INNER JOIN" },
        { id: "B", text: "LEFT JOIN" },
        { id: "C", text: "RIGHT JOIN" },
        { id: "D", text: "CROSS JOIN" }
      ],
      correct: "B",
      explanation: "LEFT JOIN retrieves every record from table 1 and matched values from table 2 (filling NULLs if no match)."
    },
    {
      id: 404,
      number: "Question 4 of 8",
      type: "Multiple Choice",
      marks: "4 marks",
      prompt: "Which constraint uniquely identifies each record in a database table?",
      options: [
        { id: "A", text: "FOREIGN KEY" },
        { id: "B", text: "PRIMARY KEY" },
        { id: "C", text: "CHECK" },
        { id: "D", text: "DEFAULT" }
      ],
      correct: "B",
      explanation: "A PRIMARY KEY uniquely identifies every record in a relational table and cannot contain NULL values."
    },
    {
      id: 405,
      number: "Question 5 of 8",
      type: "Multiple Choice",
      marks: "4 marks",
      prompt: "What database object speeds up search query execution at the cost of additional storage and write overhead?",
      options: [
        { id: "A", text: "Trigger" },
        { id: "B", text: "View" },
        { id: "C", text: "Index" },
        { id: "D", text: "Sequence" }
      ],
      correct: "C",
      explanation: "Indexes (like B-Tree) optimize query data retrieval speed."
    },
    {
      id: 406,
      number: "Question 6 of 8",
      type: "Multiple Choice",
      marks: "4 marks",
      prompt: "Which normal form eliminates transitive functional dependencies?",
      options: [
        { id: "A", text: "First Normal Form (1NF)" },
        { id: "B", text: "Second Normal Form (2NF)" },
        { id: "C", text: "Third Normal Form (3NF)" },
        { id: "D", text: "BCNF" }
      ],
      correct: "C",
      explanation: "3NF requires a table to be in 2NF and have no transitive non-key dependencies."
    },
    {
      id: 407,
      number: "Question 7 of 8",
      type: "Multiple Choice",
      marks: "4 marks",
      prompt: "Which command removes all rows from a table without logging individual row deletions?",
      options: [
        { id: "A", text: "DELETE FROM" },
        { id: "B", text: "DROP TABLE" },
        { id: "C", text: "TRUNCATE TABLE" },
        { id: "D", text: "ALTER TABLE" }
      ],
      correct: "C",
      explanation: "TRUNCATE deallocates table pages quickly with minimal transaction logging."
    },
    {
      id: 408,
      number: "Question 8 of 8",
      type: "Multiple Choice",
      marks: "4 marks",
      prompt: "Which SQL command is used to revoke privileges granted to a database user?",
      options: [
        { id: "A", text: "REMOVE" },
        { id: "B", text: "DENY" },
        { id: "C", text: "REVOKE" },
        { id: "D", text: "DISALLOW" }
      ],
      correct: "C",
      explanation: "The REVOKE command withdraws user access permissions."
    }
  ],
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
