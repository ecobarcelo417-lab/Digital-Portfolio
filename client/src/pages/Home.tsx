import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type PointerEvent as ReactPointerEvent } from "react";
import {
  ArrowUpRight,
  Code2,
  Download,
  Lightbulb,
  Mail,
  Menu,
  Phone,
  Share2,
  Wrench,
  X,
} from "lucide-react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstNavigationLinkRef = useRef<HTMLAnchorElement>(null);
  const portraitRef = useRef<HTMLElement | null>(null);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const smoothTiltX = useSpring(tiltX, { stiffness: 145, damping: 22, mass: 0.45 });
  const smoothTiltY = useSpring(tiltY, { stiffness: 145, damping: 22, mass: 0.45 });
  const { scrollYProgress: portraitScrollProgress } = useScroll({
    target: portraitRef,
    offset: ["start end", "end start"],
  });
  const portraitParallax = useSpring(
    useTransform(portraitScrollProgress, [0, 1], [14, -20]),
    { stiffness: 72, damping: 24, mass: 0.5 },
  );
  const revealInitial = prefersReducedMotion ? false : { opacity: 0, y: 26 };
  const revealFinal = { opacity: 1, y: 0 };
  const revealTransition = { duration: prefersReducedMotion ? 0 : 0.65, ease: "easeOut" as const };

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

  const handlePortraitPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (prefersReducedMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const horizontal = (event.clientX - bounds.left) / bounds.width;
    const vertical = (event.clientY - bounds.top) / bounds.height;
    tiltX.set((0.5 - vertical) * 5.5);
    tiltY.set((horizontal - 0.5) * 5.5);
  };

  const resetPortraitTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  useEffect(() => {
    if (mobileMenuOpen) firstNavigationLinkRef.current?.focus();
  }, [mobileMenuOpen]);

  const handleMenuKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape") {
      closeMobileMenu();
      menuButtonRef.current?.focus();
    }
  };

  return (
    <div className="portfolio-page" id="top">
      <div className="ambient-field" aria-hidden="true">
        <span className="ambient-orb ambient-orb--lime" />
        <span className="ambient-orb ambient-orb--ice" />
        <span className="ambient-orb ambient-orb--mist" />
        <span className="ambient-glass-ring" />
      </div>
      <a className="skip-link" href="#main-content">Skip to content</a>

      <header className="reference-header">
        <a className="reference-wordmark" href="#top" aria-label="Ecollen Barcelo, home" onClick={closeMobileMenu}>
          <span className="mini-monogram" aria-hidden="true">eb</span>
          <span>Ecollen Barcelo</span>
        </a>
        <nav
          id="primary-navigation"
          className={`header-navigation${mobileMenuOpen ? " is-open" : ""}`}
          aria-label="Main navigation"
          onKeyDown={handleMenuKeyDown}
        >
          <a ref={firstNavigationLinkRef} href="#about" onClick={closeMobileMenu}>About</a>
          <a href="#work" onClick={closeMobileMenu}>Capabilities</a>
          <a href="#contact" onClick={closeMobileMenu}>Contact</a>
        </nav>
        <div className="header-actions">
          <button
            ref={menuButtonRef}
            id="mobile-menu-toggle"
            className="menu-toggle"
            type="button"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-controls="primary-navigation"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
          </button>
          <button className="share-button" type="button" onClick={shareProfile} aria-label="Share Ecollen Barcelo’s profile">
            <Share2 size={20} aria-hidden="true" />
          </button>
        </div>
        {shareStatus && <span className="share-status" role="status" aria-live="polite">{shareStatus}</span>}
      </header>

      <main className="profile-main" id="main-content">
        <section className="hero-section" id="about" aria-labelledby="artist-name">
          <motion.div
            className="hero-copy"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={revealFinal}
            transition={revealTransition}
          >
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
          </motion.div>

          <motion.figure
            ref={portraitRef}
            className="hero-visual"
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.965 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...revealTransition, delay: prefersReducedMotion ? 0 : 0.12 }}
            style={{
              y: prefersReducedMotion ? 0 : portraitParallax,
              rotateX: prefersReducedMotion ? 0 : smoothTiltX,
              rotateY: prefersReducedMotion ? 0 : smoothTiltY,
              transformPerspective: 1100,
              transformStyle: "preserve-3d",
            }}
            onPointerMove={handlePortraitPointerMove}
            onPointerLeave={resetPortraitTilt}
          >
            <div className="hero-photo-frame">
              <img src="/ecollen-portrait.jpeg" alt="Portrait of Ecollen Barcelo" />
              <span className="hero-photo-index" aria-hidden="true">EB <span>/ 01</span></span>
              <span className="photo-glass-shine" aria-hidden="true" />
            </div>
            <figcaption className="hero-photo-caption">
              <span>ECOLLEN BARCELO</span>
              <span>INFORMATION TECHNOLOGY · DEVELOPER</span>
            </figcaption>
            <span className="hero-accent-mark" aria-hidden="true">＋</span>
            <span className="portrait-orbit" aria-hidden="true">01 <span>·</span> IT</span>
          </motion.figure>
        </section>

        <motion.section
          className="capabilities-section"
          id="work"
          aria-labelledby="work-title"
          initial={revealInitial}
          whileInView={revealFinal}
          viewport={{ once: true, amount: 0.18 }}
          transition={revealTransition}
        >
          <div className="section-heading">
            <div>
              <p className="section-kicker">01 / WHAT I CAN DO</p>
              <h2 id="work-title">Code for <span>real needs.</span></h2>
            </div>
            <p className="section-aside">IT work, thoughtful problem-solving, and useful things built with code.</p>
          </div>
          <div className="capability-grid">
            {capabilities.map(({ number, label, title, description, Icon }, index) => (
              <motion.article
                className="capability-card"
                key={number}
                initial={revealInitial}
                whileInView={revealFinal}
                viewport={{ once: true, amount: 0.16 }}
                transition={{ ...revealTransition, delay: prefersReducedMotion ? 0 : index * 0.11 }}
              >
                <div className="capability-card-top">
                  <span className="capability-number">{number} / {label}</span>
                  <span className="capability-icon"><Icon size={20} strokeWidth={1.7} aria-hidden="true" /></span>
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
                <span className="capability-card-glint" aria-hidden="true" />
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="contact-section"
          id="contact"
          aria-labelledby="contact-title"
          initial={revealInitial}
          whileInView={revealFinal}
          viewport={{ once: true, amount: 0.16 }}
          transition={revealTransition}
        >
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
        </motion.section>
      </main>

      <footer className="reference-footer">
        <a href="#top">Ecollen Barcelo <span>·</span></a>
        <span>Information Technology · Developer</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </div>
  );
}
