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

export const aboutContent = {
  headline: [
    { text: "Curious Mind.", tone: "white" as const },
    { text: "Creative Soul.", tone: "purple" as const },
    { text: "Problem Solver.", tone: "cyan" as const },
  ],
  introBefore: "I'm an AI & ML undergraduate at Manipal University Jaipur crafting ",
  introHighlight: "meaningful digital experiences",
  introAfter:
    " — from clinical ML and geospatial analysis to human-centered software that actually helps people.",
  stats: [
    { value: "2+", label: "Years of Learning", icon: "code" as const, tone: "pink" as const },
    { value: "15+", label: "Projects Built", icon: "rocket" as const, tone: "cyan" as const },
    { value: "8+", label: "Technologies", icon: "gear" as const, tone: "purple" as const },
    { value: "100%", label: "Passion", icon: "heart" as const, tone: "magenta" as const },
  ],
  values: [
    {
      title: "Always Learning",
      text: "I enjoy exploring new technologies and staying curious.",
      icon: "bulb" as const,
      tone: "cyan" as const,
    },
    {
      title: "Love Building",
      text: "I build clean, efficient and user-friendly solutions.",
      icon: "puzzle" as const,
      tone: "purple" as const,
    },
    {
      title: "Goal Oriented",
      text: "I focus on creating impact and delivering results.",
      icon: "target" as const,
      tone: "pink" as const,
    },
  ],
  quoteBefore: "I believe in consistency, creativity and the power of code to create a ",
  quoteHighlight: "better tomorrow",
  traits: [
    {
      title: "Innovative",
      text: "I enjoy creating smart and modern solutions.",
      icon: "rocket" as const,
      tone: "cyan" as const,
      position: "tr" as const,
    },
    {
      title: "Developer",
      text: "I write clean code and build scalable applications.",
      icon: "code" as const,
      tone: "purple" as const,
      position: "mr" as const,
    },
    {
      title: "Collaborative",
      text: "I love working with people and sharing ideas.",
      icon: "heart" as const,
      tone: "pink" as const,
      position: "br" as const,
    },
    {
      title: "Dreamer",
      text: "I have big dreams and I'm constantly working towards them.",
      icon: "star" as const,
      tone: "cyan" as const,
      position: "bl" as const,
    },
  ],
};

export const navItems = [
  { id: "home", label: "Home", href: "/" },
  { id: "about", label: "About", href: "/about" },
  { id: "skills", label: "Skills", href: "/skills" },
  { id: "projects", label: "Projects", href: "/projects" },
  { id: "publications", label: "Publications", href: "/publications" },
  { id: "experience", label: "Experience", href: "/experience" },
  { id: "achievements", label: "Achievements", href: "/achievements" },
  { id: "contact", label: "Contact", href: "/contact" },
] as const;

export type SkillTone = "cyan" | "purple" | "pink";

export type TechnicalSkill = {
  name: string;
  icon: "python" | "cpp" | "html" | "js" | "css";
  tone: SkillTone;
};

export type AdditionalSkill = {
  name: string;
  icon: "ml" | "comms" | "team";
  tone: SkillTone;
};

export type ToolSkill = {
  name: string;
  icon: "git" | "latex" | "colab" | "gee" | "gis";
};

export const technicalSkills: TechnicalSkill[] = [
  { name: "Python", icon: "python", tone: "purple" },
  { name: "C++", icon: "cpp", tone: "cyan" },
  { name: "HTML", icon: "html", tone: "pink" },
  { name: "JavaScript", icon: "js", tone: "purple" },
  { name: "CSS", icon: "css", tone: "cyan" },
];

export const machineLearningSkills: AdditionalSkill[] = [
  { name: "TensorFlow", icon: "ml", tone: "cyan" },
  { name: "Keras", icon: "ml", tone: "purple" },
  { name: "Scikit-Learn", icon: "ml", tone: "pink" },
];

export const softSkills: AdditionalSkill[] = [
  { name: "Leadership", icon: "comms", tone: "cyan" },
  { name: "Communication", icon: "comms", tone: "purple" },
  { name: "Team Collaboration", icon: "team", tone: "pink" },
];

export const toolSkills: ToolSkill[] = [
  { name: "Git", icon: "git" },
  { name: "LaTeX", icon: "latex" },
  { name: "Google Colab", icon: "colab" },
  { name: "GEE / Google Earth Engine", icon: "gee" },
  { name: "GIS", icon: "gis" },
];

export const skillsSubtitle =
  "Languages, ML frameworks, tools, and soft skills I use to build.";

export type ProjectCategory =
  | "Web Development"
  | "Machine Learning"
  | "Others";

export const projectFilters = [
  "All",
  "Web Development",
  "Machine Learning",
  "Others",
] as const;

export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  categories: ProjectCategory[];
  stack: string[];
  featured?: boolean;
  links: {
    github?: string;
    demo?: string;
    report?: string;
    gee?: string;
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
    image: "/images/auteye.png",
    tags: ["Web Development", "ML"],
    categories: ["Web Development", "Machine Learning"],
    stack: ["Python", "Flask"],
    featured: true,
    links: {
      github: "https://github.com/Nancy20052020",
    },
    accent: "#22D3EE",
  },
  {
    id: "drought-vci",
    title:
      "Drought severity assessment using multi-temporal vegetation condition index from satellite data",
    description:
      "Google Earth Engine analysis that evaluates drought severity over time with multi-temporal vegetation condition indices from satellite imagery.",
    image: "/images/dr.png",
    tags: ["GEE", "GIS"],
    categories: ["Others"],
    stack: ["Geospatial", "Remote Sensing"],
    links: {
      report:
        "https://drive.google.com/file/d/1RZha6dBhiwGYqZHKaGM_WiZF5jK6NnmV/view?usp=drivesdk",
      gee: "https://code.earthengine.google.com/1f478591ab593ffe9bcde0a27be6fc48",
    },
    accent: "#A78BFA",
  },
  {
    id: "uhi-lst",
    title:
      "Urban heat island mapping using land surface temperature built-up density analysis",
    description:
      "Maps urban heat islands by combining land surface temperature with built-up density analysis on Google Earth Engine.",
    image: "/images/urban.png",
    tags: ["GEE", "GIS"],
    categories: ["Others"],
    stack: ["Geospatial", "Remote Sensing"],
    links: {
      report:
        "https://drive.google.com/file/d/1TFvuLC2Rm8a2FTUSVplmug-8RdcGejW3/view?usp=drivesdk",
      gee: "https://code.earthengine.google.com/170c492464d96e8cc66d885f25702049",
    },
    accent: "#F9A8D4",
  },
  {
    id: "preppilot",
    title: "PrepPilot",
    description:
      "AI-assisted prep companion for interviews and placements — structured practice, smart feedback loops, and focused revision paths.",
    image: "/images/prepilot.png",
    tags: ["Web Development", "AI"],
    categories: ["Web Development"],
    stack: ["Python", "JavaScript", "AI"],
    links: {
      github: "https://github.com/Nancy20052020",
    },
    accent: "#22D3EE",
  },
  {
    id: "multipdf",
    title: "Multi PDF Bot",
    description:
      "Conversational Q&A over multiple PDFs with voice output — powered by GPT-3.5 and ElevenLabs text-to-speech.",
    image: "/images/multipdf.png",
    tags: ["AI"],
    categories: ["Others"],
    stack: ["Python", "Flask", "OpenAI"],
    links: {
      github: "https://github.com/Nancy20052020",
    },
    accent: "#A78BFA",
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
