# AI for Beginners — Next.js Course App

A complete interactive AI course built with Next.js, featuring sequential progression, exercise validation, and project tracking.

## Features

- **8 Course Modules** with 24 lessons and 30+ exercises
- **Sequential Progression** — Students must complete each lesson before unlocking the next
- **Interactive Exercises** with instant feedback (multiple-choice & checkbox)
- **Green/Red Visual Feedback** — Correct answers turn green, incorrect show red with explanations
- **Progress Tracking** via localStorage
- **Project-Based Learning** — Each module ends with a hands-on project
- **Ethiopian-Themed** — Content tailored for the Ethiopian community

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Lucide React Icons

## Getting Started

### 1. Install Dependencies

```bash
cd ai-course-nextjs
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 3. Build for Production

```bash
npm run build
```

This creates a static export in the `out/` directory.

## Course Structure

| Module | Title | Lessons | Exercises |
|--------|-------|---------|-----------|
| 1 | What is AI? | 3 | 8 |
| 2 | AI Around You | 3 | 4 |
| 3 | Mastering Prompts | 3 | 5 |
| 4 | How AI Learns | 3 | 4 |
| 5 | AI for Creativity | 2 | 2 |
| 6 | AI for Work | 2 | 2 |
| 7 | Build Your Project | 2 | 2 |
| 8 | Ethics & Future | 2 | 3 |

## How It Works

### Exercise Validation
- Students select answers and click "Submit"
- **Correct**: Green border, checkmark, points awarded, explanation shown
- **Incorrect**: Red border, X mark, shake animation, "Try Again" button appears
- After retrying, correct answers are marked green with full explanation

### Progression System
- Module 1 is unlocked by default
- Each subsequent module unlocks only when the previous is completed
- Lessons within a module unlock sequentially
- The "Next Lesson" button is disabled (shows lock icon) until current lesson is completed

### Scoring
- Each exercise has point values (10-15 points)
- Points are awarded only on first correct attempt
- Total score displayed in the progress bar

## Customizing Content

Edit `lib/courseData.ts` to modify:
- Module titles and descriptions
- Lesson content (supports markdown-like syntax)
- Exercise questions, options, correct answers, and explanations
- Project steps and deliverables

## File Structure

```
ai-course-nextjs/
├── app/
│   ├── module/[id]/page.tsx    # Module overview page
│   ├── lesson/[...slug]/page.tsx # Lesson page with exercises
│   ├── page.tsx                 # Home / course overview
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Styles
├── components/
│   ├── ExerciseComponent.tsx    # Interactive exercise UI
│   ├── ModuleCard.tsx           # Module card on home page
│   └── ProgressBar.tsx          # Course progress indicator
├── lib/
│   ├── courseData.ts            # All course content
│   └── progress.ts              # Progress management
├── types/
│   └── course.ts                # TypeScript types
└── package.json
```

## License

Open source — built for the Ethiopian AI learning community.

---

**AIን አብረን እንማር — Let's Learn AI Together!** 🇪🇹
