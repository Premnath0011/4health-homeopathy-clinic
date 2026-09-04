// Gallery.jsx — 4Health Homeopathy
// Enhanced with Masonry Collage Layout, Advanced Animations, and Premium UI

import React, { useEffect, useMemo, useState, useCallback, useRef } from "react";
import axios from "axios";
import { FiX, FiChevronLeft, FiChevronRight, FiZoomIn, FiCalendar, FiGrid, FiLayout, FiCamera, FiAlertTriangle, FiSearch, FiImage } from "react-icons/fi";
import { FaWhatsapp, FaHospital, FaPills, FaLeaf, FaHeartbeat, FaStar } from "react-icons/fa";
import Footer from "./Footer/Footer";
import AppointmentPopup from "./Appoinmnet/Appoinmnetpop";
import Apiurl from "../AdminPanel/Environmnet/Apiurl";
import galleryBanner from "../../assets/Image/Service/service-banner.webp";

// ── Design Tokens ──
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
  gradient: "linear-gradient(135deg, #0F3D6E 0%, #4BA86A 100%)",
};

const font = "'Poppins', sans-serif";

// ── Categories (icons instead of emojis) ──
const CATEGORIES = [
  { key: "all", label: "All", icon: <FiImage size={15} /> },
  { key: "clinic", label: "Clinic", icon: <FaHospital size={14} /> },
  { key: "treatments", label: "Treatments", icon: <FaPills size={14} /> },
  { key: "wellness", label: "Wellness", icon: <FaLeaf size={14} /> },
  { key: "care", label: "Patient Care", icon: <FaHeartbeat size={14} /> },
  { key: "results", label: "Results", icon: <FaStar size={14} /> },
];

const apiOrigin = Apiurl.replace(/\/api\/?$/, "");
const resolveGalleryImage = (image) => {
  if (!image) return "";
  if (/^https?:\/\//i.test(image)) return image;
  return `${apiOrigin}${image.startsWith("/") ? image : `/${image}`}`;
};

function Gallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [viewMode, setViewMode] = useState("collage"); // 'collage' or 'grid'
  const [galleryItems, setGalleryItems] = useState([]);
  const [galleryLoading, setGalleryLoading] = useState(true);
  const [galleryError, setGalleryError] = useState("");
  const galleryRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let mounted = true;

    const loadGallery = async () => {
      try {
        setGalleryLoading(true);
        setGalleryError("");
        const response = await axios.get(`${Apiurl}/gallery?status=Active`);
        if (!mounted) return;

        const items = (Array.isArray(response.data) ? response.data : []).map((item) => ({
          ...item,
          id: item._id,
          src: resolveGalleryImage(item.image),
          size: item.size || "medium",
        }));
        setGalleryItems(items);
      } catch (error) {
        if (!mounted) return;
        setGalleryError(error.response?.data?.message || "Unable to load gallery images");
        setGalleryItems([]);
      } finally {
        if (mounted) setGalleryLoading(false);
      }
    };

    loadGallery();
    return () => { mounted = false; };
  }, []);

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return galleryItems;
    return galleryItems.filter((item) => item.category === activeCategory);
  }, [activeCategory, galleryItems]);

  // Scroll reveal with Intersection Observer
  // Re-run after gallery data loads and whenever category/view changes.
  useEffect(() => {
    if (galleryLoading || galleryError) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("gl-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "50px" }
    );

    const galleryElement = galleryRef.current;
    const cards = galleryElement
      ? galleryElement.querySelectorAll(".gl-reveal:not(.gl-visible)")
      : [];

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [
    activeCategory,
    viewMode,
    filteredItems.length,
    galleryLoading,
    galleryError,
  ]);

  const openLightbox = useCallback((idx) => setLightboxIndex(idx), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const showPrev = useCallback(
    (e) => {
      e.stopPropagation();
      setLightboxIndex((i) => (i === 0 ? filteredItems.length - 1 : i - 1));
    },
    [filteredItems.length]
  );

  const showNext = useCallback(
    (e) => {
      e.stopPropagation();
      setLightboxIndex((i) => (i === filteredItems.length - 1 ? 0 : i + 1));
    },
    [filteredItems.length]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev(e);
      if (e.key === "ArrowRight") showNext(e);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  const categoryLabel = (key) => CATEGORIES.find((c) => c.key === key)?.label || key;
  const categoryIcon = (key) => CATEGORIES.find((c) => c.key === key)?.icon || <FiImage size={14} />;

  // Get size class for collage
  const getSizeClass = (size) => {
    switch(size) {
      case "large": return "gl-item-large";
      case "medium": return "gl-item-medium";
      default: return "gl-item-small";
    }
  };

  return (
    <div style={{ fontFamily: font, background: C.white, overflowX: "hidden" }}>
      {/* ════════════════════════════════════════
          BANNER - Desktop / Tablet only
          Mobile view: hidden completely
      ════════════════════════════════════════ */}
      <section className="gl-hero">
        <div className="container">
          <div className="row align-items-center gl-hero-row">
            {/* Left content */}
            <div className="col-lg-6 col-12 gl-hero-copy">
              <div className="gl-banner-content">
                <span className="gl-hero-eyebrow gl-reveal gl-visible">
                  <FiCamera size={15} /> Our Gallery
                </span>

                <h1 className="gl-hero-title gl-reveal gl-visible">
                  Visual Stories of
                  <br />
                  <span>Healing &amp; Hope</span>
                </h1>

                <p className="gl-hero-description gl-reveal gl-visible">
                  Explore our clinic, treatments, wellness programs, and real
                  patient transformations — each image tells a story of care and
                  recovery.
                </p>
              </div>
            </div>

            {/* Right image - same split hero pattern used across other pages */}
            <div className="col-lg-6 d-none d-lg-flex gl-hero-image-col">
              <div className="gl-hero-image-wrap gl-reveal gl-visible">
                <div className="gl-hero-image-shape" />
                <img
                  src={galleryBanner}
                  alt="4Health Homeopathy Gallery"
                  className="gl-hero-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FILTER TABS - Enhanced with Icons & Animation
      ════════════════════════════════════════ */}
      <section 
        style={{ 
          position: "sticky", 
          top: 0, 
          zIndex: 20, 
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${C.border}`,
          boxShadow: "0 4px 20px rgba(15,61,110,0.06)"
        }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px 0",
              flexWrap: "wrap",
              gap: "12px"
            }}
          >
            <div
              className="gl-tabs-scroll"
              style={{
                display: "flex",
                gap: 8,
                overflowX: "auto",
                flex: 1,
                minWidth: "200px",
              }}
            >
              {CATEGORIES.map((cat, idx) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`gl-tab-btn ${activeCategory === cat.key ? "active" : ""}`}
                  style={{
                    flexShrink: 0,
                    padding: "10px 20px",
                    borderRadius: 30,
                    border: "1.5px solid transparent",
                    background: activeCategory === cat.key ? C.gradient : "transparent",
                    color: activeCategory === cat.key ? "#fff" : C.text,
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    fontFamily: font,
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    whiteSpace: "nowrap",
                    boxShadow: activeCategory === cat.key ? "0 8px 25px rgba(75,168,106,0.3)" : "none",
                    transform: activeCategory === cat.key ? "scale(1.02)" : "scale(1)",
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  <span style={{ marginRight: 8, display: "inline-flex", alignItems: "center" }}>{cat.icon}</span>
                  {cat.label}
                  <span
                    style={{
                      marginLeft: 8,
                      fontSize: "0.7rem",
                      opacity: 0.7,
                      background: activeCategory === cat.key ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.05)",
                      padding: "2px 8px",
                      borderRadius: 12,
                    }}
                  >
                    {cat.key === "all" ? galleryItems.length : galleryItems.filter((i) => i.category === cat.key).length}
                  </span>
                </button>
              ))}
            </div>
            
            {/* View Toggle */}
            <div style={{ display: "flex", gap: 6, background: C.lightBg, padding: 4, borderRadius: 12 }}>
              <button
                onClick={() => setViewMode("collage")}
                style={{
                  padding: "8px 14px",
                  borderRadius: 10,
                  border: "none",
                  background: viewMode === "collage" ? C.green : "transparent",
                  color: viewMode === "collage" ? "#fff" : C.muted,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  fontSize: "0.85rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontWeight: 500,
                }}
              >
                <FiLayout size={16} /> Collage
              </button>
              <button
                onClick={() => setViewMode("grid")}
                style={{
                  padding: "8px 14px",
                  borderRadius: 10,
                  border: "none",
                  background: viewMode === "grid" ? C.green : "transparent",
                  color: viewMode === "grid" ? "#fff" : C.muted,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  fontSize: "0.85rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontWeight: 500,
                }}
              >
                <FiGrid size={16} /> Grid
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          GALLERY - Masonry Collage Layout
      ════════════════════════════════════════ */}
      <section style={{ padding: "60px 0 80px", background: C.lightBg }}>
        <div className="container">
          {galleryLoading && (
            <div className="gl-dynamic-state">
              <div className="gl-dynamic-loader" />
              <p>Loading gallery images...</p>
            </div>
          )}

          {!galleryLoading && galleryError && (
            <div className="gl-dynamic-state gl-dynamic-error">
              <FiAlertTriangle size={44} style={{ color: C.muted }} />
              <h3>Gallery could not be loaded</h3>
              <p>{galleryError}</p>
            </div>
          )}

          {!galleryLoading && !galleryError && (
          <div 
            ref={galleryRef}
            className={`gl-gallery ${viewMode === "collage" ? "gl-collage" : "gl-grid-mode"}`}
            style={{
              display: "grid",
              gridTemplateColumns: viewMode === "collage" 
                ? "repeat(4, 1fr)" 
                : "repeat(auto-fill, minmax(280px, 1fr))",
              gap: viewMode === "collage" ? 12 : 22,
              gridAutoRows: viewMode === "collage" ? "180px" : "auto",
            }}
          >
            {filteredItems.map((item, idx) => {
              const sizeClass = viewMode === "collage" ? getSizeClass(item.size) : "";
              return (
                <div
                  key={item.id}
                  className={`gl-reveal gl-card ${sizeClass}`}
                  style={{
                    transitionDelay: `${Math.min(idx, 12) * 0.05}s`,
                    gridRow: viewMode === "collage" ? (() => {
                      if (item.size === "large") return "span 2.4";
                      if (item.size === "medium") return "span 1.6";
                      return "span 1";
                    })() : "auto",
                    gridColumn: viewMode === "collage" ? (() => {
                      if (item.size === "large") return "span 2";
                      if (item.size === "medium") return "span 1.5";
                      return "span 1";
                    })() : "auto",
                  }}
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => openLightbox(idx)}
                >
                  <div className="gl-card-inner">
                    <img src={item.src} alt={item.title} loading="lazy" />
                    <div className="gl-card-overlay">
                      <div className="gl-card-top">
                        <span className="gl-card-badge">
                          {categoryIcon(item.category)} {categoryLabel(item.category)}
                        </span>
                        <span className="gl-card-zoom">
                          <FiZoomIn size={16} />
                        </span>
                      </div>
                      <div className="gl-card-bottom">
                        <p className="gl-card-title">{item.title}</p>
                        <div className="gl-card-hover-line" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          )}

          {!galleryLoading && !galleryError && filteredItems.length === 0 && (
            <div style={{ 
              textAlign: "center", 
              padding: "80px 0",
              background: C.white,
              borderRadius: 20,
              border: `2px dashed ${C.border}`,
            }}>
              <FiSearch size={48} style={{ display: "block", margin: "0 auto 16px", color: C.muted }} />
              <h3 style={{ color: C.text, marginBottom: 8 }}>No images found</h3>
              <p style={{ color: C.muted }}>Try selecting a different category</p>
            </div>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════
          STATS SECTION
      ════════════════════════════════════════ */}
      <section style={{ padding: "60px 0", background: C.white }}>
        <div className="container">
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 30,
            textAlign: "center",
          }}>
            {[
              { number: galleryItems.filter((item) => item.category === "treatments").length, label: "Treatment Images", icon: <FaPills size={16} /> },
              { number: galleryItems.filter((item) => item.category === "clinic").length, label: "Clinic Photos", icon: <FaHospital size={16} /> },
              { number: galleryItems.filter((item) => item.category === "wellness").length, label: "Wellness Images", icon: <FaLeaf size={16} /> },
              { number: galleryItems.filter((item) => item.category === "results").length, label: "Patient Results", icon: <FaStar size={16} /> },
            ].map((stat, idx) => (
              <div key={idx} className="gl-reveal" style={{ transitionDelay: `${idx * 0.1}s` }}>
                <div style={{ fontSize: "2.8rem", fontWeight: 800, background: C.gradient, 
                            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  {stat.number}
                </div>
                <div style={{ fontSize: "0.9rem", color: C.muted, marginTop: 4, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  {stat.icon} {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CTA STRIP - Enhanced
      ════════════════════════════════════════ */}
      <section className="py-5" style={{ background: C.lightBg }}>
        <div className="container">
          <div
            className="gl-reveal"
            style={{
              background: C.gradient,
              borderRadius: 24,
              padding: "50px 40px",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
              boxShadow: "0 20px 60px rgba(75,168,106,0.25)",
            }}
          >
            <div style={{ color: "#fff" }}>
              <h3 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: 8 }}>
                Ready to Start Your Healing Journey?
              </h3>
              <p style={{ opacity: 0.9, fontSize: "1rem", margin: 0 }}>
                Book a consultation with our expert homeopaths today.
              </p>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                style={{
                  padding: "14px 28px",
                  borderRadius: 14,
                  background: "#25D366",
                  color: "#fff",
                  textDecoration: "none",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  transition: "all 0.3s ease",
                  boxShadow: "0 8px 25px rgba(37,211,102,0.35)",
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-3px) scale(1.02)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                <FaWhatsapp size={18} /> WhatsApp
              </a>
              <button
                onClick={() => setPopupOpen(true)}
                style={{
                  padding: "14px 28px",
                  borderRadius: 14,
                  background: "#fff",
                  color: C.blueDark,
                  border: "none",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  transition: "all 0.3s ease",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-3px) scale(1.02)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                <FiCalendar size={18} /> Book Appointment
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          LIGHTBOX - Enhanced
      ════════════════════════════════════════ */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div className="gl-lightbox" onClick={closeLightbox}>
          <button className="gl-lightbox-close" onClick={closeLightbox} aria-label="Close">
            <FiX size={22} />
          </button>
          <button className="gl-lightbox-nav gl-lightbox-prev" onClick={showPrev} aria-label="Previous">
            <FiChevronLeft size={24} />
          </button>

          <div className="gl-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <div className="gl-lightbox-image-wrapper">
              <img src={filteredItems[lightboxIndex].src} alt={filteredItems[lightboxIndex].title} />
            </div>
            <div className="gl-lightbox-caption">
              <span className="gl-lightbox-badge" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                {categoryIcon(filteredItems[lightboxIndex].category)} {categoryLabel(filteredItems[lightboxIndex].category)}
              </span>
              <p>{filteredItems[lightboxIndex].title}</p>
              <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)" }}>
                {lightboxIndex + 1} / {filteredItems.length}
              </span>
            </div>
          </div>

          <button className="gl-lightbox-nav gl-lightbox-next" onClick={showNext} aria-label="Next">
            <FiChevronRight size={24} />
          </button>
        </div>
      )}

      <AppointmentPopup isOpen={popupOpen} onClose={() => setPopupOpen(false)} />
      <Footer />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

        .gl-dynamic-state {
          min-height: 330px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          background: #fff;
          border: 2px dashed ${C.border};
          border-radius: 20px;
          color: ${C.muted};
          text-align: center;
        }
        .gl-dynamic-state h3, .gl-dynamic-state p { margin: 0; }
        .gl-dynamic-loader {
          width: 42px;
          height: 42px;
          border: 4px solid ${C.greenLight};
          border-top-color: ${C.green};
          border-radius: 50%;
          animation: glDynamicSpin .8s linear infinite;
        }
        @keyframes glDynamicSpin { to { transform: rotate(360deg); } }

        /* ── Reveal Animations ──
           Fixed: removed the "scale" transform so grid/masonry cells keep
           their exact position and size while fading in — this stops the
           image tiles from drifting out of alignment while scrolling. */
        .gl-reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), 
                      transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: opacity, transform;
        }
        .gl-reveal.gl-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── Gallery Hero ── */
        .gl-hero {
          position: relative;
          overflow: hidden;
          background: linear-gradient(
            180deg,
            #ffffff 0%,
            #f8fbfd 30%,
            #edf6fb 68%,
            #e8f5ed 100%
          );
          border-bottom-left-radius: 64px;
          border-bottom-right-radius: 64px;
        }

        .gl-hero::before {
          content: "";
          position: absolute;
          width: 340px;
          height: 340px;
          border-radius: 50%;
          right: -120px;
          top: -140px;
          background: rgba(75,168,106,0.10);
          pointer-events: none;
        }

        .gl-hero::after {
          content: "";
          position: absolute;
          width: 260px;
          height: 260px;
          border-radius: 50%;
          left: -130px;
          bottom: -150px;
          background: rgba(15,107,175,0.08);
          pointer-events: none;
        }

        .gl-hero-row {
          position: relative;
          z-index: 1;
          min-height: 470px;
          padding-top: 38px;
          padding-bottom: 38px;
        }

        .gl-hero-copy {
          display: flex;
          align-items: center;
          padding-right: 34px;
        }

        .gl-banner-content {
          max-width: 535px;
        }

        .gl-hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 7px 14px;
          margin-bottom: 16px;
          border-radius: 999px;
          background: ${C.greenLight};
          border: 1px solid rgba(75,168,106,0.18);
          color: ${C.greenDark};
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.11em;
          text-transform: uppercase;
        }

        .gl-hero-title {
          margin: 0 0 17px;
          color: ${C.blueDark};
          font-size: clamp(38px, 4.2vw, 58px);
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: -0.025em;
        }

        .gl-hero-title span {
          color: ${C.green};
        }

        .gl-hero-description {
          max-width: 500px;
          margin: 0;
          color: ${C.muted};
          font-size: 0.96rem;
          line-height: 1.75;
        }

        .gl-hero-image-col {
          align-items: center;
          justify-content: center;
          min-height: 390px;
          padding-left: 24px;
        }

        .gl-hero-image-wrap {
          position: relative;
          width: 100%;
          max-width: 520px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .gl-hero-image-shape {
          position: absolute;
          width: 92%;
          height: 92%;
          right: -12px;
          bottom: -14px;
          border-radius: 42% 58% 46% 54% / 58% 42% 58% 42%;
          background: linear-gradient(
            145deg,
            rgba(174,214,241,0.55),
            rgba(195,245,203,0.72)
          );
          transform: rotate(-4deg);
        }

        .gl-hero-image {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 350px;
          display: block;
          object-fit: cover;
          object-position: center;
          border-radius: 28px 76px 28px 76px;
          box-shadow: 0 22px 55px rgba(15,61,110,0.16);
        }

        @media (max-width: 991.98px) {
          .gl-hero-row {
            min-height: 360px;
            padding-top: 46px;
            padding-bottom: 46px;
          }

          .gl-hero-copy {
            padding-right: 12px;
          }

          .gl-banner-content {
            max-width: 650px;
          }

          .gl-hero-title {
            font-size: clamp(34px, 6vw, 48px);
          }
        }

        /* Mobile: keep the banner content, hide only the banner image */
        @media (max-width: 767.98px) {
          .gl-hero {
            display: block !important;
            border-bottom-left-radius: 28px;
            border-bottom-right-radius: 28px;
          }

          .gl-hero-row {
            min-height: auto;
            padding-top: 34px;
            padding-bottom: 34px;
          }

          .gl-hero-copy {
            padding-left: 16px;
            padding-right: 16px;
          }

          .gl-banner-content {
            max-width: 100%;
          }

          .gl-hero-eyebrow {
            margin-bottom: 12px;
            padding: 6px 12px;
            font-size: 0.66rem;
          }

          .gl-hero-title {
            margin-bottom: 12px;
            font-size: 30px;
            line-height: 1.14;
          }

          .gl-hero-description {
            max-width: 100%;
            font-size: 0.84rem;
            line-height: 1.65;
          }

          .gl-hero-image-col {
            display: none !important;
          }

          .gl-hero::before {
            width: 220px;
            height: 220px;
            right: -120px;
            top: -110px;
          }

          .gl-hero::after {
            width: 180px;
            height: 180px;
            left: -110px;
            bottom: -120px;
          }
        }

        @media (max-width: 420px) {
          .gl-hero-row {
            padding-top: 28px;
            padding-bottom: 30px;
          }

          .gl-hero-copy {
            padding-left: 14px;
            padding-right: 14px;
          }

          .gl-hero-title {
            font-size: 27px;
          }

          .gl-hero-description {
            font-size: 0.8rem;
          }
        }

        /* ── Tabs ── */
        .gl-tabs-scroll::-webkit-scrollbar { height: 3px; }
        .gl-tabs-scroll::-webkit-scrollbar-thumb { 
          background: ${C.green}; 
          border-radius: 4px; 
        }
        .gl-tabs-scroll::-webkit-scrollbar-track { background: ${C.lightBg}; }

        .gl-tab-btn {
          position: relative;
          overflow: hidden;
        }
        .gl-tab-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: ${C.gradient};
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 30px;
        }
        .gl-tab-btn:not(.active):hover::before {
          opacity: 0.08;
        }
        .gl-tab-btn:not(.active):hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(15,61,110,0.08);
        }
        .gl-tab-btn.active {
          box-shadow: 0 8px 30px rgba(75,168,106,0.35);
        }

        /* ── Cards ── */
        .gl-card {
          cursor: pointer;
          border-radius: 16px;
          overflow: hidden;
          position: relative;
        }

        .gl-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(15,61,110,0.08);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          background: ${C.white};
        }
        .gl-card:hover .gl-card-inner {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 20px 50px rgba(15,61,110,0.2);
        }

        .gl-card-inner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .gl-card:hover .gl-card-inner img {
          transform: scale(1.12);
        }

        .gl-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(15,61,110,0.9) 0%, rgba(15,61,110,0.2) 50%, rgba(15,61,110,0) 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 18px;
        }
        .gl-card:hover .gl-card-overlay {
          opacity: 1;
        }

        .gl-card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .gl-card-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border-radius: 20px;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(8px);
          color: #fff;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.03em;
          border: 1px solid rgba(255,255,255,0.15);
          transform: translateY(-10px);
          opacity: 0;
          transition: all 0.3s ease 0.05s;
        }
        .gl-card:hover .gl-card-badge {
          transform: translateY(0);
          opacity: 1;
        }

        .gl-card-zoom {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(255,255,255,0.92);
          color: ${C.blueDark};
          display: flex;
          align-items: center;
          justify-content: center;
          transform: scale(0.6) rotate(-30deg);
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        .gl-card:hover .gl-card-zoom {
          transform: scale(1) rotate(0deg);
          opacity: 1;
        }

        .gl-card-bottom {
          transform: translateY(12px);
          opacity: 0;
          transition: all 0.4s ease 0.08s;
        }
        .gl-card:hover .gl-card-bottom {
          transform: translateY(0);
          opacity: 1;
        }

        .gl-card-title {
          margin: 0;
          font-size: 0.95rem;
          font-weight: 700;
          color: #fff;
          line-height: 1.3;
          text-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }

        .gl-card-hover-line {
          width: 0;
          height: 3px;
          background: ${C.green};
          border-radius: 4px;
          margin-top: 8px;
          transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .gl-card:hover .gl-card-hover-line {
          width: 40px;
        }

        /* ── Collage Grid ── */
        .gl-collage .gl-card:nth-child(3n+1) .gl-card-inner {
          border-radius: 16px 16px 16px 4px;
        }
        .gl-collage .gl-card:nth-child(3n+2) .gl-card-inner {
          border-radius: 16px 4px 16px 16px;
        }
        .gl-collage .gl-card:nth-child(3n+3) .gl-card-inner {
          border-radius: 4px 16px 16px 16px;
        }

        .gl-collage .gl-card {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .gl-collage .gl-card:hover {
          z-index: 2;
        }

        @media (max-width: 1024px) {
          .gl-collage {
            grid-template-columns: repeat(3, 1fr) !important;
            grid-auto-rows: 160px !important;
          }
        }

        @media (max-width: 768px) {
          .gl-collage {
            grid-template-columns: repeat(2, 1fr) !important;
            grid-auto-rows: 140px !important;
          }
        }

        @media (max-width: 480px) {
          .gl-collage {
            grid-template-columns: 1fr 1fr !important;
            grid-auto-rows: 120px !important;
            gap: 8px !important;
          }
          .gl-collage .gl-card-large {
            grid-column: span 2 !important;
            grid-row: span 1.8 !important;
          }
        }

        /* ── Lightbox ── */
        .gl-lightbox {
          position: fixed;
          inset: 0;
          background: rgba(10,20,35,0.95);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: glFadeIn 0.3s ease;
          padding: 20px;
        }
        @keyframes glFadeIn {
          from { opacity: 0; backdrop-filter: blur(0px); }
          to { opacity: 1; backdrop-filter: blur(20px); }
        }

        .gl-lightbox-content {
          max-width: 900px;
          width: 100%;
          animation: glZoomIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes glZoomIn {
          from { opacity: 0; transform: scale(0.92) rotate(-2deg); }
          to { opacity: 1; transform: scale(1) rotate(0deg); }
        }

        .gl-lightbox-image-wrapper {
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(0,0,0,0.5);
        }
        .gl-lightbox-image-wrapper img {
          width: 100%;
          max-height: 72vh;
          object-fit: contain;
          display: block;
          background: #1a1a2e;
        }

        .gl-lightbox-caption {
          text-align: center;
          margin-top: 20px;
        }
        .gl-lightbox-badge {
          display: inline-block;
          padding: 4px 16px;
          border-radius: 20px;
          background: rgba(75,168,106,0.2);
          color: ${C.greenLight};
          font-size: 0.75rem;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .gl-lightbox-caption p {
          margin: 4px 0 6px;
          color: #fff;
          font-size: 1.1rem;
          font-weight: 700;
        }

        .gl-lightbox-close,
        .gl-lightbox-nav {
          position: absolute;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          color: #fff;
          border-radius: 50%;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(8px);
        }
        .gl-lightbox-close:hover,
        .gl-lightbox-nav:hover {
          background: ${C.green};
          border-color: ${C.green};
          transform: scale(1.1);
          box-shadow: 0 8px 30px rgba(75,168,106,0.3);
        }

        .gl-lightbox-close {
          top: 24px;
          right: 24px;
        }
        .gl-lightbox-prev {
          left: 24px;
          top: 50%;
          transform: translateY(-50%);
        }
        .gl-lightbox-next {
          right: 24px;
          top: 50%;
          transform: translateY(-50%);
        }

        @media (max-width: 640px) {
          .gl-lightbox-prev { left: 10px; width: 40px; height: 40px; }
          .gl-lightbox-next { right: 10px; width: 40px; height: 40px; }
          .gl-lightbox-close { top: 12px; right: 12px; width: 40px; height: 40px; }
          .gl-grid-mode { grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)) !important; gap: 10px !important; }
        }
      `}</style>
    </div>
  );
}

export default Gallery;