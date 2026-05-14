export type HtmlCourseLessonKind = "module" | "resource";

export type HtmlCourseLesson = {
  slug: string;
  kind: HtmlCourseLessonKind;
  title: string;
  label: string;
  duration: string;
  summary: string;
  objectives: string[];
  exercise: string;
};

export const htmlCourseLessons: HtmlCourseLesson[] = [
  {
    slug: "module-01",
    kind: "module",
    label: "Module 01",
    title: "Welcome to the Web",
    duration: "45 min",
    summary: "Learn what HTML is, how browsers render pages, and set up your coding environment.",
    objectives: [
      "Explain what HTML does in the web stack",
      "Install and use a code editor and browser dev tools",
      "Create and run your first index.html file",
    ],
    exercise: "Build your first page with a heading, two paragraphs, and one link.",
  },
  {
    slug: "module-02",
    kind: "module",
    label: "Module 02",
    title: "Document Anatomy",
    duration: "40 min",
    summary: "Master the HTML5 document skeleton including doctype, head metadata, and body content.",
    objectives: [
      "Use a valid HTML5 page skeleton",
      "Add charset and viewport meta tags correctly",
      "Understand the purpose of title and head metadata",
    ],
    exercise: "Create a valid HTML document and verify it with the W3C validator.",
  },
  {
    slug: "module-03",
    kind: "module",
    label: "Module 03",
    title: "Text and Headings",
    duration: "50 min",
    summary: "Structure content with heading hierarchy, paragraphs, and meaningful text emphasis.",
    objectives: [
      "Apply heading levels without skipping hierarchy",
      "Use paragraph, line break, and thematic break tags appropriately",
      "Use strong and em tags for semantic emphasis",
    ],
    exercise: "Write a short article with one h1, section headings, and semantic emphasis.",
  },
  {
    slug: "module-04",
    kind: "module",
    label: "Module 04",
    title: "Links and Navigation",
    duration: "55 min",
    summary: "Connect pages with internal and external links and build clean multi-page navigation.",
    objectives: [
      "Use anchor tags with absolute and relative paths",
      "Build a reusable navigation block",
      "Use in-page anchor links with section ids",
    ],
    exercise: "Create three pages and wire them together with a shared nav menu.",
  },
  {
    slug: "module-05",
    kind: "module",
    label: "Module 05",
    title: "Images and Multimedia",
    duration: "60 min",
    summary: "Work with images, captions, video, and audio while keeping content accessible.",
    objectives: [
      "Use img with meaningful alt text",
      "Use figure and figcaption for media context",
      "Embed video and audio with fallback source tags",
    ],
    exercise: "Build a mini gallery with four images and descriptive captions.",
  },
  {
    slug: "module-06",
    kind: "module",
    label: "Module 06",
    title: "Lists and Tables",
    duration: "55 min",
    summary: "Present structured information using list types and accessible data tables.",
    objectives: [
      "Use ordered, unordered, and definition lists",
      "Create table headers and body groups",
      "Add caption and scope attributes for accessibility",
    ],
    exercise: "Create a menu table and a recipe list page using semantic markup.",
  },
  {
    slug: "module-07",
    kind: "module",
    label: "Module 07",
    title: "Forms and Inputs",
    duration: "70 min",
    summary: "Collect user input using forms, labels, validation attributes, and grouped controls.",
    objectives: [
      "Build forms with action and method",
      "Use labels, select, textarea, checkbox, and radio controls",
      "Add required and pattern validation for better UX",
    ],
    exercise: "Build a complete contact form with validation and grouped fields.",
  },
  {
    slug: "module-08",
    kind: "module",
    label: "Module 08",
    title: "Semantic HTML5",
    duration: "60 min",
    summary: "Use semantic layout elements so content is understandable to users and machines.",
    objectives: [
      "Use header, nav, main, section, article, aside, and footer",
      "Avoid generic div-only layouts for page structure",
      "Create clear content landmarks for accessibility",
    ],
    exercise: "Refactor a div-based page into semantic HTML5 structure.",
  },
  {
    slug: "module-09",
    kind: "module",
    label: "Module 09",
    title: "HTML Entities",
    duration: "35 min",
    summary: "Display reserved symbols, special characters, and unicode safely in documents.",
    objectives: [
      "Use common entities like lt, gt, amp, copy, and nbsp",
      "Prevent parser conflicts when showing HTML examples",
      "Handle unicode and emoji with UTF-8 metadata",
    ],
    exercise: "Create a reference page showing symbols and reserved characters.",
  },
  {
    slug: "module-10",
    kind: "module",
    label: "Module 10",
    title: "Metadata and SEO",
    duration: "60 min",
    summary: "Optimize page discoverability and social sharing with metadata and Open Graph tags.",
    objectives: [
      "Write effective title and description tags",
      "Add robots and canonical tags",
      "Configure Open Graph and Twitter card metadata",
    ],
    exercise: "Optimize a business page head block for search and social preview quality.",
  },
  {
    slug: "module-11",
    kind: "module",
    label: "Module 11",
    title: "Best Practices",
    duration: "50 min",
    summary: "Improve quality with validation, formatting standards, and clean project structure.",
    objectives: [
      "Validate pages with W3C tooling",
      "Use comments and naming conventions effectively",
      "Organize files for maintainability",
    ],
    exercise: "Audit one existing page and fix all validation and structure issues.",
  },
  {
    slug: "module-12",
    kind: "module",
    label: "Module 12",
    title: "Capstone Project",
    duration: "90 min",
    summary: "Combine all course skills into a complete multi-page business website.",
    objectives: [
      "Plan and build a 5-page semantic website",
      "Apply accessibility, metadata, and validation requirements",
      "Prepare project output for portfolio and publication",
    ],
    exercise: "Build and validate a full business website with navigation, forms, tables, and media.",
  },
  {
    slug: "cheatsheet",
    kind: "resource",
    label: "Resource",
    title: "HTML Cheat Sheet",
    duration: "Reference",
    summary: "Quick lookup for tags, attributes, and common HTML entities while coding.",
    objectives: [
      "Find syntax fast while practicing",
      "Review frequently used elements",
      "Avoid common tag and attribute mistakes",
    ],
    exercise: "Use the cheat sheet to rebuild a page without searching external docs.",
  },
  {
    slug: "grading-rubric",
    kind: "resource",
    label: "Resource",
    title: "Capstone Grading Rubric",
    duration: "Reference",
    summary: "Detailed evaluation criteria used to score final course projects consistently.",
    objectives: [
      "Understand pass and fail thresholds",
      "Self-check project quality before submission",
      "Align project output with required standards",
    ],
    exercise: "Score your own capstone draft and fix weak criteria before submitting.",
  },
  {
    slug: "certificate",
    kind: "resource",
    label: "Resource",
    title: "Course Certificate",
    duration: "Reference",
    summary: "Completion certificate details and verification flow for successful learners.",
    objectives: [
      "Review certificate requirements",
      "Understand verification details",
      "Prepare final submission evidence",
    ],
    exercise: "Finalize your capstone and verify all requirements for certificate eligibility.",
  },
];

export function getHtmlCourseLesson(slug: string) {
  return htmlCourseLessons.find((lesson) => lesson.slug === slug);
}
