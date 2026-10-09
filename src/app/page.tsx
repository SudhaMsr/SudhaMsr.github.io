import Nav from "@/components/Nav";
import EmbeddingMap from "@/components/EmbeddingMap";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import AskCV from "@/components/AskCV";
import CopyEmail from "@/components/CopyEmail";
import Mascot from "@/components/Mascot";
import Brain from "@/components/Brain";
import ScrollThread from "@/components/ScrollThread";
import DataStream from "@/components/DataStream";
import { DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon, MediumIcon } from "@/components/Icons";
import Image from "next/image";
import { bachelors, beyond, certifications, hackathons, masters, profile, stats } from "@/data/profile";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="top">
        <ScrollThread />
        {/* ── Hero ── */}
        <section id="hero" className="hero">
          <div className="wrap hero-top">
            <div className="hero-id">
              <div className="id-row">
                <Image className="id-photo" src={profile.photo} alt="Sudha Rani Maddala" width={800} height={800} sizes="84px" priority />
                <div className="id-text">
                  <span className="open-badge">
                    <span className="pulse" aria-hidden />
                    Open to work
                  </span>
                  <span className="id-sub">Data Science &amp; AI/ML roles · {profile.location}</span>
                </div>
              </div>
              <p className="intro">
                I&apos;m <strong>Sudha Rani Maddala</strong>, a data scientist with an MSc from the University of Bristol. I build{" "}
                <strong>LLM &amp; RAG systems</strong>, <strong>real-time computer vision</strong> and <strong>optimised models</strong>, with
                accessibility and responsible AI at the centre.
              </p>
            </div>
            <div className="hero-actions">
              <div className="hero-ctas">
                <a href="#projects" className="btn">
                  Explore my work <span aria-hidden>→</span>
                </a>
                <a href={profile.cv} className="btn ghost" download="Sudha-Rani-Maddala-CV.pdf">
                  <DownloadIcon /> Download CV
                </a>
              </div>
              <ul className="socials" aria-label="Profiles">
                <li>
                  <a href={profile.links.github} target="_blank" rel="noopener" aria-label="GitHub" title="GitHub">
                    <GitHubIcon />
                  </a>
                </li>
                <li>
                  <a href={profile.links.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn" title="LinkedIn">
                    <LinkedInIcon />
                  </a>
                </li>
                <li>
                  <a href={profile.links.medium} target="_blank" rel="noopener" aria-label="Medium" title="Medium">
                    <MediumIcon />
                  </a>
                </li>
                <li>
                  <a href={`mailto:${profile.email}`} aria-label={`Email ${profile.email}`} title={profile.email}>
                    <MailIcon />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="wrap hero-grid">
            <div className="hero-main">
              <h1>
                I build AI that <span className="grad-text">sees, listens</span> and understands <em>people.</em>
              </h1>
              <div className="stats">
                {stats.map((s) => (
                  <div key={s.label}>
                    <b>{s.value}</b>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <EmbeddingMap />
          </div>
        </section>

        {/* ── About as a model card ── */}
        <section id="about" className="section">
          <div className="wrap mc-grid">
            <div className="mc-copy reveal">
              <p className="eyebrow">About</p>
              <h2 className="h2" style={{ marginBottom: 28 }}>
                Documented like a model, <em>built like a person.</em>
              </h2>
              <p>
                ML teams publish a <em>model card</em> to explain what a model is for, what it learned from and where it can go wrong. Here is
                mine.
              </p>
              <p>
                I started in electronics engineering, moved into data science consulting in Bengaluru, then did my MSc in Bristol. Since then
                I&apos;ve worked on fraud detection with Lloyds Banking Group, real-time vision for blind and visually impaired people, and RAG
                systems that make documents conversational.
              </p>
              <ul className="beyond">
                {beyond.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>

            <article className="card-mc reveal" aria-label="Model card">
              <header>
                <span className="mono">model_card.md</span>
                <span className="chip">v2026 · open to work</span>
              </header>
              <dl>
                <dt>model</dt>
                <dd>
                  Sudha Rani Maddala
                  <small>Data Scientist · AI/ML Engineer</small>
                </dd>
                <dt>architecture</dt>
                <dd>
                  MSc Data Science, University of Bristol
                  <small>on a BTech Electronics &amp; Communication backbone</small>
                </dd>
                <dt>training data</dt>
                <dd>
                  11 roles across the UK &amp; India, 2021 – 2026
                  <small>Lloyds Banking Group, DataMites, Labmentix, 4 Real Consulting and more</small>
                </dd>
                <dt>intended use</dt>
                <dd>
                  Data Scientist · ML Engineer · Applied AI roles
                  <small>where models need to work for real people, not just on a benchmark</small>
                </dd>
                <dt>evaluation</dt>
                <dd>Top 100, Google Solution Challenge · hackathon winner · Bristol Plus Award</dd>
                <dt>ethical considerations</dt>
                <dd>Fairness &amp; interpretability analysis, privacy-preserving edge AI, accessibility-first research</dd>
                <dt>deployment</dt>
                <dd>
                  {profile.location}
                  <small>{profile.visa}</small>
                </dd>
                <dt>languages</dt>
                <dd>English, Hindi, Telugu</dd>
              </dl>
            </article>
          </div>
        </section>

        {/* ── Skills ── */}
        <section id="skills" className="section">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <p className="eyebrow">Skills</p>
                <h2 className="h2">
                  From raw data to <em>deployed models.</em>
                </h2>
              </div>
              <p className="lead" style={{ margin: 0, maxWidth: "42ch" }}>
                The tools I use across the whole ML lifecycle. Drag the universe to explore, or tap a group to light it up.
              </p>
            </div>
            <Skills />
          </div>
        </section>

        {/* ── Projects ── */}
        <section id="projects" className="section">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <p className="eyebrow">Selected projects</p>
                <h2 className="h2">
                  Models that leave <em>the notebook.</em>
                </h2>
              </div>
              <p className="lead" style={{ margin: 0, maxWidth: "42ch" }}>
                From research prototypes to deployed apps. Filter by field, or click a point on the map above to jump to a project.
              </p>
            </div>
            <Projects />
          </div>
        </section>

        {/* ── Experience ── */}
        <section id="experience" className="section">
          <div className="wrap">
            <Experience />
          </div>
        </section>

        {/* ── Education ── */}
        <section id="education" className="section">
          <div className="wrap">
            <figure className="edu-banner">
              <Image
                src="/images/bristol-wills.jpg"
                alt="The Wills Memorial Building tower, University of Bristol"
                fill
                sizes="(max-width: 1180px) 100vw, 1140px"
              />
              <div className="edu-banner-text">
                <p className="eyebrow">Education</p>
                <h2 className="h2">
                  Trained in Bristol, <em>grounded in engineering.</em>
                </h2>
                <p className="edu-place">
                  <span className="mono">51.4584° N, 2.6030° W</span> Wills Memorial Building · University of Bristol
                </p>
              </div>
            </figure>

            <article className="msc reveal">
              <figure className="msc-photo">
                <Image src={masters.photo} alt="Sudha in her University of Bristol graduation gown and hood" fill sizes="(max-width: 900px) 100vw, 420px" />
                <figcaption>
                  <span className="mono">Graduation day</span>
                  University of Bristol
                </figcaption>
              </figure>
              <div className="msc-body">
                <div className="msc-top">
                  <span className="msc-level">{masters.level}</span>
                  <span className="mono msc-dates">{masters.dates}</span>
                </div>
                <h3>{masters.degree}</h3>
                <p className="msc-school">
                  {masters.school} <span>· {masters.place}</span>
                </p>
                <ul className="msc-highlights">
                  {masters.highlights.map((h) => (
                    <li key={h.label}>
                      <b>{h.value}</b>
                      <span>{h.label}</span>
                    </li>
                  ))}
                </ul>
                <div className="msc-cols">
                  <div>
                    <h4>Core modules</h4>
                    <ul className="tick-list">
                      {masters.modules.map((m) => (
                        <li key={m}>{m}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4>Beyond the classroom</h4>
                    <ul className="tick-list">
                      {masters.activities.map((a) => (
                        <li key={a}>{a}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>

            <ol className="edu-journey" aria-label="Academic journey">
              <li>
                <span className="mono">2018</span> BTech begins · Kalaburagi, India
              </li>
              <li>
                <span className="mono">2022</span> First-class BTech, then data science consulting
              </li>
              <li>
                <span className="mono">2023</span> MSc Data Science · Bristol, UK
              </li>
              <li className="done">
                <span className="mono">2025</span> Graduated, University of Bristol
              </li>
            </ol>

            <article className="btech reveal">
              <div className="btech-main">
                <div className="msc-top">
                  <span className="msc-level">{bachelors.level}</span>
                  <span className="mono msc-dates">{bachelors.dates}</span>
                </div>
                <h3>{bachelors.degree}</h3>
                <p className="msc-school">
                  {bachelors.school} <span>· {bachelors.place}</span>
                </p>
              </div>
              <div className="btech-side">
                <p className="btech-grade">{bachelors.grade}</p>
                <ul className="pill-list">
                  {bachelors.modules.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                  {bachelors.activities.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
            </article>

            <div className="edu-grid">
              <div className="panel reveal">
                <h3>Certifications</h3>
                <ul className="cert-list">
                  {certifications.map((c) => (
                    <li key={c.name}>
                      {c.name}
                      <span>{c.by}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="panel reveal">
                <h3>Hackathons &amp; competitions</h3>
                <ul className="cert-list">
                  {hackathons.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Ask my CV ── */}
        <section id="ask" className="section">
          <div className="wrap reveal">
            <AskCV />
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="contact">
          <div className="contact-stage">
            <Brain />
            <div className="wrap contact-center">
              <p className="eyebrow contact-eyebrow">Contact</p>
              <h2 className="contact-title">
                Let&apos;s build something <em className="grad-text">useful</em> together.
              </h2>
              <p className="contact-lead">
                Open to Data Scientist, ML Engineer and AI Engineer roles. If you&apos;re building AI that has to work for real people, I&apos;d love to hear from you.
              </p>
              <div className="contact-actions">
                <a href={`mailto:${profile.email}`} className="btn">
                  <MailIcon /> Email me
                </a>
                <CopyEmail email={profile.email} />
              </div>
              <p className="contact-email mono">{profile.email}</p>
              <ul className="contact-links" aria-label="Elsewhere">
                <li>
                  <a href={profile.links.linkedin} target="_blank" rel="noopener">
                    <LinkedInIcon /> LinkedIn
                  </a>
                </li>
                <li>
                  <a href={profile.links.github} target="_blank" rel="noopener">
                    <GitHubIcon /> GitHub
                  </a>
                </li>
                <li>
                  <a href={profile.links.medium} target="_blank" rel="noopener">
                    <MediumIcon /> Medium
                  </a>
                </li>
                <li>
                  <a href={profile.cv} download="Sudha-Rani-Maddala-CV.pdf">
                    <DownloadIcon /> CV
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <DataStream />
      <Mascot />
    </>
  );
}
