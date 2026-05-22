import { Module } from "@/types/course"

export const courseModules: Module[] = [
  {
    id: "module-1",
    number: 1,
    title: "What is AI?",
    subtitle: "Building Your Mental Model",
    description: "Define AI, debunk myths, and understand why AI matters for Ethiopia.",
    locked: false,
    completed: false,
    lessons: [
      {
        id: "m1-l1",
        title: "AI is Not What You Think",
        completed: false,
        content: `
## The Movie Myth vs. Reality

| 🤖 The Movies Say... | 🌍 The Reality Is... |
|:---|:---|
| AI is a robot with feelings | AI is software on your phone — no consciousness |
| AI will take over the world | AI is a tool; humans decide how to use it |
| AI is only for geniuses | AI is now as easy as using WhatsApp |
| AI knows everything perfectly | AI makes mistakes and can be wrong |

### The Simple Definition

**Artificial Intelligence (AI)** = Computer systems that can perform tasks that normally need human intelligence — like recognizing faces, understanding speech, or recommending music.

### The Three Levels of AI

**🔷 NARROW AI** (What we have today)
- Does ONE thing very well
- Examples: Google Translate, Spotify recommendations, Siri
- 99.9% of all AI is Narrow AI

**🔶 GENERAL AI** (Does not exist yet)
- Could do anything a human can
- Experts estimate: maybe 10-50 years away

**🔴 SUPER AI** (Science fiction for now)
- Smarter than all humans combined
- No one knows if this is possible

### Why AI Matters for Ethiopia

AI is already being used in Ethiopia for:
- 🌾 **Agriculture**: Satellite + AI crop monitoring
- 🏥 **Health**: AI-assisted TB diagnosis from X-rays
- 🏦 **Banking**: AI fraud detection for mobile money
- 📚 **Education**: AI-powered language learning
- 🛒 **Business**: AI market price prediction

> **The Opportunity:** Ethiopia doesn't need to catch up by copying. We can **leapfrog** — jump straight to modern AI solutions for our unique problems.
`,
        exercises: [
          {
            id: "m1-l1-e1",
            type: "multiple-choice",
            question: "What percentage of current AI is 'Narrow AI' (designed for one specific task)?",
            options: ["50%", "75%", "99.9%", "25%"],
            correctAnswer: "99.9%",
            explanation: "99.9% of all AI today is Narrow AI — systems designed for one specific task like translation, recommendations, or image recognition. General AI that can do anything a human can does not exist yet.",
            points: 10,
          },
          {
            id: "m1-l1-e2",
            type: "multiple-choice",
            question: "Which of the following is TRUE about AI?",
            options: [
              "AI is conscious and has feelings",
              "AI is only for tech experts and programmers",
              "AI is a tool that humans control and direct",
              "AI will replace all human jobs by 2030",
            ],
            correctAnswer: "AI is a tool that humans control and direct",
            explanation: "AI is a tool that humans create, control, and direct. It has no consciousness, feelings, or desires. While AI will change many jobs, humans remain essential for creativity, empathy, judgment, and ethical decision-making.",
            points: 10,
          },
          {
            id: "m1-l1-e3",
            type: "multiple-choice",
            question: "In Ethiopia, AI is currently being used in which sector to predict crop yields and detect drought early?",
            options: ["Banking", "Agriculture", "Entertainment", "Transportation"],
            correctAnswer: "Agriculture",
            explanation: "In Ethiopia, AI is being applied in agriculture through satellite monitoring and image analysis to predict crop yields, detect drought conditions early, and help farmers make better decisions.",
            points: 10,
          },
        ],
      },
      {
        id: "m1-l2",
        title: "The AI Family Tree",
        completed: false,
        content: `
## Understanding the Relationship

Don't confuse these terms! Here's how they relate:

**Artificial Intelligence (AI)** is the big umbrella.
- **Machine Learning (ML)** is one method to achieve AI
- **Deep Learning** is a powerful type of ML
- **Neural Networks** are the building blocks of Deep Learning

### Quick Definitions

| Term | Simple Explanation | Ethiopian Example |
|:---|:---|:---|
| **Machine Learning (ML)** | Teaching computers by showing examples, not writing rules | Showing an app 1000 photos of teff vs. wheat until it learns the difference |
| **Deep Learning** | A powerful type of ML using "brain-like" networks | The technology behind Amharic speech recognition in your phone |
| **Neural Network** | Layers of connected nodes that process information | Like a factory assembly line where each worker adds something |
| **Algorithm** | A step-by-step recipe for solving a problem | Like the steps to make perfect injera — but for math |
| **Model** | The finished AI system after training | The "brain" that can now recognize teff photos |
| **Training Data** | Examples used to teach the AI | The 1000 teff/wheat photos |

### The Recipe Analogy

**Traditional Programming (The Rule Book):**
A programmer writes exact rules: IF color is red AND shape is round AND size is 7-10cm THEN it's an apple.

**Machine Learning (Learning by Example):**
Show the computer 5,000 apple photos and 5,000 orange photos. The computer finds patterns itself and can identify NEW apples it has never seen!

> **Key Difference:** Traditional programming = human solves the problem. Machine Learning = computer learns to solve it from examples.
`,
        exercises: [
          {
            id: "m1-l2-e1",
            type: "multiple-choice",
            question: "What is the relationship between AI, Machine Learning, and Deep Learning?",
            options: [
              "They are three completely separate technologies",
              "Machine Learning is a subset of AI, and Deep Learning is a subset of Machine Learning",
              "Deep Learning is the biggest category, containing AI and Machine Learning",
              "AI and Machine Learning are the same thing",
            ],
            correctAnswer: "Machine Learning is a subset of AI, and Deep Learning is a subset of Machine Learning",
            explanation: "AI is the broad field. Machine Learning is one approach to achieve AI. Deep Learning is a specific, powerful type of Machine Learning that uses neural networks with many layers. Think of it as nested circles: AI contains ML, which contains Deep Learning.",
            points: 10,
          },
          {
            id: "m1-l2-e2",
            type: "multiple-choice",
            question: "In Machine Learning, what is 'Training Data'?",
            options: [
              "The final AI product that users interact with",
              "The computer code that runs the AI program",
              "The examples used to teach the AI system",
              "The money spent on developing the AI",
            ],
            correctAnswer: "The examples used to teach the AI system",
            explanation: "Training data is the collection of examples (like photos, text, or numbers) that we show to the AI so it can learn patterns. For example, 1000 photos of teff labeled 'teff' and 1000 photos of wheat labeled 'wheat' would be training data for a crop classifier.",
            points: 10,
          },
          {
            id: "m1-l2-e3",
            type: "multiple-choice",
            question: "What is the key difference between Traditional Programming and Machine Learning?",
            options: [
              "Traditional Programming is faster than Machine Learning",
              "In Traditional Programming, humans write exact rules; in Machine Learning, computers learn from examples",
              "Machine Learning requires more expensive computers",
              "Traditional Programming can only be used for simple tasks",
            ],
            correctAnswer: "In Traditional Programming, humans write exact rules; in Machine Learning, computers learn from examples",
            explanation: "In Traditional Programming, a human programmer writes every single rule the computer must follow. In Machine Learning, the human provides examples with correct answers, and the computer figures out the rules itself. This makes ML better for complex tasks like image recognition where writing explicit rules would be nearly impossible.",
            points: 10,
          },
        ],
      },
      {
        id: "m1-l3",
        title: "AI in Ethiopia — The Data Gap",
        completed: false,
        content: `
## Why Data is Everything

AI quality depends on three things:
1. **The Algorithm** (the recipe) — Open source, anyone can use
2. **The Data** (the ingredients) — Hard to get for Ethiopia
3. **Computing Power** (the kitchen) — Increasingly accessible

> **Result:** Even with the best recipe, bad ingredients = bad food!

### The Ethiopian Data Gap

| Data Type | Availability | Impact |
|:---|:---|:---|
| Amharic text | Moderate | Chatbots work okay |
| Amharic speech | Low | Voice assistants struggle |
| Ethiopian medical images | Very low | AI diagnosis less accurate |
| Local agricultural data | Low | Crop predictions less reliable |
| Ethiopian legal documents | Very low | Legal AI doesn't exist |
| Cultural context data | Very low | AI misunderstands local norms |

### What This Means for YOU

Every time you:
- Write a blog post in Amharic
- Label photos of Ethiopian scenes
- Record speech in Oromiffa
- Share local knowledge online

**You are helping build better AI for Ethiopia!**

### The Global AI Race

| Region | AI Investment (2025) |
|:---|:---|
| North America | $150 billion |
| China | $120 billion |
| Europe | $80 billion |
| Africa | $5 billion |
| Ethiopia | ~$0.3 billion |

> **The Opportunity:** Ethiopia can leapfrog traditional development stages by adopting modern AI directly.
`,
        exercises: [
          {
            id: "m1-l3-e1",
            type: "multiple-choice",
            question: "Why is Amharic speech recognition less accurate than English speech recognition?",
            options: [
              "The Amharic language is too complex for computers",
              "The phone's microphone doesn't work well with Amharic sounds",
              "There is much less training data available for Amharic compared to English",
              "Amharic uses a different alphabet that computers cannot process",
            ],
            correctAnswer: "There is much less training data available for Amharic compared to English",
            explanation: "AI accuracy directly correlates with the amount and quality of training data. English has millions of hours of recorded speech for training, while Amharic has far less. This is not because Amharic is inherently harder — it's simply a data availability problem that the community can help solve by creating more Amharic digital content.",
            points: 10,
          },
          {
            id: "m1-l3-e2",
            type: "multiple-choice",
            question: "What does 'leapfrogging' mean in the context of Ethiopia and AI?",
            options: [
              "Copying exactly what Western countries have done",
              "Skipping traditional development stages and adopting modern AI directly",
              "Waiting for other countries to develop AI first",
              "Building AI that only works in Ethiopia",
            ],
            correctAnswer: "Skipping traditional development stages and adopting modern AI directly",
            explanation: "Leapfrogging means Ethiopia can skip building legacy systems (like extensive physical bank branches) and jump directly to modern solutions (like AI-powered mobile banking). This is how Ethiopia achieved massive mobile money adoption with Telebirr — leapfrogging traditional banking infrastructure.",
            points: 10,
          },
          {
            id: "m1-l3-e3",
            type: "checkbox",
            question: "Select ALL the ways you can personally help improve AI for Ethiopia:",
            options: [
              "Write blog posts and articles in Amharic",
              "Label photos of Ethiopian scenes and culture",
              "Only use English when interacting with technology",
              "Record and share Amharic speech datasets",
              "Share local knowledge and cultural context online",
              "Ignore AI because it is not relevant to Ethiopia",
            ],
            correctAnswer: [
              "Write blog posts and articles in Amharic",
              "Label photos of Ethiopian scenes and culture",
              "Record and share Amharic speech datasets",
              "Share local knowledge and cultural context online",
            ],
            explanation: "Creating Amharic content, labeling Ethiopian images, recording speech in local languages, and sharing cultural knowledge online all contribute to the training data that AI systems need. Using only English or ignoring AI actually widens the digital divide. Every piece of local content helps build better AI for Ethiopia.",
            points: 15,
          },
        ],
      },
    ],
    project: {
      id: "m1-project",
      title: "AI Audit & Awareness Campaign",
      description: "Document every AI interaction you have for 24 hours, then create a simple awareness post for your community.",
      steps: [
        "For 24 hours, write down every AI interaction (social media, search, camera, recommendations, etc.)",
        "Count how many AI systems you interacted with",
        "Identify which interaction surprised you most",
        "Create a social media post or short message explaining one AI myth to your friends",
        "Share your findings in the course community",
      ],
      deliverables: [
        "List of 10+ AI interactions from your day",
        "One myth-busting message for your community",
        "Reflection on the most surprising AI interaction",
      ],
      completed: false,
    },
  },
  {
    id: "module-2",
    number: 2,
    title: "AI Around You",
    subtitle: "Recognition & Awareness",
    description: "Discover hidden AI in your phone, understand recommendation engines, and test AI with Amharic.",
    locked: true,
    completed: false,
    lessons: [
      {
        id: "m2-l1",
        title: "The Hidden AI in Your Pocket",
        completed: false,
        content: `
## Your Smartphone is an AI Device

### AI Systems in Your Phone

**📸 Camera AI**
- Face detection (finds faces in photos)
- Portrait mode (AI depth sensing to blur background)
- Night mode (combines multiple shots with AI)
- Scene recognition ("food", "sunset", "document")

**🎙️ Voice AI**
- Speech-to-text (converts voice to text)
- Voice assistant (Siri, Google Assistant)
- Call screening (identifies spam calls)

**🔋 System AI**
- Battery optimization (learns your habits)
- App suggestions (predicts what you'll open)
- Screen brightness (adapts to environment)

**⌨️ Keyboard AI**
- Autocorrect (learns your writing style)
- Next-word prediction
- Emoji suggestions

### Experiment: Test Your Phone's AI

**Test 1: Camera Scene Detection**
- Open your camera app
- Point at: food, a document, a person, a landscape
- Watch for the tiny AI icon or label
- **Question:** How often is it correct?

**Test 2: Voice-to-Text Accuracy**
- Open any messaging app, switch to voice input
- Say in Amharic: "ሰላም እንዴት ነህ?" (Hello, how are you?)
- Then say it in English
- **Question:** Which was more accurate? Why?

**Test 3: Keyboard Prediction**
- Open notes, type: "I love Ethiopian"
- What does it suggest next?
- **Question:** How did it know? (It learned from millions of texts!)
`,
        exercises: [
          {
            id: "m2-l1-e1",
            type: "multiple-choice",
            question: "Which of the following smartphone features uses AI?",
            options: [
              "Only the voice assistant (Siri/Google Assistant)",
              "Only the camera portrait mode",
              "Multiple features including camera, keyboard, battery, and security",
              "None — smartphones don't use AI",
            ],
            correctAnswer: "Multiple features including camera, keyboard, battery, and security",
            explanation: "Modern smartphones use AI in dozens of features: camera scene detection, portrait mode, night photography, voice-to-text, next-word prediction, battery optimization, app suggestions, spam call detection, and Face ID/fingerprint recognition. AI is deeply embedded in your daily phone experience.",
            points: 10,
          },
          {
            id: "m2-l1-e2",
            type: "multiple-choice",
            question: "Why might Amharic voice-to-text be less accurate than English voice-to-text on your phone?",
            options: [
              "Amharic is a more difficult language for computers",
              "The phone's microphone doesn't work well with Amharic sounds",
              "There is less training data for Amharic speech recognition",
              "Amharic speakers don't use voice-to-text features",
            ],
            correctAnswer: "There is less training data for Amharic speech recognition",
            explanation: "Speech recognition accuracy depends on training data quantity. English has millions of hours of training recordings, while Amharic has significantly less. This is a data problem, not a language complexity problem. As more Amharic speech data is collected, accuracy will improve.",
            points: 10,
          },
        ],
      },
      {
        id: "m2-l2",
        title: "How TikTok Knows You",
        completed: false,
        content: `
## The Recommendation Engine Explained

### The Secret Formula

**STEP 1: COLLECT**
- What you watch (and for how long)
- What you skip after 2 seconds
- What you like, share, comment
- What you search for
- Your location, time of day, device
- What "similar people" watch

**STEP 2: ANALYZE**
- "You watch 80% of cooking videos"
- "You skip political content in 3 seconds"
- "People like you love tech tutorials"
- "You watch more at 9 PM"

**STEP 3: PREDICT**
- "There's an 85% chance you'll watch this"
- Rank all possible videos by probability
- Show the highest-ranked ones first

**STEP 4: LEARN**
- Did you click? → Update prediction model
- Did you watch full video? → Strong positive signal
- Did you close app? → Maybe showed wrong content

### ⚠️ The Filter Bubble Problem

**What it is:** AI shows you more of what you already like, creating an echo chamber.

**Example:**
- You watch one video about "AI replacing jobs"
- Algorithm shows you 10 more scary AI videos
- You never see "AI creating new jobs" content
- **Result:** Your view becomes one-sided

**How to Break Your Bubble:**
1. Actively search for opposing views
2. Use "Not Interested" button on biased content
3. Follow diverse creators
4. Clear your watch history periodically
`,
        exercises: [
          {
            id: "m2-l2-e1",
            type: "multiple-choice",
            question: "What is the 'Filter Bubble' problem in recommendation algorithms?",
            options: [
              "AI filters out all negative content to protect users",
              "AI only shows you content similar to what you already like, limiting diverse perspectives",
              "AI bubbles up the most popular content regardless of your interests",
              "AI creates fake content bubbles that don't exist in reality",
            ],
            correctAnswer: "AI only shows you content similar to what you already like, limiting diverse perspectives",
            explanation: "The Filter Bubble occurs when recommendation algorithms continuously show users more of the same type of content based on their past behavior. This creates an echo chamber where users rarely encounter diverse or opposing viewpoints. For example, if you watch one video about AI job displacement, the algorithm may flood your feed with similar fear-based content while hiding positive AI stories.",
            points: 10,
          },
          {
            id: "m2-l2-e2",
            type: "multiple-choice",
            question: "Which of the following is NOT data that recommendation algorithms typically collect?",
            options: [
              "How long you watch each video",
              "Your physical home address from government records",
              "What you search for on the platform",
              "What you skip after only 2 seconds",
            ],
            correctAnswer: "Your physical home address from government records",
            explanation: "Recommendation algorithms collect behavioral data within the platform: watch time, likes, shares, searches, skips, and inferred preferences. They do NOT typically access government records or your physical home address. However, they may use approximate location (city/region) from your IP address or GPS if you granted permission.",
            points: 10,
          },
        ],
      },
      {
        id: "m2-l3",
        title: "Computer Vision & Language AI",
        completed: false,
        content: `
## Computer Vision — AI That Sees

### How It Works (Layer by Layer)

**LAYER 1:** Raw pixels (brightness of Red/Green/Blue)
**LAYER 2:** Edge detection (finds lines and curves)
**LAYER 3:** Shape detection (combines edges into shapes)
**LAYER 4:** Part detection (shapes = eyes, ears, nose)
**LAYER 5:** Object recognition ("This is a cat: 94% confidence")

### Ethiopian Vision AI in Action

Researchers are using smartphone cameras + AI to:
- Identify teff crop diseases from leaf photos
- Detect coffee cherry ripeness for harvest timing
- Spot counterfeit Ethiopian coffee in markets

### Language AI & The Amharic Challenge

| Language | Speech Recognition Accuracy | Why? |
|:---|:---|:---|
| English | ~95% | Trained on millions of hours of data |
| Mandarin | ~90% | Large investment from Chinese companies |
| Swahili | ~75% | Growing but limited data |
| **Amharic** | **~60-70%** | **Much less training data available** |

**Why this matters:** Less accurate AI for Amharic means voice assistants don't understand Ethiopian accents well, transcription services are error-prone, and AI translation loses nuance.

**The Solution:** More Ethiopians creating Amharic digital content = better AI for our language!
`,
        exercises: [
          {
            id: "m2-l3-e1",
            type: "multiple-choice",
            question: "In computer vision, what does the first layer of a neural network typically detect?",
            options: [
              "Complete objects like 'cat' or 'dog'",
              "Edges, lines, and curves in the image",
              "The emotional expression of people",
              "Text and written words",
            ],
            correctAnswer: "Edges, lines, and curves in the image",
            explanation: "In a neural network for image recognition, the first layer detects simple features like edges, lines, and curves. Each subsequent layer builds on the previous one: Layer 2 combines edges into shapes, Layer 3 identifies parts (eyes, ears), and the final layer recognizes the complete object. This hierarchical feature detection is why deep learning is so powerful for vision tasks.",
            points: 10,
          },
          {
            id: "m2-l3-e2",
            type: "multiple-choice",
            question: "What is the primary reason Amharic speech recognition is less accurate than English?",
            options: [
              "Amharic has too many dialects",
              "The Amharic alphabet has too many characters",
              "There is significantly less digital training data for Amharic",
              "Ethiopians speak too fast for computers",
            ],
            correctAnswer: "There is significantly less digital training data for Amharic",
            explanation: "The primary reason is data scarcity. English speech recognition systems have been trained on millions of hours of recorded speech from podcasts, audiobooks, videos, and voice assistants. Amharic has a much smaller corpus of digitized speech. This is a solvable problem — as more Amharic audio content is created and shared, speech recognition accuracy will improve.",
            points: 10,
          },
        ],
      },
    ],
    project: {
      id: "m2-project",
      title: "Algorithm Awareness Audit",
      description: "Analyze your social media feed algorithm and test AI translation with Ethiopian cultural content.",
      steps: [
        "Open TikTok, Instagram Reels, or YouTube Shorts and scroll through 20 videos",
        "Categorize each video: Entertainment, Educational, News, Ethiopian Content, Other",
        "Calculate the percentage of each category in your feed",
        "Test Google Translate with 3 Amharic phrases or Ethiopian proverbs",
        "Rate the accuracy and cultural nuance of each translation",
        "Document one example of AI bias you observed",
      ],
      deliverables: [
        "Feed analysis table with category percentages",
        "Translation test results (3 phrases)",
        "One documented example of AI bias",
      ],
      completed: false,
    },
  },
  {
    id: "module-3",
    number: 3,
    title: "Mastering Prompts",
    subtitle: "The Art of Prompting",
    description: "Write powerful prompts, use advanced techniques, and catch AI hallucinations.",
    locked: true,
    completed: false,
    lessons: [
      {
        id: "m3-l1",
        title: "Why Prompting Matters",
        completed: false,
        content: `
## The Cost of Bad Prompts

| Bad Prompt | Result | Time Wasted |
|:---|:---|:---|
| "Tell me about Ethiopia" | Generic Wikipedia summary | 5 more questions needed |
| "Write an email" | Basic template, not personalized | Complete rewrite needed |
| "Help me study" | Vague advice, no structure | No actual help |

## The Power of Good Prompts

**Same requests, better results:**

> "Explain Ethiopia's coffee export economy to a high schooler, using a coffee ceremony analogy, in 3 paragraphs"

> "Write a professional leave request email to my manager, requesting 3 days off for a family event, mentioning I'll complete urgent tasks before leaving"

> "Create a 7-day study plan for learning Python, 1 hour/day, assuming I know nothing, with specific free resources for each day"

**Rule:** Spend 2 minutes crafting a good prompt, save 20 minutes of back-and-forth.
`,
        exercises: [
          {
            id: "m3-l1-e1",
            type: "multiple-choice",
            question: "Why is spending time crafting a good prompt important?",
            options: [
              "It makes the AI work harder",
              "It reduces back-and-forth and saves time",
              "It proves you are a technical expert",
              "It is required by AI companies",
            ],
            correctAnswer: "It reduces back-and-forth and saves time",
            explanation: "A well-crafted prompt that includes context, specific instructions, and desired format can get you exactly what you need on the first try. This saves significant time compared to vague prompts that require multiple follow-up questions and corrections.",
            points: 10,
          },
        ],
      },
      {
        id: "m3-l2",
        title: "The ART Framework",
        completed: false,
        content: `
## A — Be Absolutely Specific

**The Specificity Ladder:**

Level 1 (Vague): "Write about health"
Level 2 (Topic): "Write about mental health in Ethiopia"
Level 3 (Audience): "Write about mental health in Ethiopia for university students"
Level 4 (Format): "Write a 500-word blog post about mental health in Ethiopia for university students, including 3 practical tips and 2 local resources in Addis Ababa"
Level 5 (Complete): "Write a 500-word empathetic blog post about managing exam stress for Ethiopian university students. Include: (1) 3 science-backed techniques, (2) 2 free counseling resources in Addis, (3) a brief note about cultural stigma. Tone: supportive, not clinical. Format: Short paragraphs, bullet points for tips."

## R — Assign a Role

**Why it works:** AI adapts its knowledge, tone, and examples to the role.

| Role | How AI Responds |
|:---|:---|
| "You are a patient teacher..." | Simpler explanations, more encouragement |
| "You are a strict editor..." | Critical feedback, catches all errors |
| "You are an Ethiopian elder..." | Cultural wisdom, traditional analogies |

## T — Specify the Template/Format

Always tell AI HOW to present information:
- Numbered list (for steps, rankings)
- Bullet points (for features, benefits)
- Table (for comparisons)
- Email/Letter format
- Q&A format
`,
        exercises: [
          {
            id: "m3-l2-e1",
            type: "multiple-choice",
            question: "In the ART framework, what does the 'R' stand for?",
            options: [
              "Repeat the question",
              "Assign a Role",
              "Request sources",
              "Reduce complexity",
            ],
            correctAnswer: "Assign a Role",
            explanation: "In the ART framework: A = Be Absolutely Specific, R = Assign a Role, T = Specify the Template/Format. Assigning a role helps AI adapt its tone, knowledge depth, and examples to match the persona you specify — like asking it to respond as a teacher, editor, or Ethiopian elder.",
            points: 10,
          },
          {
            id: "m3-l2-e2",
            type: "multiple-choice",
            question: "Which prompt is the most effective according to the ART framework?",
            options: [
              "Tell me about farming",
              "Explain farming in Ethiopia",
              "You are an agricultural expert. Write a 300-word guide for Ethiopian small-scale farmers on sustainable teff cultivation, including 3 water-saving techniques and a seasonal planting calendar. Format as bullet points.",
              "Help me learn about agriculture",
            ],
            correctAnswer: "You are an agricultural expert. Write a 300-word guide for Ethiopian small-scale farmers on sustainable teff cultivation, including 3 water-saving techniques and a seasonal planting calendar. Format as bullet points.",
            explanation: "This prompt follows all three ART principles: A (Absolutely Specific) — mentions exact word count, specific techniques, and target audience; R (Role) — assigns the agricultural expert persona; T (Template) — specifies bullet point format. The other options are too vague to produce useful, targeted output.",
            points: 15,
          },
        ],
      },
      {
        id: "m3-l3",
        title: "AI Hallucinations",
        completed: false,
        content: `
## What Are Hallucinations?

**AI Hallucination** = When AI generates confident, plausible-sounding information that is completely false.

### Common Types

| Type | Example | Danger Level |
|:---|:---|:---|
| Fake Facts | "Ethiopia's population is 150 million" (It's ~120M) | 🔴 High |
| Fake Citations | Cites a book that doesn't exist | 🔴 High |
| Fake People | Mentions a "famous Ethiopian scientist" who is made up | 🟡 Medium |
| Fake Statistics | "90% of Ethiopians use AI daily" | 🟡 Medium |

### Why Does This Happen?

AI doesn't "know" facts. It predicts what words SHOULD come next based on patterns in training data.

For common facts: "The capital of Ethiopia is..." → "Addis Ababa" (99.9% probability) ✅

For obscure facts: "The 2023 Ethiopian AI budget was..." → AI has no reliable data, so it hallucinates a plausible number.

### Your Defense Toolkit

1. **VERIFY everything important** — especially medical, legal, financial advice
2. **Ask AI to show its work** — "Provide sources for your claims"
3. **Use AI for ideas, not facts** — Look up statistics in official sources
4. **Check dates** — AI training data has a cutoff date
`,
        exercises: [
          {
            id: "m3-l3-e1",
            type: "multiple-choice",
            question: "What is an AI hallucination?",
            options: [
              "When AI generates images that look like dreams",
              "When AI produces confident but false information",
              "When AI stops responding to prompts",
              "When AI uses too much computing power",
            ],
            correctAnswer: "When AI produces confident but false information",
            explanation: "An AI hallucination occurs when the model generates information that sounds plausible and is presented with confidence, but is factually incorrect or completely fabricated. This happens because AI predicts the most likely next words rather than retrieving verified facts from a database. Examples include fake citations, invented statistics, and non-existent historical events.",
            points: 10,
          },
          {
            id: "m3-l3-e2",
            type: "multiple-choice",
            question: "What is the BEST way to protect yourself from AI hallucinations?",
            options: [
              "Only use AI for entertainment purposes",
              "Verify important facts with trusted sources and ask AI to cite sources",
              "Use AI only in the morning when it is most accurate",
              "Pay for the most expensive AI subscription",
            ],
            correctAnswer: "Verify important facts with trusted sources and ask AI to cite sources",
            explanation: "The best defense against hallucinations is critical verification. Always cross-check important information with reliable sources (official websites, academic papers, news outlets). Additionally, asking AI to provide sources for its claims can help you identify when it's making things up — though you should still verify those sources independently.",
            points: 10,
          },
        ],
      },
    ],
    project: {
      id: "m3-project",
      title: "Personal Prompt Library",
      description: "Create a reusable library of 5 excellent prompts for your daily needs.",
      steps: [
        "Identify 5 tasks you do regularly (emails, study help, content creation, etc.)",
        "Write an ART-framework prompt for each task",
        "Test each prompt in ChatGPT or Gemini",
        "Refine based on results",
        "Save your library in a notes app for instant copy-paste",
      ],
      deliverables: [
        "5 polished prompts following ART framework",
        "Screenshot or text of one excellent result",
        "Reflection on which prompt worked best and why",
      ],
      completed: false,
    },
  },
  {
    id: "module-4",
    number: 4,
    title: "How AI Learns",
    subtitle: "Demystifying the Magic",
    description: "Understand machine learning without math, train your first AI, and explore the data problem.",
    locked: true,
    completed: false,
    lessons: [
      {
        id: "m4-l1",
        title: "The Recipe Analogy",
        completed: false,
        content: `
## Traditional Programming vs. Machine Learning

**Scenario:** Teaching a computer to recognize apples 🍎

**Traditional Programming (The Rule Book):**
A programmer writes exact rules: IF color is red AND shape is round AND size is 7-10cm THEN it's an apple.

**Problems:** What about yellow apples? Apple slices? Different lighting?

**Machine Learning (Learning by Example):**
Show the computer 5,000 apple photos and 5,000 orange photos. The computer finds patterns itself and can identify NEW apples it has never seen!

### The Key Difference

| | Traditional Programming | Machine Learning |
|:---|:---|:---|
| Who solves the problem? | Human programmer | The computer |
| How? | Write explicit rules | Learn from examples |
| Flexibility | Brittle — breaks with edge cases | Adaptable — handles variation |
| Analogy | Teaching with a rulebook | Teaching with flashcards |
`,
        exercises: [
          {
            id: "m4-l1-e1",
            type: "multiple-choice",
            question: "In the 'apple recognition' example, why is Machine Learning better than Traditional Programming?",
            options: [
              "Machine Learning is faster to run",
              "Machine Learning requires less electricity",
              "Machine Learning can handle variations (yellow apples, slices, different lighting) that would require impossibly complex rules",
              "Machine Learning doesn't need any examples",
            ],
            correctAnswer: "Machine Learning can handle variations (yellow apples, slices, different lighting) that would require impossibly complex rules",
            explanation: "Traditional programming requires humans to anticipate and code every possible variation — an impossible task for complex recognition tasks. Machine Learning learns the general concept of 'apple' from diverse examples, so it can recognize new variations (yellow apples, slices, different angles) that it wasn't explicitly programmed for.",
            points: 10,
          },
        ],
      },
      {
        id: "m4-l2",
        title: "Types of Machine Learning",
        completed: false,
        content: `
## The Five Types

**1. Supervised Learning (Learning with a Teacher)**
- Teacher provides: Question + Answer
- AI learns the pattern between them
- Uses: Spam filters, medical diagnosis, price prediction

**2. Unsupervised Learning (Learning by Discovery)**
- No teacher! Just raw data
- AI finds hidden patterns and groups
- Uses: Customer segmentation, recommendation systems

**3. Reinforcement Learning (Learning by Trial & Error)**
- AI takes action → Gets reward or penalty → Adjusts
- Uses: Game playing, robotics, self-driving cars

**4. Semi-Supervised Learning (The Budget Option)**
- Small amount of labeled data + large amount of unlabeled data
- Result: Good performance with 90% less labeling cost

**5. Transfer Learning (Learning from Experience)**
- AI learns Task A → Uses that knowledge for Task B
- Example: AI trained on 10 million general photos, then fine-tuned on 1,000 teff disease photos → Excellent teff detector!
`,
        exercises: [
          {
            id: "m4-l2-e1",
            type: "multiple-choice",
            question: "A spam filter that learns from emails you've marked as 'spam' or 'not spam' is an example of which type of Machine Learning?",
            options: [
              "Unsupervised Learning",
              "Reinforcement Learning",
              "Supervised Learning",
              "Transfer Learning",
            ],
            correctAnswer: "Supervised Learning",
            explanation: "Supervised Learning uses labeled examples (emails marked as 'spam' or 'not spam') to train the model. The AI learns the pattern between the email content and the label, then applies that pattern to new, unlabeled emails. This is the most common type of machine learning in everyday applications.",
            points: 10,
          },
          {
            id: "m4-l2-e2",
            type: "multiple-choice",
            question: "An AI that learns to play chess by playing millions of games and getting points for winning and losing points for losing is using:",
            options: [
              "Supervised Learning",
              "Unsupervised Learning",
              "Reinforcement Learning",
              "Semi-Supervised Learning",
            ],
            correctAnswer: "Reinforcement Learning",
            explanation: "Reinforcement Learning involves an agent (the AI) taking actions in an environment (the chess game), receiving rewards (points for winning) or penalties (losing points), and adjusting its strategy to maximize future rewards. This trial-and-error approach is how AlphaGo mastered chess and Go.",
            points: 10,
          },
        ],
      },
      {
        id: "m4-l3",
        title: "Train Your First AI",
        completed: false,
        content: `
## Project: Ethiopian Snack Classifier

**Tool:** Teachable Machine (teachablemachine.withgoogle.com) — Free, no coding!

**Steps:**
1. Go to teachablemachine.withgoogle.com
2. Click "Image Project" → "Standard Image Model"
3. Create 3 classes: "Dabo" (bread), "Baklava" (sweet), "Kolo" (roasted grains)
4. Add 15-20 photos for each class (use your own or search)
5. Click "Train Model" — wait 1-2 minutes
6. Test with new photos!
7. Export → Share the link

**Why this matters:** You just trained a neural network! The same technology behind facial recognition and medical imaging.
`,
        exercises: [
          {
            id: "m4-l3-e1",
            type: "multiple-choice",
            question: "What is the minimum number of photos recommended per class when using Teachable Machine for image classification?",
            options: [
              "1-2 photos",
              "5-10 photos",
              "15-20 photos",
              "100+ photos",
            ],
            correctAnswer: "15-20 photos",
            explanation: "For Teachable Machine's Standard Image Model, 15-20 photos per class is the recommended minimum. More variety (different angles, lighting, backgrounds) generally produces better results. While you can train with fewer, accuracy will suffer. For production-grade models, hundreds or thousands of images per class are typically used.",
            points: 10,
          },
        ],
      },
    ],
    project: {
      id: "m4-project",
      title: "Build an AI Classifier",
      description: "Use Teachable Machine to train an image recognition model and share it.",
      steps: [
        "Go to teachablemachine.withgoogle.com",
        "Choose Image Project → Standard Model",
        "Pick 3 Ethiopian categories (food, clothing, landmarks, etc.)",
        "Collect 15-20 photos per category",
        "Train the model and test with new photos",
        "Export and share your model link",
      ],
      deliverables: [
        "Link to your working Teachable Machine model",
        "Screenshot of test results",
        "Reflection: What worked? What was hard?",
      ],
      completed: false,
    },
  },
  {
    id: "module-5",
    number: 5,
    title: "AI for Creativity",
    subtitle: "Creating with AI",
    description: "Generate images, write with AI assistance, and create music/video content.",
    locked: true,
    completed: false,
    lessons: [
      {
        id: "m5-l1",
        title: "AI Image Generation",
        completed: false,
        content: `
## How Text-to-Image AI Works

1. Your text prompt is converted to numbers (embeddings)
2. AI starts with random noise
3. Gradually refines it into an image (50+ steps)
4. Guided by understanding of your text

### The Prompt Formula

**[Subject] + [Action/Pose] + [Environment] + [Style] + [Lighting] + [Quality] + [Mood]**

**Example:**
"A young Ethiopian woman in traditional Tigray dress, pouring coffee from a jebena, in a rustic stone café with warm lantern light, oil painting style, soft focus, golden hour"

### Ethiopian Prompt Ideas
- "Lalibela churches in a futuristic Ethiopia, holographic prayers, cinematic"
- "Ethiopian farmers using AI-powered drones over green teff fields, documentary style"
- "Addis Ababa skyline in 2050, sustainable green architecture, utopian concept art"
`,
        exercises: [
          {
            id: "m5-l1-e1",
            type: "multiple-choice",
            question: "Which of the following is the most important factor for getting good results from AI image generators?",
            options: [
              "Using the most expensive tool",
              "Writing detailed, specific prompts with style and quality descriptors",
              "Generating as many images as possible",
              "Using only single-word prompts",
            ],
            correctAnswer: "Writing detailed, specific prompts with style and quality descriptors",
            explanation: "AI image generators rely entirely on the prompt to understand what you want. Detailed prompts that include subject, action, environment, art style, lighting, quality level, and mood produce significantly better results than vague or single-word prompts. The tool's price or the number of generations matters far less than prompt quality.",
            points: 10,
          },
        ],
      },
      {
        id: "m5-l2",
        title: "AI Writing & Ethics",
        completed: false,
        content: `
## The AI Writing Workflow

**STEP 1: BRAINSTORM** — AI generates ideas
**STEP 2: OUTLINE** — AI creates structure
**STEP 3: DRAFT** — AI writes initial content
**STEP 4: EDIT** — AI reviews and suggests improvements
**STEP 5: POLISH** — AI checks grammar and flow
**STEP 6: HUMAN TOUCH** — You add personal voice, verify facts, ensure cultural authenticity

### Ethics of AI Writing

1. **Disclose AI Use** — Be transparent in academic and professional work
2. **Add Your Voice** — AI gives you clay; you sculpt it
3. **Verify Facts** — AI hallucinates citations and statistics
4. **Respect Creators** — Don't use AI to plagiarize human writers
`,
        exercises: [
          {
            id: "m5-l2-e1",
            type: "multiple-choice",
            question: "When using AI to help write content, what is the MOST important ethical consideration?",
            options: [
              "Always using the most expensive AI tool",
              "Verifying facts and adding your own voice and perspective",
              "Keeping your AI use completely secret",
              "Generating content as quickly as possible",
            ],
            correctAnswer: "Verifying facts and adding your own voice and perspective",
            explanation: "The most important ethical considerations when using AI for writing are: (1) Verifying all facts because AI can hallucinate, (2) Adding your own voice, experiences, and perspective because readers connect with humans, and (3) Being transparent about AI use in academic and professional contexts. Speed and tool cost are secondary concerns.",
            points: 10,
          },
        ],
      },
    ],
    project: {
      id: "m5-project",
      title: "Ethiopian AI Art Gallery",
      description: "Create 5 AI-generated images celebrating Ethiopian culture and share them.",
      steps: [
        "Choose an AI image tool (Bing Image Creator, Leonardo.ai, or Stable Diffusion)",
        "Generate 5 images: historical/futuristic blend, daily life, nature, fashion, abstract",
        "Document the exact prompt for each image",
        "Reflect on what you learned about prompting",
        "Share your gallery in the community",
      ],
      deliverables: [
        "5 AI-generated Ethiopian-themed images",
        "Documented prompts for each image",
        "Reflection on the prompting process",
      ],
      completed: false,
    },
  },
  {
    id: "module-6",
    number: 6,
    title: "AI for Work",
    subtitle: "Productivity & Opportunity",
    description: "Use AI to save time, explore business ideas, and plan your AI career.",
    locked: true,
    completed: false,
    lessons: [
      {
        id: "m6-l1",
        title: "AI Productivity System",
        completed: false,
        content: `
## The 80/20 Rule of AI at Work

80% of your results come from 20% of your AI use cases. Find those high-impact tasks.

### AI Productivity Stack (All Free)

**Email & Communication:** Gmail Smart Compose, ChatGPT, Grammarly
**Writing & Documents:** Notion AI, Google Docs
**Research:** Perplexity.ai, ChatGPT
**Data & Spreadsheets:** ChatGPT (for formulas), Google Sheets
**Design:** Canva AI, Remove.bg
**Meetings:** Otter.ai, Fireflies.ai
**Translation:** DeepL, ChatGPT

### Task Audit

| Task | Hours/Week | AI Can Help? | Time Saved |
|:---|:---|:---|:---|
| Email writing | ___ | ✅ Draft, summarize | 50% |
| Meeting notes | ___ | ✅ Transcribe, summarize | 90% |
| Research | ___ | ✅ Find sources, summarize | 60% |
| Report writing | ___ | ✅ Outline, draft, edit | 50% |
| Translation | ___ | ✅ Draft, then review | 80% |
`,
        exercises: [
          {
            id: "m6-l1-e1",
            type: "multiple-choice",
            question: "According to the 80/20 rule mentioned in the lesson, what should you focus on when adopting AI for work?",
            options: [
              "Using AI for every single task",
              "Finding the 20% of tasks where AI provides 80% of the value",
              "Only using AI for email and nothing else",
              "Spending 80% of your time learning AI theory",
            ],
            correctAnswer: "Finding the 20% of tasks where AI provides 80% of the value",
            explanation: "The 80/20 rule (Pareto Principle) suggests that a small number of high-impact use cases will deliver most of your productivity gains. Rather than trying to use AI for everything, identify the tasks that consume the most time and are most amenable to AI assistance — like meeting transcription (90% time saved), translation (80% saved), or report drafting (50% saved).",
            points: 10,
          },
        ],
      },
      {
        id: "m6-l2",
        title: "AI Careers & Business",
        completed: false,
        content: `
## You Don't Need to Code to Work in AI

**Non-Technical AI Roles:**
- Prompt Engineer ($50K-$150K globally)
- AI Product Manager ($80K-$200K)
- AI Ethics Specialist
- AI Content Strategist
- AI Sales/Marketing Specialist

**Technical AI Roles:**
- Data Analyst (Python, SQL)
- ML Engineer (Python, math, cloud)
- AI Researcher (Advanced math, PhD)

### Ethiopian AI Business Ideas

1. **AI Agricultural Advisory (SMS-Based)** — Free basic tier + premium planting calendars
2. **Ethiopian Content Creation Agency** — AI-assisted social media for local businesses
3. **AI Study Buddy for Students** — WhatsApp bot for exam prep

### Learning Pathways

**Non-Technical (3-6 months):** This course → Prompt portfolio → AI Product Management certificate → Apply for roles
**Technical (6-12 months):** Python → Statistics → Fast.ai → 3 portfolio projects → Internships
**Entrepreneur (Ongoing):** Identify problem → Build MVP with no-code → Launch → Iterate
`,
        exercises: [
          {
            id: "m6-l2-e1",
            type: "multiple-choice",
            question: "Which of the following is a NON-TECHNICAL role in the AI industry?",
            options: [
              "Machine Learning Engineer",
              "Data Scientist",
              "Prompt Engineer",
              "AI Researcher",
            ],
            correctAnswer: "Prompt Engineer",
            explanation: "Prompt Engineering is a non-technical AI role that requires language mastery, creativity, and systematic thinking — but not coding. Machine Learning Engineers, Data Scientists, and AI Researchers all require programming and mathematical skills. Prompt Engineers craft instructions that make AI produce optimal results, and this role has growing demand globally.",
            points: 10,
          },
        ],
      },
    ],
    project: {
      id: "m6-project",
      title: "AI Productivity Challenge & Business Plan",
      description: "Use AI to save time on a real task and draft a one-page business plan.",
      steps: [
        "Pick a task that takes you 2+ hours weekly",
        "Time yourself doing it the 'old way'",
        "Use AI tools to complete it faster",
        "Calculate time saved per month/year",
        "Draft a one-page AI-powered business plan for Ethiopia",
      ],
      deliverables: [
        "Time comparison: old way vs. AI-assisted",
        "One-page business plan (problem, solution, customer, costs)",
        "Reflection on AI's impact on your work",
      ],
      completed: false,
    },
  },
  {
    id: "module-7",
    number: 7,
    title: "Build Your Project",
    subtitle: "From Learning to Doing",
    description: "Build a working AI project using no-code tools and present it to the community.",
    locked: true,
    completed: false,
    lessons: [
      {
        id: "m7-l1",
        title: "No-Code AI Toolkit",
        completed: false,
        content: `
## Tools You Can Master in One Day

**Teachable Machine** — Train image/sound/pose recognition (30 min to first project)
**Make (Integromat)** — Connect apps and AI with visual workflows
**Glide** — Turn spreadsheets into AI-powered mobile apps
**Hugging Face Spaces** — Use pre-built AI models via web interface
**ChatGPT Custom GPTs** — Create specialized AI assistants

## Project Options

**A. Ethiopian Food Identifier** — Teachable Machine
**B. AI Study Buddy Bot** — Make.com + WhatsApp
**C. Business Name Generator** — Google Forms + Apps Script
**D. Content Calendar Generator** — Google Sheets + AI
**E. Ethiopian Heritage Quiz** — Custom GPT or HTML
`,
        exercises: [
          {
            id: "m7-l1-e1",
            type: "multiple-choice",
            question: "Which tool is BEST for building an image recognition project without writing code?",
            options: [
              "Visual Studio Code",
              "Teachable Machine",
              "GitHub",
              "Python",
            ],
            correctAnswer: "Teachable Machine",
            explanation: "Teachable Machine by Google is specifically designed for no-code machine learning. You simply drag and drop photos into categories, click 'Train,' and the tool builds a working image recognition model for you. Visual Studio Code, GitHub, and Python all require programming knowledge, making them unsuitable for no-code projects.",
            points: 10,
          },
        ],
      },
      {
        id: "m7-l2",
        title: "Project Build Guide",
        completed: false,
        content: `
## The Build Process

**PHASE 1: PLAN (Day 1)**
- Define the problem clearly (1 sentence)
- List 3 "must-have" features
- Choose your tool
- Set a deadline
- Find one person to test it

**PHASE 2: BUILD (Days 2-5)**
- Follow tool tutorials
- Build the simplest version first (MVP)
- Test each part as you build
- Document problems and solutions

**PHASE 3: TEST (Day 6)**
- Ask 3 people to try it
- Watch them use it (don't help!)
- Note where they get confused
- Fix the biggest issue

**PHASE 4: SHARE (Day 7)**
- Post in community with description and link
- Celebrate! You built something! 🎉

### Troubleshooting

| Problem | Solution |
|:---|:---|
| "Don't know which tool" | Start with Teachable Machine |
| "AI isn't accurate" | Add more training data, especially edge cases |
| "Got stuck" | Ask in community, search YouTube tutorials |
| "Idea too big" | Cut features! Build the smallest working version |
| "Afraid it's not good" | Share anyway. Perfect is the enemy of done. |
`,
        exercises: [
          {
            id: "m7-l2-e1",
            type: "multiple-choice",
            question: "What does MVP stand for in project building, and why is it important?",
            options: [
              "Most Valuable Player — because the builder is the star",
              "Minimum Viable Product — the simplest version that works",
              "Maximum Variable Processing — using the most computer power",
              "Multi-Version Platform — building for many devices",
            ],
            correctAnswer: "Minimum Viable Product — the simplest version that works",
            explanation: "MVP stands for Minimum Viable Product — the simplest version of your project that actually works and delivers value. Building an MVP first is crucial because it lets you test your idea quickly, get feedback, and avoid spending weeks on features nobody needs. The motto is: 'Build the smallest version that works, then improve based on feedback.'",
            points: 10,
          },
        ],
      },
    ],
    project: {
      id: "m7-project",
      title: "Your First AI Project",
      description: "Build and present one working AI project using no-code tools.",
      steps: [
        "Choose a project from the catalog or design your own",
        "Follow the build process: Plan → Build → Test → Share",
        "Document your process in a daily log",
        "Test with at least one other person",
        "Prepare a 3-minute demo or presentation",
        "Share in the community and get feedback",
      ],
      deliverables: [
        "Working project (link, screenshot, or demo)",
        "Build process documentation",
        "3-minute demo or presentation",
        "Peer review of at least one other project",
      ],
      completed: false,
    },
  },
  {
    id: "module-8",
    number: 8,
    title: "Ethics & Future",
    subtitle: "Responsibility & Belonging",
    description: "Understand AI bias, protect your privacy, and join the Ethiopian AI community.",
    locked: true,
    completed: false,
    lessons: [
      {
        id: "m8-l1",
        title: "AI Bias",
        completed: false,
        content: `
## What is Bias?

**Bias in AI** = Systematic errors that unfairly disadvantage certain groups.

### Types of Bias

**Representation Bias:** Training data lacks Ethiopian faces, names, contexts
**Historical Bias:** Past data reflects old inequalities
**Measurement Bias:** What you measure doesn't capture reality
**Algorithmic Bias:** The math itself creates unfair outcomes
**Language Bias:** AI performs worse on non-English languages

### Case Study: Facial Recognition

Accuracy by skin tone in major systems:
- Light-skinned males: 99.2%
- Light-skinned females: 98.3%
- Dark-skinned males: 88.0%
- Dark-skinned females: 79.2%

**Why?** Training data was 80%+ light-skinned faces.

### What Can YOU Do?
- Test AI on diverse inputs
- Report biased results
- Include diverse data in your projects
- Demand transparency from AI companies
`,
        exercises: [
          {
            id: "m8-l1-e1",
            type: "multiple-choice",
            question: "Why do many facial recognition systems perform worse on darker skin tones?",
            options: [
              "Darker skin reflects light differently, making it impossible to photograph",
              "The training data contained predominantly light-skinned faces",
              "The algorithms were intentionally designed to favor lighter skin",
              "Darker skin tones have fewer distinguishing features",
            ],
            correctAnswer: "The training data contained predominantly light-skinned faces",
            explanation: "Facial recognition accuracy disparities are primarily caused by imbalanced training data. When AI systems are trained on datasets that are 80%+ light-skinned faces, they learn to recognize features common in those populations better than features common in darker-skinned populations. This is not intentional racism in the algorithm — it's a data representation problem that occurs when datasets don't reflect global diversity.",
            points: 10,
          },
          {
            id: "m8-l1-e2",
            type: "checkbox",
            question: "Select ALL the ways individuals can help combat AI bias:",
            options: [
              "Test AI tools with diverse inputs and report issues",
              "Only use AI tools that work perfectly for everyone",
              "Create and share diverse datasets for training",
              "Demand transparency from AI companies about their data",
              "Ignore bias because it is not your responsibility",
              "Include diverse users when testing your own AI projects",
            ],
            correctAnswer: [
              "Test AI tools with diverse inputs and report issues",
              "Create and share diverse datasets for training",
              "Demand transparency from AI companies about their data",
              "Include diverse users when testing your own AI projects",
            ],
            explanation: "Everyone can contribute to reducing AI bias: testing tools with diverse inputs helps identify problems; creating diverse datasets improves representation; demanding transparency holds companies accountable; and inclusive testing ensures your own projects work for everyone. Waiting for 'perfect' tools or ignoring the problem only perpetuates the bias.",
            points: 15,
          },
        ],
      },
      {
        id: "m8-l2",
        title: "Privacy & Your Future",
        completed: false,
        content: `
## Privacy in the AI Age

### What AI Knows About You

Every interaction is data: ChatGPT conversations, Google searches, photos you upload, voice recordings, location history, social media posts, shopping history.

### The Privacy Checklist

Before using any AI tool, ask:
- Where is my data stored?
- Is it encrypted?
- Will it be used to train AI models?
- Can I delete my data?
- Who else can access it?

### Golden Rule

> Never tell an AI anything you wouldn't tell a stranger on the bus.

### Ethiopia's AI Future

**Advantages:** Young population (70% under 30), rapid digital adoption, leapfrog potential, rich cultural data
**Challenges:** Infrastructure, data scarcity, brain drain, investment gap, digital divide

### Your Place in the Community

**Learn → Build → Teach → Advocate**

Every Ethiopian who learns AI and shares that knowledge multiplies the impact.
`,
        exercises: [
          {
            id: "m8-l2-e1",
            type: "multiple-choice",
            question: "According to the lesson's Golden Rule, what should you NEVER share with an AI tool?",
            options: [
              "Your favorite music preferences",
              "General questions about history",
              "Anything you wouldn't tell a stranger on the bus",
              "Your opinions about technology",
            ],
            correctAnswer: "Anything you wouldn't tell a stranger on the bus",
            explanation: "The Golden Rule for AI privacy is: 'Never tell an AI anything you wouldn't tell a stranger on the bus.' This means avoiding sharing sensitive personal information like passwords, ID numbers, medical details, financial information, or private family matters. While general questions and opinions are safe, sensitive data should be protected because you cannot fully control how it is stored, used, or potentially exposed.",
            points: 10,
          },
        ],
      },
    ],
    project: {
      id: "m8-project",
      title: "Graduation & Commitment",
      description: "Complete your bias audit, secure your privacy, and commit to ongoing learning.",
      steps: [
        "Complete a bias audit on a popular AI tool",
        "Review and improve your AI privacy settings",
        "Write your personal AI learning commitment contract",
        "Prepare a 3-minute graduation presentation",
        "Pledge to teach at least one other person what you learned",
      ],
      deliverables: [
        "Bias audit documentation",
        "Privacy settings checklist completion",
        "Signed commitment contract",
        "Graduation presentation (video, slides, or written)",
      ],
      completed: false,
    },
  },
]

export function getModuleById(id: string): Module | undefined {
  return courseModules.find((m) => m.id === id)
}

export function getLessonById(moduleId: string, lessonId: string) {
  const module = getModuleById(moduleId)
  return module?.lessons.find((l) => l.id === lessonId)
}

export function getNextLesson(moduleId: string, lessonId: string): { moduleId: string; lessonId: string } | null {
  const module = getModuleById(moduleId)
  if (!module) return null

  const lessonIndex = module.lessons.findIndex((l) => l.id === lessonId)
  if (lessonIndex === -1) return null

  if (lessonIndex < module.lessons.length - 1) {
    return { moduleId, lessonId: module.lessons[lessonIndex + 1].id }
  }

  const moduleIndex = courseModules.findIndex((m) => m.id === moduleId)
  if (moduleIndex < courseModules.length - 1) {
    const nextModule = courseModules[moduleIndex + 1]
    if (nextModule.lessons.length > 0) {
      return { moduleId: nextModule.id, lessonId: nextModule.lessons[0].id }
    }
  }

  return null
}

export function getPreviousLesson(moduleId: string, lessonId: string): { moduleId: string; lessonId: string } | null {
  const module = getModuleById(moduleId)
  if (!module) return null

  const lessonIndex = module.lessons.findIndex((l) => l.id === lessonId)
  if (lessonIndex === -1) return null

  if (lessonIndex > 0) {
    return { moduleId, lessonId: module.lessons[lessonIndex - 1].id }
  }

  const moduleIndex = courseModules.findIndex((m) => m.id === moduleId)
  if (moduleIndex > 0) {
    const prevModule = courseModules[moduleIndex - 1]
    if (prevModule.lessons.length > 0) {
      return { moduleId: prevModule.id, lessonId: prevModule.lessons[prevModule.lessons.length - 1].id }
    }
  }

  return null
}
