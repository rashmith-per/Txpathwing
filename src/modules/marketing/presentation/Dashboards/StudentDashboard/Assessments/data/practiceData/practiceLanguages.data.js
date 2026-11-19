export const practiceLanguages = {
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
  ]
};
