import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  FaImages,
  FaPlus,
  FaSearch,
  FaSyncAlt,
  FaEdit,
  FaTrash,
  FaTimes,
  FaUpload,
  FaCheck,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import Apiurl from "../../Environmnet/Apiurl";

const CATEGORIES = [
  { value: "clinic", label: "Clinic" },
  { value: "treatments", label: "Treatments" },
  { value: "wellness", label: "Wellness" },
  { value: "care", label: "Patient Care" },
  { value: "results", label: "Results" },
];

const EMPTY_FORM = {
  title: "",
  category: "clinic",
  size: "medium",
  displayOrder: 0,
  status: "Active",
  image: null,
};

const apiOrigin = Apiurl.replace(/\/api\/?$/, "");
const resolveImage = (image) => {
  if (!image) return "";
  if (/^https?:\/\//i.test(image)) return image;
  return `${apiOrigin}${image.startsWith("/") ? image : `/${image}`}`;
};

const AdminGallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [preview, setPreview] = useState("");
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
  }, []);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(timer);
  }, [toast]);

  const fetchGallery = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);
      const response = await axios.get(`${Apiurl}/gallery`);
      setItems(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      showToast(error.response?.data?.message || "Failed to load gallery", "error");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [showToast]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchGallery();
  }, [fetchGallery]);

  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const filteredItems = useMemo(() => {
    const term = search.trim().toLowerCase();
    return items.filter((item) => {
      const matchesSearch =
        !term ||
        (item.title || "").toLowerCase().includes(term) ||
        (item.category || "").toLowerCase().includes(term);
      const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [items, search, categoryFilter, statusFilter]);

  const counts = useMemo(() => ({
    total: items.length,
    active: items.filter((item) => item.status === "Active").length,
    inactive: items.filter((item) => item.status === "Inactive").length,
    categories: new Set(items.map((item) => item.category)).size,
  }), [items]);

  const openAdd = () => {
    setEditingItem(null);
    setForm(EMPTY_FORM);
    setPreview("");
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setForm({
      title: item.title || "",
      category: item.category || "clinic",
      size: item.size || "medium",
      displayOrder: Number(item.displayOrder || 0),
      status: item.status || "Active",
      image: null,
    });
    setPreview(resolveImage(item.image));
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingItem(null);
    setForm(EMPTY_FORM);
    setPreview("");
  };

  const handleFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("Please select a valid image file", "error");
      event.target.value = "";
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      showToast("Image size must be below 10MB", "error");
      event.target.value = "";
      return;
    }

    setForm((current) => ({ ...current, image: file }));
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.title.trim()) {
      showToast("Please enter the image title", "error");
      return;
    }
    if (!editingItem && !form.image) {
      showToast("Please select an image", "error");
      return;
    }

    const payload = new FormData();
    payload.append("title", form.title.trim());
    payload.append("category", form.category);
    payload.append("size", form.size);
    payload.append("displayOrder", String(form.displayOrder || 0));
    payload.append("status", form.status);
    if (form.image) payload.append("image", form.image);

    try {
      setSaving(true);
      if (editingItem) {
        await axios.put(`${Apiurl}/gallery/${editingItem._id}`, payload);
        showToast("Gallery image updated successfully");
      } else {
        await axios.post(`${Apiurl}/gallery`, payload);
        showToast("Gallery image added successfully");
      }
      closeModal();
      await fetchGallery();
    } catch (error) {
      showToast(error.response?.data?.message || "Unable to save gallery image", "error");
    } finally {
      setSaving(false);
    }
  };

  const toggleStatus = async (item) => {
    const nextStatus = item.status === "Active" ? "Inactive" : "Active";
    try {
      const response = await axios.patch(`${Apiurl}/gallery/${item._id}/status`, {
        status: nextStatus,
      });
      setItems((current) =>
        current.map((entry) => (entry._id === item._id ? response.data : entry)),
      );
      showToast(`Image marked as ${nextStatus}`);
    } catch (error) {
      showToast(error.response?.data?.message || "Failed to update status", "error");
    }
  };

  const deleteItem = async (item) => {
    const confirmed = window.confirm(`Delete “${item.title}” from the gallery?`);
    if (!confirmed) return;

    try {
      await axios.delete(`${Apiurl}/gallery/${item._id}`);
      setItems((current) => current.filter((entry) => entry._id !== item._id));
      showToast("Gallery image deleted successfully");
    } catch (error) {
      showToast(error.response?.data?.message || "Failed to delete gallery image", "error");
    }
  };

  const categoryLabel = (value) =>
    CATEGORIES.find((category) => category.value === value)?.label || value;

  return (
    <div className="ag-page">
      {toast && (
        <div className={`ag-toast ${toast.type === "error" ? "error" : "success"}`}>
          {toast.type === "error" ? <FaTimes /> : <FaCheck />}
          <span>{toast.message}</span>
        </div>
      )}

      <section className="ag-heading">
        <div>
          <div className="ag-eyebrow"><FaImages /> Content Management</div>
          <h1>Gallery Management</h1>
          <p>Add and manage the images displayed on the public Gallery page.</p>
        </div>
        <div className="ag-heading-actions">
          <button className="ag-btn secondary" onClick={() => fetchGallery(true)} disabled={refreshing}>
            <FaSyncAlt className={refreshing ? "ag-spin" : ""} /> Refresh
          </button>
          <button className="ag-btn primary" onClick={openAdd}>
            <FaPlus /> Add Image
          </button>
        </div>
      </section>

      <section className="ag-stats">
        <article><span>Total Images</span><strong>{counts.total}</strong></article>
        <article><span>Active</span><strong>{counts.active}</strong></article>
        <article><span>Inactive</span><strong>{counts.inactive}</strong></article>
        <article><span>Used Categories</span><strong>{counts.categories}</strong></article>
      </section>

      <section className="ag-toolbar">
        <label className="ag-search">
          <FaSearch />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search gallery title or category"
          />
        </label>
        <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
          <option value="all">All Categories</option>
          {CATEGORIES.map((category) => (
            <option key={category.value} value={category.value}>{category.label}</option>
          ))}
        </select>
        <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
          <option value="all">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </section>

      {loading ? (
        <section className="ag-state"><div className="ag-loader" /><p>Loading gallery images...</p></section>
      ) : filteredItems.length === 0 ? (
        <section className="ag-state empty">
          <FaImages />
          <h3>No gallery images found</h3>
          <p>Add your first image or change the current filters.</p>
          {items.length === 0 && <button className="ag-btn primary" onClick={openAdd}><FaPlus /> Add Image</button>}
        </section>
      ) : (
        <section className="ag-grid">
          {filteredItems.map((item) => (
            <article className="ag-card" key={item._id}>
              <div className="ag-image-wrap">
                <img src={resolveImage(item.image)} alt={item.title} />
                <span className={`ag-status ${item.status === "Active" ? "active" : "inactive"}`}>
                  {item.status}
                </span>
                <span className="ag-order">#{item.displayOrder || 0}</span>
              </div>
              <div className="ag-card-body">
                <div className="ag-meta">
                  <span>{categoryLabel(item.category)}</span>
                  <span>{item.size || "medium"}</span>
                </div>
                <h3 title={item.title}>{item.title}</h3>
                <div className="ag-card-actions">
                  <button className="ag-icon-btn view" onClick={() => toggleStatus(item)} title="Change status">
                    {item.status === "Active" ? <FaEye /> : <FaEyeSlash />}
                  </button>
                  <button className="ag-icon-btn edit" onClick={() => openEdit(item)} title="Edit">
                    <FaEdit />
                  </button>
                  <button className="ag-icon-btn delete" onClick={() => deleteItem(item)} title="Delete">
                    <FaTrash />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}

      {modalOpen && (
        <div className="ag-modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && closeModal()}>
          <div className="ag-modal" role="dialog" aria-modal="true" aria-labelledby="gallery-form-title">
            <header>
              <div>
                <span>{editingItem ? "Update existing item" : "Create gallery item"}</span>
                <h2 id="gallery-form-title">{editingItem ? "Edit Gallery Image" : "Add Gallery Image"}</h2>
              </div>
              <button type="button" onClick={closeModal} disabled={saving}><FaTimes /></button>
            </header>

            <form onSubmit={handleSubmit}>
              <label className="ag-upload-box">
                {preview ? (
                  <img src={preview} alt="Gallery preview" />
                ) : (
                  <div><FaUpload /><strong>Select an image</strong><small>JPG, PNG, WEBP up to 10MB</small></div>
                )}
                <input type="file" accept="image/*" onChange={handleFile} />
                {preview && <span><FaUpload /> {editingItem ? "Replace Image" : "Change Image"}</span>}
              </label>

              <div className="ag-form-grid">
                <label className="ag-field full">
                  <span>Image Title *</span>
                  <input
                    value={form.title}
                    onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                    placeholder="Example: 4Health Clinic Reception"
                    maxLength={120}
                  />
                </label>

                <label className="ag-field">
                  <span>Category *</span>
                  <select
                    value={form.category}
                    onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
                  >
                    {CATEGORIES.map((category) => (
                      <option key={category.value} value={category.value}>{category.label}</option>
                    ))}
                  </select>
                </label>

                <label className="ag-field">
                  <span>Layout Size</span>
                  <select
                    value={form.size}
                    onChange={(event) => setForm((current) => ({ ...current, size: event.target.value }))}
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </label>

                <label className="ag-field">
                  <span>Display Order</span>
                  <input
                    type="number"
                    min="0"
                    value={form.displayOrder}
                    onChange={(event) => setForm((current) => ({ ...current, displayOrder: event.target.value }))}
                  />
                </label>

                <label className="ag-field">
                  <span>Status</span>
                  <select
                    value={form.status}
                    onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </label>
              </div>

              <footer>
                <button type="button" className="ag-btn secondary" onClick={closeModal} disabled={saving}>Cancel</button>
                <button type="submit" className="ag-btn primary" disabled={saving}>
                  {saving ? <><span className="ag-mini-loader" /> Saving...</> : <><FaCheck /> {editingItem ? "Update Image" : "Add Image"}</>}
                </button>
              </footer>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .ag-page{min-height:100vh;background:#f4fcf8;padding:32px;font-family:'Inter','Segoe UI',sans-serif;color:#1e2f2b}.ag-heading{display:flex;align-items:center;justify-content:space-between;gap:24px;margin-bottom:24px}.ag-heading h1{font-size:30px;margin:7px 0 8px;font-weight:750}.ag-heading p{margin:0;color:#5e7b6e}.ag-eyebrow{display:flex;align-items:center;gap:8px;color:#2e8b57;font-weight:700;font-size:13px;text-transform:uppercase;letter-spacing:.08em}.ag-heading-actions{display:flex;gap:10px;flex-wrap:wrap}.ag-btn{border:0;border-radius:999px;padding:10px 20px;font-weight:700;font-size:13px;display:inline-flex;align-items:center;justify-content:center;gap:8px;cursor:pointer;transition:.2s}.ag-btn:disabled{opacity:.6;cursor:not-allowed}.ag-btn.primary{background:#2e8b57;color:#fff;box-shadow:0 8px 20px rgba(46,139,87,.18)}.ag-btn.primary:hover:not(:disabled){background:#1e6b3f;transform:translateY(-1px)}.ag-btn.secondary{background:#fff;border:1px solid #d1ede6;color:#2e8b57}.ag-stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;margin-bottom:22px}.ag-stats article{background:#fff;border:1px solid #dff1e8;border-radius:18px;padding:20px;box-shadow:0 8px 25px rgba(46,139,87,.05)}.ag-stats span{display:block;color:#688276;font-size:13px;margin-bottom:8px}.ag-stats strong{font-size:28px}.ag-toolbar{background:#fff;border:1px solid #dff1e8;border-radius:18px;padding:14px;display:grid;grid-template-columns:minmax(260px,1fr) 190px 160px;gap:12px;margin-bottom:22px}.ag-search{display:flex;align-items:center;gap:10px;border:1px solid #d9ebe2;border-radius:12px;padding:0 13px;color:#6d887b}.ag-search input,.ag-toolbar select,.ag-field input,.ag-field select{border:1px solid #d9ebe2;background:#fff;border-radius:12px;padding:11px 13px;outline:none;width:100%;font-size:14px;color:#1e2f2b}.ag-search input{border:0;padding:11px 0}.ag-search:focus-within,.ag-field input:focus,.ag-field select:focus,.ag-toolbar select:focus{border-color:#2e8b57;box-shadow:0 0 0 3px rgba(46,139,87,.1)}.ag-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}.ag-card{background:#fff;border:1px solid #deeee6;border-radius:20px;overflow:hidden;box-shadow:0 8px 25px rgba(46,139,87,.06);transition:.25s}.ag-card:hover{transform:translateY(-4px);box-shadow:0 14px 34px rgba(46,139,87,.13)}.ag-image-wrap{height:220px;position:relative;background:#edf5f1}.ag-image-wrap img{width:100%;height:100%;object-fit:cover;display:block}.ag-status,.ag-order{position:absolute;top:12px;border-radius:999px;padding:5px 10px;font-size:11px;font-weight:750;backdrop-filter:blur(8px)}.ag-status{left:12px}.ag-status.active{background:rgba(25,135,84,.9);color:white}.ag-status.inactive{background:rgba(73,80,87,.9);color:white}.ag-order{right:12px;background:rgba(255,255,255,.92);color:#1e2f2b}.ag-card-body{padding:17px}.ag-meta{display:flex;justify-content:space-between;gap:8px;color:#2e8b57;text-transform:capitalize;font-size:12px;font-weight:700}.ag-card h3{font-size:17px;line-height:1.4;margin:10px 0 15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ag-card-actions{display:flex;gap:8px}.ag-icon-btn{width:36px;height:36px;border-radius:10px;border:1px solid #d9ebe2;background:#fff;display:inline-flex;align-items:center;justify-content:center;cursor:pointer}.ag-icon-btn.view,.ag-icon-btn.edit{color:#2e8b57}.ag-icon-btn.delete{color:#c0392b}.ag-icon-btn:hover{background:#eff9f4}.ag-state{min-height:330px;background:#fff;border:1px solid #dff1e8;border-radius:20px;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#668074;gap:10px}.ag-state.empty>svg{font-size:48px;color:#87bda1}.ag-state h3,.ag-state p{margin:0}.ag-loader,.ag-mini-loader{border:3px solid #d7ede2;border-top-color:#2e8b57;border-radius:50%;animation:agspin .8s linear infinite}.ag-loader{width:38px;height:38px}.ag-mini-loader{width:15px;height:15px}.ag-spin{animation:agspin .8s linear infinite}.ag-toast{position:fixed;right:24px;top:24px;z-index:3000;display:flex;align-items:center;gap:10px;padding:13px 17px;border-radius:12px;color:#fff;box-shadow:0 12px 30px rgba(0,0,0,.18);font-weight:650}.ag-toast.success{background:#218c57}.ag-toast.error{background:#c0392b}.ag-modal-backdrop{position:fixed;inset:0;background:rgba(13,35,26,.58);z-index:2500;display:flex;align-items:center;justify-content:center;padding:22px;backdrop-filter:blur(4px);overflow:auto}.ag-modal{width:min(760px,100%);background:#fff;border-radius:24px;overflow:hidden;box-shadow:0 25px 70px rgba(0,0,0,.25)}.ag-modal>header{padding:20px 24px;border-bottom:1px solid #e1eee8;display:flex;align-items:center;justify-content:space-between}.ag-modal header span{color:#2e8b57;font-size:12px;font-weight:700;text-transform:uppercase}.ag-modal header h2{font-size:22px;margin:4px 0 0}.ag-modal header button{border:0;background:#edf6f1;width:38px;height:38px;border-radius:50%;cursor:pointer;color:#476558}.ag-modal form{padding:22px}.ag-upload-box{height:240px;border:2px dashed #b9ddcb;border-radius:18px;background:#f7fcf9;display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative;cursor:pointer;margin-bottom:20px}.ag-upload-box input{display:none}.ag-upload-box img{width:100%;height:100%;object-fit:contain;background:#edf5f1}.ag-upload-box>div{text-align:center;color:#4d7461;display:flex;flex-direction:column;align-items:center;gap:8px}.ag-upload-box>div svg{font-size:32px;color:#2e8b57}.ag-upload-box small{color:#789184}.ag-upload-box>span{position:absolute;bottom:12px;right:12px;background:rgba(30,107,63,.92);color:#fff;padding:8px 12px;border-radius:999px;font-size:12px;display:flex;align-items:center;gap:6px}.ag-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}.ag-field{display:flex;flex-direction:column;gap:7px}.ag-field.full{grid-column:1/-1}.ag-field>span{font-size:13px;font-weight:700;color:#425c50}.ag-modal footer{display:flex;justify-content:flex-end;gap:10px;margin-top:22px;padding-top:18px;border-top:1px solid #e6f0eb}@keyframes agspin{to{transform:rotate(360deg)}}@media(max-width:1050px){.ag-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.ag-stats{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:720px){.ag-page{padding:20px 14px}.ag-heading{align-items:flex-start;flex-direction:column}.ag-heading-actions{width:100%}.ag-heading-actions .ag-btn{flex:1}.ag-toolbar{grid-template-columns:1fr}.ag-grid{grid-template-columns:1fr}.ag-stats{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.ag-stats article{padding:15px}.ag-image-wrap{height:240px}.ag-form-grid{grid-template-columns:1fr}.ag-field.full{grid-column:auto}.ag-modal-backdrop{padding:10px}.ag-modal form{padding:16px}.ag-upload-box{height:210px}.ag-modal footer .ag-btn{flex:1}}@media(max-width:420px){.ag-stats{grid-template-columns:1fr 1fr}.ag-stats strong{font-size:23px}}
      `}</style>
    </div>
  );
};

export default AdminGallery;
