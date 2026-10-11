"""Build the downloadable CV (public/Sudha-Rani-Maddala-CV.pdf).

The content below must tell the same story as src/data/profile.ts. When one changes, change the other.

    python -m venv .venv && .venv/bin/pip install -r cv/requirements.txt
    .venv/bin/python cv/build_cv.py

Single column, standard section headings and real text (no icons or tables) so applicant tracking systems can read it.
"""

from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import KeepTogether, ListFlowable, ListItem, Paragraph, SimpleDocTemplate

OUT = Path(__file__).resolve().parent.parent / "public" / "Sudha-Rani-Maddala-CV.pdf"

INK = HexColor("#111418")
MUTED = HexColor("#4a525b")
ACCENT = HexColor("#17806f")

base = ParagraphStyle("base", fontName="Helvetica", fontSize=9.6, leading=13, textColor=INK, alignment=TA_LEFT)
name = ParagraphStyle("name", parent=base, fontName="Helvetica-Bold", fontSize=20, leading=24)
headline = ParagraphStyle("headline", parent=base, fontName="Helvetica-Bold", fontSize=11.5, leading=15, textColor=ACCENT)
contact = ParagraphStyle("contact", parent=base, fontSize=9, leading=12.5, textColor=MUTED)
section = ParagraphStyle("section", parent=base, fontName="Helvetica-Bold", fontSize=10.5, leading=14, textColor=ACCENT, spaceBefore=9, spaceAfter=3)
role = ParagraphStyle("role", parent=base, fontName="Helvetica-Bold", fontSize=10, leading=13.5, spaceBefore=5)
meta = ParagraphStyle("meta", parent=base, fontSize=9, leading=12, textColor=MUTED)
bullet = ParagraphStyle("bullet", parent=base, leading=12.6)


def link(url: str, text: str | None = None) -> str:
    return f'<a href="{url}" color="#17806f">{text or url.replace("https://", "")}</a>'


def bullets(items: list[str]) -> ListFlowable:
    return ListFlowable(
        [ListItem(Paragraph(t, bullet), leftIndent=10, value="•") for t in items],
        bulletType="bullet",
        start="•",
        leftIndent=10,
        bulletFontSize=8,
        spaceBefore=1,
    )


def entry(title: str, where: str, dates: str, kind: str, points: list[str]) -> KeepTogether:
    return KeepTogether(
        [
            Paragraph(f"{title} <font name='Helvetica' color='#4a525b'>| {where}</font>", role),
            Paragraph(f"{dates} · {kind}", meta),
            bullets(points),
        ]
    )


story = [
    Paragraph("Sudha Rani Maddala", name),
    Paragraph("Applied AI/ML Engineer | Data Scientist", headline),
    Paragraph(
        "Bristol, UK · Open to relocating to the Netherlands or Germany · UK Graduate visa holder<br/>"
        f"+44 7721 955649 · {link('mailto:sudhamsr23@gmail.com', 'sudhamsr23@gmail.com')} · "
        f"{link('https://www.linkedin.com/in/SudhaMsr')} · {link('https://github.com/SudhaMsr')} · "
        f"{link('https://sudhamsr.github.io')}",
        contact,
    ),
    Paragraph("PROFESSIONAL SUMMARY", section),
    Paragraph(
        "Applied AI/ML engineer and data scientist with an MSc in Data Science from the University of Bristol (January 2025). "
        "I build and evaluate AI applications and data products end to end: a FastAPI, PostgreSQL and React analytics platform "
        "with a grounded LLM assistant and 1,193 CI-gated backend tests; a reproducible 9,800-image object-detection dataset for "
        "assistive navigation research; and a LangChain CV-screening tool. I report what was measured and what was not, and design "
        "for privacy, accessibility and clear data provenance. Targeting graduate and junior Data Scientist, Applied AI Engineer, "
        "Machine Learning Engineer and Data Engineer roles.",
        base,
    ),
    Paragraph("TECHNICAL SKILLS", section),
    bullets(
        [
            "<b>Languages and data:</b> Python, SQL, PostgreSQL, pandas, TypeScript",
            "<b>Machine learning:</b> PyTorch, TensorFlow/Keras, scikit-learn, XGBoost; Transformer implemented from scratch; BERT/DistilBERT fine-tuning; anomaly detection",
            "<b>LLMs and retrieval:</b> LangChain, Anthropic Claude API, OpenAI API, LLM output validation, TF-IDF retrieval; RAG with LlamaIndex (experimental)",
            "<b>Computer vision:</b> Ultralytics YOLO, OpenCV, CNN transfer learning (VGG-16, DenseNet121), dataset curation and licence auditing",
            "<b>Engineering:</b> FastAPI, Pydantic, Alembic, React, pytest, GitHub Actions CI, Git, Streamlit, Flask",
            "<b>Cloud and deployment:</b> Vercel, Azure Database for PostgreSQL, Google Cloud APIs, AWS, Kaggle GPU notebooks",
            "<b>Analytics:</b> statistical analysis, time series, Tableau, Excel",
        ]
    ),
    Paragraph("EDUCATION", section),
    KeepTogether(
        [
            Paragraph("MSc Data Science <font name='Helvetica' color='#4a525b'>| University of Bristol, UK</font>", role),
            Paragraph("Sep 2023 – Jan 2025", meta),
            bullets(
                [
                    "Modules: Software Development, Programming and Algorithms, Large-Scale Data Engineering, Visual Analytics, AI and Text Analytics, Ethics.",
                    "Bristol PLUS Award; Top 100, Google Solution Challenge 2024 (team); university hackathon wins.",
                    "Google Developer Student Club, Data Science Society, Volunteer Coordinator for Women in Leadership.",
                ]
            ),
        ]
    ),
    KeepTogether(
        [
            Paragraph(
                "BTech Electronics and Communication Engineering <font name='Helvetica' color='#4a525b'>| Central University of Karnataka, India</font>",
                role,
            ),
            Paragraph("Jul 2018 – Aug 2022 · First Class, CGPA 8.22/10", meta),
            bullets(["Modules: Data Structures, Algorithms, Machine Learning, Signal Processing, Internet of Things. IEEE student member."]),
        ]
    ),
    Paragraph("EXPERIENCE", section),
    entry(
        "Software Developer",
        "4 Real Consulting Limited, Remote",
        "Aug 2026 – Present",
        "Freelance",
        [
            "Lead developer of a full-stack social-impact analytics platform for a UK charity client: React/TypeScript, Python/FastAPI and PostgreSQL, covering attendance, service activity, strategic missions and finance.",
            "Designed the data model, Alembic migrations and REST APIs; wrote a workbook importer that traces every summary-sheet formula and flags rows that read the wrong quarter or mission instead of importing them.",
            "Kept source data separate from business-case estimates so every reported figure has clear provenance.",
            "Added AI summaries and Q&amp;A with the Claude API behind a single gateway (kill switch, rate limiting, metadata-only logging); every number in an AI answer is checked against the supplied data before display.",
            "Set up CI with GitHub Actions (secret scan, 1,193 passing backend tests against PostgreSQL 17, type-check, lint, build) that gates every Vercel deployment.",
            "Shipped accessibility features: adjustable text size, high contrast, keyboard controls and a persistent accessibility panel.",
        ],
    ),
    entry(
        "AI-ML Intern",
        "Labmentix, Remote",
        "Sep 2025 – Oct 2025",
        "Internship",
        [
            "Built predictive models and analysed crime trends for an FBI crime time-series project.",
            "Analysed fitness-app activity data, retail store performance and financial customer data (Paisabazar) in end-to-end projects.",
        ],
    ),
    entry(
        "Artificial Intelligence Intern",
        "Personifwy, Remote",
        "May 2025 – Jul 2025",
        "Internship",
        ["Developed and tested machine learning models and designed practical AI use cases with mentors."],
    ),
    entry(
        "Project Development Intern",
        "Streams Learning Hub, Bristol, UK",
        "May 2024 – Jul 2024",
        "Internship",
        [
            "Created an educational portfolio for flexible learning environments for neurodivergent students aged 12+.",
            "Researched AI for personalised education (recommender systems, NLP feedback analysis) and presented findings in Tableau.",
        ],
    ),
    entry(
        "Market and Competitor Analyst Intern",
        "Albotherm, Bristol, UK",
        "Jan 2024 – Mar 2024",
        "Internship",
        ["Conducted market research and segmentation analysis and presented recommendations to management with data visualisation."],
    ),
    entry(
        "Artificial Intelligence Consultant",
        "DataMites, Bengaluru, India",
        "Nov 2022 – Jun 2023",
        "Consulting",
        [
            "Built predictive models for healthcare and IoT datasets; applied GANs for synthetic data and reinforcement learning for process automation.",
            "Performed fairness and interpretability analysis on models.",
        ],
    ),
    entry(
        "Data Science Consultant",
        "DataMites, Bengaluru, India",
        "Oct 2021 – May 2022",
        "Consulting",
        [
            "Built a flight fare prediction model with XGBoost and ran exploratory analysis with SQL and Tableau.",
            "Supervised data analysts and acted as secondary account manager for clients.",
        ],
    ),
    entry(
        "Student Intern",
        "1Stop.ai, Remote",
        "Nov 2021 – Jan 2022",
        "Internship",
        ["Developed CNN models for handwritten digits and celebrity image recognition, and NLP models for news categorisation."],
    ),
    entry(
        "Data Science Intern",
        "Innomatics Research Labs, Remote",
        "Apr 2021 – Jul 2021",
        "Internship",
        ["Built a music recommendation system and served it with Flask."],
    ),
    Paragraph("RESEARCH AND ACADEMIC PROJECTS", section),
    entry(
        "Vision Assist: assistive object detection",
        "Bristol, UK",
        "Nov 2025 – Present (independent research); 2024 prototype (team)",
        "Independent research",
        [
            "Researching how vision-based navigation aids for blind and low-vision pedestrians fail, and whether mAP is enough to judge safety.",
            "Defined a 14-class safety-oriented taxonomy; audited public datasets (5 approved, 4 rejected, per-image licence check of 17,858 COCO images).",
            "Built reproducible conversion, harmonisation and validation scripts producing a 7-class YOLO dataset of 9,800 images and 37,619 instances (0 structural errors, 0 exact duplicates). Baseline YOLO11n training, phone latency and user testing are not yet done.",
            "2024 Google Solution Challenge team prototype (Top 100): Flask web app with YOLOv8n detection and spoken alerts; I worked on the speech-to-text voice commands. Detector validation mAP50 0.774 on the WOTR dataset.",
        ],
    ),
    entry(
        "Data Scientist, MSc partner project",
        "University of Bristol × Lloyds Banking Group",
        "Jan 2024 – May 2024",
        "University project (not employment with Lloyds)",
        [
            "Analysed transactional data for customer behaviour and fraud: Random Forest spend-category classifier, Isolation Forest and One-Class SVM for unsupervised fraud detection.",
            "Calculated customer lifetime value and segmented customers for targeted marketing.",
        ],
    ),
    entry(
        "MSc dissertation: Transformer for sentiment analysis",
        "University of Bristol",
        "2024",
        "Academic",
        ["Implemented a Transformer from scratch in PyTorch with an extended encoder; 82.45% test accuracy on SST-2, with error analysis showing sarcasm as the main failure case."],
    ),
    Paragraph("SELECTED PROJECTS", section),
    bullets(
        [
            f"<b>Resume Screener</b> (Python, LangChain, scikit-learn, Pydantic, Streamlit, pytest): ranks CVs against a job description with blind screening and an explainable score; deterministic and offline, no generative model; 6 unit tests. {link('https://github.com/SudhaMsr/Resume-Screening-tool-using-LangChain', 'github.com/SudhaMsr/Resume-Screening-tool-using-LangChain')}",
            f"<b>Speech Intelligence App</b> (Python, AssemblyAI, Streamlit): upload, YouTube or microphone input to transcript, sentiment labels and chapter summaries. {link('https://github.com/SudhaMsr/Python-Projects/tree/main/python_speech_recognition', 'github.com/SudhaMsr/Python-Projects')}",
            f"<b>Retail Sales SQL Analysis</b> (PostgreSQL): schema, data generator and 20 business queries, including window functions, on a 1,040,200-row synthetic dataset. {link('https://github.com/SudhaMsr/Apple-Retail-SQL-Project', 'github.com/SudhaMsr/Apple-Retail-SQL-Project')}",
            "<b>AI-MedVision</b> (TensorFlow, Keras, Streamlit): CNN, DenseNet121 and VGG-16 classifiers for MRI, retinal OCT and chest X-rays on public datasets; an educational prototype, not clinically validated.",
            "<b>Emotion analysis in tweets</b> (BERT, DistilBERT): fine-tuned transformers for four emotions on TweetEval.",
        ]
    ),
    Paragraph("CERTIFICATIONS", section),
    Paragraph(
        "GenAI Mastermind (Growth School) · AI Skills Challenge: Azure Machine Learning (Microsoft Build) · Certified Data Scientist (DataMites) · "
        "Google Data Analytics (Coursera) · Python for Data Science (NPTEL) · Design Thinking (NPTEL) · Python 101 for Data Science (IBM)",
        base,
    ),
    Paragraph("COMPETITIONS AND ACTIVITIES", section),
    Paragraph(
        "Google Solution Challenge 2024 (Top 100, team) · IBM Call for Code · Encode AI Healthcare Hackathon · University of Bristol Datathon · "
        "BrisHack · RSA Student Design Awards · National-level kabaddi for England · Campus Ambassador, E-Summit IIT Bhubaneswar · "
        "Writes on Medium · Languages: English, Hindi, Telugu",
        base,
    ),
]


def main() -> None:
    doc = SimpleDocTemplate(
        str(OUT),
        pagesize=A4,
        leftMargin=16 * mm,
        rightMargin=16 * mm,
        topMargin=14 * mm,
        bottomMargin=14 * mm,
        title="Sudha Rani Maddala – CV – Applied AI/ML Engineer | Data Scientist",
        author="Sudha Rani Maddala",
        subject="Curriculum vitae",
        keywords="Data Scientist, Applied AI Engineer, Machine Learning Engineer, Data Engineer, Python, PyTorch, FastAPI, PostgreSQL",
        creator="cv/build_cv.py",
    )
    doc.build(story)
    print(f"wrote {OUT}")


if __name__ == "__main__":
    main()
