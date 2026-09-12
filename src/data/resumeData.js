export const profile = {
  name: "Devendra Mankar",
  role: "Full-Stack Java Developer",
  location: "Pune, Maharashtra",
  email: "mankardevendra33@gmail.com",
  phone: "+91 6266052782",
  github: "https://github.com/Deven-ai12",
  linkedin: "https://www.linkedin.com/in/devendra-mankar-136690228",
  summary:
    "I build secure, scalable web systems — from authenticated REST APIs to real-time data pipelines. My stack centers on Java, Spring Boot and React, with a strong grounding in data structures, database design and microservice architecture.",
};

export const skillGroups = [
  {
    label: "Languages",
    items: ["Java", "SQL", "C", "C++"],
  },
  {
    label: "Frontend",
    items: ["React.js", "Tailwind CSS", "HTML5", "CSS3", "Responsive Design"],
  },
  {
    label: "Backend",
    items: [
      "Spring Boot",
      "Spring MVC",
      "Spring Security",
      "REST APIs",
      "JDBC",
      "Hibernate",
      "JPA",
      "JWT Auth",
      "Microservices",
    ],
  },
  {
    label: "Data",
    items: ["MySQL", "MongoDB"],
  },
  {
    label: "Tooling",
    items: ["Git", "GitHub", "Maven", "Postman", "Docker", "CI/CD", "JUnit"],
  },
  {
    label: "Foundations",
    items: ["DSA", "DBMS", "Computer Networks", "OOP", "Design Patterns", "Agile"],
  },
];

export const experience = [
  {
    role: "Java Full Stack Development Intern",
    org: "Complete Java Classes",
    period: "Dec 2025 — May 2026",
    duration: "6 Months",
    points: [
      "Built a full-stack web app using React.js and Spring Boot with seamless frontend-backend integration.",
      "Designed responsive React.js UI components connected to dynamic Spring Boot REST APIs.",
      "Developed and tested 50+ REST API endpoints, validating workflows using Postman.",
      "Secured endpoints with JWT authentication and Spring Security for reliable session management.",
      "Performed CRUD operations using MySQL, Spring Data JPA and Hibernate with clean coding practices.",
    ],
  },
];

export const education = {
  degree: "B.Tech in Information Technology",
  school: "Indore Institute of Science and Technology, Indore",
  period: "Nov 2021 — May 2025",
  coursework: [
    "Data Structures",
    "Algorithms",
    "Database Management Systems",
    "Web Development",
    "Computer Networks",
  ],
};

export const projects = [
  {
    id: "tradeflow",
    name: "TradeFlow",
    tagline: "Real-Time Trading Platform",
    description:
      "A full-stack trading platform with JWT-based authentication, email verification and complete portfolio management. Streams live stock prices via the Finnhub API over WebSocket, and surfaces holdings, transaction history and performance in an interactive dashboard.",
    stack: [
      "Java",
      "Spring Boot",
      "Spring Security",
      "JWT",
      "Hibernate",
      "MySQL",
      "WebSocket",
      "Finnhub API",
      "React.js",
    ],
    highlights: [
      "30+ REST APIs across auth, stock management and trade execution",
      "Real-time price streaming via WebSocket + Finnhub",
      "Portfolio dashboard with holdings and P&L history",
    ],
    link: "https://tradeflow-frontend-nine.vercel.app",
    linkLabel: "Live Demo",
  },
  {
    id: "cybershieldai",
    name: "CyberShieldAI",
    tagline: "Backend Platform",
    description:
      "A modular Spring Boot backend built on Java 21 with a clean, layered architecture. Stateless JWT authentication secures every endpoint, with Spring Mail and WebSocket handling real-time notifications and communication.",
    stack: [
      "Java 21",
      "Spring Boot",
      "Spring Security",
      "JWT",
      "Spring Data JPA",
      "Hibernate",
      "MySQL",
      "WebSocket",
      "Spring Mail",
    ],
    highlights: [
      "Stateless JWT auth across all API endpoints",
      "Transactional email + real-time WebSocket messaging",
      "Tested with JUnit, Spring Security Test and H2",
    ],
    link: null,
    linkLabel: null,
  },
];
