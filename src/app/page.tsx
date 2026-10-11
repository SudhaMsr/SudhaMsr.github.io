import Nav from "@/components/Nav";
import EmbeddingMap from "@/components/EmbeddingMap";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import AskCV from "@/components/AskCV";
import CopyEmail from "@/components/CopyEmail";
import Brain from "@/components/Brain";
import ScrollThread from "@/components/ScrollThread";
import DataStream from "@/components/DataStream";
import { DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon, MediumIcon } from "@/components/Icons";
import Image from "next/image";
import { bachelors, beyond, certifications, coreStack, experienceMix, hackathons, masters, profile, stats } from "@/data/profile";

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <ScrollThread />
        {/* ── Hero ── */}
        <section id="hero" className="hero" aria-labelledby="hero-title">
          <div className="wrap hero-top">
            <div className="id-row">
              <Image className="id-photo" src={profile.photo} alt="Sudha Rani Maddala" width={800} height={800} sizes="84px" priority />
              <div className="id-text">
                <p className="id-name">{profile.name}</p>
                <span className="open-badge">
                  <span className="pulse" aria-hidden />
                  Open to work
                </span>
                <span className="id-sub">
                  {profile.location} · {profile.relocation}
                </span>
              </div>
            </div>
            <nav className="hero-actions" aria-label="Quick links">
              <div className="hero-ctas">
                <a href="#projects" className="btn">
                  Featured projects <span aria-hidden>→</span>
                </a>
                <a href={profile.cv} className="btn ghost" download="Sudha-Rani-Maddala-CV.pdf">
                  <DownloadIcon /> Download CV <span className="sr-only">(PDF)</span>
                </a>
              </div>
              <ul className="hero-links">
                <li>
                  <a href={profile.links.github} target="_blank" rel="noopener">
                    <GitHubIcon /> GitHub<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
                <li>
                  <a href={profile.links.linkedin} target="_blank" rel="noopener">
                    <LinkedInIcon /> LinkedIn<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
                <li>
                  <a href="#contact">
                    <MailIcon /> Contact
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="wrap hero-grid">
            <div className="hero-main">
              <h1 id="hero-title">
                Applied AI/ML Engineer <span className="grad-text">&amp; Data Scientist</span>
              </h1>
              <p className="hero-lead">{profile.summary}</p>
              <dl className="hero-facts">
                <div>
                  <dt>Looking for</dt>
                  <dd>Graduate and junior {profile.targetRoles.join(", ").replace(/, ([^,]*)$/, " and $1")} roles in the UK, the Netherlands and Germany</dd>
                </div>
                <div>
                  <dt>Core stack</dt>
                  <dd>
                    <ul className="stack-chips" aria-label="Core technologies">
                      {coreStack.map((t) => (
                        <li key={t} className="chip">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div>
                  <dt>Recent work</dt>
                  <dd>
                    A FastAPI/PostgreSQL analytics platform with a grounded LLM assistant, an assistive-vision dataset pipeline, and a LangChain
                    CV-screening tool. <a href="#projects">See the case studies</a>.
                  </dd>
                </div>
              </dl>
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
                I started in electronics engineering, moved into data science consulting in Bengaluru, then did my MSc in Bristol. There I worked
                on fraud detection in a university project with Lloyds Banking Group. Since graduating I&apos;ve built a full-stack analytics
                platform as a freelancer and continued research into assistive computer vision for blind and low-vision people.
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
                <span className="chip">open to work</span>
              </header>
              <dl>
                <dt>model</dt>
                <dd>
                  Sudha Rani Maddala
                  <small>{profile.headline}</small>
                </dd>
                <dt>architecture</dt>
                <dd>
                  MSc Data Science, University of Bristol
                  <small>on a BTech Electronics &amp; Communication backbone</small>
                </dd>
                <dt>training data</dt>
                <dd>
                  {experienceMix.join(", ")} · UK &amp; India, 2021 – 2026
                  <small>4 Real Consulting, Labmentix, Personifwy, DataMites, a University of Bristol project with Lloyds Banking Group and more</small>
                </dd>
                <dt>intended use</dt>
                <dd>
                  {profile.targetRoles.join(" · ")} roles
                  <small>where models need to work for real people, not just on a benchmark</small>
                </dd>
                <dt>evaluation</dt>
                <dd>Top 100, Google Solution Challenge 2024 (team) · Bristol PLUS Award · university hackathons</dd>
                <dt>ethical considerations</dt>
                <dd>Blind screening and explainable scores, number-checked AI output, licence-audited datasets, limitations stated up front</dd>
                <dt>deployment</dt>
                <dd>
                  {profile.location} · {profile.relocation.toLowerCase()}
                  <small>{profile.workRights}</small>
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
                Grouped by area. Everything listed is used in a project or role on this page.
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
                <p className="eyebrow">Featured projects</p>
                <h2 className="h2">
                  Three projects, <em>with the evidence.</em>
                </h2>
              </div>
              <p className="lead" style={{ margin: 0, maxWidth: "46ch" }}>
                Each one sets out the problem, my part, the architecture, what was measured, what wasn&apos;t, and the limitations.
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
                <span className="mono">Jan 2025</span> Graduated MSc, University of Bristol
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
                Open to graduate and junior Data Scientist, Applied AI, ML Engineer and Data Engineer roles in the UK, the Netherlands and Germany.
                If you&apos;re building AI that has to work for real people, I&apos;d love to hear from you.
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
                    <LinkedInIcon /> LinkedIn<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
                <li>
                  <a href={profile.links.github} target="_blank" rel="noopener">
                    <GitHubIcon /> GitHub<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
                <li>
                  <a href={profile.links.medium} target="_blank" rel="noopener">
                    <MediumIcon /> Medium<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
                <li>
                  <a href={profile.cv} download="Sudha-Rani-Maddala-CV.pdf">
                    <DownloadIcon /> CV <span className="sr-only">(PDF)</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <footer className="wrap footer">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>
          {profile.location} · <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </span>
      </footer>
      <DataStream />
    </>
  );
}
