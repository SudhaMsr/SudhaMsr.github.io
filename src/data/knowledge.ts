/**
 * Small knowledge base for the "Ask my CV" panel.
 * Each chunk is a short answer plus the CV section it comes from.
 * Retrieval happens entirely in the browser (see lib/retrieve.ts): keyword scoring, no generative model.
 */
export type Chunk = {
  id: string;
  source: string;
  keywords: string[];
  answer: string;
};

export const chunks: Chunk[] = [
  {
    id: "summary",
    source: "Professional summary",
    keywords: ["who", "about", "summary", "introduce", "overview", "background", "data scientist", "profile", "herself", "sudha", "role", "roles", "looking"],
    answer:
      "Sudha is an applied AI/ML engineer and data scientist based in Bristol, UK, with an MSc in Data Science from the University of Bristol (January 2025). She is looking for graduate or junior Data Scientist, Applied AI Engineer, ML Engineer and Data Engineer roles.",
  },
  {
    id: "llm",
    source: "Projects · Social-Impact Platform, Resume Screener, Conversational AI",
    keywords: ["llm", "llms", "genai", "generative", "rag", "langchain", "llamaindex", "openai", "claude", "anthropic", "gpt", "chatbot", "retrieval", "trulens", "language model", "agent"],
    answer:
      "In her freelance platform she added AI summaries and Q&A using the Claude API, behind one gateway that checks every number in an answer against the data it was given. She built a LangChain resume screener (deterministic TF-IDF and skill scoring, no generative model) and earlier RAG experiments with LangChain and LlamaIndex.",
  },
  {
    id: "vision",
    source: "Projects · Vision Assist, AI-MedVision",
    keywords: ["vision", "computer vision", "yolo", "opencv", "image", "images", "cnn", "object detection", "medical", "mri", "x-ray", "xray", "detection"],
    answer:
      "Her computer vision work includes Vision Assist (assistive object detection for blind and low-vision pedestrians, with YOLO) and AI-MedVision (image classifiers for MRI, retinal OCT and chest X-rays in a Streamlit app, an educational prototype that is not clinically validated).",
  },
  {
    id: "vision-assist",
    source: "Projects · Vision Assist",
    keywords: ["vision assist", "blind", "visually", "impaired", "accessibility", "mobility", "navigation", "research", "dataset", "map", "metrics"],
    answer:
      "Vision Assist began as a 2024 Google Solution Challenge team prototype (YOLOv8n, validation mAP50 0.774). Since November 2025 she has been researching how assistive vision fails, and has built a reproducible 7-class dataset of 9,800 images. Baseline training, latency and user testing have not been done yet.",
  },
  {
    id: "nlp",
    source: "Projects · Dissertation, Speech, Emotion Analysis",
    keywords: ["nlp", "text", "sentiment", "emotion", "transformer", "transformers", "bert", "distilbert", "huggingface", "tweets", "twitter", "sarcasm", "speech", "transcription", "assemblyai", "dissertation"],
    answer:
      "For her MSc dissertation she implemented a Transformer from scratch in PyTorch (82.45% test accuracy on SST-2). She also fine-tuned BERT/DistilBERT for tweet emotion classification and built a Streamlit speech app with AssemblyAI transcription, sentiment and chapter summaries.",
  },
  {
    id: "analytics",
    source: "Experience · University of Bristol × Lloyds, Labmentix",
    keywords: ["analytics", "analysis", "fraud", "fraud detection", "anomaly", "lloyds", "bank", "banking", "clv", "segmentation", "random forest", "time series", "forecasting", "tableau", "sql", "statistics", "dashboard", "kpi"],
    answer:
      "On a University of Bristol project with Lloyds Banking Group as industry partner, she worked on fraud detection (Isolation Forest, One-Class SVM), spend classification and CLV segmentation. This was a university project, not employment at Lloyds. She has also done SQL analytics and time-series forecasting.",
  },
  {
    id: "current",
    source: "Experience · 4 Real Consulting",
    keywords: ["current", "currently", "now", "job", "working", "latest", "recent", "freelance", "4 real", "consulting", "react", "fastapi", "full-stack", "fullstack", "postgresql", "backend", "testing", "tests", "ci"],
    answer:
      "Since August 2026 she has been a freelance software developer for 4 Real Consulting, leading the build of a social-impact analytics platform for a UK charity: FastAPI, PostgreSQL and React/TypeScript, with 1,193 passing backend tests gated in CI and deployments to Vercel.",
  },
  {
    id: "experience",
    source: "Experience",
    keywords: ["experience", "years", "internship", "internships", "worked", "companies", "career", "history", "employment"],
    answer:
      "Since 2021: six internships (including Labmentix, Personifwy, Streams Learning Hub and Albotherm), two consulting roles at DataMites in Bengaluru, a current freelance role with 4 Real Consulting, a University of Bristol partner project with Lloyds Banking Group, and independent research on Vision Assist.",
  },
  {
    id: "education",
    source: "Education",
    keywords: ["education", "degree", "university", "bristol", "msc", "masters", "study", "studied", "btech", "college", "karnataka", "graduate", "graduated", "cgpa", "gpa", "grade"],
    answer:
      "She holds an MSc in Data Science from the University of Bristol (September 2023 – January 2025) and a BTech in Electronics & Communication Engineering from Central University of Karnataka (First Class, CGPA 8.22/10).",
  },
  {
    id: "location",
    source: "Contact details",
    keywords: ["visa", "sponsorship", "sponsor", "eligible", "right to work", "work in uk", "uk", "location", "based", "where", "relocate", "relocation", "remote", "netherlands", "germany", "europe"],
    answer:
      "She is based in Bristol, UK, where she has the right to work on a Graduate visa. She is open to relocating to the Netherlands or Germany, where she would need a work permit.",
  },
  {
    id: "skills",
    source: "Technical skills",
    keywords: ["skills", "tools", "stack", "technologies", "languages", "python", "pytorch", "tensorflow", "keras", "scikit", "cloud", "aws", "gcp", "google cloud", "azure"],
    answer:
      "Core stack: Python and SQL; PyTorch, TensorFlow/Keras and scikit-learn; LangChain and the Claude and OpenAI APIs; YOLO and OpenCV; FastAPI, PostgreSQL and React/TypeScript; pytest and GitHub Actions; Vercel, Azure PostgreSQL and Google Cloud APIs.",
  },
  {
    id: "awards",
    source: "Education · Competitions",
    keywords: ["award", "awards", "achievement", "achievements", "hackathon", "hackathons", "competition", "google", "won", "winner", "ibm"],
    answer:
      "Highlights: Top 100 in the Google Solution Challenge 2024 with her team's Vision Assist prototype, the Bristol PLUS Award, and university hackathon wins. She has also competed in IBM Call for Code, the Encode AI Healthcare Hackathon, the Bristol Datathon and BrisHack.",
  },
  {
    id: "certs",
    source: "Courses & certifications",
    keywords: ["certification", "certifications", "certificate", "certified", "course", "courses", "microsoft", "coursera"],
    answer:
      "Certifications include GenAI Mastermind (Growth School), AI Skills Challenge: Azure ML (Microsoft Build), Certified Data Scientist (DataMites), Google Data Analytics (Coursera), and Python for Data Science (NPTEL and IBM).",
  },
  {
    id: "ethics",
    source: "Projects · Resume Screener, Social-Impact Platform, Vision Assist",
    keywords: ["ethics", "ethical", "responsible", "fairness", "bias", "interpretability", "explainable", "privacy", "safety"],
    answer:
      "Responsible AI shows up as concrete engineering: blind screening and explainable scores in the resume screener, number-checking and contact-detail filtering on AI output in her freelance platform, licence-audited datasets and documented limitations in Vision Assist, and fairness analysis at DataMites.",
  },
  {
    id: "contact",
    source: "Contact details",
    keywords: ["contact", "email", "hire", "reach", "linkedin", "github", "available", "availability", "interview", "cv", "resume"],
    answer:
      "The best way to reach her is email at sudhamsr23@gmail.com, or LinkedIn and GitHub (SudhaMsr). Her CV can be downloaded from the top of this page.",
  },
  {
    id: "personal",
    source: "Activities",
    keywords: ["hobby", "hobbies", "fun", "sport", "sports", "kabaddi", "outside", "interests", "personal", "medium", "blog", "volunteer"],
    answer:
      "Outside work she plays national-level kabaddi for England, writes on Medium, and has volunteered with the University of Bristol and Women in Leadership.",
  },
];

export const suggestions = [
  "What LLM experience does she have?",
  "Where is she based?",
  "Tell me about Vision Assist",
  "What is she working on now?",
];
