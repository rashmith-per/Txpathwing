// Backend-ready job data structure
// Later this can be replaced with GET /api/careers/jobs/
 
export const initialJobs = [
  {
    id: "job-1",
    title: "Java Full Stack Developer",
    department: "Technology",
    location: "Hyderabad",
    employmentType: "Full Time",
    experience: "2-4 Years",
    description: "Build scalable applications using Java, Spring Boot, React and SQL.",
    skills: ["Java", "Spring Boot", "React", "SQL", "REST API"],
    aboutRole: "As a Java Full Stack Developer at TX Pathwing, you will design, develop, and maintain high-performance learning platform applications. You will collaborate with product designers, curriculum architects, and backend specialists to build real-time educational tools and enterprise dashboard solutions.",
    responsibilities: [
      "Develop robust backend REST APIs using Java and Spring Boot framework.",
      "Build modular, responsive frontend interfaces with React and modern state management.",
      "Design database schemas, write optimized SQL queries, and manage data integrity.",
      "Collaborate with cross-functional teams to integrate interactive coding environments.",
      "Ensure code quality, test coverage, security best practices, and CI/CD automation."
    ],
    requirements: [
      "2-4 years of professional experience in Java and Spring Boot ecosystem.",
      "Strong proficiency with React.js, modern JavaScript (ES6+), and CSS layout systems.",
      "Demonstrated experience with relational databases (PostgreSQL/MySQL) and JPA/Hibernate.",
      "Solid grasp of OOP principles, RESTful architecture, and Git workflows.",
      "Bachelor's degree in Computer Science, IT, or equivalent practical experience."
    ]
  },
  {
    id: "job-2",
    title: "React Developer",
    department: "Technology",
    location: "Hyderabad / Remote",
    employmentType: "Full Time",
    experience: "1-3 Years",
    description: "Create modern, responsive interfaces for TX Pathwing's learning ecosystem.",
    skills: ["React", "JavaScript", "HTML", "CSS", "REST API"],
    aboutRole: "We are seeking a creative and detail-oriented React Developer to craft seamless student and mentor experiences. You will translate wireframes and user journeys into high-performing, accessible web interfaces.",
    responsibilities: [
      "Build reusable, well-documented React UI components for the web platform and student portal.",
      "Optimize frontend performance, rendering speed, and cross-browser responsiveness.",
      "Consume backend REST APIs and handle complex application state seamlessly.",
      "Work closely with UI/UX designers to bring interaction mockups to life.",
      "Maintain clean code standards, accessibility (WCAG), and responsive layouts."
    ],
    requirements: [
      "1-3 years of proven experience building responsive web apps with React.js.",
      "Strong knowledge of JavaScript, modern HTML5, CSS3, and component styling patterns.",
      "Familiarity with REST APIs, state management, and modern build tools (Vite/Webpack).",
      "Passion for sleek user interfaces and pixel-perfect attention to detail.",
      "Experience with Git and collaborative version control."
    ]
  },
  {
    id: "job-3",
    title: "Java Trainer",
    department: "Training",
    location: "Hyderabad",
    employmentType: "Full Time",
    experience: "2-5 Years",
    description: "Help students develop practical Java and software-development skills.",
    skills: ["Java", "OOP", "Spring Boot", "Communication"],
    aboutRole: "Inspire the next wave of engineers. As a Java Trainer, you will conduct live, hands-on instructional sessions, mentor aspiring developers on real-world projects, and demystify complex software concepts.",
    responsibilities: [
      "Deliver engaging, hands-on training sessions in Core Java, Advanced Java, and Spring Boot.",
      "Guide students through capstone coding projects, code reviews, and debugging practice.",
      "Develop practical assignments, coding quizzes, and project blueprints.",
      "Conduct mock technical interviews and provide constructive feedback to learners.",
      "Stay updated with the latest industry patterns to keep curricula modern and relevant."
    ],
    requirements: [
      "2-5 years of industry development or technical training experience in Java.",
      "Deep understanding of Object-Oriented Programming, Data Structures, and Spring Boot.",
      "Exceptional verbal and written communication skills in English.",
      "Genuine empathy and enthusiasm for teaching, mentoring, and student growth."
    ]
  },
  {
    id: "job-4",
    title: "Python Trainer & Mentor",
    department: "Training",
    location: "Hyderabad",
    employmentType: "Full Time",
    experience: "2-4 Years",
    description: "Guide learners through practical Python programming, backend web development, and data workflows.",
    skills: ["Python", "Django", "Data Structures", "Mentorship"],
    aboutRole: "Help aspiring developers break into the tech industry by delivering immersive Python training and guiding capstone portfolio projects.",
    responsibilities: [
      "Conduct classroom and virtual training on Python fundamentals, OOP, and web frameworks.",
      "Mentor students on hands-on project builds using Django/Flask and REST APIs.",
      "Assess student progress, provide feedback on assignments, and lead code walkthroughs.",
      "Help prepare learners for technical rounds and coding assessments."
    ],
    requirements: [
      "2+ years of software development or teaching experience with Python.",
      "Strong grasp of Python, SQL, REST APIs, and software fundamentals.",
      "Strong presentation and communication abilities."
    ]
  },
  {
    id: "job-5",
    title: "UI/UX Designer",
    department: "Design",
    location: "Hyderabad / Remote",
    employmentType: "Full Time",
    experience: "1-3 Years",
    description: "Design intuitive, delightful learning interfaces and design system components.",
    skills: ["Figma", "UI Design", "User Research", "Prototyping", "Design Systems"],
    aboutRole: "Shape the visual and interactive identity of TX Pathwing products. You will work on learner dashboards, course discovery flows, and internal administrative tooling.",
    responsibilities: [
      "Create high-fidelity UI wireframes, interactive prototypes, and user journey maps in Figma.",
      "Maintain and evolve our design system with reusable typography, tokens, and components.",
      "Conduct user research and usability testing with learners and trainers.",
      "Collaborate closely with frontend engineers to ensure design fidelity during implementation."
    ],
    requirements: [
      "1-3 years of UI/UX design experience for web and mobile web platforms.",
      "A strong design portfolio showcasing clean layouts, design thinking, and typography.",
      "Mastery of Figma, auto-layout, and interactive prototyping.",
      "Good understanding of web constraints and frontend development basics."
    ]
  },
  {
    id: "job-6",
    title: "Business Development Executive (BDE)",
    department: "Sales & Marketing",
    location: "Hyderabad",
    employmentType: "Full Time",
    experience: "1-3 Years",
    description: "Drive student admissions, college partnerships, and institutional outreach initiatives.",
    skills: ["EdTech Sales", "Lead Generation", "Communication", "Relationship Building"],
    aboutRole: "Connect aspiring learners with career-transforming training programs. You will be the first point of contact for prospective students and institutional partners.",
    responsibilities: [
      "Counsel prospective candidates regarding program offerings, career pathways, and outcomes.",
      "Handle inbound inquiries, conduct follow-ups, and convert leads into enrollments.",
      "Build relationships with colleges and training institutions for campus training drives.",
      "Meet and exceed monthly and quarterly enrollment goals."
    ],
    requirements: [
      "1-3 years of sales or admissions counseling experience in EdTech or higher education.",
      "Outstanding consultative communication and active listening skills.",
      "Goal-driven mindset with strong organizational and CRM tracking abilities."
    ]
  },
  {
    id: "job-7",
    title: "Student Relationship Executive",
    department: "Student Success",
    location: "Hyderabad",
    employmentType: "Full Time",
    experience: "0-2 Years",
    description: "Support students from onboarding to placement, ensuring high engagement and satisfaction.",
    skills: ["Student Counseling", "Communication", "Problem Solving", "CRM"],
    aboutRole: "Ensure every learner feels supported throughout their learning journey. You will guide students through batch schedules, resolve academic queries, and assist in placement preparation.",
    responsibilities: [
      "Act as the dedicated point of contact for enrolled students across their program lifecycle.",
      "Coordinate batch schedules, attendance tracking, and feedback collection.",
      "Help coordinate placement drives, resume submission reviews, and mock sessions.",
      "Identify at-risk learners proactively and coordinate mentorship interventions."
    ],
    requirements: [
      "0-2 years of experience in student support, client relations, or academic counseling.",
      "Empathetic communicator with strong interpersonal skills.",
      "Comfortable with Google Sheets, CRM tools, and communication channels."
    ]
  },
  {
    id: "job-8",
    title: "Operations Executive",
    department: "Operations",
    location: "Hyderabad",
    employmentType: "Full Time",
    experience: "1-3 Years",
    description: "Manage day-to-day batch coordination, classroom facilities, and logistical operations.",
    skills: ["Operations", "Coordination", "MS Office", "Reporting"],
    aboutRole: "Keep our learning hubs running seamlessly. You will orchestrate operational schedules, trainer availability, and physical & virtual classroom infrastructure.",
    responsibilities: [
      "Coordinate classroom allocation, lab infrastructure, and hardware setup for hybrid batches.",
      "Manage trainer schedules, batch timetables, and holiday rosters.",
      "Handle administrative reporting, student documentation, and office operations.",
      "Collaborate with HR and management on logistics for campus and internal events."
    ],
    requirements: [
      "1-3 years of administrative or operational experience in educational or corporate setups.",
      "Strong coordination, multitasking, and problem-solving skills.",
      "Proficient in spreadsheet management and workflow organization."
    ]
  },
  {
    id: "job-9",
    title: "Full Stack Developer Intern",
    department: "Technology",
    location: "Hyderabad",
    employmentType: "Internship",
    experience: "Fresher / Student",
    description: "Work with engineering mentors to build real features on our live learning platform.",
    skills: ["React", "JavaScript", "Node.js", "Git", "HTML/CSS"],
    aboutRole: "An intensive hands-on internship designed for fast learners eager to gain real-world product experience with high conversion potential to full-time roles.",
    responsibilities: [
      "Assist in developing user-facing features under the guidance of senior software engineers.",
      "Write clean, modular code with peer reviews and automated tests.",
      "Debug platform issues, explore new UI libraries, and optimize page load times.",
      "Participate in daily engineering standups and sprint planning."
    ],
    requirements: [
      "Recent graduate or final-year student in Computer Science, IT, or related technical field.",
      "Hands-on foundational knowledge of React, JavaScript, and Web fundamentals.",
      "Demonstrated personal or academic coding projects on GitHub.",
      "Hungry to learn, ask questions, and build production-level software."
    ]
  }
];
 
// Department cards data
export const departmentCards = [
  {
    id: "tech",
    department: "Technology",
    icon: "Code2",
    description: "Build cutting-edge learning platforms, real-time code environments, and scalable systems.",
    roles: ["Java Developer", "React Developer", "Full Stack Developer"]
  },
  {
    id: "training",
    department: "Training",
    icon: "GraduationCap",
    description: "Inspire future tech leaders through hands-on technical instruction and 1-on-1 mentorship.",
    roles: ["Java Trainer", "Python Trainer", "Technical Mentor"]
  },
  {
    id: "sales",
    department: "Sales & Marketing",
    icon: "TrendingUp",
    description: "Expand our community reach, drive student enrollment, and forge corporate hiring ties.",
    roles: ["BDE", "Digital Marketing", "Content Creator"]
  },
  {
    id: "success",
    department: "Student Success",
    icon: "HeartHandshake",
    description: "Guide candidates through their career transformation, from day one to landing their dream role.",
    roles: ["Student Relationship Executive", "Career Counselor", "Support Executive"]
  },
  {
    id: "design",
    department: "Design",
    icon: "Palette",
    description: "Craft modern, accessible, and intuitive digital interfaces that make learning feel effortless.",
    roles: ["UI/UX Designer", "Graphic Designer", "Motion Designer"]
  },
  {
    id: "ops",
    department: "Operations",
    icon: "Briefcase",
    description: "Orchestrate our learning centers, batch logistics, human resources, and campus operations.",
    roles: ["Operations Executive", "HR Executive", "Admin Executive"]
  }
];
 
// Why TX Pathwing - 5 Value proposition cards
export const whyCards = [
  {
    id: 1,
    title: "Grow With Us",
    description: "Take ownership, learn new technologies and build your career.",
    icon: "TrendingUp"
  },
  {
    id: 2,
    title: "Learn Every Day",
    description: "Access learning resources and develop new technical skills.",
    icon: "BookOpen"
  },
  {
    id: 3,
    title: "Build Real Products",
    description: "Work on platforms that help learners build real-world skills.",
    icon: "Cpu"
  },
  {
    id: 4,
    title: "Collaborate & Innovate",
    description: "Work with talented people across different teams and roles.",
    icon: "Users"
  },
  {
    id: 5,
    title: "Make an Impact",
    description: "Help learners develop skills and create new opportunities.",
    icon: "Sparkles"
  }
];
 
// Career Growth tracks
export const careerTracks = {
  Technology: [
    { title: "Intern", level: "01", desc: "Foundations, code reviews, guided feature development." },
    { title: "Junior Developer", level: "02", desc: "Feature ownership, modular development, API integration." },
    { title: "Developer", level: "03", desc: "Full-cycle delivery, performance tuning, system design." },
    { title: "Senior Developer", level: "04", desc: "Architecture, mentorship, code quality leadership." },
    { title: "Tech Lead", level: "05", desc: "Technical roadmap, team enablement, architectural vision." }
  ],
  Training: [
    { title: "Associate Mentor", level: "01", desc: "Lab guidance, student Q&A, assignment grading." },
    { title: "Technical Trainer", level: "02", desc: "Live batch delivery, practical project coaching." },
    { title: "Senior Trainer", level: "03", desc: "Curriculum structuring, advanced framework workshops." },
    { title: "Lead Instructor", level: "04", desc: "Trainer training, corporate delivery, pedagogy design." },
    { title: "Head of Academics", level: "05", desc: "Course outcome standards, academic leadership." }
  ],
  Design: [
    { title: "Design Intern", level: "01", desc: "Visual assets, component styling, layout mockups." },
    { title: "Junior UI/UX Designer", level: "02", desc: "User flows, screen wireframing, prototype builds." },
    { title: "Product Designer", level: "03", desc: "Design systems, usability testing, feature design." },
    { title: "Senior Designer", level: "04", desc: "Design leadership, interaction standards, creative strategy." },
    { title: "Design Lead", level: "05", desc: "Brand experience, product design vision across all platforms." }
  ],
  Business: [
    { title: "Management Trainee", level: "01", desc: "Market research, student outreach, lead assistance." },
    { title: "BDE", level: "02", desc: "Direct student counseling, admission drive execution." },
    { title: "Senior BDE", level: "03", desc: "Institutional partnerships, campus recruitment coordination." },
    { title: "Business Lead", level: "04", desc: "Team targets, strategic alliances, regional outreach." },
    { title: "Growth Director", level: "05", desc: "Revenue strategy, corporate placements, organizational growth." }
  ],
  Operations: [
    { title: "Operations Assistant", level: "01", desc: "Facility prep, classroom scheduling, inventory tracking." },
    { title: "Operations Executive", level: "02", desc: "Batch coordination, attendance reporting, logistics." },
    { title: "Senior Operations Lead", level: "03", desc: "Process optimization, center management, vendor relations." },
    { title: "Operations Manager", level: "04", desc: "Cross-department workflows, scaling operational efficiency." },
    { title: "Head of Operations", level: "05", desc: "Company-wide infrastructure, policies, strategic operations." }
  ]
};
 
// Learning & Development cards
export const learningCards = [
  {
    id: 1,
    title: "Mentorship",
    description: "Learn from experienced professionals.",
    icon: "UserCheck",
    detail: "Direct 1-on-1 guidance from tech leaders and seasoned domain specialists."
  },
  {
    id: 2,
    title: "Technical Training",
    description: "Develop modern technology skills.",
    icon: "Laptop",
    detail: "Continuous access to our full suite of courses, hands-on labs, and resources."
  },
  {
    id: 3,
    title: "Certifications",
    description: "Build industry-recognized credentials.",
    icon: "Award",
    detail: "Sponsored professional certifications to validate your deepening expertise."
  },
  {
    id: 4,
    title: "Workshops",
    description: "Participate in technical and professional workshops.",
    icon: "Presentation",
    detail: "Regular internal hackathons, guest speaker seminars, and skill-swap sessions."
  }
];
 
// Hiring Process - 6 steps
export const hiringSteps = [
  {
    step: "01",
    title: "Apply",
    description: "Submit your application."
  },
  {
    step: "02",
    title: "Review",
    description: "Our team reviews your profile."
  },
  {
    step: "03",
    title: "Interview",
    description: "Meet the relevant team."
  },
  {
    step: "04",
    title: "Final Discussion",
    description: "Discuss the role and expectations."
  },
  {
    step: "05",
    title: "Offer",
    description: "Review the opportunity and next steps."
  },
  {
    step: "06",
    title: "Welcome",
    description: "Start your TX Pathwing journey."
  }
];
 
// Employee Stories placeholders
export const employeeStories = [
  {
    id: 1,
    name: "Team Member",
    role: "Full Stack Engineer",
    department: "Technology",
    photo: null,
    isPlaceholder: true,
    testimonial: "Employee story will appear here."
  },
  {
    id: 2,
    name: "Team Member",
    role: "Technical Trainer",
    department: "Training",
    photo: null,
    isPlaceholder: true,
    testimonial: "Employee story will appear here."
  },
  {
    id: 3,
    name: "Team Member",
    role: "Student Success Specialist",
    department: "Student Success",
    photo: null,
    isPlaceholder: true,
    testimonial: "Employee story will appear here."
  }
];
 
// Benefits & Perks
export const benefitsList = [
  {
    id: 1,
    title: "Learning Opportunities",
    description: "Free access to all TX Pathwing learning modules, labs, and course materials.",
    icon: "BookOpen"
  },
  {
    id: 2,
    title: "Professional Development",
    description: "Structured mentorship, regular technical training, and certification support.",
    icon: "TrendingUp"
  },
  {
    id: 3,
    title: "Team Events",
    description: "Quarterly hackathons, tech talks, collaborative retreats, and team celebrations.",
    icon: "Users"
  },
  {
    id: 4,
    title: "Flexible Work Options",
    description: "Balanced hybrid opportunities for select engineering and design roles.",
    icon: "Clock"
  },
  {
    id: 5,
    title: "Recognition",
    description: "Performance acknowledgements, peer shoutouts, and transparent career progression.",
    icon: "Award"
  }
];
 
// Life at TX Pathwing gallery items
export const lifeGalleryItems = [
  {
    id: 1,
    title: "Team Collaboration",
    category: "Team Collaboration",
    description: "Engineers and designers collaborating during our sprint review.",
    image: null,
    aspect: "landscape"
  },
  {
    id: 2,
    title: "Interactive Training Sessions",
    category: "Training Sessions",
    description: "Live hands-on coding walkthrough in our modern tech lab.",
    image: null,
    aspect: "square"
  },
  {
    id: 3,
    title: "Innovation Workshops",
    category: "Workshops",
    description: "Exploring next-gen AI tools and modern web frameworks.",
    image: null,
    aspect: "landscape"
  },
  {
    id: 4,
    title: "Tech Celebrations & Hackathons",
    category: "Events",
    description: "Learners and mentors celebrating project milestones.",
    image: null,
    aspect: "portrait"
  },
  {
    id: 5,
    title: "Modern Office Environment",
    category: "Office Environment",
    description: "Dynamic work zones designed for deep focus and open collaboration.",
    image: null,
    aspect: "landscape"
  },
  {
    id: 6,
    title: "Mentorship & Growth",
    category: "Training Sessions",
    description: "One-on-one technical problem solving and code mentoring.",
    image: null,
    aspect: "square"
  }
];
 
 