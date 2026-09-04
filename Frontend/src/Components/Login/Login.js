// Two‑panel equal layout: left = branding, right = login form (full width)
// Generic error message: "Invalid email or password" for security

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Apiurl from "../../Components/AdminPanel/Environmnet/Apiurl";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaLeaf,
  FaHeartbeat,
  FaUserMd,
  FaShieldAlt,
  FaStar,
  FaHospital,
  FaAmbulance,
} from "react-icons/fa";
import { GiHealthNormal } from "react-icons/gi";

// ─── Import Background Image ──────────────────────────────
import bg_img from "../../assets/Image/Login/login_bg4.png";

// ─── Design Tokens ──────────────────────────────────────────
const C = {
  green: "#4BA86A",
  greenDark: "#3a8a56",
  greenLight: "#E8F5ED",
  greenBg: "#F0F9F2",
  blueDark: "#0F3D6E",
  blue: "#1A5276",
  blueLight: "#EBF2F8",
  text: "#1E2F2B",
  muted: "#5E7B6E",
  white: "#FFFFFF",
  border: "#D1EDE6",
  shadow: "rgba(15,61,110,0.12)",
};

const font = "'Poppins', sans-serif";

// ─── 4Health Logo ──────────────────────────────────────────
const Logo4Health = ({ height = 48, variant = "light" }) => {
  const color = variant === "light" ? "#FFFFFF" : "#0F3D6E";
  const subColor = variant === "light" ? "#4BA86A" : "#4BA86A";

  return (
    <svg
      viewBox="0 0 200 55"
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      <text
        x="0"
        y="38"
        fontFamily="Poppins, sans-serif"
        fontSize="32"
        fontWeight="800"
        fill={color}
        letterSpacing="0.5"
      >
        4Health
      </text>
      <text
        x="0"
        y="52"
        fontFamily="Poppins, sans-serif"
        fontSize="12"
        fontWeight="400"
        fill={subColor}
        letterSpacing="4"
      >
        HOMEOPATHY
      </text>
    </svg>
  );
};

// ─── Icon Wrapper ──────────────────────────────────────────
const IconWrap = ({ icon, color, bg, label, sub }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "14px",
      padding: "10px 14px",
      borderRadius: "12px",
      background: bg || "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.06)",
    }}
  >
    <div
      style={{
        width: "38px",
        height: "38px",
        borderRadius: "10px",
        background: color ? `${color}20` : "rgba(75,168,106,0.15)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: color || C.green,
        fontSize: "16px",
        flexShrink: 0,
      }}
    >
      {icon}
    </div>
    <div>
      <div style={{ color: "#fff", fontSize: "0.8rem", fontWeight: 500 }}>
        {label}
      </div>
      <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.65rem" }}>
        {sub}
      </div>
    </div>
  </div>
);

// ─── Stats ──────────────────────────────────────────────────
const StatItem = ({ value, label }) => (
  <div>
    <div
      style={{
        color: C.green,
        fontSize: "1.2rem",
        fontWeight: 700,
        display: "block",
        lineHeight: 1.2,
      }}
    >
      {value}
    </div>
    <div
      style={{
        color: "rgba(255,255,255,0.35)",
        fontSize: "0.6rem",
        letterSpacing: "0.3px",
      }}
    >
      {label}
    </div>
  </div>
);

// ═══════════════ MAIN COMPONENT ══════════════════════════════
const Login = () => {
  const navigate = useNavigate();

  // ── Login state ──
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ── Verification state ──
  const [step, setStep] = useState("login");
  const [verificationCode, setVerificationCode] = useState("");
  const [enteredCode, setEnteredCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState("");

  // ── Login submit ──────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${Apiurl}/login`, {
        user_id: email,
        user_password: password,
      });

      const { token, verificationCode, user } = response.data;

      localStorage.setItem("adminToken", token);
      localStorage.setItem("user_role", user.user_role);
      localStorage.setItem("user_name", user.user_name);
      
    //   console.log("this is response", response.data);
      console.log("Role:", user.user_role);
      console.log("Name:", user.user_name);

      if (verificationCode) {
        setVerificationCode(verificationCode);
        setStep("verify");
      } else {
        navigate("/admin/dash");
      }
    } catch (err) {
      console.error("Login error:", err);

      // ── Generic error message for security ──────────────
      // Always show "Invalid email or password" regardless of the actual error
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  // ── Verification submit ──────────────────────────────────
  const handleVerify = async () => {
    if (!enteredCode.trim()) {
      setVerificationError("Please enter the verification code");
      return;
    }

    setVerifying(true);
    setVerificationError("");

    try {
      await axios.post(
        `${Apiurl}/verify-code`,
        { code: enteredCode },
        {
          headers: {
            Authorization: localStorage.getItem("adminToken"),
          },
        },
      );

      localStorage.setItem("verificationCode", enteredCode);
      navigate("/admin/dash");
    } catch (err) {
      console.error("Verification error:", err);
      const msg =
        err.response?.data?.message ||
        "Invalid verification code. Please try again.";
      setVerificationError(msg);
    } finally {
      setVerifying(false);
    }
  };

  // ─── Shared card styles ──────────────────────────────────
  const cardStyle = {
    width: "100%",
    maxWidth: "1024px",
    borderRadius: "28px",
    overflow: "hidden",
    boxShadow: "0 30px 80px rgba(15,61,110,0.25)",
    border: "1px solid rgba(255,255,255,0.2)",
    background: C.white,
    animation: "fadeInUp 0.7s ease forwards",
    position: "relative",
    zIndex: 2,
  };

  const containerStyle = {
    fontFamily: font,
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    position: "relative",
    overflow: "hidden",
    backgroundImage: `url(${bg_img})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  // ─── Left panel data ──────────────────────────────────────
  const features = [
    {
      icon: <FaHeartbeat />,
      label: "Holistic Healing",
      sub: "Root cause treatment",
      color: C.green,
    },
    {
      icon: <FaUserMd />,
      label: "Expert Physicians",
      sub: "BHMS & MD qualified",
      color: "#2E86C1",
    },
    {
      icon: <FaShieldAlt />,
      label: "Safe & Natural",
      sub: "No side effects",
      color: "#F39C12",
    },
    {
      icon: <GiHealthNormal />,
      label: "Personalized Care",
      sub: "Tailored to you",
      color: "#8E44AD",
    },
  ];

  const stats = [
    { value: "10k+", label: "Happy Patients" },
    { value: "15+", label: "Years Experience" },
    { value: "98%", label: "Success Rate" },
  ];

  // ════════════════════════════════════════════════════════════
  // RENDER: Login screen (two‑panel)
  // ════════════════════════════════════════════════════════════
  if (step === "login") {
    return (
      <div style={containerStyle}>
        <style>{`
                    @keyframes fadeInUp {
                        from { opacity: 0; transform: translateY(30px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes pulseGlow {
                        0%, 100% { opacity: 0.6; }
                        50% { opacity: 1; }
                    }
                `}</style>

        {/* ─── Dark Overlay ─────────────────────────────── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            background:
              "linear-gradient(135deg, rgba(15,61,110,0.30) 0%, rgba(0,0,0,0.10) 60%, rgba(15,61,110,0.20) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* ─── Main Card ───────────────────────────────── */}
        <div style={cardStyle}>
          <div className="row g-0 align-items-stretch">
            {/* ─── LEFT PANEL — Branding ──────────── */}
            <div
              className="col-lg-6 d-none d-lg-flex flex-column"
              style={{
                background:
                  "linear-gradient(160deg, #0a1a2e 0%, #143a2a 60%, #1a4a3a 100%)",
                padding: "clamp(36px, 5vw, 48px) clamp(28px, 4vw, 40px)",
                minHeight: "520px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Decorative circles */}
              <div
                style={{
                  position: "absolute",
                  top: "-120px",
                  right: "-120px",
                  width: "300px",
                  height: "300px",
                  borderRadius: "50%",
                  background: "rgba(75,168,106,0.06)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "-80px",
                  left: "-80px",
                  width: "250px",
                  height: "250px",
                  borderRadius: "50%",
                  background: "rgba(46,134,193,0.05)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "30%",
                  right: "10%",
                  fontSize: "4rem",
                  color: "rgba(75,168,106,0.04)",
                  pointerEvents: "none",
                }}
              >
                <FaHospital />
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "20%",
                  left: "15%",
                  fontSize: "3rem",
                  color: "rgba(46,134,193,0.04)",
                  pointerEvents: "none",
                }}
              >
                <FaAmbulance />
              </div>

              {/* Logo */}
              <div style={{ position: "relative", zIndex: 1 }}>
                <Logo4Health height={44} variant="light" />
              </div>

              {/* Main content */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "clamp(20px, 3vw, 32px) 0",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {/* Badge */}
                <div style={{ marginBottom: "clamp(16px, 2vw, 20px)" }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "5px 16px",
                      borderRadius: "50px",
                      background: "rgba(75,168,106,0.15)",
                      border: "1px solid rgba(75,168,106,0.15)",
                      fontSize: "0.6rem",
                      fontWeight: 600,
                      letterSpacing: "1px",
                      color: C.green,
                      textTransform: "uppercase",
                    }}
                  >
                    <FaLeaf size={11} /> Premium Homeopathy
                  </span>
                </div>

                <h1
                  style={{
                    fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                    fontWeight: 700,
                    color: "#fff",
                    lineHeight: 1.15,
                    letterSpacing: "-0.5px",
                    marginBottom: "12px",
                  }}
                >
                  Natural Healing
                  <br />
                  <span
                    style={{
                      background: "linear-gradient(135deg, #4BA86A, #2ECC71)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Starts Here
                  </span>
                </h1>

                <p
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    fontSize: "0.85rem",
                    lineHeight: 1.7,
                    maxWidth: "420px",
                    marginBottom: "clamp(16px, 2vw, 24px)",
                  }}
                >
                  Four Health Homeopathy — where tradition meets science. Sign
                  in to continue your journey to natural wellness.
                </p>

                {/* Features grid */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "8px",
                    marginBottom: "clamp(16px, 2vw, 24px)",
                  }}
                >
                  {features.map((f, i) => (
                    <IconWrap
                      key={i}
                      icon={f.icon}
                      label={f.label}
                      sub={f.sub}
                      color={f.color}
                    />
                  ))}
                </div>

                {/* Stats */}
                <div
                  style={{
                    display: "flex",
                    gap: "clamp(20px, 4vw, 40px)",
                    paddingTop: "16px",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {stats.map((s, i) => (
                    <StatItem key={i} value={s.value} label={s.label} />
                  ))}
                </div>
              </div>

              {/* Bottom decorative */}
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  alignItems: "center",
                  fontSize: "0.6rem",
                  color: "rgba(255,255,255,0.25)",
                  letterSpacing: "0.5px",
                  paddingTop: "8px",
                  borderTop: "1px solid rgba(255,255,255,0.04)",
                  position: "relative",
                  zIndex: 1,
                  flexWrap: "wrap",
                }}
              >
                <span>✦ Trusted since 2010</span>
                <span>✦</span>
                <span>ISO Certified</span>
                <span>✦</span>
                <span>100% Natural</span>
              </div>
            </div>

            {/* ─── RIGHT PANEL — Login Form (Full width on small screens) ── */}
            <div
              className="col-lg-6"
              style={{
                padding: "clamp(32px, 5vw, 48px) clamp(24px, 4vw, 40px)",
                background: C.white,
                display: "flex",
                alignItems: "center",
                minHeight: "520px",
              }}
            >
              <div
                style={{ maxWidth: "380px", margin: "0 auto", width: "100%" }}
              >
                {/* Mobile logo (visible only on small screens) */}
                <div className="d-lg-none text-center mb-4">
                  <Logo4Health height={40} variant="dark" />
                </div>

                {/* Heading */}
                <div className="text-center mb-4">
                  <h2
                    style={{
                      fontSize: "1.4rem",
                      fontWeight: 700,
                      color: C.blueDark,
                      margin: "0 0 2px",
                    }}
                  >
                    Welcome Back
                  </h2>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: C.muted,
                      margin: 0,
                    }}
                  >
                    Sign in to your account
                  </p>
                </div>

                {/* ─── Error Message ───────────────── */}
                {error && (
                  <div
                    style={{
                      background: "#fde8e8",
                      border: "1px solid #f5c6c6",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      marginBottom: "16px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span style={{ fontSize: "1rem" }}>⚠️</span>
                    <span
                      style={{
                        fontSize: "0.85rem",
                        color: "#a94442",
                        fontWeight: 500,
                      }}
                    >
                      {error}
                    </span>
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        color: C.text,
                        display: "block",
                        marginBottom: "5px",
                      }}
                    >
                      Email Address
                    </label>
                    <div style={{ position: "relative" }}>
                      <FaEnvelope
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "14px",
                          transform: "translateY(-50%)",
                          color: "#b0b8c4",
                          fontSize: "16px",
                          pointerEvents: "none",
                        }}
                      />
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "12px 14px 12px 44px",
                          borderRadius: "12px",
                          border: "2px solid #e8edf2",
                          background: "#fafbfc",
                          fontSize: "0.9rem",
                          fontFamily: font,
                          outline: "none",
                          transition:
                            "border-color 0.3s ease, background 0.3s ease",
                          color: C.text,
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = C.green;
                          e.target.style.background = "#ffffff";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#e8edf2";
                          e.target.style.background = "#fafbfc";
                        }}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        color: C.text,
                        display: "block",
                        marginBottom: "5px",
                      }}
                    >
                      Password
                    </label>
                    <div style={{ position: "relative" }}>
                      <FaLock
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "14px",
                          transform: "translateY(-50%)",
                          color: "#b0b8c4",
                          fontSize: "16px",
                          pointerEvents: "none",
                        }}
                      />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "12px 44px 12px 44px",
                          borderRadius: "12px",
                          border: "2px solid #e8edf2",
                          background: "#fafbfc",
                          fontSize: "0.9rem",
                          fontFamily: font,
                          outline: "none",
                          transition:
                            "border-color 0.3s ease, background 0.3s ease",
                          color: C.text,
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = C.green;
                          e.target.style.background = "#ffffff";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#e8edf2";
                          e.target.style.background = "#fafbfc";
                        }}
                        required
                      />
                      <button
                        type="button"
                        style={{
                          position: "absolute",
                          top: "50%",
                          right: "14px",
                          transform: "translateY(-50%)",
                          border: "none",
                          background: "transparent",
                          cursor: "pointer",
                          color: "#b0b8c4",
                          fontSize: "16px",
                          padding: "4px",
                        }}
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label="Toggle password visibility"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: "100%",
                      padding: "14px",
                      borderRadius: "50px",
                      border: "none",
                      background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})`,
                      color: "#fff",
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      cursor: loading ? "not-allowed" : "pointer",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 20px rgba(75,168,106,0.3)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      fontFamily: font,
                      opacity: loading ? 0.65 : 1,
                    }}
                    disabled={loading}
                    onMouseEnter={(e) => {
                      if (!loading) {
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.boxShadow =
                          "0 8px 30px rgba(75,168,106,0.4)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow =
                        "0 4px 20px rgba(75,168,106,0.3)";
                    }}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          style={{
                            width: "1rem",
                            height: "1rem",
                            borderWidth: "0.15em",
                          }}
                        />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign In <FaArrowRight size={14} />
                      </>
                    )}
                  </button>
                </form>

                {/* Footer badges */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "20px",
                    paddingTop: "16px",
                    marginTop: "20px",
                    borderTop: "1px solid #f0f0f0",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.65rem",
                      color: "#b0b8c4",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <FaShieldAlt size={10} /> Secure
                  </span>
                  <span
                    style={{
                      fontSize: "0.65rem",
                      color: "#b0b8c4",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <FaLeaf size={10} /> Natural
                  </span>
                  <span
                    style={{
                      fontSize: "0.65rem",
                      color: "#b0b8c4",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <FaStar size={10} /> 4.9 Rating
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════
  // RENDER: Verification screen
  // ════════════════════════════════════════════════════════════
  return (
    <div style={containerStyle}>
      <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>

      {/* ─── Dark Overlay ─────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(135deg, rgba(15,61,110,0.30) 0%, rgba(0,0,0,0.10) 60%, rgba(15,61,110,0.20) 100%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          ...cardStyle,
          maxWidth: "500px",
          padding: "clamp(32px, 5vw, 44px) clamp(24px, 4vw, 36px)",
        }}
      >
        <div className="text-center mb-4">
          <Logo4Health height={40} variant="dark" />
        </div>

        <div className="text-center mb-3">
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 14px",
              borderRadius: "50px",
              background: "rgba(75,168,106,0.10)",
              border: "1px solid rgba(75,168,106,0.12)",
              fontSize: "0.6rem",
              fontWeight: 600,
              letterSpacing: "1px",
              color: C.green,
              textTransform: "uppercase",
            }}
          >
            <FaLeaf size={9} color={C.green} /> Secure Access
          </span>
        </div>

        <div className="text-center mb-4">
          <h2
            style={{
              fontSize: "1.2rem",
              fontWeight: 700,
              color: C.blueDark,
              margin: "0 0 2px",
            }}
          >
            Verification Required
          </h2>
          <p style={{ fontSize: "0.85rem", color: C.muted, margin: 0 }}>
            Enter the code shown below
          </p>
        </div>

        {/* Code display */}
        <div
          style={{
            background: "rgba(75,168,106,0.06)",
            border: `1px dashed ${C.green}`,
            borderRadius: "12px",
            padding: "10px 16px",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          <p style={{ fontSize: "0.7rem", color: C.muted, margin: 0 }}>
            Your verification code is:
          </p>
          <div
            style={{
              fontSize: "1.8rem",
              fontWeight: 700,
              letterSpacing: "4px",
              color: C.blueDark,
              fontFamily: "monospace",
              marginTop: "2px",
            }}
          >
            {verificationCode}
          </div>
          <p style={{ fontSize: "0.6rem", color: C.muted, margin: "2px 0 0" }}>
            (unique to this session)
          </p>
        </div>

        {/* Code input */}
        <div className="mb-3">
          <label
            style={{
              fontSize: "0.8rem",
              fontWeight: 600,
              color: C.text,
              display: "block",
              marginBottom: "5px",
            }}
          >
            Enter Verification Code
          </label>
          <input
            type="text"
            placeholder="Paste the code"
            value={enteredCode}
            onChange={(e) => setEnteredCode(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: "12px",
              border: `2px solid ${verificationError ? "#dc3545" : "#e8edf2"}`,
              background: "#fafbfc",
              fontSize: "0.9rem",
              outline: "none",
              textAlign: "center",
              letterSpacing: "2px",
              fontFamily: "monospace",
              transition: "border-color 0.3s ease",
              color: C.text,
            }}
            onFocus={(e) => {
              if (!verificationError) e.target.style.borderColor = C.green;
              e.target.style.background = "#ffffff";
            }}
            onBlur={(e) => {
              if (!verificationError) e.target.style.borderColor = "#e8edf2";
              e.target.style.background = "#fafbfc";
            }}
            autoFocus
          />
          {verificationError && (
            <div
              style={{
                color: "#dc3545",
                fontSize: "0.8rem",
                marginTop: "5px",
              }}
            >
              {verificationError}
            </div>
          )}
        </div>

        <button
          onClick={handleVerify}
          disabled={verifying}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "50px",
            border: "none",
            background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})`,
            color: "#fff",
            fontSize: "0.95rem",
            fontWeight: 700,
            cursor: verifying ? "not-allowed" : "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 20px rgba(75,168,106,0.3)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            fontFamily: font,
            opacity: verifying ? 0.65 : 1,
          }}
        >
          {verifying ? (
            <>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
              />
              Verifying...
            </>
          ) : (
            "Verify & Proceed"
          )}
        </button>

        <div style={{ textAlign: "center", marginTop: "14px" }}>
          <button
            onClick={() => {
              setStep("login");
              setVerificationCode("");
              setEnteredCode("");
              setVerificationError("");
            }}
            style={{
              background: "none",
              border: "none",
              color: C.green,
              fontSize: "0.8rem",
              cursor: "pointer",
              fontFamily: font,
              textDecoration: "underline",
              padding: "4px 8px",
            }}
          >
            ← Back to login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
