export const profile = {
  name: "Nancy Verma",
  firstName: "Nancy",
  lastName: "Verma",
  titleRoles: [
    "AI & ML Enthusiast",
    "Problem Solver",
    "Innovator",
    "Software Engineer",
  ],
  tagline:
    "Building intelligent systems at the intersection of machine learning, geospatial tech, and human-centered software.",
  email: "nancy2005nov@gmail.com",
  phone: "+91 9821657484",
  location: "Jaipur, India",
  education: {
    school: "Manipal University Jaipur",
    degree: "B.Tech in Artificial Intelligence & Machine Learning",
    years: "2023 – 2027",
    cgpa: "9.79 / 10",
  },
  links: {
    github: "https://github.com/Nancy20052020",
    linkedin: "https://linkedin.com/in/nancy-verma",
    leetcode: "https://leetcode.com/u/Nancy2005",
    portfolio: "https://nancy20052020.github.io/Portfolio",
  },
};

export const navItems = [
  { id: "home", label: "Home", href: "/" },
  { id: "about", label: "About", href: "/about" },
  { id: "skills", label: "Skills", href: "/skills" },
  { id: "projects", label: "Projects", href: "/projects" },
  { id: "experience", label: "Journey", href: "/experience" },
  { id: "achievements", label: "Achievements", href: "/achievements" },
  { id: "publications", label: "Publications", href: "/publications" },
  { id: "contact", label: "Contact", href: "/contact" },
] as const;

export type SkillItem = {
  name: string;
  shape: "ribbon" | "crystal" | "atom" | "cube" | "cylinder" | "chip" | "orb" | "hex";
};

export const skills: Record<string, SkillItem[]> = {
  Languages: [
    { name: "Python", shape: "ribbon" },
    { name: "C++", shape: "hex" },
    { name: "HTML", shape: "chip" },
    { name: "JavaScript", shape: "orb" },
    { name: "CSS", shape: "chip" },
  ],
  "Machine Learning": [
    { name: "TensorFlow", shape: "crystal" },
    { name: "Keras", shape: "crystal" },
    { name: "Scikit-Learn", shape: "orb" },
  ],
  Tools: [
    { name: "Git", shape: "cube" },
    { name: "React", shape: "atom" },
    { name: "LaTeX", shape: "chip" },
    { name: "Google Colab", shape: "orb" },
    { name: "Google Earth Engine", shape: "cylinder" },
  ],
  "Soft Skills": [
    { name: "Leadership", shape: "orb" },
    { name: "Communication", shape: "ribbon" },
    { name: "Team Collaboration", shape: "atom" },
  ],
};

export type Project = {
  id: string;
  title: string;
  description: string;
  stack: string[];
  links: {
    github?: string;
    demo?: string;
    code?: string;
  };
  accent: string;
};

export const projects: Project[] = [
  {
    id: "auteye",
    title: "AutEye",
    description:
      "Web platform that leverages eye-tracking data and ML models to assist in early autism detection — improving accessibility and awareness.",
    stack: ["Python", "Flask", "ML", "HTML/CSS/JS"],
    links: {
      github: "https://github.com/Nancy20052020",
    },
    accent: "#B79AF5",
  },
  {
    id: "drought-vci",
    title:
      "Drought severity assessment using multi-temporal vegetation condition index from satellite data",
    description:
      "Google Earth Engine analysis that evaluates drought severity over time with multi-temporal vegetation condition indices from satellite imagery.",
    stack: ["Google Earth Engine", "JavaScript", "Remote Sensing", "GIS"],
    links: {
      demo: "https://drive.google.com/file/d/1RZha6dBhiwGYqZHKaGM_WiZF5jK6NnmV/view?usp=drivesdk",
      code: "https://code.earthengine.google.com/1f478591ab593ffe9bcde0a27be6fc48",
    },
    accent: "#C8D7FF",
  },
  {
    id: "uhi-lst",
    title:
      "Urban heat island mapping using land surface temperature built-up density analysis",
    description:
      "Maps urban heat islands by combining land surface temperature with built-up density analysis on Google Earth Engine.",
    stack: ["Google Earth Engine", "GIS", "Satellite Data", "JavaScript"],
    links: {
      demo: "https://drive.google.com/file/d/1TFvuLC2Rm8a2FTUSVplmug-8RdcGejW3/view?usp=drivesdk",
      code: "https://code.earthengine.google.com/170c492464d96e8cc66d885f25702049",
    },
    accent: "#F7D7CC",
  },
  {
    id: "preppilot",
    title: "PrepPilot",
    description:
      "AI-assisted prep companion for interviews and placements — structured practice, smart feedback loops, and focused revision paths.",
    stack: ["Python", "JavaScript", "AI", "Web"],
    links: {
      github: "https://github.com/Nancy20052020",
    },
    accent: "#EBC9A7",
  },
  {
    id: "multipdf",
    title: "Multi PDF Bot",
    description:
      "Conversational Q&A over multiple PDFs with voice output — powered by GPT-3.5 and ElevenLabs text-to-speech.",
    stack: ["Python", "Flask", "OpenAI", "ElevenLabs"],
    links: {
      github: "https://github.com/Nancy20052020",
    },
    accent: "#C9C0E7",
  },
];

export type ExperienceItem = {
  role: string;
  org: string;
  period: string;
  description: string;
  current: boolean;
  year: string;
};

export const experience: ExperienceItem[] = [
  {
    role: "Software Engineering Intern",
    org: "Grids App LLC",
    period: "Jul 2026 – Present",
    year: "2026",
    description:
      "Building production software features end-to-end — shipping reliable, user-facing product work in a fast-moving engineering team.",
    current: true,
  },
  {
    role: "Remote Sensing & GIS Intern",
    org: "Indian Truth Academy",
    period: "May 2026 – Jul 2026",
    year: "2026",
    description:
      "Completed hands-on remote sensing and GIS projects using satellite data and Google Earth Engine, producing analysis pipelines and geospatial deliverables.",
    current: false,
  },
  {
    role: "WE Scholar",
    org: "Google & TalentSprint",
    period: "2024",
    year: "2024",
    description:
      "Selected from over 30,000 applicants for an intensive Data Structures & Algorithms program.",
    current: false,
  },
  {
    role: "Google Immersion Week",
    org: "Google",
    period: "2024",
    year: "2024",
    description:
      "Engaged in 15+ hours of exclusive sessions covering AI, career development, and personalized mentorship.",
    current: false,
  },
  {
    role: "SheFi Scholar",
    org: "SheFi",
    period: "2024",
    year: "2024",
    description:
      "Expanded knowledge in blockchain and Web3, developing smart contracts and decentralized applications.",
    current: false,
  },
];

export const achievements = [
  {
    title: "Dean’s List",
    detail: "CGPA of 9+ sustained across 2023 – 2026",
    icon: "trophy" as const,
  },
  {
    title: "Dr. TMA Pai Merit Scholarship",
    detail: "Awarded for academic excellence (2023 – 2027)",
    icon: "star" as const,
  },
  {
    title: "500+ Commits on Git",
    detail: "Consistent open contribution and version control practice",
    icon: "code" as const,
  },
  {
    title: "Hackathon Finalist & Winner",
    detail:
      "IIC 2024 (Top 17%), Prastuti Ideathon Finalist, Tech for Non-Tech — 2nd Place",
    icon: "award" as const,
  },
];

export const publications = [
  {
    title: "Enhancing Fish Species Recognition: Deep Learning Models Evaluation",
    venue: "IEEE ICDSNS 2024",
    description:
      "Compared ResNet, VGG16, InceptionV3, and CNN for fish species recognition — achieving 95%+ accuracy.",
    links: {
      ieee: "https://ieeexplore.ieee.org/",
    },
  },
  {
    title: "Autism Detection through Eye Tracking",
    venue: "Multi-country Patent (India & Germany)",
    description:
      "Eye-tracking based system to detect early signs of autism spectrum disorder in children.",
    links: {
      india: "#",
      germany: "#",
    },
  },
];
