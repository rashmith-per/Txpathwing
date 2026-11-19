export const practiceWebData = {
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
  ]
};
