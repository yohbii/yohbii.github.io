export const site = {
  name: "Lihong Lin",
  title: "Lihong Lin | Research and Notes",
  description:
    "An academic personal website for research notes, essays, and occasional reflections.",
  url: "https://yohbii.github.io",
  email: "linlh@mails.neu.edu.cn",
  location: "Northeastern University"
};

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/blog/", label: "Blogs" }
];

export const profile = {
  summary:
    "👋 Hi, I am an undergraduate student in Software Engineering at Northeastern University and a research intern at the FudanCVL Lab led by Prof. Henghui Ding. My research interests include computer vision, AIGC, world models, and multimodal understanding.",
  interests: [
    "Computer Vision",
    "AIGC",
    "World Model",
    "Embodied AI",
    "Multimodal Understanding"
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
  organization: string;
  role: string;
  period: string;
  description: string;
};

export const experiences: ExperienceItem[] = [
  {
    organization: "Northeastern University",
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
