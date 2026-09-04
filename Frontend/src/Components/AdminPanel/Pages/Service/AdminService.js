import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Apiurl from "../../Environmnet/Apiurl";
import { resolveServiceImage, stripHtml } from "../../../Common/serviceApi";

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
  service:
    "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z M17 21v-4H7v4M7 3v4h6",
  calendar:
    "M8 7V3M16 7V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z M21 21l-4.35-4.35",
  plus: "M12 5v14M5 12h14",
  edit: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7 M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  trash:
    "M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14M10 11v6M14 11v6",
  refresh:
    "M21 2v6h-6M3 22v-6h6M3.5 12A8.5 8.5 0 0 1 20.5 8M3.5 12a8.5 8.5 0 0 0 17 4",
  close: "M18 6L6 18M6 6l12 12",
  check: "M5 13l4 4L19 7",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  chevronLeft: "M15 18l-6-6 6-6",
  chevronRight: "M9 18l6-6-6-6",
  image:
    "M4 16l4-4 4 4 4-4 4 4M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  draft: "M12 8v8M8 12h8",
  view: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  clock: "M12 6v6l4 2 M22 12A10 10 0 1 1 12 2a10 10 0 0 1 10 10z",
  active: "M22 11.08V12a10 10 0 1 1-5.93-9.14",
  inactive: "M18 6L6 18M6 6l12 12",
};

// ── Colors ──────────────────────────────────────────────────────────────────
const PRIMARY = "#2E8B57";
const PRIMARY_DARK = "#1E6B3F";
const PRIMARY_GRADIENT = "linear-gradient(135deg, #2E8B57, #1E6B3F)";
const BORDER = "#D1EDE6";
const TEXT_DARK = "#1E2F2B";
const TEXT_MUTED = "#5E7B6E";
const BG = "#F4FCF8";
const CARD_BG = "#FFFFFF";
const SHADOW = "0 8px 30px rgba(46, 139, 87, 0.08)";
const SHADOW_HOVER = "0 12px 40px rgba(46, 139, 87, 0.15)";

// ── DashboardButton ──────────────────────────────────────────────────────────
const DashboardButton = ({
  variant = "outline",
  children,
  onClick,
  disabled,
  style,
  small = false,
}) => {
  const [hover, setHover] = useState(false);
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
    border:
      isPrimary || isDanger
        ? "none"
        : `1.5px solid ${hover ? PRIMARY : BORDER}`,
    background: isPrimary
      ? hover && !disabled
        ? PRIMARY_DARK
        : PRIMARY
      : isDanger
        ? hover && !disabled
          ? "#B91C1C"
          : "#D63C3C"
        : "white",
    color: isPrimary || isDanger ? "white" : PRIMARY,
    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    opacity: disabled ? 0.5 : 1,
    transform: hover && !disabled && !isDanger ? "translateY(-1px)" : "none",
    boxShadow:
      hover && !disabled && isPrimary
        ? "0 4px 15px rgba(46, 139, 87, 0.3)"
        : "none",
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

// ── Toast ──────────────────────────────────────────────────────────────────
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgClass =
    type === "success"
      ? "bg-success"
      : type === "error"
        ? "bg-danger"
        : "bg-primary";
  const iconPath =
    type === "success"
      ? icons.check
      : type === "error"
        ? icons.close
        : icons.check;

  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 2000 }}>
      <div
        className={`toast fade show d-flex align-items-center ${bgClass} text-white border-0`}
        role="alert"
        style={{ borderRadius: 12, padding: "2px 4px" }}
      >
        <div className="toast-body d-flex align-items-center gap-2">
          <Icon d={iconPath} size={16} color="white" />
          <span className="fw-semibold">{message}</span>
          <button
            type="button"
            className="btn-close btn-close-white ms-auto"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
};

// ── Main Component ──────────────────────────────────────────────────────────
const AdminService = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingService, setDeletingService] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = useCallback(
    (message, type = "success") => setToast({ message, type }),
    [],
  );
  const clearToast = useCallback(() => setToast(null), []);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const filteredServices = services.filter(
    (s) =>
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stripHtml(s.description || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const totalPages = Math.ceil(filteredServices.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedServices = filteredServices.slice(
    startIndex,
    startIndex + rowsPerPage,
  );
  const goToPage = (page) =>
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, rowsPerPage]);

  const fetchServices = useCallback(async (showRefreshState = false) => {
    if (showRefreshState) setRefreshing(true);
    else setLoading(true);

    try {
      const response = await axios.get(`${Apiurl}/service`);
      setServices(Array.isArray(response.data) ? response.data : []);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Failed to load services:", error);
      showToast(error.response?.data?.message || "Failed to load services", "error");
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleRefresh = () => {
    if (!refreshing) fetchServices(true);
  };

  const handleAddServiceClick = () => navigate("/admin/add-treatment");
  const handleViewService = (service) =>
    navigate("/admin/treatment-details", { state: { service } });
  const handleEditService = (service) =>
    navigate("/admin/add-treatment", { state: { editService: service } });

  const openDeleteModal = (service) => {
    setDeletingService(service);
    setShowDeleteModal(true);
  };
  const confirmDelete = async () => {
    if (!deletingService?._id) return;

    try {
      await axios.delete(`${Apiurl}/service/${deletingService._id}`);
      setServices((current) =>
        current.filter((service) => service._id !== deletingService._id),
      );
      showToast("Service deleted successfully", "success");
    } catch (error) {
      console.error("Failed to delete service:", error);
      showToast(error.response?.data?.message || "Failed to delete service", "error");
    } finally {
      setShowDeleteModal(false);
      setDeletingService(null);
    }
  };

  // Stats
  const stats = {
    total: services.length,
    active: services.filter((s) => s.status === "Active").length,
    inactive: services.filter((s) => s.status === "Inactive").length,
    patients: services.reduce((acc, s) => acc + (s.patients || 0), 0),
  };

  const statCards = [
    {
      label: "Total Services",
      value: stats.total,
      icon: icons.service,
      color: PRIMARY,
      bg: "#E8F5E9",
    },
    {
      label: "Active",
      value: stats.active,
      icon: icons.active,
      color: "#4CAF50",
      bg: "#D4F3E8",
    },
    {
      label: "Inactive",
      value: stats.inactive,
      icon: icons.inactive,
      color: "#FF9800",
      bg: "#FFF3E0",
    },
    {
      label: "Total Patients",
      value: stats.patients.toLocaleString(),
      icon: icons.view,
      color: "#2196F3",
      bg: "#E3F2FD",
    },
  ];

  // ─── Card Styles ──────────────────────────────────────────────────────────
  const card = {
    background: CARD_BG,
    borderRadius: 20,
    border: `1px solid ${BORDER}`,
    boxShadow: SHADOW,
    overflow: "hidden",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
    cursor: "pointer",
    position: "relative",
  };

  const cardImgStyle = {
    height: "180px",
    objectFit: "cover",
    width: "100%",
    transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
  };

  const categoryColors = {
    Medical: "#2E8B57",
    Surgical: "#9C27B0",
    Emergency: "#D63C3C",
    Therapy: "#2196F3",
    Default: "#6B7280",
  };

  const statusColors = {
    Active: { bg: "#D4F3E8", text: "#2E8B57" },
    Inactive: { bg: "#FEE2E2", text: "#D63C3C" },
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
      {/* ─── Header ────────────────────────────────────────────────── */}
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: TEXT_DARK,
              margin: 0,
              letterSpacing: "-0.5px",
            }}
          >
             Services
          </h1>
          <p style={{ fontSize: 14, color: TEXT_MUTED, margin: "4px 0 0" }}>
            Manage hospital services and departments
          </p>
        </div>
        <div className="d-flex gap-2 align-items-center">
          <DashboardButton
            variant="outline"
            onClick={handleRefresh}
            disabled={refreshing}
            // small
          >
            {refreshing ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
              />
            ) : (
              <Icon d={icons.refresh} size={14} />
            )}
            {refreshing ? "Refreshing..." : "Refresh"}
          </DashboardButton>
          <DashboardButton
            variant="primary"
            onClick={handleAddServiceClick}
            style={{ background: PRIMARY_GRADIENT }}
          >
            <Icon d={icons.plus} size={14} color="white" /> Add Service
          </DashboardButton>
        </div>
      </div>

      {/* ─── Stats ────────────────────────────────────────────────── */}
      <div className="row g-3 mb-4">
        {statCards.map((s, i) => (
          <div key={i} className="col-lg-3 col-md-6">
            <div
              style={{
                background: "white",
                borderRadius: 16,
                border: `1px solid ${BORDER}`,
                boxShadow: SHADOW,
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                gap: 14,
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-2px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: s.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon d={s.icon} size={20} color={s.color} />
              </div>
              <div>
                <div
                  style={{
                    fontSize: 11,
                    color: TEXT_MUTED,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.4px",
                  }}
                >
                  {s.label}
                </div>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 800,
                    color: TEXT_DARK,
                    lineHeight: 1.2,
                  }}
                >
                  {s.value}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ─── Search ────────────────────────────────────────────────── */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <div
          style={{
            flex: 1,
            background: "white",
            borderRadius: 10,
            border: `1px solid ${BORDER}`,
            boxShadow: SHADOW,
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "5x 14px",
            transition: "border-color 0.2s, box-shadow 0.2s",
          }}
        >
          <Icon d={icons.search} size={16} color={TEXT_MUTED} className='p-3'/>
          <input
            type="text"
            placeholder="Search by title, category, or description..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="form-control border-0 shadow-none"
            style={{ fontSize: 13, color: TEXT_DARK, padding: "8px 10px" }}
          />
          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm("");
                setCurrentPage(1);
              }}
              style={{
                background: "none",
                border: "none",
                color: TEXT_MUTED,
                cursor: "pointer",
              }}
            >
              <Icon d={icons.close} size={14} />
            </button>
          )}
        </div>
        <div
          className="d-flex align-items-center gap-2 text-muted"
          style={{
            background: "white",
            padding: "8px 14px",
            borderRadius: 10,
            border: `1.5px solid ${BORDER}`,
            fontSize: 13,
            boxShadow: SHADOW,
          }}
        >
          <span>Show</span>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="form-select-sm border-0 shadow-none"
            style={{ fontSize: 13, fontWeight: 600, background: "transparent" }}
          >
            <option value={3}>3</option>
            <option value={6}>6</option>
            <option value={9}>9</option>
            <option value={12}>12</option>
          </select>
          <span>entries</span>
        </div>
      </div>

      {/* ─── Service Cards ────────────────────────────────────────── */}
      <div className="row g-4">
        {paginatedServices.map((service) => {
          const catColor =
            categoryColors[service.category] || categoryColors.Default;
          const statusStyle =
            statusColors[service.status] || statusColors.Active;
          return (
            <div key={service.id} className="col-md-6 col-lg-4">
              <div
                style={card}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = SHADOW_HOVER;
                  const img = e.currentTarget.querySelector(".card-image");
                  if (img) img.style.transform = "scale(1.03)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = SHADOW;
                  const img = e.currentTarget.querySelector(".card-image");
                  if (img) img.style.transform = "scale(1)";
                }}
              >
                {/* Image with overlay */}
                <div style={{ position: "relative", overflow: "hidden" }}>
                  <img
                    src={resolveServiceImage(service.image)}
                    alt={service.title}
                    className="card-image"
                    style={cardImgStyle}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200'%3E%3Crect width='400' height='200' fill='%23D1EDE6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%232E8B57' font-size='20' font-family='sans-serif'%3ENo Image%3C/text%3E%3C/svg%3E";
                    }}
                  />
                  {/* Category tag */}
                  <div
                    style={{
                      position: "absolute",
                      top: 12,
                      left: 12,
                      background: catColor,
                      color: "white",
                      padding: "3px 12px",
                      borderRadius: 20,
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.4px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    }}
                  >
                    {service.category || "General"}
                  </div>
                  {/* Status badge */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 12,
                      right: 12,
                      background: statusStyle.bg,
                      color: statusStyle.text,
                      padding: "3px 12px",
                      borderRadius: 20,
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.4px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    }}
                  >
                    {service.status}
                  </div>
                </div>

                {/* Content */}
                <div
                  className="p-3 d-flex flex-column flex-grow-1"
                  style={{ flex: 1 }}
                >
                  <div style={{ marginBottom: 4 }}>
                    <h5
                      style={{
                        fontWeight: 700,
                        fontSize: "1.05rem",
                        color: TEXT_DARK,
                        margin: 0,
                        lineHeight: 1.3,
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {service.title}
                    </h5>
                  </div>
                  <p
                    style={{
                      color: TEXT_MUTED,
                      fontSize: "0.9rem",
                      flex: 1,
                      marginBottom: 8,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {stripHtml(service.description)}
                  </p>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "#9ca3af",
                      marginBottom: 12,
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <span>
                      <Icon d={icons.view} size={12} color="#9ca3af" />{" "}
                      {service.patients || 0} patients
                    </span>
                    <span style={{ opacity: 0.5 }}>·</span>
                    <span>
                      <Icon d={icons.user} size={12} color="#9ca3af" />{" "}
                      {service.doctors || 0} doctors
                    </span>
                  </div>

                  {/* Buttons – centered */}
                  <div
                    className="d-flex gap-2 justify-content-center"
                    style={{ marginTop: "auto" }}
                  >
                    <DashboardButton
                      variant="outline"
                      small
                      onClick={() => handleViewService(service)}
                    >
                      <Icon d={icons.eye} size={12} /> View
                    </DashboardButton>
                    <DashboardButton
                      variant="outline"
                      small
                      onClick={() => handleEditService(service)}
                    >
                      <Icon d={icons.edit} size={12} /> Edit
                    </DashboardButton>
                    <DashboardButton
                      variant="danger"
                      small
                      onClick={(e) => {
                        e.stopPropagation();
                        openDeleteModal(service);
                      }}
                      style={{ borderColor: "#FECACA" }}
                    >
                      <Icon d={icons.trash} size={12} /> Delete
                    </DashboardButton>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {loading && (
        <div
          style={{
            background: "white",
            borderRadius: 20,
            border: `1px solid ${BORDER}`,
            boxShadow: SHADOW,
            textAlign: "center",
            padding: 50,
            color: TEXT_MUTED,
          }}
        >
          <div className="spinner-border" style={{ color: PRIMARY }} role="status" />
          <p style={{ marginTop: 12, marginBottom: 0 }}>Loading services...</p>
        </div>
      )}

      {!loading && paginatedServices.length === 0 && (
        <div
          style={{
            background: "white",
            borderRadius: 20,
            border: `1px solid ${BORDER}`,
            boxShadow: SHADOW,
            textAlign: "center",
            padding: 60,
            color: TEXT_MUTED,
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 12 }}></div>
          <h4 style={{ fontWeight: 700, color: TEXT_DARK, marginBottom: 4 }}>
            No services found
          </h4>
          <p style={{ fontSize: 14 }}>
            Click "Add Service" to create your first service! 🚀
          </p>
        </div>
      )}

      {/* ─── Pagination ────────────────────────────────────────────── */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center align-items-center gap-2 mt-4">
          <span style={{ fontSize: 13, color: TEXT_MUTED }}>
            Showing {filteredServices.length === 0 ? 0 : startIndex + 1}–
            {Math.min(startIndex + rowsPerPage, filteredServices.length)} of{" "}
            {filteredServices.length}
          </span>
          <DashboardButton
            variant="outline"
            small
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <Icon d={icons.chevronLeft} size={14} />
          </DashboardButton>
          {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1).map(
            (page) => {
              if (totalPages > 7 && page === 4)
                return <span key="ellipsis">…</span>;
              return (
                <DashboardButton
                  key={page}
                  variant={page === currentPage ? "primary" : "outline"}
                  small
                  onClick={() => goToPage(page)}
                  style={
                    page === currentPage ? { background: PRIMARY_GRADIENT } : {}
                  }
                >
                  {page}
                </DashboardButton>
              );
            },
          )}
          {totalPages > 7 && <span>…</span>}
          <DashboardButton
            variant="outline"
            small
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <Icon d={icons.chevronRight} size={14} />
          </DashboardButton>
        </div>
      )}

      {/* ─── Delete Modal ────────────────────────────────────────────── */}
      {showDeleteModal && deletingService && (
        <div
          className="modal d-block"
          tabIndex="-1"
          role="dialog"
          style={{
            backgroundColor: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(8px)",
            zIndex: 9999,
          }}
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            style={{ maxWidth: 420 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="modal-content border-0 shadow"
              style={{
                borderRadius: 24,
                background: "white",
                padding: "32px 28px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "#FEE2E2",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <Icon d={icons.trash} size={24} color="#D63C3C" />
              </div>
              <h5
                style={{
                  fontWeight: 700,
                  fontSize: 20,
                  color: TEXT_DARK,
                  marginBottom: 4,
                }}
              >
                Confirm Delete
              </h5>
              <p style={{ color: TEXT_MUTED, fontSize: 14, marginBottom: 20 }}>
                Are you sure you want to delete "
                <strong>{deletingService.title}</strong>"?
                <br />
                This action{" "}
                <strong style={{ color: "#D63C3C" }}>cannot be undone</strong>.
              </p>
              <div className="d-flex justify-content-center gap-2">
                <DashboardButton
                  variant="outline"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </DashboardButton>
                <DashboardButton
                  variant="danger"
                  onClick={confirmDelete}
                  style={{ background: "#D63C3C" }}
                >
                  Delete
                </DashboardButton>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={clearToast} />
      )}
    </div>
  );
};

export default AdminService;
