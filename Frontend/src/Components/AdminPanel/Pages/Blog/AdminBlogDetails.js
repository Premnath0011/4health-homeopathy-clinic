import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Apiurl from "../../Environmnet/Apiurl";

// ── Icons ──────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 18, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={d} />
  </svg>
);

const icons = {
  arrowLeft: "M19 12H5M12 19l-7-7 7-7",
  calendar: "M8 7V3M16 7V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  image: "M4 16l4-4 4 4 4-4 4 4M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  edit: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7 M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
};

// ── Colors ──────────────────────────────────────────────────────────────────
const GREEN = "#2E8B57";
const GREEN_HOVER = "#247346";
const BORDER = "#D1EDE6";
const TEXT_DARK = "#1E2F2B";
const TEXT_MUTED = "#5E7B6E";
const BG = "#F4FCF8";
const CARD_BG = "#FFFFFF";

// ── DashboardButton ──────────────────────────────────────────────────────
const DashboardButton = ({
  variant = "outline",
  children,
  onClick,
  disabled,
  style,
  small = false,
}) => {
  const [hover, setHover] = React.useState(false);

  const base = {
    display: "inline-flex",
    alignItems: "center",
    gap: small ? 4 : 6,
    fontWeight: 600,
    fontSize: small ? 11 : 12,
    padding: small ? "5px 12px" : "7px 18px",
    borderRadius: 30,
    cursor: disabled ? "default" : "pointer",
    border: variant === "primary" ? "none" : `1.5px solid ${hover ? GREEN : BORDER}`,
    background: variant === "primary" ? (hover && !disabled ? GREEN_HOVER : GREEN) : "white",
    color: variant === "primary" ? "white" : GREEN,
    transition: "all 0.2s",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    opacity: disabled ? 0.5 : 1,
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

const AdminBlogDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const blog = location.state?.blog;

  // If no blog data, redirect back
  React.useEffect(() => {
    if (!blog) {
      navigate("/admin/blog");
    }
  }, [blog, navigate]);

  if (!blog) {
    return null;
  }

  const card = {
    background: CARD_BG,
    borderRadius: 18,
    border: `1px solid ${BORDER}`,
    boxShadow: "0 2px 12px rgba(46,139,87,0.06)",
    padding: "24px 28px",
  };

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
      {/* ── Header ── */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center gap-3">
          <DashboardButton variant="outline" small onClick={() => navigate("/admin/blog")}>
            <Icon d={icons.arrowLeft} size={14} /> Back to Blogs
          </DashboardButton>
          <h1
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: TEXT_DARK,
              margin: 0,
            }}
          >
            Blog Details
          </h1>
        </div>
        <div className="d-flex gap-2">
          <DashboardButton variant="outline" onClick={() => navigate("/admin/blog")}>
            Close
          </DashboardButton>
          <DashboardButton
            variant="primary"
            onClick={() => navigate("/admin/add-blog", { state: { editBlog: blog } })}
          >
            <Icon d={icons.edit} size={14} color="white" /> Edit
          </DashboardButton>
        </div>
      </div>

      {/* ── Content Card ── */}
      <div style={card}>
        {/* Featured Image */}
        {blog.image && (
          <div style={{ marginBottom: 20 }}>
            <img
              src={`${Apiurl.replace("/api", "")}${blog.image}`}
              alt={blog.title}
              style={{
                width: "100%",
                maxHeight: 400,
                objectFit: "cover",
                borderRadius: 12,
                border: `1px solid ${BORDER}`,
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Crect width='800' height='400' fill='%23D1EDE6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%232E8B57' font-size='24' font-family='sans-serif'%3ENo Image%3C/text%3E%3C/svg%3E";
              }}
            />
          </div>
        )}

        {/* Metadata */}
        <h1
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: TEXT_DARK,
            marginBottom: 8,
          }}
        >
          {blog.title}
        </h1>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            fontSize: 14,
            color: TEXT_MUTED,
            marginBottom: 20,
            borderBottom: `1px solid ${BORDER}`,
            paddingBottom: 16,
          }}
        >
          <span>
            <Icon d={icons.user} size={14} style={{ marginRight: 6 }} />
            {blog.author}
          </span>
          <span>
            <Icon d={icons.calendar} size={14} style={{ marginRight: 6 }} />
            {blog.date}
          </span>
          {blog.category && (
            <span>
              <Icon d={icons.image} size={14} style={{ marginRight: 6 }} />
              Category: {blog.category}
            </span>
          )}
        </div>

        {/* Content */}
        {blog.sections && blog.sections.length > 0 ? (
          blog.sections.map((section, idx) => (
            <div key={idx} style={{ marginBottom: 24 }}>
              <h2
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: TEXT_DARK,
                  marginBottom: 8,
                }}
              >
                {section.heading}
              </h2>
              <div
                style={{
                  fontSize: 15,
                  lineHeight: 1.8,
                  color: "#334155",
                }}
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            </div>
          ))
        ) : (
          <div
            style={{
              fontSize: 15,
              lineHeight: 1.8,
              color: "#334155",
            }}
            dangerouslySetInnerHTML={{ __html: blog.content || blog.excerpt }}
          />
        )}
      </div>
    </div>
  );
};

export default AdminBlogDetails;