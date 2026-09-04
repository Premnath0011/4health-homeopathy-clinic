// ServiceDetail.jsx — 4Health Homeopathy
// Individual service category detail page

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FiCheckCircle, FiArrowLeft, FiUser, FiClock } from "react-icons/fi";
import {
  FaLeaf, FaUsers, FaChevronRight, FaFileAlt,
  FaClipboardList, FaShieldAlt,
} from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { GiMedicines } from "react-icons/gi";
import Footer from "./Footer/Footer";
import Apiurl from "../AdminPanel/Environmnet/Apiurl";
import { normalizeConditions, resolveServiceImage } from "../Common/serviceApi";
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

const approachSteps = [
  { icon: <FaClipboardList />, label: "Detailed Case Taking" },
  { icon: <GiMedicines />, label: "Individualized Remedy" },
  { icon: <FiClock />, label: "Follow-up & Assessment" },
  { icon: <MdFavorite />, label: "Long-term Relief" },
];

const values = [
  { icon: <FaLeaf />, title: "Holistic Approach", desc: "We treat the root cause, not just the symptoms." },
  { icon: <FaShieldAlt />, title: "Safe & Natural", desc: "Gentle treatments with no harmful side effects." },
  { icon: <FiUser />, title: "Personalized Care", desc: "Every treatment is tailored to you and your needs." },
  { icon: <FaUsers />, title: "Experienced Doctors", desc: "Expert homeopaths with years of clinical experience." },
];

const ServiceDetail = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showScrollButton, setShowScrollButton] = React.useState(false);
  const [selectedCondition, setSelectedCondition] = React.useState(0);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedCondition(0);
    setData(null);

    let active = true;
    const loadService = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${Apiurl}/service/slug/${categoryId}`);
        if (!active) return;

        const service = response.data;
        setData({
          ...service,
          image: resolveServiceImage(service.image),
          conditions: normalizeConditions(
            service.conditions,
            service.symptoms,
            service.howWeHelp,
          ).map((condition) => ({
            ...condition,
            image: resolveServiceImage(condition.image),
          })),
          quote: service.quote || "",
          approach: service.approach || "",
        });
      } catch (error) {
        console.error("Unable to load service details:", error);
        if (active) setData(null);
      } finally {
        if (active) setLoading(false);
      }
    };

    loadService();
    return () => {
      active = false;
    };
  }, [categoryId]);

    useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Add scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (loading && !data) {
    return (
      <div style={{ textAlign: "center", padding: "120px 20px", fontFamily: font, color: C.muted }}>
        <div className="spinner-border" style={{ color: C.green }} role="status" />
        <p style={{ marginTop: 14 }}>Loading service details...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ 
        textAlign: "center", 
        padding: "100px 20px", 
        fontFamily: font,
        color: C.text 
      }}>
        <FaLeaf style={{ fontSize: 60, color: C.green, marginBottom: 20 }} />
        <h2 style={{ color: C.blueDark, marginBottom: 16 }}>Service Not Found</h2>
        <p style={{ color: C.muted, marginBottom: 24 }}>The category you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate("/treatments")}
          style={{
            background: C.green,
            color: C.white,
            border: "none",
            borderRadius: 10,
            padding: "12px 28px",
            fontWeight: 700,
            cursor: "pointer",
            fontSize: "0.95rem"
          }}
        >
          Back to All Services
        </button>
      </div>
    );
  }

  const selectedConditionData = data.conditions[selectedCondition] || null;
  const selectedConditionImage = selectedConditionData?.image || data.image || "";

  return (
    <div style={{ fontFamily: font, color: C.text, background: C.white, overflowX: "hidden" }}>
      
      {/* Hero Section */}
      <section style={{
        background: `linear-gradient(135deg, #f8faf8 0%, #f2f8f3 25%, #e9f5ec 65%, #dff1e5 100%)`,
        padding: "60px 0 60px",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Decorative elements */}
        <FaLeaf style={{
          position: "absolute", bottom: -30, left: -20,
          fontSize: 120, opacity: 0.08, color: C.green,
          transform: "rotate(-25deg)", pointerEvents: "none"
        }} />
        <FaLeaf style={{
          position: "absolute", top: -30, right: -20,
          fontSize: 80, opacity: 0.06, color: C.green,
          transform: "rotate(35deg)", pointerEvents: "none"
        }} />
        
        <div className="container">
          {/* Back button */}
          <button
            onClick={() => navigate("/treatments")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: C.white,
              border: `1px solid ${C.border}`,
              borderRadius: 10,
              padding: "10px 20px",
              color: C.text,
              fontWeight: 600,
              fontSize: "0.88rem",
              cursor: "pointer",
              marginBottom: 36,
              transition: "all 0.2s ease",
              boxShadow: "0 2px 8px rgba(15,61,110,0.06)"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateX(-4px)";
              e.target.style.boxShadow = "0 4px 16px rgba(15,61,110,0.12)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateX(0)";
              e.target.style.boxShadow = "0 2px 8px rgba(15,61,110,0.06)";
            }}
          >
            <FiArrowLeft /> Back to All Services
          </button>

          <div className="row align-items-center g-4">
            <div className="col-lg-7">
              <div style={{ marginBottom: 16 }}>
                <span style={{
                  fontSize: "0.75rem", fontWeight: 700,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  color: C.green
                }}>
                  Homeopathic Treatment
                </span>
              </div>
              
              <h1 style={{
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 800,
                color: C.blueDark,
                marginBottom: 16,
                lineHeight: 1.15,
                letterSpacing: "-0.02em"
              }}>
                {data.title} <br />
                <span style={{ color: C.green }}>Natural Treatment</span>
              </h1>
              
              <div
                style={{
                  fontSize: "1rem",
                  lineHeight: 1.8,
                  color: C.muted,
                  maxWidth: 560,
                  marginBottom: 28
                }}
                dangerouslySetInnerHTML={{ __html: data.description || "" }}
              />

              <button
                onClick={() => setPopupOpen(true)}
                style={{
                  background: C.green,
                  color: C.white,
                  border: "none",
                  borderRadius: 12,
                  padding: "14px 36px",
                  fontSize: "1rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = C.greenDark;
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 8px 24px rgba(75,168,106,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = C.green;
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "none";
                }}
              >
                Book Consultation <FaChevronRight size={14} />
              </button>
            </div>
            
            <div className="col-lg-5">
              <div style={{ position: "relative" }}>
                {data.image ? (
                  <img
                    src={data.image}
                    alt={data.title}
                    style={{
                      width: "100%",
                      height: 340,
                      objectFit: "cover",
                      borderRadius: 24,
                      boxShadow: "0 12px 40px rgba(15,61,110,0.18)",
                      display: "block"
                    }}
                  />
                ) : (
                  <div style={{
                    width: "100%",
                    height: 340,
                    borderRadius: 24,
                    boxShadow: "0 12px 40px rgba(15,61,110,0.12)",
                    background: C.greenLight,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: C.muted,
                    fontSize: "0.95rem",
                    fontWeight: 600
                  }}>
                    No image added
                  </div>
                )}
                <div style={{
                  position: "absolute",
                  bottom: -16,
                  right: -16,
                  background: C.white,
                  borderRadius: 16,
                  padding: "14px 18px",
                  boxShadow: "0 6px 20px rgba(15,61,110,0.12)",
                  display: "flex",
                  alignItems: "center",
                  gap: 10
                }}>
                  <FaLeaf style={{ color: C.green, fontSize: "1.2rem" }} />
                  <span style={{ fontWeight: 700, color: C.blueDark, fontSize: "0.85rem" }}>
                    100% Natural
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detail View — Sidebar + Main (same layout as Our Specializations section) */}
      <section style={{ background: C.lightBg, padding: "70px 0" }}>
        <div className="container">
          <div className="row g-4 align-items-start">

            {/* MOBILE / TABLET DROPDOWN (below lg) */}
            <div className="col-12 d-lg-none">
              <div style={{ background: C.white, borderRadius: 18, overflow: "hidden", boxShadow: "0 4px 24px rgba(15,61,110,0.08)" }}>
                <div style={{
                  background: `linear-gradient(135deg,${C.blueDark} 0%,${C.greenDark} 100%)`,
                  padding: "22px 20px",
                }}>
                  <h3 style={{ color: "#fff", fontSize: "1rem", fontWeight: 700, margin: 0 }}>{data.title}</h3>
                </div>
                <div style={{ padding: "18px 16px" }}>
                  <p style={{
                    fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.06em",
                    textTransform: "uppercase", color: C.muted, margin: "0 0 10px",
                  }}>
                    Conditions We Treat
                  </p>
                  <select
                    className="form-select"
                    value={selectedCondition}
                    onChange={(e) => setSelectedCondition(Number(e.target.value))}
                    style={{
                      border: `1px solid ${C.border}`,
                      borderRadius: "10px",
                      padding: "10px 14px",
                      fontSize: "0.88rem",
                      color: C.blueDark,
                      fontWeight: 600,
                      outline: "none",
                    }}
                  >
                    {data.conditions.map((cond, idx) => (
                      <option key={cond._id || `${cond.title}-${idx}`} value={idx}>
                        {cond.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* SIDEBAR (lg and up only) */}
            <div className="col-lg-3 col-md-4 d-none d-lg-block">
              <div style={{ background: C.white, borderRadius: 18, overflow: "hidden", boxShadow: "0 4px 24px rgba(15,61,110,0.08)" }}>

                {/* Sidebar header */}
                <div style={{
                  background: `linear-gradient(135deg,${C.blueDark} 0%,${C.greenDark} 100%)`,
                  padding: "22px 20px",
                }}>
                  <h3 style={{ color: "#fff", fontSize: "1rem", fontWeight: 700, margin: 0 }}>{data.title}</h3>
                </div>

                {/* Condition list */}
                <div style={{ padding: "18px 14px 6px" }}>
                  <p style={{
                    fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.06em",
                    textTransform: "uppercase", color: C.muted, margin: "0 0 10px", paddingLeft: 6,
                  }}>
                    Conditions We Treat
                  </p>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none", overflowY: "auto" }}>
                    {data.conditions.map((cond, idx) => {
                      const active = idx === selectedCondition;
                      return (
                        <li
                          key={cond._id || `${cond.title}-${idx}`}
                          onClick={() => setSelectedCondition(idx)}
                          style={{
                            display: "flex", alignItems: "center", gap: 10,
                            padding: "10px 12px", borderRadius: 8, cursor: "pointer",
                            fontSize: "0.84rem", fontWeight: active ? 700 : 500,
                            color: active ? C.blueDark : C.text,
                            background: active ? C.greenLight : "transparent",
                            transition: "background 0.18s ease",
                          }}
                          onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = C.lightBg; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = active ? C.greenLight : "transparent"; }}
                        >
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.green, flexShrink: 0 }} />
                          <span style={{ flex: 1 }}>{cond.title}</span>
                          <FaChevronRight size={11} style={{ color: active ? C.green : "#b6c0cb" }} />
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* CTA */}
                {/* <div style={{ margin: "16px 16px 18px", padding: 18, background: C.lightBg, borderRadius: 12 }}>
                  <span style={{
                    display: "inline-flex", width: 32, height: 32, borderRadius: 8,
                    background: C.greenLight, color: C.green,
                    alignItems: "center", justifyContent: "center", marginBottom: 10,
                  }}>
                    <FaFileAlt />
                  </span>
                  <h4 style={{ fontSize: "0.84rem", fontWeight: 700, color: C.blueDark, margin: "0 0 5px" }}>
                    Not sure about your condition?
                  </h4>
                  <p style={{ fontSize: "0.77rem", color: C.muted, margin: "0 0 12px", lineHeight: 1.5 }}>
                    Book a consultation and let our experts guide you.
                  </p>
                  <button
                    onClick={() => setPopupOpen(true)}
                    style={{
                      width: "100%", background: C.green, color: "#fff", border: "none",
                      borderRadius: 10, padding: 11, fontWeight: 700, fontSize: "0.85rem",
                      cursor: "pointer", transition: "background 0.22s ease, transform 0.22s ease",
                    }}
                    onMouseEnter={(e) => { e.target.style.background = C.greenDark; e.target.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={(e) => { e.target.style.background = C.green; e.target.style.transform = "translateY(0)"; }}
                  >
                    Book Appointment
                  </button>
                </div> */}
              </div>
            </div>

            {/* MAIN DETAIL */}
            <div className="col-lg-9 col-md-8">

              {/* Main card */}
              <div style={{
                background: C.white, borderRadius: 18,
                boxShadow: "0 4px 24px rgba(15,61,110,0.08)",
                padding: "28px 30px", border: `1px solid ${C.border}`,
                marginBottom: 22,
              }}>
                <div className="row g-3 align-items-start">

                  {/* Text */}
                  <div className="col-md-8">
                    <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: C.blueDark, margin: "0 0 10px" }}>
                      {selectedConditionData?.title || "No condition added"}
                    </h3>
                    <p style={{ fontSize: "0.88rem", lineHeight: 1.75, color: C.muted, margin: "0 0 20px" }}>
                      {selectedConditionData?.description || ""}
                    </p>

                    <div className="row g-3">
                      {/* Symptoms */}
                      <div className="col-sm-6">
                        <h4 style={{ fontSize: "0.73rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: C.blueDark, margin: "0 0 10px" }}>
                          Symptoms
                        </h4>
                        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                          {(selectedConditionData?.symptoms || []).map((s, i) => (
                            <li key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.82rem", color: C.text }}>
                              <span style={{ width: 5, height: 5, borderRadius: "50%", background: C.green, flexShrink: 0 }} />
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* How We Help */}
                      <div className="col-sm-6">
                        <h4 style={{ fontSize: "0.73rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: C.blueDark, margin: "0 0 10px" }}>
                          How We Help
                        </h4>
                        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                          {(selectedConditionData?.howWeHelp || []).map((h, i) => (
                            <li key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.82rem", color: C.text }}>
                              <FiCheckCircle style={{ color: C.green, flexShrink: 0 }} />
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="col-md-4">
                    {selectedConditionImage ? (
                      <img
                        key={selectedConditionImage}
                        src={selectedConditionImage}
                        alt={selectedConditionData?.title || data.title}
                        style={{
                          width: "100%",
                          height: 280,
                          objectFit: "cover",
                          borderRadius: 14,
                          display: "block",
                        }}
                      />
                    ) : (
                      <div style={{ width: "100%", height: 280, borderRadius: 14, background: C.greenLight, display: "flex", alignItems: "center", justifyContent: "center", color: C.muted, fontSize: "0.9rem", fontWeight: 600 }}>
                        No image added
                      </div>
                    )}
                  </div>
                </div>

                {/* Quote */}
                {data.quote && (
                  <div style={{
                    marginTop: 22, background: C.greenLight,
                    borderLeft: `3px solid ${C.green}`, borderRadius: 10,
                    padding: "13px 18px", fontSize: "0.85rem", fontWeight: 600,
                    color: C.blueDark, lineHeight: 1.5,
                  }}>
                    {data.quote}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section style={{ padding: "0 0 70px", background: C.lightBg }}>
        <div className="container">
          <div style={{
            background: C.white,
            borderRadius: 20,
            padding: "40px 36px",
            boxShadow: "0 4px 28px rgba(15,61,110,0.08)",
            border: `1px solid ${C.border}`
          }}>
            <div className="text-center" style={{ marginBottom: 36 }}>
              <h3 style={{
                fontSize: "clamp(20px, 2.2vw, 28px)",
                fontWeight: 800,
                color: C.blueDark,
                margin: "0 0 8px"
              }}>
                Our Treatment Approach
              </h3>
              <span style={{
                display: "block", width: 40, height: 3,
                background: C.green, borderRadius: 4,
                margin: "0 auto 12px"
              }} />
              <p style={{ fontSize: "0.9rem", color: C.muted, maxWidth: 600, margin: "0 auto" }}>
                {data.approach}
              </p>
            </div>

            <div className="row g-3">
              {approachSteps.map((step, idx) => (
                <div className="col-lg-3 col-md-6" key={idx}>
                  <div style={{
                    textAlign: "center",
                    padding: "24px 16px",
                    background: C.lightBg,
                    borderRadius: 14,
                    height: "100%",
                    transition: "transform 0.2s ease"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                  >
                    <div style={{ position: "relative", display: "inline-block", marginBottom: 14 }}>
                      <span style={{
                        width: 56, height: 56, borderRadius: "50%",
                        background: C.greenLight,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: C.green, fontSize: "1.3rem",
                        margin: "0 auto"
                      }}>
                        {step.icon}
                      </span>
                      <span style={{
                        position: "absolute",
                        top: -4, right: -4,
                        width: 22, height: 22,
                        borderRadius: "50%",
                        background: C.green,
                        color: C.white,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.7rem",
                        fontWeight: 700
                      }}>
                        {idx + 1}
                      </span>
                    </div>
                    <h5 style={{
                      fontSize: "0.88rem",
                      fontWeight: 700,
                      color: C.blueDark,
                      margin: "0 0 6px"
                    }}>
                      {step.label}
                    </h5>
                    <p style={{
                      fontSize: "0.76rem",
                      color: C.muted,
                      margin: 0,
                      lineHeight: 1.4
                    }}>
                      {idx === 0 && "Understanding your unique health history and concerns"}
                      {idx === 1 && "Selecting the perfect remedy for your constitution"}
                      {idx === 2 && "Monitoring progress and adjusting treatment as needed"}
                      {idx === 3 && "Achieving lasting health improvements naturally"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Strip */}
      <div style={{ padding: "0 0 70px", background: C.lightBg }}>
        <div className="container">
          <div style={{
            background: `linear-gradient(135deg, ${C.blueDark} 0%, ${C.blue} 55%, ${C.green} 100%)`,
            borderRadius: 28,
            padding: "44px 52px",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 12px 48px rgba(15,61,110,0.18)"
          }}>
            <FaLeaf style={{
              position: "absolute", top: -20, right: -20,
              fontSize: 280, opacity: 0.08, color: "#fff",
              transform: "rotate(25deg)", pointerEvents: "none", zIndex: 0
            }} />
            <FaLeaf style={{
              position: "absolute", bottom: -30, left: -30,
              fontSize: 100, opacity: 0.06, color: "#fff",
              transform: "rotate(-20deg)", pointerEvents: "none", zIndex: 0
            }} />

            <div className="row g-4" style={{ position: "relative", zIndex: 1 }}>
              {values.map((v, i) => (
                <div className="col-lg-3 col-sm-6" key={i}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <span style={{
                      width: 48, height: 48, borderRadius: "50%",
                      background: "rgba(255,255,255,0.18)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#fff", fontSize: "1.3rem", flexShrink: 0
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

      {/* CTA Section */}
      <section style={{ padding: "0 0 80px", background: C.lightBg }}>
        <div className="container">
          <div style={{
            background: C.white,
            borderRadius: 24,
            padding: "48px",
            textAlign: "center",
            boxShadow: "0 4px 28px rgba(15,61,110,0.08)",
            border: `1px solid ${C.border}`
          }}>
            <FaLeaf style={{ fontSize: 40, color: C.green, marginBottom: 16, opacity: 0.6 }} />
            <h2 style={{
              fontSize: "clamp(22px, 2.5vw, 30px)",
              fontWeight: 800,
              color: C.blueDark,
              marginBottom: 12
            }}>
              Ready to Start Your Healing Journey?
            </h2>
            <p style={{
              fontSize: "0.95rem",
              color: C.muted,
              maxWidth: 500,
              margin: "0 auto 28px",
              lineHeight: 1.6
            }}>
              Take the first step towards better health with our personalized homeopathic treatment for {data.title.toLowerCase()} conditions.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <button
                onClick={() => setPopupOpen(true)}
                style={{
                  background: C.green,
                  color: C.white,
                  border: "none",
                  borderRadius: 12,
                  padding: "14px 32px",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = C.greenDark;
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = C.green;
                  e.target.style.transform = "translateY(0)";
                }}
              >
                Book Appointment
              </button>
              <button
                onClick={() => navigate("/treatments")}
                style={{
                  background: C.white,
                  color: C.blueDark,
                  border: `2px solid ${C.border}`,
                  borderRadius: 12,
                  padding: "14px 32px",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = C.green;
                  e.target.style.color = C.green;
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = C.border;
                  e.target.style.color = C.blueDark;
                }}
              >
                Explore Other Services
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: C.green,
            color: C.white,
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.3rem',
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(75, 168, 106, 0.4)',
            zIndex: 1000,
            transition: 'all 0.3s ease',
            animation: 'fadeInUp 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = C.greenDark;
            e.target.style.transform = 'translateY(-3px)';
            e.target.style.boxShadow = '0 6px 20px rgba(75, 168, 106, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = C.green;
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 16px rgba(75, 168, 106, 0.4)';
          }}
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}

      <AppointmentPopup isOpen={popupOpen} onClose={() => setPopupOpen(false)} />

      <Footer />
    </div>
  );
};

export default ServiceDetail;