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


def compact(title: str, where: str, dates: str, kind: str, text: str) -> Paragraph:
    """One-line entry for older or shorter roles."""
    return Paragraph(f"<b>{title}</b> <font color='#4a525b'>| {where} | {dates} · {kind}.</font> {text}", compact_style)


compact_style = ParagraphStyle("compact", parent=base, leading=12.6, spaceBefore=3)

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
        "I build and evaluate AI applications and data products end to end: a deployed FastAPI, PostgreSQL and React analytics "
        "platform with a grounded LLM assistant and 1,193 CI-gated backend tests; a reproducible 9,800-image object-detection "
        "dataset for assistive-navigation research; and a LangChain CV-screening tool. I report what was measured and what was not. "
        "Targeting graduate and junior Data Scientist, Applied AI, ML Engineer and Data Engineer roles.",
        base,
    ),
    Paragraph("TECHNICAL SKILLS", section),
    bullets(
        [
            "<b>Languages and data:</b> Python, SQL, PostgreSQL, pandas, TypeScript; statistical analysis, time series, Tableau",
            "<b>Machine learning:</b> PyTorch, TensorFlow/Keras, scikit-learn, XGBoost; Transformer implemented from scratch; BERT/DistilBERT; anomaly detection",
            "<b>LLMs and retrieval:</b> LangChain, Claude API, OpenAI API, LLM output validation, TF-IDF retrieval; RAG with LlamaIndex (experimental)",
            "<b>Computer vision:</b> Ultralytics YOLO, OpenCV, CNN transfer learning (VGG-16, DenseNet121), dataset curation and licence auditing",
            "<b>Engineering and cloud:</b> FastAPI, Pydantic, Alembic, React, pytest, GitHub Actions, Git, Streamlit, Flask; Vercel, Azure PostgreSQL, Google Cloud APIs, AWS",
        ]
    ),
    Paragraph("EDUCATION", section),
    Paragraph("MSc Data Science <font name='Helvetica' color='#4a525b'>| University of Bristol, UK | Sep 2023 – Jan 2025</font>", role),
    Paragraph(
        "Dissertation: Transformer implemented from scratch in PyTorch for sentiment analysis, 82.45% test accuracy on SST-2 (sarcasm the main failure case). "
        "Modules: Software Development, Large-Scale Data Engineering, Visual Analytics, AI and Text Analytics, Ethics. "
        "Bristol PLUS Award; Top 100, Google Solution Challenge 2024 (team).",
        bullet,
    ),
    Paragraph(
        "BTech Electronics and Communication Engineering <font name='Helvetica' color='#4a525b'>| Central University of Karnataka, India | Jul 2018 – Aug 2022</font>",
        role,
    ),
    Paragraph("First Class, CGPA 8.22/10. Modules: Data Structures, Algorithms, Machine Learning, Signal Processing.", bullet),
    Paragraph("EXPERIENCE", section),
    entry(
        "Software Developer",
        "4 Real Consulting Limited, Remote",
        "Aug 2026 – Present",
        "Freelance",
        [
            "Lead developer of a deployed social-impact analytics platform for a UK charity: React/TypeScript, FastAPI and PostgreSQL, with Alembic migrations and REST APIs for attendance, service activity, missions and finance.",
            "Wrote a workbook importer that traces every summary-sheet formula and flags rows reading the wrong quarter or mission; kept source data separate from estimates for clear provenance.",
            "Added AI summaries and Q&amp;A (Claude API) behind one gateway with a kill switch and rate limiting; every number in an AI answer is checked against the supplied data before display.",
            "Built CI in GitHub Actions (secret scan, 1,193 passing backend tests on PostgreSQL 17, type-check, lint, build) that gates every Vercel deployment.",
        ],
    ),
    entry(
        "AI-ML Intern",
        "Labmentix, Remote",
        "Sep 2025 – Oct 2025",
        "Internship",
        ["Built predictive models for FBI crime time series and analysed fitness-app, retail and financial customer data in end-to-end projects."],
    ),
    entry(
        "Data Science Consultant, then Artificial Intelligence Consultant",
        "DataMites, Bengaluru, India",
        "Oct 2021 – May 2022; Nov 2022 – Jun 2023",
        "Consulting",
        [
            "Built an XGBoost flight-fare model with SQL and Tableau EDA; supervised data analysts and acted as secondary account manager.",
            "Built predictive models for healthcare and IoT data, with GANs for synthetic data and fairness and interpretability analysis.",
        ],
    ),
    KeepTogether(
        [
            Paragraph("Earlier internships", role),
            compact("Artificial Intelligence Intern", "Personifwy", "May – Jul 2025", "Internship", "Developed and tested ML models for practical AI use cases."),
        ]
    ),
    compact("Project Development Intern", "Streams Learning Hub, Bristol", "May – Jul 2024", "Internship", "Researched AI for personalised education for neurodivergent students; findings in Tableau."),
    compact("Market and Competitor Analyst Intern", "Albotherm, Bristol", "Jan – Mar 2024", "Internship", "Market research and segmentation for management."),
    compact("Student Intern", "1Stop.ai", "Nov 2021 – Jan 2022", "Internship", "CNNs for digit and face recognition; NLP news categorisation."),
    compact("Data Science Intern", "Innomatics Research Labs", "Apr – Jul 2021", "Internship", "Music recommender served with Flask."),
    Paragraph("RESEARCH AND PROJECTS", section),
    entry(
        "Vision Assist: assistive object detection",
        "Bristol, UK",
        "2024 team prototype; independent research Nov 2025 – Present (ongoing)",
        "Research",
        [
            "Research question: is mAP enough to judge the safety of navigation aids for blind and low-vision pedestrians? Defined a 14-class taxonomy and audited datasets (per-image licence check of 17,858 COCO images).",
            "Built reproducible conversion and validation scripts producing a 7-class YOLO dataset of 9,800 images (0 structural errors, 0 duplicates). Baseline training, phone latency and user testing not yet done.",
            "2024 Google Solution Challenge team prototype (Top 100): YOLOv8n detection with spoken alerts; I worked on the speech-to-text voice commands. Detector validation mAP50 0.774 on WOTR.",
        ],
    ),
    entry(
        "Fraud detection and customer value",
        "University of Bristol × Lloyds Banking Group",
        "Jan 2024 – May 2024",
        "MSc partner project, not employment with Lloyds",
        ["Random Forest spend-category classifier, Isolation Forest and One-Class SVM for unsupervised fraud detection, and CLV segmentation on transactional data."],
    ),
    Paragraph("Selected projects", role),
    bullets(
        [
            f"<b>Resume Screener</b> (LangChain, scikit-learn, Pydantic, pytest): ranks CVs with blind screening and an explainable score; deterministic, no generative model. {link('https://github.com/SudhaMsr/Resume-Screening-tool-using-LangChain', 'GitHub')}",
            "<b>Conversational AI for PDFs and websites</b> (LangChain, LlamaIndex, TruLens): experimental RAG pipelines; not formally evaluated.",
            f"<b>Retail Sales SQL Analysis</b> (PostgreSQL): 20 business queries incl. window functions on 1,040,200 synthetic rows. {link('https://github.com/SudhaMsr/Apple-Retail-SQL-Project', 'GitHub')}",
            "<b>AI-MedVision</b> (TensorFlow, Keras): MRI, OCT and X-ray classifiers evaluated on public datasets; educational prototype, not clinically validated.",
        ]
    ),
    Paragraph("CERTIFICATIONS AND ACTIVITIES", section),
    Paragraph(
        "GenAI Mastermind (Growth School) · Azure ML AI Skills Challenge (Microsoft) · Certified Data Scientist (DataMites) · Google Data Analytics (Coursera). "
        "IBM Call for Code, Encode AI Healthcare Hackathon, Bristol Datathon, BrisHack. National-level kabaddi for England. Languages: English, Hindi, Telugu.",
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
