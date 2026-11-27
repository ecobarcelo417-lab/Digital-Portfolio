import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { ArrowUpRight, Copy, Download, Mail, Menu, Moon, Phone, Share2, Sun, X } from "lucide-react";
import { motion, useReducedMotion, useScroll, useSpring, type Variants } from "framer-motion";

const facebookProfileUrl = "https://www.facebook.com/share/1CLUpLvBnf/?mibextid=wwXIfr";
const email = "nycebarcelo@gmail.com";
const phone = "09764930463";
const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent("Hello Ecollen")}`;

const sections = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "certificates", label: "Certificates" },
  { id: "approach", label: "Approach" },
  { id: "contact", label: "Contact" },
] as const;

const steps = [
  {
    title: "Understand the need",
    text: "I start with who will use the system and what they need to do. Names, roles, and rules come from the real system, never from guesses.",
  },
  {
    title: "Plan the approach",
    text: "I break the problem into parts and decide the structure first: the data, the flows between parts, and then how people move through them.",
  },
  {
    title: "Build and refine",
    text: "I build it, check it against feedback, and keep adjusting until it holds up when someone else reviews it.",
  },
];

const tools = [
  { name: "SQL and relational design", use: "Schemas, ERDs, and data dictionaries" },
  { name: "draw.io", use: "Use case, data flow, and entity diagrams" },
  { name: "React and TypeScript", use: "Interfaces, including this site" },
  { name: "Vite and Tailwind CSS", use: "Fast builds and consistent styling" },
];

const certificates = [
  {
    title: "IT Specialist: Databases",
    issuer: "Certiport, a Pearson VUE business",
    image: "/certs/certiport-it-specialist-databases.jpg",
    alt: "Certiport IT Specialist certificate for Databases, awarded to Ecollen V. Barcelo on October 28, 2026.",
    details: [
      ["Awarded", "October 28, 2026"],
      ["Valid for", "5 years from the award date"],
      ["Verification code", "wBypo-2FvB"],
    ],
    verifyUrl: "https://verify.certiport.com",
  },
  {
    title: "Employability Skills: JobReady (With AI) v1",
    issuer: "Wadhwani Foundation, Skill Readiness Certificate",
    image: "/certs/wadhwani-jobready.jpg",
    alt: "Wadhwani Foundation Skill Readiness Certificate for Employability Skills: JobReady (With AI) v1, Advanced Level, completed November 26, 2026.",
    details: [
      ["Completed", "November 26, 2026"],
      ["Level", "Advanced"],
      ["Training", "75 hours of training and in-class applications"],
    ],
  },
];

const webinars = [
  { title: "Database 101: Data Storage, SQL and Query Optimization", meta: "August 21, 2026, 2 hours" },
  { title: "Learning Advocate 2026 Series: Emerging IT Innovations", meta: "August 22, 2026, 1 hour" },
];

const heroContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const heroItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.75, 0.25, 1] } },
};

function RolesDiagram() {
  // Four roles from the CKD system's use case diagram, drawn around the system.
  const roles = [
    { label: "Admin", x: 70, y: 52 },
    { label: "Doctor", x: 330, y: 52 },
    { label: "Nurse", x: 70, y: 228 },
    { label: "Patient", x: 330, y: 228 },
  ];
  return (
    <svg className="roles-diagram" viewBox="0 0 400 280" role="img" aria-label="Diagram: the roles Admin, Doctor, Nurse, and Patient all connect to the CKD Healthcare Management System.">
      {roles.map((role) => (
        <line key={role.label} x1={role.x} y1={role.y} x2="200" y2="140" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 5" opacity="0.5" />
      ))}
      <rect x="112" y="108" width="176" height="64" rx="14" fill="currentColor" />
      <text x="200" y="136" textAnchor="middle" className="roles-core roles-core-title">CKD Healthcare</text>
      <text x="200" y="154" textAnchor="middle" className="roles-core roles-core-title">Management System</text>
      {roles.map((role) => (
        <g key={role.label}>
          <rect x={role.x - 44} y={role.y - 17} width="88" height="34" rx="17" className="roles-pill" />
          <text x={role.x} y={role.y + 5} textAnchor="middle" className="roles-label">{role.label}</text>
        </g>
      ))}
    </svg>
  );
}

function SiteSpecimen() {
  return (
    <div className="specimen" aria-label="Design choices used on this site: a monochrome palette with one accent colour, and the Bricolage Grotesque and DM Sans typefaces.">
      <div className="specimen-swatches" aria-hidden="true">
        <span style={{ background: "#0e0e10" }} />
        <span style={{ background: "#4a4a52" }} />
        <span style={{ background: "#e3e3e7" }} />
        <span style={{ background: "#c9dc30" }} />
      </div>
      <p className="specimen-aa" aria-hidden="true">Aa</p>
      <p className="specimen-caption">Bricolage Grotesque for headings, DM Sans for text</p>
    </div>
  );
}

export default function Home() {
  const reduceMotion = useReducedMotion();
  const [theme, setTheme] = useState<"light" | "dark">(() =>
    typeof document !== "undefined" && document.documentElement.dataset.theme === "dark" ? "dark" : "light",
  );
  const [toast, setToast] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("about");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstNavRef = useRef<HTMLAnchorElement>(null);
  const toastTimer = useRef<number | undefined>(undefined);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 });

  const showToast = (message: string) => {
    setToast(message);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(""), 3200);
  };

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("eb-theme", theme);
    } catch {
      /* storage unavailable; the theme still applies for this visit */
    }
  }, [theme]);

  useEffect(() => {
    const targets = sections
      .map(({ id }) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    targets.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (menuOpen) firstNavRef.current?.focus();
  }, [menuOpen]);

  const handleMenuKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape" && menuOpen) {
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    }
  };

  const shareProfile = async () => {
    const shareData = {
      title: "Ecollen Barcelo — IT student and developer",
      text: "IT student majoring in databases, with a growing focus on UI and UX.",
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        showToast("Profile shared");
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareData.url);
        showToast("Link copied");
      } else {
        showToast("Sharing isn't available in this browser");
      }
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") showToast("Couldn't share this page");
    }
  };

  const copyPhone = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(phone);
      } else {
        const field = document.createElement("textarea");
        field.value = phone;
        field.setAttribute("readonly", "");
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.appendChild(field);
        field.select();
        const ok = document.execCommand("copy");
        field.remove();
        if (!ok) throw new Error("copy failed");
      }
      showToast("Phone number copied");
    } catch {
      showToast(`Couldn't copy. My number is ${phone}`);
    }
  };

  const saveContact = () => {
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      "FN:Ecollen Barcelo",
      "N:Barcelo;Ecollen;;;",
      "TITLE:IT student and developer",
      `TEL;TYPE=CELL:${phone}`,
      `EMAIL;TYPE=INTERNET:${email}`,
      "END:VCARD",
    ].join("\r\n");
    const file = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    document.body.appendChild(link);
    link.href = url;
    link.download = "Ecollen-Barcelo.vcf";
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast("Contact card saved");
  };

  const motionProps = reduceMotion ? {} : { initial: "hidden", animate: "show" };

  return (
    <div className="page" id="top">
      <motion.div className="progress" style={{ scaleX: progress }} aria-hidden="true" />
      <a className="skip-link" href="#main-content">Skip to content</a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Ecollen Barcelo, back to top" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark" aria-hidden="true">eb</span>
          <span className="brand-name">Ecollen Barcelo</span>
        </a>
        <nav id="primary-navigation" className={`site-nav${menuOpen ? " is-open" : ""}`} aria-label="Main" onKeyDown={handleMenuKeyDown}>
          {sections.map(({ id, label }, index) => (
            <a
              key={id}
              ref={index === 0 ? firstNavRef : undefined}
              href={`#${id}`}
              aria-current={activeSection === id ? "true" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="header-tools">
          <button
            ref={menuButtonRef}
            className="icon-btn menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-controls="primary-navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
          <button
            className="icon-btn"
            type="button"
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
          >
            {theme === "dark" ? <Sun size={19} aria-hidden="true" /> : <Moon size={19} aria-hidden="true" />}
          </button>
          <button className="icon-btn" type="button" aria-label="Share this page" onClick={shareProfile}>
            <Share2 size={19} aria-hidden="true" />
          </button>
        </div>
      </header>

      <div className="toast-region" role="status" aria-live="polite">
        {toast && <span className="toast">{toast}</span>}
      </div>

      <main id="main-content">
        <section className="hero" id="about" aria-labelledby="hero-title">
          <motion.div className="hero-copy" variants={heroContainer} {...motionProps}>
            <motion.p className="status" variants={heroItem}>
              <span className="status-dot" aria-hidden="true" />
              Open to internship opportunities
            </motion.p>
            <motion.h1 id="hero-title" variants={heroItem}>
              Ecollen
              <br />
              Barcelo
            </motion.h1>
            <motion.p className="role" variants={heroItem}>IT student and developer</motion.p>
            <motion.p className="lede" variants={heroItem}>
              I'm majoring in databases and I'm growing in UI and UX. I like work where a well-structured database and a clear interface make a system easier to use.
            </motion.p>
            <motion.div className="actions" variants={heroItem}>
              <a className="btn btn-primary" href="#work">See my work</a>
              <a className="btn btn-ghost" href="#contact">Get in touch</a>
            </motion.div>
            <motion.dl className="facts" variants={heroItem}>
              <div>
                <dt>Studying</dt>
                <dd>Information Technology</dd>
              </div>
              <div>
                <dt>Major</dt>
                <dd>Databases</dd>
              </div>
              <div>
                <dt>Also drawn to</dt>
                <dd>UI and UX</dd>
              </div>
            </motion.dl>
          </motion.div>

          <motion.figure
            className="portrait"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.2, 0.75, 0.25, 1] }}
          >
            <div className="portrait-art">
              <div className="portrait-frame">
                <img src="/ecollen-portrait.jpeg" alt="Portrait of Ecollen Barcelo" width={402} height={517} />
              </div>
            </div>
            <figcaption>Ecollen V. Barcelo, based in the Philippines (UTC+8)</figcaption>
          </motion.figure>
        </section>

        <section className="section" id="work" aria-labelledby="work-title">
          <header className="section-head">
            <h2 id="work-title">Selected work</h2>
            <p>Two projects, with what I made and what I took from them.</p>
          </header>

          <article className="case">
            <div className="case-copy">
              <p className="case-meta">School project, healthcare</p>
              <h3>CKD Healthcare Management System</h3>
              <p>
                A system for managing chronic kidney disease care, including dialysis sessions, used by four roles: Admin, Doctor, Nurse, and Patient.
              </p>
              <h4>What I made</h4>
              <ul>
                <li>A use case diagram, plus data flow diagrams from level 0 to level 2 covering 12 processes</li>
                <li>An ERD and an EERD that use crow's foot notation, so readers who don't know EER notation can follow them</li>
                <li>A relational schema, a data dictionary, and the SQL schema file</li>
              </ul>
              <h4>What I learned</h4>
              <p>
                An advisor and a panel reviewed every diagram. Their feedback taught me to use the system's own names, keep flows balanced from one level to the next, and draw relationships so they read at a glance.
              </p>
            </div>
            <div className="case-visual">
              <RolesDiagram />
            </div>
          </article>

          <article className="case case-reverse">
            <div className="case-copy">
              <p className="case-meta">Personal project, web design and development</p>
              <h3>This portfolio</h3>
              <p>
                I designed and built this site myself in React, TypeScript, and Vite. It's a static site, so it loads fast and needs no backend.
              </p>
              <h4>Design decisions</h4>
              <ul>
                <li>A monochrome palette with a single accent colour, so emphasis stays meaningful</li>
                <li>Light and dark themes that follow your system setting and remember your choice</li>
                <li>Keyboard-friendly navigation, visible focus, readable contrast, and reduced-motion support</li>
              </ul>
              <h4>What I learned</h4>
              <p>
                Restraint is a design tool. Cutting decoration made the content, and the person behind it, easier to see.
              </p>
            </div>
            <div className="case-visual">
              <SiteSpecimen />
            </div>
          </article>

          <p className="more-work">I'm building more UI and UX case studies. If you'd like to see what's in progress, <a href="#contact">ask me</a>.</p>
        </section>

        <section className="section" id="certificates" aria-labelledby="certificates-title">
          <header className="section-head">
            <h2 id="certificates-title">Certificates</h2>
            <p>A database certification and employability training I've completed.</p>
          </header>

          <div className="cert-grid">
            {certificates.map((cert) => (
              <article className="cert" key={cert.title}>
                <a className="cert-preview" href={cert.image} target="_blank" rel="noreferrer">
                  <img src={cert.image} alt={cert.alt} loading="lazy" />
                  <span className="visually-hidden"> (opens the full certificate in a new tab)</span>
                </a>
                <h3>{cert.title}</h3>
                <p className="cert-issuer">{cert.issuer}</p>
                <dl className="cert-details">
                  {cert.details.map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="cert-links">
                  <a href={cert.image} target="_blank" rel="noreferrer">View certificate<ArrowUpRight size={15} aria-hidden="true" /></a>
                  {cert.verifyUrl && (
                    <a href={cert.verifyUrl} target="_blank" rel="noreferrer">Verify online<ArrowUpRight size={15} aria-hidden="true" /></a>
                  )}
                </p>
              </article>
            ))}
          </div>

          <h3 className="webinars-title">Webinars attended</h3>
          <p className="webinars-note">Certificates of participation from UpskillTechPH Training Services. They confirm attendance, not a professional certification.</p>
          <ul className="webinars">
            {webinars.map((webinar) => (
              <li key={webinar.title}>
                <strong>{webinar.title}</strong>
                <span>{webinar.meta}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="section" id="approach" aria-labelledby="approach-title">
          <header className="section-head">
            <h2 id="approach-title">How I work</h2>
            <p>The same three steps whether it's a database or an interface.</p>
          </header>
          <ol className="steps">
            {steps.map((step, index) => (
              <li key={step.title}>
                <span className="step-number" aria-hidden="true">{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>

          <h3 className="tools-title">Tools I use</h3>
          <ul className="tools">
            {tools.map((tool) => (
              <li key={tool.name}>
                <strong>{tool.name}</strong>
                <span>{tool.use}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="section contact" id="contact" aria-labelledby="contact-title">
          <div className="contact-copy">
            <h2 id="contact-title">Let's talk</h2>
            <p>
              Email or call me about an internship, a project, or a question. I'm glad to share more of my work.
            </p>
            <button className="btn btn-ghost" type="button" onClick={saveContact}>
              <Download size={17} aria-hidden="true" /> Save contact card
            </button>
          </div>

          <ul className="contact-cards">
            <li>
              <a href={gmailComposeUrl} target="_blank" rel="noreferrer">
                <span className="contact-icon"><Mail size={22} aria-hidden="true" /></span>
                <span className="contact-text">
                  <span className="contact-label">Email</span>
                  <span className="contact-value">{email}</span>
                </span>
                <ArrowUpRight className="contact-go" size={20} aria-hidden="true" />
                <span className="visually-hidden"> (opens Gmail in a new tab)</span>
              </a>
            </li>
            <li>
              <button type="button" onClick={copyPhone} aria-label={`Copy phone number ${phone}`}>
                <span className="contact-icon"><Phone size={22} aria-hidden="true" /></span>
                <span className="contact-text">
                  <span className="contact-label">Phone, tap to copy</span>
                  <span className="contact-value">{phone}</span>
                </span>
                <Copy className="contact-go" size={19} aria-hidden="true" />
              </button>
            </li>
            <li>
              <a href={facebookProfileUrl} target="_blank" rel="noreferrer">
                <span className="contact-icon"><span className="fb-mark" aria-hidden="true">f</span></span>
                <span className="contact-text">
                  <span className="contact-label">Facebook</span>
                  <span className="contact-value">Nyce Barcelo</span>
                </span>
                <ArrowUpRight className="contact-go" size={20} aria-hidden="true" />
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </section>
      </main>

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Ecollen Barcelo</span>
        <a href="#top">Back to top</a>
      </footer>
    </div>
  );
}
