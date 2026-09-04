// Contact.jsx — 4Health Homeopathy
// Only form submission logic changed – design remains identical
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer/Footer";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Calendar,
  User,
  Heart,
  MessageSquare,
  Lock,
  ShieldCheck,
  CheckCircle2,
  Video,
  ArrowRight,
  Send,
} from "lucide-react";
import {
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLeaf,
} from "react-icons/fa";

import contactBanner from "../../assets/Image/Contact/conract-banner.webp";
import AppointmentPopup from "./Appoinmnet/Appoinmnetpop";

// 👇 Import your API base URL (same as Enquire.js uses)
import API_BASE_URL from "../../../src/Components/AdminPanel/Environmnet/Apiurl"; // adjust path if needed

// ── Brand tokens (unchanged) ──
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
};

function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  // ── New: toast & loading state ──
  const [toast, setToast] = useState(null); // { type: 'success'|'error', message: string }
  const [loading, setLoading] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("ct-visible");
        });
      },
      { threshold: 0.1 },
    );
    document
      .querySelectorAll(".ct-reveal")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Auto-dismiss toast after 5 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // ── NEW: Submit to Enquire API ──
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.message
    ) {
      setToast({ type: "error", message: "Please fill all required fields." });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: formData.name,
        mobileNumber: formData.phone,
        email: formData.email,
        message: formData.message,
        enquire_date: new Date().toISOString().split("T")[0], // today
        status: "New",
      };

      const response = await fetch(`${API_BASE_URL}/enquire`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send enquiry");
      }

      const data = await response.json();
      console.log("Enquiry created:", data);

      setToast({
        type: "success",
        message: "Your enquiry has been sent! We'll get back to you soon.",
      });
      setFormData({ name: "", phone: "", email: "", message: "" });
    } catch (error) {
      console.error("Submit error:", error);
      setToast({
        type: "error",
        message: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  // ── Reusable helpers (unchanged) ──
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

  const inputWrap = {
    border: `1px solid ${C.border}`,
    borderRadius: "10px",
    background: "#fff",
  };

  return (
    <div
      className="ct-page"
      style={{
        fontFamily: "'Poppins', sans-serif",
        color: "#233143",
        overflowX: "hidden",
      }}
    >
      {/* ── Toast (new) ── */}
      {toast && (
        <div
          className="ct-toast"
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 9999,
            background: toast.type === "success" ? C.green : "#e74c3c",
            color: "#fff",
            padding: "14px 24px",
            borderRadius: "10px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            fontWeight: 500,
            maxWidth: "400px",
            fontSize: "0.95rem",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <span>{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            style={{
              background: "transparent",
              border: "none",
              color: "#fff",
              fontSize: "20px",
              cursor: "pointer",
              opacity: 0.8,
              padding: "0 4px",
            }}
          >
            ×
          </button>
        </div>
      )}

      {/* ============================================================
          SECTION 1 — HERO BANNER (EXACTLY AS YOU HAD)
      ============================================================ */}
      <section
        className="ct-hero"
        style={{
          background:
            "linear-gradient(135deg, #f8faf8 0%, #f2f8f3 25%, #e9f5ec 65%, #dff1e5 100%)",
          position: "relative",
          overflow: "hidden",
          minHeight: 480,
        }}
      >
        {/* Decorative leaf — bottom left */}
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

        {/* SVG Shapes behind image — same as Service page */}
        <div
          className="ct-hero-shapes"
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
          <div className="row g-0 ct-hero-row" style={{ minHeight: 480 }}>
            {/* ── LEFT — Text ── */}
            <div
              className="col-lg-6 col-md-12 d-flex align-items-center ct-reveal ct-hero-content"
              style={{
                padding: "80px 48px 60px 10%",
                position: "relative",
                zIndex: 2,
              }}
            >
              <div className="ct-hero-inner">
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
                  Contact Us
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
                  We're Here to
                  <br />
                  Help You Heal{" "}
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
                    maxWidth: 400,
                    margin: "0 0 28px",
                  }}
                >
                  Have a question or ready to book your consultation?
                  <br />
                  We'd love to hear from you.
                </p>

                {/* Action buttons — styled like Service page */}
                <div
                  className="ct-hero-actions"
                  style={{ display: "flex", flexWrap: "wrap", gap: 12 }}
                >
                  <button
                    className="ct-hero-btn"
                    onClick={() =>
                      window.open("https://wa.me/919944844408", "_blank")
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
                    className="ct-hero-btn"
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

            {/* ── RIGHT — Full-bleed banner image ── */}
            <div
              className="col-lg-6 col-md-12 d-none d-lg-block ct-reveal"
              style={{
                position: "relative",
                minHeight: 480,
                overflow: "hidden",
                zIndex: 2,
              }}
            >
              <img
                src={contactBanner}
                alt="Contact 4Health Homeopathy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center center",
                  display: "block",
                }}
              />

              {/* Left fade — blends image into bg */}
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

              {/* Overlay note card — "Your Health is Our Priority" */}
              <div
                className="position-absolute bg-white rounded-3 shadow-lg px-4 py-3 d-none d-sm-block"
                style={{
                  top: "18%",
                  right: "6%",
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
                  Your Health
                  <br />
                  is Our
                  <br />
                  Priority{" "}
                  <Heart size={14} style={{ color: C.green, fill: C.green }} />
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 2 — DETAILS / MAP+WHY / CONTACT FORM
      ============================================================ */}
      <section className="py-5 ct-details-section" style={{ background: "#fff" }}>
        <div className="container">
          <div className="row g-4">
            {/* Col 1 — Contact Details (unchanged) */}
            <div className="col-lg-4 ct-reveal ct-contact-details-col">
              <div
                className="bg-white rounded-4 shadow-sm p-4 h-100 ct-info-card"
                style={{ border: `1px solid ${C.border}` }}
              >
                <h5 className="fw-bold mb-4" style={{ color: C.blueDark }}>
                  Our Contact Details
                </h5>

                <div className="d-flex gap-3 mb-4">
  <div style={iconCircle(C.lightBlue)}>
    <MapPin size={20} style={{ color: C.blue }} />
  </div>
  <div>
    <h6 className="fw-bold mb-1" style={{ fontSize: "0.9rem" }}>
      Clinic Address
    </h6>
    <p
      className="mb-0"
      style={{
        color: C.muted,
        fontSize: "0.85rem",
        lineHeight: 1.6,
      }}
    >
      {/* 4Health Homeopathy Clinic */}
     
      Ground Floor, Sixer complex, 
       <br />
       Saradha College Road, 
      <br />
      (Near Bharath Petrol Bunk),  
      <br />
      Salem, Tamil Nadu 636007.
    </p>
  </div>
</div>

<div className="d-flex gap-3 mb-4">
  <div style={iconCircle(C.lightBlue)}>
    <Phone size={20} style={{ color: C.blue }} />
  </div>
  <div>
    <h6 className="fw-bold mb-1" style={{ fontSize: "0.9rem" }}>
      Phone
    </h6>
    <p
      className="mb-0"
      style={{ color: C.muted, fontSize: "0.85rem" }}
    >
      +91 99448 44408
    </p>
  </div>
</div>

{/* WhatsApp */}
<div className="d-flex gap-3 mb-4">
  <div style={iconCircle(C.lightGreen)}>
    <FaWhatsapp size={20} style={{ color: C.green }} />
  </div>
  <div>
    <h6 className="fw-bold mb-1" style={{ fontSize: "0.9rem" }}>
      WhatsApp
    </h6>
    <p
      className="mb-0"
      style={{ color: C.muted, fontSize: "0.85rem" }}
    >
      +91 99448 44408
    </p>
    <p
      className="mb-0"
      style={{ color: C.muted, fontSize: "0.85rem" }}
    >
      Message us anytime!
    </p>
  </div>
</div>

{/* ✅ NEW: Email Section */}
<div className="d-flex gap-3 mb-4">
  <div style={iconCircle(C.lightBlue)}>
    <Mail size={20} style={{ color: C.blue }} />
  </div>
  <div>
    <h6 className="fw-bold mb-1" style={{ fontSize: "0.9rem" }}>
      Email
    </h6>
    <p
      className="mb-0"
      style={{ color: C.muted, fontSize: "0.85rem" }}
    >
      <a 
        href="mailto:4healthhomeopathy@gmail.com" 
        style={{ 
          color: C.muted, 
          textDecoration: 'none',
          transition: 'color 0.3s ease'
        }}
        onMouseEnter={(e) => e.target.style.color = C.green}
        onMouseLeave={(e) => e.target.style.color = C.muted}
      >
        4healthhomeopathy@gmail.com
      </a>
    </p>
    <p
      className="mb-0"
      style={{ color: C.muted, fontSize: "0.85rem" }}
    >
      <a 
        href="mailto:4healthhomeopathy@gmail.com" 
        style={{ 
          color: C.muted, 
          textDecoration: 'none',
          transition: 'color 0.3s ease'
        }}
        onMouseEnter={(e) => e.target.style.color = C.green}
        onMouseLeave={(e) => e.target.style.color = C.muted}
      >
        contact@4healthhomeopathy.com
      </a>
    </p>
    
  </div>
</div>

<div className="d-flex gap-3 mb-4">
  <div style={iconCircle(C.lightBlue)}>
    <Clock size={20} style={{ color: C.blue }} />
  </div>
  <div>
    <h6 className="fw-bold mb-1" style={{ fontSize: "0.9rem" }}>
      Clinic Timings
    </h6>
    <p
      className="mb-0"
      style={{ color: C.muted, fontSize: "0.85rem" }}
    >
      Mon – Sun : 10:00 AM – 8:00 PM
    </p>
    <p
      className="mb-0"
      style={{ color: C.muted, fontSize: "0.85rem" }}
    >
      Get prior appointments
    </p>
  </div>
</div>



                <div className="d-flex gap-2 ct-socials">
                  <a 
  href="https://www.facebook.com/profile.php?id=61589741049622" 
  target="_blank" 
  rel="noopener noreferrer"
  style={iconCircle("#1877f2")}
>
  <FaFacebookF size={16} color="#fff" />
</a>

<a
  href="https://www.instagram.com/4health_homeopathy_salem/?__pwa=1"
  target="_blank"
  rel="noopener noreferrer"
  style={iconCircle("linear-gradient(45deg,#f09433,#dc2743,#bc1888)")}
>
  <FaInstagram size={16} color="#fff" />
</a>

<a 
  href="https://youtube.com/@4healthhomeopathy?si=2EAyIu-mVf0ar3AC" 
  target="_blank" 
  rel="noopener noreferrer"
  style={iconCircle("#ff0000")}
>
  <FaYoutube size={16} color="#fff" />
</a>

<a
  href="https://wa.me/919944844408"
  target="_blank"
  rel="noopener noreferrer"
  style={iconCircle(C.green)}
>
  <FaWhatsapp size={16} color="#fff" />
</a>
                </div>
              </div>
            </div>

            {/* Col 2 — Find Us + Why Choose Us (unchanged) */}
            <div className="col-lg-4 ct-reveal ct-location-col">
              <div
                className="bg-white rounded-4 shadow-sm p-4 mb-4 ct-map-card"
                style={{ border: `1px solid ${C.border}` }}
              >
                <h5 className="fw-bold mb-3" style={{ color: C.blueDark }}>
                  Find Us
                </h5>
                <div
                  className="rounded-3 overflow-hidden mb-3"
                  style={{ border: `1px solid ${C.border}` }}
                >
                  <iframe
                    className="ct-map-frame"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3907.2535378113676!2d78.1509157!3d11.6764355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf1b5cf76d97d%3A0xc5bc1b16e7dc4f01!2s4HEALTH%20HOMOEOPATHY%20CLINIC%20SALEM!5e0!3m2!1sen!2sin!4v1783942408707!5m2!1sen!2sin"
                    width="100%"
                    height="220"
                    style={{ border: 0, display: "block" }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="4Health Homeopathy Clinic Location"
                  />
                </div>
                <button
                  className="btn w-100 fw-semibold d-flex align-items-center justify-content-center gap-2 ct-directions-btn"
                  style={{
                    background: C.lightBlue,
                    color: C.blueDark,
                    border: "none",
                    borderRadius: "10px",
                    padding: "10px",
                  }}
                  onClick={() =>
                    window.open(
                      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15629.014143398152!2d78.13489275330137!3d11.67643563920456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf1b5cf76d97d%3A0xc5bc1b16e7dc4f01!2s4HEALTH%20HOMOEOPATHY%20CLINIC%20SALEM!5e0!3m2!1sen!2sin!4v1784279549685!5m2!1sen!2sin",
                      "_blank",
                    )
                  }
                >
                  Get Directions <ArrowRight size={14} />
                </button>
              </div>

              <div
                className="rounded-4 p-4 ct-why-card"
                style={{ background: C.lightGreen }}
              >
                <h5 className="fw-bold mb-3" style={{ color: C.blueDark }}>
                  Why Choose 4Health Homeopathy?
                </h5>
                {[
                  "Experienced & Caring Homeopaths",
                  "Personalized Treatment Plans",
                  "Natural, Safe & Side-effect Free",
                  "Online & In-clinic Consultations",
                  "Holistic Approach to Healing",
                ].map((item, i) => (
                  <div className="d-flex align-items-center gap-2 mb-2" key={i}>
                    <CheckCircle2
                      size={16}
                      style={{ color: C.green, flexShrink: 0 }}
                    />
                    <span style={{ color: C.blueDark, fontSize: "0.88rem" }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Col 3 — Contact Form (UPDATED submit logic only) */}
            <div className="col-lg-4 ct-reveal ct-form-col">
              <div
                className="bg-white rounded-4 shadow-sm p-4 h-100 ct-form-card"
                style={{ border: `1px solid ${C.border}` }}
              >
                <h5 className="fw-bold mb-1" style={{ color: C.blueDark }}>
                  Send Us a Message
                </h5>
                <p
                  className="mb-4"
                  style={{ color: C.muted, fontSize: "0.85rem" }}
                >
                  Have a question? Fill out the form and we'll get back to you
                  within 24 hours.
                </p>

                {/* ── FORM with API submit ── */}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <div className="input-group">
                      <span
                        className="input-group-text bg-white"
                        style={{
                          ...inputWrap,
                          borderRight: "none",
                          borderRadius: "10px 0 0 10px",
                        }}
                      >
                        <User size={16} style={{ color: C.green }} />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        style={{
                          ...inputWrap,
                          borderLeft: "none",
                          borderRadius: "0 10px 10px 0",
                          padding: "12px",
                          fontSize: "0.9rem",
                        }}
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Full Name"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="input-group">
                      <span
                        className="input-group-text bg-white"
                        style={{
                          ...inputWrap,
                          borderRight: "none",
                          borderRadius: "10px 0 0 10px",
                        }}
                      >
                        <Phone size={16} style={{ color: C.green }} />
                      </span>
                      <input
                        type="tel"
                        className="form-control"
                        style={{
                          ...inputWrap,
                          borderLeft: "none",
                          borderRadius: "0 10px 10px 0",
                          padding: "12px",
                          fontSize: "0.9rem",
                        }}
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Mobile Number"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="input-group">
                      <span
                        className="input-group-text bg-white"
                        style={{
                          ...inputWrap,
                          borderRight: "none",
                          borderRadius: "10px 0 0 10px",
                        }}
                      >
                        <Mail size={16} style={{ color: C.green }} />
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        style={{
                          ...inputWrap,
                          borderLeft: "none",
                          borderRadius: "0 10px 10px 0",
                          padding: "12px",
                          fontSize: "0.9rem",
                        }}
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="input-group">
                      <span
                        className="input-group-text bg-white align-items-start"
                        style={{
                          ...inputWrap,
                          borderRight: "none",
                          borderRadius: "10px 0 0 10px",
                          paddingTop: "12px",
                        }}
                      >
                        <MessageSquare size={16} style={{ color: C.green }} />
                      </span>
                      <textarea
                        className="form-control"
                        style={{
                          ...inputWrap,
                          borderLeft: "none",
                          borderRadius: "0 10px 10px 0",
                          padding: "12px",
                          fontSize: "0.9rem",
                          minHeight: "100px",
                          resize: "vertical",
                        }}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Write your message here..."
                        rows={3}
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn w-100 fw-bold text-white d-flex align-items-center justify-content-center gap-2 mb-3 ct-submit-btn"
                    style={{
                      background: `linear-gradient(120deg,${C.blueDark},${C.green})`,
                      border: "none",
                      borderRadius: "10px",
                      padding: "13px",
                      fontSize: "0.95rem",
                    }}
                    disabled={loading}
                  >
                    {loading ? (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                      />
                    ) : (
                      <>
                        <Send size={16} /> Send Message
                      </>
                    )}
                  </button>

                  <p
                    className="text-center mb-0 d-flex align-items-center justify-content-center gap-2"
                    style={{ color: C.muted, fontSize: "0.78rem" }}
                  >
                    <Lock size={12} /> Your information is safe and secure with
                    us.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 3 — FULL WIDTH FEATURE BAR (unchanged)
      ============================================================ */}
      <section
        className="py-5 ct-feature-section"
        style={{
          background: `linear-gradient(110deg,${C.blueDark} 0%,${C.blue} 55%,${C.green} 100%)`,
        }}
      >
        <div className="container">
          <div className="row g-4 text-center text-md-start ct-feature-row">
            {[
              {
                icon: <FaWhatsapp size={20} color="#fff" />,
                bg: C.green,
                title: "Chat on WhatsApp",
                sub: "Quick replies & easy communication",
              },
              {
                icon: <Mail size={20} color="#fff" />,
                bg: C.blue,
                title: "Email Us",
                sub: "We respond within 24 hours",
              },
              {
                icon: <Phone size={20} color="#fff" />,
                bg: "#178a8a",
                title: "Call Us",
                sub: "Speak directly with our team",
              },
              {
                icon: <ShieldCheck size={20} color="#fff" />,
                bg: C.blueDark,
                title: "Trusted & Secure",
                sub: "Your health is our top priority",
              },
            ].map((f, i) => (
              <div
                className="col-md-3 col-12 d-flex align-items-center gap-3 justify-content-center justify-content-md-start ct-feature-item"
                key={i}
              >
                <div style={iconCircle(f.bg)}>{f.icon}</div>
                <div>
                  <h6
                    className="fw-bold text-white mb-1"
                    style={{ fontSize: "0.92rem" }}
                  >
                    {f.title}
                  </h6>
                  <p
                    className="mb-0 text-white"
                    style={{ opacity: 0.85, fontSize: "0.76rem" }}
                  >
                    {f.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 4 — BOTTOM CTA STRIP (unchanged)
      ============================================================ */}
      <section
        className="py-5 position-relative ct-bottom-cta-section"
        style={{ background: C.bgSoft }}
      >
        <FaLeaf
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
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-4 px-4 py-4 rounded-4 bg-white shadow-sm ct-bottom-cta">
            <div className="ct-bottom-cta-copy">
              <h4 className="fw-bold mb-1" style={{ color: C.blueDark }}>
                We're Here to Support Your Healing Journey
              </h4>
              <p
                className="mb-0"
                style={{ color: C.muted, fontSize: "0.92rem" }}
              >
                Reach out today and take the first step towards a healthier you!
              </p>
            </div>
            <a
              href="https://wa.me/919944844408"
              target="_blank"
              rel="noreferrer"
              className="btn fw-bold text-white d-flex align-items-center gap-2 ct-bottom-cta-btn"
              style={{
                background: C.green,
                border: "none",
                borderRadius: "10px",
                padding: "13px 26px",
              }}
            >
              <FaWhatsapp size={16} /> Chat on WhatsApp Now
            </a>
          </div>
        </div>
      </section>

      <AppointmentPopup isOpen={popupOpen} onClose={() => setPopupOpen(false)} />
 
      <Footer />

      <style>{`
        .ct-reveal { opacity: 0; transform: translateY(24px); transition: opacity .6s ease, transform .6s ease; }
        .ct-reveal.ct-visible { opacity: 1; transform: translateY(0); }
        .form-control:focus { border-color: ${C.green} !important; box-shadow: 0 0 0 0.15rem rgba(75,168,106,0.2) !important; }

        /* =========================================================
           CONTACT — TABLET / MOBILE RESPONSIVE
           Desktop design and form/API logic remain unchanged.
        ========================================================= */

        @media (max-width: 991.98px) {
          .ct-hero,
          .ct-hero-row {
            min-height: auto !important;
          }

          .ct-hero-content {
            justify-content: center;
          }

          .ct-hero-inner {
            width: 100%;
            max-width: 680px;
          }

          .ct-details-section,
          .ct-feature-section,
          .ct-bottom-cta-section {
            padding-top: 42px !important;
            padding-bottom: 42px !important;
          }

          .ct-details-section .row {
            --bs-gutter-y: 20px;
          }
        }

        @media (max-width: 767.98px) {
          .ct-page .container {
            padding-left: 16px;
            padding-right: 16px;
          }

          /* Toast */
          .ct-toast {
            top: 12px !important;
            left: 12px !important;
            right: 12px !important;
            max-width: none !important;
            padding: 11px 14px !important;
            border-radius: 9px !important;
            font-size: 0.8rem !important;
          }

          /* Hero */
          .ct-hero {
            min-height: auto !important;
          }

          .ct-hero-row {
            min-height: auto !important;
          }

          .ct-hero-shapes {
            width: 100% !important;
            opacity: 0.55;
          }

          .ct-hero-content {
            padding: 32px 18px 38px !important;
            justify-content: flex-start;
          }

          .ct-hero-inner {
            max-width: 100%;
          }

          .ct-hero-inner > span {
            margin-bottom: 10px !important;
            font-size: 0.66rem !important;
          }

          .ct-hero-inner h1 {
            font-size: 30px !important;
            line-height: 1.14 !important;
            margin-bottom: 14px !important;
          }

          .ct-hero-inner h1 svg {
            width: 24px;
            height: 24px;
          }

          .ct-hero-inner > p {
            max-width: 100% !important;
            margin-bottom: 20px !important;
            font-size: 0.85rem !important;
            line-height: 1.65 !important;
          }

          .ct-hero-inner > p br {
            display: none;
          }

          .ct-hero-actions {
            display: grid !important;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 8px !important;
            width: 100%;
          }

          .ct-hero-btn {
            width: 100%;
            min-width: 0;
            min-height: 40px;
            justify-content: center;
            padding: 9px 7px !important;
            font-size: 0.68rem !important;
            line-height: 1.25;
            text-align: center;
          }

          .ct-hero-btn svg {
            width: 15px;
            height: 15px;
            flex-shrink: 0;
          }

          /* Details / cards */
          .ct-details-section,
          .ct-feature-section,
          .ct-bottom-cta-section {
            padding-top: 34px !important;
            padding-bottom: 34px !important;
          }

          .ct-details-section .row {
            --bs-gutter-y: 14px;
          }

          .ct-info-card,
          .ct-map-card,
          .ct-form-card,
          .ct-why-card {
            padding: 18px !important;
            border-radius: 16px !important;
          }

          .ct-info-card h5,
          .ct-map-card h5,
          .ct-form-card h5,
          .ct-why-card h5 {
            font-size: 1rem !important;
          }

          .ct-info-card h5 {
            margin-bottom: 18px !important;
          }

          .ct-info-card > .d-flex.gap-3 {
            gap: 11px !important;
            margin-bottom: 16px !important;
          }

          .ct-info-card > .d-flex.gap-3 > div:first-child {
            width: 38px !important;
            height: 38px !important;
            min-width: 38px;
          }

          .ct-info-card h6 {
            font-size: 0.82rem !important;
          }

          .ct-info-card p,
          .ct-info-card a {
            font-size: 0.77rem !important;
            line-height: 1.55 !important;
            overflow-wrap: anywhere;
          }

          .ct-socials {
            gap: 8px !important;
          }

          .ct-socials a {
            width: 38px !important;
            height: 38px !important;
          }

          /* Map */
          .ct-map-frame {
            height: 190px !important;
          }

          .ct-directions-btn {
            padding: 9px 12px !important;
            font-size: 0.78rem !important;
          }

          /* Why choose us */
          .ct-why-card {
            margin-top: 0;
          }

          .ct-why-card .d-flex {
            align-items: flex-start !important;
            gap: 8px !important;
            margin-bottom: 9px !important;
          }

          .ct-why-card span {
            font-size: 0.78rem !important;
            line-height: 1.45;
          }

          /* Contact form */
          .ct-form-card > p {
            margin-bottom: 16px !important;
            font-size: 0.78rem !important;
            line-height: 1.55 !important;
          }

          .ct-form-card form > .mb-3 {
            margin-bottom: 12px !important;
          }

          .ct-form-card form > .mb-4 {
            margin-bottom: 14px !important;
          }

          .ct-form-card .input-group-text {
            padding-left: 11px !important;
            padding-right: 8px !important;
          }

          .ct-form-card .form-control {
            min-width: 0;
            padding: 10px !important;
            font-size: 0.82rem !important;
          }

          .ct-form-card textarea.form-control {
            min-height: 90px !important;
          }

          .ct-submit-btn {
            padding: 10px 12px !important;
            font-size: 0.82rem !important;
            margin-bottom: 10px !important;
          }

          .ct-form-card form > p {
            align-items: flex-start !important;
            font-size: 0.69rem !important;
            line-height: 1.45;
          }

          /* Feature bar */
          .ct-feature-row {
            --bs-gutter-y: 10px;
          }

          .ct-feature-item {
            justify-content: flex-start !important;
            text-align: left !important;
            padding-top: 8px;
            padding-bottom: 8px;
          }

          .ct-feature-item > div:first-child {
            width: 40px !important;
            height: 40px !important;
            min-width: 40px;
          }

          .ct-feature-item h6 {
            font-size: 0.82rem !important;
          }

          .ct-feature-item p {
            font-size: 0.7rem !important;
            line-height: 1.4;
          }

          /* Bottom CTA */
          .ct-bottom-cta {
            padding: 18px !important;
            gap: 14px !important;
            border-radius: 15px !important;
          }

          .ct-bottom-cta-copy {
            width: 100%;
          }

          .ct-bottom-cta-copy h4 {
            font-size: 1rem !important;
            line-height: 1.35;
          }

          .ct-bottom-cta-copy p {
            font-size: 0.77rem !important;
            line-height: 1.5 !important;
          }

          .ct-bottom-cta-btn {
            width: auto;
            justify-content: center;
            padding: 10px 16px !important;
            font-size: 0.76rem !important;
          }
        }

        @media (max-width: 389.98px) {
          .ct-page .container {
            padding-left: 13px;
            padding-right: 13px;
          }

          .ct-hero-content {
            padding: 28px 14px 32px !important;
          }

          .ct-hero-inner h1 {
            font-size: 27px !important;
          }

          .ct-hero-actions {
            gap: 6px !important;
          }

          .ct-hero-btn {
            padding-left: 5px !important;
            padding-right: 5px !important;
            font-size: 0.62rem !important;
          }

          .ct-info-card,
          .ct-map-card,
          .ct-form-card,
          .ct-why-card {
            padding: 16px !important;
          }

          .ct-bottom-cta-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

export default Contact;