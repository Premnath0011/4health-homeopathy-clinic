import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { BsCalendarCheck } from "react-icons/bs";
import {
  FaLeaf, FaUserMd, FaShieldAlt, FaHeartbeat,
  FaBrain, FaChild,
} from "react-icons/fa"; 
import { MdFavorite } from "react-icons/md";
import { GiHealthNormal } from "react-icons/gi";

import home_about  from "../../assets/Image/About/home_about.webp";
import home_banner from "../../assets/Image/Home/banner_image-2.png";
import leafPng     from "../../assets/Image/Home/Leaf.png";
import potImg      from "../../assets/Image/Home/pot-img.png";
import leafPotImg  from "../../assets/Image/Home/leafpot.png";
import Footer      from "./Footer/Footer";

import AppointmentPopup from "../../Components/Website/Appoinmnet/Appoinmnetpop";

// ─── Design Tokens ───────────────────────────────────────────
const C = {
  green:      "#4BA86A",
  greenDark:  "#3a8a56",
  greenLight: "#E8F5ED",
  blueDark:   "#0F3D6E",
  blue:       "#0F6BAF",
  text:       "#233143",
  muted:      "#5F6B7A",
  lightBg:    "#F8FAFC",
  sectionBg:  "#EEF5F8",
  border:     "#E8EDF2",
  white:      "#ffffff",
};
const font = "'Poppins', sans-serif";

// ─── Inject Global CSS (animations, hover states, scroll reveal, responsive) ──
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

/* Scroll reveal */
.h-reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.h-reveal.h-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Float animations */
@keyframes floatLeaf {
  0%,100% { transform: rotate(45deg) translateY(0); }
  50%      { transform: rotate(55deg) translateY(-15px); }
}
@keyframes floatPot {
  0%,100% { transform: translateY(0); }
  50%      { transform: translateY(-8px); }
}
@keyframes floatBadge {
  0%,100% { transform: translateY(0); }
  50%      { transform: translateY(-6px); }
}

/* Hero bg blended icons */
.h-hero-blend-icon {
  position: absolute;
  pointer-events: none;
  z-index: 1;
  mix-blend-mode: multiply;
  filter: saturate(0.5) brightness(1.3);
  opacity: 0.13;
}

/* Strip card hover */
.h-strip-card-item {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  border-radius: 16px;
  padding: 28px 20px;
}
.h-strip-card-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 32px rgba(15,61,110,0.12) !important;
}

/* Service card hover */
.h-service-card {
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 4px 24px rgba(15,61,110,0.08);
  padding: 36px 24px 28px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  border: 1px solid transparent;
  height: 100%;
}
.h-service-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 48px rgba(15,61,110,0.14);
  border-color: #E8EDF2;
}

/* Buttons */
.h-btn-primary {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 14px 28px; background: #0F3D6E;
  border: none; border-radius: 10px; color: #fff;
  font-size: 0.9rem; font-weight: 600; font-family: 'Poppins', sans-serif;
  cursor: pointer; transition: opacity 0.25s ease, transform 0.25s ease;
  letter-spacing: 0.01em;
  white-space: nowrap;
}
.h-btn-primary:hover { opacity: 0.88; transform: translateY(-2px); }

.h-btn-outline {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 13px 28px; background: transparent;
  border: 1.5px solid #0F3D6E; border-radius: 10px; color: #0F3D6E;
  font-size: 0.9rem; font-weight: 600; font-family: 'Poppins', sans-serif;
  cursor: pointer; transition: background 0.25s ease, color 0.25s ease;
  white-space: nowrap;
}
.h-btn-outline:hover { background: #0F3D6E; color: #fff; }

.h-about-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 12px 24px; background: transparent;
  border: 1.5px solid #0F3D6E; border-radius: 10px; color: #0F3D6E;
  font-size: 0.88rem; font-weight: 600; font-family: 'Poppins', sans-serif;
  cursor: pointer; transition: background 0.25s ease, color 0.25s ease;
  white-space: nowrap;
}
.h-about-btn:hover { background: #0F3D6E; color: #fff; }

.h-service-link {
  display: inline-flex; align-items: center; gap: 5px;
  background: none; border: none; color: #0F3D6E;
  font-size: 0.84rem; font-weight: 600; font-family: 'Poppins', sans-serif;
  cursor: pointer; padding: 0; transition: color 0.25s ease;
}
.h-service-link:hover { color: #4BA86A; }

.h-cta-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 14px 28px; background: #fff;
  border: none; border-radius: 12px; color: #0F3D6E;
  font-size: 0.9rem; font-weight: 700; font-family: 'Poppins', sans-serif;
  cursor: pointer; transition: opacity 0.25s ease, transform 0.25s ease;
  white-space: nowrap; flex-shrink: 0; box-shadow: 0 4px 16px rgba(0,0,0,0.12);
}
.h-cta-btn:hover { opacity: 0.92; transform: translateY(-2px); }

/* Strip icon color variants */
.h-icon-green  { background: #E8F5ED; color: #4BA86A; }
.h-icon-blue   { background: #E3EEF9; color: #0F6BAF; }
.h-icon-teal   { background: #E2F4F1; color: #2BA895; }
.h-icon-purple { background: #EDE8F5; color: #7A5CD6; }

/* ─── RESPONSIVE OVERRIDES ─── */
@media (max-width: 991.98px) {
  .h-hero-left {
    text-align: center !important;
    padding: 0 15px 40px !important;
  }
  .h-hero-left p {
    max-width: 100% !important;
  }
  .h-hero-right {
    min-height: 350px !important;
  }
  .h-hero-right img {
    width: 112% !important;
    max-width: 680px !important;
    height: auto !important;
    max-height: 460px !important;
  }
  .h-strip-container {
    margin-top: -30px !important;
  }
  .h-about-img-wrapper {
    margin-bottom: 30px;
  }
  .h-about-img {
    height: 350px !important;
  }
  .h-about-text {
    text-align: center !important;
  }
  .h-about-text p {
    max-width: 100% !important;
  }
  .h-cta-content {
    flex-direction: column !important;
    text-align: center !important;
  }
  .h-cta-content > div:first-child {
    justify-content: center !important;
  }
}

@media (max-width: 767.98px) {
  section:first-of-type {
    padding: 60px 0 0 !important;
    border-bottom-left-radius: 40px !important;
    border-bottom-right-radius: 40px !important;
  }
  .h-hero-right {
    min-height: 300px !important;
  }
  .h-hero-right img {
    width: 108% !important;
    max-width: 620px !important;
    height: auto !important;
    max-height: 390px !important;
  }
  .h-strip-container {
    margin-top: -20px !important;
    padding: 24px 20px !important;
    border-radius: 20px !important;
  }
  .h-about-img {
    height: 300px !important;
  }
  .h-hero-btn-row {
    flex-wrap: nowrap !important;
    justify-content: center !important;
    gap: 8px !important;
  }
  .h-hero-btn-row .h-btn-primary,
  .h-hero-btn-row .h-btn-outline {
    width: auto !important;
    justify-content: center !important;
    padding: 10px 12px !important;
    gap: 5px !important;
    font-size: 0.76rem !important;
    flex: 0 0 auto;
  }
  .h-hero-main-img {
    transform: translateX(-8%) !important;
  }
  .h-cta-btn {
    width: 100% !important;
    justify-content: center !important;
  }
  .h-service-card {
    padding: 28px 18px 22px !important;
  }
}

@media (max-width: 575.98px) {
  section:first-of-type {
    padding: 40px 0 0 !important;
    border-bottom-left-radius: 30px !important;
    border-bottom-right-radius: 30px !important;
  }
  .h-hero-left h1 {
    font-size: 32px !important;
  }
  .h-hero-right {
    min-height: 250px !important;
  }
  .h-hero-right img {
    width: 110% !important;
    max-width: none !important;
    height: auto !important;
    max-height: 340px !important;
  }
  .h-strip-container {
    margin-top: -15px !important;
    padding: 20px 16px !important;
    border-radius: 16px !important;
  }
  .h-strip-card-item {
    padding: 20px 12px !important;
  }
  .h-about-img {
    height: 250px !important;
    border-radius: 16px !important;
  }
  .h-about-btn {
    width: auto !important;
    justify-content: center !important;
    padding: 10px 16px !important;
    font-size: 0.8rem !important;
    gap: 6px !important;
  }
  .h-hero-main-img {
    transform: translateX(-10%) !important;
  }
  .h-cta-banner {
    padding: 32px 24px !important;
  }
}
`;

function InjectGlobalCSS() {
  useEffect(() => {
    const id = "h-global-css";
    if (!document.getElementById(id)) {
      const style = document.createElement("style");
      style.id = id;
      style.textContent = GLOBAL_CSS;
      document.head.appendChild(style);
    }
  }, []);
  return null;
}

// ─── Scroll Reveal ────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("h-visible"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".h-reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ─── Data ─────────────────────────────────────────────────────
const stripFeatures = [
  { cls: "h-icon-green",  icon: <FaLeaf />,     title: "Natural & Safe",       desc: "Gentle treatment with no known side effects" },
  { cls: "h-icon-blue",   icon: <FaUserMd />,   title: "Personalized Care",    desc: "Tailored to your unique constitution & needs" },
  { cls: "h-icon-teal",   icon: <FaShieldAlt />,title: "Holistic Approach",    desc: "Treating the root cause, not just symptoms" },
  { cls: "h-icon-purple", icon: <MdFavorite />, title: "Better Quality of Life",desc: "Supporting long-term wellness & vitality" },
];

const services = [
  { icon: <GiHealthNormal />, title: "Chronic Conditions",  desc: "Natural support for long-term conditions like asthma, arthritis, thyroid, and more." },
  { icon: <FaChild />,        title: "Children's Health",   desc: "Gentle care for children's immunity, growth, behavior, and recurring illnesses." },
  { icon: <FaHeartbeat />,    title: "Women's Health",      desc: "Support for hormonal balance, PCOS, fertility, pregnancy, and menopause." },
  { icon: <FaBrain />,        title: "Mental & Emotional",  desc: "Helping with stress, anxiety, depression, sleep issues, and emotional well-being." },
];

// ─── Blue Blob SVG ────────────────────────────────────────────
const BlueBlobSVG = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 500 500"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      position: "absolute", left: "50%", top: "50%",
      transform: "translate(-50%, -50%)",
      width: "88%", maxWidth: 480, zIndex: 0, pointerEvents: "none",
    }}
  >
    <ellipse cx="250" cy="260" rx="220" ry="230" fill="url(#blobGrad)" opacity="0.55" />
    <defs>
      <radialGradient id="blobGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%"   stopColor="#D6EAF8" />
        <stop offset="100%" stopColor="#AED6F1" />
      </radialGradient>
    </defs>
  </svg>
);

// ═══════════════ MAIN COMPONENT ══════════════════════════════
const Home = () => {
  const navigate = useNavigate();
  useReveal();

  useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <div style={{ fontFamily: font, color: C.text, background: C.white, overflowX: "hidden" }}>
      <InjectGlobalCSS />

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section style={{
        background: "linear-gradient(180deg,#ffffff 0%,#f8fbfd 25%,#edf6fb 60%,#c3f5cb 100%)",
        padding: "clamp(40px, 5vw, 80px) 0 0",
        position: "relative",
        overflow: "hidden",
        borderBottomLeftRadius: "clamp(30px, 5vw, 80px)",
        borderBottomRightRadius: "clamp(30px, 5vw, 80px)",
      }}>

        {/* ── Decorative / blended bg images ── */}
        
        {/* Leaf top-right - hidden on mobile */}
        <img src={leafPng} alt="" aria-hidden="true" className="d-none d-md-block" style={{
          position: "absolute", top: -30, right: -30,
          width: "clamp(140px, 15vw, 220px)", opacity: 0.5, pointerEvents: "none", zIndex: 1,
          transform: "rotate(20deg)",
        }} />

        {/* Leaf bottom-left */}
        <img src={leafPng} alt="" aria-hidden="true" style={{
          position: "absolute", bottom: -20, left: -40,
          width: "clamp(100px, 12vw, 150px)", opacity: 0.65, pointerEvents: "none", zIndex: 0,
          transform: "rotate(-30deg)",
        }} />

        {/* Floating leaf (animated) - hidden on mobile */}
        <img src={leafPng} alt="" aria-hidden="true" className="d-none d-lg-block" style={{
          position: "absolute", top: "40%", left: "15%",
          width: 90, opacity: 0.15, pointerEvents: "none", zIndex: 0,
          transform: "rotate(45deg)",
          animation: "floatLeaf 6s ease-in-out infinite",
        }} />

        {/* pot-img blended top-right area - hidden on small screens */}
        <img src={potImg} alt="" aria-hidden="true" className="d-none d-lg-block" style={{
          position: "absolute", top: 40, right: 150,
          width: 140, opacity: 0.22, pointerEvents: "none", zIndex: 2,
          mixBlendMode: "multiply", filter: "saturate(0.6) brightness(1.2)",
        }} />

        {/* leafpot blended behind pot - hidden on small screens */}
        <img src={leafPng} alt="" aria-hidden="true" className="d-none d-lg-block" style={{
          position: "absolute", top: 20, right: 120,
          width: 300, opacity: 0.08, pointerEvents: "none", zIndex: 1,
          transform: "rotate(20deg)",
          mixBlendMode: "multiply",
        }} />

        {/* Pot badge bottom-left (floating) */}
        <img src={potImg} alt="Homeopathic medicine" aria-hidden="true" className="d-none d-md-block" style={{
          position: "absolute", bottom: "clamp(16px, 4vw, 32px)", left: "clamp(16px, 4vw, 48px)",
          width: "clamp(80px, 10vw, 120px)", opacity: 0.88, pointerEvents: "none", zIndex: 3,
          filter: "drop-shadow(0 8px 20px rgba(15,61,110,0.18))",
          animation: "floatPot 5s ease-in-out infinite",
        }} />

        {/* ── Hero inner ── */}
        <div className="container" style={{ maxWidth: 1200, padding: "0 15px" }}>
          <div className="row align-items-center" style={{ minHeight: "clamp(420px, 60vh, 520px)", position: "relative", zIndex: 2 }}>

            {/* Left — Text */}
<div className="col-lg-6 col-12 h-hero-left" style={{ padding: "0 0 60px", textAlign: "left" }}>
  <h1 style={{
                fontSize: "clamp(28px, 5vw, 64px)", fontWeight: 800,
                lineHeight: 1.12, color: C.blueDark, margin: "0 0 20px",
                letterSpacing: "-0.02em",
              }}>
                Gentle Care<br />
                Natural Healing<br />
                <span style={{ color: C.green }}>Better Health</span>
              </h1>
  <p style={{
    fontSize: "clamp(0.875rem, 1.5vw, 1rem)", lineHeight: 1.65, color: C.muted,
    maxWidth: 380, margin: "0 0 36px",
  }}>
    Personalized homeopathic treatment that supports your body's
    natural ability to heal.
  </p>
  <div className="h-hero-btn-row" style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", justifyContent: "flex-start" }}>
    <button className="h-btn-primary" onClick={() => setPopupOpen(true)}>
      Book an Appointment <FiArrowRight size={14} />
    </button>
    <button className="h-btn-outline" onClick={() => navigate("/about-us")}>
      Learn More
    </button>
  </div>
</div>

            {/* Right — Image */}
            <div className="col-lg-6 col-12 d-flex align-items-center justify-content-center h-hero-right"
              style={{ position: "relative", minHeight: "clamp(250px, 50vw, 480px)", padding: "0 15px" }}>
              <BlueBlobSVG />
              <img src={leafPng} alt="" aria-hidden="true" style={{
                position: "absolute", right: -20, top: "50%",
                transform: "translateY(-50%) rotate(-15deg)",
                width: "clamp(200px, 30vw, 320px)", opacity: 0.18, zIndex: 1, pointerEvents: "none",
              }} />
              <img
                className="h-hero-main-img"
                src={home_banner}
                alt="4Health Homeopathy Family Care"
                style={{
    position: "relative",
    zIndex: 2,

    width: "115%",
    maxWidth: 720,
    height: "auto",
    maxHeight: "clamp(340px, 60vw, 620px)",

    objectFit: "contain",
    objectPosition: "center bottom",
    display: "block",
  }}
              />
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FEATURE STRIP
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: "0 15px 20px", position: "relative", zIndex: 10 }}>
        <div className="container" style={{ maxWidth: 1200, padding: 0 }}>
          <div className="h-strip-container" style={{
            background: C.white,
            borderRadius: "clamp(16px, 3vw, 24px)",
            boxShadow: "0 8px 40px rgba(15,61,110,0.10)",
            border: `1px solid ${C.border}`,
            marginTop: -60,
            padding: "clamp(20px, 4vw, 32px) clamp(16px, 4vw, 36px)",
          }}>
            <div className="row g-4">
              {stripFeatures.map((item, i) => (
                <div className="col-lg-3 col-sm-6 col-12" key={i}>
                  <div className="h-strip-card-item" style={{ display: "flex", alignItems: "flex-start", gap: 16, boxShadow: "none" }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: "50%", flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "1.1rem",
                    }} className={item.cls}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: "0.92rem", fontWeight: 700, color: C.text, marginBottom: 4 }}>
                        {item.title}
                      </div>
                      <p style={{ fontSize: "0.8rem", color: C.muted, lineHeight: 1.5, margin: 0 }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          ABOUT
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: "clamp(50px, 8vw, 90px) 0", background: C.white, position: "relative", overflow: "hidden" }}>
        <div className="container" style={{ maxWidth: 1200, padding: "0 15px" }}>
          <div className="row align-items-center g-5">

            {/* Image */}
            <div className="col-lg-6 col-12 h-reveal h-about-img-wrapper" style={{ position: "relative" }}>
              <img src={leafPng} alt="" aria-hidden="true" className="d-none d-lg-block" style={{
                position: "absolute", left: -60, top: "50%",
                transform: "translateY(-50%) rotate(25deg)",
                opacity: 0.22, pointerEvents: "none", zIndex: 0, width: 320,
              }} />
              <img
                src={home_about}
                alt="4Health Homeopathy — Natural Medicine"
                className="h-about-img"
                style={{
                  width: "100%", height: "clamp(250px, 40vw, 440px)", objectFit: "cover",
                  borderRadius: "clamp(16px, 3vw, 20px)", display: "block",
                  margin: "0 auto",
                  position: "relative", zIndex: 1,
                  boxShadow: "0 8px 40px rgba(15,61,110,0.10)",
                }}
              />
            </div>

            {/* Text */}
            <div className="col-lg-6 col-12 h-reveal h-about-text" style={{ position: "relative" }}>
              <img src={leafPng} alt="" aria-hidden="true" className="d-none d-lg-block" style={{
                position: "absolute", right: -20, top: -20,
                width: 260, opacity: 0.67, pointerEvents: "none", zIndex: 0,
                transform: "rotate(15deg)",
              }} />
              <span style={{
                display: "inline-block", fontSize: "0.72rem", fontWeight: 700,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: C.green, marginBottom: 16, position: "relative", zIndex: 1,
              }}>
                About 4 Health Homeopathy
              </span>
              <h2 style={{
                fontSize: "clamp(24px, 3.5vw, 44px)", fontWeight: 800,
                color: C.blueDark, lineHeight: 1.18, margin: "0 0 20px",
                letterSpacing: "-0.01em", position: "relative", zIndex: 1,
              }}>
                Rooted in Nature<br />
                <span style={{ color: C.green }}>Focused on You</span>
              </h2>
              <p style={{
                fontSize: "clamp(0.85rem, 1.2vw, 0.95rem)", lineHeight: 1.75, color: C.muted,
                margin: "0 0 32px", maxWidth: 460,
                position: "relative", zIndex: 1,
              }}>
                We believe in treating the whole person, not just the illness.
                Our experienced homeopaths take the time to understand your
                health concerns and create a treatment plan that supports your
                body, mind, and lifestyle.
              </p>
              <button className="h-about-btn" onClick={() => navigate("/about-us")} style={{ position: "relative", zIndex: 1 }}>
                Learn More About Us <FiArrowRight size={13} />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SERVICES
      ══════════════════════════════════════════════════════ */}
      <section style={{
        background: C.sectionBg, padding: "clamp(50px, 8vw, 80px) 0 clamp(60px, 9vw, 90px)",
        position: "relative", overflow: "hidden",
      }}>
        {/* Wave top */}
        <svg style={{ position: "absolute", top: -1, left: 0, width: "100%", height: 60, display: "block" }}
          viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,0 C240,60 480,0 720,40 C960,80 1200,20 1440,50 L1440,0 Z" fill={C.sectionBg} />
        </svg>

        {/* Leaf decorations - hidden on mobile */}
        <img src={leafPng} alt="" aria-hidden="true" className="d-none d-md-block" style={{
          position: "absolute", top: 20, left: -40, width: 150,
          opacity: 0.12, pointerEvents: "none", zIndex: 0, transform: "rotate(35deg)",
        }} />
        <img src={leafPng} alt="" aria-hidden="true" className="d-none d-md-block" style={{
          position: "absolute", bottom: 30, right: -30, width: 90,
          opacity: 0.12, pointerEvents: "none", zIndex: 0, transform: "rotate(-25deg)",
        }} />

        {/* leafpot background accent - hidden on mobile */}
        <img src={leafPotImg} alt="" aria-hidden="true" className="d-none d-lg-block" style={{
          position: "absolute", bottom: -40, right: -60,
          width: 420, opacity: 0.10, pointerEvents: "none", zIndex: 0,
          transform: "rotate(8deg)",
          mixBlendMode: "multiply", filter: "saturate(0.7)",
        }} />

        <div className="container" style={{ maxWidth: 1200, position: "relative", zIndex: 1, padding: "0 15px" }}>

          {/* Header */}
          <div className="text-center h-reveal" style={{ marginBottom: "clamp(30px, 5vw, 48px)" }}>
            <span style={{
              display: "inline-block", fontSize: "0.72rem", fontWeight: 700,
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: C.green, marginBottom: 12,
            }}>
              Our Services
            </span>
            <h2 style={{
              fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 800,
              color: C.blueDark, margin: 0, letterSpacing: "-0.01em",
            }}>
              How <span style={{ color: C.green }}>We Can Help</span>
            </h2>
          </div>

          {/* Cards */}
          <div className="row g-4">
            {services.map((svc, i) => (
              <div className="col-lg-3 col-sm-6 col-12 h-reveal" key={i} style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="h-service-card">
                  <div style={{
                    width: "clamp(60px, 8vw, 72px)", height: "clamp(60px, 8vw, 72px)", borderRadius: "50%", background: C.sectionBg,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 20px", fontSize: "clamp(1.4rem, 2vw, 1.7rem)", color: C.green,
                  }}>
                    {svc.icon}
                  </div>
                  <h5 style={{ fontSize: "clamp(0.9rem, 1.2vw, 1rem)", fontWeight: 700, color: C.text, margin: "0 0 10px" }}>
                    {svc.title}
                  </h5>
                  <p style={{ fontSize: "clamp(0.78rem, 1vw, 0.83rem)", color: C.muted, lineHeight: 1.65, margin: "0 0 20px" }}>
                    {svc.desc}
                  </p>
                  <button className="h-service-link" onClick={() => navigate("/treatments")}>
                    Learn More <FiArrowRight size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════════════════════ */}
      <div style={{ background: C.sectionBg, padding: "0 15px clamp(50px, 8vw, 80px)" }}>
        <div className="container" style={{ maxWidth: 1200, padding: 0 }}>
          <div className="h-cta-banner" style={{
            background: `linear-gradient(135deg,${C.blueDark} 0%,${C.blue} 55%,${C.green} 100%)`,
            borderRadius: "clamp(20px, 3vw, 28px)", padding: "clamp(32px, 5vw, 44px) clamp(24px, 5vw, 52px)",
            position: "relative", overflow: "hidden",
            boxShadow: "0 12px 48px rgba(15,61,110,0.18)",
          }}>
            {/* Leaf decorations - hidden on mobile */}
            <img src={leafPng} alt="" aria-hidden="true" className="d-none d-md-block" style={{
              position: "absolute", right: -20, top: -20, width: 320,
              opacity: 0.15, pointerEvents: "none", zIndex: 0, transform: "rotate(25deg)",
            }} />
            <img src={leafPng} alt="" aria-hidden="true" className="d-none d-md-block" style={{
              position: "absolute", left: -30, bottom: -30, width: 50,
              opacity: 0.1, pointerEvents: "none", zIndex: 0, transform: "rotate(-20deg)",
            }} />
            {/* Pot accent */}
            <img src={potImg} alt="" aria-hidden="true" className="d-none d-lg-block" style={{
              position: "absolute", right: 200, bottom: -10,
              width: 100, opacity: 0.22, pointerEvents: "none", zIndex: 0,
              transform: "rotate(-5deg)",
              filter: "brightness(1.6) saturate(0.5)",
            }} />

            <div className="row align-items-center" style={{ position: "relative", zIndex: 1 }}>
              <div className="col-md-8 col-12 h-cta-content" style={{ display: "flex", alignItems: "center", gap: 24 }}>
                <div style={{
                  width: 60, height: 60, borderRadius: 16, flexShrink: 0,
                  background: "rgba(255,255,255,0.18)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.6rem", color: "#fff",
                }}>
                  <BsCalendarCheck />
                </div>
                <div>
                  <h3 style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.3rem)", fontWeight: 700, color: "#fff", margin: "0 0 6px" }}>
                    Ready to Take the First Step?
                  </h3>
                  <p style={{ fontSize: "clamp(0.8rem, 1.1vw, 0.88rem)", color: "rgba(255,255,255,0.82)", margin: 0, maxWidth: 380, lineHeight: 1.55 }}>
                    Book a consultation and start your journey towards better health—naturally.
                  </p>
                </div>
              </div>
              <div className="col-md-4 col-12 text-md-end text-center mt-3 mt-md-0">
                <button className="h-cta-btn" onClick={() => setPopupOpen(true)}>
                  Book an Appointment <FiArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <AppointmentPopup isOpen={popupOpen} onClose={() => setPopupOpen(false)} />
    </div>
  );
};

export default Home;