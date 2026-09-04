// OnlineConsultation.jsx — 4Health Homeopathy
// Full page explaining online consultation with same design tokens
// Uses Unsplash images for visual appeal

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
  Clock,
  ChevronRight,
  Sparkles,
  Video,
  Laptop,
  MessageCircle,
  FileText,
  Lock,
  CreditCard,
  Globe,
  Headphones,
} from "lucide-react";
import {
  FaWhatsapp,
  FaLeaf as FaLeafIcon,
} from "react-icons/fa";
import bannerImg from '../../assets/Image/Online_consoltation/Online_banner.webp';
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
  warmAmber: "#f59e0b",
  softTeal: "#e6f7f7",
};



// ── Data ──
const howItWorks = [
  {
    step: "01",
    icon: <Calendar size={24} />,
    title: "Book Your Slot",
    desc: "Choose a convenient date and time for your online consultation. You'll receive an instant confirmation with a secure video link.",
    bg: C.lightGreen,
  },
  {
    step: "02",
    icon: <FileText size={24} />,
    title: "Share Your History",
    desc: "Fill out a simple online health questionnaire before your appointment. This helps our doctor prepare for your consultation.",
    bg: C.lightBlue,
  },
  {
    step: "03",
    icon: <Video size={24} />,
    title: "Video Consultation",
    desc: "Connect with your homeopath via secure video call. Discuss your concerns in detail, just like an in-person visit.",
    bg: C.lightGreen,
  },
  {
    step: "04",
    icon: <MessageCircle size={24} />,
    title: "Get Your Treatment Plan",
    desc: "Receive a personalized prescription and treatment plan digitally. Remedies can be delivered to your doorstep or picked up.",
    bg: C.lightBlue,
  },
];

const benefits = [
  {
    icon: <Laptop size={22} />,
    title: "Consult from Anywhere",
    desc: "No travel required. Connect with expert homeopaths from the comfort of your home, office, or anywhere you are.",
  },
  {
    icon: <Clock size={22} />,
    title: "Flexible Timings",
    desc: "Extended consultation hours including evenings and weekends to fit your busy schedule.",
  },
  {
    icon: <Lock size={22} />,
    title: "100% Secure & Private",
    desc: "HIPAA-compliant video platform with end-to-end encryption. Your health information stays confidential.",
  },
  {
    icon: <CreditCard size={22} />,
    title: "Easy Payment Options",
    desc: "Pay securely online via UPI, credit/debit card, or net banking. Instant receipt and invoice provided.",
  },
  {
    icon: <Globe size={22} />,
    title: "Pan India Access",
    desc: "Consult with Bangalore's best homeopaths from any city in India. Quality healthcare knows no boundaries.",
  },
  {
    icon: <Headphones size={22} />,
    title: "Post-Consult Support",
    desc: "7-day follow-up support via WhatsApp after your consultation. Get your doubts cleared without extra charges.",
  },
];

const pricingPlans = [
  {
    name: "First Consultation",
    duration: "30-40 mins",
    price: "₹499",
    originalPrice: "₹799",
    features: [
      "Detailed case taking",
      "Personalized remedy prescription",
      "Diet & lifestyle guidance",
      "7-day WhatsApp follow-up",
      "Digital prescription",
    ],
    popular: false,
    bg: C.white,
  },
  {
    name: "Follow-up Consultation",
    duration: "15-20 mins",
    price: "₹299",
    originalPrice: "₹499",
    features: [
      "Progress assessment",
      "Remedy adjustment if needed",
      "Continued guidance",
      "5-day WhatsApp follow-up",
      "Digital prescription update",
    ],
    popular: true,
    bg: C.lightGreen,
  },
  {
    name: "Package - 5 Consultations",
    duration: "Valid 6 months",
    price: "₹1,999",
    originalPrice: "₹2,495",
    features: [
      "1 Initial + 4 Follow-ups",
      "Priority appointment slots",
      "Unlimited WhatsApp support",
      "Free remedy delivery (within city)",
      "Health tracking dashboard",
    ],
    popular: false,
    bg: C.white,
  },
];

const testimonials = [
  {
    name: "Kavita Iyer",
    location: "Mumbai",
    text: "I was skeptical about online homeopathy consultation, but the experience was amazing! The doctor spent 40 minutes understanding my complete history. My skin has improved so much!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80",
  },
  {
    name: "Suresh Nair",
    location: "Chennai",
    text: "Living in Chennai, I never thought I could consult Bangalore's top homeopath. The video quality was excellent and the treatment for my joint pain is working wonders.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
  },
  {
    name: "Pooja Reddy",
    location: "Hyderabad",
    text: "The flexibility of evening appointments is a blessing for working professionals like me. My anxiety has reduced significantly after just 2 consultations. Highly recommended!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
  },
];

const faqs = [
  {
    q: "How does online homeopathy consultation work?",
    a: "It's simple! Book an appointment, fill out your health questionnaire, and join the video call at your scheduled time. Our doctor will discuss your health concerns in detail, analyze your case, and prescribe personalized remedies. The entire process is just like an in-clinic visit.",
  },
  {
    q: "Is online consultation as effective as in-person?",
    a: "Yes! Homeopathy relies heavily on detailed case-taking and understanding symptoms, which can be done effectively via video consultation. Our doctors are trained in telemedicine and ensure the same quality of care. For conditions requiring physical examination, we guide you on self-examination techniques.",
  },
  {
    q: "How do I receive my medicines?",
    a: "After your consultation, you'll receive a digital prescription. You can have the remedies delivered to your address (free within Bangalore, nominal charges for other cities), or you can purchase them from any homeopathic pharmacy using the prescription.",
  },
  {
    q: "What if I have technical issues during the call?",
    a: "Don't worry! If the video call disconnects, your doctor will call you on your phone to continue. You can also use WhatsApp video as a backup. Our support team is always available at +91 98765 43210 for technical assistance.",
  },
  {
    q: "Can children and elderly consult online?",
    a: "Absolutely! Online consultation is ideal for children and elderly patients as they can consult from the safety and comfort of home. A family member can assist them during the video call if needed.",
  },
];

// ── Scroll Reveal Hook ──
function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("oc-visible");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".oc-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ── Component ──
function OnlineConsultation() {
  const navigate = useNavigate();
  const [popupOpen, setPopupOpen] = useState(false);
  useReveal();

  useEffect(()=>{
    window.scroll(0, 0)
  },[])

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
      className="oc-page"
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
        className="oc-hero"
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
          <div className="row g-0 oc-hero-row" style={{ minHeight: 480 }}>
            {/* ── LEFT — Text ── */}
            <div
              className="col-lg-6 col-md-12 d-flex align-items-center oc-reveal oc-hero-content"
              style={{
                padding: "80px 48px 60px 10%",
                position: "relative",
                zIndex: 2,
              }}
            >
              <div className="oc-hero-inner">
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
                  Online Consultation
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
                  Expert Care,
                  <br />
                  From Anywhere{" "}
                  <Video
                    size={32}
                    style={{
                      color: C.green,
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
                  Consult with our experienced homeopaths via secure video calls.
                  Get personalized treatment, prescriptions, and follow-up care —
                  all without leaving your home.
                </p>

                {/* Stats */}
                <div className="oc-hero-stats" style={{ display: "flex", gap: 24, marginBottom: 28 }}>
                  {[
                    { number: "5000+", label: "Online\nConsultations" },
                    { number: "4.9", label: "Patient\nRating" },
                    { number: "30+", label: "Cities\nServed" },
                  ].map((stat, i) => (
                    <div key={i}>
                      <p
                        style={{
                          fontSize: "1.5rem",
                          fontWeight: 800,
                          color: C.blueDark,
                          margin: "0 0 2px",
                        }}
                      >
                        {stat.number}
                      </p>
                      <p
                        style={{
                          fontSize: "0.7rem",
                          color: C.muted,
                          margin: 0,
                          whiteSpace: "pre-line",
                          lineHeight: 1.3,
                        }}
                      >
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="oc-hero-actions" style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                  <button
                    className="oc-hero-btn"
                    onClick={() => setPopupOpen(true)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      background: C.green,
                      color: "#fff",
                      border: "none",
                      borderRadius: 10,
                      padding: "12px 22px",
                      fontSize: "0.88rem",
                      fontWeight: 600,
                      fontFamily: "'Poppins', sans-serif",
                      cursor: "pointer",
                    }}
                  >
                    <Video size={16} /> Book Online Consultation
                  </button>
                  <button
                    className="oc-hero-btn"
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
                      padding: "12px 22px",
                      fontSize: "0.88rem",
                      fontWeight: 600,
                      fontFamily: "'Poppins', sans-serif",
                      cursor: "pointer",
                    }}
                  >
                    <FaWhatsapp size={18} style={{ color: C.green }} /> Chat Now
                  </button>
                </div>
              </div>
            </div>

            {/* ── RIGHT — Banner image ── */}
            <div
              className="col-lg-6 col-md-12 d-none d-lg-block oc-reveal"
              style={{
                position: "relative",
                minHeight: 480,
                overflow: "hidden",
                zIndex: 2,
              }}
            >
              <img
                src={bannerImg}
                alt="Online homeopathy consultation"
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
                  top: "12%",
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
                  Heal From
                  <br />
                  the Comfort
                  <br />
                  of Home{" "}
                  <Heart size={14} style={{ color: C.green, fill: C.green }} />
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SECTION 2 — HOW IT WORKS
      ════════════════════════════════════════ */}
      <section className="oc-steps-section" style={{ background: "#fff", padding: "70px 0 60px" }}>
        <div className="container">
          <div className="text-center oc-reveal oc-section-heading" style={{ marginBottom: 44 }}>
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
              How It Works
            </span>
            <h2
              style={{
                fontSize: "clamp(24px, 2.8vw, 36px)",
                fontWeight: 800,
                color: C.blueDark,
                margin: "0 0 10px",
              }}
            >
              4 Simple Steps to Better Health
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
              Our streamlined online consultation process makes it easy to get
              the care you need.
            </p>
          </div>

          <div className="row g-4 oc-steps-grid">
            {howItWorks.map((step, i) => (
              <div className="col-lg-3 col-md-6 oc-reveal oc-step-col" key={i}>
                <div
                  className="oc-step-card"
                  style={{
                    background: C.bgSoft,
                    borderRadius: 18,
                    padding: "28px 22px",
                    textAlign: "center",
                    height: "100%",
                    border: `1px solid ${C.border}`,
                    position: "relative",
                  }}
                >
                  {/* Step number */}
                  <span
                    style={{
                      position: "absolute",
                      top: -16,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: C.green,
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.75rem",
                      fontWeight: 800,
                    }}
                  >
                    {step.step}
                  </span>
                  <div style={iconCircle(step.bg)} className="mx-auto mb-3">
                    <span style={{ color: C.blue }}>{step.icon}</span>
                  </div>
                  <h4
                    style={{
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      color: C.blueDark,
                      margin: "0 0 10px",
                    }}
                  >
                    {step.title}
                  </h4>
                  <p
                    style={{
                      fontSize: "0.84rem",
                      lineHeight: 1.7,
                      color: C.muted,
                      margin: 0,
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SECTION 3 — BENEFITS
      ════════════════════════════════════════ */}
      <section className="oc-benefits-section" style={{ background: C.bgSoft, padding: "64px 0 56px" }}>
        <div className="container">
          <div className="text-center oc-reveal oc-section-heading" style={{ marginBottom: 44 }}>
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
              Why Online
            </span>
            <h2
              style={{
                fontSize: "clamp(24px, 2.8vw, 36px)",
                fontWeight: 800,
                color: C.blueDark,
                margin: "0 0 10px",
              }}
            >
              Benefits of Online Consultation
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
              Experience quality healthcare that's convenient, accessible, and
              just as effective as in-clinic visits.
            </p>
          </div>

          <div className="row g-4 oc-benefits-grid">
            {benefits.map((b, i) => (
              <div className="col-lg-4 col-md-6 oc-reveal oc-benefit-col" key={i}>
                <div
                  className="oc-benefit-card"
                  style={{
                    background: C.white,
                    borderRadius: 14,
                    padding: "22px 20px",
                    height: "100%",
                    border: `1px solid ${C.border}`,
                    display: "flex",
                    gap: 14,
                    alignItems: "flex-start",
                    boxShadow: "0 2px 12px rgba(15,61,110,0.04)",
                  }}
                >
                  <span
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 10,
                      background: C.lightGreen,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ color: C.green }}>{b.icon}</span>
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
          SECTION 4 — PRICING
      ════════════════════════════════════════ */}
      <section className="oc-pricing-section" style={{ background: "#fff", padding: "70px 0 60px" }}>
        <div className="container">
          <div className="text-center oc-reveal oc-section-heading" style={{ marginBottom: 44 }}>
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
              Pricing
            </span>
            <h2
              style={{
                fontSize: "clamp(24px, 2.8vw, 36px)",
                fontWeight: 800,
                color: C.blueDark,
                margin: "0 0 10px",
              }}
            >
              Affordable & Transparent Pricing
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
              Quality homeopathic care at prices that make healthcare accessible
              to everyone.
            </p>
          </div>

          <div className="row g-4 justify-content-center oc-pricing-grid">
            {pricingPlans.map((plan, i) => (
              <div className="col-lg-4 col-md-6 oc-reveal oc-pricing-col" key={i}>
                <div
                  className="oc-pricing-card"
                  style={{
                    background: plan.bg,
                    borderRadius: 18,
                    padding: "30px 24px",
                    height: "100%",
                    border: `1.5px solid ${plan.popular ? C.green : C.border}`,
                    position: "relative",
                    boxShadow: plan.popular
                      ? "0 8px 28px rgba(75,168,106,0.2)"
                      : "0 4px 20px rgba(15,61,110,0.06)",
                  }}
                >
                  {/* Popular badge */}
                  {plan.popular && (
                    <span
                      style={{
                        position: "absolute",
                        top: -14,
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: C.green,
                        color: "#fff",
                        padding: "5px 18px",
                        borderRadius: 20,
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        letterSpacing: "0.05em",
                      }}
                    >
                      MOST POPULAR
                    </span>
                  )}

                  <div style={{ textAlign: "center", marginBottom: 20 }}>
                    <h3
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        color: C.blueDark,
                        margin: "0 0 6px",
                      }}
                    >
                      {plan.name}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.8rem",
                        color: C.muted,
                        margin: "0 0 14px",
                      }}
                    >
                      <Clock size={12} style={{ display: "inline", marginRight: 4 }} />
                      {plan.duration}
                    </p>
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 6 }}>
                      <span
                        style={{
                          fontSize: "2rem",
                          fontWeight: 800,
                          color: C.blueDark,
                        }}
                      >
                        {plan.price}
                      </span>
                      {plan.originalPrice && (
                        <span
                          style={{
                            fontSize: "0.85rem",
                            color: C.muted,
                            textDecoration: "line-through",
                          }}
                        >
                          {plan.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div style={{ marginBottom: 24 }}>
                    {plan.features.map((feature, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          padding: "8px 0",
                          borderBottom: `1px solid ${C.border}`,
                        }}
                      >
                        <CheckCircle2
                          size={16}
                          style={{ color: C.green, flexShrink: 0 }}
                        />
                        <span style={{ fontSize: "0.83rem", color: C.muted }}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <button
                    className="oc-pricing-btn"
                    onClick={() => setPopupOpen(true)}
                    style={{
                      width: "100%",
                      background: plan.popular ? C.green : C.blueDark,
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
                    }}
                  >
                    <Calendar size={16} /> Book Now
                  </button>
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
        className="oc-testimonials-section"
        style={{
          background: `linear-gradient(135deg,${C.blueDark} 0%,${C.blue} 55%,${C.green} 100%)`,
          padding: "60px 0 56px",
        }}
      >
        <div className="container">
          <div className="text-center oc-reveal oc-section-heading" style={{ marginBottom: 40 }}>
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
              Trusted by Patients Across India
            </h2>
            <p
              style={{
                fontSize: "0.92rem",
                color: "rgba(255,255,255,0.8)",
                margin: 0,
              }}
            >
              Hear from patients who experienced the convenience and effectiveness
              of online homeopathy.
            </p>
          </div>

          <div className="row g-4 oc-testimonials-grid">
            {testimonials.map((t, i) => (
              <div className="col-lg-4 col-md-6 oc-reveal oc-testimonial-col" key={i}>
                <div
                  className="oc-testimonial-card"
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
                        {t.location}
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
          SECTION 6 — FAQ
      ════════════════════════════════════════ */}
      <section className="oc-faq-section" style={{ background: "#fff", padding: "64px 0 56px" }}>
        <div className="container">
          <div className="text-center oc-reveal oc-section-heading" style={{ marginBottom: 44 }}>
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
                  className="oc-reveal oc-faq-card"
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
          SECTION 7 — CTA STRIP
      ════════════════════════════════════════ */}
      <section
        className="py-5 position-relative oc-bottom-cta-section"
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
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-4 px-4 py-4 rounded-4 bg-white shadow-sm oc-bottom-cta">
            <div>
              <h4 className="fw-bold mb-1" style={{ color: C.blueDark }}>
                Ready to Consult from Home?
              </h4>
              <p
                className="mb-0"
                style={{ color: C.muted, fontSize: "0.92rem" }}
              >
                Book your online consultation now and take the first step
                towards natural healing.
              </p>
            </div>
            <div className="oc-bottom-cta-actions" style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button
                onClick={() => setPopupOpen(true)}
                className="btn fw-bold text-white d-flex align-items-center gap-2 oc-bottom-cta-btn"
                style={{
                  background: C.green,
                  border: "none",
                  borderRadius: "10px",
                  padding: "13px 22px",
                }}
              >
                <Video size={16} /> Book Online Consultation
              </button>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="btn fw-bold d-flex align-items-center gap-2 oc-bottom-cta-btn"
                style={{
                  background: C.white,
                  color: C.blueDark,
                  border: `1.5px solid ${C.border}`,
                  borderRadius: "10px",
                  padding: "13px 22px",
                }}
              >
                <FaWhatsapp size={16} style={{ color: C.green }} /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <AppointmentPopup isOpen={popupOpen} onClose={() => setPopupOpen(false)} />

      <Footer />

      <style>{`
        .oc-reveal { opacity: 0; transform: translateY(24px); transition: opacity .6s ease, transform .6s ease; }
        .oc-reveal.oc-visible { opacity: 1; transform: translateY(0); }

        @media (max-width: 991.98px) {
          .oc-hero, .oc-hero-row { min-height: auto !important; }
          .oc-hero-content { justify-content: center; }
          .oc-hero-inner { width: 100%; max-width: 680px; }
          .oc-steps-section,
          .oc-benefits-section,
          .oc-pricing-section,
          .oc-faq-section,
          .oc-bottom-cta-section {
            padding-top: 44px !important;
            padding-bottom: 44px !important;
          }
          .oc-testimonials-section { padding-top: 44px !important; padding-bottom: 44px !important; }
        }

        @media (max-width: 767.98px) {
          .oc-page .container { padding-left: 16px; padding-right: 16px; }

          .oc-hero, .oc-hero-row { min-height: auto !important; }
          .oc-hero-content {
            padding: 32px 18px 38px !important;
            justify-content: flex-start;
          }
          .oc-hero-inner > span { margin-bottom: 10px !important; font-size: 0.66rem !important; }
          .oc-hero-inner h1 {
            font-size: 30px !important;
            line-height: 1.14 !important;
            margin-bottom: 14px !important;
          }
          .oc-hero-inner h1 svg { width: 23px; height: 23px; }
          .oc-hero-inner > p {
            max-width: 100% !important;
            margin-bottom: 18px !important;
            font-size: 0.85rem !important;
            line-height: 1.65 !important;
          }

          .oc-hero-stats {
            width: 100%;
            justify-content: space-between;
            gap: 8px !important;
            margin-bottom: 20px !important;
          }
          .oc-hero-stats > div { flex: 1; min-width: 0; }
          .oc-hero-stats > div > p:first-child { font-size: 1.15rem !important; }
          .oc-hero-stats > div > p:last-child { font-size: 0.61rem !important; }

          .oc-hero-actions {
            display: grid !important;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 8px !important;
            width: 100%;
          }
          .oc-hero-btn {
            width: 100%;
            min-width: 0;
            min-height: 40px;
            justify-content: center;
            padding: 9px 6px !important;
            font-size: 0.64rem !important;
            line-height: 1.2;
            text-align: center;
          }
          .oc-hero-btn svg { flex-shrink: 0; width: 15px; height: 15px; }

          .oc-steps-section,
          .oc-benefits-section,
          .oc-pricing-section,
          .oc-faq-section,
          .oc-bottom-cta-section {
            padding-top: 34px !important;
            padding-bottom: 34px !important;
          }
          .oc-testimonials-section { padding-top: 36px !important; padding-bottom: 36px !important; }

          .oc-section-heading { margin-bottom: 22px !important; }
          .oc-section-heading h2 { font-size: 23px !important; line-height: 1.28; }
          .oc-section-heading p {
            max-width: 100% !important;
            font-size: 0.8rem !important;
            line-height: 1.55 !important;
          }

          .oc-steps-grid, .oc-benefits-grid, .oc-pricing-grid, .oc-testimonials-grid {
            --bs-gutter-x: 12px;
            --bs-gutter-y: 14px;
          }
          .oc-step-card {
            padding: 22px 16px 18px !important;
            border-radius: 14px !important;
          }
          .oc-step-card h4 { font-size: 0.9rem !important; margin-bottom: 7px !important; }
          .oc-step-card p { font-size: 0.76rem !important; line-height: 1.55 !important; }

          .oc-benefit-card {
            padding: 15px 14px !important;
            gap: 10px !important;
            border-radius: 13px !important;
          }
          .oc-benefit-card > span { width: 38px !important; height: 38px !important; min-width: 38px; }
          .oc-benefit-card h4 { font-size: 0.82rem !important; line-height: 1.35; margin-bottom: 4px !important; }
          .oc-benefit-card p { font-size: 0.72rem !important; line-height: 1.5 !important; }

          .oc-pricing-card {
            padding: 24px 18px 18px !important;
            border-radius: 14px !important;
          }
          .oc-pricing-card h3 { font-size: 1rem !important; }
          .oc-pricing-card > div:first-of-type { margin-bottom: 14px !important; }
          .oc-pricing-card > div:first-of-type span:first-of-type { font-size: 1.7rem !important; }
          .oc-pricing-card > div:nth-of-type(2) { margin-bottom: 16px !important; }
          .oc-pricing-card > div:nth-of-type(2) span { font-size: 0.76rem !important; }
          .oc-pricing-btn { padding: 10px !important; font-size: 0.78rem !important; }

          .oc-testimonial-card { padding: 18px 16px !important; border-radius: 14px !important; }
          .oc-testimonial-card > p {
            font-size: 0.8rem !important;
            line-height: 1.6 !important;
            margin-bottom: 12px !important;
          }

          .oc-faq-card {
            padding: 15px 14px !important;
            margin-bottom: 9px !important;
            border-radius: 12px !important;
          }
          .oc-faq-card > div { gap: 9px !important; }
          .oc-faq-card h4 { font-size: 0.84rem !important; line-height: 1.4; margin-bottom: 5px !important; }
          .oc-faq-card p { font-size: 0.75rem !important; line-height: 1.55 !important; }

          .oc-bottom-cta {
            padding: 18px !important;
            gap: 14px !important;
            border-radius: 15px !important;
          }
          .oc-bottom-cta h4 { font-size: 1rem !important; line-height: 1.35; }
          .oc-bottom-cta p { font-size: 0.77rem !important; line-height: 1.5 !important; }
          .oc-bottom-cta-actions {
            width: 100%;
            display: grid !important;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 8px !important;
          }
          .oc-bottom-cta-btn {
            width: 100%;
            justify-content: center;
            padding: 10px 7px !important;
            font-size: 0.65rem !important;
            line-height: 1.2;
            text-align: center;
          }
        }

        @media (max-width: 389.98px) {
          .oc-page .container { padding-left: 13px; padding-right: 13px; }
          .oc-hero-content { padding: 28px 14px 32px !important; }
          .oc-hero-inner h1 { font-size: 27px !important; }
          .oc-hero-btn { font-size: 0.58rem !important; padding-left: 4px !important; padding-right: 4px !important; }
          .oc-bottom-cta-actions { grid-template-columns: 1fr; }
          .oc-bottom-cta-btn { font-size: 0.72rem !important; }
        }
      `}</style>
    </div>
    
  );
}

export default OnlineConsultation;