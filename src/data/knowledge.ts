/**
 * Small knowledge base for the "Ask my CV" panel.
 * Each chunk is a short answer plus the CV section it comes from.
 * Retrieval happens entirely in the browser (see lib/retrieve.ts).
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
    keywords: ["who", "about", "summary", "introduce", "overview", "background", "data scientist", "profile", "herself", "sudha"],
    answer:
      "Sudha is a data scientist based in Bristol, UK, with an MSc in Data Science from the University of Bristol. She works across LLMs and RAG, computer vision and model optimisation, and focuses on accessible, responsible AI.",
  },
  {
    id: "llm",
    source: "Projects · Conversational AI, Speech Intelligence, Manaswel",
    keywords: ["llm", "llms", "genai", "generative", "rag", "langchain", "llamaindex", "openai", "gpt", "chatbot", "retrieval", "trulens", "language model", "agent"],
    answer:
      "She has built RAG pipelines with LangChain and LlamaIndex that turn PDFs and websites into chat interfaces, evaluated with TruLens. She also built an LLM voice assistant on live speech, and explored BERT, DistilBERT and RAG for the Manaswel mental-health platform.",
  },
  {
    id: "optimisation",
    source: "Professional summary",
    keywords: ["quantization", "quantisation", "compression", "optimisation", "optimization", "ptq", "qat", "efficient", "inference", "edge", "lightweight", "latency"],
    answer:
      "Model optimisation is a core strength: model compression, post-training quantisation and quantisation-aware training for LLMs, plus lightweight edge inference in Vision Assist and Manaswel.",
  },
  {
    id: "vision",
    source: "Projects · Vision Assist, AI-MedVision",
    keywords: ["vision", "computer vision", "yolo", "opencv", "image", "images", "cnn", "object detection", "medical", "mri", "x-ray", "xray"],
    answer:
      "In computer vision she built Vision Assist (real-time YOLO + OpenCV hazard detection with voice guidance for blind users) and AI-MedVision (CNN diagnostics for COVID-19 X-rays, brain-tumour MRI and retinal disease, deployed in Streamlit).",
  },
  {
    id: "vision-assist",
    source: "Experience · Applied AI Research, Vision Assist",
    keywords: ["vision assist", "blind", "visually", "impaired", "accessibility", "mobility", "navigation", "research"],
    answer:
      "Vision Assist is her applied AI research project (Nov 2025 – Jul 2026, Bristol). She ran user research with blind and visually impaired people, then built a smartphone-based prototype with YOLO, OpenCV and low-latency voice guidance, iterating on usability and cognitive load.",
  },
  {
    id: "nlp",
    source: "Projects · Sentiment & Emotion Analysis",
    keywords: ["nlp", "text", "sentiment", "emotion", "transformer", "transformers", "bert", "distilbert", "huggingface", "tweets", "twitter", "sarcasm", "speech", "transcription", "assemblyai"],
    answer:
      "Her NLP work includes transformer sentiment models that handle sarcasm and irony (trained on AWS), BERT/DistilBERT emotion classification on TweetEval, and a real-time speech-to-insight pipeline built with AssemblyAI.",
  },
  {
    id: "analytics",
    source: "Experience · Lloyds Banking Group, Labmentix",
    keywords: ["analytics", "analysis", "fraud", "fraud detection", "anomaly", "lloyds", "bank", "banking", "clv", "segmentation", "random forest", "time series", "forecasting", "tableau", "sql", "statistics", "dashboard", "kpi"],
    answer:
      "On the analytics side she worked with Lloyds Banking Group on fraud detection (Isolation Forest, One-Class SVM) and CLV segmentation, forecast FBI crime trends, and built a full-stack social-impact dashboard with KPIs and heatmaps.",
  },
  {
    id: "current",
    source: "Experience · 4 Real Consulting",
    keywords: ["current", "currently", "now", "job", "working", "latest", "recent", "freelance", "4 real", "consulting", "react", "fastapi", "full-stack", "fullstack"],
    answer:
      "Since August 2026 she has been a freelance software developer for 4 Real Consulting, building a social-impact analytics platform with React/TypeScript, FastAPI and PostgreSQL. The platform has clear data provenance, accessibility features and an AI-ready structure.",
  },
  {
    id: "experience",
    source: "Experience",
    keywords: ["experience", "years", "roles", "internship", "internships", "worked", "companies", "career", "history"],
    answer:
      "She has held 11 industry and research roles since 2021 in the UK and India, including Lloyds Banking Group, DataMites (AI and data science consulting), Labmentix, Personifwy, Streams Learning Hub, Albotherm and 1Stop.ai.",
  },
  {
    id: "education",
    source: "Education",
    keywords: ["education", "degree", "university", "bristol", "msc", "masters", "study", "studied", "btech", "college", "karnataka"],
    answer:
      "She holds an MSc in Data Science from the University of Bristol (2023–2025), where she won the Bristol Plus award, and a BTech in Electronics & Communication Engineering from Central University of Karnataka (first class).",
  },
  {
    id: "visa",
    source: "Contact details",
    keywords: ["visa", "sponsorship", "sponsor", "eligible", "right to work", "work in uk", "uk", "location", "based", "where", "relocate", "remote", "psw"],
    answer:
      "She is based in Bristol, UK, and holds a UK Post-Study Work (PSW) visa valid until January 2027, so she can work in the UK now without sponsorship.",
  },
  {
    id: "skills",
    source: "Technical skills",
    keywords: ["skills", "tools", "stack", "technologies", "languages", "python", "pytorch", "tensorflow", "keras", "scikit", "cloud", "aws", "gcp", "google cloud"],
    answer:
      "Core stack: Python and SQL; PyTorch, TensorFlow, Keras and Scikit-learn; HuggingFace, LangChain and LlamaIndex; YOLO and OpenCV; AWS and Google Cloud; FastAPI, Flask and Streamlit; Tableau, Git and LaTeX.",
  },
  {
    id: "awards",
    source: "Education · Competitions",
    keywords: ["award", "awards", "achievement", "achievements", "hackathon", "hackathons", "competition", "google", "won", "winner", "ibm"],
    answer:
      "Highlights: Top 100 in the Google Solution Challenge, hackathon winner, and the Bristol Plus award. She has competed in IBM Call for Code, the Encode AI Healthcare Hackathon, the Bristol Datathon and BrisHack.",
  },
  {
    id: "certs",
    source: "Courses & certifications",
    keywords: ["certification", "certifications", "certificate", "certified", "course", "courses", "azure", "microsoft", "coursera"],
    answer:
      "Certifications include GenAI Mastermind (Growth School), AI Skills Challenge: Azure ML (Microsoft Build), Certified Data Scientist (DataMites), Google Data Analytics (Coursera), and Python for Data Science (NPTEL and IBM).",
  },
  {
    id: "ethics",
    source: "Experience · DataMites, Manaswel",
    keywords: ["ethics", "ethical", "responsible", "fairness", "bias", "interpretability", "explainable", "privacy"],
    answer:
      "Responsible AI runs through her work: fairness and interpretability analysis at DataMites, privacy-preserving edge inference in Manaswel, bias reduction in AI-MedVision, and accessibility-first research in Vision Assist.",
  },
  {
    id: "contact",
    source: "Contact details",
    keywords: ["contact", "email", "hire", "reach", "linkedin", "github", "available", "availability", "interview", "cv", "resume"],
    answer:
      "The best way to reach her is email at sudhamsr23@gmail.com, or LinkedIn and GitHub (SudhaMsr). Her full CV can be downloaded from the top of this page.",
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
  "Can she work in the UK?",
  "Tell me about Vision Assist",
  "Has she done model optimisation?",
];
