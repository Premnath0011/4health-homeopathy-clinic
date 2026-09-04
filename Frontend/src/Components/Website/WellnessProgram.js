// WellnessProgram.jsx — 4Health Homeopathy
// Full page showcasing wellness programs with same design tokens
// Uses LOCAL images from assets/Image/Wellness_Program/

import React, { useEffect, useState } from "react";
import Footer from "./Footer/Footer";
import AppointmentPopup from "./Appoinmnet/Appoinmnetpop";
import {
  CheckCircle2,
  ArrowRight,
  Heart,
  Calendar,
  ShieldCheck,
  Users,
  Star,
  Quote,
  Clock,
  ChevronRight,
  Sparkles,
  Zap,
  Trophy,
  Clipboard,
  Droplets,
  Activity,
  HeartPulse,
} from "lucide-react";
import {
  FaWhatsapp,
  FaLeaf as FaLeafIcon,
} from "react-icons/fa";

// ── Local Images ──
import bannerImg from "../../assets/Image/Wellness_Program/Wellness_banner.webp";
import diabetesImg from "../../assets/Image/Wellness_Program/Diabetes.webp";
import immunityImg from "../../assets/Image/Wellness_Program/immunity.webp";
import pcosImg from "../../assets/Image/Wellness_Program/PCOS.webp";
import thyroidImg from "../../assets/Image/Wellness_Program/Thyroid.webp";
import weightlossImg from "../../assets/Image/Wellness_Program/Weightloss.webp";

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
  warmAmber: "#f59e0b",
  softRose: "#fdf2f2",
  softLavender: "#f4f0fa",
  softPeach: "#fef9f2",
};

// ── Data ──
const programs = [
  {
    id: "diabetes",
    icon: <Droplets size={24} />,
    title: "Diabetes Management Program",
    duration: "12 Weeks",
    price: "₹4,999",
    image: diabetesImg,
    desc: "Manage blood sugar levels naturally and sustainably. Our homeopathic protocol works alongside diet and lifestyle correction to control diabetes and prevent complications.",
    highlights: [
      "Stabilized blood sugar levels",
      "Reduced dependency on medication",
      "Improved energy & metabolism",
      "Diet & lifestyle guidance included",
      "Prevention of long-term complications",
    ],
    bg: C.lightGreen,
  },
  {
    id: "immunity",
    icon: <ShieldCheck size={24} />,
    title: "Immunity Booster Program",
    duration: "12 Weeks",
    price: "₹4,499",
    image: immunityImg,
    desc: "Build a strong defense system against infections and illnesses. Our immunity program strengthens your body's natural resistance using proven homeopathic protocols.",
    highlights: [
      "Reduced frequency of infections",
      "Faster recovery from illness",
      "Seasonal allergy protection",
      "Improved overall resilience",
      "Customized immune-boosting remedies",
    ],
    bg: C.lightBlue,
  },
  {
    id: "pcos",
    icon: <HeartPulse size={24} />,
    title: "PCOS Care Program",
    duration: "12 Weeks",
    price: "₹5,499",
    image: pcosImg,
    desc: "Restore hormonal balance and manage PCOS symptoms naturally. Our program addresses irregular cycles, weight gain, and skin issues through holistic homeopathic care.",
    highlights: [
      "Regularized menstrual cycle",
      "Hormonal balance restored",
      "Reduced acne & hair fall",
      "Healthy weight support",
      "Improved fertility outcomes",
    ],
    bg: C.softLavender,
  },
  {
    id: "thyroid",
    icon: <Activity size={24} />,
    title: "Thyroid Balance Program",
    duration: "12 Weeks",
    price: "₹4,799",
    image: thyroidImg,
    desc: "Bring your thyroid function back into balance. This program targets hypothyroidism and hyperthyroidism symptoms with personalized homeopathic remedies and care.",
    highlights: [
      "Balanced thyroid hormone levels",
      "Improved energy & metabolism",
      "Reduced fatigue & weight fluctuation",
      "Better hair & skin health",
      "Regular monitoring & follow-up",
    ],
    bg: C.softPeach,
  },
  {
    id: "weightloss",
    icon: <Sparkles size={24} />,
    title: "Healthy Weight Management",
    duration: "12 Weeks",
    price: "₹5,999",
    image: weightlossImg,
    desc: "Achieve and maintain your ideal weight naturally. Our holistic approach addresses underlying hormonal and metabolic factors for sustainable, long-term results.",
    highlights: [
      "Natural metabolism boost",
      "Hormonal balance support",
      "Healthy eating guidance",
      "Sustainable weight loss",
      "No crash diets or side effects",
    ],
    bg: C.softRose,
  },
];

const benefits = [
  {
    icon: <Trophy size={22} />,
    title: "Structured Programs",
    desc: "Well-planned programs with clear timelines and milestones.",
  },
  {
    icon: <Users size={22} />,
    title: "Expert Guidance",
    desc: "One-on-one consultations with experienced homeopaths.",
  },
  {
    icon: <Calendar size={22} />,
    title: "Regular Follow-ups",
    desc: "Weekly check-ins to track progress and adjust treatment.",
  },
  {
    icon: <Heart size={22} />,
    title: "Holistic Approach",
    desc: "Combining remedies, diet, exercise, and lifestyle changes.",
  },
];

const testimonials = [
  {
    name: "Deepa Menon",
    program: "Diabetes Management Program",
    text: "My sugar levels are finally under control without heavy medication. I feel more energetic and my regular check-ups show steady improvement every month.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
  },
  {
    name: "Arun Prakash",
    program: "Immunity Booster Program",
    text: "I used to fall sick every month. After completing the 8-week immunity program, I haven't had a single cold in 4 months. My energy levels are through the roof!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
  },
  {
    name: "Meera Patel",
    program: "PCOS Care Program",
    text: "My cycles are regular again after years of irregularity. The acne has cleared up too and I feel so much more confident in my own skin now.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
  },
];

const faqs = [
  {
    q: "How do I choose the right wellness program for me?",
    a: "You can start with a free 15-minute consultation where our homeopath will understand your health concerns and recommend the most suitable program. You can also combine multiple programs for comprehensive wellness.",
  },
  {
    q: "Can I take homeopathic remedies alongside my regular medications?",
    a: "Yes, our wellness programs are designed to complement your existing healthcare routine. Our remedies are safe and can be taken with conventional medicines. Always inform your homeopath about any ongoing medications.",
  },
  {
    q: "How soon will I see results?",
    a: "Most patients notice positive changes within 2-3 weeks. However, the full benefits of a wellness program are typically experienced over the complete program duration as your body gradually heals and strengthens.",
  },
  {
    q: "What's included in the program fee?",
    a: "Each program includes initial consultation, all homeopathic remedies for the program duration, weekly follow-up consultations, diet & lifestyle guidance, and a personalized wellness plan.",
  },
];

// ── Scroll Reveal Hook ──
function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("wp-visible");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".wp-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ── Component ──
function WellnessProgram() {
  const [popupOpen, setPopupOpen] = useState(false);
  useReveal();

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const iconCircle = (bg) => ({
    width: "46px",
    height: "46px",
    borderRadius: "50%",
    background: bg,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  });

  return (
    <div
      className="wp-page"
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
        className="wp-hero"
        style={{
          background:
            "linear-gradient(135deg, #f8faf8 0%, #f2f8f3 25%, #e9f5ec 65%, #dff1e5 100%)",
          position: "relative",
          overflow: "hidden",
          minHeight: 480,
        }}
      >
        {/* Decorative leaf — bottom left */}
        <FaLeafIcon
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

        {/* SVG Shapes behind image */}
        <div
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

        <div className="container-fluid px-0" style={{ maxWidth: "100%" }}>
          <div className="row g-0 wp-hero-row" style={{ minHeight: 480 }}>
            {/* ── LEFT — Text ── */}
            <div
              className="col-lg-6 col-md-12 d-flex align-items-center wp-reveal wp-hero-content"
              style={{
                padding: "80px 48px 60px 10%",
                position: "relative",
                zIndex: 2,
              }}
            >
              <div className="wp-hero-inner">
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
                  Wellness Programs
                </span>
                <h1
                  style={{
                    fontSize: "clamp(34px, 4.5vw, 54px)",
                    fontWeight: 800,
                    color: C.blueDark,
                    lineHeight: 1.1,
                    margin: "0 0 18px",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Transform Your
                  <br />
                  Health Journey{" "}
                  <Sparkles
                    size={32}
                    style={{
                      color: C.warmAmber,
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
                  Structured wellness programs designed to restore balance,
                  boost vitality, and prevent disease. Experience the power of
                  holistic healing with expert guidance at every step.
                </p>

                {/* Action buttons */}
                <div
                  className="wp-hero-actions"
                  style={{ display: "flex", flexWrap: "wrap", gap: 12 }}
                >
                  <button
                    className="wp-hero-btn"
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
                    <FaWhatsapp size={18} style={{ color: C.green }} /> Enquire
                    Now
                  </button>
                  <button
                    className="wp-hero-btn"
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
              className="col-lg-6 col-md-12 d-none d-lg-block wp-reveal"
              style={{
                position: "relative",
                minHeight: 480,
                overflow: "hidden",
                zIndex: 2,
              }}
            >
              <img
                src={bannerImg}
                alt="Wellness and natural healing"
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
                  maxWidth: "200px",
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
                  Your Wellness
                  <br />
                  Journey
                  <br />
                  Starts Here{" "}
                  <Heart size={14} style={{ color: C.green, fill: C.green }} />
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SECTION 2 — OUR PROGRAMS
      ════════════════════════════════════════ */}
      <section className="wp-programs-section" style={{ background: "#fff", padding: "70px 0 60px" }}>
        <div className="container">
          <div className="text-center wp-reveal wp-section-heading" style={{ marginBottom: 44 }}>
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
              Our Programs
            </span>
            <h2
              style={{
                fontSize: "clamp(24px, 2.8vw, 36px)",
                fontWeight: 800,
                color: C.blueDark,
                margin: "0 0 10px",
              }}
            >
              Choose Your Wellness Path
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
              Each program is carefully crafted to address specific health goals
              with natural, side-effect-free treatments.
            </p>
          </div>

          <div className="row g-4 wp-program-grid">
            {programs.map((program, i) => (
              <div className="col-lg-4 col-md-6 wp-reveal wp-program-col" key={i}>
                <div
                  className="wp-program-card"
                  style={{
                    background: C.white,
                    borderRadius: 18,
                    overflow: "hidden",
                    border: `1px solid ${C.border}`,
                    boxShadow: "0 4px 24px rgba(15,61,110,0.08)",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.22s ease, box-shadow 0.22s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 12px 32px rgba(15,61,110,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 24px rgba(15,61,110,0.08)";
                  }}
                >
                  {/* Program image */}
                  <div className="wp-program-image" style={{ position: "relative", height: 200 }}>
                    <img
                      src={program.image}
                      alt={program.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                    {/* Duration badge */}
                    <span
                      style={{
                        position: "absolute",
                        top: 14,
                        right: 14,
                        background: "rgba(15,61,110,0.85)",
                        color: "#fff",
                        padding: "6px 14px",
                        borderRadius: 20,
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <Clock size={12} /> {program.duration}
                    </span>
                    {/* Price badge */}
                    <span
                      style={{
                        position: "absolute",
                        bottom: 14,
                        left: 14,
                        background: C.green,
                        color: "#fff",
                        padding: "6px 14px",
                        borderRadius: 20,
                        fontSize: "0.8rem",
                        fontWeight: 700,
                      }}
                    >
                      {program.price}
                    </span>
                  </div>

                  {/* Program content */}
                  <div className="wp-program-content" style={{ padding: "22px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                      <span style={{ color: C.green }}>{program.icon}</span>
                      <h3
                        style={{
                          fontSize: "1.05rem",
                          fontWeight: 700,
                          color: C.blueDark,
                          margin: 0,
                        }}
                      >
                        {program.title}
                      </h3>
                    </div>
                    <p
                      style={{
                        fontSize: "0.84rem",
                        lineHeight: 1.7,
                        color: C.muted,
                        margin: "0 0 16px",
                      }}
                    >
                      {program.desc}
                    </p>

                    {/* Highlights */}
                    <div style={{ flex: 1 }}>
                      {program.highlights.map((h, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            marginBottom: 6,
                          }}
                        >
                          <CheckCircle2
                            size={14}
                            style={{ color: C.green, flexShrink: 0 }}
                          />
                          <span style={{ fontSize: "0.8rem", color: C.muted }}>
                            {h}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <button
                      className="wp-enroll-btn"
                      onClick={() => setPopupOpen(true)}
                      style={{
                        width: "100%",
                        marginTop: 16,
                        background: C.green,
                        color: "#fff",
                        border: "none",
                        borderRadius: 10,
                        padding: "12px",
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        fontFamily: "'Poppins', sans-serif",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        transition: "background 0.22s ease",
                      }}
                    >
                      Enroll Now <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SECTION 3 — WHY OUR PROGRAMS
      ════════════════════════════════════════ */}
      <section className="wp-benefits-section" style={{ background: C.bgSoft, padding: "64px 0 56px" }}>
        <div className="container">
          <div className="text-center wp-reveal wp-section-heading" style={{ marginBottom: 44 }}>
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
              Why Choose Us
            </span>
            <h2
              style={{
                fontSize: "clamp(24px, 2.8vw, 36px)",
                fontWeight: 800,
                color: C.blueDark,
                margin: "0 0 10px",
              }}
            >
              What Makes Our Programs Different
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
              We combine ancient wisdom with modern understanding for truly
              effective wellness solutions.
            </p>
          </div>

          <div className="row g-4 wp-benefits-grid">
            {benefits.map((b, i) => (
              <div className="col-lg-3 col-md-6 wp-reveal wp-benefit-col" key={i}>
                <div
                  className="wp-benefit-card"
                  style={{
                    background: C.white,
                    borderRadius: 16,
                    padding: "28px 22px",
                    textAlign: "center",
                    height: "100%",
                    border: `1px solid ${C.border}`,
                    boxShadow: "0 4px 20px rgba(15,61,110,0.06)",
                  }}
                >
                  <div
                    style={{
                      ...iconCircle(C.lightGreen),
                      margin: "0 auto 16px",
                    }}
                  >
                    <span style={{ color: C.green }}>{b.icon}</span>
                  </div>
                  <h4
                    style={{
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: C.blueDark,
                      margin: "0 0 8px",
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
            ))}
          </div>

          {/* Process timeline */}
          <div className="wp-reveal wp-process-wrap" style={{ marginTop: 48 }}>
            <div
              className="wp-process-card"
              style={{
                background: C.white,
                borderRadius: 18,
                padding: "32px 28px",
                border: `1px solid ${C.border}`,
                boxShadow: "0 4px 20px rgba(15,61,110,0.06)",
              }}
            >
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: C.blueDark,
                  textAlign: "center",
                  margin: "0 0 28px",
                }}
              >
                Your Wellness Journey — Step by Step
              </h3>
              <div className="d-flex flex-wrap justify-content-center align-items-center wp-process-steps" style={{ gap: 16 }}>
                {[
                  { step: "1", label: "Initial\nConsultation", icon: <Users size={18} /> },
                  { step: "2", label: "Personalized\nPlan", icon: <Clipboard size={18} /> },
                  { step: "3", label: "Program\nBegins", icon: <Zap size={18} /> },
                  { step: "4", label: "Weekly\nFollow-ups", icon: <Calendar size={18} /> },
                  { step: "5", label: "Wellness\nAchieved!", icon: <Trophy size={18} /> },
                ].map((item, idx, arr) => (
                  <React.Fragment key={idx}>
                    <div style={{ textAlign: "center" }}>
                      <div
                        style={{
                          width: 56,
                          height: 56,
                          borderRadius: "50%",
                          background: C.green,
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 800,
                          fontSize: "1.1rem",
                          margin: "0 auto 8px",
                        }}
                      >
                        {item.step}
                      </div>
                      <p
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 600,
                          color: C.blueDark,
                          margin: 0,
                          whiteSpace: "pre-line",
                          lineHeight: 1.4,
                        }}
                      >
                        {item.label}
                      </p>
                    </div>
                    {idx < arr.length - 1 && (
                      <ArrowRight size={18} style={{ color: C.green, flexShrink: 0 }} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SECTION 4 — TESTIMONIALS
      ════════════════════════════════════════ */}
      <section
        className="wp-testimonials-section"
        style={{
          background: `linear-gradient(135deg,${C.blueDark} 0%,${C.blue} 55%,${C.green} 100%)`,
          padding: "60px 0 56px",
        }}
      >
        <div className="container">
          <div className="text-center wp-reveal wp-section-heading" style={{ marginBottom: 40 }}>
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
              Success Stories
            </span>
            <h2
              style={{
                fontSize: "clamp(24px, 2.8vw, 36px)",
                fontWeight: 800,
                color: "#fff",
                margin: "0 0 10px",
              }}
            >
              What Our Participants Say
            </h2>
            <p
              style={{
                fontSize: "0.92rem",
                color: "rgba(255,255,255,0.8)",
                margin: 0,
              }}
            >
              Real transformations from real people who completed our wellness
              programs.
            </p>
          </div>

          <div className="row g-4 wp-testimonials-grid">
            {testimonials.map((t, i) => (
              <div className="col-lg-4 col-md-6 wp-reveal wp-testimonial-col" key={i}>
                <div
                  className="wp-testimonial-card"
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
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <img
                      src={t.image}
                      alt={t.name}
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                    <div>
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
                        {t.program}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SECTION 5 — FAQ
      ════════════════════════════════════════ */}
      <section className="wp-faq-section" style={{ background: "#fff", padding: "64px 0 56px" }}>
        <div className="container">
          <div className="text-center wp-reveal wp-section-heading" style={{ marginBottom: 44 }}>
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
              FAQ
            </span>
            <h2
              style={{
                fontSize: "clamp(24px, 2.8vw, 36px)",
                fontWeight: 800,
                color: C.blueDark,
                margin: "0 0 10px",
              }}
            >
              Frequently Asked Questions
            </h2>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              {faqs.map((faq, i) => (
                <div
                  className="wp-reveal wp-faq-card"
                  key={i}
                  style={{
                    background: C.bgSoft,
                    borderRadius: 14,
                    padding: "20px 24px",
                    marginBottom: 12,
                    border: `1px solid ${C.border}`,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                    }}
                  >
                    <ChevronRight
                      size={18}
                      style={{ color: C.green, flexShrink: 0, marginTop: 2 }}
                    />
                    <div>
                      <h4
                        style={{
                          fontSize: "0.95rem",
                          fontWeight: 700,
                          color: C.blueDark,
                          margin: "0 0 8px",
                        }}
                      >
                        {faq.q}
                      </h4>
                      <p
                        style={{
                          fontSize: "0.85rem",
                          lineHeight: 1.7,
                          color: C.muted,
                          margin: 0,
                        }}
                      >
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SECTION 6 — CTA STRIP
      ════════════════════════════════════════ */}
      <section
        className="py-5 position-relative wp-bottom-cta-section"
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
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-4 px-4 py-4 rounded-4 bg-white shadow-sm wp-bottom-cta">
            <div>
              <h4 className="fw-bold mb-1" style={{ color: C.blueDark }}>
                Start Your Wellness Journey Today!
              </h4>
              <p
                className="mb-0"
                style={{ color: C.muted, fontSize: "0.92rem" }}
              >
                Choose a program that fits your goals and take the first step
                towards better health.
              </p>
            </div>
            <div className="wp-bottom-cta-actions" style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="btn fw-bold text-white d-flex align-items-center gap-2 wp-bottom-cta-btn"
                style={{
                  background: C.green,
                  border: "none",
                  borderRadius: "10px",
                  padding: "13px 22px",
                }}
              >
                <FaWhatsapp size={16} /> Enquire on WhatsApp
              </a>
              <button
                onClick={() => setPopupOpen(true)}
                className="btn fw-bold d-flex align-items-center gap-2 wp-bottom-cta-btn"
                style={{
                  background: C.blueDark,
                  color: "#fff",
                  border: "none",
                  borderRadius: "10px",
                  padding: "13px 22px",
                }}
              >
                <Calendar size={16} /> Book Free Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      <AppointmentPopup
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
      />

      <Footer />

      <style>{`
        .wp-reveal { opacity: 0; transform: translateY(24px); transition: opacity .6s ease, transform .6s ease; }
        .wp-reveal.wp-visible { opacity: 1; transform: translateY(0); }

        @media (max-width: 991.98px) {
          .wp-hero, .wp-hero-row { min-height: auto !important; }
          .wp-hero-content { justify-content: center; }
          .wp-hero-inner { width: 100%; max-width: 680px; }
          .wp-programs-section,
          .wp-benefits-section,
          .wp-faq-section,
          .wp-bottom-cta-section {
            padding-top: 44px !important;
            padding-bottom: 44px !important;
          }
          .wp-testimonials-section { padding-top: 44px !important; padding-bottom: 44px !important; }
        }

        @media (max-width: 767.98px) {
          .wp-page .container { padding-left: 16px; padding-right: 16px; }

          .wp-hero, .wp-hero-row { min-height: auto !important; }
          .wp-hero-content {
            padding: 32px 18px 38px !important;
            justify-content: flex-start;
          }
          .wp-hero-inner > span { margin-bottom: 10px !important; font-size: 0.66rem !important; }
          .wp-hero-inner h1 {
            font-size: 30px !important;
            line-height: 1.14 !important;
            margin-bottom: 14px !important;
          }
          .wp-hero-inner h1 svg { width: 23px; height: 23px; }
          .wp-hero-inner > p {
            max-width: 100% !important;
            font-size: 0.85rem !important;
            line-height: 1.65 !important;
            margin-bottom: 20px !important;
          }
          .wp-hero-actions {
            display: grid !important;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 8px !important;
            width: 100%;
          }
          .wp-hero-btn {
            width: 100%;
            min-width: 0;
            min-height: 40px;
            justify-content: center;
            padding: 9px 7px !important;
            font-size: 0.68rem !important;
            line-height: 1.2;
            text-align: center;
          }
          .wp-hero-btn svg { flex-shrink: 0; width: 15px; height: 15px; }

          .wp-programs-section,
          .wp-benefits-section,
          .wp-faq-section,
          .wp-bottom-cta-section {
            padding-top: 34px !important;
            padding-bottom: 34px !important;
          }
          .wp-testimonials-section { padding-top: 36px !important; padding-bottom: 36px !important; }

          .wp-section-heading { margin-bottom: 22px !important; }
          .wp-section-heading h2 { font-size: 23px !important; line-height: 1.28; }
          .wp-section-heading p {
            max-width: 100% !important;
            font-size: 0.8rem !important;
            line-height: 1.55 !important;
          }

          .wp-program-grid {
            --bs-gutter-x: 12px;
            --bs-gutter-y: 14px;
          }
          .wp-program-card { border-radius: 14px !important; }
          .wp-program-image { height: 170px !important; }
          .wp-program-content { padding: 16px 15px !important; }
          .wp-program-content h3 { font-size: 0.94rem !important; line-height: 1.35; }
          .wp-program-content > p {
            font-size: 0.78rem !important;
            line-height: 1.55 !important;
            margin-bottom: 12px !important;
          }
          .wp-program-content > div:nth-of-type(2) span { font-size: 0.74rem !important; }
          .wp-enroll-btn {
            margin-top: 12px !important;
            padding: 10px !important;
            font-size: 0.78rem !important;
          }

          .wp-benefits-grid { --bs-gutter-x: 10px; --bs-gutter-y: 10px; }
          .wp-benefit-col { width: 50%; }
          .wp-benefit-card {
            padding: 18px 12px !important;
            border-radius: 13px !important;
          }
          .wp-benefit-card > div:first-child {
            width: 40px !important;
            height: 40px !important;
            margin-bottom: 10px !important;
          }
          .wp-benefit-card h4 { font-size: 0.8rem !important; line-height: 1.35; }
          .wp-benefit-card p { font-size: 0.7rem !important; line-height: 1.5 !important; }

          .wp-process-wrap { margin-top: 24px !important; }
          .wp-process-card { padding: 18px 12px !important; border-radius: 14px !important; }
          .wp-process-card h3 { margin-bottom: 18px !important; font-size: 0.9rem !important; }
          .wp-process-steps {
            display: grid !important;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px 8px !important;
          }
          .wp-process-steps > svg { display: none; }
          .wp-process-steps > div > div:first-child {
            width: 44px !important;
            height: 44px !important;
            margin-bottom: 6px !important;
            font-size: 0.9rem !important;
          }
          .wp-process-steps p { font-size: 0.66rem !important; }

          .wp-testimonials-grid { --bs-gutter-y: 12px; }
          .wp-testimonial-card { padding: 18px 16px !important; border-radius: 14px !important; }
          .wp-testimonial-card > p {
            font-size: 0.8rem !important;
            line-height: 1.6 !important;
            margin-bottom: 12px !important;
          }

          .wp-faq-card {
            padding: 15px 14px !important;
            margin-bottom: 9px !important;
            border-radius: 12px !important;
          }
          .wp-faq-card > div { gap: 9px !important; }
          .wp-faq-card h4 { font-size: 0.84rem !important; line-height: 1.4; margin-bottom: 5px !important; }
          .wp-faq-card p { font-size: 0.75rem !important; line-height: 1.55 !important; }

          .wp-bottom-cta {
            padding: 18px !important;
            gap: 14px !important;
            border-radius: 15px !important;
          }
          .wp-bottom-cta h4 { font-size: 1rem !important; line-height: 1.35; }
          .wp-bottom-cta p { font-size: 0.77rem !important; line-height: 1.5 !important; }
          .wp-bottom-cta-actions {
            width: 100%;
            display: grid !important;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 8px !important;
          }
          .wp-bottom-cta-btn {
            width: 100%;
            justify-content: center;
            padding: 10px 7px !important;
            font-size: 0.67rem !important;
            line-height: 1.2;
            text-align: center;
          }
        }

        @media (max-width: 389.98px) {
          .wp-page .container { padding-left: 13px; padding-right: 13px; }
          .wp-hero-content { padding: 28px 14px 32px !important; }
          .wp-hero-inner h1 { font-size: 27px !important; }
          .wp-hero-btn { font-size: 0.62rem !important; padding-left: 5px !important; padding-right: 5px !important; }
          .wp-benefit-col { width: 100%; }
          .wp-benefit-card { text-align: left !important; display: grid; grid-template-columns: 40px 1fr; column-gap: 10px; }
          .wp-benefit-card > div:first-child { grid-row: 1 / span 2; margin: 0 !important; }
          .wp-benefit-card h4, .wp-benefit-card p { text-align: left; }
          .wp-bottom-cta-actions { grid-template-columns: 1fr; }
          .wp-bottom-cta-btn { font-size: 0.72rem !important; }
        }
      `}</style>
    </div>
  );
}

export default WellnessProgram;