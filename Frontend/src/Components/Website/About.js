// About.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { BsCalendarCheck } from "react-icons/bs";
import {
  FaLeaf,
  FaRegUser,
  FaRegHandshake,
  FaShieldAlt,
  FaHeart,
  FaAward, 
  FaCalendarAlt,
  FaUsers,
  FaCheckCircle,
  FaUserMd,
} from "react-icons/fa";

// ── Assets ──
import aboutHero from "../../assets/Image/About/clinic2.webp";
import leafPng from "../../assets/Image/Home/Leaf.png";

// Images
import Jyothi from "../../assets/Image/About/Dr.Jyothi.webp";
import Karthik from "../../assets/Image/About/Dr.Karthik.webp";

import Footer from "./Footer/Footer";

// ── Popup ──
import AppointmentPopup from "./Appoinmnet/Appoinmnetpop";

// ── Design Tokens (same as Service.jsx) ──
const C = {
  green: "#4BA86A",
  greenDark: "#3a8a56",
  greenLight: "#E8F5ED",
  blueDark: "#0F3D6E",
  blue: "#0F6BAF",
  text: "#233143",
  muted: "#5F6B7A",
  lightBg: "#F8FAFC",
  border: "#E8EDF2",
  white: "#ffffff",
  gold: "#C9A96E",
};

const font = "'Poppins', sans-serif";

// ── Inject global styles (scroll reveal + font + new stat hover) ──
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

.ab-reveal {
  opacity: 0;
  transform: translateY(26px);
  transition: opacity 0.65s ease, transform 0.65s ease;
}
.ab-reveal.ab-visible {
  opacity: 1;
  transform: translateY(0);
}

.ab-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  background: ${C.blueDark};
  border: none;
  border-radius: 10px;
  color: #fff;
  font-size: 0.9rem;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  transition: opacity 0.25s ease, transform 0.25s ease;
  letter-spacing: 0.01em;
}
.ab-btn-primary:hover { opacity: 0.88; transform: translateY(-2px); }

.ab-btn-outline {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 28px;
  background: transparent;
  border: 1.5px solid ${C.blueDark};
  border-radius: 10px;
  color: ${C.blueDark};
  font-size: 0.9rem;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  transition: background 0.25s ease, color 0.25s ease;
}
.ab-btn-outline:hover { background: ${C.blueDark}; color: #fff; }

.ab-doctor-img-hover {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.ab-doctor-img-hover:hover {
  transform: scale(1.02);
  box-shadow: 0 16px 50px rgba(15,61,110,0.15) !important;
}

.ab-value-card-hover {
  transition: background 0.25s ease, transform 0.3s ease;
  position: relative;
}
.ab-value-card-hover::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 3px;
  background: ${C.green};
  transition: width 0.3s ease;
  border-radius: 2px;
}
.ab-value-card-hover:hover::after { width: 70%; }
.ab-value-card-hover:hover { background: ${C.lightBg} !important; transform: translateY(-4px); }

.ab-stat-item {
  transition: transform 0.3s ease, background 0.3s ease;
  border-radius: 12px;
}
.ab-stat-item:hover {
  transform: translateY(-4px);
  background: ${C.greenLight};
}

.ab-cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  background: #fff;
  border: none;
  border-radius: 12px;
  color: ${C.blueDark};
  font-size: 0.88rem;
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  transition: opacity 0.25s ease, transform 0.25s ease;
  white-space: nowrap;
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
}
.ab-cta-btn:hover { opacity: 0.92; transform: translateY(-2px); }

/* =========================================================
   ABOUT — TABLET / MOBILE RESPONSIVE
   Existing navigation, popup and page logic stay unchanged.
========================================================= */

@media (max-width: 991.98px) {
  .ab-hero,
  .ab-hero-row {
    min-height: auto !important;
  }

  .ab-hero-content {
    justify-content: center;
  }

  .ab-hero-inner {
    width: 100%;
    max-width: 680px;
  }

  .ab-doctor-section,
  .ab-philosophy-section {
    padding-top: 56px !important;
    padding-bottom: 56px !important;
  }

  .ab-doctor-row,
  .ab-philosophy-bottom {
    --bs-gutter-y: 30px;
  }

  .ab-values-section {
    padding-top: 52px !important;
    padding-bottom: 56px !important;
  }

  .ab-cta-section {
    padding-bottom: 52px !important;
  }
}

@media (max-width: 767.98px) {
  .ab-page .container {
    padding-left: 16px;
    padding-right: 16px;
  }

  /* Hero */
  .ab-hero,
  .ab-hero-row {
    min-height: auto !important;
  }

  .ab-hero-content {
    padding: 32px 18px 38px !important;
    justify-content: flex-start;
  }

  .ab-hero-inner {
    max-width: 100%;
  }

  .ab-hero-inner > span {
    margin-bottom: 10px !important;
    font-size: 0.66rem !important;
  }

  .ab-hero-inner h1 {
    margin-bottom: 13px !important;
    font-size: 30px !important;
    line-height: 1.14 !important;
  }

  .ab-hero-inner > p {
    max-width: 100% !important;
    margin-bottom: 16px !important;
    font-size: 0.84rem !important;
    line-height: 1.65 !important;
  }

  .ab-hero-tagline {
    gap: 9px !important;
    margin-bottom: 20px !important;
    font-size: 0.75rem !important;
    line-height: 1.45;
  }

  .ab-hero-tagline > span:first-child {
    width: 26px !important;
  }

  /* Keep the two hero buttons compact and aligned */
  .ab-hero-actions {
    display: grid !important;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px !important;
    width: 100%;
  }

  .ab-hero-actions .ab-btn-primary,
  .ab-hero-actions .ab-btn-outline {
    width: 100%;
    min-width: 0;
    justify-content: center;
    padding: 9px 7px !important;
    font-size: 0.68rem !important;
    line-height: 1.25;
    text-align: center;
    white-space: nowrap;
  }

  .ab-hero-actions svg {
    width: 12px;
    height: 12px;
    flex-shrink: 0;
  }

  /* Doctor sections */
  .ab-doctor-section,
  .ab-philosophy-section {
    padding-top: 38px !important;
    padding-bottom: 38px !important;
  }

  .ab-doctor-row {
    --bs-gutter-y: 22px;
  }

  .ab-doctor-image-col {
    padding-left: 16px;
    padding-right: 16px;
  }

  .ab-doctor-image-col .ab-doctor-img-hover {
    max-width: 330px !important;
    height: 320px !important;
    border-radius: 16px !important;
  }

  .ab-doctor-content {
    gap: 7px !important;
  }

  .ab-doctor-content h3 {
    font-size: 1.5rem !important;
    line-height: 1.2 !important;
  }

  .ab-doctor-content > p {
    font-size: 0.82rem !important;
    line-height: 1.65 !important;
  }

  .ab-doctor-content > p:nth-of-type(1) {
    font-size: 0.88rem !important;
  }

  .ab-doctor-content ul {
    gap: 8px !important;
  }

  .ab-doctor-content li {
    gap: 8px !important;
    font-size: 0.77rem !important;
    line-height: 1.5 !important;
  }

  .ab-doctor-content li > span {
    width: 22px !important;
    height: 22px !important;
    min-width: 22px !important;
  }

  .ab-doctor-quote {
    margin-top: 3px !important;
    padding: 12px 14px 12px 36px !important;
    border-radius: 10px !important;
    font-size: 0.78rem !important;
    line-height: 1.55 !important;
  }

  .ab-doctor-quote > span {
    left: 11px !important;
    top: 7px !important;
    font-size: 1.65rem !important;
  }

  /* Philosophy */
  .ab-philosophy-heading {
    margin-bottom: 24px !important;
  }

  .ab-philosophy-heading > span {
    margin-bottom: 10px !important;
    padding: 5px 11px !important;
    font-size: 0.66rem !important;
  }

  .ab-philosophy-heading h2 {
    margin-bottom: 10px !important;
    font-size: 24px !important;
    line-height: 1.28 !important;
  }

  .ab-philosophy-heading p {
    font-size: 0.8rem !important;
    line-height: 1.6 !important;
  }

  .ab-principles-grid {
    --bs-gutter-x: 10px;
    --bs-gutter-y: 10px;
    margin-bottom: 28px !important;
  }

  .ab-principle-card {
    padding: 16px !important;
    border-radius: 13px !important;
  }

  .ab-principle-card > div:first-child {
    width: 42px !important;
    height: 42px !important;
    margin-bottom: 10px !important;
  }

  .ab-principle-card h5 {
    font-size: 0.86rem !important;
    line-height: 1.35;
  }

  .ab-principle-card p {
    font-size: 0.73rem !important;
    line-height: 1.5 !important;
  }

  .ab-philosophy-bottom {
    --bs-gutter-y: 28px;
  }

  .ab-philosophy-bottom h4 {
    margin-bottom: 14px !important;
    font-size: 1.05rem !important;
  }

  .ab-philosophy-bottom ul {
    gap: 10px !important;
  }

  .ab-philosophy-bottom li {
    gap: 9px !important;
  }

  .ab-philosophy-bottom li p:first-child {
    font-size: 0.82rem !important;
  }

  .ab-philosophy-bottom li p:last-child {
    font-size: 0.73rem !important;
    line-height: 1.5 !important;
  }

  .ab-condition-chips {
    gap: 7px !important;
    margin-bottom: 18px !important;
  }

  .ab-condition-chips > span {
    padding: 7px 10px !important;
    font-size: 0.68rem !important;
    line-height: 1.35;
  }

  .ab-philosophy-bottom .ab-btn-primary {
    width: auto;
    padding: 9px 15px !important;
    font-size: 0.74rem !important;
  }

  /* Values */
  .ab-values-section {
    padding-top: 36px !important;
    padding-bottom: 38px !important;
  }

  .ab-values-grid {
    margin-left: 0 !important;
    margin-right: 0 !important;
    border-radius: 16px !important;
  }

  .ab-value-card-hover {
    padding: 20px 16px !important;
    border-right: none !important;
    border-bottom: 1px solid #E8EDF2;
  }

  .ab-value-card-hover:last-child {
    border-bottom: none;
  }

  .ab-value-card-hover > div:first-child {
    width: 48px !important;
    height: 48px !important;
    margin-bottom: 10px !important;
    font-size: 1.1rem !important;
  }

  .ab-value-card-hover h5 {
    font-size: 0.86rem !important;
    margin-bottom: 5px !important;
  }

  .ab-value-card-hover p {
    font-size: 0.73rem !important;
    line-height: 1.5 !important;
  }

  /* CTA */
  .ab-cta-section {
    padding-bottom: 36px !important;
  }

  .ab-cta-panel {
    padding: 18px !important;
    border-radius: 16px !important;
  }

  .ab-cta-row {
    --bs-gutter-y: 14px;
  }

  .ab-cta-copy {
    gap: 12px !important;
    align-items: flex-start !important;
  }

  .ab-cta-copy > div:first-child {
    width: 46px !important;
    height: 46px !important;
    min-width: 46px;
    border-radius: 12px !important;
    font-size: 1.2rem !important;
  }

  .ab-cta-copy h3 {
    font-size: 1rem !important;
    line-height: 1.35 !important;
  }

  .ab-cta-copy p {
    font-size: 0.73rem !important;
    line-height: 1.5 !important;
  }

  .ab-cta-btn {
    width: auto;
    justify-content: center;
    padding: 9px 15px !important;
    font-size: 0.74rem !important;
  }
}

@media (max-width: 389.98px) {
  .ab-page .container {
    padding-left: 13px;
    padding-right: 13px;
  }

  .ab-hero-content {
    padding: 28px 14px 32px !important;
  }

  .ab-hero-inner h1 {
    font-size: 27px !important;
  }

  .ab-hero-actions {
    gap: 6px !important;
  }

  .ab-hero-actions .ab-btn-primary,
  .ab-hero-actions .ab-btn-outline {
    padding-left: 5px !important;
    padding-right: 5px !important;
    font-size: 0.62rem !important;
  }

  .ab-doctor-image-col .ab-doctor-img-hover {
    max-width: 300px !important;
    height: 295px !important;
  }

  .ab-principle-card {
    padding: 14px !important;
  }

  .ab-cta-btn {
    width: 100%;
  }
}
`;

function InjectGlobalCSS() {
  useEffect(() => {
    const id = "ab-global-css";
    if (!document.getElementById(id)) {
      const style = document.createElement("style");
      style.id = id;
      style.textContent = GLOBAL_CSS;
      document.head.appendChild(style);
    }
  }, []);
  return null;
}

// ── Scroll Reveal ──
function useReveal() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("ab-visible");
        }),
      { threshold: 0.1 },
    );
    document.querySelectorAll(".ab-reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ── Data ──
// const stats = [
//   { number: "10+",   label: "Years Experience", icon: <FaCalendarAlt /> },
//   { number: "5000+", label: "Patients Treated",  icon: <FaUsers /> },
//   { number: "98%",   label: "Success Rate",      icon: <FaCheckCircle /> },
//   { number: "2",     label: "Expert Doctors",    icon: <FaUserMd /> },
// ];

const values = [
  {
    icon: <FaLeaf />,
    title: "Holistic Approach",
    desc: "We treat the root cause, not just the symptoms.",
  },
  {
    icon: <FaRegUser />,
    title: "Personalized Care",
    desc: "Every treatment is tailored to you and your needs.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Safe & Natural",
    desc: "Gentle, effective and side effect-free treatments.",
  },
  {
    icon: <FaHeart />,
    title: "Compassion & Trust",
    desc: "We listen, we care, and we heal together.",
  },
];

// ════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ════════════════════════════════════════════════════════════════
const About = () => {
  const navigate = useNavigate();
  useReveal();

  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <div
      className="ab-page"
      style={{
        fontFamily: font,
        color: C.text,
        background: C.white,
        overflowX: "hidden",
      }}
    >
      <InjectGlobalCSS />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 1 — BANNER HERO  (Service-page style)
          Text left · Full-bleed image right · Gradient BG
      ═══════════════════════════════════════════════════════════ */}
      <section
        className="ab-hero"
        style={{
          background: `linear-gradient(135deg, #f8faf8 0%, #f2f8f3 25%, #e9f5ec 65%, #dff1e5 100%)`,
          position: "relative",
          overflow: "hidden",
          minHeight: 480,
          paddingBottom: 0,
        }}
      >
        {/* Decorative leaf — bottom-left */}
        <FaLeaf
          style={{
            position: "absolute",
            bottom: 20,
            left: 30,
            fontSize: 70,
            opacity: 0.13,
            color: C.green,
            transform: "rotate(-25deg)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        <div className="container-fluid px-0" style={{ maxWidth: "100%" }}>
          <div className="row g-0 ab-hero-row" style={{ minHeight: 480 }}>
            {/* LEFT — Text */}
            <div
              className="col-lg-6 col-md-12 d-flex align-items-center ab-reveal ab-hero-content"
              style={{
                padding: "80px 48px 60px 10%",
                position: "relative",
                zIndex: 2,
              }}
            >
              <div className="ab-hero-inner">
                <span
                  style={{
                    display: "inline-block",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: C.green,
                    marginBottom: 14,
                  }}
                >
                  About 4Health
                </span>

                <h1
                  style={{
                    fontSize: "clamp(32px, 4vw, 50px)",
                    fontWeight: 800,
                    color: C.blueDark,
                    lineHeight: 1.15,
                    margin: "0 0 18px",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Rooted in Care
                  <br />
                  Driven by <span style={{ color: C.green }}>Purpose</span>
                </h1>

                <p
                  style={{
                    fontSize: "1rem",
                    lineHeight: 1.75,
                    color: C.muted,
                    maxWidth: 460,
                    margin: "0 0 20px",
                  }}
                >
                  At 4Health Homeopathy, we believe true healing happens when we
                  treat the whole person — body, mind, and lifestyle. Our
                  approach is personalized, holistic, and focused on restoring
                  balance and long-term wellness.
                </p>

                {/* Tagline */}
                <div
                  className="ab-hero-tagline"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    color: C.text,
                    marginBottom: 28,
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: 36,
                      height: 2.5,
                      background: C.gold,
                      flexShrink: 0,
                    }}
                  />
                  <span>
                    Compassionate Care. Natural Healing. Lasting Results.
                  </span>
                </div>

                {/* Action buttons */}
                <div
                  className="ab-hero-actions"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    className="ab-btn-primary"
                    onClick={() => setPopupOpen(true)}
                  >
                    Book Consultation <FiArrowRight size={14} />
                  </button>
                  <button
                    className="ab-btn-outline"
                    onClick={() => navigate("/treatments")}
                  >
                    Our Treatments
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT — Full-bleed banner image with fade overlays */}
            <div
              className="col-lg-6 col-md-12 d-none d-lg-block ab-reveal"
              style={{
                position: "relative",
                minHeight: 480,
                overflow: "hidden",
              }}
            >
              <img
                src={aboutHero}
                alt="4Health Homeopathy — Natural Care"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                }}
              />

              {/* Left fade */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 1,
                  pointerEvents: "none",
                  background: `linear-gradient(
                  to right,
                  #e9f5ec 0%,
                  rgba(233,245,236,.98) 12%,
                  rgba(233,245,236,.85) 28%,
                  rgba(233,245,236,.45) 48%,
                  transparent 60%
                )`,
                }}
              />

              {/* Top fade */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 2,
                  pointerEvents: "none",
                  background: `linear-gradient(
                  to bottom,
                  rgba(248,250,248,0.95) 0%,
                  rgba(242,248,243,0.75) 15%,
                  rgba(233,245,236,0.35) 35%,
                  transparent 60%
                )`,
                }}
              />

              {/* Floating badge */}
              <div
                style={{
                  position: "absolute",
                  bottom: 40,
                  left: 40,
                  zIndex: 3,
                  background: C.white,
                  borderRadius: 14,
                  padding: "12px 18px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  boxShadow: "0 8px 30px rgba(15,61,110,0.14)",
                  animation: "ab-badge-float 4s ease-in-out infinite alternate",
                }}
              >
                <style>{`@keyframes ab-badge-float { 0% { transform: translateY(0); } 100% { transform: translateY(-8px); } }`}</style>
                <FaAward style={{ fontSize: "1.7rem", color: C.green }} />
                <div>
                  <div
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: 800,
                      color: C.blueDark,
                      lineHeight: 1,
                    }}
                  >
                    10+
                  </div>
                  <div
                    style={{
                      fontSize: "0.72rem",
                      color: C.muted,
                      fontWeight: 500,
                    }}
                  >
                    Years of Healing
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats strip – redesigned with icons & hover, no wave */}
        {/* <div className="container">
          <div
            className="row ab-reveal"
            style={{
              background: C.white,
              borderRadius: 24,
              boxShadow: "0 12px 40px rgba(15,61,110,0.1)",
              padding: "28px 0",
              marginTop: 20,
              border: `1px solid ${C.border}`,
              position: "relative",
              zIndex: 2,
            }}
          >
            {stats.map((s, i) => (
              <div
                key={i}
                className="col-6 col-md-3 ab-stat-item"
                style={{
                  textAlign: "center",
                  padding: "10px 12px",
                  borderRight: i < stats.length - 1 ? `1px solid ${C.border}` : "none",
                }}
              >
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: C.greenLight,
                  color: C.green,
                  fontSize: "1.3rem",
                  marginBottom: 12,
                }}>
                  {s.icon}
                </div>
                <div style={{
                  fontSize: "2rem",
                  fontWeight: 800,
                  color: C.blueDark,
                  lineHeight: 1,
                  marginBottom: 4,
                }}>
                  {s.number}
                </div>
                <div style={{
                  fontSize: "0.78rem",
                  color: C.muted,
                  fontWeight: 500,
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div> */}
        {/* Wave removed – now flat transition to next section */}
      </section>

      

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3 — DR. JYOTHI
      ═══════════════════════════════════════════════════════════ */}
      <section className="ab-doctor-section ab-doctor-section-jyothi"
        style={{
          position: "relative",
          padding: "80px 0",
          background: "#EEF5F8",
          overflow: "hidden",
        }}
      >
        <img
          src={leafPng}
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 30,
            right: -10,
            width: 160,
            opacity: 0.4,
            transform: "rotate(5deg)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <div className="container">
          <div
            className="row align-items-center g-5 ab-doctor-row"
            style={{ position: "relative", zIndex: 1 }}
          >
            {/* Image */}
            <div className="col-lg-6 col-md-12 ab-reveal d-flex justify-content-center ab-doctor-image-col">
              <img
                src={Jyothi}
                alt="Dr. Jyothi — BHMS, MSc Yoga"
                className="ab-doctor-img-hover"
                style={{
                  width: "100%",
                  maxWidth: 420,
                  height: 440,
                  borderRadius: 20,
                  objectFit: "cover",
                  objectPosition: "top",
                  boxShadow: "0 8px 40px rgba(15,61,110,0.10)",
                  display: "block",
                }}
              />
            </div>

            {/* Content */}
            <div
              className="col-lg-6 col-md-12 ab-reveal ab-doctor-content"
              style={{ display: "flex", flexDirection: "column", gap: 10 }}
            >
              <h3
                style={{
                  fontSize: "2rem",
                  fontWeight: 800,
                  color: C.blueDark,
                  margin: 0,
                  lineHeight: 1.1,
                  letterSpacing: "-0.01em",
                }}
              >
                Dr. Jyothi
              </h3>
              <p
                style={{
                  fontWeight: 600,
                  fontSize: "1rem",
                  color: C.green,
                  margin: 0,
                }}
              >
                BHMS, MSc Yoga
              </p>
              <span
                style={{
                  display: "block",
                  width: 44,
                  height: 3,
                  background: C.gold,
                  borderRadius: 2,
                  margin: "2px 0 6px",
                }}
              />
              <p
                style={{
                  fontSize: "0.92rem",
                  lineHeight: 1.75,
                  color: C.muted,
                  margin: 0,
                }}
              >
                Dr. Jyothi is a dedicated homeopathic physician with a strong
                foundation in holistic healing. Her unique combination of
                Homeopathy and Yoga allows her to address the root cause of
                health concerns while empowering patients to adopt healthier
                lifestyles.
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "4px 0 0",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {[
                  {
                    icon: <FaRegUser size={10} />,
                    text: "Expertise in women's health, hormonal balance, lifestyle disorders, thyroid, PCOS, and stress-related conditions.",
                  },
                  {
                    icon: <FaLeaf size={10} />,
                    text: "Passionate about preventive care and natural healing.",
                  },
                  {
                    icon: <FaRegUser size={10} />,
                    text: "Believes in treating with empathy, patience, and trust.",
                  },
                ].map((pt, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                      fontSize: "0.88rem",
                      color: C.text,
                      lineHeight: 1.55,
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 24,
                        height: 24,
                        minWidth: 24,
                        background: C.greenLight,
                        color: C.green,
                        borderRadius: "50%",
                        fontSize: 10,
                        flexShrink: 0,
                        marginTop: 1,
                      }}
                    >
                      {pt.icon}
                    </span>
                    {pt.text}
                  </li>
                ))}
              </ul>
              <div
                className="ab-doctor-quote"
                style={{
                  position: "relative",
                  fontSize: "0.92rem",
                  fontStyle: "italic",
                  fontWeight: 500,
                  color: C.blueDark,
                  padding: "14px 18px 14px 42px",
                  background: "#f4f8fb",
                  borderRadius: 12,
                  borderLeft: `3px solid ${C.green}`,
                  marginTop: 4,
                  lineHeight: 1.65,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: 14,
                    top: 8,
                    fontSize: "2rem",
                    lineHeight: 1,
                    color: C.green,
                    fontStyle: "normal",
                    opacity: 0.55,
                    fontFamily: "Georgia, serif",
                  }}
                >
                  "
                </span>
                My goal is to help you heal naturally and live a balanced,
                vibrant life.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4 — DR. KARTHIK
      ═══════════════════════════════════════════════════════════ */}
      <section className="ab-doctor-section ab-doctor-section-karthik"
        style={{
          position: "relative",
          padding: "80px 0",
          background: C.white,
          overflow: "hidden",
        }}
      >
        <img
          src={leafPng}
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 20,
            right: -10,
            width: 170,
            opacity: 0.4,
            transform: "rotate(-15deg)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <div className="container">
          <div
            className="row align-items-center g-5 ab-doctor-row"
            style={{ position: "relative", zIndex: 1 }}
          >
            {/* Content */}
            <div
              className="col-lg-6 col-md-12 ab-reveal order-md-1 order-2 ab-doctor-content"
              style={{ display: "flex", flexDirection: "column", gap: 10 }}
            >
              <h3
                style={{
                  fontSize: "2rem",
                  fontWeight: 800,
                  color: C.blueDark,
                  margin: 0,
                  lineHeight: 1.1,
                  letterSpacing: "-0.01em",
                }}
              >
                Dr. Karthik
              </h3>
              <p
                style={{
                  fontWeight: 600,
                  fontSize: "1rem",
                  color: C.green,
                  margin: 0,
                }}
              >
                BHMS, MSc Psychology
              </p>
              <span
                style={{
                  display: "block",
                  width: 44,
                  height: 3,
                  background: C.gold,
                  borderRadius: 2,
                  margin: "2px 0 6px",
                }}
              />
              <p
                style={{
                  fontSize: "0.92rem",
                  lineHeight: 1.75,
                  color: C.muted,
                  margin: 0,
                }}
              >
                Dr. Karthik specializes in understanding the connection between
                mind and body. With a background in Psychology, he brings deep
                insight into emotional wellness and chronic conditions.
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "4px 0 0",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {[
                  {
                    icon: <FaRegUser size={10} />,
                    text: "Expertise in mental health, stress, anxiety, depression, sleep disorders, child behavioral issues, and chronic illnesses.",
                  },
                  {
                    icon: <FaRegHandshake size={10} />,
                    text: "Focuses on individualized treatment and long-term transformation.",
                  },
                  {
                    icon: <FaRegUser size={10} />,
                    text: "Committed to helping patients achieve clarity, calm, and confidence.",
                  },
                ].map((pt, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                      fontSize: "0.88rem",
                      color: C.text,
                      lineHeight: 1.55,
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 24,
                        height: 24,
                        minWidth: 24,
                        background: C.greenLight,
                        color: C.green,
                        borderRadius: "50%",
                        fontSize: 10,
                        flexShrink: 0,
                        marginTop: 1,
                      }}
                    >
                      {pt.icon}
                    </span>
                    {pt.text}
                  </li>
                ))}
              </ul>
              <div
                className="ab-doctor-quote"
                style={{
                  position: "relative",
                  fontSize: "0.92rem",
                  fontStyle: "italic",
                  fontWeight: 500,
                  color: C.blueDark,
                  padding: "14px 18px 14px 42px",
                  background: "#f4f8fb",
                  borderRadius: 12,
                  borderLeft: `3px solid ${C.green}`,
                  marginTop: 4,
                  lineHeight: 1.65,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: 14,
                    top: 8,
                    fontSize: "2rem",
                    lineHeight: 1,
                    color: C.green,
                    fontStyle: "normal",
                    opacity: 0.55,
                    fontFamily: "Georgia, serif",
                  }}
                >
                  "
                </span>
                Healing the mind helps heal the body. Together, we create
                meaningful and lasting change.
              </div>
            </div>

            {/* Image */}
            <div className="col-lg-6 col-md-12 ab-reveal order-md-2 order-1 d-flex justify-content-center ab-doctor-image-col">
              <img
                src={Karthik}
                alt="Dr. Karthik — BHMS, MSc Psychology"
                className="ab-doctor-img-hover"
                style={{
                  width: "100%",
                  maxWidth: 420,
                  height: 440,
                  borderRadius: 20,
                  objectFit: "cover",
                  objectPosition: "top",
                  boxShadow: "0 8px 40px rgba(15,61,110,0.10)",
                  display: "block",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4B — HOMEOPATHY PHILOSOPHY (Dr. Karthik's Approach)
      ═══════════════════════════════════════════════════════════ */}
      <section className="ab-philosophy-section"
        style={{
          position: "relative",
          padding: "80px 0",
          background: C.lightBg,
          overflow: "hidden",
        }}
      >
        <img
          src={leafPng}
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 10,
            left: -20,
            width: 150,
            opacity: 0.35,
            transform: "rotate(20deg)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          {/* Heading */}
          <div
            className="ab-reveal text-center ab-philosophy-heading"
            style={{ maxWidth: 680, margin: "0 auto 48px" }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "6px 16px",
                borderRadius: 20,
                background: C.greenLight,
                color: C.greenDark,
                fontSize: "0.78rem",
                fontWeight: 700,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                marginBottom: 14,
              }}
            >
              Dr. Karthik's Approach
            </span>
            <h2
              style={{
                fontSize: "2.1rem",
                fontWeight: 800,
                color: C.blueDark,
                margin: "0 0 14px",
                lineHeight: 1.2,
              }}
            >
              The Homeopathy Philosophy
            </h2>
            <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: C.muted, margin: 0 }}>
              Homeopathy is a natural system of medicine that stimulates the
              body's own healing ability. Guided by these core principles,
              Dr. Karthik crafts individualized, side-effect-free treatment
              plans for every patient who walks through our doors.
            </p>
          </div>

          {/* 4 Principle Cards */}
          <div className="row g-4 mb-5 ab-principles-grid">
            {[
              {
                icon: <FaLeaf size={22} />,
                title: "Like Cures Like",
                desc: "A substance that causes symptoms in a healthy person can cure similar symptoms in a sick person, given in minute doses.",
              },
              {
                icon: <FaRegHandshake size={22} />,
                title: "Individualized Treatment",
                desc: "Every patient is unique — physical symptoms, emotional state, lifestyle, and history all shape the perfect remedy.",
              },
              {
                icon: <FaShieldAlt size={22} />,
                title: "Minimum Dose",
                desc: "Only the smallest necessary amount of medicine is used, stimulating natural healing without side effects.",
              },
              {
                icon: <FaHeart size={22} />,
                title: "Holistic Healing",
                desc: "We treat the whole person — mind, body, and spirit — restoring overall balance, not just suppressing disease.",
              },
            ].map((p, i) => (
              <div className="col-md-6 col-lg-3 ab-reveal" key={i}>
                <div
                  className="ab-doctor-img-hover ab-principle-card"
                  style={{
                    height: "100%",
                    background: C.white,
                    border: `1px solid ${C.border}`,
                    borderRadius: 16,
                    padding: "28px 22px",
                    boxShadow: "0 4px 18px rgba(15,61,110,0.06)",
                  }}
                >
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: "50%",
                      background: C.greenLight,
                      color: C.green,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 16,
                    }}
                  >
                    {p.icon}
                  </div>
                  <h5 style={{ fontSize: "1.02rem", fontWeight: 700, color: C.blueDark, margin: "0 0 8px" }}>
                    {p.title}
                  </h5>
                  <p style={{ fontSize: "0.85rem", lineHeight: 1.7, color: C.muted, margin: 0 }}>
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="row g-5 align-items-start ab-philosophy-bottom">
            {/* Benefits list */}
            <div className="col-lg-6 ab-reveal">
              <h4 style={{ fontSize: "1.25rem", fontWeight: 800, color: C.blueDark, marginBottom: 18 }}>
                Why Choose Homeopathy?
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { t: "100% Natural & Safe", d: "Suitable for all ages, including infants, pregnant women, and the elderly." },
                  { t: "No Side Effects", d: "Gentle remedies free from adverse reactions, unlike conventional medicines." },
                  { t: "Treats Root Cause", d: "We identify and treat the underlying cause for permanent relief." },
                  { t: "Long-lasting Results", d: "Strengthens your body's own healing mechanism for sustainable outcomes." },
                ].map((b, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <span
                      style={{
                        width: 26,
                        height: 26,
                        minWidth: 26,
                        borderRadius: "50%",
                        background: C.greenLight,
                        color: C.green,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 2,
                      }}
                    >
                      <FaCheckCircle size={12} />
                    </span>
                    <div>
                      <p style={{ margin: 0, fontSize: "0.92rem", fontWeight: 700, color: C.text }}>{b.t}</p>
                      <p style={{ margin: "2px 0 0", fontSize: "0.84rem", color: C.muted, lineHeight: 1.6 }}>{b.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Conditions treated */}
            <div className="col-lg-6 ab-reveal">
              <h4 style={{ fontSize: "1.25rem", fontWeight: 800, color: C.blueDark, marginBottom: 18 }}>
                Conditions Dr. Karthik Treats
              </h4>
              <div className="ab-condition-chips" style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 24 }}>
                {[
                  "Respiratory Allergies & Asthma",
                  "Skin Disorders (Eczema, Psoriasis)",
                  "Joint Pain & Arthritis",
                  "Digestive Problems (IBS, Acidity)",
                  "Women's Health (PCOS, Menopause)",
                  "Children's Health & Immunity",
                  "Mental Health (Anxiety, Depression)",
                  "Hormonal Imbalances & Thyroid",
                  "Hair Fall & Scalp Conditions",
                  "Chronic Fatigue & Low Immunity",
                ].map((c, i) => (
                  <span
                    key={i}
                    style={{
                      padding: "9px 16px",
                      borderRadius: 20,
                      background: C.white,
                      border: `1px solid ${C.border}`,
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      color: C.blueDark,
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>
              <button onClick={() => setPopupOpen(true)} className="ab-btn-primary">
                <BsCalendarCheck size={15} /> Book a Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 5 — VALUES (4 cards)
      ═══════════════════════════════════════════════════════════ */}
      <section className="ab-values-section" style={{ padding: "70px 0 80px", background: C.white }}>
        <div className="container">
          <div
            className="row ab-values-grid"
            style={{
              border: `1px solid ${C.border}`,
              borderRadius: 24,
              overflow: "hidden",
              boxShadow: "0 4px 24px rgba(15,61,110,0.08)",
            }}
          >
            {values.map((v, i) => (
              <div
                key={i}
                className="col-lg-3 col-md-6 col-12 ab-reveal ab-value-card-hover"
                style={{
                  textAlign: "center",
                  padding: "44px 20px 36px",
                  background: C.white,
                  borderRight:
                    i < values.length - 1 ? `1px solid ${C.border}` : "none",
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 64,
                    height: 64,
                    background: C.greenLight,
                    borderRadius: "50%",
                    marginBottom: 16,
                    fontSize: "1.5rem",
                    color: C.green,
                  }}
                >
                  {v.icon}
                </div>
                <h5
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    color: C.text,
                    margin: "0 0 8px",
                  }}
                >
                  {v.title}
                </h5>
                <p
                  style={{
                    fontSize: "0.82rem",
                    color: C.muted,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 6 — CTA BANNER
      ═══════════════════════════════════════════════════════════ */}
      <div className="ab-cta-section" style={{ padding: "0 0 70px", background: C.white }}>
        <div className="container">
          <div
            className="ab-cta-panel"
            style={{
              background: `linear-gradient(135deg,${C.blueDark} 0%,${C.blue} 55%,${C.green} 100%)`,
              borderRadius: 28,
              padding: "44px 52px",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 12px 48px rgba(15,61,110,0.18)",
            }}
          >
            {/* Leaf decorations */}
            <img
              src={leafPng}
              alt=""
              aria-hidden="true"
              style={{
                position: "absolute",
                top: -20,
                right: -20,
                width: 280,
                opacity: 0.13,
                transform: "rotate(25deg)",
                pointerEvents: "none",
                zIndex: 0,
              }}
            />
            <img
              src={leafPng}
              alt=""
              aria-hidden="true"
              style={{
                position: "absolute",
                bottom: -30,
                left: -30,
                width: 100,
                opacity: 0.09,
                transform: "rotate(-20deg)",
                pointerEvents: "none",
                zIndex: 0,
              }}
            />

            <div
              className="row align-items-center ab-cta-row"
              style={{ position: "relative", zIndex: 1 }}
            >
              <div
                className="col-md-8 col-12 ab-cta-copy"
                style={{ display: "flex", alignItems: "center", gap: 22 }}
              >
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 16,
                    background: "rgba(255,255,255,0.18)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.6rem",
                    color: "#fff",
                    flexShrink: 0,
                  }}
                >
                  <BsCalendarCheck />
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 700,
                      color: "#fff",
                      margin: "0 0 5px",
                      lineHeight: 1.3,
                    }}
                  >
                    We're Here to Support Your Healing Journey
                  </h3>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "rgba(255,255,255,0.8)",
                      margin: 0,
                      maxWidth: 380,
                      lineHeight: 1.55,
                    }}
                  >
                    Take the first step towards natural, lasting wellness with
                    personalized homeopathic care.
                  </p>
                </div>
              </div>
              <div className="col-md-4 col-12 text-md-end text-center mt-3 mt-md-0">
                <button
                  className="ab-cta-btn"
                  onClick={() => setPopupOpen(true)}
                >
                  Book an Appointment <FiArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <AppointmentPopup
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
      />
    </div>
  );
};

export default About;