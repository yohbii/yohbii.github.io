export const site = {
  name: "Lihong Lin",
  title: "Lihong Lin | Robotics, Generative Modeling & World Models",
  description:
    "Lihong Lin, incoming PhD student at FudanCVL Lab. Research interests in robotics, generative modeling, world models, and embodied intelligence.",
  url: "https://yohbii.github.io",
  email: "linlh@mails.neu.edu.cn",
  location: "Northeastern University"
};

export const navigation = [
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#publications", label: "Publications" },
  { href: "/blog/", label: "Blogs" }
];

export const profile = {
  summary:
    "I am an undergraduate student in Software Engineering at Northeastern University and an incoming Ph.D. student at FudanCVL Lab, advised by Prof. Henghui Ding. My research interests lie in robotics, generative modeling, world models, and embodied intelligence.",
  interests: [
    "Robotics",
    "Generative Modeling",
    "World Models",
    "Embodied Intelligence"
  ],
  links: [
    { href: "mailto:linlh@mails.neu.edu.cn", label: "Email" },
    { href: "https://github.com/yohbii", label: "GitHub" },
    { href: "https://scholar.google.com/citations?user=OeHnALIAAAAJ&hl=zh-CN&authuser=1", label: "Google Scholar" },
    // { href: "/rss.xml", label: "RSS" }
  ]
};

type SelectedPublication = {
  title: string;
  venue: string;
  year: string;
  description: string;
};

export const selectedPublications: SelectedPublication[] = [];

type ExperienceItem = {
  href: string;
  logo: string;
  organization: string;
  role: string;
  period: string;
  description: string;
};

export const experiences: ExperienceItem[] = [
  {
    organization: "FudanCVL Lab · Fudan University",
    href: "https://henghuiding.com/",
    logo: "/logos/fudan.ico",
    role: "Incoming Ph.D. Student · Advised by Prof. Henghui Ding",
    period: "2026 – Present",
    description: "Incoming Ph.D. student advised by Prof. Henghui Ding."
  },
  {
    organization: "Meituan LongCat · Robotics Group",
    href: "https://longcat.ai/",
    logo: "/logos/longcat.svg",
    role: "Research Intern",
    period: "2026 – Present",
    description: "Research internship in the robotics group at Meituan LongCat."
  },
  {
    organization: "Northeastern University",
    href: "https://www.neu.edu.cn/",
    logo: "/logos/neu.ico",
    role: "B.Eng. Student in Software Engineering",
    period: "2023 - 2027 (Expected)",
    description:
      "Undergraduate student working on research topics around Model Merging, Efficient LLMs, LLM Application."
  }
];

type NewsItem = {
  date: string;
  title: string;
  description: string;
};

export const news: NewsItem[] = [
  {
    date: "May 2026",
    title: "Two papers accepted as ICML 2026 posters",
    description:
      "Two of my papers were accepted as posters at ICML 2026."
  },
  {
    date: "Sep 2025",
    title: "One paper accepted as a NeurIPS 2025 poster",
    description:
      "One of my papers was accepted as a poster at NeurIPS 2025."
  }
];

type ProjectItem = {
  title: string;
  description: string;
  href?: string;
};

export const projects: ProjectItem[] = [];

type AwardItem = {
  title: string;
  issuer: string;
  year: string;
  description?: string;
};

export const awards: AwardItem[] = [];
