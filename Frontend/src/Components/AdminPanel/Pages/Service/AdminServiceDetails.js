import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { normalizeConditions, resolveServiceImage } from "../../../Common/serviceApi";

// ── Icons ──────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 18, color = "currentColor", strokeWidth = 1.8 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={d} />
  </svg>
);

const icons = {
  arrowLeft: "M19 12H5M12 19l-7-7 7-7",
  edit: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7 M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  calendar: "M8 7V3M16 7V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  image: "M4 16l4-4 4 4 4-4 4 4M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  view: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  service: "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z M17 21v-4H7v4M7 3v4h6",
};

// ── Colors ──────────────────────────────────────────────────────────────────
const PRIMARY = "#2E8B57";
const PRIMARY_GRADIENT = "linear-gradient(135deg, #2E8B57, #1E6B3F)";
const BORDER = "#D1EDE6";
const TEXT_DARK = "#1E2F2B";
const TEXT_MUTED = "#5E7B6E";
const BG = "#F4FCF8";
const CARD_BG = "#FFFFFF";
const SHADOW = "0 8px 30px rgba(46, 139, 87, 0.08)";

// ── DashboardButton ──────────────────────────────────────────────────────────
const DashboardButton = ({ variant = "outline", children, onClick, disabled, style, small = false }) => {
  const [hover, setHover] = React.useState(false);
  const isPrimary = variant === "primary";
  const isDanger = variant === "danger";

  const base = {
    display: "inline-flex",
    alignItems: "center",
    gap: small ? 4 : 6,
    fontWeight: 600,
    fontSize: small ? 11 : 12,
    padding: small ? "5px 14px" : "8px 20px",
    borderRadius: 30,
    cursor: disabled ? "default" : "pointer",
    border: isPrimary || isDanger ? "none" : `1.5px solid ${hover ? PRIMARY : BORDER}`,
    background: isPrimary ? (hover && !disabled ? "#1E6B3F" : PRIMARY) : isDanger ? (hover && !disabled ? "#B91C1C" : "#D63C3C") : "white",
    color: isPrimary || isDanger ? "white" : PRIMARY,
    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    opacity: disabled ? 0.5 : 1,
    transform: hover && !disabled && !isDanger ? "translateY(-1px)" : "none",
    boxShadow: hover && !disabled && isPrimary ? "0 4px 15px rgba(46, 139, 87, 0.3)" : "none",
    ...(style || {}),
  };
  return (
    <button
      style={base}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

const AdminServiceDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const service = location.state?.service;

  // Redirect if no service data
  React.useEffect(() => {
    if (!service) {
      navigate("/admin/treatment");
    }
  }, [service, navigate]);

  if (!service) {
    return null; // or a loading spinner
  }

  const card = {
    background: CARD_BG,
    borderRadius: 18,
    border: `1px solid ${BORDER}`,
    boxShadow: SHADOW,
    padding: "24px 28px",
  };

  const categoryColors = {
    Medical: "#2E8B57",
    Surgical: "#9C27B0",
    Emergency: "#D63C3C",
    Therapy: "#2196F3",
    Diagnostic: "#FF9800",
    Other: "#6B7280",
  };

  const statusColors = {
    Active: { bg: "#D4F3E8", text: "#2E8B57" },
    Inactive: { bg: "#FEE2E2", text: "#D63C3C" },
  };

  const catColor = categoryColors[service.category] || categoryColors.Other;
  const statusStyle = statusColors[service.status] || statusColors.Active;
  const conditions = normalizeConditions(service.conditions);

  return (
    <div
      style={{
        padding: "24px 28px",
        background: BG,
        minHeight: "100vh",
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        fontSize: 14,
      }}
    >
      {/* ─── Header ────────────────────────────────────────────────── */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center gap-3">
          <DashboardButton variant="outline" small onClick={() => navigate("/admin/treatment")}>
            <Icon d={icons.arrowLeft} size={14} /> Back to Services
          </DashboardButton>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: TEXT_DARK, margin: 0 }}>
            Service Details
          </h1>
        </div>
        <div className="d-flex gap-2">
          <DashboardButton variant="outline" onClick={() => navigate("/admin/treatment")}>
            Close
          </DashboardButton>
          <DashboardButton
            variant="primary"
            onClick={() => navigate("/admin/add-treatment", { state: { editService: service } })}
            style={{ background: PRIMARY_GRADIENT }}
          >
            <Icon d={icons.edit} size={14} color="white" /> Edit
          </DashboardButton>
        </div>
      </div>

      {/* ─── Content Card ────────────────────────────────────────── */}
      <div style={card}>
        {/* Featured Image */}
        {service.image && (
          <div style={{ marginBottom: 20 }}>
            <img
              src={resolveServiceImage(service.image)}
              alt={service.title}
              style={{
                width: "100%",
                maxHeight: 400,
                objectFit: "cover",
                borderRadius: 12,
                border: `1px solid ${BORDER}`,
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Crect width='800' height='400' fill='%23D1EDE6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%232E8B57' font-size='24' font-family='sans-serif'%3ENo Image%3C/text%3E%3C/svg%3E";
              }}
            />
          </div>
        )}

        {/* Title */}
        <div style={{ marginBottom: 6 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: TEXT_DARK, margin: 0 }}>
            {service.title}
          </h1>
        </div>

        {/* Category & Status Tags */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <span
            style={{
              background: catColor,
              color: "white",
              padding: "2px 14px",
              borderRadius: 20,
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.4px",
            }}
          >
            {service.category || "General"}
          </span>
          <span
            style={{
              background: statusStyle.bg,
              color: statusStyle.text,
              padding: "2px 14px",
              borderRadius: 20,
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.4px",
            }}
          >
            {service.status}
          </span>
        </div>

        {/* Metadata: Doctors & Patients */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 24,
            fontSize: 14,
            color: TEXT_MUTED,
            marginBottom: 20,
            borderBottom: `1px solid ${BORDER}`,
            paddingBottom: 16,
          }}
        >
          <span>
            <Icon d={icons.user} size={14} style={{ marginRight: 6 }} />
            {service.doctors || 0} Doctors
          </span>
          <span>
            <Icon d={icons.view} size={14} style={{ marginRight: 6 }} />
            {service.patients || 0} Patients (approx.)
          </span>
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 15,
            lineHeight: 1.8,
            color: "#334155",
          }}
          dangerouslySetInnerHTML={{ __html: service.description || "<p>No description provided.</p>" }}
        />

        {conditions.length > 0 && (
          <div className="mt-4">
            <h5 style={{ color: TEXT_DARK, fontWeight: 700 }}>Conditions We Treat</h5>
            <div className="row g-3">
              {conditions.map((condition, index) => (
                <div className="col-12" key={condition._id || `condition-${index}`}>
                  <div style={{ background: "#F0FAF4", borderRadius: 12, padding: 18 }}>
                    <strong style={{ color: TEXT_DARK, fontSize: 16 }}>
                      {condition.title}
                    </strong>

                    {condition.description && (
                      <p style={{ color: TEXT_MUTED, margin: "8px 0 14px", lineHeight: 1.7 }}>
                        {condition.description}
                      </p>
                    )}

                    <div className="row g-3">
                      <div className="col-md-6">
                        <div style={{ background: "white", borderRadius: 10, padding: 14, height: "100%" }}>
                          <strong style={{ color: TEXT_DARK, fontSize: 13 }}>
                            Common Symptoms
                          </strong>
                          {(condition.symptoms || []).length > 0 ? (
                            <ul style={{ color: TEXT_MUTED, lineHeight: 1.8, paddingLeft: 20, margin: "8px 0 0" }}>
                              {condition.symptoms.map((item, itemIndex) => (
                                <li key={`symptom-${index}-${itemIndex}`}>{item}</li>
                              ))}
                            </ul>
                          ) : (
                            <p style={{ color: TEXT_MUTED, margin: "8px 0 0" }}>
                              No symptoms added.
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div style={{ background: "white", borderRadius: 10, padding: 14, height: "100%" }}>
                          <strong style={{ color: TEXT_DARK, fontSize: 13 }}>
                            How We Help
                          </strong>
                          {(condition.howWeHelp || []).length > 0 ? (
                            <ul style={{ color: TEXT_MUTED, lineHeight: 1.8, paddingLeft: 20, margin: "8px 0 0" }}>
                              {condition.howWeHelp.map((item, itemIndex) => (
                                <li key={`help-${index}-${itemIndex}`}>{item}</li>
                              ))}
                            </ul>
                          ) : (
                            <p style={{ color: TEXT_MUTED, margin: "8px 0 0" }}>
                              No treatment points added.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {(service.quote || service.approach) && (
          <div className="row g-3 mt-2">
            {service.quote && (
              <div className="col-md-6">
                <div style={{ background: "#F0FAF4", borderRadius: 12, padding: 18, height: "100%" }}>
                  <strong style={{ color: TEXT_DARK }}>Highlight Quote</strong>
                  <p style={{ color: TEXT_MUTED, margin: "8px 0 0" }}>{service.quote}</p>
                </div>
              </div>
            )}
            {service.approach && (
              <div className="col-md-6">
                <div style={{ background: "#F8FAFC", borderRadius: 12, padding: 18, height: "100%" }}>
                  <strong style={{ color: TEXT_DARK }}>Treatment Approach</strong>
                  <p style={{ color: TEXT_MUTED, margin: "8px 0 0" }}>{service.approach}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminServiceDetails;