import softwareDevelopment from "../../../../../assets/software-development.png";
import cloudDevOps from "../../../../../assets/cloud-devops.png";
import aiData from "../../../../../assets/ai-data.png";
import testing from "../../../../../assets/testing.png";
import career from "../../../../../assets/career.png";
import java from "../../../../../assets/cardImages/javaFullStack.png"
import python from "../../../../../assets/cardImages/pythonFullStack3.png"
import MERN from "../../../../../assets/cardImages/MERNstack1.png"

/* =========================================================
   MARKETPLACE BANNER IMAGES
========================================================= */

export const bannerImages = [
  {
    id: 1,
    image: softwareDevelopment,
    title: "Software Development",
  },
  {
    id: 2,
    image: cloudDevOps,
    title: "Cloud & DevOps",
  },
  {
    id: 3,
    image: aiData,
    title: "AI & Data",
  },
  {
    id: 4,
    image: testing,
    title: "Software Testing",
  },
  {
    id: 5,
    image: career,
    title: "Career",
  },
];


/* =========================================================
   MARKETPLACE CATEGORIES
========================================================= */

export const categories = [
  "All",
  "Software Development",
  "Cloud & DevOps",
  "AI & Data",
  "Testing",
  "Career",
];


/* =========================================================
   MARKETPLACE COURSES
========================================================= */

export const courses = [

  // =======================================================
  // SOFTWARE DEVELOPMENT
  // =======================================================

  {
    id: 1,
    title: "Java Full Stack Development",
    image:java,
    instructor: "Naveen Kulkarni",
    duration: "18 weeks",
    lessons: "128 lessons",
    tags: ["Live cohort", "Projects"],
    price: "₹6,999",
    oldPrice: "₹11,999",
    category: "Software Development",
  },

  {
    id: 2,
    title: "Python Full Stack",
    image:python,
    instructor: "Sowmya Iyer",
    duration: "16 weeks",
    lessons: "112 lessons",
    tags: ["Hybrid", "Placement-linked"],
    price: "₹6,499",
    oldPrice: "₹9,999",
    category: "Software Development",
  },

  // {
  //   id: 3,
  //   title: "React Full Stack Development",
  //   instructor: "Arjun Mehta",
  //   duration: "14 weeks",
  //   lessons: "96 lessons",
  //   tags: ["Live cohort", "Coding labs"],
  //   price: "₹5,499",
  //   oldPrice: "₹8,999",
  //   category: "Software Development",
  // },

  {
    id: 4,
    title: "MERN Stack Development",
    image:MERN,
    instructor: "Priya Sharma",
    duration: "20 weeks",
    lessons: "150 lessons",
    tags: ["Projects", "Career support"],
    price: "₹7,999",
    oldPrice: "₹14,999",
    category: "Software Development",
  },


  // =======================================================
  // CLOUD & DEVOPS
  // =======================================================

  {
    id: 5,
    title: "AWS Cloud & DevOps",
    instructor: "Rahul Kumar",
    duration: "12 weeks",
    lessons: "90 lessons",
    tags: ["Hands-on", "Projects"],
    price: "₹5,999",
    oldPrice: "₹9,999",
    category: "Cloud & DevOps",
  },

  {
    id: 6,
    title: "Azure DevOps Engineer",
    instructor: "Kiran Reddy",
    duration: "14 weeks",
    lessons: "105 lessons",
    tags: ["Live cohort", "Labs"],
    price: "₹6,499",
    oldPrice: "₹10,999",
    category: "Cloud & DevOps",
  },

  {
    id: 7,
    title: "Google Cloud Engineering",
    instructor: "Ravi Kumar",
    duration: "13 weeks",
    lessons: "98 lessons",
    tags: ["Cloud labs", "Projects"],
    price: "₹5,999",
    oldPrice: "₹10,999",
    category: "Cloud & DevOps",
  },


  // =======================================================
  // AI & DATA
  // =======================================================

  {
    id: 8,
    title: "Data Science & Machine Learning",
    instructor: "Ananya Sharma",
    duration: "20 weeks",
    lessons: "140 lessons",
    tags: ["Projects", "Python"],
    price: "₹7,499",
    oldPrice: "₹12,999",
    category: "AI & Data",
  },

  {
    id: 9,
    title: "Artificial Intelligence with Python",
    instructor: "Rahul Sharma",
    duration: "18 weeks",
    lessons: "125 lessons",
    tags: ["AI Projects", "Python"],
    price: "₹7,999",
    oldPrice: "₹13,999",
    category: "AI & Data",
  },

  {
    id: 10,
    title: "Generative AI & LLM Engineering",
    instructor: "Arjun Rao",
    duration: "16 weeks",
    lessons: "110 lessons",
    tags: ["GenAI", "Projects"],
    price: "₹8,499",
    oldPrice: "₹14,999",
    category: "AI & Data",
  },


  // =======================================================
  // TESTING
  // =======================================================

  {
    id: 11,
    title: "Software Testing Automation",
    instructor: "Vikram Rao",
    duration: "12 weeks",
    lessons: "95 lessons",
    tags: ["Selenium", "Automation"],
    price: "₹4,999",
    oldPrice: "₹8,999",
    category: "Testing",
  },

  {
    id: 12,
    title: "Java Selenium Automation",
    instructor: "Karthik Reddy",
    duration: "14 weeks",
    lessons: "110 lessons",
    tags: ["Selenium", "Java"],
    price: "₹5,499",
    oldPrice: "₹9,999",
    category: "Testing",
  },

  {
    id: 13,
    title: "API Testing with Postman",
    instructor: "Meghana Rao",
    duration: "8 weeks",
    lessons: "65 lessons",
    tags: ["Postman", "API Testing"],
    price: "₹3,999",
    oldPrice: "₹6,999",
    category: "Testing",
  },


  // =======================================================
  // CAREER
  // =======================================================

  {
    id: 14,
    title: "Full Stack Developer Career Program",
    instructor: "Pathway Experts",
    duration: "24 weeks",
    lessons: "180 lessons",
    tags: ["Projects", "Career support"],
    price: "₹9,999",
    oldPrice: "₹17,999",
    category: "Career",
  },

  {
    id: 15,
    title: "Software Developer Interview Preparation",
    instructor: "Career Team",
    duration: "8 weeks",
    lessons: "70 lessons",
    tags: ["DSA", "Mock interviews"],
    price: "₹3,499",
    oldPrice: "₹5,999",
    category: "Career",
  },

];