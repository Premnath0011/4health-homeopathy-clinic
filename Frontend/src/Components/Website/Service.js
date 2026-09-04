import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import {
  FaLeaf, FaUsers, FaChevronRight, FaShieldAlt,
} from "react-icons/fa";
import Footer from "./Footer/Footer";
import service_banner from "../../assets/Image/Service/service-banner.webp";
import Apiurl from "../AdminPanel/Environmnet/Apiurl";
import { resolveServiceImage } from "../Common/serviceApi";
import AppointmentPopup from "./Appoinmnet/Appoinmnetpop";

// Design tokens
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
};

const font = "'Poppins', sans-serif";

const values = [
  { icon: <FaLeaf />, title: "Holistic Approach", desc: "We treat the root cause, not just the symptoms." },
  { icon: <FaShieldAlt />, title: "Safe & Natural", desc: "Gentle treatments with no harmful side effects." },
  { icon: <FiUser />, title: "Personalized Care", desc: "Every treatment is tailored to you and your needs." },
  { icon: <FaUsers />, title: "Experienced Doctors", desc: "Expert homeopaths with years of clinical experience." },
];

// Scroll reveal hook
function useReveal() {
  const cls = "sv-visible";
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add(cls); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".sv-reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// Global CSS
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

.sv-reveal {
  opacity: 0;
  transform: translateY(26px);
  transition: opacity 0.65s ease, transform 0.65s ease;
}
.sv-reveal.sv-visible {
  opacity: 1;
  transform: translateY(0);
}

.sv-cat-btn {
  background: #fff;
  border: 2px solid #E8EDF2;
  border-radius: 18px;
  padding: 0 0 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(15,61,110,0.08);
  transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
  font-family: 'Poppins', sans-serif;
  width: 100%;
  height: 100%;
}
.sv-cat-btn:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 36px rgba(15,61,110,0.18);
  border-color: #4BA86A;
}
.sv-cat-btn:hover .sv-cat-label {
  color: #4BA86A;
}

/* =========================================================
   SERVICES — RESPONSIVE LAYOUT ONLY
   Service fetch/navigation/popup logic is untouched.
========================================================= */

@media (max-width: 991.98px) {
  .sv-hero,
  .sv-hero-row {
    min-height: auto !important;
  }

  .sv-hero-content {
    justify-content: center;
  }

  .sv-hero-inner {
    width: 100%;
    max-width: 680px;
  }

  .sv-specializations-section {
    padding-top: 48px !important;
    padding-bottom: 42px !important;
  }

  .sv-values-section {
    padding-bottom: 48px !important;
  }

  .sv-values-panel {
    padding: 34px 30px !important;
  }
}

@media (max-width: 767.98px) {
  .sv-page .container {
    padding-left: 16px;
    padding-right: 16px;
  }

  /* Hero */
  .sv-hero,
  .sv-hero-row {
    min-height: auto !important;
  }

  .sv-hero-content {
    padding: 32px 18px 38px !important;
    justify-content: flex-start;
  }

  .sv-hero-inner {
    max-width: 100%;
  }

  .sv-hero-inner > span {
    margin-bottom: 10px !important;
    font-size: 0.66rem !important;
  }

  .sv-hero-inner h1 {
    font-size: 30px !important;
    line-height: 1.14 !important;
    margin-bottom: 14px !important;
  }

  .sv-hero-inner p {
    max-width: 100% !important;
    font-size: 0.85rem !important;
    line-height: 1.65 !important;
  }

  /* Specializations */
  .sv-specializations-section {
    padding-top: 34px !important;
    padding-bottom: 32px !important;
  }

  .sv-section-heading {
    margin-bottom: 22px !important;
  }

  .sv-section-heading h2 {
    font-size: 24px !important;
    line-height: 1.25;
  }

  .sv-section-heading p {
    max-width: 100% !important;
    font-size: 0.8rem !important;
    line-height: 1.55;
  }

  /* Existing 2-card mobile grid retained */
  .sv-category-grid {
    --bs-gutter-x: 10px;
    --bs-gutter-y: 10px;
  }

  .sv-category-grid .col {
    display: flex;
  }

  .sv-cat-btn {
    min-height: 174px;
    padding-bottom: 9px;
    border-width: 1px;
    border-radius: 13px;
    box-shadow: 0 2px 12px rgba(15,61,110,0.06);
  }

  .sv-cat-btn:hover {
    transform: none;
    box-shadow: 0 2px 12px rgba(15,61,110,0.06);
  }

  .sv-cat-image-wrap {
    height: 112px !important;
  }

  .sv-cat-label {
    min-height: 30px !important;
    margin-top: 9px !important;
    padding: 0 7px !important;
    font-size: 0.68rem !important;
    line-height: 1.3 !important;
  }

  /* Consultation callout */
  .sv-info-callout {
    align-items: flex-start !important;
    flex-wrap: wrap;
    padding: 16px !important;
    margin-top: 20px !important;
    gap: 10px !important;
    border-radius: 13px !important;
  }

  .sv-info-callout > span {
    width: 38px !important;
    height: 38px !important;
    min-width: 38px;
  }

  .sv-info-callout > div {
    flex: 1;
    min-width: calc(100% - 50px);
  }

  .sv-info-callout h4 {
    margin-bottom: 3px !important;
    font-size: 0.82rem !important;
    line-height: 1.4;
  }

  .sv-info-callout p {
    font-size: 0.72rem !important;
    line-height: 1.5;
  }

  .sv-book-btn {
    width: auto;
    margin-left: 48px !important;
    padding: 9px 15px !important;
    font-size: 0.74rem !important;
  }

  /* Values */
  .sv-values-section {
    padding-bottom: 34px !important;
  }

  .sv-values-panel {
    padding: 20px 18px !important;
    border-radius: 16px !important;
  }

  .sv-values-row {
    --bs-gutter-y: 10px;
  }

  .sv-value-item {
    align-items: flex-start !important;
    gap: 10px !important;
    padding: 7px 0;
  }

  .sv-value-item > span {
    width: 40px !important;
    height: 40px !important;
    min-width: 40px;
    font-size: 1rem !important;
  }

  .sv-value-item h4 {
    font-size: 0.8rem !important;
    line-height: 1.35;
  }

  .sv-value-item p {
    font-size: 0.68rem !important;
    line-height: 1.45 !important;
  }
}

@media (max-width: 389.98px) {
  .sv-page .container {
    padding-left: 13px;
    padding-right: 13px;
  }

  .sv-hero-content {
    padding: 28px 14px 32px !important;
  }

  .sv-hero-inner h1 {
    font-size: 27px !important;
  }

  .sv-category-grid {
    --bs-gutter-x: 8px;
    --bs-gutter-y: 8px;
  }

  .sv-cat-btn {
    min-height: 164px;
  }

  .sv-cat-image-wrap {
    height: 104px !important;
  }

  .sv-cat-label {
    font-size: 0.63rem !important;
  }

  .sv-info-callout {
    padding: 14px !important;
  }

  .sv-book-btn {
    width: 100%;
    margin-left: 0 !important;
    text-align: center;
  }

  .sv-values-panel {
    padding: 18px 15px !important;
  }
}
`;

function InjectGlobalCSS() {
  useEffect(() => {
    const id = "sv-global-css";
    if (!document.getElementById(id)) {
      const style = document.createElement("style");
      style.id = id;
      style.textContent = GLOBAL_CSS;
      document.head.appendChild(style);
    }
  }, []);
  return null;
}

const Service = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);
  useReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let active = true;

    const loadServices = async () => {
      try {
        const response = await axios.get(`${Apiurl}/service?status=Active`);
        if (!active) return;

        const dynamicCategories = (Array.isArray(response.data) ? response.data : []).map(
          (service) => ({
            id: service.slug,
            label: service.title,
            image: resolveServiceImage(service.image),
          }),
        );

        setCategories(dynamicCategories);
      } catch (error) {
        console.error("Unable to load services:", error);
        if (active) setCategories([]);
      } finally {
        if (active) setServicesLoading(false);
      }
    };

    loadServices();
    return () => {
      active = false;
    };
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/treatments/${categoryId}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="sv-page" style={{ fontFamily: font, color: C.text, background: C.white, overflowX: "hidden" }}>
      <InjectGlobalCSS />

      {/* Hero Section */}
      <section className="sv-hero" style={{
        background: `linear-gradient(135deg, #f8faf8 0%, #f2f8f3 25%, #e9f5ec 65%, #dff1e5 100%)`,
        position: "relative",
        overflow: "hidden",
        minHeight: 480,
      }}>
        <FaLeaf style={{
          position: "absolute", bottom: 20, left: 30,
          fontSize: 70, opacity: 0.13, color: C.green,
          transform: "rotate(-25deg)", pointerEvents: "none", zIndex: 1,
        }} />

        <div className="container-fluid px-0" style={{ maxWidth: "100%" }}>
          <div className="row g-0 sv-hero-row" style={{ minHeight: 480 }}>
            <div className="col-lg-6 col-md-12 d-flex align-items-center sv-reveal sv-hero-content"
              style={{ padding: "80px 48px 60px 10%", position: "relative", zIndex: 2 }}>
              <div className="sv-hero-inner">
                <span style={{
                  display: "inline-block", fontSize: "0.72rem", fontWeight: 700,
                  letterSpacing: "0.14em", textTransform: "uppercase",
                  color: C.green, marginBottom: 14,
                }}>
                  Our Services
                </span>
                <h1 style={{
                  fontSize: "clamp(32px, 4vw, 50px)", fontWeight: 800,
                  color: C.blueDark, lineHeight: 1.15, margin: "0 0 18px",
                  letterSpacing: "-0.02em",
                }}>
                  Personalized Care for<br />
                  <span style={{ color: C.green }}>Every Health Need</span>
                </h1>
                <p style={{
                  fontSize: "1rem", lineHeight: 1.75, color: C.muted,
                  maxWidth: 460, margin: 0,
                }}>
                  At 4Health Homeopathy, we offer holistic and individualized
                  treatment for a wide range of acute and chronic conditions.
                  Click on any category to explore our specializations in detail.
                </p>
              </div>
            </div>

            <div className="col-lg-6 col-md-12 d-none d-lg-block sv-reveal"
              style={{ position: "relative", minHeight: 480, overflow: "hidden" }}>
              <img
                src={service_banner}
                alt="Homeopathy remedies"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "left center",
                }}
              />
              <div style={{
                position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
                background: `linear-gradient(to right, #e9f5ec 0%, rgba(233,245,236,.98) 12%, rgba(233,245,236,.85) 28%, rgba(233,245,236,.45) 48%, transparent 75%)`,
              }} />
              <div style={{
                position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
                background: `linear-gradient(to bottom, rgba(248,250,248,0.95) 0%, rgba(242,248,243,0.75) 15%, rgba(233,245,236,0.35) 35%, transparent 60%)`,
              }} />
            </div>
          </div>
        </div>
      </section>

      {/* Our Specializations Grid */}
      <section className="sv-specializations-section" style={{ background: C.lightBg, padding: "64px 0 50px" }}>
        <div className="container">
          <div className="text-center sv-reveal sv-section-heading" style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: "clamp(24px,2.8vw,34px)", fontWeight: 800, color: C.blueDark, margin: "0 0 10px" }}>
              Our Specializations
            </h2>
            <span style={{ display: "block", width: 50, height: 3, background: C.green, borderRadius: 4, margin: "0 auto 14px" }} />
            <p style={{ fontSize: "0.92rem", color: C.muted, margin: "0 auto", maxWidth: 600 }}>
              Click on any category to view detailed information about conditions we treat and our approach to healing.
            </p>
          </div>

          <div className="sv-reveal">
            {servicesLoading && (
              <div className="text-center py-4" style={{ color: C.muted }}>
                <div className="spinner-border spinner-border-sm me-2" role="status" />
                Loading services...
              </div>
            )}
            {!servicesLoading && categories.length === 0 && (
              <div className="text-center py-5" style={{ color: C.muted }}>
                No active services are available right now.
              </div>
            )}
            <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3 sv-category-grid">
              {categories.map((cat) => (
                <div className="col" key={cat.id}>
                  <button
                    className="sv-cat-btn"
                    onClick={() => handleCategoryClick(cat.id)}
                  >
                    <div className="sv-cat-image-wrap" style={{ position: "relative", width: "100%", height: 140, flexShrink: 0 }}>
                      {cat.image ? (
                        <img
                          src={cat.image}
                          alt={cat.label}
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        />
                      ) : (
                        <div
                          aria-label={`${cat.label} image not added`}
                          style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: C.greenLight,
                            color: C.muted,
                            fontSize: "0.82rem",
                            fontWeight: 600,
                          }}
                        >
                          No image added
                        </div>
                      )}
                      {/* Gradient overlay on hover effect through parent */}
                      <div style={{
                        position: "absolute", inset: 0,
                        background: "linear-gradient(to top, rgba(75,168,106,0.3) 0%, transparent 50%)",
                        opacity: 0, transition: "opacity 0.22s ease",
                      }} 
                      className="sv-overlay" />
                    </div>
                    <span className="sv-cat-label" style={{
                      marginTop: 14, padding: "0 10px",
                      fontSize: "0.78rem", fontWeight: 700,
                      color: C.blueDark, textAlign: "center",
                      lineHeight: 1.3, display: "flex",
                      alignItems: "center", justifyContent: "center",
                      flex: 1, minHeight: 32,
                      transition: "color 0.22s ease"
                    }}>
                      {cat.label}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Info Callout */}
          <div className="d-flex align-items-center sv-reveal sv-info-callout" style={{
            background: C.greenLight, borderRadius: 14, padding: "18px 24px",
            marginTop: 32, gap: 14,
          }}>
            <span style={{
              width: 44, height: 44, borderRadius: "50%", background: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: C.green, fontSize: "1.1rem", flexShrink: 0,
            }}>
              <FaLeaf />
            </span>
            <div>
              <h4 style={{ margin: "0 0 4px", color: C.blueDark, fontWeight: 700, fontSize: "0.95rem" }}>
                Not sure which category fits your condition?
              </h4>
              <p style={{ margin: 0, color: C.muted, fontSize: "0.85rem" }}>
                Book a consultation and our expert homeopaths will guide you to the right treatment.
              </p>
            </div>
            <button
              className="sv-book-btn"
              onClick={() => setPopupOpen(true)}
              style={{
                background: C.green, color: C.white, border: "none",
                borderRadius: 10, padding: "10px 22px", fontWeight: 700,
                fontSize: "0.85rem", cursor: "pointer", whiteSpace: "nowrap",
                marginLeft: "auto", transition: "background 0.2s ease"
              }}
              onMouseEnter={(e) => e.target.style.background = C.greenDark}
              onMouseLeave={(e) => e.target.style.background = C.green}
            >
              Book Now <FaChevronRight size={12} style={{ marginLeft: 4 }} />
            </button>
          </div>
        </div>
      </section>

      {/* Values Strip */}
      <div className="sv-values-section" style={{ padding: "0 0 70px", background: C.lightBg }}>
        <div className="container">
          <div className="sv-values-panel" style={{
            background: `linear-gradient(135deg, ${C.blueDark} 0%, ${C.blue} 55%, ${C.green} 100%)`,
            borderRadius: 28,
            padding: "44px 52px",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 12px 48px rgba(15,61,110,0.18)",
          }}>
            <FaLeaf style={{
              position: "absolute", top: -20, right: -20,
              fontSize: 280, opacity: 0.08, color: "#fff",
              transform: "rotate(25deg)", pointerEvents: "none", zIndex: 0,
            }} />
            <FaLeaf style={{
              position: "absolute", bottom: -30, left: -30,
              fontSize: 100, opacity: 0.06, color: "#fff",
              transform: "rotate(-20deg)", pointerEvents: "none", zIndex: 0,
            }} />

            <div className="row g-4 sv-values-row" style={{ position: "relative", zIndex: 1 }}>
              {values.map((v, i) => (
                <div className="col-lg-3 col-sm-6" key={i}>
                  <div className="sv-value-item" style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <span style={{
                      width: 48, height: 48, borderRadius: "50%",
                      background: "rgba(255,255,255,0.18)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#fff", fontSize: "1.3rem", flexShrink: 0,
                    }}>
                      {v.icon}
                    </span>
                    <div>
                      <h4 style={{ color: "#fff", fontSize: "0.92rem", fontWeight: 700, margin: "0 0 2px" }}>
                        {v.title}
                      </h4>
                      <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.76rem", margin: 0, lineHeight: 1.4 }}>
                        {v.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AppointmentPopup isOpen={popupOpen} onClose={() => setPopupOpen(false)} />

      <Footer />
    </div>
  );
};

export default Service;