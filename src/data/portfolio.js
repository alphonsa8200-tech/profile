/**
 * =========================================================================
 * ALPHONSA JAISON — CENTRALIZED PORTFOLIO DATA CONFIGURATION
 * =========================================================================
 * 
 * You can customize and personalize your portfolio directly by editing this file!
 * Any changes made here will automatically reflect across the entire website.
 */

export const personalInfo = {
  name: "Alphonsa Jaison",
  shortName: "Alphonsa",
  initials: "AJ",
  title: "Full Stack Developer",
  statusBadge: "Open to Opportunities • Fresher",
  currentRole: "Computer Science & Engineering Student",
  location: "Kerala, India",
  tagline: "An ambitious and curious CSE student with a creative mindset, a passion for learning, and the determination to turn challenges into opportunities and ideas into meaningful innovations.",
  heroDescription: "An ambitious and curious CSE student passionate about creating meaningful digital experiences through technology, creativity, and problem-solving.",
  careerObjective: "To become a skilled software developer, work on impactful products, and continuously grow as a technology professional.",
  
  aboutMe: {
    lead: "I am a Computer Science and Engineering student passionate about full-stack development, exploring new technologies, and building meaningful digital solutions.",
    body: "I enjoy turning ideas into real-world applications and continuously improving my development skills. Guided by technical curiosity and an eye for creative aesthetics, I strive to design intuitive, high-performance web experiences.",
    objective: "To become a skilled software developer, work on impactful products, and continuously grow as a technology professional."
  },

  personality: "Creative and curious.",
  
  strengths: [
    {
      id: "strength-1",
      title: "Quick Learner",
      description: "Rapidly grasps novel concepts, modern web frameworks, and algorithmic techniques with high self-direction.",
      icon: "Zap",
      color: "from-blue-500/10 to-indigo-500/10"
    },
    {
      id: "strength-2",
      title: "Creative Thinker",
      description: "Blends technical rigor with design sensibility to craft polished user experiences and out-of-the-box solutions.",
      icon: "Sparkles",
      color: "from-amber-500/10 to-orange-500/10"
    },
    {
      id: "strength-3",
      title: "Adaptability",
      description: "Easily transitions across diverse development stacks, collaborative environments, and emerging industry tools.",
      icon: "Compass",
      color: "from-emerald-500/10 to-teal-500/10"
    },
    {
      id: "strength-4",
      title: "Problem Solving",
      description: "Breaks complex engineering challenges into modular, clean, and maintainable software components.",
      icon: "Cpu",
      color: "from-purple-500/10 to-violet-500/10"
    }
  ],

  interests: [
    "Full Stack Web Development",
    "UI/UX and Creative Design",
    "Problem Solving",
    "Learning New Technologies"
  ],

  // Social Links & Placeholders (clearly designated for personal update)
  socials: {
    github: {
      url: "https://github.com",
      placeholder: "[Your GitHub URL]",
      label: "GitHub"
    },
    linkedin: {
      url: "https://linkedin.com",
      placeholder: "[Your LinkedIn URL]",
      label: "LinkedIn"
    },
    email: {
      address: "alphonsa.jaison.dev@gmail.com", // clearly designated contact email
      placeholder: "[your.email@example.com]",
      label: "Email"
    }
  },

  resume: {
    fileName: "Alphonsa_Jaison_Resume.pdf",
    isPlaceholder: true,
    lastUpdated: "November 2026",
    placeholderMessage: "Resume file placeholder: Replace this with your actual PDF resume in src/assets/documents/ or configure your cloud link."
  }
};

/**
 * TECHNICAL SKILLS
 * Organized into 6 distinct categories.
 * Update these with your finalized skills and tools.
 */
export const skillCategories = [
  {
    id: "languages",
    title: "Programming Languages",
    description: "Core languages utilized for software logic, scripting, and application architecture.",
    skills: [
      { name: "JavaScript (ES6+)", level: "Core", highlight: true },
      { name: "C", level: "Academic Core", highlight: false },
      { name: "C++", level: "Academic Core", highlight: false },
      { name: "Java", level: "OOP Fundamentals", highlight: false },
      { name: "Python", level: "Foundational", highlight: false }
    ]
  },
  {
    id: "frontend",
    title: "Frontend Development",
    description: "Modern web tools and frameworks for crafting dynamic, responsive interfaces.",
    skills: [
      { name: "React.js", level: "Primary", highlight: true },
      { name: "Tailwind CSS", level: "Styling", highlight: true },
      { name: "HTML5", level: "Semantic Markup", highlight: true },
      { name: "CSS3", level: "Responsive Layouts", highlight: true },
      { name: "Framer Motion", level: "Animations", highlight: false },
      { name: "Responsive UI", level: "Mobile-First", highlight: false }
    ]
  },
  {
    id: "backend",
    title: "Backend Development",
    description: "Server-side runtimes, APIs, and business logic implementation.",
    skills: [
      { name: "Node.js", level: "Runtime", highlight: true },
      { name: "Express.js", level: "REST APIs", highlight: true },
      { name: "RESTful Architecture", level: "API Design", highlight: false },
      { name: "JSON / HTTP", level: "Data Exchange", highlight: false }
    ]
  },
  {
    id: "databases",
    title: "Databases & Storage",
    description: "Relational and document data storage systems for structured records.",
    skills: [
      { name: "MySQL", level: "Relational (SQL)", highlight: true },
      { name: "MongoDB", level: "NoSQL", highlight: false },
      { name: "PostgreSQL", level: "Relational (SQL)", highlight: false }
    ]
  },
  {
    id: "devtools",
    title: "Development Tools",
    description: "Version control, build environments, and developer productivity utilities.",
    skills: [
      { name: "Git", level: "Version Control", highlight: true },
      { name: "GitHub", level: "Collaboration", highlight: true },
      { name: "VS Code", level: "Editor", highlight: true },
      { name: "Vite", level: "Build Tool", highlight: false },
      { name: "Postman", level: "API Testing", highlight: false },
      { name: "npm", level: "Package Manager", highlight: false }
    ]
  },
  {
    id: "design",
    title: "UI/UX & Design Tools",
    description: "Visual design, prototyping, and user-centric wireframing applications.",
    skills: [
      { name: "Figma", level: "Prototyping & Layouts", highlight: true },
      { name: "Canva", level: "Visual Assets", highlight: false },
      { name: "Wireframing", level: "UX Workflow", highlight: false },
      { name: "Design Systems", level: "UI Consistency", highlight: false }
    ]
  }
];

/**
 * PROJECTS SHOWCASE
 * Clearly marked placeholders until actual project repositories and live URLs are added.
 */
export const projectsData = [
  {
    id: "project-1",
    isPlaceholder: true,
    title: "Full-Stack Web Application",
    subtitle: "[Placeholder Project 01]",
    tagline: "A responsive full-stack platform built with modern React, RESTful API architecture, and database integration.",
    description: "This is a placeholder for your primary full-stack development project. Replace this entry with your actual project details, including key features built, architectural choices made, and problems solved.",
    category: "Full Stack",
    image: null,
    gradient: "from-blue-600 to-indigo-700",
    tags: ["React.js", "Node.js", "Express", "Tailwind CSS", "MongoDB"],
    features: [
      "User authentication and protected role-based routing",
      "Dynamic REST API communication with robust error handling",
      "Responsive, accessible UI with mobile-first grid layout",
      "State management and real-time data persistence"
    ],
    githubUrl: "https://github.com",
    githubPlaceholder: "[Your Project GitHub URL]",
    liveUrl: "https://example.com",
    livePlaceholder: "[Your Live Demo URL]"
  },
  {
    id: "project-2",
    isPlaceholder: true,
    title: "Modern UI/UX Web Experience",
    subtitle: "[Placeholder Project 02]",
    tagline: "An interactive, animation-rich web application focusing on micro-interactions and editorial design.",
    description: "This is a placeholder for your design-focused or creative frontend project. Replace with your actual frontend work, showing your skills in translating Figma prototypes into pixel-perfect code.",
    category: "Frontend & UI",
    image: null,
    gradient: "from-indigo-600 to-purple-700",
    tags: ["React", "Tailwind CSS", "Framer Motion", "Figma", "Vite"],
    features: [
      "Smooth physics-based micro-interactions and scroll reveals",
      "Custom design system with consistent typography tokens",
      "Optimized asset loading and high Lighthouse accessibility score",
      "Touch-friendly navigation and responsive layout"
    ],
    githubUrl: "https://github.com",
    githubPlaceholder: "[Your Project GitHub URL]",
    liveUrl: "https://example.com",
    livePlaceholder: "[Your Live Demo URL]"
  },
  {
    id: "project-3",
    isPlaceholder: true,
    title: "Campus / Academic Software System",
    subtitle: "[Placeholder Project 03]",
    tagline: "A structured software engineering project solving real-world student and academic management needs.",
    description: "This is a placeholder for your academic, capstone, or mini-project developed during your Computer Science & Engineering degree coursework.",
    category: "Academic / Core",
    image: null,
    gradient: "from-teal-600 to-blue-700",
    tags: ["JavaScript / C++", "MySQL", "Database Design", "DSA"],
    features: [
      "Relational schema design with normalized tables and keys",
      "CRUD operations and automated reporting workflows",
      "Algorithm optimization for fast data retrieval",
      "Structured documentation and test-case validation"
    ],
    githubUrl: "https://github.com",
    githubPlaceholder: "[Your Project GitHub URL]",
    liveUrl: "https://example.com",
    livePlaceholder: "[Your Live Demo URL]"
  }
];

/**
 * ACADEMIC JOURNEY / EDUCATION
 * Supports Degree, College, Location, Batch, Coursework, and Achievements.
 */
export const educationData = [
  {
    id: "btech-cse",
    degree: "Bachelor of Technology (B.Tech)",
    field: "Computer Science and Engineering",
    institution: "[Your College / University Name]",
    location: "Kerala, India",
    duration: "[Start Year — Completion Year]",
    status: "Currently Pursuing (Fresher)",
    isPlaceholder: true,
    description: "Building strong foundational knowledge in computer science principles, software architecture, data structures, and practical application engineering.",
    relevantCoursework: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming (OOP)",
      "Database Management Systems (DBMS)",
      "Web Technologies & Application Engineering",
      "Software Engineering & Agile Methodologies",
      "Operating Systems & Computer Networks"
    ],
    achievements: [
      "Actively developing technical and practical skills through project-based learning.",
      "Engaged in technical symposiums, hands-on lab experiments, and collaborative team challenges."
    ]
  },
  {
    id: "higher-secondary",
    degree: "Higher Secondary Education (Class XII)",
    field: "Computer Science / Science Stream",
    institution: "[Your School / Higher Secondary Institution Name]",
    location: "Kerala, India",
    duration: "[Year of Completion]",
    status: "Completed",
    isPlaceholder: true,
    description: "Developed strong analytical reasoning, mathematical thinking, and early programming curiosity.",
    relevantCoursework: [
      "Computer Science Fundamentals",
      "Mathematics",
      "Physics & Chemistry"
    ],
    achievements: [
      "Built early interest in software logic and computational problem solving."
    ]
  }
];

/**
 * CERTIFICATIONS & ACHIEVEMENTS
 * Organized into categories with placeholders clearly marked.
 */
export const achievementsData = [
  {
    id: "cert-1",
    category: "Certification",
    title: "[Placeholder] Web Development Certification",
    issuer: "[Issuing Authority, e.g. Coursera / Udemy / NPTEL / FreeCodeCamp]",
    date: "[Year / Month]",
    isPlaceholder: true,
    description: "Comprehensive coursework covering full-stack concepts, responsive layout design, and modern JavaScript techniques.",
    badge: "Verified Credential Placeholder",
    linkText: "View Certificate Placeholder"
  },
  {
    id: "workshop-1",
    category: "Workshop",
    title: "[Placeholder] Technical Workshop & Hands-on Boot Camp",
    issuer: "[Organizing Institution or Tech Community]",
    date: "[Year]",
    isPlaceholder: true,
    description: "Participated in an intensive hands-on practical session exploring modern developer workflows and software engineering practices.",
    badge: "Workshop Participation",
    linkText: null
  },
  {
    id: "hackathon-1",
    category: "Competition",
    title: "[Placeholder] Hackathon / Coding Challenge Participant",
    issuer: "[Event Name / College Technical Fest]",
    date: "[Year]",
    isPlaceholder: true,
    description: "Collaborated in high-energy problem-solving sprints, turning conceptual challenges into functioning prototypes within designated timeframes.",
    badge: "Hackathon Sprint",
    linkText: null
  },
  {
    id: "academic-1",
    category: "Milestone",
    title: "[Placeholder] Academic Project Presentation & Tech Showcase",
    issuer: "[Department of Computer Science & Engineering]",
    date: "[Academic Term]",
    isPlaceholder: true,
    description: "Presented technical findings and interactive software demonstrations to peer groups and faculty mentors.",
    badge: "Academic Recognition",
    linkText: null
  }
];

/**
 * NAVIGATION LINKS
 */
export const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#education" },
  { name: "Achievements", href: "#achievements" },
  { name: "Contact", href: "#contact" }
];

