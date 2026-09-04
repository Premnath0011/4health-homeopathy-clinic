import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Apiurl from "../AdminPanel/Environmnet/Apiurl";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Play,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Quote,
  Calendar,
} from "lucide-react";
import { FaLeaf, FaGoogle, FaYoutube } from "react-icons/fa";
import Footer from "./Footer/Footer";

// ── Local assets ──────────────────────────────────────────────
import bannerImage from "../../assets/Image/Testimonials/banner_image-2.webp";
import leafPng from "../../assets/Image/Home/Leaf.png";
import potImg from "../../assets/Image/Home/pot-img.png";

// ── Brand tokens ──────────────────────────────────────────────
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

const CASE_FILTERS = [
  "All Cases",
  "Skin Conditions",
  "Hair Disorders",
  "Respiratory Issues",
  "Children's Health",
  "Women's Health",
  "Chronic Diseases",
];

// ── Star renderer ─────────────────────────────────────────────
const Stars = ({ count = 5, size = 16 }) => (
  <span>
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={size}
        fill={i < count ? "#f5a623" : "none"}
        color={i < count ? "#f5a623" : "#ccc"}
      />
    ))}
  </span>
);

// ── Google "G" logo ───────────────────────────────────────────
const GoogleG = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48">
    <path
      fill="#EA4335"
      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
    />
    <path
      fill="#4285F4"
      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
    />
    <path
      fill="#FBBC05"
      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
    />
    <path
      fill="#34A853"
      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.35-8.16 2.35-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
    />
    <path fill="none" d="M0 0h48v48H0z" />
  </svg>
);

// ══════════════════════════════════════════════════════════════
// BEFORE / AFTER SLIDER COMPONENT
// ══════════════════════════════════════════════════════════════
const BeforeAfterSlider = ({ before, after }) => {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.getBoundingClientRect().width);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  const getPercent = useCallback((clientX) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    return (x / rect.width) * 100;
  }, []);

  const onMouseDown = (e) => {
    e.preventDefault();
    setDragging(true);
  };
  const onMouseMove = useCallback(
    (e) => {
      if (dragging) setPos(getPercent(e.clientX));
    },
    [dragging, getPercent],
  );
  const onMouseUp = useCallback(() => setDragging(false), []);

  const onTouchStart = () => setDragging(true);
  const onTouchMove = useCallback(
    (e) => {
      if (dragging) setPos(getPercent(e.touches[0].clientX));
    },
    [dragging, getPercent],
  );
  const onTouchEnd = useCallback(() => setDragging(false), []);

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
      window.addEventListener("touchmove", onTouchMove, { passive: true });
      window.addEventListener("touchend", onTouchEnd);
    }
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [dragging, onMouseMove, onMouseUp, onTouchMove, onTouchEnd]);

  return (
    <div
      ref={containerRef}
      className="tm-before-after-slider"
      style={{
        position: "relative",
        width: "100%",
        height: 200,
        overflow: "hidden",
        borderRadius: "12px 12px 0 0",
        cursor: dragging ? "grabbing" : "col-resize",
        userSelect: "none",
        background: "#ddd",
      }}
    >
      {/* After image — full width base */}
      <img
        src={after}
        alt="After"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          pointerEvents: "none",
          userSelect: "none",
        }}
        draggable={false}
      />

      {/* Before image — clipped to pos% */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          width: `${pos}%`,
          overflow: "hidden",
        }}
      >
        <img
          src={before}
          alt="Before"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: containerWidth || "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            pointerEvents: "none",
            userSelect: "none",
          }}
          draggable={false}
        />
      </div>

      {/* Labels */}
      <span
        className="tm-slider-label tm-slider-label-before"
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 4,
          background: "rgba(15,61,110,0.82)",
          color: "#fff",
          fontSize: "0.62rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          padding: "3px 9px",
          borderRadius: 6,
          pointerEvents: "none",
          display: pos > 5 ? "block" : "none",
        }}
      >
        BEFORE
      </span>
      <span
        className="tm-slider-label tm-slider-label-after"
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 4,
          background: "rgba(75,168,106,0.88)",
          color: "#fff",
          fontSize: "0.62rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          padding: "3px 9px",
          borderRadius: 6,
          pointerEvents: "none",
          display: pos < 95 ? "block" : "none",
        }}
      >
        AFTER
      </span>

      {/* Divider line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: `${pos}%`,
          width: 2,
          background: "#fff",
          zIndex: 5,
          transform: "translateX(-50%)",
          pointerEvents: "none",
          boxShadow: "0 0 6px rgba(0,0,0,0.3)",
        }}
      />

      {/* Drag handle */}
      <div
        className="tm-slider-handle"
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        style={{
          position: "absolute",
          top: "50%",
          left: `${pos}%`,
          transform: "translate(-50%, -50%)",
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "#fff",
          zIndex: 6,
          boxShadow: "0 2px 12px rgba(0,0,0,0.22)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "col-resize",
          border: `2px solid ${C.border}`,
          gap: 2,
        }}
      >
        <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
          <path
            d="M7 1L2 7L7 13"
            stroke={C.blueDark}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
          <path
            d="M3 1L8 7L3 13"
            stroke={C.blueDark}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────
export default function Testimonial() {
  const navigate = useNavigate();

  // ── Reviews ──
  const [reviewPage, setReviewPage] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const reviewsPerPage = 3;

  // ── Cases ──
  const [caseFilter, setCaseFilter] = useState("All Cases");
  const [cases, setCases] = useState([]);
  const [casesLoading, setCasesLoading] = useState(true);

  // ── Videos ──
  const [videos, setVideos] = useState([]);
  const [videosLoading, setVideosLoading] = useState(true);

  // ── Video play modal ──
  const [playingVideo, setPlayingVideo] = useState(null);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  // ── Fetch reviews ──
  useEffect(() => {
    const load = async () => {
      try {
        setReviewsLoading(true);
        // const res = await axios.get(`${Apiurl}/testimonial`);
        const res = await axios.get(`${Apiurl}/google-reviews`);
        const active = (res.data || []).filter(
          (r) => r.test_status === "active",
        );
        setReviews(res.data || []);
      } catch {
        setReviews([]);
      } finally {
        setReviewsLoading(false);
      }
    };
    load();
  }, []);

  // ── Fetch cases ──
  useEffect(() => {
    const load = async () => {
      try {
        setCasesLoading(true);
        const res = await axios.get(`${Apiurl}/evidence-of-progress`);
        const active = (res.data || []).filter(
          (c) => c.eop_status === "active",
        );
        setCases(active);
      } catch {
        setCases([]);
      } finally {
        setCasesLoading(false);
      }
    };
    load();
  }, []);

  // ── Fetch videos ──
  useEffect(() => {
    const load = async () => {
      try {
        setVideosLoading(true);
        const res = await axios.get(`${Apiurl}/video-testimonial`);
        const active = (res.data || []).filter(
          (v) => v.vid_status === "active",
        );
        setVideos(active);
      } catch {
        setVideos([]);
      } finally {
        setVideosLoading(false);
      }
    };
    load();
  }, []);

  // ── Scroll reveal ──
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("tm-visible");
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll(".tm-reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [reviews, cases, videos]);

  // ── Close modal on Escape key ──
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setPlayingVideo(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const visibleReviews = reviews.slice(
    reviewPage * reviewsPerPage,
    reviewPage * reviewsPerPage + reviewsPerPage,
  );
  const totalPages = Math.max(1, Math.ceil(reviews.length / reviewsPerPage));

  const filteredCases =
    caseFilter === "All Cases"
      ? cases
      : cases.filter((c) => c.category === caseFilter);

  return (
    <div
      className="tm-page"
      style={{
        fontFamily: "'Poppins', sans-serif",
        color: "#233143",
        overflowX: "hidden",
        background: "#fff",
      }}
    >
      {/* ═══════════════════════════════════════════════════════
          SECTION 1 — HERO BANNER
      ═══════════════════════════════════════════════════════ */}
      <section
        className="tm-hero"
        style={{
          background:
            "linear-gradient(180deg,#ffffff 0%,#f8fbfd 25%,#edf6fb 60%,#c3f5cb 100%)",
          padding: "clamp(40px, 5vw, 80px) 0 0",
          position: "relative",
          overflow: "hidden",
          borderBottomLeftRadius: "clamp(30px, 5vw, 80px)",
          borderBottomRightRadius: "clamp(30px, 5vw, 80px)",
          minHeight: 480,
        }}
      >
        <img
          src={leafPng}
          alt=""
          aria-hidden="true"
          className="d-none d-md-block"
          style={{
            position: "absolute",
            top: -30,
            right: -30,
            width: "clamp(140px,15vw,220px)",
            opacity: 0.5,
            pointerEvents: "none",
            zIndex: 1,
            transform: "rotate(20deg)",
          }}
        />
        <img
          src={leafPng}
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: -20,
            left: -40,
            width: "clamp(100px,12vw,150px)",
            opacity: 0.65,
            pointerEvents: "none",
            zIndex: 0,
            transform: "rotate(-30deg)",
          }}
        />
        <img
          src={leafPng}
          alt=""
          aria-hidden="true"
          className="d-none d-lg-block"
          style={{
            position: "absolute",
            top: "40%",
            left: "15%",
            width: 90,
            opacity: 0.15,
            pointerEvents: "none",
            zIndex: 0,
            transform: "rotate(45deg)",
            animation: "floatLeaf 6s ease-in-out infinite",
          }}
        />
        <img
          src={potImg}
          alt=""
          aria-hidden="true"
          className="d-none d-lg-block"
          style={{
            position: "absolute",
            top: 40,
            right: 200,
            width: 120,
            opacity: 0.18,
            pointerEvents: "none",
            zIndex: 2,
            mixBlendMode: "multiply",
            filter: "saturate(0.6) brightness(1.2)",
          }}
        />
        <img
          src={potImg}
          alt=""
          aria-hidden="true"
          className="d-none d-md-block"
          style={{
            position: "absolute",
            bottom: "clamp(16px,4vw,32px)",
            left: "clamp(16px,4vw,48px)",
            width: "clamp(70px,9vw,110px)",
            opacity: 0.88,
            pointerEvents: "none",
            zIndex: 3,
            filter: "drop-shadow(0 8px 20px rgba(15,61,110,0.18))",
            animation: "floatPot 5s ease-in-out infinite",
          }}
        />

        <div className="container-fluid px-0" style={{ maxWidth: "100%" }}>
          <div
            className="row g-0 align-items-center tm-hero-row"
            style={{
              minHeight: 460,
              position: "relative",
              zIndex: 2,
              maxWidth: 1200,
              margin: "0 auto",
              padding: "0 15px",
            }}
          >
            {/* TEXT COLUMN — full width on mobile/tablet, half on desktop */}
            <div
              className="col-lg-6 col-12 d-flex align-items-center tm-reveal tm-hero-content"
              style={{
                padding: "clamp(30px,5vw,60px) 15px clamp(50px,8vw,80px)",
                position: "relative",
                zIndex: 2,
              }}
            >
              <div className="tm-hero-inner">
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
                  Patient Testimonials
                </span>

                <h1
                  style={{
                    fontSize: "clamp(30px,4.5vw,58px)",
                    fontWeight: 800,
                    color: C.blueDark,
                    lineHeight: 1.1,
                    margin: "0 0 18px",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Real Stories
                  <br />
                  Real Healing
                  <br />
                  <span style={{ color: C.green }}>Real Results</span>
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
                  Discover how personalized homeopathic care has transformed the
                  lives of our patients through verified reviews, documented
                  progress reports, and inspiring video testimonials.
                </p>

                <div
                  className="tm-hero-actions"
                  style={{ display: "flex", flexWrap: "wrap", gap: 12 }}
                >
                  <a
                    className="tm-hero-btn"
                    href="https://share.google/hEkZiJyFikI3VM1xo"
                    target="_blank"
                    rel="noreferrer"
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
                      textDecoration: "none",
                      boxShadow: "0 2px 12px rgba(15,61,110,0.08)",
                    }}
                  >
                    <GoogleG size={20} /> View Google Reviews
                  </a>
                  <button
                    className="tm-hero-btn"
                    onClick={() =>
                      document
                        .getElementById("tm-videos")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
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
                    <Play size={16} fill={C.green} color={C.green} /> Watch
                    Patient Stories
                  </button>
                </div>
              </div>
            </div>

            {/* IMAGE COLUMN — hidden on mobile/tablet, visible only from lg upward
                (same pattern as Service.jsx hero banner column: d-none d-lg-*) */}
            <div
              className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center tm-reveal"
              style={{
                position: "relative",
                minHeight: "clamp(250px,50vw,480px)",
                padding: "0 15px",
              }}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 500 500"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "88%",
                  maxWidth: 480,
                  zIndex: 0,
                  pointerEvents: "none",
                }}
              >
                <ellipse
                  cx="250"
                  cy="260"
                  rx="220"
                  ry="230"
                  fill="url(#tmBlobGrad)"
                  opacity="0.55"
                />
                <defs>
                  <radialGradient id="tmBlobGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#D6EAF8" />
                    <stop offset="100%" stopColor="#AED6F1" />
                  </radialGradient>
                </defs>
              </svg>

              <img
                src={leafPng}
                alt=""
                aria-hidden="true"
                style={{
                  position: "absolute",
                  right: -20,
                  top: "50%",
                  transform: "translateY(-50%) rotate(-15deg)",
                  width: "clamp(180px,28vw,300px)",
                  opacity: 0.18,
                  zIndex: 1,
                  pointerEvents: "none",
                }}
              />

              <img
                src={bannerImage}
                alt="Happy family healed through homeopathy"
                style={{
                  position: "relative",
                  zIndex: 2,
                  width: "122%",
                  maxWidth: 720,
                  height: "auto",
                  maxHeight: "clamp(340px,60vw,620px)",
                  objectFit: "contain",
                  objectPosition: "center bottom",
                  display: "block",
                  transform: "translateX(-2%) translateY(10px)",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 2 — WHAT OUR PATIENTS SAY (live Google Reviews)
      ═══════════════════════════════════════════════════════ */}
      <section className="py-5 tm-reviews-section" style={{ background: "#fff" }}>
        <div className="container">
          <div className="text-center mb-4 tm-reveal">
            <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
              <span
                style={{ fontWeight: 700, color: C.muted, fontSize: "0.85rem" }}
              >
                01
              </span>
              <FaLeaf style={{ color: C.green, fontSize: "0.9rem" }} />
            </div>
            <h2
              className="fw-bold"
              style={{ color: C.blueDark, fontSize: "clamp(22px,3vw,34px)" }}
            >
              What Our <span style={{ color: C.green }}>Patients</span> Say
            </h2>
            <div
              style={{
                width: 50,
                height: 3,
                background: C.green,
                borderRadius: 2,
                margin: "10px auto 0",
              }}
            />
          </div>

          <div className="row align-items-start g-3 tm-reveal">
            {/* Rating column */}
            <div className="col-lg-3 col-md-4 d-flex flex-column tm-rating-column">
              {/* Rating Card */}
              <div
                className="rounded-4 p-4 d-flex flex-column justify-content-center align-items-start w-100 tm-rating-card"
                style={{
                  background: C.bgSoft,
                  border: `1px solid ${C.border}`,
                }}
              >
                <GoogleG size={42} />

                <div
                  className="mt-3"
                  style={{
                    fontSize: "3.2rem",
                    fontWeight: 800,
                    color: C.blueDark,
                    lineHeight: 1,
                  }}
                >
                  4.9
                  <span style={{ fontSize: "1.4rem", color: C.muted }}>/5</span>
                </div>

                <div className="mt-2">
                  <Stars count={5} size={20} />
                </div>

                <p
                  className="mt-2 mb-3"
                  style={{
                    color: C.muted,
                    fontSize: "0.82rem",
                  }}
                >
                  Based on <strong>500+</strong>
                  <br />
                  Google Reviews
                </p>

                <a
                  href="https://www.google.com/search?sca_esv=630b63d3aa865027&rlz=1C1JJTC_enIN1138IN1138&sxsrf=APpeQntfnvqyfq9CvMu_om_FoBK06_97-g:1784199088676&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-_0vhqBYtqzwQ2A0tXOSqXG1qs9KtacgFncC-tFUf1ubJjfNImxuP6fcTlgbfFkplZMtNPcGuVo4SQFcXI-ED3Fxm5YFAGZpwQAHYMZvRRT-GkF9R9Crz55FK9vkEWYJU5a0XeCI%3D&q=4HEALTH+HOMOEOPATHY+CLINIC+SALEM+Reviews&sa=X&ved=2ahUKEwiihI7Hg9eVAxVE3TgGHf6cHJUQ0bkNegQIKRAH&biw=1366&bih=633&dpr=1"
                  target="_blank"
                  rel="noreferrer"
                  className="btn d-flex align-items-center gap-2 fw-semibold"
                  style={{
                    background: C.lightGreen,
                    color: C.greenDark,
                    border: "none",
                    borderRadius: "10px",
                    padding: "9px 16px",
                    fontSize: "0.82rem",
                  }}
                >
                  <GoogleG size={14} />
                  Read All Reviews on Google
                </a>
              </div>

              {/* Pagination */}
              <div className="d-flex align-items-center justify-content-between mt-4 px-2">
                <button
                  onClick={() => setReviewPage((p) => Math.max(0, p - 1))}
                  className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: 38,
                    height: 38,
                    border: `1.5px solid ${C.border}`,
                    background: reviewPage === 0 ? C.blueDark : C.white,
                    color: reviewPage === 0 ? C.white : C.blueDark,
                    padding: 0,
                  }}
                  disabled={reviewPage === 0}
                >
                  <ChevronLeft size={16} />
                </button>

                <div className="d-flex gap-2 align-items-center">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setReviewPage(i)}
                      style={{
                        width: i === reviewPage ? 22 : 10,
                        height: 10,
                        borderRadius: 5,
                        background: i === reviewPage ? C.green : C.border,
                        border: "none",
                        padding: 0,
                        transition: "all 0.3s ease",
                      }}
                    />
                  ))}
                </div>

                <button
                  onClick={() =>
                    setReviewPage((p) => Math.min(totalPages - 1, p + 1))
                  }
                  className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: 38,
                    height: 38,
                    border: `1.5px solid ${C.border}`,
                    background:
                      reviewPage === totalPages - 1 ? C.greenDark : C.white,
                    color: reviewPage === totalPages - 1 ? C.white : C.blueDark,
                    padding: 0,
                  }}
                  disabled={reviewPage === totalPages - 1}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Review cards */}
            <div className="col-lg-9 col-md-8">
              <div className="position-relative">
                {reviewsLoading ? (
                  <p style={{ color: C.muted, fontSize: "0.85rem" }}>
                    Loading reviews...
                  </p>
                ) : reviews.length === 0 ? (
                  <p style={{ color: C.muted, fontSize: "0.85rem" }}>
                    No reviews yet.
                  </p>
                ) : (
                  <>
                    <div className="row g-3">
                      {visibleReviews.map((r) => (
                        <div
                          className="col-lg-4 col-md-12 col-12 d-flex tm-review-card-col"
                          key={r._id}
                        >
                          <div
                            className="rounded-4 p-3 d-flex flex-column w-100"
                            style={{
                              border: `1px solid ${C.border}`,
                              boxShadow: "0 2px 16px rgba(15,61,110,0.05)",
                            }}
                          >
                            <div className="d-flex align-items-center gap-2 mb-2">
                              <img
                                src={r.profile_photo_url}
                                alt={r.author_name}
                                className="img-fluid rounded-circle"
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  objectFit: "cover",
                                  flexShrink: 0,
                                  border: "2px solid #e9ecef",
                                }}
                              />
                              <div className="d-flex flex-column">
                                <Stars count={r.rating} size={14} />

                                <span
                                  style={{
                                    fontSize: "12px",
                                    color: "#6c757d",
                                    marginTop: "0px",
                                  }}
                                >
                                  {r.relative_time_description}
                                </span>
                              </div>
                            </div>
                            <p
                              className="flex-grow-1 mb-3"
                              style={{
                                color: "#3a4a5a",
                                fontSize: "0.84rem",
                                lineHeight: 1.65,
                                fontStyle: "italic",
                              }}
                            >
                              {r.text}
                            </p>
                            <div>
                              <div
                                className="fw-bold"
                                style={{
                                  color: C.blueDark,
                                  fontSize: "0.88rem",
                                }}
                              >
                                — {r.author_name}
                              </div>
                              <div className="d-flex align-items-center gap-1 mt-1">
                                <CheckCircle
                                  size={13}
                                  style={{ color: C.green }}
                                />
                                <span
                                  style={{
                                    color: C.muted,
                                    fontSize: "0.75rem",
                                  }}
                                >
                                  Verified Google Review
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Nav arrows */}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Quote banner */}
          <div
            className="rounded-4 mt-4 py-4 px-4 d-flex flex-wrap align-items-center gap-4 tm-reveal tm-review-quote"
            style={{
              background: `linear-gradient(120deg,${C.blueDark} 0%,${C.blue} 60%,${C.green} 130%)`,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <FaLeaf
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                fontSize: 100,
                color: "#fff",
                opacity: 0.06,
                transform: "rotate(20deg)",
                pointerEvents: "none",
              }}
            />
            <div
              className="d-flex align-items-start gap-3"
              style={{
                flex: 1,
                minWidth: 240,
                position: "relative",
                zIndex: 1,
              }}
            >
              <Quote
                size={28}
                color="rgba(255,255,255,0.7)"
                style={{ flexShrink: 0, marginTop: 2 }}
              />
              <p
                className="mb-0 text-white"
                style={{
                  fontSize: "0.95rem",
                  lineHeight: 1.65,
                  fontStyle: "italic",
                  opacity: 0.93,
                }}
              >
                Every review reflects a journey toward better health, renewed
                hope, and improved quality of life.
              </p>
            </div>
            <p
              className="mb-0 text-white"
              style={{
                fontSize: "0.9rem",
                lineHeight: 1.65,
                maxWidth: 360,
                opacity: 0.88,
                position: "relative",
                zIndex: 1,
              }}
            >
              Your trust inspires us to continue providing compassionate,
              individualized homeopathic care.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 3 — EVIDENCE OF PROGRESS (live from backend)
      ═══════════════════════════════════════════════════════ */}
      <section className="py-5 tm-evidence-section" style={{ background: C.bgSoft }}>
        <div className="container">
          <div className="text-center mb-4 tm-reveal">
            <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
              <span
                style={{ fontWeight: 700, color: C.muted, fontSize: "0.85rem" }}
              >
                02
              </span>
              <FaLeaf style={{ color: C.green, fontSize: "0.9rem" }} />
            </div>
            <h2
              className="fw-bold"
              style={{ color: C.blueDark, fontSize: "clamp(22px,3vw,34px)" }}
            >
              Evidence of <span style={{ color: C.green }}>Progress</span>
            </h2>
            <p
              className="mt-2 mb-0"
              style={{ color: C.muted, fontSize: "0.93rem" }}
            >
              Drag the slider to reveal the transformation. Documented outcomes
              <br className="d-none d-md-block" />
              through individualized homeopathic treatment.
            </p>
          </div>

          {/* Category filters */}
          <div className="d-flex flex-wrap gap-2 justify-content-center mb-4 tm-reveal tm-case-filters">
            {CASE_FILTERS.filter(
              (f) => f === "All Cases" || cases.some((c) => c.category === f),
            ).map((f) => (
              <button
                key={f}
                onClick={() => setCaseFilter(f)}
                className="btn btn-sm fw-semibold"
                style={{
                  borderRadius: "20px",
                  padding: "7px 16px",
                  fontSize: "0.82rem",
                  background: caseFilter === f ? C.green : C.white,
                  color: caseFilter === f ? "#fff" : C.muted,
                  border: `1.5px solid ${
                    caseFilter === f ? C.green : C.border
                  }`,
                  transition: "all 0.2s",
                }}
              >
                {f}
              </button>
            ))}
          </div>

          {casesLoading ? (
            <p
              className="text-center"
              style={{ color: C.muted, fontSize: "0.85rem" }}
            >
              Loading case studies...
            </p>
          ) : filteredCases.length === 0 ? (
            <p
              className="text-center"
              style={{ color: C.muted, fontSize: "0.85rem" }}
            >
              No case studies available for this category.
            </p>
          ) : (
            <div className="row g-4 tm-evidence-grid">
              {filteredCases.map((cs, i) => (
                <div
                  className="col-lg-3 col-md-6 col-6 tm-reveal tm-evidence-col"
                  key={cs._id}
                  style={{ transitionDelay: `${i * 0.07}s` }}
                >
                  <div
                    className="rounded-4 bg-white h-100 tm-evidence-card"
                    style={{
                      border: `1px solid ${C.border}`,
                      boxShadow: "0 4px 20px rgba(15,61,110,0.06)",
                      overflow: "hidden",
                    }}
                  >
                    <BeforeAfterSlider
                      before={
                        cs.before_image
                          ? `${Apiurl.replace("/api", "")}${cs.before_image}`
                          : ""
                      }
                      after={
                        cs.after_image
                          ? `${Apiurl.replace("/api", "")}${cs.after_image}`
                          : ""
                      }
                    />

                    <div
                      className="d-flex align-items-center justify-content-center gap-1 py-2 tm-drag-hint"
                      style={{
                        background: "#f4f8f5",
                        borderBottom: `1px solid ${C.border}`,
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M4 7H10M10 7L8 5M10 7L8 9"
                          stroke={C.green}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M10 7H4M4 7L6 5M4 7L6 9"
                          stroke={C.muted}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span
                        style={{
                          fontSize: "0.72rem",
                          color: C.muted,
                          fontWeight: 500,
                        }}
                      >
                        Drag to compare Before & After
                      </span>
                    </div>

                    <div className="p-3 tm-case-content">
                      <div className="mb-2">
                        <span style={{ color: C.muted, fontSize: "0.78rem" }}>
                          Condition:{" "}
                        </span>
                        <span
                          style={{
                            color: C.blueDark,
                            fontSize: "0.82rem",
                            fontWeight: 600,
                          }}
                        >
                          {cs.condition}
                        </span>
                      </div>
                      <div className="mb-2">
                        <span style={{ color: C.muted, fontSize: "0.78rem" }}>
                          Duration:{" "}
                        </span>
                        <span
                          style={{
                            color: C.blueDark,
                            fontSize: "0.82rem",
                            fontWeight: 600,
                          }}
                        >
                          {cs.duration}
                        </span>
                      </div>
                      <div className="mb-3">
                        <span style={{ color: C.muted, fontSize: "0.78rem" }}>
                          Outcome:{" "}
                        </span>
                        <span style={{ color: C.muted, fontSize: "0.82rem" }}>
                          {cs.outcome}
                        </span>
                      </div>
                      <button
                        onClick={() => navigate("/appointment")}
                        className="btn btn-sm d-flex align-items-center gap-2 fw-semibold tm-case-study-button"
                        style={{
                          background: "none",
                          color: C.green,
                          border: "none",
                          padding: "4px 0",
                          fontSize: "0.82rem",
                        }}
                      >
                        View Full Case Study <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="d-flex align-items-center gap-2 justify-content-center mt-4 tm-reveal tm-privacy-note">
            <ShieldCheck size={16} style={{ color: C.green, flexShrink: 0 }} />
            <p className="mb-0" style={{ color: C.muted, fontSize: "0.8rem" }}>
              Patient identities are protected. All reports are shared with
              informed consent while maintaining confidentiality.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 4 — QUOTE BANNER (static)
      ═══════════════════════════════════════════════════════ */}
      <section
        className="py-5 position-relative overflow-hidden tm-center-quote-section"
        style={{ background: "#fff" }}
      >
        <FaLeaf
          className="position-absolute"
          style={{
            top: 10,
            left: 30,
            fontSize: 120,
            color: C.green,
            opacity: 0.07,
            transform: "rotate(-15deg)",
            pointerEvents: "none",
          }}
        />
        <FaLeaf
          className="position-absolute d-none d-md-block"
          style={{
            bottom: 10,
            right: 30,
            fontSize: 110,
            color: C.green,
            opacity: 0.07,
            transform: "rotate(20deg)",
            pointerEvents: "none",
          }}
        />
        <div className="container text-center tm-reveal">
          <h2
            className="fw-bold"
            style={{
              color: C.blueDark,
              fontSize: "clamp(20px,3vw,34px)",
              maxWidth: 620,
              margin: "0 auto 16px",
            }}
          >
            Behind every report is a person who regained confidence, comfort,
            and quality of life.
          </h2>
          <div
            style={{
              width: 44,
              height: 3,
              background: C.green,
              borderRadius: 2,
              margin: "0 auto",
            }}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 5 — VIDEO TESTIMONIALS (live from backend)
      ═══════════════════════════════════════════════════════ */}
      <section
        id="tm-videos"
        className="py-5 tm-videos-section"
        style={{ background: C.bgSoft }}
      >
        <div className="container">
          <div className="text-center mb-4 tm-reveal">
            <h2
              className="fw-bold"
              style={{ color: C.blueDark, fontSize: "clamp(22px,3vw,34px)" }}
            >
              Hear Their <span style={{ color: C.green }}>Healing</span> Journey
            </h2>
            <p
              className="mt-2 mb-0"
              style={{ color: C.muted, fontSize: "0.93rem" }}
            >
              Watch our patients share their experiences in their own words.
            </p>
          </div>

          {videosLoading ? (
            <p
              className="text-center"
              style={{ color: C.muted, fontSize: "0.85rem" }}
            >
              Loading videos...
            </p>
          ) : videos.length === 0 ? (
            <p
              className="text-center"
              style={{ color: C.muted, fontSize: "0.85rem" }}
            >
              No video testimonials available yet.
            </p>
          ) : (
            <div className="row g-3">
              {videos.map((v, i) => (
                <div
                  className="col-lg-3 col-md-4 col-6 tm-reveal tm-video-col"
                  key={v._id}
                  style={{ transitionDelay: `${i * 0.07}s` }}
                >
                  <div>
                    {/* ── Thumbnail — click to play ── */}
                    <div
                      className="position-relative rounded-3 overflow-hidden mb-2 tm-video-thumb"
                      style={{ cursor: "pointer" }}
                      onClick={() => setPlayingVideo(v)}
                    >
                      {v.thumbnail_image ? (
                        <img
                          src={`${Apiurl.replace("/api", "")}${v.thumbnail_image}`}
                          alt={v.patient_name}
                          className="w-100"
                          style={{
                            height: 140,
                            objectFit: "cover",
                            display: "block",
                            transition: "transform 0.3s",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.transform = "scale(1.04)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.transform = "scale(1)")
                          }
                        />
                      ) : (
                        <div
                          style={{
                            height: 140,
                            background: C.bgSoft,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Play size={28} color={C.muted} />
                        </div>
                      )}

                      {/* Featured badge */}
                      {v.featured && (
                        <span
                          className="position-absolute top-0 start-0 fw-bold text-white px-2 py-1"
                          style={{
                            background: C.green,
                            fontSize: "0.65rem",
                            borderBottomRightRadius: 8,
                            zIndex: 2,
                          }}
                        >
                          Patient Story
                        </span>
                      )}

                      {/* Play button overlay */}
                      <div
                        className="position-absolute top-50 start-50 translate-middle d-flex align-items-center justify-content-center rounded-circle"
                        style={{
                          width: 44,
                          height: 44,
                          background: "rgba(255,255,255,0.92)",
                          boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
                          transition: "transform 0.2s",
                          zIndex: 3,
                        }}
                      >
                        <Play
                          size={16}
                          fill={C.green}
                          color={C.green}
                          style={{ marginLeft: 2 }}
                        />
                      </div>
                    </div>

                    <div
                      className="fw-bold"
                      style={{ color: C.blueDark, fontSize: "0.88rem" }}
                    >
                      {v.patient_name}
                    </div>
                    <div style={{ color: C.muted, fontSize: "0.76rem" }}>
                      {v.condition}
                    </div>
                    <div style={{ color: C.muted, fontSize: "0.75rem" }}>
                      Treatment Duration: {v.duration}
                    </div>
                    <button
                      className="btn btn-sm mt-1 d-flex align-items-center gap-1 fw-semibold p-0"
                      style={{
                        background: "none",
                        border: "none",
                        color: v.featured ? C.green : C.muted,
                        fontSize: "0.78rem",
                      }}
                      onClick={() => setPlayingVideo(v)}
                    >
                      {v.featured ? "Watch Full Story" : "Watch Story"}{" "}
                      <ArrowRight size={11} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-4 tm-reveal">
            <button
              className="btn fw-semibold d-inline-flex align-items-center gap-2 tm-view-more-btn"
              style={{
                background: C.white,
                color: C.blueDark,
                border: `1.5px solid ${C.border}`,
                borderRadius: "10px",
                padding: "11px 28px",
                fontSize: "0.9rem",
                boxShadow: "0 2px 12px rgba(15,61,110,0.07)",
              }}
            >
              <Play size={15} fill={C.green} color={C.green} /> View More Videos
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 6 — BOTTOM CTA BANNER (static)
      ═══════════════════════════════════════════════════════ */}
      <section className="py-5 tm-bottom-cta-section" style={{ background: C.bgSoft }}>
        <div className="container">
          <div
            className="d-flex flex-wrap align-items-center justify-content-between gap-4 rounded-4 p-4 tm-reveal tm-bottom-cta"
            style={{
              background: `linear-gradient(120deg,${C.blueDark} 0%,${C.blue} 55%,${C.green} 130%)`,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <FaLeaf
              style={{
                position: "absolute",
                right: 10,
                top: -10,
                fontSize: 140,
                color: "#fff",
                opacity: 0.06,
                transform: "rotate(20deg)",
                pointerEvents: "none",
              }}
            />
            <FaLeaf
              style={{
                position: "absolute",
                right: 80,
                bottom: -25,
                fontSize: 90,
                color: "#fff",
                opacity: 0.05,
                transform: "rotate(-15deg)",
                pointerEvents: "none",
              }}
            />

            <div
              className="d-flex align-items-center gap-4 position-relative tm-bottom-cta-copy"
              style={{ zIndex: 1, flex: 1, minWidth: 240 }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.18)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Calendar size={26} color="#fff" />
              </div>
              <div>
                <h3
                  className="fw-bold text-white mb-1"
                  style={{ fontSize: "clamp(17px,2.5vw,23px)" }}
                >
                  Your Healing Story Could Be Next
                </h3>
                <p
                  className="mb-0 text-white"
                  style={{
                    opacity: 0.85,
                    fontSize: "0.88rem",
                    maxWidth: 400,
                    lineHeight: 1.6,
                  }}
                >
                  Thousands of patients have chosen 4Health Homeopathy for
                  compassionate, individualized care focused on lasting
                  wellness.
                </p>
              </div>
            </div>

            <div
              className="d-flex gap-3 flex-wrap position-relative tm-bottom-cta-actions"
              style={{ zIndex: 1 }}
            >
              <button
                onClick={() => navigate("/#")}
                className="btn fw-bold tm-bottom-cta-btn"
                style={{
                  background: C.white,
                  color: C.blueDark,
                  border: "none",
                  borderRadius: "10px",
                  padding: "13px 28px",
                  fontSize: "0.9rem",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                }}
              >
                Book Consultation
              </button>
              <button
                onClick={() => navigate("/contact-us")}
                className="btn fw-bold tm-bottom-cta-btn"
                style={{
                  background: "transparent",
                  color: C.white,
                  border: "1.5px solid rgba(255,255,255,0.6)",
                  borderRadius: "10px",
                  padding: "13px 28px",
                  fontSize: "0.9rem",
                }}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* ═══════════════════════════════════════════════════════
          VIDEO PLAY MODAL
      ═══════════════════════════════════════════════════════ */}
      {playingVideo && (
        <div
          className="tm-video-modal"
          onClick={() => setPlayingVideo(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.88)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            backdropFilter: "blur(6px)",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: 18,
              overflow: "hidden",
              maxWidth: 740,
              width: "100%",
              boxShadow: "0 24px 80px rgba(0,0,0,0.45)",
              animation: "modalIn 0.22s ease",
            }}
          >
            {/* Modal header */}
            <div
              style={{
                padding: "14px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: `1px solid ${C.border}`,
              }}
            >
              <div>
                <div
                  style={{
                    fontWeight: 700,
                    color: C.blueDark,
                    fontSize: "0.97rem",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  {playingVideo.patient_name}
                </div>
                <div style={{ color: C.muted, fontSize: "0.78rem" }}>
                  {playingVideo.condition}
                  {playingVideo.duration ? ` · ${playingVideo.duration}` : ""}
                </div>
              </div>
              <button
                onClick={() => setPlayingVideo(null)}
                style={{
                  background: C.bgSoft,
                  border: `1px solid ${C.border}`,
                  borderRadius: "50%",
                  width: 34,
                  height: 34,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  color: C.muted,
                  flexShrink: 0,
                }}
                aria-label="Close video"
              >
                ×
              </button>
            </div>

            {/* Video player */}
            {playingVideo.video_file ? (
              <video
                src={`${Apiurl.replace("/api", "")}${playingVideo.video_file}`}
                controls
                autoPlay
                style={{
                  width: "100%",
                  display: "block",
                  maxHeight: 440,
                  background: "#000",
                }}
              />
            ) : (
              /* No video file — show thumbnail with "not available" */
              <div
                style={{
                  position: "relative",
                  background: "#000",
                  minHeight: 280,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 14,
                }}
              >
                {playingVideo.thumbnail_image && (
                  <img
                    src={`${Apiurl.replace("/api", "")}${playingVideo.thumbnail_image}`}
                    alt={playingVideo.patient_name}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      opacity: 0.35,
                    }}
                  />
                )}
                <div
                  style={{
                    position: "relative",
                    zIndex: 1,
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 12px",
                    }}
                  >
                    <Play size={26} color="#fff" />
                  </div>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.8)",
                      fontSize: "0.85rem",
                      margin: 0,
                    }}
                  >
                    Video file not available yet.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        .tm-reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .tm-reveal.tm-visible {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes floatLeaf {
          0%,100% { transform: rotate(45deg) translateY(0); }
          50%      { transform: rotate(55deg) translateY(-15px); }
        }
        @keyframes floatPot {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.94) translateY(16px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        /* =========================================================
           TESTIMONIAL — TABLET / MOBILE RESPONSIVE
           Desktop styles remain unchanged.
        ========================================================= */

        @media (max-width: 991.98px) {
          .tm-hero,
          .tm-hero-row {
            min-height: auto !important;
          }

          .tm-hero-content {
            justify-content: center;
          }

          .tm-hero-inner {
            width: 100%;
            max-width: 660px;
          }

          .tm-reviews-section,
          .tm-evidence-section,
          .tm-center-quote-section,
          .tm-videos-section,
          .tm-bottom-cta-section {
            padding-top: 42px !important;
            padding-bottom: 42px !important;
          }

          .tm-rating-card {
            padding: 20px !important;
          }

          .tm-bottom-cta {
            gap: 22px !important;
          }
        }

        @media (max-width: 767.98px) {
          .tm-page .container {
            padding-left: 16px;
            padding-right: 16px;
          }

          /* Hero */
          .tm-hero {
            min-height: auto !important;
            padding: 20px 0 0 !important;
            border-bottom-left-radius: 28px !important;
            border-bottom-right-radius: 28px !important;
          }

          .tm-hero-row {
            min-height: auto !important;
            padding: 0 4px !important;
          }

          .tm-hero-content {
            padding: 28px 12px 38px !important;
          }

          .tm-hero-inner > span {
            margin-bottom: 10px !important;
            font-size: 0.66rem !important;
          }

          .tm-hero-inner h1 {
            font-size: 30px !important;
            line-height: 1.12 !important;
            margin-bottom: 14px !important;
          }

          .tm-hero-inner > p {
            max-width: 100% !important;
            margin-bottom: 20px !important;
            font-size: 0.86rem !important;
            line-height: 1.65 !important;
          }

          .tm-hero-actions {
            display: grid !important;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 8px !important;
            width: 100%;
          }

          .tm-hero-btn {
            width: 100%;
            min-width: 0;
            justify-content: center;
            padding: 9px 7px !important;
            font-size: 0.69rem !important;
            line-height: 1.25;
            text-align: center;
          }

          .tm-hero-btn svg {
            flex-shrink: 0;
          }

          /* Shared section spacing */
          .tm-reviews-section,
          .tm-evidence-section,
          .tm-center-quote-section,
          .tm-videos-section,
          .tm-bottom-cta-section {
            padding-top: 34px !important;
            padding-bottom: 34px !important;
          }

          .tm-page h2 {
            line-height: 1.25;
          }

          /* Reviews */
          .tm-rating-column {
            margin-bottom: 8px;
          }

          .tm-rating-card {
            padding: 18px !important;
            align-items: center !important;
            text-align: center;
          }

          .tm-rating-card > a {
            justify-content: center;
            width: auto;
            max-width: 100%;
            padding: 8px 13px !important;
            font-size: 0.75rem !important;
          }

          .tm-rating-column > .d-flex.mt-4 {
            margin-top: 14px !important;
            margin-bottom: 6px;
          }

          .tm-review-card-col > div {
            padding: 14px !important;
          }

          .tm-review-quote {
            padding: 18px !important;
            gap: 12px !important;
          }

          .tm-review-quote > div {
            min-width: 0 !important;
            gap: 10px !important;
          }

          .tm-review-quote p {
            max-width: 100% !important;
            font-size: 0.8rem !important;
            line-height: 1.55 !important;
          }

          /* Evidence of Progress */
          .tm-evidence-section .text-center.mb-4 {
            margin-bottom: 18px !important;
          }

          .tm-evidence-section .text-center.mb-4 > p {
            font-size: 0.82rem !important;
            line-height: 1.55 !important;
          }

          .tm-case-filters {
            flex-wrap: nowrap !important;
            justify-content: flex-start !important;
            overflow-x: auto;
            padding: 0 1px 6px;
            margin-bottom: 16px !important;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }

          .tm-case-filters::-webkit-scrollbar {
            display: none;
          }

          .tm-case-filters .btn {
            flex: 0 0 auto;
            padding: 6px 12px !important;
            font-size: 0.7rem !important;
            white-space: nowrap;
          }

          /* REQUIRED: 2 Evidence cards in one mobile row */
          .tm-evidence-grid {
            --bs-gutter-x: 10px;
            --bs-gutter-y: 10px;
          }

          .tm-evidence-col {
            display: flex;
          }

          .tm-evidence-card {
            width: 100%;
            border-radius: 12px !important;
          }

          .tm-before-after-slider {
            height: 128px !important;
            border-radius: 11px 11px 0 0 !important;
          }

          .tm-slider-label {
            top: 6px !important;
            font-size: 0.48rem !important;
            letter-spacing: 0.04em !important;
            padding: 2px 5px !important;
            border-radius: 4px !important;
          }

          .tm-slider-label-before {
            left: 6px !important;
          }

          .tm-slider-label-after {
            right: 6px !important;
          }

          .tm-slider-handle {
            width: 30px !important;
            height: 30px !important;
            gap: 0 !important;
            border-width: 1px !important;
          }

          .tm-slider-handle svg {
            width: 8px;
            height: 12px;
          }

          .tm-drag-hint {
            min-height: 34px;
            padding: 5px 3px !important;
            gap: 3px !important;
            text-align: center;
          }

          .tm-drag-hint svg {
            width: 12px;
            height: 12px;
            flex-shrink: 0;
          }

          .tm-drag-hint span {
            font-size: 0.53rem !important;
            line-height: 1.25;
          }

          .tm-case-content {
            padding: 9px !important;
          }

          .tm-case-content .mb-2 {
            margin-bottom: 5px !important;
            line-height: 1.25;
          }

          .tm-case-content .mb-3 {
            margin-bottom: 7px !important;
            line-height: 1.3;
          }

          .tm-case-content span {
            font-size: 0.64rem !important;
            overflow-wrap: anywhere;
          }

          .tm-case-study-button {
            gap: 3px !important;
            padding: 2px 0 !important;
            font-size: 0.59rem !important;
            line-height: 1.2 !important;
            text-align: left;
            white-space: normal;
          }

          .tm-case-study-button svg {
            width: 10px;
            height: 10px;
            flex-shrink: 0;
          }

          .tm-privacy-note {
            align-items: flex-start !important;
            padding: 0 4px;
            margin-top: 18px !important;
          }

          .tm-privacy-note p {
            font-size: 0.7rem !important;
            line-height: 1.5;
            text-align: left;
          }

          /* Center quote */
          .tm-center-quote-section h2 {
            font-size: 20px !important;
            line-height: 1.38 !important;
            margin-bottom: 12px !important;
          }

          /* Videos — keep 2 per row */
          .tm-videos-section .text-center.mb-4 {
            margin-bottom: 18px !important;
          }

          .tm-video-col {
            padding-left: 5px;
            padding-right: 5px;
          }

          .tm-video-thumb {
            margin-bottom: 7px !important;
          }

          .tm-video-thumb > img,
          .tm-video-thumb > div:first-child {
            height: 112px !important;
          }

          .tm-video-col .fw-bold {
            font-size: 0.78rem !important;
            line-height: 1.3;
          }

          .tm-video-col button {
            font-size: 0.68rem !important;
          }

          .tm-view-more-btn {
            padding: 9px 17px !important;
            font-size: 0.78rem !important;
          }

          /* Bottom CTA */
          .tm-bottom-cta {
            padding: 18px !important;
            gap: 16px !important;
            border-radius: 14px !important;
          }

          .tm-bottom-cta-copy {
            width: 100%;
            min-width: 0 !important;
            gap: 12px !important;
            align-items: flex-start !important;
          }

          .tm-bottom-cta-copy > div:first-child {
            width: 46px !important;
            height: 46px !important;
          }

          .tm-bottom-cta-copy > div:first-child svg {
            width: 20px;
            height: 20px;
          }

          .tm-bottom-cta-copy h3 {
            font-size: 17px !important;
            line-height: 1.3;
          }

          .tm-bottom-cta-copy p {
            font-size: 0.77rem !important;
            line-height: 1.55 !important;
          }

          .tm-bottom-cta-actions {
            width: 100%;
            display: grid !important;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 8px !important;
          }

          .tm-bottom-cta-btn {
            width: 100%;
            padding: 10px 8px !important;
            font-size: 0.72rem !important;
            white-space: nowrap;
          }

          .tm-video-modal {
            padding: 12px !important;
          }
        }

        @media (max-width: 389.98px) {
          .tm-page .container {
            padding-left: 12px;
            padding-right: 12px;
          }

          .tm-hero-content {
            padding-left: 10px !important;
            padding-right: 10px !important;
          }

          .tm-hero-btn {
            font-size: 0.63rem !important;
            padding-left: 5px !important;
            padding-right: 5px !important;
          }

          .tm-evidence-grid {
            --bs-gutter-x: 8px;
            --bs-gutter-y: 8px;
          }

          .tm-before-after-slider {
            height: 112px !important;
          }

          .tm-drag-hint {
            min-height: 38px;
          }

          .tm-drag-hint span {
            font-size: 0.48rem !important;
          }

          .tm-case-content {
            padding: 8px !important;
          }

          .tm-case-content span {
            font-size: 0.59rem !important;
          }

          .tm-case-study-button {
            font-size: 0.54rem !important;
          }

          .tm-video-thumb > img,
          .tm-video-thumb > div:first-child {
            height: 100px !important;
          }

          .tm-bottom-cta-btn {
            font-size: 0.66rem !important;
            padding-left: 5px !important;
            padding-right: 5px !important;
          }
        }
      `}</style>
    </div>
  );
}