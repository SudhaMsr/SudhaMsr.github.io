export type Domain = "llm" | "vision" | "nlp" | "analytics";

export const domains: Record<Domain, { label: string; color: string }> = {
  llm: { label: "LLMs & GenAI", color: "var(--v-llm)" },
  vision: { label: "Computer Vision", color: "var(--v-vision)" },
  nlp: { label: "NLP & Speech", color: "var(--v-nlp)" },
  analytics: { label: "Data & Analytics", color: "var(--v-analytics)" },
};

export const profile = {
  name: "Sudha Rani Maddala",
  shortName: "Sudha",
  role: "Data Scientist · AI/ML Engineer",
  location: "Bristol, UK",
  visa: "UK PSW visa · valid to Jan 2027",
  email: "sudhamsr23@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/SudhaMsr",
    github: "https://github.com/SudhaMsr",
    medium: "https://medium.com/@sudhamsr",
  },
  cv: "/Sudha-Rani-Maddala-CV.pdf",
  photo: "/images/sudha.jpg",
  summary:
    "Data scientist with an MSc from the University of Bristol, working across LLMs and RAG, computer vision and model optimisation, including post-training quantisation and quantisation-aware training for large language models. I care most about AI that is accessible, explainable and actually useful to the people it serves.",
};

export const stats = [
  { value: "11", label: "industry & research roles since 2021" },
  { value: "12+", label: "end-to-end ML projects shipped" },
  { value: "Top 100", label: "Google Solution Challenge" },
];

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  domain: Domain;
  /** empty when the CV gives no date */
  year: string;
  stack: string[];
  points: string[];
  featured?: boolean;
  /** add real URLs here and Code / Live demo buttons appear on the card */
  links?: { code?: string; demo?: string };
  /** position in the illustrative "embedding" map, 0–1 */
  xy: [number, number];
};

export const projects: Project[] = [
  {
    slug: "vision-assist",
    title: "Vision Assist",
    tagline: "Real-time hazard detection with voice guidance for blind and visually impaired people.",
    domain: "vision",
    year: "2026 – now",
    stack: ["Python", "YOLO", "OpenCV", "Speech", "Edge inference"],
    points: [
      "Smartphone-based object & hazard detection with low-latency spoken alerts",
      "Lightweight inference pipelines tuned for outdoor navigation",
      "Shaped by accessibility research to reduce cognitive load",
    ],
    featured: true,
    xy: [0.2, 0.3],
  },
  {
    slug: "speech-intelligence",
    title: "Speech Intelligence & Voice Assistant",
    tagline: "Upload, YouTube or live mic → transcript, sentiment, summary and an LLM voice assistant.",
    domain: "llm",
    year: "2025",
    stack: ["Python", "AssemblyAI", "OpenAI API", "Streamlit"],
    points: [
      "Chunk-based real-time transcription pipeline",
      "Speech-to-insight: sentiment labels and structured summaries of long audio",
      "Voice assistant generating contextual answers from live speech",
    ],
    featured: true,
    xy: [0.68, 0.22],
  },
  {
    slug: "conversational-rag",
    title: "Conversational AI for PDFs & Websites",
    tagline: "RAG pipelines that turn static documents and sites into evaluable chat interfaces.",
    domain: "llm",
    year: "",
    stack: ["RAG", "LangChain", "LlamaIndex", "TruLens", "OpenAI API"],
    points: [
      "Indexing and querying over structured and unstructured data",
      "TruLens for groundedness, monitoring and response tuning",
      "Made research papers and reports conversational",
    ],
    featured: true,
    xy: [0.8, 0.34],
  },
  {
    slug: "manaswel",
    title: "Manaswel",
    tagline: "Privacy-preserving AI mental-health companion combining NLP with lightweight vision.",
    domain: "nlp",
    year: "2025",
    stack: ["PyTorch", "HuggingFace", "BERT", "RAG", "OpenCV", "Flask"],
    points: [
      "Context-aware, ethical responses with BERT, DistilBERT and RAG",
      "Edge-based architecture for real-time, on-device inference",
      "Built alongside mental-health professionals and academic mentors",
    ],
    featured: true,
    xy: [0.62, 0.58],
  },
  {
    slug: "ai-medvision",
    title: "AI-MedVision",
    tagline: "CNN diagnostics for COVID-19 X-rays, brain-tumour MRI and retinal disease.",
    domain: "vision",
    year: "",
    stack: ["TensorFlow", "Keras", "PyTorch", "OpenCV", "Streamlit"],
    points: [
      "Three diagnostic models behind one clinician-facing Streamlit app",
      "Augmentation to widen data diversity and reduce bias",
      "Validated on real-world medical imaging datasets",
    ],
    featured: true,
    xy: [0.12, 0.5],
  },
  {
    slug: "tweet-emotion",
    title: "Emotion Analysis in Tweets",
    tagline: "Transformer classifier for anger, joy, sadness and optimism on TweetEval.",
    domain: "nlp",
    year: "",
    stack: ["BERT", "DistilBERT", "Attention", "Transfer learning"],
    points: [
      "Fine-tuned transformers with attention for ambiguous emotions",
      "Early stopping and LR scheduling to prevent overfitting",
    ],
    featured: true,
    xy: [0.66, 0.78],
  },
  {
    slug: "sentiment-transformers",
    title: "Sentiment Analysis with Transformers",
    tagline: "Encoders extended to catch sarcasm and irony, trained reproducibly on AWS.",
    domain: "nlp",
    year: "",
    stack: ["PyTorch", "HuggingFace", "AWS"],
    points: [
      "Full pipeline: preprocessing, tuning, dropout, LR scheduling",
      "Cloud training on AWS for scale and reproducibility",
    ],
    featured: true,
    xy: [0.76, 0.66],
  },
  {
    slug: "impact-dashboard",
    title: "Social-Impact Analytics Platform",
    tagline: "Full-stack reporting platform with KPIs, heatmaps and clear data provenance.",
    domain: "analytics",
    year: "2026",
    stack: ["React", "TypeScript", "FastAPI", "PostgreSQL"],
    points: [
      "REST APIs that ingest, transform and serve reporting metrics",
      "Deterministic metrics kept separate from future AI-generated insight",
      "Accessibility built in: text sizing, high contrast, keyboard controls",
    ],
    featured: true,
    xy: [0.3, 0.85],
  },
  {
    slug: "lloyds-fraud",
    title: "Fraud Detection & Customer Value",
    tagline: "Lloyds Banking Group partnership: classification, anomaly detection and CLV segmentation.",
    domain: "analytics",
    year: "2024",
    stack: ["Random Forest", "Isolation Forest", "One-Class SVM", "Python"],
    points: [
      "Random Forest improving spend-category classification",
      "Isolation Forest and One-Class SVM for fraud detection",
      "CLV calculation and segmentation for targeted marketing",
    ],
    featured: true,
    xy: [0.14, 0.76],
  },
  {
    slug: "fbi-time-series",
    title: "FBI Crime Time Series",
    tagline: "Forecasting crime trends from historical records.",
    domain: "analytics",
    year: "2025",
    stack: ["Python", "Time series"],
    points: [],
    xy: [0.22, 0.66],
  },
  {
    slug: "flight-fare",
    title: "Flight Fare Prediction",
    tagline: "XGBoost regression with SQL and Tableau EDA.",
    domain: "analytics",
    year: "2022",
    stack: ["XGBoost", "SQL", "Tableau"],
    points: [],
    xy: [0.38, 0.9],
  },
  {
    slug: "music-recsys",
    title: "Music Recommender",
    tagline: "Recommendation system deployed with Flask.",
    domain: "analytics",
    year: "2021",
    stack: ["Python", "Flask"],
    points: [],
    xy: [0.46, 0.86],
  },
  {
    slug: "cnn-digits",
    title: "Digit & Face Recognition",
    tagline: "CNNs for handwritten digits and celebrity faces.",
    domain: "vision",
    year: "2021",
    stack: ["CNN", "Keras"],
    points: [],
    xy: [0.3, 0.16],
  },
];

export type SkillGroup = { group: string; domain: Domain | "ml" | "eng"; items: string[] };

/** CSS colour variable for a skill group */
export const skillColor = (d: SkillGroup["domain"]) => (d === "eng" ? "var(--ink-2)" : `var(--v-${d})`);

export const skills: SkillGroup[] = [
  {
    group: "LLMs & GenAI",
    domain: "llm",
    items: ["RAG", "LangChain", "LlamaIndex", "TruLens", "OpenAI API", "HuggingFace", "Quantisation (PTQ / QAT)", "Model compression"],
  },
  {
    group: "Machine & Deep Learning",
    domain: "ml",
    items: ["PyTorch", "TensorFlow", "Keras", "Scikit-learn", "XGBoost", "GANs", "Reinforcement learning"],
  },
  {
    group: "Computer Vision",
    domain: "vision",
    items: ["YOLO", "OpenCV", "CNNs", "Medical imaging", "Real-time inference"],
  },
  {
    group: "NLP & Speech",
    domain: "nlp",
    items: ["Transformers", "BERT / DistilBERT", "Sentiment & emotion", "AssemblyAI", "Speech pipelines"],
  },
  {
    group: "Data & Analytics",
    domain: "analytics",
    items: ["Python", "SQL", "Statistical analysis", "Time series", "Tableau", "Excel", "Data visualisation"],
  },
  {
    group: "Engineering & Cloud",
    domain: "eng",
    items: ["AWS", "Google Cloud", "FastAPI", "Flask", "Streamlit", "React / TypeScript", "PostgreSQL", "Git", "LaTeX"],
  },
];

export type Role = {
  title: string;
  org: string;
  /** short letters for the org tile */
  mark: string;
  /** short name for the career chart */
  short: string;
  place: string;
  dates: string;
  kind: string;
  summary: string;
  points: string[];
  tags: string[];
};

export const experience: Role[] = [
  {
    title: "Software Developer (Freelance)",
    org: "4 Real Consulting Limited",
    mark: "4R",
    short: "4 Real Consulting",
    place: "Remote",
    dates: "Aug 2026 – Present",
    kind: "Freelance",
    summary: "Building a full-stack social-impact analytics platform that centralises an organisation's reporting data.",
    points: [
      "Built the dashboard end to end with React/TypeScript, Python/FastAPI and PostgreSQL across attendance, service activity, strategic missions and financial metrics",
      "Designed backend data services and REST APIs to ingest, transform and serve reporting metrics",
      "Developed KPIs, comparative analytics, activity heatmaps, quarterly reporting and revenue-split analysis for stakeholders",
      "Separated source data from business-case estimates for clear data provenance",
      "Shipped accessibility features: adjustable text size, high contrast, keyboard controls and a persistent accessibility panel",
      "Structured the platform for future AI-assisted insights, keeping deterministic metrics separate from generated interpretation",
    ],
    tags: ["React", "TypeScript", "FastAPI", "PostgreSQL", "REST APIs", "Accessibility"],
  },
  {
    title: "Applied AI Researcher, Vision Assist",
    org: "Independent research",
    mark: "VA",
    short: "Vision Assist",
    place: "Bristol, UK",
    dates: "Nov 2025 – Jul 2026",
    kind: "Research",
    summary: "Researched and prototyped AI-assisted mobility support for blind and visually impaired people.",
    points: [
      "Ran accessibility and user research into the mobility challenges and navigation needs of blind and visually impaired users",
      "Mapped mobility workflows to find where computer vision, real-time hazard detection and voice guidance could help",
      "Built a real-time prototype with Python, YOLO and OpenCV, with low-latency voice guidance on smartphone hardware",
      "Explored lightweight inference and refined the system around usability and cognitive load",
      "Used participant feedback to evaluate practical usability and guide the next iteration",
    ],
    tags: ["Python", "YOLO", "OpenCV", "Speech", "User research"],
  },
  {
    title: "AI-ML Intern",
    org: "Labmentix",
    mark: "LM",
    short: "Labmentix",
    place: "Remote",
    dates: "Sep 2025 – Oct 2025",
    kind: "Internship",
    summary: "End-to-end data science and ML projects across public safety, fitness, retail and finance.",
    points: [
      "Built predictive models and analysed crime trends for the FBI Time Series project",
      "Derived user and fitness insights from activity data in Strava Fitness App Analytics",
      "Optimised store performance with data-driven insights for Integrated Retail Analytics",
      "Applied ML to financial data and customer insights in the Paisabazar project",
    ],
    tags: ["Python", "Time series", "Machine learning", "Business analytics"],
  },
  {
    title: "Artificial Intelligence Intern",
    org: "Personifwy",
    mark: "PF",
    short: "Personifwy",
    place: "Remote",
    dates: "May 2025 – Jul 2025",
    kind: "Internship",
    summary: "Developed and tested ML models and designed practical AI use cases with mentors.",
    points: [
      "Developed and tested machine learning models to extract data-driven insights",
      "Applied AI to improve automation and efficiency in real-world projects",
      "Designed practical AI use cases together with mentors",
    ],
    tags: ["Python", "Machine learning", "Automation"],
  },
  {
    title: "Project Development Intern",
    org: "Streams Learning Hub",
    mark: "SL",
    short: "Streams Learning",
    place: "Bristol, UK",
    dates: "May 2024 – Jul 2024",
    kind: "Internship",
    summary: "Designed flexible learning for neurodivergent students and researched AI for personalised education.",
    points: [
      "Created an educational portfolio for flexible learning environments for neurodivergent students aged 12+",
      "Researched AI for personalised education, including recommender systems and NLP feedback analysis",
      "Ran market research and literature reviews on emerging education technology",
      "Visualised findings in Tableau to deliver data-driven recommendations",
    ],
    tags: ["Tableau", "Recommender systems", "NLP", "Research"],
  },
  {
    title: "Consulting Data Scientist",
    org: "Lloyds Banking Group",
    mark: "LB",
    short: "Lloyds Banking",
    place: "Bristol, UK",
    dates: "Jan 2024 – May 2024",
    kind: "University of Bristol partnership",
    summary: "Analysed transactional data for customer behaviour, fraud detection and targeted marketing.",
    points: [
      "Analysed transactional data to understand customer behaviour and detect fraud",
      "Built a Random Forest classifier that improved classification of “Health & Wellness” and “Fashion & Apparel” spend",
      "Implemented Isolation Forest and One-Class SVM for fraud detection",
      "Calculated customer lifetime value and segmented customers for targeted marketing",
    ],
    tags: ["Random Forest", "Isolation Forest", "One-Class SVM", "CLV", "Segmentation"],
  },
  {
    title: "Market & Competitor Analyst Intern",
    org: "Albotherm",
    mark: "AT",
    short: "Albotherm",
    place: "Bristol, UK",
    dates: "Jan 2024 – Mar 2024",
    kind: "Internship",
    summary: "Market research and segmentation strategy for management.",
    points: [
      "Conducted market research and developed segmentation strategies",
      "Turned competitive analysis into actionable insights for management",
      "Presented findings with data visualisation to support strategic decisions",
    ],
    tags: ["Market research", "Segmentation", "Data visualisation"],
  },
  {
    title: "Artificial Intelligence Consultant",
    org: "DataMites",
    mark: "DM",
    short: "DataMites · AI",
    place: "Bengaluru, India",
    dates: "Nov 2022 – Jun 2023",
    kind: "Consulting",
    summary: "Predictive modelling for healthcare and IoT, with a focus on responsible AI.",
    points: [
      "Built predictive models for healthcare and IoT datasets",
      "Applied GANs for synthetic data generation and reinforcement learning for process automation",
      "Performed fairness and interpretability analysis to support responsible AI deployment",
    ],
    tags: ["GANs", "Reinforcement learning", "Fairness", "Interpretability"],
  },
  {
    title: "Data Science Consultant",
    org: "DataMites",
    mark: "DM",
    short: "DataMites · DS",
    place: "Bengaluru, India",
    dates: "Oct 2021 – May 2022",
    kind: "Consulting",
    summary: "Predictive modelling and EDA for clients, plus supervising a team of analysts.",
    points: [
      "Built a flight fare prediction model with XGBoost",
      "Ran exploratory analysis with SQL and Tableau for actionable insights",
      "Supervised data analysts and acted as secondary account manager for clients",
    ],
    tags: ["XGBoost", "SQL", "Tableau", "Team leadership"],
  },
  {
    title: "Student Intern",
    org: "1Stop.ai",
    mark: "1S",
    short: "1Stop.ai",
    place: "Remote",
    dates: "Nov 2021 – Jan 2022",
    kind: "Internship",
    summary: "Computer vision and NLP models with a focus on improving model performance.",
    points: [
      "Developed CNN models for handwritten digit classification and celebrity image recognition",
      "Applied NLP techniques for automated news categorisation",
      "Improved models through preprocessing, augmentation and hyperparameter tuning",
    ],
    tags: ["CNNs", "NLP", "Augmentation", "Tuning"],
  },
  {
    title: "Data Science Intern",
    org: "Innomatics Research Labs",
    mark: "IR",
    short: "Innomatics",
    place: "Remote",
    dates: "Apr 2021 – Jul 2021",
    kind: "Internship",
    summary: "Built and deployed a music recommendation system.",
    points: [
      "Built a music recommendation system with machine learning",
      "Deployed the solution with Flask",
      "Ran EDA and visualisation in Python",
    ],
    tags: ["Recommender systems", "Flask", "EDA"],
  },
];

export const masters = {
  degree: "MSc Data Science",
  level: "Master's degree",
  school: "University of Bristol",
  place: "Bristol, UK",
  dates: "Sep 2023 – Jan 2025",
  photo: "/images/graduation.jpg",
  highlights: [
    { value: "Bristol Plus", label: "Award for exceptional performance" },
    { value: "Top 100", label: "Google Solution Challenge" },
    { value: "Winner", label: "University hackathons" },
  ],
  modules: [
    "Software Development",
    "Programming & Algorithms",
    "Large-Scale Data Engineering",
    "Visual Analytics",
    "AI & Text Analytics",
    "Ethics",
  ],
  activities: ["Google Developer Student Club", "Data Science Society", "Volunteer Coordinator, Women in Leadership"],
};

export const bachelors = {
  degree: "BTech Electronics & Communication Engineering",
  level: "Bachelor's degree",
  school: "Central University of Karnataka",
  place: "Kalaburagi, India",
  dates: "Jul 2018 – Aug 2022",
  grade: "First class · GPA 3.31 / 4.0",
  modules: ["Data Structures", "Algorithms", "Machine Learning", "Signal Processing", "Internet of Things"],
  activities: ["IEEE student member"],
};

export const certifications = [
  { name: "GenAI Mastermind", by: "Growth School" },
  { name: "AI Skills Challenge: Azure ML", by: "Microsoft Build" },
  { name: "Certified Data Scientist", by: "DataMites" },
  { name: "Google Data Analytics", by: "Coursera" },
  { name: "Python for Data Science", by: "NPTEL" },
  { name: "Design Thinking", by: "NPTEL" },
  { name: "Python 101 for Data Science", by: "IBM" },
];

export const hackathons = [
  "IBM Call for Code",
  "AI Healthcare Hackathon (Encode)",
  "Google Developer Student Clubs 2024",
  "University of Bristol Datathon",
  "BrisHack",
  "RSA Student Design Awards",
];

export const beyond = [
  "National-level kabaddi for England",
  "Writes on Medium",
  "Campus Ambassador, E-Summit IIT Bhubaneswar",
  "Speaks English, Hindi & Telugu",
];
