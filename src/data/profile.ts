export type Domain = "llm" | "vision" | "nlp" | "analytics";

export const domains: Record<Domain, { label: string; color: string }> = {
  llm: { label: "LLMs & GenAI", color: "var(--v-llm)" },
  vision: { label: "Computer Vision", color: "var(--v-vision)" },
  nlp: { label: "NLP & Speech", color: "var(--v-nlp)" },
  analytics: { label: "Data & Analytics", color: "var(--v-analytics)" },
};

export const SITE_URL = "https://sudhamsr.github.io";

export const profile = {
  name: "Sudha Rani Maddala",
  shortName: "Sudha",
  headline: "Applied AI/ML Engineer · Data Scientist",
  location: "Bristol, UK",
  relocation: "Open to relocating to the Netherlands or Germany",
  /** kept general on purpose: no expiry date on the public site */
  workRights: "Right to work in the UK on a Graduate visa. Would need a work permit for the Netherlands or Germany.",
  targetRoles: ["Data Scientist", "Applied AI Engineer", "Machine Learning Engineer", "Data Engineer"],
  email: "sudhamsr23@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/SudhaMsr",
    github: "https://github.com/SudhaMsr",
    medium: "https://medium.com/@sudhamsr",
  },
  cv: "/Sudha-Rani-Maddala-CV.pdf",
  photo: "/images/sudha.jpg",
  summary:
    "I build and evaluate AI applications and data products: LLM-integrated and retrieval tools, computer vision, and data-driven web software in Python, FastAPI and React. MSc Data Science, University of Bristol (January 2025).",
};

/** Technologies with project evidence on this page, most-used first. */
export const coreStack = ["Python", "SQL", "PyTorch", "scikit-learn", "LangChain", "YOLO · OpenCV", "FastAPI", "PostgreSQL", "React · TypeScript"];

export const stats = [
  { value: "1,193", label: "passing backend tests in my current FastAPI platform, gated in CI" },
  { value: "9,800", label: "images in the reproducible detection dataset I built for Vision Assist" },
  { value: "Top 100", label: "Google Solution Challenge 2024 (team project)" },
];

export type Metric = { label: string; value: string; note: string };

export type CaseStudy = {
  /** problem and intended user */
  problem: string;
  contribution: string[];
  architecture: string[];
  evaluation: Metric[];
  /** measurements that do not exist yet, stated so nobody assumes them */
  notMeasured: string[];
  limitations: string[];
  /** shell commands to reproduce, when the code is public */
  reproduce?: string[];
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  domain: Domain;
  /** empty when there is no reliable date */
  year: string;
  stack: string[];
  points: string[];
  /** one of the three flagship case studies */
  featured?: boolean;
  /** short status line, e.g. "Research in progress" */
  status?: string;
  caseStudy?: CaseStudy;
  /** add real URLs here and Code / Live demo buttons appear on the card */
  links?: { code?: string; codeLabel?: string; demo?: string };
  /** shown when there is no public code */
  codeNote?: string;
  /** position in the illustrative project map, 0–1 */
  xy: [number, number];
};

export const projects: Project[] = [
  {
    slug: "vision-assist",
    title: "Vision Assist",
    tagline: "Object detection for blind and low-vision pedestrians: a 2024 team prototype, now a research project on how assistive vision fails.",
    domain: "vision",
    year: "2024 · 2025 – now",
    status: "Research in progress · baseline model not yet trained",
    stack: ["Python", "PyTorch", "Ultralytics YOLO", "OpenCV", "Flask", "Kaggle"],
    points: [],
    featured: true,
    caseStudy: {
      problem:
        "Blind and low-vision pedestrians need early warning of hazards such as bollards, bins, stairs and vehicles. Detectors are usually judged on aggregate mAP, which can hide misses on rare but dangerous classes. Intended users: blind and low-vision pedestrians, as a complement to a cane or guide dog, never a replacement.",
      contribution: [
        "2024 prototype (Google Solution Challenge, team project, Top 100): I worked on the speech-to-text voice-command part of the team's web app.",
        "Research phase (independent, Nov 2025 – now): defined a 14-class safety-oriented taxonomy and annotation standard.",
        "Audited public datasets: 5 sources approved, 4 rejected with documented reasons, and a per-image licence check of 17,858 COCO images.",
        "Wrote reproducible conversion, class-harmonisation and validation scripts that build a 7-class YOLO dataset of 9,800 images and 37,619 boxes.",
        "Set up the training environment (PyTorch 2.5, Ultralytics) and a Kaggle notebook for baseline YOLO11n training.",
      ],
      architecture: [
        "2024 prototype: browser camera → Flask-SocketIO server → YOLOv8n detection and OCR → spoken alerts through browser speech synthesis, with voice-driven walking directions.",
        "Research pipeline: preserved source snapshots → source-specific converters → class harmonisation → unified YOLO dataset → validator (label format, box ranges, image/label pairing, SHA-256 duplicates, split leakage) → JSON QC report.",
        "Planned runtime: on-device inference on a phone, with camera frames kept off any server by default.",
      ],
      evaluation: [
        {
          label: "2024 prototype detector",
          value: "mAP50 0.774 · mAP50-95 0.518",
          note: "YOLOv8n fine-tuned for 100 epochs at 640 px on the WOTR walking-route dataset. Ultralytics validation split, from the team's training log. Precision 0.827, recall 0.691.",
        },
        {
          label: "2026 dataset QC",
          value: "0 structural errors · 0 exact duplicates",
          note: "9,800 images, 37,619 instances, 7 classes. Result PASS_WITH_WARNINGS: image decoding was not checked in that run.",
        },
      ],
      notMeasured: [
        "Latency and FPS on a phone",
        "Per-class recall and hazard miss rate on the 7-class dataset (model not yet trained)",
        "Robustness to low light, motion blur, glare and occlusion",
        "Testing with blind and low-vision users",
      ],
      limitations: [
        "A research prototype, not a safety device. No clinical or user safety trials.",
        "Training images are web photos and street-level shots, not walking footage from the user's viewpoint.",
        "Each source labels only some classes, so unlabelled objects are not verified negatives.",
        "The 2024 prototype's voice output did not work in some mobile browsers.",
      ],
    },
    links: { code: "https://github.com/SudhaMsr/Vision-Assist", codeLabel: "2024 team repo" },
    codeNote: "The research code is in a private repository. I can share access or walk through it on request.",
    xy: [0.2, 0.3],
  },
  {
    slug: "resume-screener",
    title: "Resume Screener",
    tagline: "Ranks CVs against a job description with blind screening and an explainable score. Deterministic and offline: no generative model.",
    domain: "nlp",
    year: "2026",
    status: "Working tool · public code · unit tests",
    stack: ["Python", "LangChain", "scikit-learn", "Pydantic", "Streamlit", "pytest"],
    points: [],
    featured: true,
    caseStudy: {
      problem:
        "Recruiters with a large pile of CVs need a first-pass ordering they can audit. Intended user: a hiring manager who still reads every application and makes every decision.",
      contribution: ["Sole developer: loaders, anonymiser, scorer, command-line tool, Streamlit app and tests."],
      architecture: [
        "Ingestion: custom LangChain BaseLoaders turn PDF (pypdf), DOCX, TXT and Markdown files into Documents.",
        "Blind screening: names, emails, phone numbers, links and personal fields (date of birth, gender, nationality) are redacted before scoring.",
        "Scoring: required skills 60%, nice-to-haves 15%, TF-IDF cosine similarity 25% (scikit-learn). Either/or requirements such as “PyTorch or TensorFlow” count once.",
        "Output: a validated Pydantic CandidateAssessment per CV (score, verdict, matched and missing skills), shown in a CLI with CSV export and a Streamlit UI.",
        "Not RAG and not generative: no embeddings, vector store or LLM calls. I removed an optional Claude assessment step so it runs offline at no cost.",
      ],
      evaluation: [
        { label: "Tests", value: "6 pytest unit tests", note: "Anonymisation, loaders for every format, either/or requirements, ranking and the end-to-end pipeline." },
        { label: "Sample run", value: "6 fictional CVs, scores 85 → 15", note: "A sanity check on a deliberate spread of profiles, not an accuracy measure." },
      ],
      notMeasured: [
        "Agreement with human reviewers' rankings on a labelled set",
        "Anonymisation recall on real CVs",
        "Processing time per CV",
      ],
      limitations: [
        "Keyword-based: a strong candidate who describes a skill differently can score lower.",
        "Anonymisation reduces bias but cannot guarantee that identifying details in free text are removed.",
        "Automated screening is regulated (UK GDPR Article 22; the EU AI Act treats recruitment AI as high-risk), so it is decision support only.",
      ],
      reproduce: [
        "pip install -r requirements.txt",
        "python -m resume_screener --job samples/job_description.md --resumes samples/resumes --csv ranking.csv",
        "streamlit run app.py",
        "pip install -r requirements-dev.txt && pytest",
      ],
    },
    links: { code: "https://github.com/SudhaMsr/Resume-Screening-tool-using-LangChain" },
    xy: [0.72, 0.62],
  },
  {
    slug: "impact-dashboard",
    title: "Social-Impact Analytics Platform",
    tagline: "Full-stack reporting platform for a UK charity: FastAPI, PostgreSQL and React, with an AI assistant whose numbers are checked against the data.",
    domain: "analytics",
    year: "Aug 2026 – now",
    status: "Freelance via 4 Real Consulting · deployed · private client code",
    stack: ["Python", "FastAPI", "PostgreSQL", "Alembic", "React", "TypeScript", "Claude API", "GitHub Actions", "Vercel"],
    points: [],
    featured: true,
    caseStudy: {
      problem:
        "The charity's reporting data (attendance, service activity, strategic missions and finance) lived in spreadsheets and staff workbooks. Staff, managers and trustees needed one dashboard with figures they can trace back to the source.",
      contribution: ["Lead developer: backend, data model, importers, React frontend, test suite, CI and deployment."],
      architecture: [
        "Backend: Python 3.12 and FastAPI on PostgreSQL 17, with Alembic migrations and Azure Database for PostgreSQL in production.",
        "Frontend: React, Vite and TypeScript. KPIs, comparisons, activity heatmaps, quarterly reports and revenue split, plus an accessibility panel (text size, high contrast, keyboard controls).",
        "Data validation: the workbook importer follows every formula in the summary sheet and flags rows that read the wrong quarter, mission or activity instead of importing them. Source figures are kept separate from business-case estimates.",
        "AI features (Anthropic Claude API) go through one gateway with a kill switch, rate limiting and metadata-only logging. The server sends only aggregated figures, every number in an answer must appear in that data, and contact-like details are blocked before display.",
        "Delivery: GitHub Actions runs the checks, then deploys to Vercel. Nothing ships unless they pass.",
      ],
      evaluation: [
        {
          label: "Backend tests",
          value: "1,193 passing",
          note: "pytest against a PostgreSQL 17 service container. One documented known failure (2 Oct 2026 baseline), and CI fails on any new one.",
        },
        {
          label: "CI gates",
          value: "Secret scan · tests · type-check · lint · build",
          note: "Browser end-to-end tests run locally because they need real client data, which never goes to GitHub.",
        },
      ],
      notMeasured: ["Quality of AI answers against a labelled question set", "API and page latency under load"],
      limitations: [
        "Client code and data are confidential, so there is no public repository, screenshot or demo.",
        "AI summaries are assistive. Deterministic metrics stay the source of truth.",
        "One known backend test failure is still open.",
      ],
    },
    codeNote: "Private client project. I can walk through the architecture and code in an interview.",
    xy: [0.3, 0.85],
  },

  // ── supporting projects ──
  {
    slug: "speech-intelligence",
    title: "Speech Intelligence App",
    tagline: "Audio upload, YouTube link or microphone → transcript, sentiment labels and chapter summaries.",
    domain: "nlp",
    year: "2025",
    stack: ["Python", "AssemblyAI", "Streamlit"],
    points: [
      "Chunk-based transcription of live microphone input",
      "Sentiment labels and auto-chapter summaries for long audio",
      "One Streamlit interface for all three input types",
    ],
    links: { code: "https://github.com/SudhaMsr/Python-Projects/tree/main/python_speech_recognition" },
    xy: [0.62, 0.78],
  },
  {
    slug: "sentiment-transformers",
    title: "Transformer for Sentiment Analysis",
    tagline: "MSc dissertation: a Transformer implemented from scratch in PyTorch, with an extended encoder for sentiment classification.",
    domain: "nlp",
    year: "2024",
    stack: ["PyTorch", "Transformers", "SST-2"],
    points: [
      "Multi-head attention, positional encoding and encoder–decoder written from first principles",
      "82.45% test accuracy on SST-2. Validation loss plateaued (0.456 vs 0.269 training), a sign of overfitting",
      "Error analysis: sarcasm and context-heavy sentences remained the main failure cases",
    ],
    codeNote: "Dissertation code is private.",
    xy: [0.76, 0.7],
  },
  {
    slug: "tweet-emotion",
    title: "Emotion Analysis in Tweets",
    tagline: "BERT and DistilBERT fine-tuned for anger, joy, sadness and optimism on TweetEval.",
    domain: "nlp",
    year: "",
    stack: ["BERT", "DistilBERT", "HuggingFace", "Transfer learning"],
    points: ["Transfer learning with early stopping and learning-rate scheduling to limit overfitting"],
    xy: [0.68, 0.88],
  },
  {
    slug: "conversational-rag",
    title: "Conversational AI for PDFs & Websites",
    tagline: "Retrieval-augmented generation pipelines for asking questions about documents and websites.",
    domain: "llm",
    year: "",
    stack: ["LangChain", "LlamaIndex", "TruLens", "OpenAI API"],
    points: ["Indexing and querying with LangChain and LlamaIndex", "TruLens used to inspect groundedness of answers"],
    codeNote: "Code not public. No formal evaluation results to report.",
    xy: [0.78, 0.28],
  },
  {
    slug: "ai-medvision",
    title: "AI-MedVision",
    tagline: "Image classifiers for brain-tumour MRI, retinal OCT and COVID-19 / pneumonia X-rays, behind one Streamlit app.",
    domain: "vision",
    year: "",
    stack: ["TensorFlow", "Keras", "CNN", "DenseNet121", "VGG-16", "Streamlit"],
    points: [
      "Custom CNN for MRI, DenseNet121 for OCT and VGG-16 transfer learning for chest X-rays",
      "Trained on public datasets with rotation, scaling and flip augmentation",
      "Educational prototype: not clinically validated and not for diagnostic use",
    ],
    codeNote: "Code is private.",
    xy: [0.12, 0.5],
  },
  {
    slug: "lloyds-fraud",
    title: "Fraud Detection & Customer Value",
    tagline: "University of Bristol project with Lloyds Banking Group as industry partner: spend classification, anomaly detection and CLV segmentation.",
    domain: "analytics",
    year: "2024",
    stack: ["Python", "Random Forest", "Isolation Forest", "One-Class SVM"],
    points: [
      "Random Forest classifier for spend categories, including Health & Wellness and Fashion & Apparel",
      "Isolation Forest and One-Class SVM for unsupervised fraud detection",
      "Customer lifetime value calculation and segmentation for targeted marketing",
    ],
    codeNote: "University partner project. Data and code are not public.",
    xy: [0.14, 0.76],
  },
  {
    slug: "apple-retail-sql",
    title: "Retail Sales SQL Analysis",
    tagline: "PostgreSQL analytics on a 1,040,200-row synthetic retail dataset: schema, data generator and 20 business queries.",
    domain: "analytics",
    year: "2026",
    stack: ["PostgreSQL", "SQL", "Window functions", "Python"],
    points: ["Questions range from simple counts to window-function analysis", "Synthetic data that mirrors a public Kaggle schema, documented as such"],
    links: { code: "https://github.com/SudhaMsr/Apple-Retail-SQL-Project" },
    xy: [0.42, 0.72],
  },
  {
    slug: "manaswel",
    title: "Manaswel",
    tagline: "Concept and web prototype for a privacy-first mental-health companion.",
    domain: "llm",
    year: "2025 – 2026",
    stack: ["Next.js", "TypeScript", "BERT / DistilBERT (explored)", "RAG (explored)"],
    points: [
      "Explored BERT, DistilBERT and RAG for context-aware, safe responses",
      "Web prototype with privacy notice, consent flow and accessibility fixes",
    ],
    codeNote: "Code is private.",
    xy: [0.64, 0.4],
  },
  {
    slug: "fbi-time-series",
    title: "FBI Crime Time Series",
    tagline: "Forecasting crime trends from historical records (Labmentix internship).",
    domain: "analytics",
    year: "2025",
    stack: ["Python", "Time series"],
    points: [],
    links: { code: "https://github.com/SudhaMsr/Labmentix-Internship" },
    xy: [0.22, 0.64],
  },
  {
    slug: "flight-fare",
    title: "Flight Fare Prediction",
    tagline: "XGBoost regression with SQL and Tableau EDA.",
    domain: "analytics",
    year: "2022",
    stack: ["XGBoost", "SQL", "Tableau"],
    points: [],
    xy: [0.38, 0.92],
  },
  {
    slug: "music-recsys",
    title: "Music Recommender",
    tagline: "Recommendation system served with Flask.",
    domain: "analytics",
    year: "2021",
    stack: ["Python", "Flask"],
    points: [],
    xy: [0.5, 0.86],
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

/** Only skills used in a project or role on this page. */
export const skills: SkillGroup[] = [
  {
    group: "LLMs & GenAI",
    domain: "llm",
    items: ["LangChain", "Anthropic Claude API", "OpenAI API", "LLM output validation", "RAG (LlamaIndex, TruLens)", "HuggingFace"],
  },
  {
    group: "Machine & Deep Learning",
    domain: "ml",
    items: ["PyTorch", "TensorFlow / Keras", "scikit-learn", "XGBoost", "Transformers from scratch", "Anomaly detection"],
  },
  {
    group: "Computer Vision",
    domain: "vision",
    items: ["YOLO (Ultralytics)", "OpenCV", "CNNs, VGG-16, DenseNet", "Dataset curation & licence audit"],
  },
  {
    group: "NLP & Speech",
    domain: "nlp",
    items: ["BERT / DistilBERT", "TF-IDF retrieval", "Sentiment & emotion", "AssemblyAI speech-to-text"],
  },
  {
    group: "Data & Analytics",
    domain: "analytics",
    items: ["Python", "SQL", "PostgreSQL", "pandas", "Time series", "Statistical analysis", "Tableau"],
  },
  {
    group: "Engineering & Cloud",
    domain: "eng",
    items: ["FastAPI", "React / TypeScript", "Pydantic", "pytest", "Alembic", "GitHub Actions", "Vercel", "Azure PostgreSQL", "Google Cloud APIs", "AWS", "Streamlit", "Flask", "Git"],
  },
];

export type RoleType = "freelance" | "internship" | "consulting" | "academic" | "research";

export type Role = {
  title: string;
  org: string;
  /** short letters for the org tile */
  mark: string;
  /** short name for the career chart */
  short: string;
  place: string;
  dates: string;
  type: RoleType;
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
    type: "freelance",
    summary: "Lead developer of a full-stack social-impact analytics platform for a UK charity client.",
    points: [
      "Built the platform end to end with React/TypeScript, Python/FastAPI and PostgreSQL, covering attendance, service activity, strategic missions and financial metrics",
      "Designed the data model, Alembic migrations and REST APIs that ingest, validate and serve reporting metrics",
      "Wrote a workbook importer that traces every summary-sheet formula and flags rows that read the wrong quarter or mission instead of importing them",
      "Kept source data separate from business-case estimates so every figure has clear provenance",
      "Added AI summaries and Q&A (Claude API) behind a single gateway, with every number in an answer checked against the supplied data",
      "Set up CI (secret scan, 1,193 passing backend tests, type-check, lint, build) that gates every Vercel deployment",
      "Shipped accessibility features: adjustable text size, high contrast, keyboard controls and a persistent accessibility panel",
    ],
    tags: ["FastAPI", "PostgreSQL", "React", "TypeScript", "pytest", "GitHub Actions", "Claude API"],
  },
  {
    title: "Applied AI Research, Vision Assist",
    org: "Independent research project",
    mark: "VA",
    short: "Vision Assist",
    place: "Bristol, UK",
    dates: "Nov 2025 – Present",
    type: "research",
    summary: "Researching why vision-based navigation aids for blind and low-vision people fail, building on a 2024 team prototype.",
    points: [
      "Defined a 14-class safety-oriented detection taxonomy and annotation standard from accessibility research",
      "Audited and acquired public datasets with documented licence checks (17,858 COCO images checked individually)",
      "Built and validated a reproducible 7-class YOLO dataset of 9,800 images and 37,619 instances",
      "Prepared baseline YOLO11n training on Kaggle and an evaluation plan covering per-class recall, latency and robustness",
    ],
    tags: ["Python", "PyTorch", "Ultralytics YOLO", "Data engineering", "Evaluation design"],
  },
  {
    title: "AI-ML Intern",
    org: "Labmentix",
    mark: "LM",
    short: "Labmentix",
    place: "Remote",
    dates: "Sep 2025 – Oct 2025",
    type: "internship",
    summary: "End-to-end data science projects across public safety, fitness, retail and finance.",
    points: [
      "Built predictive models and analysed crime trends for the FBI Time Series project",
      "Derived user and fitness insights from activity data in Strava Fitness App Analytics",
      "Analysed store performance for Integrated Retail Analytics",
      "Applied ML to financial customer data in the Paisabazar project",
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
    type: "internship",
    summary: "Developed and tested ML models and designed practical AI use cases with mentors.",
    points: [
      "Developed and tested machine learning models to extract data-driven insights",
      "Applied AI to automate parts of project workflows",
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
    type: "internship",
    summary: "Designed flexible learning for neurodivergent students and researched AI for personalised education.",
    points: [
      "Created an educational portfolio for flexible learning environments for neurodivergent students aged 12+",
      "Researched AI for personalised education, including recommender systems and NLP feedback analysis",
      "Ran market research and literature reviews on emerging education technology",
      "Visualised findings in Tableau to support recommendations",
    ],
    tags: ["Tableau", "Recommender systems", "NLP", "Research"],
  },
  {
    title: "Data Scientist, MSc partner project",
    org: "University of Bristol × Lloyds Banking Group",
    mark: "LB",
    short: "Lloyds (uni project)",
    place: "Bristol, UK",
    dates: "Jan 2024 – May 2024",
    type: "academic",
    summary: "University of Bristol project with Lloyds Banking Group as the industry partner (not employment with Lloyds).",
    points: [
      "Analysed transactional data to understand customer behaviour and detect fraud",
      "Built a Random Forest classifier for spend categories, including “Health & Wellness” and “Fashion & Apparel”",
      "Implemented Isolation Forest and One-Class SVM for unsupervised fraud detection",
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
    type: "internship",
    summary: "Market research and segmentation strategy for management.",
    points: [
      "Conducted market research and developed segmentation strategies",
      "Turned competitive analysis into recommendations for management",
      "Presented findings with data visualisation",
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
    type: "consulting",
    summary: "Predictive modelling for healthcare and IoT datasets, with a focus on responsible AI.",
    points: [
      "Built predictive models for healthcare and IoT datasets",
      "Applied GANs for synthetic data generation and reinforcement learning for process automation",
      "Performed fairness and interpretability analysis on models",
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
    type: "consulting",
    summary: "Predictive modelling and EDA for clients, plus supervising data analysts.",
    points: [
      "Built a flight fare prediction model with XGBoost",
      "Ran exploratory analysis with SQL and Tableau",
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
    type: "internship",
    summary: "Computer vision and NLP models.",
    points: [
      "Developed CNN models for handwritten digit classification and celebrity image recognition",
      "Applied NLP techniques for automated news categorisation",
      "Tuned models through preprocessing, augmentation and hyperparameter search",
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
    type: "internship",
    summary: "Built and deployed a music recommendation system.",
    points: ["Built a music recommendation system with machine learning", "Served it with Flask", "Ran EDA and visualisation in Python"],
    tags: ["Recommender systems", "Flask", "EDA"],
  },
];

/** "6 internships · 2 consulting roles · …" built from the data so the count can't drift */
export const experienceMix = (() => {
  const n = (t: RoleType) => experience.filter((r) => r.type === t).length;
  const plural = (k: number, one: string, many = `${one}s`) => `${k} ${k === 1 ? one : many}`;
  return [
    plural(n("internship"), "internship"),
    plural(n("consulting"), "consulting role"),
    plural(n("freelance"), "freelance role"),
    plural(n("academic"), "university partner project"),
    plural(n("research"), "independent research project"),
  ];
})();

export const masters = {
  degree: "MSc Data Science",
  level: "Master's degree",
  school: "University of Bristol",
  place: "Bristol, UK",
  dates: "Sep 2023 – Jan 2025",
  photo: "/images/graduation.jpg",
  highlights: [
    { value: "Bristol PLUS", label: "University of Bristol award for skills and experience gained outside the degree" },
    { value: "Top 100", label: "Google Solution Challenge 2024 (team)" },
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
  grade: "First Class · CGPA 8.22 / 10",
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
  "Google Solution Challenge 2024 (Top 100, team)",
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
