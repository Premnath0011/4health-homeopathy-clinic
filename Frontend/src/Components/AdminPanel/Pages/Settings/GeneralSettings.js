// GeneralSettings.jsx — Admin panel: Page Metadata (SEO title / description) manager
// Lets the admin edit the title + meta description for every page/route
// listed in Components/Common/pageMetadata.js, right from the admin panel.
// Edits are stored in localStorage (key: "pageMetadataOverrides") and are
// automatically picked up by PageTitle.js on every page load — no backend
// required, no redeploy required.

import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  getAllPageMetadata,
  setOverrideForPath,
} from "../../../Common/pageMetadata";

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
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z M21 21l-4.35-4.35",
  save: "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z M17 21v-8H7v8 M7 3v5h8",
  refresh: "M21 2v6h-6M3 22v-6h6M3.5 12A8.5 8.5 0 0 1 20.5 8M3.5 12a8.5 8.5 0 0 0 17 4",
  check: "M5 13l4 4L19 7",
  close: "M18 6L6 18M6 6l12 12",
  globe: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M2 12h20 M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z",
  tag: "M20 10V5a2 2 0 0 0-2-2h-5L3 13l8 8 10-10a2 2 0 0 0 0-2.83zM7 7h.01",
};

// ── Colors (matches rest of admin panel) ─────────────────────────────
const GREEN = "#2E8B57";
const TEXT_DARK = "#1E2F2B";
const TEXT_MUTED = "#5E7B6E";
const BORDER = "#D1EDE6";
const BG = "#F4FCF8";
const CARD_BG = "#FFFFFF";

// ── Toast ──────────────────────────────────────────────────────────────────
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 2500);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgClass =
    type === "success" ? "bg-success" : type === "error" ? "bg-danger" : "bg-primary";
  const iconPath = type === "error" ? icons.close : icons.check;

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

const GeneralSettings = () => {
  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [savingPath, setSavingPath] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = useCallback(
    (message, type = "success") => setToast({ message, type }),
    []
  );
  const clearToast = useCallback(() => setToast(null), []);

  // ── Load metadata (defaults + any saved overrides) ───────────────────
  const loadRows = useCallback(() => {
    setRows(getAllPageMetadata());
  }, []);

  useEffect(() => {
    loadRows();
  }, [loadRows]);

  // ── Edit a field locally (not saved yet) ─────────────────────────────
  const handleFieldChange = (path, field, value) => {
    setRows((prev) =>
      prev.map((row) => (row.path === path ? { ...row, [field]: value } : row))
    );
  };

  // ── Save one row's title/description as an override ─────────────────
  const handleSave = (row) => {
    setSavingPath(row.path);
    try {
      setOverrideForPath(row.path, {
        title: row.title,
        description: row.description,
      });
      showToast(`Saved metadata for ${row.path}`, "success");
      loadRows();
    } catch (err) {
      showToast("Failed to save. Try again.", "error");
    } finally {
      setSavingPath(null);
    }
  };

  // ── Reset one row back to its default (clears override) ─────────────
  const handleReset = (row) => {
    setOverrideForPath(row.path, null);
    showToast(`Reset ${row.path} to default`, "success");
    loadRows();
  };

  const filteredRows = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return rows;
    return rows.filter(
      (row) =>
        row.path.toLowerCase().includes(term) ||
        row.title.toLowerCase().includes(term) ||
        (row.description || "").toLowerCase().includes(term)
    );
  }, [rows, searchTerm]);

  return (
    <div style={{ background: BG, minHeight: "100%", padding: "24px" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
        <div>
          <h4 className="fw-bold mb-1" style={{ color: TEXT_DARK }}>
            <Icon d={icons.globe} size={20} color={GREEN} /> Page Metadata
          </h4>
          <p className="mb-0" style={{ color: TEXT_MUTED, fontSize: 14 }}>
            Edit the SEO title &amp; meta description shown for each page. Changes
            apply instantly across the site — no redeploy needed.
          </p>
        </div>
        <button
          className="btn btn-outline-success rounded-pill d-flex align-items-center gap-2"
          onClick={loadRows}
        >
          <Icon d={icons.refresh} size={16} /> Refresh
        </button>
      </div>

      {/* Search */}
      <div
        className="mb-3"
        style={{ maxWidth: 360, position: "relative" }}
      >
        <span
          style={{
            position: "absolute",
            left: 12,
            top: "50%",
            transform: "translateY(-50%)",
            color: TEXT_MUTED,
          }}
        >
          <Icon d={icons.search} size={16} />
        </span>
        <input
          type="text"
          placeholder="Search by path, title or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 12px 10px 36px",
            borderRadius: 12,
            border: `1.5px solid ${BORDER}`,
            fontSize: 14,
            outline: "none",
          }}
        />
      </div>

      {/* Cards list */}
      <div className="d-flex flex-column gap-3">
        {filteredRows.length === 0 && (
          <div
            className="text-center py-5"
            style={{ color: TEXT_MUTED, background: CARD_BG, borderRadius: 16 }}
          >
            No pages match your search.
          </div>
        )}

        {filteredRows.map((row) => (
          <div
            key={row.path}
            className="p-3 p-md-4"
            style={{
              background: CARD_BG,
              border: `1px solid ${BORDER}`,
              borderRadius: 16,
            }}
          >
            <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
              <div className="d-flex align-items-center gap-2">
                <Icon d={icons.tag} size={15} color={GREEN} />
                <code style={{ fontSize: 13, color: TEXT_DARK, fontWeight: 600 }}>
                  {row.path}
                </code>
                {row.isOverridden && (
                  <span
                    className="badge rounded-pill"
                    style={{
                      background: "#E6F4EC",
                      color: GREEN,
                      fontWeight: 600,
                      fontSize: 11,
                    }}
                  >
                    Customized
                  </span>
                )}
              </div>

              <div className="d-flex gap-2">
                {row.isOverridden && (
                  <button
                    className="btn btn-sm btn-outline-secondary rounded-pill"
                    onClick={() => handleReset(row)}
                  >
                    Reset to default
                  </button>
                )}
                <button
                  className="btn btn-sm btn-success rounded-pill d-flex align-items-center gap-1"
                  onClick={() => handleSave(row)}
                  disabled={savingPath === row.path}
                >
                  {savingPath === row.path ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    <>
                      <Icon d={icons.save} size={14} color="#fff" /> Save
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-12 col-md-5">
                <label
                  className="form-label mb-1"
                  style={{ fontSize: 12.5, color: TEXT_MUTED, fontWeight: 600 }}
                >
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={row.title}
                  onChange={(e) =>
                    handleFieldChange(row.path, "title", e.target.value)
                  }
                  style={{
                    borderRadius: 10,
                    border: `1.5px solid ${BORDER}`,
                    fontSize: 14,
                  }}
                />
              </div>
              <div className="col-12 col-md-7">
                <label
                  className="form-label mb-1"
                  style={{ fontSize: 12.5, color: TEXT_MUTED, fontWeight: 600 }}
                >
                  Meta Description
                </label>
                <textarea
                  className="form-control"
                  rows={2}
                  value={row.description}
                  onChange={(e) =>
                    handleFieldChange(row.path, "description", e.target.value)
                  }
                  style={{
                    borderRadius: 10,
                    border: `1.5px solid ${BORDER}`,
                    fontSize: 14,
                    resize: "vertical",
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={clearToast} />
      )}
    </div>
  );
};

export default GeneralSettings;