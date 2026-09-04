// User.jsx — Admin panel user management
// Fully integrated with backend API, uses token & verification code from localStorage

import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import Apiurl from "../../Environmnet/Apiurl";

// ── Icons ─────────────────────────────────────────────────────────────
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
  phone: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z M21 21l-4.35-4.35",
  plus: "M12 5v14M5 12h14",
  edit: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7 M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  trash: "M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14M10 11v6M14 11v6",
  refresh: "M21 2v6h-6M3 22v-6h6M3.5 12A8.5 8.5 0 0 1 20.5 8M3.5 12a8.5 8.5 0 0 0 17 4",
  close: "M18 6L6 18M6 6l12 12",
  check: "M5 13l4 4L19 7",
  doctor: "M12 2a5 5 0 110 10A5 5 0 0112 2zM4 22c0-4.418 3.582-8 8-8s8 3.582 8 8",
  chevronLeft: "M15 18l-6-6 6-6",
  chevronRight: "M9 18l6-6-6-6",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  lock: "M12 2C8.13 2 5 5.13 5 9v2c0 3.87 3.13 7 7 7s7-3.13 7-7V9c0-3.87-3.13-7-7-7z M8 9a4 4 0 1 1 8 0v2a4 4 0 1 1-8 0V9z M12 15v4 M10 19h4",
};

// ── Colors ──────────────────────────────────────────────────────────────
const GREEN = "#2E8B57";
const TEXT_DARK = "#1E2F2B";
const TEXT_MUTED = "#5E7B6E";
const BORDER = "#D1EDE6";
const BG = "#F4FCF8";
const CARD_BG = "#FFFFFF";

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
          />
        </div>
      </div>
    </div>
  );
};

// ── Main Component ──────────────────────────────────────────────────────
const User = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [error, setError] = useState(null);

  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [viewingUser, setViewingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);

  // ── Re‑verification modal state ──────────────────────────────────────
  const [showReverifyModal, setShowReverifyModal] = useState(false);
  const [reverifyCode, setReverifyCode] = useState("");
  const [reverifyError, setReverifyError] = useState("");
  const [reverifying, setReverifying] = useState(false);
  const [pendingAction, setPendingAction] = useState(null); // function to retry

  const [toast, setToast] = useState(null);
  const showToast = useCallback(
    (message, type = "success") => setToast({ message, type }),
    []
  );
  const clearToast = useCallback(() => setToast(null), []);

  // Form fields now match backend schema: user_name, user_mail, user_mobile, user_role, user_password, status
  const [formData, setFormData] = useState({
    user_name: "",
    user_mail: "",
    user_mobile: "",
    user_role: "Staff",
    user_password: "",
    status: "Active",
  });

  // ── Persistent API instance ──────────────────────────────────────────
  const apiRef = useRef(
    axios.create({
      baseURL: Apiurl,
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("adminToken") || ""}`,
        "x-verification-code": localStorage.getItem("verificationCode") || "",
      },
    })
  );

  // Update token and verification code in axios instance whenever they change
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const code = localStorage.getItem("verificationCode");
    if (token) {
      apiRef.current.defaults.headers.Authorization = token;
    }
    if (code) {
      apiRef.current.defaults.headers["x-verification-code"] = code;
    }
  }, []);

  // ── Helper to handle verification errors (401/403) ──────────────────
  const handleVerificationError = (err, retryFn) => {
    if (err.response && (err.response.status === 401 || err.response.status === 403)) {
      // Verification code missing or invalid – show re‑verify modal
      setPendingAction(() => retryFn);
      setShowReverifyModal(true);
      return true;
    }
    return false;
  };

  // ── Re‑verify submit ──────────────────────────────────────────────────
  const handleReverify = async () => {
    if (!reverifyCode.trim()) {
      setReverifyError("Please enter your verification code");
      return;
    }
    setReverifying(true);
    setReverifyError("");
    try {
      // Validate the code with the backend
      await axios.post(
        `${Apiurl}/verify-code`,
        { code: reverifyCode },
        {
          headers: {
            Authorization: localStorage.getItem("adminToken"),
          },
        }
      );
      // Store the new code and update axios header
      localStorage.setItem("verificationCode", reverifyCode);
      apiRef.current.defaults.headers["x-verification-code"] = reverifyCode;
      setShowReverifyModal(false);
      setReverifyCode("");
      showToast("Verification successful", "success");
      // Retry the pending action if any
      if (pendingAction) {
        pendingAction();
        setPendingAction(null);
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Invalid code. Please try again.";
      setReverifyError(msg);
    } finally {
      setReverifying(false);
    }
  };

  // ── Fetch Users ──────────────────────────────────────────────────────
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiRef.current.get("/user");
      let userData = [];
      if (res.data && res.data.data) {
        userData = res.data.data;
      } else if (Array.isArray(res.data)) {
        userData = res.data;
      } else {
        setError("Unexpected response format from server");
        setUsers([]);
        setLoading(false);
        return;
      }
      setUsers(userData);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("❌ Fetch users error:", err);
      // If verification fails, show modal
      if (handleVerificationError(err, fetchUsers)) {
        setLoading(false);
        return;
      }
      let errorMsg = "Failed to load users. Please try again.";
      if (err.response) {
        errorMsg = `Server error: ${err.response.status} - ${err.response.data?.message || err.message}`;
      } else if (err.request) {
        errorMsg = "No response from server. Is the backend running?";
      } else {
        errorMsg = err.message;
      }
      setError(errorMsg);
      showToast(errorMsg, "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  // ── Initial load ──────────────────────────────────────────────────────
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (mounted) await fetchUsers();
    };
    load();
    return () => {
      mounted = false;
    };
  }, [fetchUsers]);

  // ── Refresh ──────────────────────────────────────────────────────────
  const handleRefresh = () => {
    if (refreshing) return;
    setRefreshing(true);
    fetchUsers().finally(() => setRefreshing(false));
  };

  // ── Modal Handlers ───────────────────────────────────────────────────
  const openAddModal = () => {
    setEditingUser(null);
    setFormData({
      user_name: "",
      user_mail: "",
      user_mobile: "",
      user_role: "Staff",
      user_password: "",
      status: "Active",
    });
    setShowAddEditModal(true);
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setFormData({
      user_name: user.user_name,
      user_mail: user.user_mail,
      user_mobile: user.user_mobile || "",
      user_role: user.user_role || "Staff",
      user_password: "",
      status: user.status || "Active",
    });
    setShowAddEditModal(true);
  };

  const openViewModal = (user) => {
    setViewingUser(user);
    setShowViewModal(true);
  };

  const openDeleteModal = (user) => {
    setDeletingUser(user);
    setShowDeleteModal(true);
  };

  // ── Save (Create/Update) ──────────────────────────────────────────
  const handleSave = async () => {
    if (!formData.user_name || !formData.user_mail) {
      showToast("Name and email are required", "error");
      return;
    }

    setSubmitting(true);
    try {
      const payload = { ...formData };
      if (editingUser && !payload.user_password) delete payload.user_password;

      if (editingUser) {
        await apiRef.current.put(`/user/${editingUser._id}`, payload);
        showToast("User updated successfully", "success");
      } else {
        await apiRef.current.post("/user", payload);
        showToast("User added successfully", "success");
      }
      await fetchUsers();
      setShowAddEditModal(false);
      setEditingUser(null);
    } catch (err) {
      console.error("Save user error:", err);
      if (handleVerificationError(err, handleSave)) {
        setSubmitting(false);
        return;
      }
      showToast(err.response?.data?.message || "Operation failed", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Delete ────────────────────────────────────────────────────────────
  const confirmDelete = async () => {
    if (!deletingUser) return;
    setSubmitting(true);
    try {
      await apiRef.current.delete(`/user/${deletingUser._id}`);
      showToast("User deleted successfully", "success");
      await fetchUsers();
      setShowDeleteModal(false);
      setDeletingUser(null);
    } catch (err) {
      console.error("Delete user error:", err);
      if (handleVerificationError(err, confirmDelete)) {
        setSubmitting(false);
        return;
      }
      showToast(err.response?.data?.message || "Delete failed", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Pagination ────────────────────────────────────────────────────────
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;

  const filteredUsers = users.filter(
    (u) =>
      u.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.user_mail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.user_role?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + rowsPerPage
  );
  const goToPage = (page) =>
    setCurrentPage(Math.max(1, Math.min(page, totalPages || 1)));

  // ── Stats ─────────────────────────────────────────────────────────────
  const stats = {
    total: users.length,
    active: users.filter((u) => u.status === "Active").length,
    doctors: users.filter((u) => u.user_role === "Doctor").length,
    inactive: users.filter((u) => u.status === "Inactive").length,
  };

  const statCards = [
    {
      label: "Total Users",
      value: stats.total,
      icon: icons.user,
      color: "#4CAF50",
      bg: "#E8F5E9",
      trend: "all accounts",
    },
    {
      label: "Active",
      value: stats.active,
      icon: icons.check,
      color: GREEN,
      bg: "#D4F3E8",
      trend: "currently online",
    },
    {
      label: "Doctors",
      value: stats.doctors,
      icon: icons.doctor,
      color: "#2196F3",
      bg: "#E3F2FD",
      trend: "medical staff",
    },
    {
      label: "Inactive",
      value: stats.inactive,
      icon: icons.close,
      color: "#FF9800",
      bg: "#FFF3E0",
      trend: "disabled accounts",
    },
  ];

  const card = {
    background: CARD_BG,
    borderRadius: 18,
    border: `1px solid ${BORDER}`,
    boxShadow: "0 2px 12px rgba(46,139,87,0.06)",
    padding: "18px 20px",
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
              fontSize: 24,
              fontWeight: 800,
              color: TEXT_DARK,
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            Users
          </h1>
          <p
            style={{
              fontSize: 13,
              color: TEXT_MUTED,
              margin: "2px 0 0",
              fontWeight: 400,
            }}
          >
            Manage hospital staff, doctors, and administrators
          </p>
        </div>
        <div className="d-flex gap-2 align-items-center">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="btn btn-outline-success rounded-pill d-flex align-items-center gap-1"
            style={{ fontSize: 13, padding: "7px 16px" }}
          >
            {refreshing ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              <Icon d={icons.refresh} size={14} color={GREEN} />
            )}
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
          <button
            className="btn btn-success rounded-pill d-flex align-items-center gap-1"
            onClick={openAddModal}
            style={{ fontSize: 13, padding: "7px 16px" }}
            disabled={submitting}
          >
            <Icon d={icons.plus} size={14} color="white" /> Add User
          </button>
        </div>
      </div>

      {/* ─── Stat Cards ──────────────────────────────────────────── */}
      <div className="row g-3 mb-4">
        {statCards.map((s, i) => (
          <div key={i} className="col-lg-3 col-md-6">
            <div
              style={{
                ...card,
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
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
                  style={{ fontSize: 12, color: TEXT_MUTED, fontWeight: 600 }}
                >
                  {s.label}
                </div>
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 800,
                    color: TEXT_DARK,
                    lineHeight: 1.2,
                  }}
                >
                  {loading ? "..." : s.value}
                </div>
                <div style={{ fontSize: 11, color: s.color, fontWeight: 500 }}>
                  {s.trend}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ─── Search ───────────────────────────────────────────────── */}
      <div className="mb-4">
        <div
          style={{
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
            placeholder="Search by name, email, role..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="form-control border-0 shadow-none"
            style={{ fontSize: 13, color: TEXT_DARK }}
          />
        </div>
      </div>

      {/* ─── Error Display ───────────────────────────────────────── */}
      {error && (
        <div
          className="alert alert-danger"
          role="alert"
          style={{ borderRadius: 12 }}
        >
          <strong>⚠️ Error:</strong> {error}
          <button
            className="btn btn-sm btn-outline-danger ms-3"
            onClick={fetchUsers}
          >
            Retry
          </button>
        </div>
      )}

      {/* ─── Profile Cards ──────────────────────────────────────── */}
      {loading && !refreshing ? (
        <div className="text-center py-5">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row g-4 mb-4">
          {paginatedUsers.map((u) => (
            <div key={u._id || u.id} className="col-lg-4 col-md-6">
              <div
                style={{
                  ...card,
                  padding: "24px 20px 18px",
                  textAlign: "center",
                }}
              >
                <div style={{ position: "relative", display: "inline-flex" }}>
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #2E8B57, #A8E6CF)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontWeight: 700,
                      fontSize: 24,
                      marginBottom: 12,
                    }}
                  >
                    {u.user_name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("") || "U"}
                  </div>
                  <span
                    style={{
                      position: "absolute",
                      bottom: 10,
                      right: 0,
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      background: u.status === "Active" ? GREEN : "#FF9800",
                      border: "3px solid white",
                    }}
                  />
                </div>
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: TEXT_DARK,
                    margin: "0 0 4px",
                  }}
                >
                  {u.user_name}
                </h3>
                <p
                  style={{ margin: "0 0 8px", fontSize: 13, color: TEXT_MUTED }}
                >
                  {u.user_role || "Staff"} · {u.department || "General"}
                </p>
                <div
                  style={{
                    fontSize: 13,
                    color: "#475569",
                    marginBottom: 12,
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                    }}
                  >
                    <Icon d={icons.mail} size={13} color={TEXT_MUTED} />{" "}
                    {u.user_mail}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                    }}
                  >
                    <Icon d={icons.phone} size={13} color={TEXT_MUTED} />{" "}
                    {u.user_mobile || "N/A"}
                  </div>
                </div>
                <div className="d-flex justify-content-center gap-2 flex-wrap">
                  <button
                    onClick={() => openViewModal(u)}
                    className="btn btn-sm btn-outline-success rounded-pill d-flex align-items-center gap-1"
                  >
                    <Icon d={icons.eye} size={12} /> View
                  </button>
                  <button
                    onClick={() => openEditModal(u)}
                    className="btn btn-sm btn-outline-success rounded-pill d-flex align-items-center gap-1"
                  >
                    <Icon d={icons.edit} size={12} /> Edit
                  </button>
                  <button
                    onClick={() => openDeleteModal(u)}
                    className="btn btn-sm btn-outline-danger rounded-pill d-flex align-items-center gap-1"
                  >
                    <Icon d={icons.trash} size={12} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && paginatedUsers.length === 0 && !error && (
        <div
          style={{
            ...card,
            textAlign: "center",
            padding: 40,
            color: TEXT_MUTED,
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 12 }}>👤</div>
          <h4 style={{ fontWeight: 700, color: TEXT_DARK }}>No users found</h4>
          <p>Click "Add User" to create your first user.</p>
        </div>
      )}

      {/* ─── Pagination ─────────────────────────────────────────── */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center align-items-center gap-2 mt-4">
          <span style={{ fontSize: 13, color: TEXT_MUTED }}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn btn-outline-success btn-sm d-flex align-items-center"
            style={{ opacity: currentPage === 1 ? 0.4 : 1, borderRadius: 8 }}
          >
            <Icon d={icons.chevronLeft} size={14} />
          </button>
          {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1).map(
            (page) => {
              if (totalPages > 7 && page === 4)
                return <span key="ellipsis">…</span>;
              return (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`btn btn-sm ${page === currentPage ? "btn-success" : "btn-outline-success"}`}
                  style={{ borderRadius: 8 }}
                >
                  {page}
                </button>
              );
            }
          )}
          {totalPages > 7 && <span>…</span>}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="btn btn-outline-success btn-sm d-flex align-items-center"
            style={{
              opacity: currentPage === totalPages ? 0.4 : 1,
              borderRadius: 8,
            }}
          >
            <Icon d={icons.chevronRight} size={14} />
          </button>
        </div>
      )}

      {/* ─── Modals (updated field names) ────────────────────────── */}

      {/* View Modal - unchanged */}
      {showViewModal && viewingUser && (
        <div
          className="modal d-block"
          tabIndex="-1"
          role="dialog"
          style={{
            backgroundColor: "rgba(0,0,0,0.25)",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setShowViewModal(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="modal-content border-0 shadow"
              style={{ borderRadius: 18, border: `1px solid ${BORDER}` }}
            >
              <div className="modal-header border-0 pb-0">
                <h5
                  className="modal-title"
                  style={{ fontWeight: 700, fontSize: 18, color: TEXT_DARK }}
                >
                  User Details
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowViewModal(false)}
                />
              </div>
              <div className="modal-body">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: "linear-gradient(135deg, #2E8B57, #A8E6CF)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontWeight: 700,
                      fontSize: 18,
                    }}
                  >
                    {viewingUser.user_name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("") || "U"}
                  </div>
                  <div>
                    <h5 className="fw-bold mb-0" style={{ color: TEXT_DARK }}>
                      {viewingUser.user_name}
                    </h5>
                    <div style={{ fontSize: 13, color: TEXT_MUTED }}>
                      {viewingUser.user_role || "Staff"} ·{" "}
                      {viewingUser.department || "General"}
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-column gap-2">
                  <div
                    className="d-flex align-items-center gap-2"
                    style={{ fontSize: 14, color: "#475569" }}
                  >
                    <Icon d={icons.mail} size={15} color={TEXT_MUTED} />
                    <span>
                      <b>Email:</b> {viewingUser.user_mail}
                    </span>
                  </div>
                  <div
                    className="d-flex align-items-center gap-2"
                    style={{ fontSize: 14, color: "#475569" }}
                  >
                    <Icon d={icons.phone} size={15} color={TEXT_MUTED} />
                    <span>
                      <b>Phone:</b> {viewingUser.user_mobile || "N/A"}
                    </span>
                  </div>
                  <div
                    className="d-flex align-items-center gap-2"
                    style={{ fontSize: 14, color: "#475569" }}
                  >
                    <span style={{ width: 15 }} />
                    <span>
                      <b>Status:</b>{" "}
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 5,
                          marginLeft: 8,
                          color:
                            viewingUser.status === "Active" ? GREEN : "#FF9800",
                        }}
                      >
                        <span
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background:
                              viewingUser.status === "Active"
                                ? GREEN
                                : "#FF9800",
                          }}
                        />
                        {viewingUser.status}
                      </span>
                    </span>
                  </div>
                  <div
                    className="d-flex align-items-center gap-2"
                    style={{ fontSize: 14, color: "#475569" }}
                  >
                    <span style={{ width: 15 }} />
                    <span>
                      <b>Joined:</b>{" "}
                      {viewingUser.createdAt
                        ? new Date(viewingUser.createdAt).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="modal-footer border-0 pt-0">
                <button
                  className="btn btn-outline-success rounded-pill"
                  onClick={() => setShowViewModal(false)}
                >
                  Close
                </button>
                <button
                  className="btn btn-success rounded-pill d-flex align-items-center gap-1"
                  onClick={() => {
                    setShowViewModal(false);
                    if (viewingUser) openEditModal(viewingUser);
                  }}
                >
                  <Icon d={icons.edit} size={14} color="white" /> Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal - unchanged */}
      {showAddEditModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          role="dialog"
          style={{
            backgroundColor: "rgba(0,0,0,0.25)",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setShowAddEditModal(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="modal-content border-0 shadow"
              style={{ borderRadius: 18, border: `1px solid ${BORDER}` }}
            >
              <div className="modal-header border-0 pb-0">
                <h5
                  className="modal-title"
                  style={{ fontWeight: 700, fontSize: 17, color: TEXT_DARK }}
                >
                  {editingUser ? "Edit User" : "Add New User"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowAddEditModal(false)}
                />
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label
                    className="form-label"
                    style={{ fontWeight: 600, fontSize: 12, color: TEXT_DARK }}
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.user_name}
                    onChange={(e) =>
                      setFormData({ ...formData, user_name: e.target.value })
                    }
                    style={{ borderRadius: 8, borderColor: BORDER }}
                  />
                </div>
                <div className="mb-3">
                  <label
                    className="form-label"
                    style={{ fontWeight: 600, fontSize: 12, color: TEXT_DARK }}
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    value={formData.user_mail}
                    onChange={(e) =>
                      setFormData({ ...formData, user_mail: e.target.value })
                    }
                    style={{ borderRadius: 8, borderColor: BORDER }}
                  />
                </div>
                <div className="mb-3">
                  <label
                    className="form-label"
                    style={{ fontWeight: 600, fontSize: 12, color: TEXT_DARK }}
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.user_mobile}
                    onChange={(e) =>
                      setFormData({ ...formData, user_mobile: e.target.value })
                    }
                    style={{ borderRadius: 8, borderColor: BORDER }}
                  />
                </div>
                <div className="row g-3 mb-3">
                  <div className="col-6">
                    <label
                      className="form-label"
                      style={{
                        fontWeight: 600,
                        fontSize: 12,
                        color: TEXT_DARK,
                      }}
                    >
                      Role
                    </label>
                    <select
                      className="form-select"
                      value={formData.user_role}
                      onChange={(e) =>
                        setFormData({ ...formData, user_role: e.target.value })
                      }
                      style={{ borderRadius: 8, borderColor: BORDER }}
                    >
                      <option>Admin</option>
                      <option>Doctor</option>
                      <option>Nurse</option>
                      <option>Staff</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <label
                      className="form-label"
                      style={{
                        fontWeight: 600,
                        fontSize: 12,
                        color: TEXT_DARK,
                      }}
                    >
                      Department
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.department || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, department: e.target.value })
                      }
                      style={{ borderRadius: 8, borderColor: BORDER }}
                      placeholder="e.g., Cardiology"
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label
                    className="form-label"
                    style={{ fontWeight: 600, fontSize: 12, color: TEXT_DARK }}
                  >
                    Password {editingUser && "(leave blank to keep current)"}
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    value={formData.user_password}
                    onChange={(e) =>
                      setFormData({ ...formData, user_password: e.target.value })
                    }
                    placeholder={
                      editingUser
                        ? "Enter new password to change"
                        : "Enter password"
                    }
                    style={{ borderRadius: 8, borderColor: BORDER }}
                  />
                </div>
                <div className="mb-3">
                  <label
                    className="form-label"
                    style={{ fontWeight: 600, fontSize: 12, color: TEXT_DARK }}
                  >
                    Status
                  </label>
                  <select
                    className="form-select"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    style={{ borderRadius: 8, borderColor: BORDER }}
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer border-0 pt-0">
                <button
                  className="btn btn-outline-success rounded-pill"
                  onClick={() => setShowAddEditModal(false)}
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-success rounded-pill"
                  onClick={handleSave}
                  disabled={submitting}
                >
                  {submitting ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : editingUser ? (
                    "Update"
                  ) : (
                    "Add"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal - unchanged */}
      {showDeleteModal && deletingUser && (
        <div
          className="modal d-block"
          tabIndex="-1"
          role="dialog"
          style={{
            backgroundColor: "rgba(0,0,0,0.25)",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
            onClick={(e) => e.stopPropagation()}
          >
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
                  <p
                    className="mb-0"
                    style={{ color: TEXT_MUTED, fontSize: 14 }}
                  >
                    Are you sure you want to delete <br />
                    <strong style={{ color: TEXT_DARK }}>
                      {deletingUser.user_name}
                    </strong>
                    ?<br />
                    This action cannot be undone.
                  </p>
                </div>
                <div className="d-flex justify-content-center gap-2">
                  <button
                    className="btn btn-outline-success rounded-pill"
                    onClick={() => setShowDeleteModal(false)}
                    disabled={submitting}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-danger rounded-pill"
                    onClick={confirmDelete}
                    disabled={submitting}
                  >
                    {submitting ? (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      />
                    ) : (
                      "Delete"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Re‑verification Modal ────────────────────────────────── */}
      {showReverifyModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          role="dialog"
          style={{
            backgroundColor: "rgba(0,0,0,0.3)",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => {
            // Don't close on background click to prevent losing pending action
          }}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="modal-content border-0 shadow"
              style={{
                borderRadius: 18,
                border: `1px solid ${BORDER}`,
                padding: "10px",
              }}
            >
              <div className="modal-header border-0">
                <h5
                  className="modal-title"
                  style={{ fontWeight: 700, fontSize: 17, color: TEXT_DARK }}
                >
                  <Icon d={icons.lock} size={18} color={GREEN} /> Verification
                  Required
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowReverifyModal(false);
                    setPendingAction(null);
                    setReverifyCode("");
                    setReverifyError("");
                  }}
                />
              </div>
              <div className="modal-body">
                <p style={{ fontSize: 14, color: TEXT_MUTED }}>
                  Your session requires verification. Please enter the
                  verification code that was sent to you.
                </p>
                <input
                  type="text"
                  placeholder="Enter verification code"
                  value={reverifyCode}
                  onChange={(e) => setReverifyCode(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "12px",
                    border: `2px solid ${
                      reverifyError ? "#dc3545" : BORDER
                    }`,
                    fontSize: "0.95rem",
                    outline: "none",
                    letterSpacing: "2px",
                    fontFamily: "monospace",
                    textAlign: "center",
                  }}
                  autoFocus
                />
                {reverifyError && (
                  <div
                    style={{
                      color: "#dc3545",
                      fontSize: "0.85rem",
                      marginTop: "8px",
                    }}
                  >
                    {reverifyError}
                  </div>
                )}
              </div>
              <div className="modal-footer border-0 pt-0">
                <button
                  className="btn btn-outline-success rounded-pill"
                  onClick={() => {
                    setShowReverifyModal(false);
                    setPendingAction(null);
                    setReverifyCode("");
                    setReverifyError("");
                  }}
                  disabled={reverifying}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-success rounded-pill d-flex align-items-center gap-1"
                  onClick={handleReverify}
                  disabled={reverifying}
                >
                  {reverifying ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    "Verify"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Toast ────────────────────────────────────────────────── */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={clearToast} />
      )}
    </div>
  );
};

export default User;