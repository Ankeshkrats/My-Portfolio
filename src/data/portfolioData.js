// Central data file — saara portfolio content yahan se manage hota hai

export const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Skills", path: "/skills" },
  { name: "Projects", path: "/projects" },
  { name: "Experience", path: "/experience" },
  { name: "Contact", path: "/contact" },
];

export const socials = {
  github: "https://github.com/Ankeshkrats",
  linkedin: "https://linkedin.com/in/ankesh-kumar921",
  email: "mailto:kumarankesh921@gmail.com",
};

export const heroStats = [
  { label: "Experience", value: "1+ Years" },
  { label: "Projects", value: "10+" },
  { label: "Technologies", value: "15+" },
];

export const techStack = [
  { name: "Next.js", icon: "nextjs" },
  { name: "React", icon: "react" },
  { name: "Tailwind CSS", icon: "tailwind" },
  { name: "Node.js", icon: "nodejs" },
  { name: "Express.js", icon: "express" },
  { name: "MongoDB", icon: "mongodb" },
  { name: "Python", icon: "python" },
  { name: "TensorFlow", icon: "tensorflow" },
];

export const allProjects = [
  {
    title: "AI Assignment Evaluator",
    category: "AI/ML",
    description:
      "A comprehensive full-stack system built as a final-year B.Tech project using Next.js, Node.js, Express.js, and MongoDB, integrating the Gemini API for generative AI evaluations.",
    tags: ["Next.js", "AI/ML", "MongoDB"],
    link: "https://assignment-evaluator-ten.vercel.app",
    github: "https://github.com/Ankeshkrats",
    icon: "file",
  },
  {
    title: "BMSK Weather Chatbot",
    category: "Web",
    description:
      "A hierarchical, menu-driven weather chatbot and dashboard built for the Bihar Mausam Seva Kendra (BMSK), providing real-time weather data coverage across all 38 districts of Bihar and their respective blocks.",
    tags: ["Next.js", "OpenWeather API", "AI"],
    link: "#",
    github: "https://github.com/Ankeshkrats/Bmsk_ChatBot1",
    icon: "bot",
  },
  {
    title: "Loan Approval Prediction Platform",
    category: "AI/ML",
    description:
      "ML-powered platform that predicts loan approval outcomes based on applicant financial and demographic data.",
    tags: ["Python", "ML", "Flask"],
    link: "https://loan-predict-479a.onrender.com",
    github: "https://github.com/Ankeshkrats",
    icon: "trending-up",
  },
  {
    title: "House Price Predictor",
    category: "AI/ML",
    description:
      "ML model to predict house prices based on location, size, and other property features.",
    tags: ["Python", "ML", "Flask"],
    link: "#",
    github: "https://github.com/Ankeshkrats",
    icon: "home",
  },
  {
    title: "Spam Detection System",
    category: "AI/ML",
    description:
      "A machine learning based system that classifies messages as spam or not spam using NLP techniques.",
    tags: ["Python", "NLP", "ML"],
    link: "#",
    github: "https://github.com/Ankeshkrats",
    icon: "shield",
  },
];

export const featuredProjects = allProjects.slice(0, 3);

export const education = [
  {
    degree: "B.Tech, CSE (Artificial Intelligence)",
    place: "Purnea College of Engineering",
    detail: "CGPA: 8.17",
  },
  {
    degree: "Diploma, Mechanical Engineering",
    place: "Government Polytechnic, Banka",
    detail: "",
  },
];

export const experience = [
  {
    role: "ML Research Intern",
    company: "iHub DivyaSampark, IIT Roorkee",
    duration: "Summer 2024",
    description:
      "Worked on machine learning research projects, contributing to model development and experimentation.",
    tech: ["Python", "ML Research", "Model Evaluation", "Scikit-Learn"],
  },
  {
    role: "Full-Stack Development Intern",
    company: "Invigo Infotech",
    duration: "Winter 2023",
    description:
      "Built and maintained full-stack web applications using modern JavaScript frameworks and backend technologies.",
    tech: ["React", "Node.js", "Express.js", "REST APIs", "MongoDB"],
  },
  {
    role: "Telecommunications Intern",
    company: "East Central Railway",
    duration: "Summer 2023",
    description:
      "Gained hands-on exposure to telecommunications systems and infrastructure in a real-world railway environment.",
    tech: ["Telecom Systems", "Infrastructure", "Signal Systems", "Networking"],
  },
];

export const skillGroups = [
  {
    title: "Languages",
    color: "blue",
    skills: [
      { name: "Python", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "C++", level: 70 },
      { name: "SQL", level: 75 },
    ],
  },
  {
    title: "Frameworks & Libraries",
    color: "cyan",
    skills: [
      { name: "React", level: 88 },
      { name: "Next.js", level: 80 },
      { name: "Node.js", level: 82 },
      { name: "Express.js", level: 80 },
      { name: "Tailwind CSS", level: 90 },
    ],
  },
  {
    title: "AI / ML",
    color: "purple",
    skills: [
      { name: "TensorFlow", level: 75 },
      { name: "NLP", level: 78 },
      { name: "Scikit-learn", level: 80 },
      { name: "LLMs / Groq API", level: 85 },
    ],
  },
  {
    title: "Databases & Tools",
    color: "emerald",
    skills: [
      { name: "MongoDB", level: 82 },
      { name: "Git & GitHub", level: 88 },
      { name: "Vercel", level: 85 },
      { name: "Render", level: 80 },
    ],
  },
];
