// Homeopathy.jsx — 4Health Homeopathy
// Full page explaining homeopathy with same design tokens as Service/Contact pages
// Banner section, content sections, feature strips all brand-matched

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer/Footer";
import {
  CheckCircle2,
  ArrowRight,
  Heart,
  Calendar,
  ShieldCheck,
  Users,
  Star,
  Quote,
  Leaf,
  FlaskConical,
  Brain,
  Stethoscope,
  Clock,
  ChevronRight,
  Minus,
  Plus,
  MessageCircle,
} from "lucide-react";
import { FaWhatsapp, FaLeaf as FaLeafIcon } from "react-icons/fa";

// ── Banner image ──
import homeopathyBanner from "../../assets/Image/Service/service-banner.png";

// ── Background decoration images ──
import bgImg1 from "../../assets/Image/bg-img1.png";
import bgImg2 from "../../assets/Image/bg-img2.png";
import AppointmentPopup from "./Appoinmnet/Appoinmnetpop";

// ── Brand tokens ──
const C = {
  blueDark: "#0f3d6e",
  blue: "#0f6baf",
  green: "#4ba86a",
  greenDark: "#3a8a56",
  lightGreen: "#e8f5ed",
  lightBlue: "#eaf4fb",
  muted: "#5f6b7a",
  border: "#e8edf2",
  bgSoft: "#f8fafc",
  white: "#ffffff",
  detailBg: "#F4F9F6",
};

// ── Data ──
const principles = [
  {
    icon: <FlaskConical size={28} />,
    title: "Like Cures Like",
    desc: "A substance that causes symptoms in a healthy person can cure similar symptoms in a sick person when given in minute doses.",
    bg: C.lightGreen,
  },
  {
    icon: <Brain size={28} />,
    title: "Individualized Treatment",
    desc: "Every patient is unique. We consider your physical symptoms, emotional state, lifestyle, and genetic history to prescribe the perfect remedy.",
    bg: C.lightBlue,
  },
  {
    icon: <ShieldCheck size={28} />,
    title: "Minimum Dose",
    desc: "Only the smallest amount of medicine necessary is used. Our highly diluted remedies stimulate the body's natural healing without side effects.",
    bg: C.lightGreen,
  },
  {
    icon: <Heart size={28} />,
    title: "Holistic Healing",
    desc: "We treat the whole person — mind, body, and spirit — not just the disease. True healing comes from restoring overall balance.",
    bg: C.lightBlue,
  },
];

const benefits = [
  {
    title: "100% Natural & Safe",
    desc: "No harmful chemicals or toxins. Suitable for all ages including infants, pregnant women, and elderly.",
  },
  {
    title: "No Side Effects",
    desc: "Unlike conventional medicines, homeopathic remedies are gentle and free from adverse reactions.",
  },
  {
    title: "Treats Root Cause",
    desc: "We don't just suppress symptoms. We identify and treat the underlying cause for permanent relief.",
  },
  {
    title: "Long-lasting Results",
    desc: "By strengthening your body's own healing mechanism, results are deep, lasting, and sustainable.",
  },
  {
    title: "Prevents Recurrence",
    desc: "Homeopathy boosts immunity and reduces the chances of the disease coming back.",
  },
  {
    title: "Cost-effective Care",
    desc: "Affordable treatments that save you from expensive long-term medications and hospital visits.",
  },
];

const conditions = [
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
];

const testimonials = [
  {
    name: "Priya Sharma",
    condition: "Chronic Sinusitis",
    text: "After years of antibiotics and nasal sprays, homeopathy finally gave me lasting relief. No more blocked nose every morning!",
    rating: 5,
  },
  {
    name: "Rajesh Kumar",
    condition: "Psoriasis",
    text: "My skin cleared up within 3 months of treatment. The itching stopped completely. I wish I had tried homeopathy earlier.",
    rating: 5,
  },
  {
    name: "Anita Verma",
    condition: "Migraine",
    text: "I used to get migraines every week. Now it's been 6 months without a single episode. Truly life-changing treatment.",
    rating: 5,
  },
];

const faqs = [
  {
    q: "Is homeopathy safe for children?",
    a: "Absolutely! Homeopathic remedies are gentle, natural, and completely safe for children of all ages, from newborns to teenagers. They have no toxic side effects and can be safely administered alongside routine pediatric care.",
    category: "Safety",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=200&q=80",
  },
  {
    q: "How long does homeopathic treatment take?",
    a: "Treatment duration varies by condition. Acute issues may resolve in days to weeks, while chronic conditions may take 3-12 months. However, many patients notice significant improvement within the first few weeks of starting treatment.",
    category: "Treatment",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=200&q=80",
  },
  {
    q: "Can homeopathy be taken alongside allopathic medicines?",
    a: "Yes, homeopathic remedies can be safely taken with conventional medicines. Your homeopath will guide you on the best approach. Never stop prescribed allopathic medicines without consulting your doctor first.",
    category: "Safety",
    image:
      "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=200&q=80",
  },
  {
    q: "Are there any dietary restrictions during treatment?",
    a: "Some remedies may require avoiding strong-smelling substances like coffee, mint, or garlic 30 minutes before and after taking the medicine. Your doctor will provide specific guidance based on your prescribed remedy.",
    category: "Treatment",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=200&q=80",
  },
  {
    q: "Is homeopathy scientifically proven?",
    a: "Yes! Numerous clinical trials and meta-analyses have demonstrated homeopathy's effectiveness. The Lancet published a review of 89 trials showing positive results. Research continues to validate what millions of patients experience daily.",
    category: "Research",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=200&q=80",
  },
  {
    q: "Do homeopathic remedies contain steroids?",
    a: "Absolutely not. Genuine homeopathic remedies are prepared from natural substances through a process of serial dilution and succussion. They contain no steroids, chemicals, or harmful additives. 4Health Homeopathy only uses authentic, lab-tested remedies.",
    category: "Safety",
    image:
      "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=200&q=80",
  },
];

// ── Scroll Reveal Hook ──
function useReveal() {

  useEffect(()=>{
    window.scroll(0,0)
  },[]);



  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("hp-visible");
        });
      },
      { threshold: 0.1 },
    );
    document
      .querySelectorAll(".hp-reveal")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ── Component ──
function Homeopathy() {
  const navigate = useNavigate();
  useReveal();
  const [activeFaq, setActiveFaq] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const iconCircle = (bg) => ({
    width: "52px",
    height: "52px",
    borderRadius: "50%",
    background: bg,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  });

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        color: "#233143",
        overflowX: "hidden",
      }}
    >
      {/* ════════════════════════════════════════
          SECTION 1 — HERO BANNER
      ════════════════════════════════════════ */}
      <section
        style={{
          background:
            "linear-gradient(135deg, #f8faf8 0%, #f2f8f3 25%, #e9f5ec 65%, #dff1e5 100%)",
          position: "relative",
          overflow: "hidden",
          minHeight: 480,
        }}
      >
        {/* Background decoration image — hidden on mobile/tablet */}
        <div
          className="d-none d-lg-block"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${bgImg1})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left center",
            backgroundSize: "420px auto",
            opacity: 0.08,
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        {/* Decorative leaf — bottom left — desktop only */}
        <FaLeafIcon
          className="d-none d-lg-block"
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

        {/* SVG Shapes behind image — desktop only */}
        <div
          className="d-none d-lg-block"
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: "55%",
            height: "100%",
            zIndex: 1,
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          <svg
            viewBox="0 0 600 500"
            preserveAspectRatio="xMidYMid meet"
            style={{ width: "100%", height: "100%" }}
          >
            <path
              d="M200,20 C320,-10 480,40 540,120 C600,200 580,320 500,400 C420,480 300,500 200,480 C100,460 20,380 10,280 C0,180 80,50 200,20 Z"
              fill="#c5e6d3"
              opacity="0.35"
            />
            <path
              d="M350,80 C420,60 500,100 520,180 C540,260 490,340 420,370 C350,400 280,360 260,290 C240,220 280,100 350,80 Z"
              fill="#a8d5bc"
              opacity="0.30"
            />
            <path
              d="M130,300 C180,270 240,280 260,330 C280,380 240,430 190,440 C140,450 100,410 90,360 C80,310 100,320 130,300 Z"
              fill="#4ba86a"
              opacity="0.12"
            />
            <path
              d="M480,60 C520,40 560,80 570,130 C580,180 560,230 520,250 C480,270 450,240 440,200 C430,160 440,80 480,20 Z"
              fill="#7fc9a0"
              opacity="0.20"
            />
            <circle cx="510" cy="340" r="60" fill="#4ba86a" opacity="0.08" />
            <path
              d="M80,440 C130,410 180,430 200,470 C220,510 180,550 130,550 C80,550 50,510 50,470 C50,430 50,460 80,440 Z"
              fill="#a8d5bc"
              opacity="0.15"
            />
          </svg>
        </div>

        <div className="container-fluid px-0" style={{ maxWidth: "100%", position: "relative", zIndex: 2 }}>
          <div className="row g-0" style={{ minHeight: 480 }}>
            {/* ── LEFT — Text ── */}
            <div
              className="col-lg-6 col-md-12 d-flex align-items-center hp-reveal"
              style={{
                padding: "80px 48px 60px 10%",
                position: "relative",
                zIndex: 2,
              }}
            >
              <div>
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
                  About Homeopathy
                </span>
                <h1
                  style={{
                    fontSize: "clamp(34px, 4.5vw, 58px)",
                    fontWeight: 800,
                    color: C.blueDark,
                    lineHeight: 1.1,
                    margin: "0 0 18px",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Nature's Science
                  <br />
                  of Gentle Healing{" "}
                  <Heart
                    size={32}
                    style={{
                      color: C.green,
                      fill: C.green,
                      display: "inline-block",
                    }}
                  />
                </h1>
                <p
                  style={{
                    fontSize: "0.97rem",
                    lineHeight: 1.75,
                    color: C.muted,
                    maxWidth: 420,
                    margin: "0 0 28px",
                  }}
                >
                  Homeopathy is a 200+ year old system of natural medicine that
                  stimulates your body's own healing power. Safe, gentle, and
                  effective — without side effects.
                </p>

                {/* Action buttons */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                  <button
                    onClick={() =>
                      window.open("https://wa.me/919876543210", "_blank")
                    }
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      background: C.white,
                      color: C.blueDark,
                      border: `1.5px solid ${C.border}`,
                      borderRadius: 10,
                      padding: "11px 20px",
                      fontSize: "0.88rem",
                      fontWeight: 600,
                      fontFamily: "'Poppins', sans-serif",
                      cursor: "pointer",
                      boxShadow: "0 2px 12px rgba(15,61,110,0.08)",
                      transition: "box-shadow 0.2s",
                    }}
                  >
                    <FaWhatsapp size={18} style={{ color: C.green }} /> Chat on
                    WhatsApp
                  </button>
                  <button
                    onClick={() => setPopupOpen(true)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      background: "transparent",
                      color: C.blueDark,
                      border: `1.5px solid ${C.border}`,
                      borderRadius: 10,
                      padding: "11px 20px",
                      fontSize: "0.88rem",
                      fontWeight: 600,
                      fontFamily: "'Poppins', sans-serif",
                      cursor: "pointer",
                    }}
                  >
                    <Calendar size={16} style={{ color: C.green }} /> Book
                    Consultation
                  </button>
                </div>
              </div>
            </div>

            {/* ── RIGHT — Banner image ── */}
            <div
              className="col-lg-6 col-md-12 d-none d-lg-block hp-reveal"
              style={{
                position: "relative",
                minHeight: 480,
                overflow: "hidden",
                zIndex: 2,
              }}
            >
              <img
                src={homeopathyBanner}
                alt="Homeopathy natural healing"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center center",
                  display: "block",
                }}
              />

              {/* Left fade */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 3,
                  pointerEvents: "none",
                  background: `linear-gradient(
                    to right,
                    #e9f5ec 0%,
                    rgba(233,245,236,.98) 12%,
                    rgba(233,245,236,.85) 28%,
                    rgba(233,245,236,.45) 48%,
                    transparent 75%
                  )`,
                }}
              />

              {/* Top fade */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 4,
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

              {/* Overlay card */}
              <div
                className="position-absolute bg-white rounded-3 shadow-lg px-4 py-3 d-none d-sm-block"
                style={{
                  bottom: "12%",
                  right: "8%",
                  transform: "rotate(-2deg)",
                  maxWidth: "190px",
                  zIndex: 5,
                }}
              >
                <p
                  className="mb-0 fw-semibold"
                  style={{
                    color: C.blueDark,
                    fontStyle: "italic",
                    fontSize: "0.95rem",
                    lineHeight: 1.4,
                  }}
                >
                  Healing
                  <br />
                  from Within <Leaf size={14} style={{ color: C.green }} />
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SECTION 2 — WHAT IS HOMEOPATHY
      ════════════════════════════════════════ */}
      <section style={{ background: "#fff", padding: "70px 0 60px" }}>
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6 hp-reveal">
              <span
                style={{
                  display: "inline-block",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: C.green,
                  background: C.lightGreen,
                  padding: "5px 14px",
                  borderRadius: 20,
                  marginBottom: 16,
                }}
              >
                Understanding Homeopathy
              </span>
              <h2
                style={{
                  fontSize: "clamp(26px, 3vw, 38px)",
                  fontWeight: 800,
                  color: C.blueDark,
                  lineHeight: 1.25,
                  margin: "0 0 18px",
                }}
              >
                What is Homeopathy?
              </h2>
              <p
                style={{
                  fontSize: "0.95rem",
                  lineHeight: 1.8,
                  color: C.muted,
                  margin: "0 0 16px",
                }}
              >
                Homeopathy is a holistic system of medicine developed over 200
                years ago by German physician Dr. Samuel Hahnemann. It is based
                on the principle of{" "}
                <strong>"Similia Similibus Curentur"</strong> — "like cures
                like."
              </p>
              <p
                style={{
                  fontSize: "0.95rem",
                  lineHeight: 1.8,
                  color: C.muted,
                  margin: "0 0 16px",
                }}
              >
                Instead of suppressing symptoms, homeopathy treats the root
                cause by stimulating your body's innate healing mechanism.
                Remedies are prepared from natural substances — plants,
                minerals, and animal sources — and are given in extremely small,
                potentized doses that are completely safe and free from toxic
                side effects.
              </p>
              <p
                style={{
                  fontSize: "0.95rem",
                  lineHeight: 1.8,
                  color: C.muted,
                  margin: 0,
                }}
              >
                Today, homeopathy is the second most widely used system of
                medicine in the world, trusted by over 500 million people across
                80+ countries for its gentle yet effective healing approach.
              </p>
            </div>
            <div className="col-lg-6 hp-reveal">
              <div
                style={{
                  background: C.detailBg,
                  borderRadius: 20,
                  padding: "32px 28px",
                  border: `1px solid ${C.border}`,
                }}
              >
                <h4
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: C.muted,
                    margin: "0 0 20px",
                  }}
                >
                  Conditions Homeopathy Can Help With
                </h4>
                <div className="row g-2">
                  {conditions.map((condition, i) => (
                    <div className="col-sm-6" key={i}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          padding: "8px 0",
                        }}
                      >
                        <CheckCircle2
                          size={16}
                          style={{ color: C.green, flexShrink: 0 }}
                        />
                        <span
                          style={{ fontSize: "0.85rem", color: C.blueDark }}
                        >
                          {condition}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SECTION 3 — CORE PRINCIPLES
      ════════════════════════════════════════ */}
      <section style={{ background: C.bgSoft, padding: "64px 0 56px", position: "relative", overflow: "hidden" }}>
        {/* Background decoration image — hidden on mobile/tablet */}
        <div
          className="d-none d-lg-block"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${bgImg2})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right top",
            backgroundSize: "380px auto",
            opacity: 0.09,
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="text-center hp-reveal" style={{ marginBottom: 44 }}>
            <span
              style={{
                display: "inline-block",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: C.green,
                background: C.lightGreen,
                padding: "5px 14px",
                borderRadius: 20,
                marginBottom: 12,
              }}
            >
              Our Foundation
            </span>
            <h2
              style={{
                fontSize: "clamp(24px, 2.8vw, 36px)",
                fontWeight: 800,
                color: C.blueDark,
                margin: "0 0 10px",
              }}
            >
              Core Principles of Homeopathy
            </h2>
            <p
              style={{
                fontSize: "0.92rem",
                color: C.muted,
                margin: 0,
                maxWidth: 600,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              These fundamental laws guide every treatment we provide at 4Health
              Homeopathy.
            </p>
          </div>

          <div className="row g-4">
            {principles.map((p, i) => (
              <div className="col-lg-3 col-md-6 hp-reveal" key={i}>
                <div
                  style={{
                    background: C.white,
                    borderRadius: 16,
                    padding: "28px 22px",
                    height: "100%",
                    border: `1px solid ${C.border}`,
                    boxShadow: "0 4px 20px rgba(15,61,110,0.06)",
                  }}
                >
                  <div style={iconCircle(p.bg)} className="mb-3">
                    <span style={{ color: C.blue }}>{p.icon}</span>
                  </div>
                  <h4
                    style={{
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: C.blueDark,
                      margin: "0 0 10px",
                    }}
                  >
                    {p.title}
                  </h4>
                  <p
                    style={{
                      fontSize: "0.84rem",
                      lineHeight: 1.7,
                      color: C.muted,
                      margin: 0,
                    }}
                  >
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SECTION 4 — BENEFITS GRID
      ════════════════════════════════════════ */}
      <section style={{ background: "#fff", padding: "64px 0 56px" }}>
        <div className="container">
          <div className="text-center hp-reveal" style={{ marginBottom: 44 }}>
            <span
              style={{
                display: "inline-block",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: C.green,
                background: C.lightGreen,
                padding: "5px 14px",
                borderRadius: 20,
                marginBottom: 12,
              }}
            >
              Why Choose It
            </span>
            <h2
              style={{
                fontSize: "clamp(24px, 2.8vw, 36px)",
                fontWeight: 800,
                color: C.blueDark,
                margin: "0 0 10px",
              }}
            >
              Benefits of Homeopathic Treatment
            </h2>
            <p
              style={{
                fontSize: "0.92rem",
                color: C.muted,
                margin: 0,
                maxWidth: 560,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Discover why millions worldwide choose homeopathy for their health
              and wellness.
            </p>
          </div>

          <div className="row g-4">
            {benefits.map((b, i) => (
              <div className="col-lg-4 col-md-6 hp-reveal" key={i}>
                <div
                  style={{
                    background: C.bgSoft,
                    borderRadius: 14,
                    padding: "24px 20px",
                    height: "100%",
                    border: `1px solid ${C.border}`,
                    display: "flex",
                    gap: 14,
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: C.lightGreen,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <CheckCircle2 size={18} style={{ color: C.green }} />
                  </span>
                  <div>
                    <h4
                      style={{
                        fontSize: "0.95rem",
                        fontWeight: 700,
                        color: C.blueDark,
                        margin: "0 0 6px",
                      }}
                    >
                      {b.title}
                    </h4>
                    <p
                      style={{
                        fontSize: "0.83rem",
                        lineHeight: 1.65,
                        color: C.muted,
                        margin: 0,
                      }}
                    >
                      {b.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SECTION 5 — TESTIMONIALS
      ════════════════════════════════════════ */}
      <section
        style={{
          background: `linear-gradient(135deg,${C.blueDark} 0%,${C.blue} 55%,${C.green} 100%)`,
          padding: "60px 0 56px",
        }}
      >
        <div className="container">
          <div className="text-center hp-reveal" style={{ marginBottom: 40 }}>
            <span
              style={{
                display: "inline-block",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.85)",
                background: "rgba(255,255,255,0.12)",
                padding: "5px 14px",
                borderRadius: 20,
                marginBottom: 12,
              }}
            >
              Patient Stories
            </span>
            <h2
              style={{
                fontSize: "clamp(24px, 2.8vw, 36px)",
                fontWeight: 800,
                color: "#fff",
                margin: "0 0 10px",
              }}
            >
              Real People, Real Results
            </h2>
            <p
              style={{
                fontSize: "0.92rem",
                color: "rgba(255,255,255,0.8)",
                margin: 0,
              }}
            >
              Hear from our patients who found healing through homeopathy.
            </p>
          </div>

          <div className="row g-4">
            {testimonials.map((t, i) => (
              <div className="col-lg-4 col-md-6 hp-reveal" key={i}>
                <div
                  style={{
                    background: "rgba(255,255,255,0.95)",
                    borderRadius: 16,
                    padding: "28px 24px",
                    height: "100%",
                    position: "relative",
                  }}
                >
                  <Quote
                    size={32}
                    style={{
                      color: C.green,
                      opacity: 0.3,
                      position: "absolute",
                      top: 16,
                      right: 20,
                    }}
                  />
                  <div style={{ display: "flex", gap: 2, marginBottom: 14 }}>
                    {[...Array(t.rating)].map((_, idx) => (
                      <Star
                        key={idx}
                        size={14}
                        style={{ color: "#f59e0b", fill: "#f59e0b" }}
                      />
                    ))}
                  </div>
                  <p
                    style={{
                      fontSize: "0.88rem",
                      lineHeight: 1.75,
                      color: C.muted,
                      margin: "0 0 16px",
                      fontStyle: "italic",
                    }}
                  >
                    "{t.text}"
                  </p>
                  <div
                    style={{
                      borderTop: `1px solid ${C.border}`,
                      paddingTop: 14,
                    }}
                  >
                    <p
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: 700,
                        color: C.blueDark,
                        margin: "0 0 2px",
                      }}
                    >
                      {t.name}
                    </p>
                    <p
                      style={{
                        fontSize: "0.78rem",
                        color: C.green,
                        margin: 0,
                        fontWeight: 600,
                      }}
                    >
                      {t.condition}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SECTION 6 — FAQ (REDESIGNED WITH IMAGES)
      ════════════════════════════════════════ */}
      <section style={{ background: C.bgSoft, padding: "70px 0 60px" }}>
        <div className="container">
          {/* Section Header */}
          <div className="text-center hp-reveal" style={{ marginBottom: 48 }}>
            <span
              style={{
                display: "inline-block",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: C.green,
                background: C.lightGreen,
                padding: "5px 14px",
                borderRadius: 20,
                marginBottom: 12,
              }}
            >
              Got Questions?
            </span>
            <h2
              style={{
                fontSize: "clamp(26px, 3vw, 38px)",
                fontWeight: 800,
                color: C.blueDark,
                margin: "0 0 10px",
              }}
            >
              Frequently Asked Questions
            </h2>
            <p
              style={{
                fontSize: "0.92rem",
                color: C.muted,
                margin: 0,
                maxWidth: 500,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Everything you need to know about homeopathic treatment
            </p>
          </div>

          <div className="row g-4">
            {/* Left Column - FAQ Accordion */}
            <div className="col-lg-7 hp-reveal">
              <div
                style={{
                  background: C.white,
                  borderRadius: 18,
                  border: `1px solid ${C.border}`,
                  boxShadow: "0 4px 24px rgba(15,61,110,0.06)",
                  overflow: "hidden",
                }}
              >
                {faqs.map((faq, i) => (
                  <div
                    key={i}
                    style={{
                      borderBottom:
                        i < faqs.length - 1 ? `1px solid ${C.border}` : "none",
                    }}
                  >
                    <button
                      onClick={() => toggleFaq(i)}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "20px 24px",
                        background:
                          activeFaq === i ? C.lightGreen : "transparent",
                        border: "none",
                        cursor: "pointer",
                        transition: "background 0.2s ease",
                        fontFamily: "'Poppins', sans-serif",
                        textAlign: "left",
                        gap: 16,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 14,
                          flex: 1,
                        }}
                      >
                        {/* Category badge */}
                        <span
                          style={{
                            display: "inline-block",
                            padding: "4px 10px",
                            borderRadius: 6,
                            fontSize: "0.68rem",
                            fontWeight: 700,
                            letterSpacing: "0.05em",
                            textTransform: "uppercase",
                            background:
                              faq.category === "Safety"
                                ? C.lightGreen
                                : faq.category === "Treatment"
                                  ? C.lightBlue
                                  : "#fef3c7",
                            color:
                              faq.category === "Safety"
                                ? C.greenDark
                                : faq.category === "Treatment"
                                  ? C.blue
                                  : "#92400e",
                            flexShrink: 0,
                          }}
                        >
                          {faq.category}
                        </span>
                        <span
                          style={{
                            fontSize: "0.92rem",
                            fontWeight: 600,
                            color: C.blueDark,
                            lineHeight: 1.4,
                          }}
                        >
                          {faq.q}
                        </span>
                      </div>
                      <span
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          background: activeFaq === i ? C.green : C.bgSoft,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          transition: "all 0.3s ease",
                        }}
                      >
                        {activeFaq === i ? (
                          <Minus size={14} style={{ color: "#fff" }} />
                        ) : (
                          <Plus size={14} style={{ color: C.green }} />
                        )}
                      </span>
                    </button>

                    {/* Answer panel */}
                    <div
                      style={{
                        maxHeight: activeFaq === i ? "300px" : "0",
                        overflow: "hidden",
                        transition: "max-height 0.35s ease, padding 0.35s ease",
                        padding:
                          activeFaq === i ? "0 24px 20px 24px" : "0 24px",
                      }}
                    >
                      <div
                        style={{
                          paddingLeft: 68,
                        }}
                      >
                        <p
                          style={{
                            fontSize: "0.85rem",
                            lineHeight: 1.75,
                            color: C.muted,
                            margin: "0 0 12px",
                          }}
                        >
                          {faq.a}
                        </p>
                        <button
                          onClick={() => setPopupOpen(true)}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                            background: "none",
                            border: "none",
                            color: C.green,
                            fontWeight: 600,
                            fontSize: "0.82rem",
                            cursor: "pointer",
                            fontFamily: "'Poppins', sans-serif",
                            padding: 0,
                          }}
                        >
                          Still have questions? Ask our doctor{" "}
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Image + Info Card */}
            <div className="col-lg-5 hp-reveal">
              <div style={{ position: "sticky", top: 24 }}>
                {/* Main Image Card */}
                <div
                  style={{
                    borderRadius: 18,
                    overflow: "hidden",
                    marginBottom: 16,
                    boxShadow: "0 8px 28px rgba(15,61,110,0.12)",
                    position: "relative",
                    height: 500,
                  }}
                >
                  <img
                    src={
                      activeFaq !== null
                        ? faqs[activeFaq].image
                        : "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80"
                    }
                    alt="FAQ"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      transition: "opacity 0.4s ease",
                    }}
                  />
                  {/* Overlay gradient */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "50%",
                      background:
                        "linear-gradient(to top, rgba(15,61,110,0.7), transparent)",
                    }}
                  />
                  {/* Text overlay */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 20,
                      left: 20,
                      right: 20,
                      color: "#fff",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        margin: "0 0 4px",
                        opacity: 0.8,
                      }}
                    >
                      {activeFaq !== null
                        ? faqs[activeFaq].category
                        : "Select a question"}
                    </p>
                    <p
                      style={{
                        fontSize: "0.95rem",
                        fontWeight: 700,
                        margin: 0,
                        lineHeight: 1.3,
                      }}
                    >
                      {activeFaq !== null
                        ? faqs[activeFaq].q
                        : "Click any question to learn more"}
                    </p>
                  </div>
                </div>

                {/* Support Card */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SECTION 7 — CTA STRIP
      ════════════════════════════════════════ */}
      <section
        className="py-5 position-relative"
        style={{ background: C.bgSoft }}
      >
        <FaLeafIcon
          className="position-absolute d-none d-md-block"
          style={{
            left: 30,
            top: 20,
            fontSize: 60,
            color: C.green,
            opacity: 0.15,
            transform: "rotate(-20deg)",
          }}
        />
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-4 px-4 py-4 rounded-4 bg-white shadow-sm">
            <div>
              <h4 className="fw-bold mb-1" style={{ color: C.blueDark }}>
                Ready to Experience Natural Healing?
              </h4>
              <p
                className="mb-0"
                style={{ color: C.muted, fontSize: "0.92rem" }}
              >
                Book a consultation today and discover the power of homeopathy.
              </p>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="btn fw-bold text-white d-flex align-items-center gap-2"
                style={{
                  background: C.green,
                  border: "none",
                  borderRadius: "10px",
                  padding: "13px 22px",
                }}
              >
                <FaWhatsapp size={16} /> WhatsApp
              </a>
              <button
                onClick={() => setPopupOpen(true)}
                className="btn fw-bold d-flex align-items-center gap-2"
                style={{
                  background: C.blueDark,
                  color: "#fff",
                  border: "none",
                  borderRadius: "10px",
                  padding: "13px 22px",
                }}
              >
                <Calendar size={16} /> Book Appointment
              </button>
            </div>
          </div>
        </div>
      </section>

      <AppointmentPopup isOpen={popupOpen} onClose={() => setPopupOpen(false)} />

      <Footer />

      <style>{`
        .hp-reveal { opacity: 0; transform: translateY(24px); transition: opacity .6s ease, transform .6s ease; }
        .hp-reveal.hp-visible { opacity: 1; transform: translateY(0); }
      `}</style>
    </div>
  );
}

export default Homeopathy;