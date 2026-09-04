// Enquire Page – Fully Integrated with Backend API
import React, { useState, useEffect, useCallback } from "react";
import API_BASE_URL from '../../Environmnet/Apiurl'

// ── Icons ──────────────────────────────────────────────────────────────────────
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
  user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
  phone:
    "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z",
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
  leaf: "M12 2C6 2 3 7 3 12c0 4 2.5 7.5 6 9.5M12 2c6 0 9 5 9 10 0 4-2.5 7.5-6 9.5M12 2v20",
  chevronLeft: "M15 18l-6-6 6-6",
  chevronRight: "M9 18l6-6-6-6",
  message: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
};

// ── Colors ──────────────────────────────────────────────────────────────────
const GREEN = "#2E8B57";
const GREEN_HOVER = "#247346";
const BORDER = "#D1EDE6";
const TEXT_DARK = "#1E2F2B";
const TEXT_MUTED = "#5E7B6E";
const BG = "#F4FCF8";
const CARD_BG = "#FFFFFF";

// ── Custom Dashboard Button ──────────────────────────────────────────────
const DashboardButton = ({
  variant = "outline",
  children,
  onClick,
  disabled,
  style,
  small = false,
}) => {
  const [hover, setHover] = useState(false);

  const base = {
    display: "inline-flex",
    alignItems: "center",
    gap: small ? 4 : 6,
    fontWeight: 600,
    fontSize: small ? 11 : 12,
    padding: small ? "5px 12px" : "7px 18px",
    borderRadius: 30,
    cursor: disabled ? "default" : "pointer",
    border:
      variant === "primary" ? "none" : `1.5px solid ${hover ? GREEN : BORDER}`,
    background:
      variant === "primary"
        ? hover && !disabled
          ? GREEN_HOVER
          : GREEN
        : "white",
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
      >
        <div className="toast-body d-flex align-items-center gap-2">
          <Icon d={iconPath} size={16} color="white" />
          <span className="fw-semibold">{message}</span>
          <button
            type="button"
            className="btn-close btn-close-white ms-auto"
            onClick={onClose}
          ></button>
        </div>
      </div>
    </div>
  );
};

// ── Main Enquire Component ────────────────────────────────────────────────
const Enquire = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [viewingEnquiry, setViewingEnquiry] = useState(null);
  const [editingEnquiry, setEditingEnquiry] = useState(null);
  const [deletingEnquiry, setDeletingEnquiry] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [formData, setFormData] = useState({ status: "", note: "" });
  const [addFormData, setAddFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [toast, setToast] = useState(null);
  const showToast = useCallback(
    (message, type = "success") => setToast({ message, type }),
    []
  );
  const clearToast = useCallback(() => setToast(null), []);

  // ── Fetch all enquiries ──────────────────────────────────────────────
  const fetchEnquiries = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/enquire`);
      if (!response.ok) throw new Error("Failed to fetch enquiries");
      const data = await response.json();
      const mapped = data.map((item) => ({
        id: item._id,
        name: item.name,
        email: item.email,
        phone: item.mobileNumber,
        message: item.message,
        status: item.status || "New",
        date: item.enquire_date,
        enquire_id: item.enquire_id,
      }));
      setEnquiries(mapped);
      setLastUpdated(new Date());
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchEnquiries();
  }, [fetchEnquiries]);

  const handleRefresh = () => {
    if (refreshing) return;
    setRefreshing(true);
    fetchEnquiries().finally(() => setRefreshing(false));
  };

  // ── Pagination & filtering ──────────────────────────────────────────
  const [currentPage, setCurrentPage] = useState(1);
  const filteredEnquiries = enquiries.filter(
    (e) =>
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.message.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredEnquiries.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedEnquiries = filteredEnquiries.slice(
    startIndex,
    startIndex + rowsPerPage
  );
  const goToPage = (page) =>
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));

  // ── Modal handlers ──────────────────────────────────────────────────
  const handleView = (enquiry) => {
    setViewingEnquiry(enquiry);
    setShowViewModal(true);
  };

  const openEditModal = (enquiry) => {
    setEditingEnquiry(enquiry);
    setFormData({ status: enquiry.status, note: "" });
    setShowEditModal(true);
  };

  // ── UPDATE ──────────────────────────────────────────────────────────
  const handleUpdate = async () => {
    if (!editingEnquiry) return;
    try {
      const payload = { status: formData.status };
      const response = await fetch(
        `${API_BASE_URL}/enquire/${editingEnquiry.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) throw new Error("Update failed");
      const updated = await response.json();
      setEnquiries((prev) =>
        prev.map((e) =>
          e.id === editingEnquiry.id
            ? { ...e, status: updated.status || formData.status }
            : e
        )
      );
      showToast("Enquiry updated successfully", "success");
      setShowEditModal(false);
      setEditingEnquiry(null);
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  // ── ADD ──────────────────────────────────────────────────────────────
  const handleAddEnquiry = async () => {
    if (
      !addFormData.name ||
      !addFormData.email ||
      !addFormData.phone ||
      !addFormData.message
    ) {
      showToast("Please fill all required fields", "error");
      return;
    }
    try {
      const payload = {
        name: addFormData.name,
        email: addFormData.email,
        mobileNumber: addFormData.phone,
        message: addFormData.message,
        enquire_date: new Date().toISOString().split("T")[0],
        status: "New",
      };
      const response = await fetch(`${API_BASE_URL}/enquire`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Add failed");
      const newEnquiry = await response.json();
      const mapped = {
        id: newEnquiry._id,
        name: newEnquiry.name,
        email: newEnquiry.email,
        phone: newEnquiry.mobileNumber,
        message: newEnquiry.message,
        status: newEnquiry.status || "New",
        date: newEnquiry.enquire_date,
        enquire_id: newEnquiry.enquire_id,
      };
      setEnquiries((prev) => [mapped, ...prev]);
      showToast("Enquiry added successfully", "success");
      setShowAddModal(false);
      setAddFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  const openDeleteModal = (enquiry) => {
    setDeletingEnquiry(enquiry);
    setShowDeleteModal(true);
  };

  // ── DELETE ──────────────────────────────────────────────────────────
  const confirmDelete = async () => {
    if (!deletingEnquiry) return;
    try {
      const response = await fetch(
        `${API_BASE_URL}/enquire/${deletingEnquiry.id}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Delete failed");
      setEnquiries((prev) => prev.filter((e) => e.id !== deletingEnquiry.id));
      showToast("Enquiry deleted successfully", "success");
      setShowDeleteModal(false);
      setDeletingEnquiry(null);
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  // ── Stats ────────────────────────────────────────────────────────────
  const stats = {
    total: enquiries.length,
    new: enquiries.filter((e) => e.status === "New").length,
    contacted: enquiries.filter((e) => e.status === "Contacted").length,
    resolved: enquiries.filter((e) => e.status === "Resolved").length,
  };
  const statCards = [
    {
      label: "Total Enquiries",
      value: stats.total,
      icon: icons.message,
      color: "#4CAF50",
      bg: "#E8F5E9",
      trend: "all messages",
    },
    {
      label: "New",
      value: stats.new,
      icon: icons.plus,
      color: GREEN,
      bg: "#D4F3E8",
      trend: "unread",
    },
    {
      label: "Contacted",
      value: stats.contacted,
      icon: icons.phone,
      color: "#2196F3",
      bg: "#E3F2FD",
      trend: "in progress",
    },
    {
      label: "Resolved",
      value: stats.resolved,
      icon: icons.check,
      color: "#6B7280",
      bg: "#F3F4F6",
      trend: "completed",
    },
  ];

  const card = {
    background: CARD_BG,
    borderRadius: 18,
    border: `1px solid ${BORDER}`,
    boxShadow: "0 2px 12px rgba(46,139,87,0.06)",
    padding: "18px 20px",
  };

  // ── Render ──────────────────────────────────────────────────────────────
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
      {/* Header */}
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: TEXT_DARK, margin: 0, lineHeight: 1.2 }}>
            Enquiries
          </h1>
          <p style={{ fontSize: 13, color: TEXT_MUTED, margin: "2px 0 0", fontWeight: 400 }}>
            Manage patient enquiries and messages
          </p>
        </div>
        <div className="d-flex gap-2 align-items-center">
          <DashboardButton variant="outline" onClick={handleRefresh} disabled={refreshing}>
            {refreshing ? (
              <span className="spinner-border spinner-border-sm" role="status" />
            ) : (
              <Icon d={icons.refresh} size={14} />
            )}
            {refreshing ? "Refreshing..." : "Refresh"}
          </DashboardButton>
          <DashboardButton variant="primary" onClick={() => setShowAddModal(true)}>
            <Icon d={icons.plus} size={14} color="white" /> Add Enquiry
          </DashboardButton>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="row g-3 mb-4">
        {statCards.map((s, i) => (
          <div key={i} className="col-lg-3 col-md-6">
            <div style={{ ...card, display: "flex", alignItems: "center", gap: 14 }}>
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
                <div style={{ fontSize: 12, color: TEXT_MUTED, fontWeight: 600 }}>{s.label}</div>
                <div style={{ fontSize: 26, fontWeight: 800, color: TEXT_DARK, lineHeight: 1.2 }}>
                  {s.value}
                </div>
                <div style={{ fontSize: 11, color: s.color, fontWeight: 500 }}>{s.trend}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search + Show entries */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <div
          style={{
            flex: 1,
            ...card,
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 18px",
          }}
        >
          <Icon d={icons.search} size={16} color={TEXT_MUTED} />
          <input
            type="text"
            placeholder="Search by name, email, message..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="form-control border-0 shadow-none"
            style={{ fontSize: 13, color: TEXT_DARK }}
          />
        </div>
        <div
          className="d-flex align-items-center gap-2 text-muted"
          style={{
            background: "white",
            padding: "8px 14px",
            borderRadius: 10,
            border: `1.5px solid ${BORDER}`,
            fontSize: 13,
          }}
        >
          <span>Show</span>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="form-select form-select-sm border-0 shadow-none"
            style={{ fontSize: 13, fontWeight: 600 }}
          >
            <option value={2}>2</option>
            <option value={4}>4</option>
            <option value={6}>6</option>
            <option value={10}>10</option>
          </select>
          <span>entries</span>
        </div>
      </div>

      {/* Enquiry Cards */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {paginatedEnquiries.map((enq) => (
            <div
              key={enq.id}
              style={{
                ...card,
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 20,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#cbd5e1")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = BORDER)}
            >
              <div className="d-flex align-items-start gap-3 flex-grow-1" style={{ minWidth: 200 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: `linear-gradient(135deg, #2E8B57, #A8E6CF)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: 700,
                    fontSize: 14,
                  }}
                >
                  {enq.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: TEXT_DARK, fontSize: 14 }}>{enq.name}</div>
                  <div style={{ fontSize: 12, color: TEXT_MUTED }}>
                    {enq.email} · {enq.phone}
                  </div>
                  <div
                    className="d-flex align-items-start gap-2 mt-1"
                    style={{ fontSize: 13, color: "#475569" }}
                  >
                    <Icon d={icons.message} size={13} color={TEXT_MUTED} style={{ marginTop: 2 }} />
                    <span style={{ lineHeight: 1.4 }}>{enq.message}</span>
                  </div>
                </div>
              </div>
              <div style={{ minWidth: 100 }}>
                <span
                  className={`badge rounded-pill ${
                    enq.status === "New"
                      ? "bg-success"
                      : enq.status === "Contacted"
                      ? "bg-info"
                      : "bg-secondary"
                  }`}
                >
                  {enq.status}
                </span>
              </div>
              <div style={{ minWidth: 80, fontSize: 12, color: TEXT_MUTED }}>{enq.date}</div>
              <div className="d-flex gap-2">
                <DashboardButton variant="outline" small onClick={() => handleView(enq)}>
                  <Icon d={icons.eye} size={12} /> View
                </DashboardButton>
                <DashboardButton variant="outline" small onClick={() => openEditModal(enq)}>
                  <Icon d={icons.edit} size={12} /> Update
                </DashboardButton>
                <DashboardButton
                  variant="outline"
                  small
                  onClick={() => openDeleteModal(enq)}
                  style={{ borderColor: "#FECACA", color: "#D63C3C" }}
                >
                  <Icon d={icons.trash} size={12} /> Delete
                </DashboardButton>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && paginatedEnquiries.length === 0 && (
        <div style={{ ...card, textAlign: "center", padding: 40, color: TEXT_MUTED }}>
          No enquiries found.
        </div>
      )}

      {/* Pagination */}
      <div className="d-flex justify-content-center align-items-center gap-2 mt-4">
        <span style={{ fontSize: 13, color: TEXT_MUTED }}>
          Showing {filteredEnquiries.length === 0 ? 0 : startIndex + 1}–
          {Math.min(startIndex + rowsPerPage, filteredEnquiries.length)} of {filteredEnquiries.length}
        </span>
        <DashboardButton
          variant="outline"
          small
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <Icon d={icons.chevronLeft} size={14} />
        </DashboardButton>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <DashboardButton
            key={page}
            variant={page === currentPage ? "primary" : "outline"}
            small
            onClick={() => goToPage(page)}
          >
            {page}
          </DashboardButton>
        ))}
        <DashboardButton
          variant="outline"
          small
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <Icon d={icons.chevronRight} size={14} />
        </DashboardButton>
      </div>

      {/* ─── MODALS ─── */}

      {/* Add Modal */}
      {showAddModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.25)", backdropFilter: "blur(4px)" }}
          onClick={() => setShowAddModal(false)}
        >
          <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div
              className="modal-content border-0 shadow"
              style={{ borderRadius: 18, border: `1px solid ${BORDER}` }}
            >
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title" style={{ fontWeight: 700, fontSize: 17, color: TEXT_DARK }}>
                  Add New Enquiry
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label" style={{ fontWeight: 600, fontSize: 12, color: TEXT_DARK }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={addFormData.name}
                    onChange={(e) => setAddFormData({ ...addFormData, name: e.target.value })}
                    style={{ borderRadius: 8, borderColor: BORDER }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" style={{ fontWeight: 600, fontSize: 12, color: TEXT_DARK }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    value={addFormData.email}
                    onChange={(e) => setAddFormData({ ...addFormData, email: e.target.value })}
                    style={{ borderRadius: 8, borderColor: BORDER }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" style={{ fontWeight: 600, fontSize: 12, color: TEXT_DARK }}>
                    Phone *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={addFormData.phone}
                    onChange={(e) => setAddFormData({ ...addFormData, phone: e.target.value })}
                    style={{ borderRadius: 8, borderColor: BORDER }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" style={{ fontWeight: 600, fontSize: 12, color: TEXT_DARK }}>
                    Message *
                  </label>
                  <textarea
                    rows={3}
                    className="form-control"
                    value={addFormData.message}
                    onChange={(e) => setAddFormData({ ...addFormData, message: e.target.value })}
                    style={{ borderRadius: 8, borderColor: BORDER, resize: "vertical" }}
                  />
                </div>
              </div>
              <div className="modal-footer border-0 pt-0">
                <DashboardButton variant="outline" onClick={() => setShowAddModal(false)}>
                  Cancel
                </DashboardButton>
                <DashboardButton variant="primary" onClick={handleAddEnquiry}>
                  Add Enquiry
                </DashboardButton>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && viewingEnquiry && (
        <div
          className="modal d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.25)", backdropFilter: "blur(4px)" }}
          onClick={() => setShowViewModal(false)}
        >
          <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div
              className="modal-content border-0 shadow"
              style={{ borderRadius: 18, border: `1px solid ${BORDER}` }}
            >
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title" style={{ fontWeight: 700, fontSize: 18, color: TEXT_DARK }}>
                  Enquiry Details
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowViewModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-2"><b>Name:</b> {viewingEnquiry.name}</div>
                <div className="mb-2">
                  <Icon d={icons.mail} size={15} color={TEXT_MUTED} /> <b>Email:</b> {viewingEnquiry.email}
                </div>
                <div className="mb-2">
                  <Icon d={icons.phone} size={15} color={TEXT_MUTED} /> <b>Phone:</b> {viewingEnquiry.phone}
                </div>
                <div className="mb-2">
                  <b>Message:</b> <span style={{ color: "#475569" }}>{viewingEnquiry.message}</span>
                </div>
                <div className="mb-2">
                  <b>Status:</b>{" "}
                  <span
                    className={`badge rounded-pill ms-2 ${
                      viewingEnquiry.status === "New"
                        ? "bg-success"
                        : viewingEnquiry.status === "Contacted"
                        ? "bg-info"
                        : "bg-secondary"
                    }`}
                  >
                    {viewingEnquiry.status}
                  </span>
                </div>
                <div><b>Date:</b> {viewingEnquiry.date}</div>
              </div>
              <div className="modal-footer border-0 pt-0">
                <DashboardButton variant="outline" onClick={() => setShowViewModal(false)}>
                  Close
                </DashboardButton>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingEnquiry && (
        <div
          className="modal d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.25)", backdropFilter: "blur(4px)" }}
          onClick={() => setShowEditModal(false)}
        >
          <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div
              className="modal-content border-0 shadow"
              style={{ borderRadius: 18, border: `1px solid ${BORDER}` }}
            >
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title" style={{ fontWeight: 700, fontSize: 17, color: TEXT_DARK }}>
                  Update Enquiry
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label" style={{ fontWeight: 600, fontSize: 12, color: TEXT_DARK }}>
                    Status
                  </label>
                  <select
                    className="form-select"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    style={{ borderRadius: 8, borderColor: BORDER }}
                  >
                    <option>New</option>
                    <option>Contacted</option>
                    <option>Resolved</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label" style={{ fontWeight: 600, fontSize: 12, color: TEXT_DARK }}>
                    Internal Note (optional)
                  </label>
                  <textarea
                    rows={3}
                    className="form-control"
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    style={{ borderRadius: 8, borderColor: BORDER, resize: "vertical" }}
                  />
                </div>
              </div>
              <div className="modal-footer border-0 pt-0">
                <DashboardButton variant="outline" onClick={() => setShowEditModal(false)}>
                  Cancel
                </DashboardButton>
                <DashboardButton variant="primary" onClick={handleUpdate}>
                  Update
                </DashboardButton>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && deletingEnquiry && (
        <div
          className="modal d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.25)", backdropFilter: "blur(4px)" }}
          onClick={() => setShowDeleteModal(false)}
        >
          <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div
              className="modal-content border-0 shadow text-center"
              style={{ borderRadius: 18, border: `1px solid ${BORDER}` }}
            >
              <div className="modal-body">
                <div className="mb-3">
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      background: "#FFE5E3",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 12,
                    }}
                  >
                    <Icon d={icons.trash} size={22} color="#D63C3C" />
                  </div>
                  <h5 className="fw-bold" style={{ color: TEXT_DARK }}>
                    Confirm Delete
                  </h5>
                  <p className="mb-0" style={{ color: TEXT_MUTED, fontSize: 14 }}>
                    Are you sure you want to delete the enquiry from{" "}
                    <strong>{deletingEnquiry.name}</strong>?<br />
                    This action cannot be undone.
                  </p>
                </div>
                <div className="d-flex justify-content-center gap-2">
                  <DashboardButton variant="outline" onClick={() => setShowDeleteModal(false)}>
                    Cancel
                  </DashboardButton>
                  <DashboardButton
                    variant="primary"
                    onClick={confirmDelete}
                    style={{ background: "#D63C3C", border: "none" }}
                  >
                    Delete
                  </DashboardButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={clearToast} />}
    </div>
  );
};

export default Enquire;