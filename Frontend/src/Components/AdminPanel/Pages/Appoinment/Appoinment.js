// // Appointment Page – Fully Integrated with Backend API (Backend Schema Match)
// import React, { useState, useEffect, useCallback } from "react";
// import API_BASE_URL from '../../Environmnet/Apiurl'

// // ── Icons ──────────────────────────────────────────────────────────────
// const Icon = ({ d, size = 18, color = "currentColor" }) => (
//   <svg
//     width={size}
//     height={size}
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke={color}
//     strokeWidth="1.8"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d={d} />
//   </svg>
// );

// const icons = {
//   calendar:
//     "M8 7V3M16 7V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
//   clock: "M12 6v6l4 2 M22 12A10 10 0 1 1 12 2a10 10 0 0 1 10 10z",
//   user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
//   mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
//   phone:
//     "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z",
//   search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z M21 21l-4.35-4.35",
//   plus: "M12 5v14M5 12h14",
//   edit: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7 M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
//   trash:
//     "M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14M10 11v6M14 11v6",
//   refresh:
//     "M21 2v6h-6M3 22v-6h6M3.5 12A8.5 8.5 0 0 1 20.5 8M3.5 12a8.5 8.5 0 0 0 17 4",
//   close: "M18 6L6 18M6 6l12 12",
//   check: "M5 13l4 4L19 7",
//   eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
//   chevronLeft: "M15 18l-6-6 6-6",
//   chevronRight: "M9 18l6-6-6-6",
// };

// // ── Colors ──────────────────────────────────────────────────────────────
// const GREEN = "#2E8B57";
// const GREEN_HOVER = "#247346";
// const BORDER = "#D1EDE6";
// const TEXT_DARK = "#1E2F2B";
// const TEXT_MUTED = "#5E7B6E";
// const BG = "#F4FCF8";
// const CARD_BG = "#FFFFFF";

// // ── Dashboard Button ──────────────────────────────────────────────────
// const DashboardButton = ({
//   variant = "outline",
//   children,
//   onClick,
//   disabled,
//   style,
//   small = false,
// }) => {
//   const [hover, setHover] = useState(false);

//   const base = {
//     display: "inline-flex",
//     alignItems: "center",
//     gap: small ? 4 : 6,
//     fontWeight: 600,
//     fontSize: small ? 11 : 12,
//     padding: small ? "5px 12px" : "7px 18px",
//     borderRadius: 30,
//     cursor: disabled ? "default" : "pointer",
//     border:
//       variant === "primary" ? "none" : `1.5px solid ${hover ? GREEN : BORDER}`,
//     background:
//       variant === "primary"
//         ? hover && !disabled
//           ? GREEN_HOVER
//           : GREEN
//         : "white",
//     color: variant === "primary" ? "white" : GREEN,
//     transition: "all 0.2s",
//     fontFamily: "'Inter', 'Segoe UI', sans-serif",
//     opacity: disabled ? 0.5 : 1,
//     ...(style || {}),
//   };

//   return (
//     <button
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

// // ── Toast ──────────────────────────────────────────────────────────────
// const Toast = ({ message, type, onClose }) => {
//   useEffect(() => {
//     const timer = setTimeout(() => onClose(), 3000);
//     return () => clearTimeout(timer);
//   }, [onClose]);

//   const bgClass =
//     type === "success"
//       ? "bg-success"
//       : type === "error"
//       ? "bg-danger"
//       : "bg-primary";
//   const iconPath =
//     type === "success"
//       ? icons.check
//       : type === "error"
//       ? icons.close
//       : icons.check;

//   return (
//     <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 2000 }}>
//       <div
//         className={`toast fade show d-flex align-items-center ${bgClass} text-white border-0`}
//         role="alert"
//       >
//         <div className="toast-body d-flex align-items-center gap-2">
//           <Icon d={iconPath} size={16} color="white" />
//           <span className="fw-semibold">{message}</span>
//           <button
//             type="button"
//             className="btn-close btn-close-white ms-auto"
//             onClick={onClose}
//           ></button>
//         </div>
//       </div>
//     </div>
//   );
// };



// // ── Main Component ────────────────────────────────────────────────────
// const Appointment = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [viewingAppt, setViewingAppt] = useState(null);
//   const [editingAppt, setEditingAppt] = useState(null);
//   const [deletingAppt, setDeletingAppt] = useState(null);
//   const [refreshing, setRefreshing] = useState(false);
//   const [rowsPerPage, setRowsPerPage] = useState(4);
//   const [formData, setFormData] = useState({ status: "" });
  
//   // 👇 Backend fields-க்கு ஏற்ப மாற்றப்பட்டது
//   const [addFormData, setAddFormData] = useState({
//     patient_name: "",
//     patient_mobile: "",
//     reason_for_comming: "",
//     patient_email: "",
//     appointment_date: "",
//     time_schedule: "",
//   });

//   const [toast, setToast] = useState(null);
//   const showToast = useCallback(
//     (message, type = "success") => setToast({ message, type }),
//     []
//   );
//   const clearToast = useCallback(() => setToast(null), []);

//   // ── Fetch ──────────────────────────────────────────────────────────
//   const fetchAppointments = useCallback(async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${API_BASE_URL}/appointment`);
//       if (!response.ok) throw new Error("Failed to fetch appointments");
//       const data = await response.json();
//       const mapped = data.map((item) => ({
//         id: item._id,
//         patient_name: item.patient_name,
//         patient_mobile: item.patient_mobile,
//         reason_for_comming: item.reason_for_comming,
//         patient_email: item.patient_email,
//         appointment_date: item.appointment_date,
//         time_schedule: item.time_schedule,
//         status: item.status || "Scheduled",
//         appoinmnet_id: item.appoinmnet_id,
//       }));
//       setAppointments(mapped);
//     } catch (error) {
//       showToast(error.message, "error");
//     } finally {
//       setLoading(false);
//     }
//   }, [showToast]);

//   useEffect(() => {
//     fetchAppointments();
//   }, [fetchAppointments]);

//   const handleRefresh = () => {
//     if (refreshing) return;
//     setRefreshing(true);
//     fetchAppointments().finally(() => setRefreshing(false));
//   };

//   // ── Pagination ─────────────────────────────────────────────────────
//   const [currentPage, setCurrentPage] = useState(1);
//   const filteredAppointments = appointments.filter(
//     (a) =>
//       a.patient_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       a.patient_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       a.reason_for_comming?.toLowerCase().includes(searchTerm.toLowerCase())
//   );
//   const totalPages = Math.ceil(filteredAppointments.length / rowsPerPage);
//   const startIndex = (currentPage - 1) * rowsPerPage;
//   const paginatedAppointments = filteredAppointments.slice(
//     startIndex,
//     startIndex + rowsPerPage
//   );
//   const goToPage = (page) =>
//     setCurrentPage(Math.max(1, Math.min(page, totalPages)));

//   // ── Modal Handlers ──────────────────────────────────────────────
//   const handleView = (appt) => {
//     setViewingAppt(appt);
//     setShowViewModal(true);
//   };

//   const openEditModal = (appt) => {
//     setEditingAppt(appt);
//     setFormData({ status: appt.status });
//     setShowEditModal(true);
//   };

//   const handleUpdate = async () => {
//     if (!editingAppt) return;
//     try {
//       const response = await fetch(
//         `${API_BASE_URL}/appointment/${editingAppt.id}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ status: formData.status }),
//         }
//       );
//       if (!response.ok) throw new Error("Update failed");
//       const updated = await response.json();
//       setAppointments((prev) =>
//         prev.map((a) =>
//           a.id === editingAppt.id
//             ? { ...a, status: updated.status || formData.status }
//             : a
//         )
//       );
//       showToast("Appointment updated successfully", "success");
//       setShowEditModal(false);
//       setEditingAppt(null);
//     } catch (error) {
//       showToast(error.message, "error");
//     }
//   };

//   // ── ADD – Backend fields-க்கு ஏற்ப ──────────────────────────────
//   const handleAddAppointment = async () => {
//     if (
//       !addFormData.patient_name ||
//       !addFormData.patient_mobile ||
//       !addFormData.reason_for_comming ||
//       !addFormData.patient_email ||
//       !addFormData.appointment_date ||
//       !addFormData.time_schedule
//     ) {
//       showToast("Please fill all required fields", "error");
//       return;
//     }
//     try {
//       const payload = {
//         patient_name: addFormData.patient_name,
//         patient_mobile: addFormData.patient_mobile,
//         reason_for_comming: addFormData.reason_for_comming,
//         patient_email: addFormData.patient_email,
//         appointment_date: addFormData.appointment_date,
//         time_schedule: addFormData.time_schedule,
//         status: "Scheduled", // default
//       };
//       const response = await fetch(`${API_BASE_URL}/appointment`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       if (!response.ok) throw new Error("Add failed");
//       const newAppt = await response.json();
//       const mapped = {
//         id: newAppt._id,
//         patient_name: newAppt.patient_name,
//         patient_mobile: newAppt.patient_mobile,
//         reason_for_comming: newAppt.reason_for_comming,
//         patient_email: newAppt.patient_email,
//         appointment_date: newAppt.appointment_date,
//         time_schedule: newAppt.time_schedule,
//         status: newAppt.status || "Scheduled",
//         appoinmnet_id: newAppt.appoinmnet_id,
//       };
//       setAppointments((prev) => [mapped, ...prev]);
//       showToast("Appointment added successfully", "success");
//       setShowAddModal(false);
//       setAddFormData({
//         patient_name: "",
//         patient_mobile: "",
//         reason_for_comming: "",
//         patient_email: "",
//         appointment_date: "",
//         time_schedule: "",
//       });
//     } catch (error) {
//       showToast(error.message, "error");
//     }
//   };

//   const openDeleteModal = (appt) => {
//     setDeletingAppt(appt);
//     setShowDeleteModal(true);
//   };

//   const confirmDelete = async () => {
//     if (!deletingAppt) return;
//     try {
//       const response = await fetch(
//         `${API_BASE_URL}/appointment/${deletingAppt.id}`,
//         { method: "DELETE" }
//       );
//       if (!response.ok) throw new Error("Delete failed");
//       setAppointments((prev) => prev.filter((a) => a.id !== deletingAppt.id));
//       showToast("Appointment deleted successfully", "success");
//       setShowDeleteModal(false);
//       setDeletingAppt(null);
//     } catch (error) {
//       showToast(error.message, "error");
//     }
//   };

//   // ── Stats ──────────────────────────────────────────────────────────
//   const stats = {
//     total: appointments.length,
//     scheduled: appointments.filter((a) => a.status === "Scheduled").length,
//     completed: appointments.filter((a) => a.status === "Completed").length,
//     cancelled: appointments.filter((a) => a.status === "Cancelled").length,
//   };
//   const statCards = [
//     {
//       label: "Total Appointments",
//       value: stats.total,
//       icon: icons.calendar,
//       color: "#4CAF50",
//       bg: "#E8F5E9",
//       trend: "all visits",
//     },
//     {
//       label: "Scheduled",
//       value: stats.scheduled,
//       icon: icons.clock,
//       color: "#2196F3",
//       bg: "#E3F2FD",
//       trend: "upcoming",
//     },
//     {
//       label: "Completed",
//       value: stats.completed,
//       icon: icons.check,
//       color: GREEN,
//       bg: "#D4F3E8",
//       trend: "done",
//     },
//     {
//       label: "Cancelled",
//       value: stats.cancelled,
//       icon: icons.close,
//       color: "#FF9800",
//       bg: "#FFF3E0",
//       trend: "rejected",
//     },
//   ];

//   const card = {
//     background: CARD_BG,
//     borderRadius: 18,
//     border: `1px solid ${BORDER}`,
//     boxShadow: "0 2px 12px rgba(46,139,87,0.06)",
//     padding: "18px 20px",
//   };

//   // ── Render ──────────────────────────────────────────────────────────
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
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <div>
//           <h1
//             style={{
//               fontSize: 24,
//               fontWeight: 800,
//               color: TEXT_DARK,
//               margin: 0,
//               lineHeight: 1.2,
//             }}
//           >
//             Appoinmnet
//           </h1>
//           <p
//             style={{
//               fontSize: 13,
//               color: TEXT_MUTED,
//               margin: "2px 0 0",
//               fontWeight: 400,
//             }}
//           >
//             Manage patient appointments
//           </p>
//         </div>
//         <div className="d-flex gap-2 align-items-center">
//           <DashboardButton
//             variant="outline"
//             onClick={handleRefresh}
//             disabled={refreshing}
//           >
//             {refreshing ? (
//               <span className="spinner-border spinner-border-sm" role="status" />
//             ) : (
//               <Icon d={icons.refresh} size={14} />
//             )}
//             {refreshing ? "Refreshing..." : "Refresh"}
//           </DashboardButton>
//           <DashboardButton
//             variant="primary"
//             onClick={() => setShowAddModal(true)}
//           >
//             <Icon d={icons.plus} size={14} color="white" /> Add Appointment
//           </DashboardButton>
//         </div>
//       </div>

//       {/* Stat Cards */}
//       <div className="row g-3 mb-4">
//         {statCards.map((s, i) => (
//           <div key={i} className="col-lg-3 col-md-6">
//             <div
//               style={{
//                 ...card,
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 14,
//               }}
//             >
//               <div
//                 style={{
//                   width: 44,
//                   height: 44,
//                   borderRadius: 12,
//                   background: s.bg,
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   flexShrink: 0,
//                 }}
//               >
//                 <Icon d={s.icon} size={20} color={s.color} />
//               </div>
//               <div>
//                 <div
//                   style={{ fontSize: 12, color: TEXT_MUTED, fontWeight: 600 }}
//                 >
//                   {s.label}
//                 </div>
//                 <div
//                   style={{
//                     fontSize: 26,
//                     fontWeight: 800,
//                     color: TEXT_DARK,
//                     lineHeight: 1.2,
//                   }}
//                 >
//                   {s.value}
//                 </div>
//                 <div style={{ fontSize: 11, color: s.color, fontWeight: 500 }}>
//                   {s.trend}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Search + Show */}
//       <div className="d-flex align-items-center gap-3 mb-4">
//         <div
//           style={{
//             flex: 1,
//             ...card,
//             display: "flex",
//             alignItems: "center",
//             gap: 10,
//             padding: "10px 18px",
//           }}
//         >
//           <Icon d={icons.search} size={16} color={TEXT_MUTED} />
//           <input
//             type="text"
//             placeholder="Search by patient name, email, reason..."
//             value={searchTerm}
//             onChange={(e) => {
//               setSearchTerm(e.target.value);
//               setCurrentPage(1);
//             }}
//             className="form-control border-0 shadow-none"
//             style={{ fontSize: 13, color: TEXT_DARK }}
//           />
//         </div>
//         <div
//           className="d-flex align-items-center gap-2 text-muted"
//           style={{
//             background: "white",
//             padding: "8px 14px",
//             borderRadius: 10,
//             border: `1.5px solid ${BORDER}`,
//             fontSize: 13,
//           }}
//         >
//           <span>Show</span>
//           <select
//             value={rowsPerPage}
//             onChange={(e) => {
//               setRowsPerPage(Number(e.target.value));
//               setCurrentPage(1);
//             }}
//             className="form-select form-select-sm border-0 shadow-none"
//             style={{ fontSize: 13, fontWeight: 600 }}
//           >
//             <option value={2}>2</option>
//             <option value={4}>4</option>
//             <option value={6}>6</option>
//             <option value={10}>10</option>
//           </select>
//           <span>entries</span>
//         </div>
//       </div>

//       {/* Cards */}
//       {loading ? (
//         <div className="text-center py-5">
//           <div className="spinner-border text-success" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//         </div>
//       ) : (
//         <div className="d-flex flex-column gap-3">
//           {paginatedAppointments.map((appt) => (
//             <div
//               key={appt.id}
//               style={{
//                 ...card,
//                 padding: "16px 20px",
//                 display: "flex",
//                 alignItems: "center",
//                 flexWrap: "wrap",
//                 gap: 20,
//               }}
//               onMouseEnter={(e) =>
//                 (e.currentTarget.style.borderColor = "#cbd5e1")
//               }
//               onMouseLeave={(e) =>
//                 (e.currentTarget.style.borderColor = BORDER)
//               }
//             >
//               <div
//                 className="d-flex align-items-start gap-3 flex-grow-1"
//                 style={{ minWidth: 200 }}
//               >
//                 <div
//                   style={{
//                     width: 36,
//                     height: 36,
//                     borderRadius: 10,
//                     background: `linear-gradient(135deg, #2E8B57, #A8E6CF)`,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     color: "white",
//                     fontWeight: 700,
//                     fontSize: 14,
//                   }}
//                 >
//                   {appt.patient_name?.charAt(0) || "P"}
//                 </div>
//                 <div>
//                   <div
//                     style={{ fontWeight: 700, color: TEXT_DARK, fontSize: 14 }}
//                   >
//                     {appt.patient_name}
//                   </div>
//                   <div style={{ fontSize: 12, color: TEXT_MUTED }}>
//                     📧 {appt.patient_email} · 📱 {appt.patient_mobile}
//                   </div>
//                   <div
//                     className="d-flex align-items-start gap-2 mt-1"
//                     style={{ fontSize: 13, color: "#475569" }}
//                   >
//                     <span>📝 {appt.reason_for_comming}</span>
//                   </div>
//                   <div
//                     className="d-flex align-items-center gap-2 mt-1"
//                     style={{ fontSize: 12, color: TEXT_MUTED }}
//                   >
//                     <Icon d={icons.calendar} size={12} color={TEXT_MUTED} />
//                     <span>{appt.appointment_date}</span>
//                     <Icon
//                       d={icons.clock}
//                       size={12}
//                       color={TEXT_MUTED}
//                       className="ms-2"
//                     />
//                     <span>{appt.time_schedule}</span>
//                   </div>
//                 </div>
//               </div>
//               <div style={{ minWidth: 100 }}>
//                 <span
//                   className={`badge rounded-pill ${
//                     appt.status === "Scheduled"
//                       ? "bg-info"
//                       : appt.status === "Completed"
//                       ? "bg-success"
//                       : "bg-warning text-dark"
//                   }`}
//                 >
//                   {appt.status}
//                 </span>
//               </div>
//               <div className="d-flex gap-2">
//                 <DashboardButton
//                   variant="outline"
//                   small
//                   onClick={() => handleView(appt)}
//                 >
//                   <Icon d={icons.eye} size={12} /> View
//                 </DashboardButton>
//                 <DashboardButton
//                   variant="outline"
//                   small
//                   onClick={() => openEditModal(appt)}
//                 >
//                   <Icon d={icons.edit} size={12} /> Update
//                 </DashboardButton>
//                 <DashboardButton
//                   variant="outline"
//                   small
//                   onClick={() => openDeleteModal(appt)}
//                   style={{ borderColor: "#FECACA", color: "#D63C3C" }}
//                 >
//                   <Icon d={icons.trash} size={12} /> Delete
//                 </DashboardButton>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {!loading && paginatedAppointments.length === 0 && (
//         <div
//           style={{
//             ...card,
//             textAlign: "center",
//             padding: 40,
//             color: TEXT_MUTED,
//           }}
//         >
//           No appointments found.
//         </div>
//       )}

//       {/* Pagination */}
//       <div className="d-flex justify-content-center align-items-center gap-2 mt-4">
//         <span style={{ fontSize: 13, color: TEXT_MUTED }}>
//           Showing {filteredAppointments.length === 0 ? 0 : startIndex + 1}–
//           {Math.min(startIndex + rowsPerPage, filteredAppointments.length)} of{" "}
//           {filteredAppointments.length}
//         </span>
//         <DashboardButton
//           variant="outline"
//           small
//           onClick={() => goToPage(currentPage - 1)}
//           disabled={currentPage === 1}
//         >
//           <Icon d={icons.chevronLeft} size={14} />
//         </DashboardButton>
//         {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//           <DashboardButton
//             key={page}
//             variant={page === currentPage ? "primary" : "outline"}
//             small
//             onClick={() => goToPage(page)}
//           >
//             {page}
//           </DashboardButton>
//         ))}
//         <DashboardButton
//           variant="outline"
//           small
//           onClick={() => goToPage(currentPage + 1)}
//           disabled={currentPage === totalPages}
//         >
//           <Icon d={icons.chevronRight} size={14} />
//         </DashboardButton>
//       </div>

//       {/* ═══ MODALS ═══ */}

//       {/* ─── Add Modal – Backend Fields ─── */}
//       {showAddModal && (
//         <div
//           className="modal d-block"
//           tabIndex="-1"
//           role="dialog"
//           style={{
//             backgroundColor: "rgba(0,0,0,0.25)",
//             backdropFilter: "blur(4px)",
//           }}
//           onClick={() => setShowAddModal(false)}
//         >
//           <div
//             className="modal-dialog modal-dialog-centered"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div
//               className="modal-content border-0 shadow"
//               style={{ borderRadius: 18, border: `1px solid ${BORDER}` }}
//             >
//               <div className="modal-header border-0 pb-0">
//                 <h5
//                   className="modal-title"
//                   style={{ fontWeight: 700, fontSize: 17, color: TEXT_DARK }}
//                 >
//                   Add New Appointment
//                 </h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   onClick={() => setShowAddModal(false)}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 {/* Patient Name */}
//                 <div className="mb-3">
//                   <label
//                     className="form-label"
//                     style={{ fontWeight: 600, fontSize: 12, color: TEXT_DARK }}
//                   >
//                     Patient Name *
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={addFormData.patient_name}
//                     onChange={(e) =>
//                       setAddFormData({
//                         ...addFormData,
//                         patient_name: e.target.value,
//                       })
//                     }
//                     style={{ borderRadius: 8, borderColor: BORDER }}
//                   />
//                 </div>

//                 {/* Mobile */}
//                 <div className="mb-3">
//                   <label
//                     className="form-label"
//                     style={{ fontWeight: 600, fontSize: 12, color: TEXT_DARK }}
//                   >
//                     Mobile Number *
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={addFormData.patient_mobile}
//                     onChange={(e) =>
//                       setAddFormData({
//                         ...addFormData,
//                         patient_mobile: e.target.value,
//                       })
//                     }
//                     style={{ borderRadius: 8, borderColor: BORDER }}
//                   />
//                 </div>

//                 {/* Email */}
//                 <div className="mb-3">
//                   <label
//                     className="form-label"
//                     style={{ fontWeight: 600, fontSize: 12, color: TEXT_DARK }}
//                   >
//                     Email *
//                   </label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     value={addFormData.patient_email}
//                     onChange={(e) =>
//                       setAddFormData({
//                         ...addFormData,
//                         patient_email: e.target.value,
//                       })
//                     }
//                     style={{ borderRadius: 8, borderColor: BORDER }}
//                   />
//                 </div>

//                 {/* Reason */}
//                 <div className="mb-3">
//                   <label
//                     className="form-label"
//                     style={{ fontWeight: 600, fontSize: 12, color: TEXT_DARK }}
//                   >
//                     Reason for Coming *
//                   </label>
//                   <textarea
//                     rows={2}
//                     className="form-control"
//                     value={addFormData.reason_for_comming}
//                     onChange={(e) =>
//                       setAddFormData({
//                         ...addFormData,
//                         reason_for_comming: e.target.value,
//                       })
//                     }
//                     style={{ borderRadius: 8, borderColor: BORDER, resize: "vertical" }}
//                   />
//                 </div>

//                 {/* Date & Time */}
//                 <div className="row g-3 mb-3">
//                   <div className="col-6">
//                     <label
//                       className="form-label"
//                       style={{
//                         fontWeight: 600,
//                         fontSize: 12,
//                         color: TEXT_DARK,
//                       }}
//                     >
//                       Appointment Date *
//                     </label>
//                     <input
//                       type="date"
//                       className="form-control"
//                       value={addFormData.appointment_date}
//                       onChange={(e) =>
//                         setAddFormData({
//                           ...addFormData,
//                           appointment_date: e.target.value,
//                         })
//                       }
//                       style={{ borderRadius: 8, borderColor: BORDER }}
//                     />
//                   </div>
//                   <div className="col-6">
//                     <label
//                       className="form-label"
//                       style={{
//                         fontWeight: 600,
//                         fontSize: 12,
//                         color: TEXT_DARK,
//                       }}
//                     >
//                       Time Schedule *
//                     </label>
//                     <input
//                       type="time"
//                       className="form-control"
//                       value={addFormData.time_schedule}
//                       onChange={(e) =>
//                         setAddFormData({
//                           ...addFormData,
//                           time_schedule: e.target.value,
//                         })
//                       }
//                       style={{ borderRadius: 8, borderColor: BORDER }}
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="modal-footer border-0 pt-0">
//                 <DashboardButton
//                   variant="outline"
//                   onClick={() => setShowAddModal(false)}
//                 >
//                   Cancel
//                 </DashboardButton>
//                 <DashboardButton
//                   variant="primary"
//                   onClick={handleAddAppointment}
//                 >
//                   Add Appointment
//                 </DashboardButton>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ─── View Modal ─── */}
//       {showViewModal && viewingAppt && (
//         <div
//           className="modal d-block"
//           tabIndex="-1"
//           role="dialog"
//           style={{
//             backgroundColor: "rgba(0,0,0,0.25)",
//             backdropFilter: "blur(4px)",
//           }}
//           onClick={() => setShowViewModal(false)}
//         >
//           <div
//             className="modal-dialog modal-dialog-centered"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div
//               className="modal-content border-0 shadow"
//               style={{ borderRadius: 18, border: `1px solid ${BORDER}` }}
//             >
//               <div className="modal-header border-0 pb-0">
//                 <h5
//                   className="modal-title"
//                   style={{ fontWeight: 700, fontSize: 18, color: TEXT_DARK }}
//                 >
//                   Appointment Details
//                 </h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   onClick={() => setShowViewModal(false)}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <div className="mb-2">
//                   <b>Patient:</b> {viewingAppt.patient_name}
//                 </div>
//                 <div className="mb-2">
//                   <b>Mobile:</b> {viewingAppt.patient_mobile}
//                 </div>
//                 <div className="mb-2">
//                   <b>Email:</b> {viewingAppt.patient_email}
//                 </div>
//                 <div className="mb-2">
//                   <b>Reason:</b> {viewingAppt.reason_for_comming}
//                 </div>
//                 <div className="mb-2">
//                   <b>Date:</b> {viewingAppt.appointment_date} &nbsp; <b>Time:</b> {viewingAppt.time_schedule}
//                 </div>
//                 <div className="mb-2">
//                   <b>Status:</b>
//                   <span
//                     className={`badge rounded-pill ms-2 ${
//                       viewingAppt.status === "Scheduled"
//                         ? "bg-info"
//                         : viewingAppt.status === "Completed"
//                         ? "bg-success"
//                         : "bg-warning text-dark"
//                     }`}
//                   >
//                     {viewingAppt.status}
//                   </span>
//                 </div>
//               </div>
//               <div className="modal-footer border-0 pt-0">
//                 <DashboardButton
//                   variant="outline"
//                   onClick={() => setShowViewModal(false)}
//                 >
//                   Close
//                 </DashboardButton>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ─── Edit Modal ─── */}
//       {showEditModal && editingAppt && (
//         <div
//           className="modal d-block"
//           tabIndex="-1"
//           role="dialog"
//           style={{
//             backgroundColor: "rgba(0,0,0,0.25)",
//             backdropFilter: "blur(4px)",
//           }}
//           onClick={() => setShowEditModal(false)}
//         >
//           <div
//             className="modal-dialog modal-dialog-centered"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div
//               className="modal-content border-0 shadow"
//               style={{ borderRadius: 18, border: `1px solid ${BORDER}` }}
//             >
//               <div className="modal-header border-0 pb-0">
//                 <h5
//                   className="modal-title"
//                   style={{ fontWeight: 700, fontSize: 17, color: TEXT_DARK }}
//                 >
//                   Update Appointment Status
//                 </h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   onClick={() => setShowEditModal(false)}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <div className="mb-3">
//                   <label
//                     className="form-label"
//                     style={{ fontWeight: 600, fontSize: 12, color: TEXT_DARK }}
//                   >
//                     Status
//                   </label>
//                   <select
//                     className="form-select"
//                     value={formData.status}
//                     onChange={(e) => setFormData({ status: e.target.value })}
//                     style={{ borderRadius: 8, borderColor: BORDER }}
//                   >
//                     <option>Scheduled</option>
//                     <option>Completed</option>
//                     <option>Cancelled</option>
//                   </select>
//                 </div>
//               </div>
//               <div className="modal-footer border-0 pt-0">
//                 <DashboardButton
//                   variant="outline"
//                   onClick={() => setShowEditModal(false)}
//                 >
//                   Cancel
//                 </DashboardButton>
//                 <DashboardButton variant="primary" onClick={handleUpdate}>
//                   Update
//                 </DashboardButton>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ─── Delete Modal ─── */}
//       {showDeleteModal && deletingAppt && (
//         <div
//           className="modal d-block"
//           tabIndex="-1"
//           role="dialog"
//           style={{
//             backgroundColor: "rgba(0,0,0,0.25)",
//             backdropFilter: "blur(4px)",
//           }}
//           onClick={() => setShowDeleteModal(false)}
//         >
//           <div
//             className="modal-dialog modal-dialog-centered"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div
//               className="modal-content border-0 shadow text-center"
//               style={{ borderRadius: 18, border: `1px solid ${BORDER}` }}
//             >
//               <div className="modal-body">
//                 <div className="mb-3">
//                   <div
//                     style={{
//                       width: 48,
//                       height: 48,
//                       borderRadius: "50%",
//                       background: "#FFE5E3",
//                       display: "inline-flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       marginBottom: 12,
//                     }}
//                   >
//                     <Icon d={icons.trash} size={22} color="#D63C3C" />
//                   </div>
//                   <h5 className="fw-bold" style={{ color: TEXT_DARK }}>
//                     Confirm Delete
//                   </h5>
//                   <p
//                     className="mb-0"
//                     style={{ color: TEXT_MUTED, fontSize: 14 }}
//                   >
//                     Delete appointment for{" "}
//                     <strong>{deletingAppt.patient_name}</strong>?<br />
//                     This action cannot be undone.
//                   </p>
//                 </div>
//                 <div className="d-flex justify-content-center gap-2">
//                   <DashboardButton
//                     variant="outline"
//                     onClick={() => setShowDeleteModal(false)}
//                   >
//                     Cancel
//                   </DashboardButton>
//                   <DashboardButton
//                     variant="primary"
//                     onClick={confirmDelete}
//                     style={{ background: "#D63C3C", border: "none" }}
//                   >
//                     Delete
//                   </DashboardButton>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Toast */}
//       {toast && (
//         <Toast message={toast.message} type={toast.type} onClose={clearToast} />
//       )}
//     </div>
//   );
// };

// export default Appointment;



// Appointment Page – Fully Integrated with Backend API (Backend Schema Match)
import React, { useState, useEffect, useCallback } from "react";
import API_BASE_URL from '../../Environmnet/Apiurl'

// ── Icons ──────────────────────────────────────────────────────────────
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
  calendar:
    "M8 7V3M16 7V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  clock: "M12 6v6l4 2 M22 12A10 10 0 1 1 12 2a10 10 0 0 1 10 10z",
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
  chevronLeft: "M15 18l-6-6 6-6",
  chevronRight: "M9 18l6-6-6-6",
};

// ── Colors ──────────────────────────────────────────────────────────────
const GREEN = "#2E8B57";
const GREEN_HOVER = "#247346";
const BORDER = "#D1EDE6";
const TEXT_DARK = "#1E2F2B";
const TEXT_MUTED = "#5E7B6E";
const BG = "#F4FCF8";
const CARD_BG = "#FFFFFF";

// ── Dashboard Button ──────────────────────────────────────────────────
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

// ── Toast ──────────────────────────────────────────────────────────────
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



// ── Main Component ────────────────────────────────────────────────────
const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [viewingAppt, setViewingAppt] = useState(null);
  const [editingAppt, setEditingAppt] = useState(null);
  const [deletingAppt, setDeletingAppt] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [formData, setFormData] = useState({ status: "" });
  
  const [addFormData, setAddFormData] = useState({
    patient_name: "",
    patient_mobile: "",
    service: "",
    message: "",
  });

  const [toast, setToast] = useState(null);
  const showToast = useCallback(
    (message, type = "success") => setToast({ message, type }),
    []
  );
  const clearToast = useCallback(() => setToast(null), []);

  // ── Fetch ──────────────────────────────────────────────────────────
  const fetchAppointments = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/appointment`);
      if (!response.ok) throw new Error("Failed to fetch appointments");
      const data = await response.json();
      const mapped = data.map((item) => ({
        id: item._id,
        patient_name: item.patient_name,
        patient_mobile: item.patient_mobile,
        // Fallback keeps old database records readable.
        service: item.service || item.reason_for_comming || "-",
        message: item.message || "",
        status: item.status || "Scheduled",
        appoinmnet_id: item.appoinmnet_id,
        createdAt: item.createdAt,
      }));
      setAppointments(mapped);
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handleRefresh = () => {
    if (refreshing) return;
    setRefreshing(true);
    fetchAppointments().finally(() => setRefreshing(false));
  };

  // ── Pagination ─────────────────────────────────────────────────────
  const [currentPage, setCurrentPage] = useState(1);
  const filteredAppointments = appointments.filter((appointment) => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;

    return [
      appointment.patient_name,
      appointment.patient_mobile,
      appointment.service,
      appointment.message,
      appointment.appoinmnet_id,
    ].some((value) => String(value || "").toLowerCase().includes(term));
  });
  const totalPages = Math.ceil(filteredAppointments.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedAppointments = filteredAppointments.slice(
    startIndex,
    startIndex + rowsPerPage
  );
  const goToPage = (page) =>
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));

  // ── Modal Handlers ──────────────────────────────────────────────
  const handleView = (appt) => {
    setViewingAppt(appt);
    setShowViewModal(true);
  };

  const openEditModal = (appt) => {
    setEditingAppt(appt);
    setFormData({ status: appt.status });
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    if (!editingAppt) return;
    try {
      const response = await fetch(
        `${API_BASE_URL}/appointment/${editingAppt.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: formData.status }),
        }
      );
      if (!response.ok) throw new Error("Update failed");
      const updated = await response.json();
      setAppointments((prev) =>
        prev.map((a) =>
          a.id === editingAppt.id
            ? { ...a, status: updated.status || formData.status }
            : a
        )
      );
      showToast("Appointment updated successfully", "success");
      setShowEditModal(false);
      setEditingAppt(null);
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  // ── Add appointment ──────────────────────────────────────────────
  const handleAddAppointment = async () => {
    const patientName = addFormData.patient_name.trim();
    const patientMobile = addFormData.patient_mobile.trim();
    const service = addFormData.service.trim();
    const message = addFormData.message.trim();

    if (!patientName || !patientMobile || !service) {
      showToast("Name, mobile number, and service are required", "error");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/appointment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patient_name: patientName,
          patient_mobile: patientMobile,
          service,
          message,
        }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || "Add failed");
      }

      const mapped = {
        id: responseData._id,
        patient_name: responseData.patient_name,
        patient_mobile: responseData.patient_mobile,
        service: responseData.service,
        message: responseData.message || "",
        status: responseData.status || "Scheduled",
        appoinmnet_id: responseData.appoinmnet_id,
        createdAt: responseData.createdAt,
      };

      setAppointments((current) => [mapped, ...current]);
      showToast("Appointment added and email notification processed", "success");
      setShowAddModal(false);
      setAddFormData({
        patient_name: "",
        patient_mobile: "",
        service: "",
        message: "",
      });
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  const openDeleteModal = (appt) => {
    setDeletingAppt(appt);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!deletingAppt) return;
    try {
      const response = await fetch(
        `${API_BASE_URL}/appointment/${deletingAppt.id}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Delete failed");
      setAppointments((prev) => prev.filter((a) => a.id !== deletingAppt.id));
      showToast("Appointment deleted successfully", "success");
      setShowDeleteModal(false);
      setDeletingAppt(null);
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  // ── Stats ──────────────────────────────────────────────────────────
  const stats = {
    total: appointments.length,
    scheduled: appointments.filter((a) => a.status === "Scheduled").length,
    completed: appointments.filter((a) => a.status === "Completed").length,
    cancelled: appointments.filter((a) => a.status === "Cancelled").length,
  };
  const statCards = [
    {
      label: "Total Appointments",
      value: stats.total,
      icon: icons.calendar,
      color: "#4CAF50",
      bg: "#E8F5E9",
      trend: "all visits",
    },
    {
      label: "Scheduled",
      value: stats.scheduled,
      icon: icons.clock,
      color: "#2196F3",
      bg: "#E3F2FD",
      trend: "upcoming",
    },
    {
      label: "Completed",
      value: stats.completed,
      icon: icons.check,
      color: GREEN,
      bg: "#D4F3E8",
      trend: "done",
    },
    {
      label: "Cancelled",
      value: stats.cancelled,
      icon: icons.close,
      color: "#FF9800",
      bg: "#FFF3E0",
      trend: "rejected",
    },
  ];

  const card = {
    background: CARD_BG,
    borderRadius: 18,
    border: `1px solid ${BORDER}`,
    boxShadow: "0 2px 12px rgba(46,139,87,0.06)",
    padding: "18px 20px",
  };

  // ── Render ──────────────────────────────────────────────────────────
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
      <div className="d-flex justify-content-between align-items-center mb-4">
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
            Appoinmnet
          </h1>
          <p
            style={{
              fontSize: 13,
              color: TEXT_MUTED,
              margin: "2px 0 0",
              fontWeight: 400,
            }}
          >
            Manage patient appointments
          </p>
        </div>
        <div className="d-flex gap-2 align-items-center">
          <DashboardButton
            variant="outline"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            {refreshing ? (
              <span className="spinner-border spinner-border-sm" role="status" />
            ) : (
              <Icon d={icons.refresh} size={14} />
            )}
            {refreshing ? "Refreshing..." : "Refresh"}
          </DashboardButton>
          <DashboardButton
            variant="primary"
            onClick={() => setShowAddModal(true)}
          >
            <Icon d={icons.plus} size={14} color="white" /> Add Appointment
          </DashboardButton>
        </div>
      </div>

      {/* Stat Cards */}
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
                  {s.value}
                </div>
                <div style={{ fontSize: 11, color: s.color, fontWeight: 500 }}>
                  {s.trend}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search + Show */}
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
            placeholder="Search by name, mobile, service, message..."
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

      {/* Cards */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {paginatedAppointments.map((appt) => (
            <div
              key={appt.id}
              style={{
                ...card,
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 20,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "#cbd5e1")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = BORDER)
              }
            >
              <div
                className="d-flex align-items-start gap-3 flex-grow-1"
                style={{ minWidth: 200 }}
              >
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
                  {appt.patient_name?.charAt(0) || "P"}
                </div>
                <div>
                  <div
                    style={{ fontWeight: 700, color: TEXT_DARK, fontSize: 14 }}
                  >
                    {appt.patient_name}
                  </div>
                  <div style={{ fontSize: 12, color: TEXT_MUTED }}>
                    📱 {appt.patient_mobile}
                  </div>
                  <div
                    className="d-flex align-items-start gap-2 mt-1"
                    style={{ fontSize: 13, color: "#475569" }}
                  >
                    <span>🩺 {appt.service}</span>
                  </div>
                  <div
                    className="d-flex align-items-start gap-2 mt-1"
                    style={{ fontSize: 12, color: TEXT_MUTED }}
                  >
                    <span>📝 {appt.message || "No message"}</span>
                  </div>
                </div>
              </div>
              <div style={{ minWidth: 100 }}>
                <span
                  className={`badge rounded-pill ${
                    appt.status === "Scheduled"
                      ? "bg-info"
                      : appt.status === "Completed"
                      ? "bg-success"
                      : "bg-warning text-dark"
                  }`}
                >
                  {appt.status}
                </span>
              </div>
              <div className="d-flex gap-2">
                <DashboardButton
                  variant="outline"
                  small
                  onClick={() => handleView(appt)}
                >
                  <Icon d={icons.eye} size={12} /> View
                </DashboardButton>
                <DashboardButton
                  variant="outline"
                  small
                  onClick={() => openEditModal(appt)}
                >
                  <Icon d={icons.edit} size={12} /> Update
                </DashboardButton>
                <DashboardButton
                  variant="outline"
                  small
                  onClick={() => openDeleteModal(appt)}
                  style={{ borderColor: "#FECACA", color: "#D63C3C" }}
                >
                  <Icon d={icons.trash} size={12} /> Delete
                </DashboardButton>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && paginatedAppointments.length === 0 && (
        <div
          style={{
            ...card,
            textAlign: "center",
            padding: 40,
            color: TEXT_MUTED,
          }}
        >
          No appointments found.
        </div>
      )}

      {/* Pagination */}
      <div className="d-flex justify-content-center align-items-center gap-2 mt-4">
        <span style={{ fontSize: 13, color: TEXT_MUTED }}>
          Showing {filteredAppointments.length === 0 ? 0 : startIndex + 1}–
          {Math.min(startIndex + rowsPerPage, filteredAppointments.length)} of{" "}
          {filteredAppointments.length}
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

      {/* ═══ MODALS ═══ */}

      {/* ─── Add Modal – Backend Fields ─── */}
      {showAddModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          role="dialog"
          style={{
            backgroundColor: "rgba(0,0,0,0.25)",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
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
                  Add New Appointment
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowAddModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label" style={{ fontWeight: 600, fontSize: 12, color: TEXT_DARK }}>
                    Patient Name *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={addFormData.patient_name}
                    onChange={(event) =>
                      setAddFormData((current) => ({
                        ...current,
                        patient_name: event.target.value,
                      }))
                    }
                    style={{ borderRadius: 8, borderColor: BORDER }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" style={{ fontWeight: 600, fontSize: 12, color: TEXT_DARK }}>
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    value={addFormData.patient_mobile}
                    onChange={(event) =>
                      setAddFormData((current) => ({
                        ...current,
                        patient_mobile: event.target.value,
                      }))
                    }
                    style={{ borderRadius: 8, borderColor: BORDER }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" style={{ fontWeight: 600, fontSize: 12, color: TEXT_DARK }}>
                    Service *
                  </label>
                  <select
                    className="form-select"
                    value={addFormData.service}
                    onChange={(event) =>
                      setAddFormData((current) => ({
                        ...current,
                        service: event.target.value,
                      }))
                    }
                    style={{ borderRadius: 8, borderColor: BORDER }}
                  >
                    <option value="">Select service</option>
                    <option value="Homeopathy Consultation">Homeopathy Consultation</option>
                    <option value="Wellness Program">Wellness Program</option>
                    <option value="Diet Plan">Diet Plan</option>
                    <option value="Online Consultation">Online Consultation</option>
                    <option value="General Checkup">General Checkup</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label" style={{ fontWeight: 600, fontSize: 12, color: TEXT_DARK }}>
                    Message
                  </label>
                  <textarea
                    rows={3}
                    className="form-control"
                    value={addFormData.message}
                    onChange={(event) =>
                      setAddFormData((current) => ({
                        ...current,
                        message: event.target.value,
                      }))
                    }
                    style={{ borderRadius: 8, borderColor: BORDER, resize: "vertical" }}
                  />
                </div>
              </div>
              <div className="modal-footer border-0 pt-0">
                <DashboardButton
                  variant="outline"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </DashboardButton>
                <DashboardButton
                  variant="primary"
                  onClick={handleAddAppointment}
                >
                  Add Appointment
                </DashboardButton>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── View Modal ─── */}
      {showViewModal && viewingAppt && (
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
                  Appointment Details
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowViewModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-2">
                  <b>Patient:</b> {viewingAppt.patient_name}
                </div>
                <div className="mb-2">
                  <b>Mobile:</b> {viewingAppt.patient_mobile}
                </div>
                <div className="mb-2">
                  <b>Service:</b> {viewingAppt.service}
                </div>
                <div className="mb-2">
                  <b>Message:</b> {viewingAppt.message || "No message"}
                </div>
                <div className="mb-2">
                  <b>Status:</b>
                  <span
                    className={`badge rounded-pill ms-2 ${
                      viewingAppt.status === "Scheduled"
                        ? "bg-info"
                        : viewingAppt.status === "Completed"
                        ? "bg-success"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {viewingAppt.status}
                  </span>
                </div>
              </div>
              <div className="modal-footer border-0 pt-0">
                <DashboardButton
                  variant="outline"
                  onClick={() => setShowViewModal(false)}
                >
                  Close
                </DashboardButton>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Edit Modal ─── */}
      {showEditModal && editingAppt && (
        <div
          className="modal d-block"
          tabIndex="-1"
          role="dialog"
          style={{
            backgroundColor: "rgba(0,0,0,0.25)",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setShowEditModal(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
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
                  Update Appointment Status
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>
              <div className="modal-body">
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
                    onChange={(e) => setFormData({ status: e.target.value })}
                    style={{ borderRadius: 8, borderColor: BORDER }}
                  >
                    <option>Scheduled</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer border-0 pt-0">
                <DashboardButton
                  variant="outline"
                  onClick={() => setShowEditModal(false)}
                >
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

      {/* ─── Delete Modal ─── */}
      {showDeleteModal && deletingAppt && (
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
                    Delete appointment for{" "}
                    <strong>{deletingAppt.patient_name}</strong>?<br />
                    This action cannot be undone.
                  </p>
                </div>
                <div className="d-flex justify-content-center gap-2">
                  <DashboardButton
                    variant="outline"
                    onClick={() => setShowDeleteModal(false)}
                  >
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
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={clearToast} />
      )}
    </div>
  );
};

export default Appointment;