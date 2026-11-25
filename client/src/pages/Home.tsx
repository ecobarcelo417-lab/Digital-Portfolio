import { useState } from "react";
import {
  ArrowUpRight,
  Code2,
  Download,
  ExternalLink,
  Lightbulb,
  Mail,
  Phone,
  Share2,
  Wrench,
} from "lucide-react";

const facebookProfileUrl = "https://www.facebook.com/share/1CLUpLvBnf/?mibextid=wwXIfr";

const capabilities = [
  {
    number: "01",
    label: "CODING",
    title: "Software & code",
    description: "I can code practical digital tools and applications, with care for clear structure and reliable behavior.",
    Icon: Code2,
  },
  {
    number: "02",
    label: "INFORMATION TECHNOLOGY",
    title: "Robust IT work",
    description: "I take on work connected to my IT program and focus on solid, useful solutions to real needs.",
    Icon: Wrench,
  },
  {
    number: "03",
    label: "PROBLEM-SOLVING",
    title: "From need to solution",
    description: "I break a problem down, plan a sensible technical approach, and refine the result for dependable use.",
    Icon: Lightbulb,
  },
];

export default function Home() {
  const [shareStatus, setShareStatus] = useState("");

  const shareProfile = async () => {
    const shareData = {
      title: "Ecollen Barcelo — IT & Developer Portfolio",
      text: "IT · coding · practical digital solutions",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShareStatus("Profile shared");
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareData.url);
        setShareStatus("Profile link copied");
      } else {
        setShareStatus("Sharing is not available in this browser");
      }
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        setShareStatus("Could not share this profile");
      }
    }
  };

  const saveContact = () => {
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      "FN:Ecollen Barcelo",
      "N:Barcelo;Ecollen;;;",
      "TITLE:IT / Developer",
      "TEL;TYPE=CELL:09764930463",
      "EMAIL;TYPE=INTERNET:nycebarcelo@gmail.com",
      "END:VCARD",
    ].join("\r\n");
    const file = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(file);
    const download = document.createElement("a");
    document.body.appendChild(download);
    download.href = url;
    download.download = "Ecollen-Barcelo.vcf";
    download.click();
    download.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <div className="portfolio-page" id="top">
      <a className="skip-link" href="#main-content">Skip to content</a>

      <header className="reference-header">
        <a className="reference-wordmark" href="#top" aria-label="Ecollen Barcelo, home">
          <span className="mini-monogram" aria-hidden="true">eb</span>
          <span>Ecollen Barcelo</span>
        </a>
        <nav className="header-navigation" aria-label="Main navigation">
          <a href="#about">About</a>
          <a href="#work">Capabilities</a>
          <a href="#contact">Contact</a>
        </nav>
        <button className="share-button" type="button" onClick={shareProfile} aria-label="Share Ecollen Barcelo’s profile">
          <Share2 size={21} aria-hidden="true" />
        </button>
        {shareStatus && <span className="share-status" role="status" aria-live="polite">{shareStatus}</span>}
      </header>

      <main className="profile-main" id="main-content">
        <section className="hero-section" id="about" aria-labelledby="artist-name">
          <div className="hero-copy">
            <p className="hero-kicker"><span className="status-dot" aria-hidden="true" /> IT · DEVELOPER · PROBLEM-SOLVER</p>
            <h1 id="artist-name">Ecollen <span>Barcelo</span></h1>
            <p className="hero-role">Information Technology <span>/</span> Developer</p>
            <p className="hero-lede">
              I’m an IT student majoring in databases, but UI and UX are interests of mine too. I’m still in IT, and database skills aren’t limited to database work—I can apply them to other tasks as well.
            </p>
            <div className="hero-actions">
              <a className="hero-primary" href="#contact">Let’s connect <ArrowUpRight size={17} aria-hidden="true" /></a>
              <a className="hero-secondary" href="#work">Explore capabilities <span aria-hidden="true">↓</span></a>
            </div>
            <div className="hero-focus" aria-label="Focus areas">
              <span>CODING</span>
              <span>IT SOLUTIONS</span>
              <span>PROBLEM-SOLVING</span>
            </div>
          </div>

          <figure className="hero-visual">
            <div className="hero-photo-frame">
              <img src="/ecollen-portrait.jpeg" alt="Portrait of Ecollen Barcelo" />
              <span className="hero-photo-index" aria-hidden="true">EB <span>/ 01</span></span>
            </div>
            <figcaption className="hero-photo-caption">
              <span>ECOLLEN BARCELO</span>
              <span>INFORMATION TECHNOLOGY · DEVELOPER</span>
            </figcaption>
            <span className="hero-accent-mark" aria-hidden="true">＋</span>
          </figure>
        </section>

        <section className="capabilities-section" id="work" aria-labelledby="work-title">
          <div className="section-heading">
            <div>
              <p className="section-kicker">01 / WHAT I CAN DO</p>
              <h2 id="work-title">Code for <span>real needs.</span></h2>
            </div>
            <p className="section-aside">IT work, thoughtful problem-solving, and useful things built with code.</p>
          </div>
          <div className="capability-grid">
            {capabilities.map(({ number, label, title, description, Icon }) => (
              <article className="capability-card" key={number}>
                <div className="capability-card-top">
                  <span className="capability-number">{number} / {label}</span>
                  <span className="capability-icon"><Icon size={20} strokeWidth={1.7} aria-hidden="true" /></span>
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div>
            <p className="section-kicker">02 / CONTACT</p>
            <h2 id="contact-title">Let’s build<br /><span>something useful.</span></h2>
            <p className="contact-intro">Reach out about IT, coding, projects, or opportunities.</p>
            <div className="contact-details">
              <a className="contact-detail" href="mailto:nycebarcelo@gmail.com">
                <Mail size={17} aria-hidden="true" /> nycebarcelo@gmail.com <ArrowUpRight size={15} aria-hidden="true" />
              </a>
              <a className="contact-detail" href="tel:09764930463">
                <Phone size={17} aria-hidden="true" /> 09764930463 <ArrowUpRight size={15} aria-hidden="true" />
              </a>
              <a className="contact-detail" href={facebookProfileUrl} target="_blank" rel="noreferrer">
                <span className="facebook-mark" aria-hidden="true">f</span> Nyce Barcelo on Facebook <ArrowUpRight size={15} aria-hidden="true" />
              </a>
              <button className="contact-save-button" type="button" onClick={saveContact}>
                <Download size={17} aria-hidden="true" /> Save contact
              </button>
            </div>
          </div>
          <span className="contact-spark" aria-hidden="true">＋</span>
        </section>
      </main>

      <footer className="reference-footer">
        <a href="#top">Ecollen Barcelo <span>·</span></a>
        <span>Information Technology · Developer</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </div>
  );
}
