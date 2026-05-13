export type Service = {
  title: string;
  description: string;
};

export type ProjectItem = {
  slug: string;
  title: string;
  category: string;
  summary: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  content: string;
};

export type DemoProfile = {
  name: string;
  username: string;
  avatarUrl: string;
  role: string;
  location: string;
  bio: string;
  publicEmail: string;
  links: { label: string; href: string }[];
  publicAssets: {
    cv: string;
    portfolio: string;
    businessCard: string;
  };
};

export const navItems = [
  { labelEn: "Home", labelAm: "መነሻ", href: "/" },
  { labelEn: "About", labelAm: "ስለ እኛ", href: "/about" },
  { labelEn: "Services", labelAm: "አገልግሎቶች", href: "/services" },
  { labelEn: "Projects", labelAm: "ፕሮጀክቶች", href: "/projects" },
  { labelEn: "Blog", labelAm: "ብሎግ", href: "/blog" },
  { labelEn: "Education", labelAm: "ትምህርት", href: "/education" },
  { labelEn: "Jobs", labelAm: "ስራዎች", href: "/jobs" },
  { labelEn: "Teams", labelAm: "ቡድኖች", href: "/teams" },
  { labelEn: "Discover", labelAm: "ፈልግ", href: "/discover" },
  { labelEn: "Contact", labelAm: "ያግኙን", href: "/contact" },
];

export const services: Service[] = [
  {
    title: "Website Development",
    description:
      "Custom, high-performance websites designed for conversion, trust, and long-term maintainability.",
  },
  {
    title: "Portfolio Creation",
    description:
      "Strategic personal and professional portfolio design that highlights achievements with clarity.",
  },
  {
    title: "Business App Development",
    description:
      "Scalable web apps for operations, customer engagement, and internal team productivity.",
  },
  {
    title: "IT Consulting",
    description:
      "Architecture and technology guidance for startups, personal brands, and growing businesses.",
  },
  {
    title: "Digital Identity Management",
    description:
      "Unified public profile, private credentials, and custom visibility control in one secure dashboard.",
  },
  {
    title: "Blogging & Publishing",
    description:
      "A clean publishing system for articles, updates, announcements, and thought leadership.",
  },
];

export const projects: ProjectItem[] = [
  {
    slug: "brand-launch-system",
    title: "Brand Launch System",
    category: "Identity",
    summary: "A complete profile + website system for solo consultants entering global markets.",
  },
  {
    slug: "career-hub-ethiopia",
    title: "Career Hub Ethiopia",
    category: "Platform",
    summary: "Professional profile discovery experience with CV and portfolio visibility controls.",
  },
  {
    slug: "studio-dashboard",
    title: "Studio Dashboard",
    category: "SaaS",
    summary: "Internal dashboard for service management, client tracking, and content operations.",
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "why-digital-identity-matters",
    title: "Why Your Digital Identity Is Your New Business Card",
    excerpt:
      "A practical guide to building trust online with a profile that is clear, searchable, and credible.",
    date: "2026-05-01",
    content:
      "A strong digital identity helps clients, recruiters, and collaborators understand who you are quickly. Ethioweb combines profile, CV, portfolio, and verified links in a single destination.",
  },
  {
    slug: "how-to-build-a-converting-portfolio",
    title: "How to Build a Portfolio That Brings Opportunities",
    excerpt:
      "The core structure and content strategy used in high-performing professional portfolios.",
    date: "2026-04-12",
    content:
      "A portfolio should show outcomes, not only screenshots. Use clear project context, role, result metrics, and downloadable proof like certificates and case studies.",
  },
];

export const demoProfiles: DemoProfile[] = [
  {
    name: "Dawit Bekele",
    username: "dawitb",
    avatarUrl: "",
    role: "Full-Stack Developer & Consultant",
    location: "Addis Ababa, Ethiopia",
    bio: "I help founders and professionals build digital products and online identity systems.",
    publicEmail: "dawit@ethioweb.net",
    links: [
      { label: "LinkedIn", href: "https://linkedin.com" },
      { label: "GitHub", href: "https://github.com" },
      { label: "Personal Site", href: "https://ethioweb.net" },
    ],
    publicAssets: {
      cv: "/assets/demo-cv.pdf",
      portfolio: "/assets/demo-portfolio.pdf",
      businessCard: "/assets/demo-business-card.vcf",
    },
  },
  {
    name: "Rahel Abebe",
    username: "rahelab",
    avatarUrl: "",
    role: "Product Designer",
    location: "Nairobi, Kenya",
    bio: "Designing practical digital experiences for startups and mission-driven teams.",
    publicEmail: "rahel@ethioweb.net",
    links: [
      { label: "Behance", href: "https://behance.net" },
      { label: "Dribbble", href: "https://dribbble.com" },
    ],
    publicAssets: {
      cv: "/assets/rahel-cv.pdf",
      portfolio: "/assets/rahel-portfolio.pdf",
      businessCard: "/assets/rahel-business-card.vcf",
    },
  },
];
