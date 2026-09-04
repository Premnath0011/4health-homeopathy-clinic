// import React, { useState, useCallback, useEffect } from "react";
// import axios from "axios";
// import Apiurl from "../../Environmnet/Apiurl";

// // ── Icons ──────────────────────────────────────────────────────────────────
// const Icon = ({ d, size = 18, color = "currentColor", strokeWidth = 1.8 }) => (
//   <svg
//     width={size}
//     height={size}
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke={color}
//     strokeWidth={strokeWidth}
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d={d} />
//   </svg>
// );

// const icons = {
//   plus: "M12 5v14M5 12h14",
//   edit: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7 M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
//   trash:
//     "M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14M10 11v6M14 11v6",
//   close: "M18 6L6 18M6 6l12 12",
//   check: "M5 13l4 4L19 7",
//   star: "M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z",
//   image:
//     "M4 16l4-4 4 4 4-4 4 4M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
//   reviews:
//     "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z",
//   cases: "M22 12h-4l-3 9L9 3l-3 9H2",
//   video:
//     "M23 7l-7 5 7 5V7z M14 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z",
//   upload: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12",
//   save: "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z M17 21v-8H7v8M7 3v5h8",
//   toggle_on:
//     "M17 8H7a4 4 0 0 0 0 8h10a4 4 0 0 0 0-8z M17 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
//   toggle_off:
//     "M17 8H7a4 4 0 0 0 0 8h10a4 4 0 0 0 0-8z M7 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
// };

// // ── Colors ─────────────────────────────────────────────────────────────────
// const PRIMARY = "#2E8B57";
// const PRIMARY_DARK = "#1E6B3F";
// const PRIMARY_GRADIENT = "linear-gradient(135deg, #2E8B57, #1E6B3F)";
// const BORDER = "#D1EDE6";
// const TEXT_DARK = "#1E2F2B";
// const TEXT_MUTED = "#5E7B6E";
// const BG = "#F4FCF8";
// const CARD_BG = "#FFFFFF";
// const SHADOW = "0 8px 30px rgba(46, 139, 87, 0.08)";

// // ── Reusable Button ─────────────────────────────────────────────────────────
// const DashboardButton = ({
//   variant = "outline",
//   children,
//   onClick,
//   disabled,
//   style,
//   small = false,
//   type = "button",
// }) => {
//   const [hover, setHover] = useState(false);
//   const isPrimary = variant === "primary";
//   const isDanger = variant === "danger";

//   const base = {
//     display: "inline-flex",
//     alignItems: "center",
//     gap: small ? 4 : 6,
//     fontWeight: 600,
//     fontSize: small ? 11 : 12,
//     padding: small ? "5px 14px" : "8px 20px",
//     borderRadius: 30,
//     cursor: disabled ? "default" : "pointer",
//     border:
//       isPrimary || isDanger
//         ? "none"
//         : `1.5px solid ${hover ? PRIMARY : BORDER}`,
//     background: isPrimary
//       ? hover && !disabled
//         ? PRIMARY_DARK
//         : PRIMARY
//       : isDanger
//         ? hover && !disabled
//           ? "#B91C1C"
//           : "#D63C3C"
//         : "white",
//     color: isPrimary || isDanger ? "white" : PRIMARY,
//     transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
//     fontFamily: "'Inter', 'Segoe UI', sans-serif",
//     opacity: disabled ? 0.5 : 1,
//     transform: hover && !disabled && !isDanger ? "translateY(-1px)" : "none",
//     boxShadow:
//       hover && !disabled && isPrimary
//         ? "0 4px 15px rgba(46, 139, 87, 0.3)"
//         : "none",
//     ...(style || {}),
//   };
//   return (
//     <button
//       type={type}
//       style={base}
//       onMouseEnter={() => setHover(true)}
//       onMouseLeave={() => setHover(false)}
//       onClick={onClick}
//       disabled={disabled}
//     >
//       {children}
//     </button>
//   );
// };

// // ── Toast ──────────────────────────────────────────────────────────────────
// const Toast = ({ message, type, onClose }) => {
//   useEffect(() => {
//     const timer = setTimeout(() => onClose(), 2800);
//     return () => clearTimeout(timer);
//   }, [onClose]);

//   const bgClass = type === "error" ? "bg-danger" : "bg-success";

//   return (
//     <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 2000 }}>
//       <div
//         className={`toast fade show d-flex align-items-center ${bgClass} text-white border-0`}
//         role="alert"
//         style={{ borderRadius: 12, padding: "2px 4px" }}
//       >
//         <div className="toast-body d-flex align-items-center gap-2">
//           <Icon d={icons.check} size={16} color="white" />
//           <span className="fw-semibold">{message}</span>
//           <button
//             type="button"
//             className="btn-close btn-close-white ms-auto"
//             onClick={onClose}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// // ── Form field wrappers ─────────────────────────────────────────────────────
// const Field = ({ label, children }) => (
//   <div className="mb-3">
//     <label
//       style={{
//         fontSize: 12.5,
//         fontWeight: 700,
//         color: TEXT_DARK,
//         marginBottom: 6,
//         display: "block",
//       }}
//     >
//       {label}
//     </label>
//     {children}
//   </div>
// );

// const inputStyle = {
//   width: "100%",
//   border: `1.5px solid ${BORDER}`,
//   borderRadius: 10,
//   padding: "9px 12px",
//   fontSize: 13.5,
//   color: TEXT_DARK,
//   outline: "none",
//   fontFamily: "'Inter', 'Segoe UI', sans-serif",
// };

// const TextInput = (props) => (
//   <input {...props} style={{ ...inputStyle, ...(props.style || {}) }} />
// );
// const TextArea = (props) => (
//   <textarea
//     {...props}
//     style={{ ...inputStyle, resize: "vertical", ...(props.style || {}) }}
//   />
// );

// // ── Image upload ────────────────────────────────────────────────────────────
// const ImageUploadBox = ({ label, value, onChange, height = 140 }) => {
//   const inputRef = React.useRef(null);

//   const handleFile = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     onChange(file);
//   };

//   return (
//     <div>
//       {label && (
//         <label
//           style={{
//             fontSize: 12.5,
//             fontWeight: 700,
//             color: TEXT_DARK,
//             marginBottom: 6,
//             display: "block",
//           }}
//         >
//           {label}
//         </label>
//       )}
//       <div
//         onClick={() => inputRef.current?.click()}
//         style={{
//           height,
//           borderRadius: 12,
//           border: `1.5px dashed ${BORDER}`,
//           background: "#FBFEFC",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           cursor: "pointer",
//           overflow: "hidden",
//           position: "relative",
//         }}
//       >
//         {value ? (
//           <img
//             src={value instanceof File ? URL.createObjectURL(value) : value}
//             alt=""
//             style={{ width: "100%", height: "100%", objectFit: "cover" }}
//           />
//         ) : (
//           <div style={{ textAlign: "center", color: TEXT_MUTED }}>
//             <Icon d={icons.upload} size={22} color={PRIMARY} />
//             <div style={{ fontSize: 11.5, marginTop: 6, fontWeight: 600 }}>
//               Click to upload
//             </div>
//           </div>
//         )}
//         <input
//           ref={inputRef}
//           type="file"
//           accept="image/*"
//           onChange={handleFile}
//           style={{ display: "none" }}
//         />
//       </div>
//     </div>
//   );
// };

// // ── Video upload box ────────────────────────────────────────────────────────
// const VideoUploadBox = ({ label, value, onChange }) => {
//   const inputRef = React.useRef(null);

//   const handleFile = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     onChange(file);
//   };

//   // value can be: File object (newly selected) | string path (existing) | ""
//   const fileName =
//     value instanceof File ? value.name : value ? value.split("/").pop() : null;

//   return (
//     <div className="mb-3">
//       {label && (
//         <label
//           style={{
//             fontSize: 12.5,
//             fontWeight: 700,
//             color: TEXT_DARK,
//             marginBottom: 6,
//             display: "block",
//           }}
//         >
//           {label}
//         </label>
//       )}
//       <div
//         onClick={() => inputRef.current?.click()}
//         style={{
//           border: `1.5px dashed ${BORDER}`,
//           borderRadius: 10,
//           padding: "12px 16px",
//           cursor: "pointer",
//           background: "#FBFEFC",
//           display: "flex",
//           alignItems: "center",
//           gap: 10,
//           transition: "border-color 0.2s",
//         }}
//         onMouseEnter={(e) => (e.currentTarget.style.borderColor = PRIMARY)}
//         onMouseLeave={(e) => (e.currentTarget.style.borderColor = BORDER)}
//       >
//         <div
//           style={{
//             width: 36,
//             height: 36,
//             borderRadius: 8,
//             background: "#E8F5E9",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             flexShrink: 0,
//           }}
//         >
//           <Icon d={icons.video} size={16} color={PRIMARY} />
//         </div>
//         <div style={{ flex: 1, minWidth: 0 }}>
//           {fileName ? (
//             <>
//               <div
//                 style={{
//                   fontSize: 12.5,
//                   fontWeight: 600,
//                   color: TEXT_DARK,
//                   whiteSpace: "nowrap",
//                   overflow: "hidden",
//                   textOverflow: "ellipsis",
//                 }}
//               >
//                 {fileName}
//               </div>
//               <div style={{ fontSize: 11, color: PRIMARY, marginTop: 2 }}>
//                 ✓ {value instanceof File ? "Ready to upload" : "Uploaded"}
//               </div>
//             </>
//           ) : (
//             <>
//               <div
//                 style={{ fontSize: 12.5, fontWeight: 600, color: TEXT_DARK }}
//               >
//                 Click to upload video
//               </div>
//               <div style={{ fontSize: 11, color: TEXT_MUTED, marginTop: 2 }}>
//                 MP4, MOV, AVI, MKV supported
//               </div>
//             </>
//           )}
//         </div>
//         {fileName && (
//           <div
//             style={{
//               fontSize: 10,
//               color: TEXT_MUTED,
//               border: `1px solid ${BORDER}`,
//               borderRadius: 6,
//               padding: "2px 8px",
//               flexShrink: 0,
//             }}
//           >
//             Change
//           </div>
//         )}
//         <input
//           ref={inputRef}
//           type="file"
//           accept="video/*"
//           onChange={handleFile}
//           style={{ display: "none" }}
//         />
//       </div>
//     </div>
//   );
// };

// // ── Section Card ────────────────────────────────────────────────────────────
// const SectionCard = ({ title, icon, subtitle, children, actions }) => (
//   <div
//     style={{
//       background: CARD_BG,
//       borderRadius: 20,
//       border: `1px solid ${BORDER}`,
//       boxShadow: SHADOW,
//       padding: "22px 24px",
//       marginBottom: 24,
//     }}
//   >
//     <div className="d-flex justify-content-between align-items-start mb-3 flex-wrap gap-2">
//       <div className="d-flex align-items-center gap-2">
//         <div
//           style={{
//             width: 38,
//             height: 38,
//             borderRadius: 10,
//             background: "#E8F5E9",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <Icon d={icon} size={18} color={PRIMARY} />
//         </div>
//         <div>
//           <h5
//             style={{
//               fontWeight: 800,
//               color: TEXT_DARK,
//               margin: 0,
//               fontSize: 16,
//             }}
//           >
//             {title}
//           </h5>
//           {subtitle && (
//             <p style={{ color: TEXT_MUTED, fontSize: 12.5, margin: 0 }}>
//               {subtitle}
//             </p>
//           )}
//         </div>
//       </div>
//       {actions}
//     </div>
//     {children}
//   </div>
// );

// // ── Status badge ────────────────────────────────────────────────────────────
// const StatusBadge = ({ status }) => (
//   <span
//     style={{
//       fontSize: 10,
//       fontWeight: 700,
//       padding: "3px 10px",
//       borderRadius: 20,
//       background: status === "active" ? "#E8F5E9" : "#FEE2E2",
//       color: status === "active" ? PRIMARY : "#D63C3C",
//     }}
//   >
//     {status === "active" ? "Active" : "Inactive"}
//   </span>
// );

// const CASE_CATEGORIES = [
//   "Skin Conditions",
//   "Hair Disorders",
//   "Respiratory Issues",
//   "Children's Health",
//   "Women's Health",
//   "Chronic Diseases",
// ];

// const TABS = [
//   { key: "reviews", label: "Google Reviews", icon: icons.reviews },
//   { key: "cases", label: "Evidence of Progress", icon: icons.cases },
//   { key: "videos", label: "Video Testimonials", icon: icons.video },
// ];

// // ════════════════════════════════════════════════════════════════════════════
// // MAIN COMPONENT
// // ════════════════════════════════════════════════════════════════════════════
// const AdminTestimonial = () => {
//   const [activeTab, setActiveTab] = useState("reviews");
//   const [toast, setToast] = useState(null);
//   const showToast = useCallback(
//     (message, type = "success") => setToast({ message, type }),
//     [],
//   );
//   const clearToast = useCallback(() => setToast(null), []);

//   // ── Reviews state ──
//   const [reviews, setReviews] = useState([]);
//   const [loadingReviews, setLoadingReviews] = useState(true);

//   // ── Cases state ──
//   const [cases, setCases] = useState([]);
//   const [loadingCases, setLoadingCases] = useState(true);

//   // ── Videos state ──
//   const [videos, setVideos] = useState([]);
//   const [loadingVideos, setLoadingVideos] = useState(true);

//   // ── Modal states ──
//   const [reviewModal, setReviewModal] = useState(null);
//   const [caseModal, setCaseModal] = useState(null);
//   const [videoModal, setVideoModal] = useState(null);
//   const [deleteTarget, setDeleteTarget] = useState(null);
//   const [saving, setSaving] = useState(false);

//   // ── Fetch Reviews ──
//   const fetchReviews = useCallback(async () => {
//     try {
//       setLoadingReviews(true);
//       const res = await axios.get(`${Apiurl}/testimonial`);
//       setReviews(res.data || []);
//     } catch {
//       showToast("Failed to load reviews", "error");
//     } finally {
//       setLoadingReviews(false);
//     }
//   }, [showToast]);

//   // ── Fetch Cases ──
//   const fetchCases = useCallback(async () => {
//     try {
//       setLoadingCases(true);
//       const res = await axios.get(`${Apiurl}/evidence-of-progress`);
//       setCases(res.data || []);
//     } catch {
//       showToast("Failed to load case studies", "error");
//     } finally {
//       setLoadingCases(false);
//     }
//   }, [showToast]);

//   // ── Fetch Videos ──
//   const fetchVideos = useCallback(async () => {
//     try {
//       setLoadingVideos(true);
//       const res = await axios.get(`${Apiurl}/video-testimonial`);
//       setVideos(res.data || []);
//     } catch {
//       showToast("Failed to load video testimonials", "error");
//     } finally {
//       setLoadingVideos(false);
//     }
//   }, [showToast]);

//   useEffect(() => {
//     fetchReviews();
//     fetchCases();
//     fetchVideos();
//   }, [fetchReviews, fetchCases, fetchVideos]);

//   // ── Star picker ──
//   const StarPicker = ({ value, onChange }) => (
//     <div className="d-flex gap-1">
//       {[1, 2, 3, 4, 5].map((n) => (
//         <span key={n} onClick={() => onChange(n)} style={{ cursor: "pointer" }}>
//           <Icon
//             d={icons.star}
//             size={20}
//             color={n <= value ? "#f5a623" : "#ddd"}
//             strokeWidth={1}
//           />
//         </span>
//       ))}
//     </div>
//   );

//   // ══════════════════════════════════════════════════════════
//   // REVIEW CRUD
//   // ══════════════════════════════════════════════════════════
//   const openAddReview = () =>
//     setReviewModal({ mode: "add", data: { name: "", stars: 5, text: "" } });

//   const openEditReview = (r) =>
//     setReviewModal({
//       mode: "edit",
//       data: {
//         id: r._id,
//         name: r.client_name || "",
//         text: r.client_review || "",
//         stars: r.rating_stars || 5,
//         status: r.test_status || "active",
//       },
//     });

//   const saveReviewModal = async () => {
//     const { mode, data } = reviewModal;
//     if (!data.name?.trim() || !data.text?.trim()) {
//       showToast("Please fill all fields", "error");
//       return;
//     }
//     const payload = {
//       client_name: data.name,
//       client_review: data.text,
//       rating_stars: data.stars,
//       test_status: data.status || "active",
//     };
//     try {
//       setSaving(true);
//       if (mode === "add") {
//         await axios.post(`${Apiurl}/testimonial`, payload);
//         showToast("Review added successfully");
//       } else {
//         await axios.put(`${Apiurl}/testimonial/${data.id}`, payload);
//         showToast("Review updated successfully");
//       }
//       setReviewModal(null);
//       fetchReviews();
//     } catch {
//       showToast("Save failed", "error");
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ══════════════════════════════════════════════════════════
//   // CASE CRUD
//   // ══════════════════════════════════════════════════════════
//   const openAddCase = () =>
//     setCaseModal({
//       mode: "add",
//       data: {
//         category: CASE_CATEGORIES[0],
//         before_image: "",
//         after_image: "",
//         condition: "",
//         duration: "",
//         outcome: "",
//         eop_status: "active",
//       },
//     });

//   const openEditCase = (c) =>
//     setCaseModal({
//       mode: "edit",
//       data: {
//         id: c._id,
//         category: c.category,
//         before_image: c.before_image || "",
//         after_image: c.after_image || "",
//         condition: c.condition,
//         duration: c.duration,
//         outcome: c.outcome || "",
//         eop_status: c.eop_status || "active",
//       },
//     });

//   const saveCaseModal = async () => {
//     const { mode, data } = caseModal;
//     if (!data.condition?.trim() || !data.duration?.trim()) {
//       showToast("Please fill condition and duration", "error");
//       return;
//     }
//     const formData = new FormData();
//     formData.append("category", data.category);
//     formData.append("condition", data.condition);
//     formData.append("duration", data.duration);
//     formData.append("outcome", data.outcome);
//     formData.append("eop_status", data.eop_status);
//     if (data.before_image instanceof File) {
//       formData.append("before_image", data.before_image);
//     }
//     if (data.after_image instanceof File) {
//       formData.append("after_image", data.after_image);
//     }
//     try {
//       setSaving(true);
//       if (mode === "add") {
//         await axios.post(`${Apiurl}/evidence-of-progress`, formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         showToast("Case study added successfully");
//       } else {
//         await axios.put(`${Apiurl}/evidence-of-progress/${data.id}`, formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         showToast("Case study updated successfully");
//       }
//       setCaseModal(null);
//       fetchCases();
//     } catch {
//       showToast("Save failed", "error");
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ══════════════════════════════════════════════════════════
//   // VIDEO CRUD
//   // ══════════════════════════════════════════════════════════
//   const openAddVideo = () =>
//     setVideoModal({
//       mode: "add",
//       data: {
//         thumbnail_image: "",
//         video_file: "",
//         patient_name: "",
//         condition: "",
//         duration: "",
//         featured: false,
//         vid_status: "active",
//       },
//     });

//   const openEditVideo = (v) =>
//     setVideoModal({
//       mode: "edit",
//       data: {
//         id: v._id,
//         thumbnail_image: v.thumbnail_image || "",
//         video_file: v.video_file || "",
//         patient_name: v.patient_name || "",
//         condition: v.condition || "",
//         duration: v.duration || "",
//         featured: v.featured || false,
//         vid_status: v.vid_status || "active",
//       },
//     });

//   const saveVideoModal = async () => {
//     const { mode, data } = videoModal;
//     if (!data.patient_name?.trim() || !data.condition?.trim()) {
//       showToast("Please fill name and condition", "error");
//       return;
//     }
//     const formData = new FormData();
//     formData.append("patient_name", data.patient_name);
//     formData.append("condition", data.condition);
//     formData.append("duration", data.duration);
//     formData.append("featured", data.featured);
//     formData.append("vid_status", data.vid_status);

//     // Thumbnail — file மட்டும் upload பண்ணு
//     if (data.thumbnail_image instanceof File) {
//       formData.append("thumbnail_image", data.thumbnail_image);
//     }

//     // Video file — file மட்டும் upload பண்ணு
//     if (data.video_file instanceof File) {
//       formData.append("video_file", data.video_file);
//     }

//     try {
//       setSaving(true);
//       if (mode === "add") {
//         await axios.post(`${Apiurl}/video-testimonial`, formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         showToast("Video testimonial added successfully");
//       } else {
//         await axios.put(`${Apiurl}/video-testimonial/${data.id}`, formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         showToast("Video testimonial updated successfully");
//       }
//       setVideoModal(null);
//       fetchVideos();
//     } catch {
//       showToast("Save failed", "error");
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ══════════════════════════════════════════════════════════
//   // DELETE (shared)
//   // ══════════════════════════════════════════════════════════
//   const confirmDelete = async () => {
//     const { type, id } = deleteTarget;
//     try {
//       if (type === "review") {
//         await axios.delete(`${Apiurl}/testimonial/${id}`);
//         fetchReviews();
//       }
//       if (type === "case") {
//         await axios.delete(`${Apiurl}/evidence-of-progress/${id}`);
//         fetchCases();
//       }
//       if (type === "video") {
//         await axios.delete(`${Apiurl}/video-testimonial/${id}`);
//         fetchVideos();
//       }
//       showToast("Deleted successfully");
//     } catch {
//       showToast("Delete failed", "error");
//     }
//     setDeleteTarget(null);
//   };

//   // ══════════════════════════════════════════════════════════
//   // RENDER
//   // ══════════════════════════════════════════════════════════
//   return (
//     <div
//       style={{
//         padding: "24px 28px",
//         background: BG,
//         minHeight: "100vh",
//         fontFamily: "'Inter', 'Segoe UI', sans-serif",
//         fontSize: 14,
//       }}
//     >
//       {/* Header */}
//       <div className="mb-4">
//         <h1
//           style={{
//             fontSize: 28,
//             fontWeight: 800,
//             color: TEXT_DARK,
//             margin: 0,
//             letterSpacing: "-0.5px",
//           }}
//         >
//           Testimonials
//         </h1>
//         <p style={{ fontSize: 14, color: TEXT_MUTED, margin: "4px 0 0" }}>
//           Manage Google reviews, case studies, and video testimonials.
//         </p>
//       </div>

//       {/* Tabs */}
//       <div
//         className="d-flex flex-wrap gap-2 mb-4"
//         style={{
//           background: "white",
//           padding: 8,
//           borderRadius: 14,
//           border: `1px solid ${BORDER}`,
//           boxShadow: SHADOW,
//         }}
//       >
//         {TABS.map((t) => (
//           <button
//             key={t.key}
//             onClick={() => setActiveTab(t.key)}
//             className="d-flex align-items-center gap-2"
//             style={{
//               border: "none",
//               background:
//                 activeTab === t.key ? PRIMARY_GRADIENT : "transparent",
//               color: activeTab === t.key ? "white" : TEXT_MUTED,
//               fontWeight: 700,
//               fontSize: 12.5,
//               padding: "9px 16px",
//               borderRadius: 10,
//               cursor: "pointer",
//               transition: "all 0.2s",
//             }}
//           >
//             <Icon
//               d={t.icon}
//               size={15}
//               color={activeTab === t.key ? "white" : PRIMARY}
//             />
//             {t.label}
//           </button>
//         ))}
//       </div>

//       {/* ═══════════ GOOGLE REVIEWS TAB ═══════════ */}
//       {activeTab === "reviews" && (
//         <SectionCard
//           title="Patient Reviews"
//           icon={icons.reviews}
//           subtitle={`${reviews.length} reviews — shown 3 at a time on the website`}
//           actions={
//             <DashboardButton
//               variant="primary"
//               onClick={openAddReview}
//               style={{ background: PRIMARY_GRADIENT }}
//             >
//               <Icon d={icons.plus} size={13} color="white" /> Add Review
//             </DashboardButton>
//           }
//         >
//           {loadingReviews ? (
//             <p style={{ color: TEXT_MUTED, fontSize: 13.5 }}>
//               Loading reviews...
//             </p>
//           ) : reviews.length === 0 ? (
//             <p style={{ color: TEXT_MUTED, fontSize: 13.5 }}>
//               No reviews yet. Add your first one.
//             </p>
//           ) : (
//             <div className="row g-3">
//               {reviews.map((r) => (
//                 <div className="col-lg-4 col-md-6" key={r._id}>
//                   <div
//                     style={{
//                       border: `1px solid ${BORDER}`,
//                       borderRadius: 14,
//                       padding: 16,
//                       height: "100%",
//                       display: "flex",
//                       flexDirection: "column",
//                     }}
//                   >
//                     <div className="d-flex align-items-center justify-content-between mb-2">
//                       <div className="d-flex gap-1">
//                         {[...Array(5)].map((_, i) => (
//                           <Icon
//                             key={i}
//                             d={icons.star}
//                             size={13}
//                             color={i < r.rating_stars ? "#f5a623" : "#ddd"}
//                             strokeWidth={1}
//                           />
//                         ))}
//                       </div>
//                       <StatusBadge status={r.test_status} />
//                     </div>
//                     <p
//                       style={{
//                         fontSize: 13,
//                         color: TEXT_MUTED,
//                         flex: 1,
//                         fontStyle: "italic",
//                       }}
//                     >
//                       "{r.client_review}"
//                     </p>
//                     <div className="d-flex justify-content-between align-items-center mt-2">
//                       <strong style={{ fontSize: 13, color: TEXT_DARK }}>
//                         {r.client_name}
//                       </strong>
//                       <div className="d-flex gap-1">
//                         <DashboardButton
//                           variant="outline"
//                           small
//                           onClick={() => openEditReview(r)}
//                         >
//                           <Icon d={icons.edit} size={11} />
//                         </DashboardButton>
//                         <DashboardButton
//                           variant="danger"
//                           small
//                           onClick={() =>
//                             setDeleteTarget({
//                               type: "review",
//                               id: r._id,
//                               label: r.client_name,
//                             })
//                           }
//                         >
//                           <Icon d={icons.trash} size={11} />
//                         </DashboardButton>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </SectionCard>
//       )}

//       {/* ═══════════ EVIDENCE OF PROGRESS TAB ═══════════ */}
//       {activeTab === "cases" && (
//         <SectionCard
//           title="Evidence of Progress (Case Studies)"
//           icon={icons.cases}
//           subtitle={`${cases.length} case studies — Before/After slider shown on website`}
//           actions={
//             <DashboardButton
//               variant="primary"
//               onClick={openAddCase}
//               style={{ background: PRIMARY_GRADIENT }}
//             >
//               <Icon d={icons.plus} size={13} color="white" /> Add Case Study
//             </DashboardButton>
//           }
//         >
//           {loadingCases ? (
//             <p style={{ color: TEXT_MUTED, fontSize: 13.5 }}>
//               Loading case studies...
//             </p>
//           ) : cases.length === 0 ? (
//             <p style={{ color: TEXT_MUTED, fontSize: 13.5 }}>
//               No case studies yet. Add your first one.
//             </p>
//           ) : (
//             <div className="row g-3">
//               {cases.map((c) => (
//                 <div className="col-lg-3 col-md-6" key={c._id}>
//                   <div
//                     style={{
//                       border: `1px solid ${BORDER}`,
//                       borderRadius: 14,
//                       overflow: "hidden",
//                     }}
//                   >
//                     {/* Before / After preview */}
//                     <div className="d-flex">
//                       <div
//                         style={{
//                           width: "50%",
//                           height: 110,
//                           background: "#eef",
//                           position: "relative",
//                         }}
//                       >
//                         {c.before_image ? (
//                           <img
//                             src={`${Apiurl.replace("/api", "")}${c.before_image}`}
//                             alt="before"
//                             style={{
//                               width: "100%",
//                               height: "100%",
//                               objectFit: "cover",
//                             }}
//                           />
//                         ) : (
//                           <div className="d-flex align-items-center justify-content-center h-100">
//                             <Icon
//                               d={icons.image}
//                               size={18}
//                               color={TEXT_MUTED}
//                             />
//                           </div>
//                         )}
//                         <span
//                           style={{
//                             position: "absolute",
//                             bottom: 4,
//                             left: 4,
//                             fontSize: 9,
//                             fontWeight: 700,
//                             background: "rgba(15,61,110,0.75)",
//                             color: "#fff",
//                             padding: "2px 7px",
//                             borderRadius: 4,
//                           }}
//                         >
//                           BEFORE
//                         </span>
//                       </div>
//                       <div
//                         style={{
//                           width: "50%",
//                           height: 110,
//                           background: "#efe",
//                           position: "relative",
//                         }}
//                       >
//                         {c.after_image ? (
//                           <img
//                             src={`${Apiurl.replace("/api", "")}${c.after_image}`}
//                             alt="after"
//                             style={{
//                               width: "100%",
//                               height: "100%",
//                               objectFit: "cover",
//                             }}
//                           />
//                         ) : (
//                           <div className="d-flex align-items-center justify-content-center h-100">
//                             <Icon
//                               d={icons.image}
//                               size={18}
//                               color={TEXT_MUTED}
//                             />
//                           </div>
//                         )}
//                         <span
//                           style={{
//                             position: "absolute",
//                             bottom: 4,
//                             right: 4,
//                             fontSize: 9,
//                             fontWeight: 700,
//                             background: "rgba(75,168,106,0.8)",
//                             color: "#fff",
//                             padding: "2px 7px",
//                             borderRadius: 4,
//                           }}
//                         >
//                           AFTER
//                         </span>
//                       </div>
//                     </div>

//                     <div className="p-3">
//                       <div className="d-flex align-items-center justify-content-between mb-2">
//                         <span
//                           style={{
//                             fontSize: 10,
//                             fontWeight: 700,
//                             color: PRIMARY,
//                             background: "#E8F5E9",
//                             padding: "3px 10px",
//                             borderRadius: 20,
//                           }}
//                         >
//                           {c.category}
//                         </span>
//                         <StatusBadge status={c.eop_status} />
//                       </div>
//                       <div
//                         style={{
//                           fontSize: 13.5,
//                           fontWeight: 700,
//                           color: TEXT_DARK,
//                           marginTop: 4,
//                         }}
//                       >
//                         {c.condition}
//                       </div>
//                       <div style={{ fontSize: 12, color: TEXT_MUTED }}>
//                         {c.duration}
//                       </div>
//                       <p
//                         style={{
//                           fontSize: 11.5,
//                           color: TEXT_MUTED,
//                           marginTop: 6,
//                           marginBottom: 10,
//                         }}
//                       >
//                         {c.outcome}
//                       </p>
//                       <div className="d-flex gap-2">
//                         <DashboardButton
//                           variant="outline"
//                           small
//                           onClick={() => openEditCase(c)}
//                         >
//                           <Icon d={icons.edit} size={11} /> Edit
//                         </DashboardButton>
//                         <DashboardButton
//                           variant="danger"
//                           small
//                           onClick={() =>
//                             setDeleteTarget({
//                               type: "case",
//                               id: c._id,
//                               label: c.condition,
//                             })
//                           }
//                         >
//                           <Icon d={icons.trash} size={11} /> Delete
//                         </DashboardButton>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </SectionCard>
//       )}

//       {/* ═══════════ VIDEO TESTIMONIALS TAB ═══════════ */}
//       {activeTab === "videos" && (
//         <SectionCard
//           title="Video Testimonials"
//           icon={icons.video}
//           subtitle={`${videos.length} videos — patient thumbnails shown on website`}
//           actions={
//             <DashboardButton
//               variant="primary"
//               onClick={openAddVideo}
//               style={{ background: PRIMARY_GRADIENT }}
//             >
//               <Icon d={icons.plus} size={13} color="white" /> Add Video
//             </DashboardButton>
//           }
//         >
//           {loadingVideos ? (
//             <p style={{ color: TEXT_MUTED, fontSize: 13.5 }}>
//               Loading videos...
//             </p>
//           ) : videos.length === 0 ? (
//             <p style={{ color: TEXT_MUTED, fontSize: 13.5 }}>
//               No video testimonials yet. Add your first one.
//             </p>
//           ) : (
//             <div className="row g-3">
//               {videos.map((v) => (
//                 <div className="col-lg-2 col-md-4 col-6" key={v._id}>
//                   <div
//                     style={{
//                       border: `1px solid ${BORDER}`,
//                       borderRadius: 14,
//                       overflow: "hidden",
//                     }}
//                   >
//                     {/* Thumbnail */}
//                     <div
//                       style={{
//                         height: 100,
//                         background: "#eee",
//                         position: "relative",
//                       }}
//                     >
//                       {v.thumbnail_image ? (
//                         <img
//                           src={`${Apiurl.replace("/api", "")}${v.thumbnail_image}`}
//                           alt={v.patient_name}
//                           style={{
//                             width: "100%",
//                             height: "100%",
//                             objectFit: "cover",
//                           }}
//                         />
//                       ) : (
//                         <div className="d-flex align-items-center justify-content-center h-100">
//                           <Icon d={icons.image} size={18} color={TEXT_MUTED} />
//                         </div>
//                       )}

//                       {/* Video file indicator */}
//                       {v.video_file && (
//                         <div
//                           style={{
//                             position: "absolute",
//                             bottom: 6,
//                             right: 6,
//                             width: 24,
//                             height: 24,
//                             borderRadius: "50%",
//                             background: "rgba(46,139,87,0.9)",
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                           }}
//                           title="Video file uploaded"
//                         >
//                           {/* Play triangle */}
//                           <svg
//                             width="8"
//                             height="10"
//                             viewBox="0 0 8 10"
//                             fill="none"
//                           >
//                             <path d="M1 1L7 5L1 9V1Z" fill="white" />
//                           </svg>
//                         </div>
//                       )}

//                       {v.featured && (
//                         <span
//                           style={{
//                             position: "absolute",
//                             top: 6,
//                             left: 6,
//                             background: PRIMARY,
//                             color: "white",
//                             fontSize: 9,
//                             fontWeight: 700,
//                             padding: "2px 7px",
//                             borderRadius: 6,
//                           }}
//                         >
//                           Featured
//                         </span>
//                       )}
//                     </div>

//                     <div className="p-2">
//                       <div className="d-flex align-items-center justify-content-between mb-1">
//                         <div
//                           style={{
//                             fontSize: 12.5,
//                             fontWeight: 700,
//                             color: TEXT_DARK,
//                           }}
//                         >
//                           {v.patient_name}
//                         </div>
//                         <StatusBadge status={v.vid_status} />
//                       </div>
//                       <div style={{ fontSize: 10.5, color: TEXT_MUTED }}>
//                         {v.condition}
//                       </div>
//                       <div
//                         style={{
//                           fontSize: 10,
//                           color: TEXT_MUTED,
//                           marginBottom: 6,
//                         }}
//                       >
//                         {v.duration}
//                       </div>
//                       {/* Video file status text */}
//                       <div
//                         style={{
//                           fontSize: 10,
//                           color: v.video_file ? PRIMARY : "#f59e0b",
//                           fontWeight: 600,
//                           marginBottom: 6,
//                         }}
//                       >
//                         {v.video_file ? "✓ Video ready" : "⚠ No video file"}
//                       </div>
//                       <div className="d-flex gap-1">
//                         <DashboardButton
//                           variant="outline"
//                           small
//                           onClick={() => openEditVideo(v)}
//                         >
//                           <Icon d={icons.edit} size={10} />
//                         </DashboardButton>
//                         <DashboardButton
//                           variant="danger"
//                           small
//                           onClick={() =>
//                             setDeleteTarget({
//                               type: "video",
//                               id: v._id,
//                               label: v.patient_name,
//                             })
//                           }
//                         >
//                           <Icon d={icons.trash} size={10} />
//                         </DashboardButton>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </SectionCard>
//       )}

//       {/* ═══════════ REVIEW MODAL ═══════════ */}
//       {reviewModal && (
//         <Modal
//           title={reviewModal.mode === "add" ? "Add Review" : "Edit Review"}
//           onClose={() => setReviewModal(null)}
//         >
//           <Field label="Patient Name">
//             <TextInput
//               value={reviewModal.data.name}
//               onChange={(e) =>
//                 setReviewModal({
//                   ...reviewModal,
//                   data: { ...reviewModal.data, name: e.target.value },
//                 })
//               }
//             />
//           </Field>
//           <Field label="Rating">
//             <StarPicker
//               value={reviewModal.data.stars}
//               onChange={(n) =>
//                 setReviewModal({
//                   ...reviewModal,
//                   data: { ...reviewModal.data, stars: n },
//                 })
//               }
//             />
//           </Field>
//           <Field label="Review Text">
//             <TextArea
//               rows={4}
//               value={reviewModal.data.text}
//               onChange={(e) =>
//                 setReviewModal({
//                   ...reviewModal,
//                   data: { ...reviewModal.data, text: e.target.value },
//                 })
//               }
//             />
//           </Field>
//           {reviewModal.mode === "edit" && (
//             <Field label="Status">
//               <select
//                 value={reviewModal.data.status}
//                 onChange={(e) =>
//                   setReviewModal({
//                     ...reviewModal,
//                     data: { ...reviewModal.data, status: e.target.value },
//                   })
//                 }
//                 style={inputStyle}
//               >
//                 <option value="active">Active</option>
//                 <option value="inactive">Inactive</option>
//               </select>
//             </Field>
//           )}
//           <ModalActions
//             onCancel={() => setReviewModal(null)}
//             onSave={saveReviewModal}
//             saving={saving}
//           />
//         </Modal>
//       )}

//       {/* ═══════════ CASE MODAL ═══════════ */}
//       {caseModal && (
//         <Modal
//           title={
//             caseModal.mode === "add" ? "Add Case Study" : "Edit Case Study"
//           }
//           onClose={() => setCaseModal(null)}
//         >
//           <Field label="Category">
//             <select
//               value={caseModal.data.category}
//               onChange={(e) =>
//                 setCaseModal({
//                   ...caseModal,
//                   data: { ...caseModal.data, category: e.target.value },
//                 })
//               }
//               style={inputStyle}
//             >
//               {CASE_CATEGORIES.map((cat) => (
//                 <option key={cat} value={cat}>
//                   {cat}
//                 </option>
//               ))}
//             </select>
//           </Field>
//           <div className="row g-2 mb-1">
//             <div className="col-6">
//               <ImageUploadBox
//                 label="Before Image"
//                 value={caseModal.data.before_image}
//                 onChange={(file) =>
//                   setCaseModal({
//                     ...caseModal,
//                     data: { ...caseModal.data, before_image: file },
//                   })
//                 }
//                 height={110}
//               />
//             </div>
//             <div className="col-6">
//               <ImageUploadBox
//                 label="After Image"
//                 value={caseModal.data.after_image}
//                 onChange={(file) =>
//                   setCaseModal({
//                     ...caseModal,
//                     data: { ...caseModal.data, after_image: file },
//                   })
//                 }
//                 height={110}
//               />
//             </div>
//           </div>
//           <Field label="Condition">
//             <TextInput
//               value={caseModal.data.condition}
//               onChange={(e) =>
//                 setCaseModal({
//                   ...caseModal,
//                   data: { ...caseModal.data, condition: e.target.value },
//                 })
//               }
//             />
//           </Field>
//           <Field label="Treatment Duration">
//             <TextInput
//               value={caseModal.data.duration}
//               onChange={(e) =>
//                 setCaseModal({
//                   ...caseModal,
//                   data: { ...caseModal.data, duration: e.target.value },
//                 })
//               }
//               placeholder="e.g. 6 Months"
//             />
//           </Field>
//           <Field label="Outcome">
//             <TextArea
//               rows={3}
//               value={caseModal.data.outcome}
//               onChange={(e) =>
//                 setCaseModal({
//                   ...caseModal,
//                   data: { ...caseModal.data, outcome: e.target.value },
//                 })
//               }
//             />
//           </Field>
//           <Field label="Status">
//             <select
//               value={caseModal.data.eop_status}
//               onChange={(e) =>
//                 setCaseModal({
//                   ...caseModal,
//                   data: { ...caseModal.data, eop_status: e.target.value },
//                 })
//               }
//               style={inputStyle}
//             >
//               <option value="active">Active</option>
//               <option value="inactive">Inactive</option>
//             </select>
//           </Field>
//           <ModalActions
//             onCancel={() => setCaseModal(null)}
//             onSave={saveCaseModal}
//             saving={saving}
//           />
//         </Modal>
//       )}

//       {/* ═══════════ VIDEO MODAL ═══════════ */}
//       {videoModal && (
//         <Modal
//           title={
//             videoModal.mode === "add"
//               ? "Add Video Testimonial"
//               : "Edit Video Testimonial"
//           }
//           onClose={() => setVideoModal(null)}
//         >
//           {/* Thumbnail */}
//           <ImageUploadBox
//             label="Thumbnail Image"
//             value={videoModal.data.thumbnail_image}
//             onChange={(file) =>
//               setVideoModal({
//                 ...videoModal,
//                 data: { ...videoModal.data, thumbnail_image: file },
//               })
//             }
//             height={140}
//           />

//           {/* Video file upload — NEW */}
//           <VideoUploadBox
//             label="Video File (MP4 / MOV / AVI)"
//             value={videoModal.data.video_file}
//             onChange={(file) =>
//               setVideoModal({
//                 ...videoModal,
//                 data: { ...videoModal.data, video_file: file },
//               })
//             }
//           />

//           <Field label="Patient Name">
//             <TextInput
//               value={videoModal.data.patient_name}
//               onChange={(e) =>
//                 setVideoModal({
//                   ...videoModal,
//                   data: {
//                     ...videoModal.data,
//                     patient_name: e.target.value,
//                   },
//                 })
//               }
//             />
//           </Field>
//           <Field label="Condition">
//             <TextInput
//               value={videoModal.data.condition}
//               onChange={(e) =>
//                 setVideoModal({
//                   ...videoModal,
//                   data: { ...videoModal.data, condition: e.target.value },
//                 })
//               }
//             />
//           </Field>
//           <Field label="Treatment Duration">
//             <TextInput
//               value={videoModal.data.duration}
//               onChange={(e) =>
//                 setVideoModal({
//                   ...videoModal,
//                   data: { ...videoModal.data, duration: e.target.value },
//                 })
//               }
//               placeholder="e.g. 7 Months"
//             />
//           </Field>
//           <div className="d-flex align-items-center gap-2 mb-3">
//             <input
//               type="checkbox"
//               id="featuredCheck"
//               checked={videoModal.data.featured}
//               onChange={(e) =>
//                 setVideoModal({
//                   ...videoModal,
//                   data: { ...videoModal.data, featured: e.target.checked },
//                 })
//               }
//             />
//             <label
//               htmlFor="featuredCheck"
//               style={{ fontSize: 13, color: TEXT_DARK, fontWeight: 600 }}
//             >
//               Mark as Featured Story
//             </label>
//           </div>
//           <Field label="Status">
//             <select
//               value={videoModal.data.vid_status}
//               onChange={(e) =>
//                 setVideoModal({
//                   ...videoModal,
//                   data: { ...videoModal.data, vid_status: e.target.value },
//                 })
//               }
//               style={inputStyle}
//             >
//               <option value="active">Active</option>
//               <option value="inactive">Inactive</option>
//             </select>
//           </Field>
//           <ModalActions
//             onCancel={() => setVideoModal(null)}
//             onSave={saveVideoModal}
//             saving={saving}
//           />
//         </Modal>
//       )}

//       {/* ═══════════ DELETE CONFIRM ═══════════ */}
//       {deleteTarget && (
//         <div
//           className="modal d-block"
//           style={{
//             backgroundColor: "rgba(0,0,0,0.4)",
//             backdropFilter: "blur(8px)",
//             zIndex: 9999,
//           }}
//           onClick={() => setDeleteTarget(null)}
//         >
//           <div
//             className="modal-dialog modal-dialog-centered"
//             style={{ maxWidth: 420 }}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div
//               className="modal-content border-0 shadow"
//               style={{
//                 borderRadius: 24,
//                 background: "white",
//                 padding: "32px 28px",
//                 textAlign: "center",
//               }}
//             >
//               <div
//                 style={{
//                   width: 56,
//                   height: 56,
//                   borderRadius: "50%",
//                   background: "#FEE2E2",
//                   display: "inline-flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   margin: "0 auto 16px",
//                 }}
//               >
//                 <Icon d={icons.trash} size={24} color="#D63C3C" />
//               </div>
//               <h5
//                 style={{
//                   fontWeight: 700,
//                   fontSize: 20,
//                   color: TEXT_DARK,
//                   marginBottom: 4,
//                 }}
//               >
//                 Confirm Delete
//               </h5>
//               <p style={{ color: TEXT_MUTED, fontSize: 14, marginBottom: 20 }}>
//                 Are you sure you want to delete "
//                 <strong>{deleteTarget.label}</strong>"?
//                 <br />
//                 This action{" "}
//                 <strong style={{ color: "#D63C3C" }}>cannot be undone</strong>.
//               </p>
//               <div className="d-flex justify-content-center gap-2">
//                 <DashboardButton
//                   variant="outline"
//                   onClick={() => setDeleteTarget(null)}
//                 >
//                   Cancel
//                 </DashboardButton>
//                 <DashboardButton
//                   variant="danger"
//                   onClick={confirmDelete}
//                   style={{ background: "#D63C3C" }}
//                 >
//                   Delete
//                 </DashboardButton>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {toast && (
//         <Toast message={toast.message} type={toast.type} onClose={clearToast} />
//       )}
//     </div>
//   );
// };

// // ── Modal wrapper ───────────────────────────────────────────────────────────
// const Modal = ({ title, children, onClose }) => (
//   <div
//     className="modal d-block"
//     style={{
//       backgroundColor: "rgba(0,0,0,0.4)",
//       backdropFilter: "blur(8px)",
//       zIndex: 9999,
//     }}
//     onClick={onClose}
//   >
//     <div
//       className="modal-dialog modal-dialog-centered"
//       style={{ maxWidth: 480 }}
//       onClick={(e) => e.stopPropagation()}
//     >
//       <div
//         className="modal-content border-0 shadow"
//         style={{
//           borderRadius: 22,
//           background: "white",
//           padding: "24px 26px",
//           maxHeight: "90vh",
//           overflowY: "auto",
//         }}
//       >
//         <div className="d-flex justify-content-between align-items-center mb-3">
//           <h5
//             style={{
//               fontWeight: 800,
//               color: TEXT_DARK,
//               margin: 0,
//               fontSize: 17,
//             }}
//           >
//             {title}
//           </h5>
//           <button
//             onClick={onClose}
//             style={{
//               background: "none",
//               border: "none",
//               cursor: "pointer",
//               color: TEXT_MUTED,
//             }}
//           >
//             <Icon d={icons.close} size={18} />
//           </button>
//         </div>
//         {children}
//       </div>
//     </div>
//   </div>
// );

// const ModalActions = ({ onCancel, onSave, saving }) => (
//   <div className="d-flex justify-content-end gap-2 mt-3">
//     <DashboardButton variant="outline" onClick={onCancel} disabled={saving}>
//       Cancel
//     </DashboardButton>
//     <DashboardButton
//       variant="primary"
//       onClick={onSave}
//       disabled={saving}
//       style={{ background: PRIMARY_GRADIENT }}
//     >
//       <Icon d={icons.check} size={13} color="white" />{" "}
//       {saving ? "Saving..." : "Save"}
//     </DashboardButton>
//   </div>
// );

// export default AdminTestimonial;

import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import Apiurl from "../../Environmnet/Apiurl";

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
  plus: "M12 5v14M5 12h14",
  edit: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7 M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  trash:
    "M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14M10 11v6M14 11v6",
  close: "M18 6L6 18M6 6l12 12",
  check: "M5 13l4 4L19 7",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z",
  image:
    "M4 16l4-4 4 4 4-4 4 4M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  reviews:
    "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z",
  cases: "M22 12h-4l-3 9L9 3l-3 9H2",
  video:
    "M23 7l-7 5 7 5V7z M14 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z",
  upload: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12",
  save: "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z M17 21v-8H7v8M7 3v5h8",
  toggle_on:
    "M17 8H7a4 4 0 0 0 0 8h10a4 4 0 0 0 0-8z M17 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
  toggle_off:
    "M17 8H7a4 4 0 0 0 0 8h10a4 4 0 0 0 0-8z M7 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
};

// ── Colors ─────────────────────────────────────────────────────────────────
const PRIMARY = "#2E8B57";
const PRIMARY_DARK = "#1E6B3F";
const PRIMARY_GRADIENT = "linear-gradient(135deg, #2E8B57, #1E6B3F)";
const BORDER = "#D1EDE6";
const TEXT_DARK = "#1E2F2B";
const TEXT_MUTED = "#5E7B6E";
const BG = "#F4FCF8";
const CARD_BG = "#FFFFFF";
const SHADOW = "0 8px 30px rgba(46, 139, 87, 0.08)";

// ── Reusable Button ─────────────────────────────────────────────────────────
const DashboardButton = ({
  variant = "outline",
  children,
  onClick,
  disabled,
  style,
  small = false,
  type = "button",
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
      type={type}
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
    const timer = setTimeout(() => onClose(), 2800);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgClass = type === "error" ? "bg-danger" : "bg-success";

  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 2000 }}>
      <div
        className={`toast fade show d-flex align-items-center ${bgClass} text-white border-0`}
        role="alert"
        style={{ borderRadius: 12, padding: "2px 4px" }}
      >
        <div className="toast-body d-flex align-items-center gap-2">
          <Icon d={icons.check} size={16} color="white" />
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

// ── Form field wrappers ─────────────────────────────────────────────────────
const Field = ({ label, children }) => (
  <div className="mb-3">
    <label
      style={{
        fontSize: 12.5,
        fontWeight: 700,
        color: TEXT_DARK,
        marginBottom: 6,
        display: "block",
      }}
    >
      {label}
    </label>
    {children}
  </div>
);

const inputStyle = {
  width: "100%",
  border: `1.5px solid ${BORDER}`,
  borderRadius: 10,
  padding: "9px 12px",
  fontSize: 13.5,
  color: TEXT_DARK,
  outline: "none",
  fontFamily: "'Inter', 'Segoe UI', sans-serif",
};

const TextInput = (props) => (
  <input {...props} style={{ ...inputStyle, ...(props.style || {}) }} />
);
const TextArea = (props) => (
  <textarea
    {...props}
    style={{ ...inputStyle, resize: "vertical", ...(props.style || {}) }}
  />
);

// ── Image upload ────────────────────────────────────────────────────────────
const ImageUploadBox = ({ label, value, onChange, height = 140 }) => {
  const inputRef = React.useRef(null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onChange(file);
  };

  return (
    <div>
      {label && (
        <label
          style={{
            fontSize: 12.5,
            fontWeight: 700,
            color: TEXT_DARK,
            marginBottom: 6,
            display: "block",
          }}
        >
          {label}
        </label>
      )}
      <div
        onClick={() => inputRef.current?.click()}
        style={{
          height,
          borderRadius: 12,
          border: `1.5px dashed ${BORDER}`,
          background: "#FBFEFC",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {value ? (
          <img
            src={value instanceof File ? URL.createObjectURL(value) : value}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div style={{ textAlign: "center", color: TEXT_MUTED }}>
            <Icon d={icons.upload} size={22} color={PRIMARY} />
            <div style={{ fontSize: 11.5, marginTop: 6, fontWeight: 600 }}>
              Click to upload
            </div>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFile}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
};

// ── Video upload box ────────────────────────────────────────────────────────
const VideoUploadBox = ({ label, value, onChange }) => {
  const inputRef = React.useRef(null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onChange(file);
  };

  // value can be: File object (newly selected) | string path (existing) | ""
  const fileName =
    value instanceof File ? value.name : value ? value.split("/").pop() : null;

  return (
    <div className="mb-3">
      {label && (
        <label
          style={{
            fontSize: 12.5,
            fontWeight: 700,
            color: TEXT_DARK,
            marginBottom: 6,
            display: "block",
          }}
        >
          {label}
        </label>
      )}
      <div
        onClick={() => inputRef.current?.click()}
        style={{
          border: `1.5px dashed ${BORDER}`,
          borderRadius: 10,
          padding: "12px 16px",
          cursor: "pointer",
          background: "#FBFEFC",
          display: "flex",
          alignItems: "center",
          gap: 10,
          transition: "border-color 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = PRIMARY)}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = BORDER)}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: "#E8F5E9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon d={icons.video} size={16} color={PRIMARY} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          {fileName ? (
            <>
              <div
                style={{
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: TEXT_DARK,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {fileName}
              </div>
              <div style={{ fontSize: 11, color: PRIMARY, marginTop: 2 }}>
                ✓ {value instanceof File ? "Ready to upload" : "Uploaded"}
              </div>
            </>
          ) : (
            <>
              <div
                style={{ fontSize: 12.5, fontWeight: 600, color: TEXT_DARK }}
              >
                Click to upload video
              </div>
              <div style={{ fontSize: 11, color: TEXT_MUTED, marginTop: 2 }}>
                MP4, MOV, AVI, MKV supported
              </div>
            </>
          )}
        </div>
        {fileName && (
          <div
            style={{
              fontSize: 10,
              color: TEXT_MUTED,
              border: `1px solid ${BORDER}`,
              borderRadius: 6,
              padding: "2px 8px",
              flexShrink: 0,
            }}
          >
            Change
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="video/*"
          onChange={handleFile}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
};

// ── Section Card ────────────────────────────────────────────────────────────
const SectionCard = ({ title, icon, subtitle, children, actions }) => (
  <div
    style={{
      background: CARD_BG,
      borderRadius: 20,
      border: `1px solid ${BORDER}`,
      boxShadow: SHADOW,
      padding: "22px 24px",
      marginBottom: 24,
    }}
  >
    <div className="d-flex justify-content-between align-items-start mb-3 flex-wrap gap-2">
      <div className="d-flex align-items-center gap-2">
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            background: "#E8F5E9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon d={icon} size={18} color={PRIMARY} />
        </div>
        <div>
          <h5
            style={{
              fontWeight: 800,
              color: TEXT_DARK,
              margin: 0,
              fontSize: 16,
            }}
          >
            {title}
          </h5>
          {subtitle && (
            <p style={{ color: TEXT_MUTED, fontSize: 12.5, margin: 0 }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {actions}
    </div>
    {children}
  </div>
);

// ── Status badge ────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => (
  <span
    style={{
      fontSize: 10,
      fontWeight: 700,
      padding: "3px 10px",
      borderRadius: 20,
      background: status === "active" ? "#E8F5E9" : "#FEE2E2",
      color: status === "active" ? PRIMARY : "#D63C3C",
    }}
  >
    {status === "active" ? "Active" : "Inactive"}
  </span>
);

const CASE_CATEGORIES = [
  "Skin Conditions",
  "Hair Disorders",
  "Respiratory Issues",
  "Children's Health",
  "Women's Health",
  "Chronic Diseases",
];

const TABS = [
  { key: "reviews", label: "Google Reviews", icon: icons.reviews },
  { key: "cases", label: "Evidence of Progress", icon: icons.cases },
  { key: "videos", label: "Video Testimonials", icon: icons.video },
];

// ════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ════════════════════════════════════════════════════════════════════════════
const AdminTestimonial = () => {
  const [activeTab, setActiveTab] = useState("reviews");
  const [toast, setToast] = useState(null);
  const showToast = useCallback(
    (message, type = "success") => setToast({ message, type }),
    [],
  );
  const clearToast = useCallback(() => setToast(null), []);

  // ── Reviews state ──
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  // ── Cases state ──
  const [cases, setCases] = useState([]);
  const [loadingCases, setLoadingCases] = useState(true);

  // ── Videos state ──
  const [videos, setVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(true);

  // ── Modal states ──
  const [reviewModal, setReviewModal] = useState(null);
  const [caseModal, setCaseModal] = useState(null);
  const [videoModal, setVideoModal] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);

  // ── Fetch Reviews ──
  const fetchReviews = useCallback(async () => {
    try {
      setLoadingReviews(true);
      // const res = await axios.get(`${Apiurl}/testimonial`);
      const res = await axios.get(`${Apiurl}/google-reviews`);
      console.log("Frontend Count :", res.data.length);
      setReviews(res.data || []);
    } catch {
      showToast("Failed to load reviews", "error");
    } finally {
      setLoadingReviews(false);
    }
  }, [showToast]);

  // ── Fetch Cases ──
  const fetchCases = useCallback(async () => {
    try {
      setLoadingCases(true);
      const res = await axios.get(`${Apiurl}/evidence-of-progress`);
      setCases(res.data || []);
    } catch {
      showToast("Failed to load case studies", "error");
    } finally {
      setLoadingCases(false);
    }
  }, [showToast]);

  // ── Fetch Videos ──
  const fetchVideos = useCallback(async () => {
    try {
      setLoadingVideos(true);
      const res = await axios.get(`${Apiurl}/video-testimonial`);
      setVideos(res.data || []);
    } catch {
      showToast("Failed to load video testimonials", "error");
    } finally {
      setLoadingVideos(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchReviews();
    fetchCases();
    fetchVideos();
  }, [fetchReviews, fetchCases, fetchVideos]);

  // ── Star picker ──
  const StarPicker = ({ value, onChange }) => (
    <div className="d-flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} onClick={() => onChange(n)} style={{ cursor: "pointer" }}>
          <Icon
            d={icons.star}
            size={20}
            color={n <= value ? "#f5a623" : "#ddd"}
            strokeWidth={1}
          />
        </span>
      ))}
    </div>
  );

  // ══════════════════════════════════════════════════════════
  // REVIEW CRUD
  // ══════════════════════════════════════════════════════════
  const openAddReview = () =>
    setReviewModal({ mode: "add", data: { name: "", stars: 5, text: "" } });

  const openEditReview = (r) =>
    setReviewModal({
      mode: "edit",
      data: {
        id: r._id,
        name: r.client_name || "",
        text: r.client_review || "",
        stars: r.rating_stars || 5,
        status: r.test_status || "active",
      },
    });

  const saveReviewModal = async () => {
    const { mode, data } = reviewModal;
    if (!data.name?.trim() || !data.text?.trim()) {
      showToast("Please fill all fields", "error");
      return;
    }
    const payload = {
      client_name: data.name,
      client_review: data.text,
      rating_stars: data.stars,
      test_status: data.status || "active",
    };
    try {
      setSaving(true);
      if (mode === "add") {
        await axios.post(`${Apiurl}/testimonial`, payload);
        showToast("Review added successfully");
      } else {
        await axios.put(`${Apiurl}/testimonial/${data.id}`, payload);
        showToast("Review updated successfully");
      }
      setReviewModal(null);
      fetchReviews();
    } catch {
      showToast("Save failed", "error");
    } finally {
      setSaving(false);
    }
  };

  // ══════════════════════════════════════════════════════════
  // CASE CRUD
  // ══════════════════════════════════════════════════════════
  const openAddCase = () =>
    setCaseModal({
      mode: "add",
      data: {
        category: CASE_CATEGORIES[0],
        before_image: "",
        after_image: "",
        condition: "",
        duration: "",
        outcome: "",
        eop_status: "active",
      },
    });

  const openEditCase = (c) =>
    setCaseModal({
      mode: "edit",
      data: {
        id: c._id,
        category: c.category,
        before_image: c.before_image || "",
        after_image: c.after_image || "",
        condition: c.condition,
        duration: c.duration,
        outcome: c.outcome || "",
        eop_status: c.eop_status || "active",
      },
    });

  const saveCaseModal = async () => {
    const { mode, data } = caseModal;
    if (!data.condition?.trim() || !data.duration?.trim()) {
      showToast("Please fill condition and duration", "error");
      return;
    }
    const formData = new FormData();
    formData.append("category", data.category);
    formData.append("condition", data.condition);
    formData.append("duration", data.duration);
    formData.append("outcome", data.outcome);
    formData.append("eop_status", data.eop_status);
    if (data.before_image instanceof File) {
      formData.append("before_image", data.before_image);
    }
    if (data.after_image instanceof File) {
      formData.append("after_image", data.after_image);
    }
    try {
      setSaving(true);
      if (mode === "add") {
        await axios.post(`${Apiurl}/evidence-of-progress`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        showToast("Case study added successfully");
      } else {
        await axios.put(`${Apiurl}/evidence-of-progress/${data.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        showToast("Case study updated successfully");
      }
      setCaseModal(null);
      fetchCases();
    } catch {
      showToast("Save failed", "error");
    } finally {
      setSaving(false);
    }
  };

  // ══════════════════════════════════════════════════════════
  // VIDEO CRUD
  // ══════════════════════════════════════════════════════════
  const openAddVideo = () =>
    setVideoModal({
      mode: "add",
      data: {
        thumbnail_image: "",
        video_file: "",
        patient_name: "",
        condition: "",
        duration: "",
        featured: false,
        vid_status: "active",
      },
    });

  const openEditVideo = (v) =>
    setVideoModal({
      mode: "edit",
      data: {
        id: v._id,
        thumbnail_image: v.thumbnail_image || "",
        video_file: v.video_file || "",
        patient_name: v.patient_name || "",
        condition: v.condition || "",
        duration: v.duration || "",
        featured: v.featured || false,
        vid_status: v.vid_status || "active",
      },
    });

  const saveVideoModal = async () => {
    const { mode, data } = videoModal;
    if (!data.patient_name?.trim() || !data.condition?.trim()) {
      showToast("Please fill name and condition", "error");
      return;
    }
    const formData = new FormData();
    formData.append("patient_name", data.patient_name);
    formData.append("condition", data.condition);
    formData.append("duration", data.duration);
    formData.append("featured", data.featured);
    formData.append("vid_status", data.vid_status);

    // Thumbnail — file மட்டும் upload பண்ணு
    if (data.thumbnail_image instanceof File) {
      formData.append("thumbnail_image", data.thumbnail_image);
    }

    // Video file — file மட்டும் upload பண்ணு
    if (data.video_file instanceof File) {
      formData.append("video_file", data.video_file);
    }

    try {
      setSaving(true);
      if (mode === "add") {
        await axios.post(`${Apiurl}/video-testimonial`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        showToast("Video testimonial added successfully");
      } else {
        await axios.put(`${Apiurl}/video-testimonial/${data.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        showToast("Video testimonial updated successfully");
      }
      setVideoModal(null);
      fetchVideos();
    } catch {
      showToast("Save failed", "error");
    } finally {
      setSaving(false);
    }
  };

  // ══════════════════════════════════════════════════════════
  // DELETE (shared)
  // ══════════════════════════════════════════════════════════
  const confirmDelete = async () => {
    const { type, id } = deleteTarget;
    try {
      if (type === "review") {
        await axios.delete(`${Apiurl}/testimonial/${id}`);
        fetchReviews();
      }
      if (type === "case") {
        await axios.delete(`${Apiurl}/evidence-of-progress/${id}`);
        fetchCases();
      }
      if (type === "video") {
        await axios.delete(`${Apiurl}/video-testimonial/${id}`);
        fetchVideos();
      }
      showToast("Deleted successfully");
    } catch {
      showToast("Delete failed", "error");
    }
    setDeleteTarget(null);
  };

  // ══════════════════════════════════════════════════════════
  // RENDER
  // ══════════════════════════════════════════════════════════
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
      <div className="mb-4">
        <h1
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: TEXT_DARK,
            margin: 0,
            letterSpacing: "-0.5px",
          }}
        >
          Testimonials
        </h1>
        <p style={{ fontSize: 14, color: TEXT_MUTED, margin: "4px 0 0" }}>
          Manage Google reviews, case studies, and video testimonials.
        </p>
      </div>

      {/* Tabs */}
      <div
        className="d-flex flex-wrap gap-2 mb-4"
        style={{
          background: "white",
          padding: 8,
          borderRadius: 14,
          border: `1px solid ${BORDER}`,
          boxShadow: SHADOW,
        }}
      >
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className="d-flex align-items-center gap-2"
            style={{
              border: "none",
              background:
                activeTab === t.key ? PRIMARY_GRADIENT : "transparent",
              color: activeTab === t.key ? "white" : TEXT_MUTED,
              fontWeight: 700,
              fontSize: 12.5,
              padding: "9px 16px",
              borderRadius: 10,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            <Icon
              d={t.icon}
              size={15}
              color={activeTab === t.key ? "white" : PRIMARY}
            />
            {t.label}
          </button>
        ))}
      </div>

      {/* ═══════════ GOOGLE REVIEWS TAB ═══════════ */}
      {activeTab === "reviews" && (
        <SectionCard
          title="Patient Reviews"
          icon={icons.reviews}
          subtitle={`${reviews.length} reviews — shown 3 at a time on the website`}
          actions={
            <DashboardButton
              variant="primary"
              onClick={openAddReview}
              style={{ background: PRIMARY_GRADIENT }}
            >
              <Icon d={icons.plus} size={13} color="white" /> Add Review
            </DashboardButton>
          }
        >
          {loadingReviews ? (
            <p style={{ color: TEXT_MUTED, fontSize: 13.5 }}>
              Loading reviews...
            </p>
          ) : reviews.length === 0 ? (
            <p style={{ color: TEXT_MUTED, fontSize: 13.5 }}>
              No reviews yet. Add your first one.
            </p>
          ) : (
            <div className="row g-3">
              {/* {reviews.map((r) => (
                <div className="col-lg-4 col-md-6" key={r._id}>
                  <div
                    style={{
                      border: `1px solid ${BORDER}`,
                      borderRadius: 14,
                      padding: 16,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <div className="d-flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Icon
                            key={i}
                            d={icons.star}
                            size={13}
                            color={i < r.rating_stars ? "#f5a623" : "#ddd"}
                            strokeWidth={1}
                          />
                        ))}
                      </div>
                      <StatusBadge status={r.test_status} />
                    </div>
                    <p
                      style={{
                        fontSize: 13,
                        color: TEXT_MUTED,
                        flex: 1,
                        fontStyle: "italic",
                      }}
                    >
                      "{r.client_review}"
                    </p>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <strong style={{ fontSize: 13, color: TEXT_DARK }}>
                        {r.client_name}
                      </strong>
                      <div className="d-flex gap-1">
                        <DashboardButton
                          variant="outline"
                          small
                          onClick={() => openEditReview(r)}
                        >
                          <Icon d={icons.edit} size={11} />
                        </DashboardButton>
                        <DashboardButton
                          variant="danger"
                          small
                          onClick={() =>
                            setDeleteTarget({
                              type: "review",
                              id: r._id,
                              label: r.client_name,
                            })
                          }
                        >
                          <Icon d={icons.trash} size={11} />
                        </DashboardButton>
                      </div>
                    </div>
                  </div>
                </div>
              ))} */}

              {reviews.map((r) => (
                <div className="col-lg-4 col-md-6 mb-4" key={r._id}>
                  <div
                    style={{
                      border: `1px solid ${BORDER}`,
                      borderRadius: 14,
                      padding: 16,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {/* Rating + Time */}
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <div className="d-flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Icon
                            key={i}
                            d={icons.star}
                            size={13}
                            color={i < r.rating ? "#f5a623" : "#ddd"}
                            strokeWidth={1}
                          />
                        ))}
                      </div>

                      <small style={{ color: TEXT_MUTED, fontSize: 12 }}>
                        {r.relative_time_description}
                      </small>
                    </div>

                    {/* Review */}
                    <p
                      style={{
                        fontSize: 13,
                        color: TEXT_MUTED,
                        flex: 1,
                        fontStyle: "italic",
                        lineHeight: 1.6,
                      }}
                    >
                      "{r.text}"
                    </p>

                    {/* User */}
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <div className="d-flex align-items-center">
                        <img
                          src={r.profile_photo_url}
                          alt={r.author_name}
                          style={{
                            width: 45,
                            height: 45,
                            borderRadius: "50%",
                            objectFit: "cover",
                            marginRight: 10,
                          }}
                        />

                        <div>
                          <strong
                            style={{
                              fontSize: 14,
                              color: TEXT_DARK,
                              display: "block",
                            }}
                          >
                            {r.author_name}
                          </strong>

                          <a
                            href={r.author_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              fontSize: 12,
                              color: "#0d6efd",
                              textDecoration: "none",
                            }}
                          >
                            Google Profile
                          </a>
                        </div>
                      </div>

                      <div className="d-flex gap-1">
                        <DashboardButton
                          variant="outline"
                          small
                          onClick={() => openEditReview(r)}
                        >
                          <Icon d={icons.edit} size={11} />
                        </DashboardButton>

                        <DashboardButton
                          variant="danger"
                          small
                          onClick={() =>
                            setDeleteTarget({
                              type: "review",
                              id: r._id,
                              label: r.author_name,
                            })
                          }
                        >
                          <Icon d={icons.trash} size={11} />
                        </DashboardButton>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </SectionCard>
      )}

      {/* ═══════════ EVIDENCE OF PROGRESS TAB ═══════════ */}
      {activeTab === "cases" && (
        <SectionCard
          title="Evidence of Progress (Case Studies)"
          icon={icons.cases}
          subtitle={`${cases.length} case studies — Before/After slider shown on website`}
          actions={
            <DashboardButton
              variant="primary"
              onClick={openAddCase}
              style={{ background: PRIMARY_GRADIENT }}
            >
              <Icon d={icons.plus} size={13} color="white" /> Add Case Study
            </DashboardButton>
          }
        >
          {loadingCases ? (
            <p style={{ color: TEXT_MUTED, fontSize: 13.5 }}>
              Loading case studies...
            </p>
          ) : cases.length === 0 ? (
            <p style={{ color: TEXT_MUTED, fontSize: 13.5 }}>
              No case studies yet. Add your first one.
            </p>
          ) : (
            <div className="row g-3">
              {cases.map((c) => (
                <div className="col-lg-3 col-md-6" key={c._id}>
                  <div
                    style={{
                      border: `1px solid ${BORDER}`,
                      borderRadius: 14,
                      overflow: "hidden",
                    }}
                  >
                    {/* Before / After preview */}
                    <div className="d-flex">
                      <div
                        style={{
                          width: "50%",
                          height: 110,
                          background: "#eef",
                          position: "relative",
                        }}
                      >
                        {c.before_image ? (
                          <img
                            src={`${Apiurl.replace("/api", "")}${c.before_image}`}
                            alt="before"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <div className="d-flex align-items-center justify-content-center h-100">
                            <Icon
                              d={icons.image}
                              size={18}
                              color={TEXT_MUTED}
                            />
                          </div>
                        )}
                        <span
                          style={{
                            position: "absolute",
                            bottom: 4,
                            left: 4,
                            fontSize: 9,
                            fontWeight: 700,
                            background: "rgba(15,61,110,0.75)",
                            color: "#fff",
                            padding: "2px 7px",
                            borderRadius: 4,
                          }}
                        >
                          BEFORE
                        </span>
                      </div>
                      <div
                        style={{
                          width: "50%",
                          height: 110,
                          background: "#efe",
                          position: "relative",
                        }}
                      >
                        {c.after_image ? (
                          <img
                            src={`${Apiurl.replace("/api", "")}${c.after_image}`}
                            alt="after"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <div className="d-flex align-items-center justify-content-center h-100">
                            <Icon
                              d={icons.image}
                              size={18}
                              color={TEXT_MUTED}
                            />
                          </div>
                        )}
                        <span
                          style={{
                            position: "absolute",
                            bottom: 4,
                            right: 4,
                            fontSize: 9,
                            fontWeight: 700,
                            background: "rgba(75,168,106,0.8)",
                            color: "#fff",
                            padding: "2px 7px",
                            borderRadius: 4,
                          }}
                        >
                          AFTER
                        </span>
                      </div>
                    </div>

                    <div className="p-3">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            color: PRIMARY,
                            background: "#E8F5E9",
                            padding: "3px 10px",
                            borderRadius: 20,
                          }}
                        >
                          {c.category}
                        </span>
                        <StatusBadge status={c.eop_status} />
                      </div>
                      <div
                        style={{
                          fontSize: 13.5,
                          fontWeight: 700,
                          color: TEXT_DARK,
                          marginTop: 4,
                        }}
                      >
                        {c.condition}
                      </div>
                      <div style={{ fontSize: 12, color: TEXT_MUTED }}>
                        {c.duration}
                      </div>
                      <p
                        style={{
                          fontSize: 11.5,
                          color: TEXT_MUTED,
                          marginTop: 6,
                          marginBottom: 10,
                        }}
                      >
                        {c.outcome}
                      </p>
                      <div className="d-flex gap-2">
                        <DashboardButton
                          variant="outline"
                          small
                          onClick={() => openEditCase(c)}
                        >
                          <Icon d={icons.edit} size={11} /> Edit
                        </DashboardButton>
                        <DashboardButton
                          variant="danger"
                          small
                          onClick={() =>
                            setDeleteTarget({
                              type: "case",
                              id: c._id,
                              label: c.condition,
                            })
                          }
                        >
                          <Icon d={icons.trash} size={11} /> Delete
                        </DashboardButton>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </SectionCard>
      )}

      {/* ═══════════ VIDEO TESTIMONIALS TAB ═══════════ */}
      {activeTab === "videos" && (
        <SectionCard
          title="Video Testimonials"
          icon={icons.video}
          subtitle={`${videos.length} videos — patient thumbnails shown on website`}
          actions={
            <DashboardButton
              variant="primary"
              onClick={openAddVideo}
              style={{ background: PRIMARY_GRADIENT }}
            >
              <Icon d={icons.plus} size={13} color="white" /> Add Video
            </DashboardButton>
          }
        >
          {loadingVideos ? (
            <p style={{ color: TEXT_MUTED, fontSize: 13.5 }}>
              Loading videos...
            </p>
          ) : videos.length === 0 ? (
            <p style={{ color: TEXT_MUTED, fontSize: 13.5 }}>
              No video testimonials yet. Add your first one.
            </p>
          ) : (
            <div className="row g-3">
              {videos.map((v) => (
                <div className="col-lg-2 col-md-4 col-6" key={v._id}>
                  <div
                    style={{
                      border: `1px solid ${BORDER}`,
                      borderRadius: 14,
                      overflow: "hidden",
                    }}
                  >
                    {/* Thumbnail */}
                    <div
                      style={{
                        height: 100,
                        background: "#eee",
                        position: "relative",
                      }}
                    >
                      {v.thumbnail_image ? (
                        <img
                          src={`${Apiurl.replace("/api", "")}${v.thumbnail_image}`}
                          alt={v.patient_name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <div className="d-flex align-items-center justify-content-center h-100">
                          <Icon d={icons.image} size={18} color={TEXT_MUTED} />
                        </div>
                      )}

                      {/* Video file indicator */}
                      {v.video_file && (
                        <div
                          style={{
                            position: "absolute",
                            bottom: 6,
                            right: 6,
                            width: 24,
                            height: 24,
                            borderRadius: "50%",
                            background: "rgba(46,139,87,0.9)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          title="Video file uploaded"
                        >
                          {/* Play triangle */}
                          <svg
                            width="8"
                            height="10"
                            viewBox="0 0 8 10"
                            fill="none"
                          >
                            <path d="M1 1L7 5L1 9V1Z" fill="white" />
                          </svg>
                        </div>
                      )}

                      {v.featured && (
                        <span
                          style={{
                            position: "absolute",
                            top: 6,
                            left: 6,
                            background: PRIMARY,
                            color: "white",
                            fontSize: 9,
                            fontWeight: 700,
                            padding: "2px 7px",
                            borderRadius: 6,
                          }}
                        >
                          Featured
                        </span>
                      )}
                    </div>

                    <div className="p-2">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div
                          style={{
                            fontSize: 12.5,
                            fontWeight: 700,
                            color: TEXT_DARK,
                          }}
                        >
                          {v.patient_name}
                        </div>
                        <StatusBadge status={v.vid_status} />
                      </div>
                      <div style={{ fontSize: 10.5, color: TEXT_MUTED }}>
                        {v.condition}
                      </div>
                      <div
                        style={{
                          fontSize: 10,
                          color: TEXT_MUTED,
                          marginBottom: 6,
                        }}
                      >
                        {v.duration}
                      </div>
                      {/* Video file status text */}
                      <div
                        style={{
                          fontSize: 10,
                          color: v.video_file ? PRIMARY : "#f59e0b",
                          fontWeight: 600,
                          marginBottom: 6,
                        }}
                      >
                        {v.video_file ? "✓ Video ready" : "⚠ No video file"}
                      </div>
                      <div className="d-flex gap-1">
                        <DashboardButton
                          variant="outline"
                          small
                          onClick={() => openEditVideo(v)}
                        >
                          <Icon d={icons.edit} size={10} />
                        </DashboardButton>
                        <DashboardButton
                          variant="danger"
                          small
                          onClick={() =>
                            setDeleteTarget({
                              type: "video",
                              id: v._id,
                              label: v.patient_name,
                            })
                          }
                        >
                          <Icon d={icons.trash} size={10} />
                        </DashboardButton>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </SectionCard>
      )}

      {/* ═══════════ REVIEW MODAL ═══════════ */}
      {reviewModal && (
        <Modal
          title={reviewModal.mode === "add" ? "Add Review" : "Edit Review"}
          onClose={() => setReviewModal(null)}
        >
          <Field label="Patient Name">
            <TextInput
              value={reviewModal.data.name}
              onChange={(e) =>
                setReviewModal({
                  ...reviewModal,
                  data: { ...reviewModal.data, name: e.target.value },
                })
              }
            />
          </Field>
          <Field label="Rating">
            <StarPicker
              value={reviewModal.data.stars}
              onChange={(n) =>
                setReviewModal({
                  ...reviewModal,
                  data: { ...reviewModal.data, stars: n },
                })
              }
            />
          </Field>
          <Field label="Review Text">
            <TextArea
              rows={4}
              value={reviewModal.data.text}
              onChange={(e) =>
                setReviewModal({
                  ...reviewModal,
                  data: { ...reviewModal.data, text: e.target.value },
                })
              }
            />
          </Field>
          {reviewModal.mode === "edit" && (
            <Field label="Status">
              <select
                value={reviewModal.data.status}
                onChange={(e) =>
                  setReviewModal({
                    ...reviewModal,
                    data: { ...reviewModal.data, status: e.target.value },
                  })
                }
                style={inputStyle}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </Field>
          )}
          <ModalActions
            onCancel={() => setReviewModal(null)}
            onSave={saveReviewModal}
            saving={saving}
          />
        </Modal>
      )}

      {/* ═══════════ CASE MODAL ═══════════ */}
      {caseModal && (
        <Modal
          title={
            caseModal.mode === "add" ? "Add Case Study" : "Edit Case Study"
          }
          onClose={() => setCaseModal(null)}
        >
          <Field label="Category">
            <select
              value={caseModal.data.category}
              onChange={(e) =>
                setCaseModal({
                  ...caseModal,
                  data: { ...caseModal.data, category: e.target.value },
                })
              }
              style={inputStyle}
            >
              {CASE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </Field>
          <div className="row g-2 mb-1">
            <div className="col-6">
              <ImageUploadBox
                label="Before Image"
                value={caseModal.data.before_image}
                onChange={(file) =>
                  setCaseModal({
                    ...caseModal,
                    data: { ...caseModal.data, before_image: file },
                  })
                }
                height={110}
              />
            </div>
            <div className="col-6">
              <ImageUploadBox
                label="After Image"
                value={caseModal.data.after_image}
                onChange={(file) =>
                  setCaseModal({
                    ...caseModal,
                    data: { ...caseModal.data, after_image: file },
                  })
                }
                height={110}
              />
            </div>
          </div>
          <Field label="Condition">
            <TextInput
              value={caseModal.data.condition}
              onChange={(e) =>
                setCaseModal({
                  ...caseModal,
                  data: { ...caseModal.data, condition: e.target.value },
                })
              }
            />
          </Field>
          <Field label="Treatment Duration">
            <TextInput
              value={caseModal.data.duration}
              onChange={(e) =>
                setCaseModal({
                  ...caseModal,
                  data: { ...caseModal.data, duration: e.target.value },
                })
              }
              placeholder="e.g. 6 Months"
            />
          </Field>
          <Field label="Outcome">
            <TextArea
              rows={3}
              value={caseModal.data.outcome}
              onChange={(e) =>
                setCaseModal({
                  ...caseModal,
                  data: { ...caseModal.data, outcome: e.target.value },
                })
              }
            />
          </Field>
          <Field label="Status">
            <select
              value={caseModal.data.eop_status}
              onChange={(e) =>
                setCaseModal({
                  ...caseModal,
                  data: { ...caseModal.data, eop_status: e.target.value },
                })
              }
              style={inputStyle}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </Field>
          <ModalActions
            onCancel={() => setCaseModal(null)}
            onSave={saveCaseModal}
            saving={saving}
          />
        </Modal>
      )}

      {/* ═══════════ VIDEO MODAL ═══════════ */}
      {videoModal && (
        <Modal
          title={
            videoModal.mode === "add"
              ? "Add Video Testimonial"
              : "Edit Video Testimonial"
          }
          onClose={() => setVideoModal(null)}
        >
          {/* Thumbnail */}
          <ImageUploadBox
            label="Thumbnail Image"
            value={videoModal.data.thumbnail_image}
            onChange={(file) =>
              setVideoModal({
                ...videoModal,
                data: { ...videoModal.data, thumbnail_image: file },
              })
            }
            height={140}
          />

          {/* Video file upload — NEW */}
          <VideoUploadBox
            label="Video File (MP4 / MOV / AVI)"
            value={videoModal.data.video_file}
            onChange={(file) =>
              setVideoModal({
                ...videoModal,
                data: { ...videoModal.data, video_file: file },
              })
            }
          />

          <Field label="Patient Name">
            <TextInput
              value={videoModal.data.patient_name}
              onChange={(e) =>
                setVideoModal({
                  ...videoModal,
                  data: {
                    ...videoModal.data,
                    patient_name: e.target.value,
                  },
                })
              }
            />
          </Field>
          <Field label="Condition">
            <TextInput
              value={videoModal.data.condition}
              onChange={(e) =>
                setVideoModal({
                  ...videoModal,
                  data: { ...videoModal.data, condition: e.target.value },
                })
              }
            />
          </Field>
          <Field label="Treatment Duration">
            <TextInput
              value={videoModal.data.duration}
              onChange={(e) =>
                setVideoModal({
                  ...videoModal,
                  data: { ...videoModal.data, duration: e.target.value },
                })
              }
              placeholder="e.g. 7 Months"
            />
          </Field>
          <div className="d-flex align-items-center gap-2 mb-3">
            <input
              type="checkbox"
              id="featuredCheck"
              checked={videoModal.data.featured}
              onChange={(e) =>
                setVideoModal({
                  ...videoModal,
                  data: { ...videoModal.data, featured: e.target.checked },
                })
              }
            />
            <label
              htmlFor="featuredCheck"
              style={{ fontSize: 13, color: TEXT_DARK, fontWeight: 600 }}
            >
              Mark as Featured Story
            </label>
          </div>
          <Field label="Status">
            <select
              value={videoModal.data.vid_status}
              onChange={(e) =>
                setVideoModal({
                  ...videoModal,
                  data: { ...videoModal.data, vid_status: e.target.value },
                })
              }
              style={inputStyle}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </Field>
          <ModalActions
            onCancel={() => setVideoModal(null)}
            onSave={saveVideoModal}
            saving={saving}
          />
        </Modal>
      )}

      {/* ═══════════ DELETE CONFIRM ═══════════ */}
      {deleteTarget && (
        <div
          className="modal d-block"
          style={{
            backgroundColor: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(8px)",
            zIndex: 9999,
          }}
          onClick={() => setDeleteTarget(null)}
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
                <strong>{deleteTarget.label}</strong>"?
                <br />
                This action{" "}
                <strong style={{ color: "#D63C3C" }}>cannot be undone</strong>.
              </p>
              <div className="d-flex justify-content-center gap-2">
                <DashboardButton
                  variant="outline"
                  onClick={() => setDeleteTarget(null)}
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

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={clearToast} />
      )}
    </div>
  );
};

// ── Modal wrapper ───────────────────────────────────────────────────────────
const Modal = ({ title, children, onClose }) => (
  <div
    className="modal d-block"
    style={{
      backgroundColor: "rgba(0,0,0,0.4)",
      backdropFilter: "blur(8px)",
      zIndex: 9999,
    }}
    onClick={onClose}
  >
    <div
      className="modal-dialog modal-dialog-centered"
      style={{ maxWidth: 480 }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="modal-content border-0 shadow"
        style={{
          borderRadius: 22,
          background: "white",
          padding: "24px 26px",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5
            style={{
              fontWeight: 800,
              color: TEXT_DARK,
              margin: 0,
              fontSize: 17,
            }}
          >
            {title}
          </h5>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: TEXT_MUTED,
            }}
          >
            <Icon d={icons.close} size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  </div>
);

const ModalActions = ({ onCancel, onSave, saving }) => (
  <div className="d-flex justify-content-end gap-2 mt-3">
    <DashboardButton variant="outline" onClick={onCancel} disabled={saving}>
      Cancel
    </DashboardButton>
    <DashboardButton
      variant="primary"
      onClick={onSave}
      disabled={saving}
      style={{ background: PRIMARY_GRADIENT }}
    >
      <Icon d={icons.check} size={13} color="white" />{" "}
      {saving ? "Saving..." : "Save"}
    </DashboardButton>
  </div>
);

export default AdminTestimonial;
