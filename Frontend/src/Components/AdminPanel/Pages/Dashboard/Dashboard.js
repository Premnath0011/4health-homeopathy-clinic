// // Dashboard Page — New Design (200px Welcome Board + Full Revamp)
// import React, { useState, useEffect } from "react";
// import "../CommonAdmin.css";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import API_BASE_URL from "../../Environmnet/Apiurl";

// // ── Icons ─────────────────────────────────────────────────────────────────────
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
//   bed: "M3 9v10M21 9v10M3 14h18M5 9V7a2 2 0 012-2h10a2 2 0 012 2v2",
//   doctor:
//     "M12 2a5 5 0 110 10A5 5 0 0112 2zM4 22c0-4.418 3.582-8 8-8s8 3.582 8 8",
//   patient:
//     "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
//   appt: "M8 7V3M16 7V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
//   plus: "M12 5v14M5 12h14",
//   arrowUp: "M12 19V5M5 12l7-7 7 7",
//   check: "M5 13l4 4L19 7",
//   refresh:
//     "M21 2v6h-6M3 22v-6h6M3.5 12A8.5 8.5 0 0 1 20.5 8M3.5 12a8.5 8.5 0 0 0 17 4",
//   leaf: "M12 2C6 2 3 7 3 12c0 4 2.5 7.5 6 9.5M12 2c6 0 9 5 9 10 0 4-2.5 7.5-6 9.5M12 2v20",
//   mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
//   calendarCheck:
//     "M8 2v2M16 2v2M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z M9 16l2 2 4-4",
//   blog: "M4 4h16v16H4z M8 8h8M8 12h8M8 16h5",
// };

// // ── Colors ────────────────────────────────────────────────────────────────────
// const GREEN = "#2E8B57";
// const GREEN_SOFT = "#F0FAF4";
// const GREEN_LIGHT = "#A8E6CF";
// const TEXT_DARK = "#1E2F2B";
// const TEXT_MUTED = "#5E7B6E";
// const BORDER = "#D1EDE6";
// const BG = "#F4FCF8";
// const CARD_BG = "#FFFFFF";

// // ── Data is now fetched dynamically from the backend (see Dashboard component) ─

// const statusColors = {
//   Scheduled: "#2E8B57",
//   Completed: "#4CAF50",
//   Cancelled: "#FF847C",
// };

// // ── Donut (Redesigned) ──────────────────────────────────────────────────────
// function DonutChart({ segments, centerValue, centerLabel }) {
//   const cx = 90,
//     cy = 90,
//     r = 65,
//     sw = 20;
//   const circ = 2 * Math.PI * r;
//   let offset = 0;
//   const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
//   return (
//     <svg viewBox="0 0 180 180" width={150} height={150}>
//       <circle
//         cx={cx}
//         cy={cy}
//         r={r}
//         fill="none"
//         stroke="#E8F5F1"
//         strokeWidth={sw}
//       />
//       {segments.map((s, i) => {
//         const pct = (s.value / total) * 100;
//         const dash = (pct / 100) * circ;
//         const gap = circ - dash;
//         const rot = (offset / 100) * 360 - 90;
//         offset += pct;
//         return (
//           <circle
//             key={i}
//             cx={cx}
//             cy={cy}
//             r={r}
//             fill="none"
//             stroke={s.color}
//             strokeWidth={sw}
//             strokeDasharray={`${dash} ${gap}`}
//             strokeDashoffset={0}
//             transform={`rotate(${rot} ${cx} ${cy})`}
//           />
//         );
//       })}
//       <circle cx={cx} cy={cy} r={r - sw / 2 - 4} fill="white" />
//       <text
//         x={cx}
//         y={cy - 6}
//         textAnchor="middle"
//         fontSize="11"
//         fill={TEXT_MUTED}
//         fontWeight="600"
//       >
//         {centerLabel}
//       </text>
//       <text
//         x={cx}
//         y={cy + 16}
//         textAnchor="middle"
//         fontSize="28"
//         fontWeight="800"
//         fill={GREEN}
//       >
//         {centerValue}
//       </text>
//     </svg>
//   );
// }

// // ── Bar Chart (Appointments trend — last 7 days, real data) ─────────────────
// function BarChart({ labels, values }) {
//   const W = 400,
//     H = 140;
//   const pad = { top: 10, right: 10, bottom: 24, left: 24 };
//   const chartW = W - pad.left - pad.right;
//   const chartH = H - pad.top - pad.bottom;
//   const maxV = Math.max(...values, 4);
//   const barSlot = chartW / values.length;
//   const barW = Math.min(28, barSlot * 0.5);
//   const yScale = (v) => chartH - (v / maxV) * chartH;

//   const gridTicks = [
//     0,
//     Math.round(maxV / 2),
//     maxV,
//   ];

//   return (
//     <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ overflow: "visible" }}>
//       {/* Y axis grid */}
//       {gridTicks.map((v) => {
//         const y = pad.top + yScale(v);
//         return (
//           <g key={v}>
//             <line
//               x1={pad.left}
//               x2={W - pad.right}
//               y1={y}
//               y2={y}
//               stroke={BORDER}
//               strokeWidth="0.8"
//               strokeDasharray="3,3"
//             />
//             <text
//               x={pad.left - 5}
//               y={y + 3}
//               textAnchor="end"
//               fontSize="8"
//               fill="#9ca3af"
//             >
//               {v}
//             </text>
//           </g>
//         );
//       })}
//       {/* Bars */}
//       {values.map((v, i) => {
//         const x = pad.left + i * barSlot + (barSlot - barW) / 2;
//         const y = pad.top + yScale(v);
//         const h = chartH - yScale(v);
//         return (
//           <rect
//             key={i}
//             x={x}
//             y={y}
//             width={barW}
//             height={Math.max(h, 0)}
//             rx={4}
//             fill={GREEN}
//             opacity={0.85}
//           />
//         );
//       })}
//       {/* X axis labels */}
//       {labels.map((d, i) => (
//         <text
//           key={i}
//           x={pad.left + i * barSlot + barSlot / 2}
//           y={H - 4}
//           textAnchor="middle"
//           fontSize="8"
//           fill="#9ca3af"
//         >
//           {d}
//         </text>
//       ))}
//     </svg>
//   );
// }

// // ═══════════════ MAIN DASHBOARD ═══════════════════════════════════════════════
// const Dashboard = () => {
//   const [activeTab, setActiveTab] = useState("Today");
//   const [checked, setChecked] = useState({});
//   const [refreshing, setRefreshing] = useState(false);
//   const [greeting, setGreeting] = useState("");
//   const [lastUpdated, setLastUpdated] = useState(new Date()); // NEW: last updated timestamp
//   const [userName, setUserName] = useState(
//     localStorage.getItem("user_name") || "Admin"
//   );

//   const [counts, setCounts] = useState({
//     appointments: 0,
//     users: 0,
//     blogs: 0,
//     services: 0,
//   });
//   const [recentAppointments, setRecentAppointments] = useState([]);
//   const [allAppointments, setAllAppointments] = useState([]);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const hour = new Date().getHours();
//     if (hour < 12) setGreeting("Good Morning");
//     else if (hour < 17) setGreeting("Good Afternoon");
//     else setGreeting("Good Evening");
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       const [apptRes, userRes, blogRes, serviceRes] = await Promise.all([
//         axios.get(`${API_BASE_URL}/appointment`),
//         axios.get(`${API_BASE_URL}/user`),
//         axios.get(`${API_BASE_URL}/blog`),
//         axios.get(`${API_BASE_URL}/service`),
//       ]);

//       const appointments = apptRes.data || [];
//       const users = userRes.data || [];
//       const blogs = blogRes.data || [];
//       const services = serviceRes.data || [];

//       setCounts({
//         appointments: appointments.length,
//         users: users.length,
//         blogs: blogs.length,
//         services: services.length,
//       });

//       setAllAppointments(appointments);
//       setRecentAppointments(appointments.slice(0, 7));
//     } catch (error) {
//       console.error("Dashboard fetch error:", error.message);
//     }
//   };

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const handleRefresh = () => {
//     if (refreshing) return;
//     setRefreshing(true);
//     fetchDashboardData().finally(() => {
//       setRefreshing(false);
//       setLastUpdated(new Date());
//     });
//   };

//   // ── Appointment status breakdown (drives the pie/donut chart) ─────────────
//   const statusCounts = allAppointments.reduce(
//     (acc, a) => {
//       const key = a.status || "Scheduled";
//       acc[key] = (acc[key] || 0) + 1;
//       return acc;
//     },
//     { Scheduled: 0, Completed: 0, Cancelled: 0 }
//   );

//   const donutSegments = Object.keys(statusCounts)
//     .filter((key) => statusCounts[key] > 0)
//     .map((key) => ({
//       label: key,
//       value: statusCounts[key],
//       color: statusColors[key] || "#9CA3AF",
//     }));

//   // ── Appointments per day — last 7 days (drives the bar chart) ──────────────
//   const last7Days = Array.from({ length: 7 }, (_, i) => {
//     const d = new Date();
//     d.setDate(d.getDate() - (6 - i));
//     return d;
//   });

//   const toDateKey = (d) => d.toISOString().split("T")[0];

//   const trendLabels = last7Days.map((d) =>
//     d.toLocaleDateString("en-US", { day: "2-digit", month: "short" })
//   );

//   const trendValues = last7Days.map((d) => {
//     const key = toDateKey(d);
//     return allAppointments.filter((a) => {
//       if (!a.appointment_date) return false;
//       // appointment_date may be stored as "YYYY-MM-DD" or full ISO string
//       return a.appointment_date.slice(0, 10) === key;
//     }).length;
//   });

//   // Common card style
//   const card = {
//     background: CARD_BG,
//     borderRadius: 18,
//     border: `1px solid ${BORDER}`,
//     boxShadow: "0 2px 12px rgba(46,139,87,0.06)",
//     padding: "18px 20px",
//   };

//   return (
//     <div
//       style={{
//         background: BG,
//         padding: "24px 28px",
//         minHeight: "100vh",
//         fontFamily: "'Inter', 'Segoe UI', sans-serif",
//         fontSize: 14,
//       }}
//     >
//       {/* ═══ HEADER with Page Title & Refresh ═══ */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: 20,
//         }}
//       >
//         {/* LEFT: Page Title */}
//         <h1
//           style={{
//             fontSize: 24,
//             fontWeight: 800,
//             color: TEXT_DARK,
//             margin: 0,
//           }}
//         >
//           Dashboard
//         </h1>

//         {/* RIGHT: Refresh button + Last updated */}
//         <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
//           {/* Last updated indicator */}
//           {/* <span
//             style={{
//               fontSize: 11,
//               color: TEXT_MUTED,
//               fontWeight: 500,
//             }}
//           >
//             Last updated:{" "}
//             <span style={{ fontWeight: 600, color: TEXT_DARK }}>
//               {lastUpdated.toLocaleTimeString()}
//             </span>
//           </span> */}

//           <button
//             onClick={handleRefresh}
//             disabled={refreshing}
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: 6,
//               padding: "8px 16px",
//               borderRadius: 10,
//               background: "white",
//               border: `1.5px solid ${BORDER}`,
//               cursor: "pointer",
//               fontSize: 13,
//               fontWeight: 600,
//               color: GREEN,
//             }}
//           >
//             <span
//               style={{
//                 animation: refreshing ? "spin 0.8s linear infinite" : "none",
//               }}
//             >
//               <Icon d={icons.refresh} size={14} color={GREEN} />
//             </span>
//             {refreshing ? "Refreshing..." : "Refresh"}
//           </button>
//         </div>
//       </div>

//       {/* ═══ WELCOME BOARD (height 200px) ═══ */}
//       <div
//         style={{
//           ...card,
//           height: 200,
//           padding: 0,
//           marginBottom: 20,
//           overflow: "hidden",
//           display: "flex",
//           alignItems: "stretch",
//           background: "white",
//         }}
//       >
//         {/* Left side — user info + action buttons */}
//         <div
//           style={{
//             flex: "1 1 55%",
//             padding: "24px 28px",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             position: "relative",
//             zIndex: 1,
//           }}
//         >
//           <span
//             style={{
//               fontSize: 12,
//               color: TEXT_MUTED,
//               fontWeight: 600,
//               letterSpacing: "0.5px",
//               textTransform: "uppercase",
//             }}
//           >
//             {new Date().toLocaleDateString("en-US", {
//               weekday: "long",
//               day: "numeric",
//               month: "short",
//             })}
//           </span>
//           <h2
//             style={{
//               fontSize: 24,
//               fontWeight: 800,
//               color: TEXT_DARK,
//               margin: "4px 0 6px",
//             }}
//           >
//             {greeting}, <span style={{ color: GREEN }}>{userName}</span>
//           </h2>
//           <p style={{ fontSize: 13, color: TEXT_MUTED, margin: 0 }}>
//             {localStorage.getItem("user_role") || "Admin"} • 4Health Homeopathy Hospital
//           </p>
//           <div style={{ marginTop: 10, display: "flex", gap: 16 }}>
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 4,
//                 fontSize: 12,
//                 color: TEXT_MUTED,
//               }}
//             >
//               <span
//                 style={{
//                   background: GREEN_SOFT,
//                   borderRadius: 4,
//                   padding: "2px 6px",
//                   fontWeight: 700,
//                   color: GREEN,
//                 }}
//               >
//                 {counts.appointments}
//               </span>{" "}
//               Total Appointments
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div style={{ marginTop: 14, display: "flex", gap: 10 }}>
//             <button
//               className="wb-btn"
//               onClick={() => navigate("/admin/enquire")}
//             >
//               <Icon d={icons.mail} size={14} color={GREEN} />
//               Enquire
//             </button>
//             <button
//               className="wb-btn"
//               onClick={() => navigate("/admin/appoinment")}
//             >
//               <Icon d={icons.calendarCheck} size={14} color={GREEN} />
//               Appointment
//             </button>
//             <button className="wb-btn" onClick={() => navigate("/admin/blog")}>
//               <Icon d={icons.blog} size={14} color={GREEN} />
//               Blog
//             </button>
//           </div>
//         </div>

//         {/* Right side — image */}
//         <div
//           style={{ flex: "0 0 45%", position: "relative", overflow: "hidden" }}
//         >
//           <img
//             src={require("../../../../assets/Image/AdminDash/admin-dash-banner.jpg")}
//             alt="Homeopathic medicine"
//             style={{ width: "100%", height: "100%", objectFit: "cover" }}
//           />
//           <div
//             style={{
//               position: "absolute",
//               inset: 0,
//               background:
//                 "linear-gradient(to left, rgba(255,255,255,0) 50%, rgba(255,255,255,1) 100%)",
//             }}
//           />
//         </div>
//       </div>

//       {/* ═══ STAT CARDS ═══ */}
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(4, 1fr)",
//           gap: 14,
//           marginBottom: 20,
//         }}
//       >
//         {[
//           {
//             icon: icons.calendarCheck,
//             title: "Appointments",
//             value: counts.appointments,
//             trend: "Total",
//             color: "#9C27B0",
//             bg: "#F3E5F5",
//             path: "/admin/appoinment",
//           },
//           {
//             icon: icons.patient,
//             title: "Users",
//             value: counts.users,
//             trend: "Registered",
//             color: "#FF9800",
//             bg: "#FFF3E0",
//             path: "/admin/user",
//           },
//           {
//             icon: icons.blog,
//             title: "Blog",
//             value: counts.blogs,
//             trend: "Published",
//             color: "#2196F3",
//             bg: "#E3F2FD",
//             path: "/admin/blog",
//           },
//           {
//             icon: icons.leaf,
//             title: "Service",
//             value: counts.services,
//             trend: "Active",
//             color: "#4CAF50",
//             bg: "#E8F5E9",
//             path: "/admin/treatment",
//           },
//         ].map((s, i) => (
//           <div
//             key={i}
//             onClick={() => navigate(s.path)}
//             style={{
//               ...card,
//               display: "flex",
//               alignItems: "center",
//               gap: 14,
//               cursor: "pointer",
//             }}
//           >
//             <div
//               style={{
//                 width: 44,
//                 height: 44,
//                 borderRadius: 12,
//                 background: s.bg,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 flexShrink: 0,
//               }}
//             >
//               <Icon d={s.icon} size={20} color={s.color} />
//             </div>
//             <div>
//               <div style={{ fontSize: 12, color: TEXT_MUTED, fontWeight: 600 }}>
//                 {s.title}
//               </div>
//               <div
//                 style={{
//                   fontSize: 26,
//                   fontWeight: 800,
//                   color: TEXT_DARK,
//                   lineHeight: 1.2,
//                 }}
//               >
//                 {s.value}
//               </div>
//               <div style={{ fontSize: 11, color: s.color, fontWeight: 500 }}>
//                 {s.trend}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ═══ CHARTS ROW ═══ */}
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "1fr 1.6fr",
//           gap: 16,
//           marginBottom: 20,
//         }}
//       >
//         {/* Donut + legend */}
//         <div style={card}>
//           <div
//             style={{
//               fontWeight: 700,
//               fontSize: 15,
//               color: TEXT_DARK,
//               marginBottom: 16,
//             }}
//           >
//             Appointment Status
//           </div>
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <DonutChart
//               segments={
//                 donutSegments.length
//                   ? donutSegments
//                   : [{ label: "No Data", value: 1, color: "#E2E8F0" }]
//               }
//               centerValue={counts.appointments}
//               centerLabel="Total"
//             />
//             <div style={{ display: "flex", gap: 14, marginTop: 8, flexWrap: "wrap", justifyContent: "center" }}>
//               {donutSegments.length ? (
//                 donutSegments.map((seg) => (
//                   <div
//                     key={seg.label}
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: 5,
//                       fontSize: 11,
//                     }}
//                   >
//                     <span
//                       style={{
//                         width: 8,
//                         height: 8,
//                         borderRadius: "50%",
//                         background: seg.color,
//                       }}
//                     />
//                     <span style={{ color: TEXT_MUTED, fontWeight: 500 }}>
//                       {seg.label} ({seg.value})
//                     </span>
//                   </div>
//                 ))
//               ) : (
//                 <span style={{ color: TEXT_MUTED, fontSize: 11 }}>
//                   No appointments yet
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Bar chart */}
//         <div style={card}>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               marginBottom: 12,
//             }}
//           >
//             <span style={{ fontWeight: 700, fontSize: 15, color: TEXT_DARK }}>
//               Appointments Trend (Last 7 Days)
//             </span>
//           </div>
//           <div style={{ marginBottom: 8 }}>
//             <BarChart labels={trendLabels} values={trendValues} />
//           </div>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               marginTop: 8,
//             }}
//           >
//             <div>
//               <span style={{ fontSize: 11, color: TEXT_MUTED }}>
//                 Completed
//               </span>
//               <div style={{ fontSize: 20, fontWeight: 700, color: TEXT_DARK }}>
//                 {statusCounts.Completed}
//               </div>
//             </div>
//             <div>
//               <span style={{ fontSize: 11, color: TEXT_MUTED }}>
//                 Scheduled
//               </span>
//               <div style={{ fontSize: 20, fontWeight: 700, color: TEXT_DARK }}>
//                 {statusCounts.Scheduled}
//               </div>
//             </div>
//             <div>
//               <span style={{ fontSize: 11, color: TEXT_MUTED }}>
//                 Cancelled
//               </span>
//               <div style={{ fontSize: 20, fontWeight: 700, color: TEXT_DARK }}>
//                 {statusCounts.Cancelled}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ═══ PATIENTS TABLE ═══ */}
//       <div style={{ ...card, padding: 0, overflow: "hidden" }}>
//         <div
//           style={{
//             padding: "14px 20px",
//             borderBottom: `1px solid ${BORDER}`,
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <span style={{ fontWeight: 700, fontSize: 15, color: TEXT_DARK }}>
//             Recent Appointments
//           </span>
//           <div style={{ display: "flex", gap: 6 }}>
//             {["Today", "Last Week"].map((t) => (
//               <button
//                 key={t}
//                 onClick={() => setActiveTab(t)}
//                 style={{
//                   border: "none",
//                   borderRadius: 8,
//                   padding: "5px 12px",
//                   cursor: "pointer",
//                   fontSize: 12,
//                   fontWeight: 600,
//                   background: activeTab === t ? GREEN : "transparent",
//                   color: activeTab === t ? "white" : TEXT_MUTED,
//                   transition: "0.2s",
//                 }}
//               >
//                 {t}
//               </button>
//             ))}
//           </div>
//         </div>
//         <table style={{ width: "100%", borderCollapse: "collapse" }}>
//           <thead>
//             <tr style={{ background: GREEN_SOFT }}>
//               {[
//                 "",
//                 "Patient",
//                 "Mobile",
//                 "Date",
//                 "Reason",
//                 "Status",
//               ].map((h) => (
//                 <th
//                   key={h}
//                   style={{
//                     padding: "10px 16px",
//                     textAlign: "left",
//                     fontSize: 11,
//                     fontWeight: 700,
//                     color: TEXT_MUTED,
//                     textTransform: "uppercase",
//                     letterSpacing: "0.4px",
//                   }}
//                 >
//                   {h}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {recentAppointments.length === 0 ? (
//               <tr>
//                 <td
//                   colSpan={6}
//                   style={{
//                     padding: "20px 16px",
//                     textAlign: "center",
//                     color: TEXT_MUTED,
//                     fontSize: 13,
//                   }}
//                 >
//                   No recent appointments found.
//                 </td>
//               </tr>
//             ) : (
//               recentAppointments.map((p, i) => (
//                 <tr
//                   key={p._id || i}
//                   style={{
//                     borderBottom: `1px solid ${BORDER}`,
//                     background: checked[i] ? "#E8F5E9" : "white",
//                   }}
//                 >
//                   <td style={{ padding: "10px 16px" }}>
//                     <div
//                       onClick={() =>
//                         setChecked((c) => ({ ...c, [i]: !c[i] }))
//                       }
//                       style={{
//                         width: 16,
//                         height: 16,
//                         borderRadius: 4,
//                         border: `1.5px solid ${checked[i] ? GREEN : "#ccc"}`,
//                         background: checked[i] ? GREEN : "white",
//                         cursor: "pointer",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                       }}
//                     >
//                       {checked[i] && (
//                         <Icon d={icons.check} size={10} color="white" />
//                       )}
//                     </div>
//                   </td>
//                   <td style={{ padding: "10px 16px" }}>
//                     <div style={{ fontWeight: 600, color: TEXT_DARK }}>
//                       {p.patient_name}
//                     </div>
//                     <div style={{ fontSize: 11, color: "#9ca3af" }}>
//                       {p.appoinmnet_id}
//                     </div>
//                   </td>
//                   <td
//                     style={{
//                       padding: "10px 16px",
//                       fontSize: 12,
//                       color: TEXT_MUTED,
//                     }}
//                   >
//                     {p.patient_mobile}
//                   </td>
//                   <td
//                     style={{
//                       padding: "10px 16px",
//                       fontSize: 12,
//                       color: TEXT_MUTED,
//                     }}
//                   >
//                     {p.appointment_date}
//                   </td>
//                   <td
//                     style={{
//                       padding: "10px 16px",
//                       fontSize: 13,
//                       color: TEXT_DARK,
//                     }}
//                   >
//                     {p.reason_for_comming}
//                   </td>
//                   <td style={{ padding: "10px 16px" }}>
//                     <span
//                       style={{
//                         padding: "3px 10px",
//                         borderRadius: 20,
//                         fontSize: 11,
//                         fontWeight: 600,
//                         background:
//                           p.status === "Cancelled"
//                             ? "#FFE5E3"
//                             : p.status === "Completed"
//                             ? "#D4F3E8"
//                             : "#FFF4DE",
//                         color:
//                           p.status === "Cancelled"
//                             ? "#D63C3C"
//                             : p.status === "Completed"
//                             ? "#1B8A6B"
//                             : "#B37217",
//                       }}
//                     >
//                       {p.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* CSS — unified button with border hover only */}
//       <style>{`
//         @keyframes spin { to { transform: rotate(360deg); } }
        
//         .wb-btn {
//           display: inline-flex;
//           align-items: center;
//           gap: 6px;
//           font-weight: 600;
//           font-size: 12px;
//           padding: 7px 18px;
//           border-radius: 30px;
//           cursor: pointer;
//           background: white;
//           border: 1.5px solid #D1EDE6;
//           color: #2E8B57;
//           transition: border-color 0.2s;
//           font-family: inherit;
//         }
//         .wb-btn:hover {
//           border-color: #2E8B57;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Dashboard;


// Dashboard Page — New Design (200px Welcome Board + Full Revamp)
import React, { useState, useEffect } from "react";
import "../CommonAdmin.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../Environmnet/Apiurl";

// ── Icons ─────────────────────────────────────────────────────────────────────
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
  bed: "M3 9v10M21 9v10M3 14h18M5 9V7a2 2 0 012-2h10a2 2 0 012 2v2",
  doctor:
    "M12 2a5 5 0 110 10A5 5 0 0112 2zM4 22c0-4.418 3.582-8 8-8s8 3.582 8 8",
  patient:
    "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
  appt: "M8 7V3M16 7V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  plus: "M12 5v14M5 12h14",
  arrowUp: "M12 19V5M5 12l7-7 7 7",
  check: "M5 13l4 4L19 7",
  refresh:
    "M21 2v6h-6M3 22v-6h6M3.5 12A8.5 8.5 0 0 1 20.5 8M3.5 12a8.5 8.5 0 0 0 17 4",
  leaf: "M12 2C6 2 3 7 3 12c0 4 2.5 7.5 6 9.5M12 2c6 0 9 5 9 10 0 4-2.5 7.5-6 9.5M12 2v20",
  mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
  calendarCheck:
    "M8 2v2M16 2v2M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z M9 16l2 2 4-4",
  blog: "M4 4h16v16H4z M8 8h8M8 12h8M8 16h5",
};

// ── Colors ────────────────────────────────────────────────────────────────────
const GREEN = "#2E8B57";
const GREEN_SOFT = "#F0FAF4";
const GREEN_LIGHT = "#A8E6CF";
const TEXT_DARK = "#1E2F2B";
const TEXT_MUTED = "#5E7B6E";
const BORDER = "#D1EDE6";
const BG = "#F4FCF8";
const CARD_BG = "#FFFFFF";

// ── Data is now fetched dynamically from the backend (see Dashboard component) ─

const statusColors = {
  Scheduled: "#2E8B57",
  Completed: "#4CAF50",
  Cancelled: "#FF847C",
};

// ── Donut (Redesigned) ──────────────────────────────────────────────────────
function DonutChart({ segments, centerValue, centerLabel }) {
  const cx = 90,
    cy = 90,
    r = 65,
    sw = 20;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
  return (
    <svg viewBox="0 0 180 180" width={150} height={150}>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="#E8F5F1"
        strokeWidth={sw}
      />
      {segments.map((s, i) => {
        const pct = (s.value / total) * 100;
        const dash = (pct / 100) * circ;
        const gap = circ - dash;
        const rot = (offset / 100) * 360 - 90;
        offset += pct;
        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={s.color}
            strokeWidth={sw}
            strokeDasharray={`${dash} ${gap}`}
            strokeDashoffset={0}
            transform={`rotate(${rot} ${cx} ${cy})`}
          />
        );
      })}
      <circle cx={cx} cy={cy} r={r - sw / 2 - 4} fill="white" />
      <text
        x={cx}
        y={cy - 6}
        textAnchor="middle"
        fontSize="11"
        fill={TEXT_MUTED}
        fontWeight="600"
      >
        {centerLabel}
      </text>
      <text
        x={cx}
        y={cy + 16}
        textAnchor="middle"
        fontSize="28"
        fontWeight="800"
        fill={GREEN}
      >
        {centerValue}
      </text>
    </svg>
  );
}

// ── Bar Chart (Appointments trend — last 7 days, real data) ─────────────────
function BarChart({ labels, values }) {
  const W = 400,
    H = 140;
  const pad = { top: 10, right: 10, bottom: 24, left: 24 };
  const chartW = W - pad.left - pad.right;
  const chartH = H - pad.top - pad.bottom;
  const maxV = Math.max(...values, 4);
  const barSlot = chartW / values.length;
  const barW = Math.min(28, barSlot * 0.5);
  const yScale = (v) => chartH - (v / maxV) * chartH;

  const gridTicks = [
    0,
    Math.round(maxV / 2),
    maxV,
  ];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ overflow: "visible" }}>
      {/* Y axis grid */}
      {gridTicks.map((v) => {
        const y = pad.top + yScale(v);
        return (
          <g key={v}>
            <line
              x1={pad.left}
              x2={W - pad.right}
              y1={y}
              y2={y}
              stroke={BORDER}
              strokeWidth="0.8"
              strokeDasharray="3,3"
            />
            <text
              x={pad.left - 5}
              y={y + 3}
              textAnchor="end"
              fontSize="8"
              fill="#9ca3af"
            >
              {v}
            </text>
          </g>
        );
      })}
      {/* Bars */}
      {values.map((v, i) => {
        const x = pad.left + i * barSlot + (barSlot - barW) / 2;
        const y = pad.top + yScale(v);
        const h = chartH - yScale(v);
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={barW}
            height={Math.max(h, 0)}
            rx={4}
            fill={GREEN}
            opacity={0.85}
          />
        );
      })}
      {/* X axis labels */}
      {labels.map((d, i) => (
        <text
          key={i}
          x={pad.left + i * barSlot + barSlot / 2}
          y={H - 4}
          textAnchor="middle"
          fontSize="8"
          fill="#9ca3af"
        >
          {d}
        </text>
      ))}
    </svg>
  );
}

// ═══════════════ MAIN DASHBOARD ═══════════════════════════════════════════════
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Today");
  const [checked, setChecked] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [lastUpdated, setLastUpdated] = useState(new Date()); // NEW: last updated timestamp
  const [userName, setUserName] = useState(
    localStorage.getItem("user_name") || "Admin"
  );

  const [counts, setCounts] = useState({
    appointments: 0,
    users: 0,
    blogs: 0,
    services: 0,
  });
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [allAppointments, setAllAppointments] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [apptRes, userRes, blogRes, serviceRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/appointment`),
        axios.get(`${API_BASE_URL}/user`),
        axios.get(`${API_BASE_URL}/blog`),
        axios.get(`${API_BASE_URL}/service`),
      ]);

      const appointments = apptRes.data || [];
      const users = userRes.data || [];
      const blogs = blogRes.data || [];
      const services = serviceRes.data || [];

      setCounts({
        appointments: appointments.length,
        users: users.length,
        blogs: blogs.length,
        services: services.length,
      });

      setAllAppointments(appointments);
      setRecentAppointments(appointments.slice(0, 7));
    } catch (error) {
      console.error("Dashboard fetch error:", error.message);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleRefresh = () => {
    if (refreshing) return;
    setRefreshing(true);
    fetchDashboardData().finally(() => {
      setRefreshing(false);
      setLastUpdated(new Date());
    });
  };

  // ── Appointment status breakdown (drives the pie/donut chart) ─────────────
  const statusCounts = allAppointments.reduce(
    (acc, a) => {
      const key = a.status || "Scheduled";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    },
    { Scheduled: 0, Completed: 0, Cancelled: 0 }
  );

  const donutSegments = Object.keys(statusCounts)
    .filter((key) => statusCounts[key] > 0)
    .map((key) => ({
      label: key,
      value: statusCounts[key],
      color: statusColors[key] || "#9CA3AF",
    }));

  // ── Appointments per day — last 7 days (drives the bar chart) ──────────────
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d;
  });

  const toDateKey = (d) => d.toISOString().split("T")[0];

  const trendLabels = last7Days.map((d) =>
    d.toLocaleDateString("en-US", { day: "2-digit", month: "short" })
  );

  const trendValues = last7Days.map((d) => {
    const key = toDateKey(d);
    return allAppointments.filter((appointment) => {
      if (!appointment.createdAt) return false;
      return toDateKey(new Date(appointment.createdAt)) === key;
    }).length;
  });

  // Common card style
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
        background: BG,
        padding: "24px 28px",
        minHeight: "100vh",
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        fontSize: 14,
      }}
    >
      {/* ═══ HEADER with Page Title & Refresh ═══ */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        {/* LEFT: Page Title */}
        <h1
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: TEXT_DARK,
            margin: 0,
          }}
        >
          Dashboard
        </h1>

        {/* RIGHT: Refresh button + Last updated */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* Last updated indicator */}
          {/* <span
            style={{
              fontSize: 11,
              color: TEXT_MUTED,
              fontWeight: 500,
            }}
          >
            Last updated:{" "}
            <span style={{ fontWeight: 600, color: TEXT_DARK }}>
              {lastUpdated.toLocaleTimeString()}
            </span>
          </span> */}

          <button
            onClick={handleRefresh}
            disabled={refreshing}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 16px",
              borderRadius: 10,
              background: "white",
              border: `1.5px solid ${BORDER}`,
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
              color: GREEN,
            }}
          >
            <span
              style={{
                animation: refreshing ? "spin 0.8s linear infinite" : "none",
              }}
            >
              <Icon d={icons.refresh} size={14} color={GREEN} />
            </span>
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      {/* ═══ WELCOME BOARD (height 200px) ═══ */}
      <div
        style={{
          ...card,
          height: 200,
          padding: 0,
          marginBottom: 20,
          overflow: "hidden",
          display: "flex",
          alignItems: "stretch",
          background: "white",
        }}
      >
        {/* Left side — user info + action buttons */}
        <div
          style={{
            flex: "1 1 55%",
            padding: "24px 28px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <span
            style={{
              fontSize: 12,
              color: TEXT_MUTED,
              fontWeight: 600,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}
          >
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              day: "numeric",
              month: "short",
            })}
          </span>
          <h2
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: TEXT_DARK,
              margin: "4px 0 6px",
            }}
          >
            {greeting}, <span style={{ color: GREEN }}>{userName}</span>
          </h2>
          <p style={{ fontSize: 13, color: TEXT_MUTED, margin: 0 }}>
            {localStorage.getItem("user_role") || "Admin"} • 4Health Homeopathy Hospital
          </p>
          <div style={{ marginTop: 10, display: "flex", gap: 16 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontSize: 12,
                color: TEXT_MUTED,
              }}
            >
              <span
                style={{
                  background: GREEN_SOFT,
                  borderRadius: 4,
                  padding: "2px 6px",
                  fontWeight: 700,
                  color: GREEN,
                }}
              >
                {counts.appointments}
              </span>{" "}
              Total Appointments
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ marginTop: 14, display: "flex", gap: 10 }}>
            <button
              className="wb-btn"
              onClick={() => navigate("/admin/enquire")}
            >
              <Icon d={icons.mail} size={14} color={GREEN} />
              Enquire
            </button>
            <button
              className="wb-btn"
              onClick={() => navigate("/admin/appoinment")}
            >
              <Icon d={icons.calendarCheck} size={14} color={GREEN} />
              Appointment
            </button>
            <button className="wb-btn" onClick={() => navigate("/admin/blog")}>
              <Icon d={icons.blog} size={14} color={GREEN} />
              Blog
            </button>
          </div>
        </div>

        {/* Right side — image */}
        <div
          style={{ flex: "0 0 45%", position: "relative", overflow: "hidden" }}
        >
          <img
            src={require("../../../../assets/Image/AdminDash/admin-dash-banner.jpg")}
            alt="Homeopathic medicine"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to left, rgba(255,255,255,0) 50%, rgba(255,255,255,1) 100%)",
            }}
          />
        </div>
      </div>

      {/* ═══ STAT CARDS ═══ */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 14,
          marginBottom: 20,
        }}
      >
        {[
          {
            icon: icons.calendarCheck,
            title: "Appointments",
            value: counts.appointments,
            trend: "Total",
            color: "#9C27B0",
            bg: "#F3E5F5",
            path: "/admin/appoinment",
          },
          {
            icon: icons.patient,
            title: "Users",
            value: counts.users,
            trend: "Registered",
            color: "#FF9800",
            bg: "#FFF3E0",
            path: "/admin/user",
          },
          {
            icon: icons.blog,
            title: "Blog",
            value: counts.blogs,
            trend: "Published",
            color: "#2196F3",
            bg: "#E3F2FD",
            path: "/admin/blog",
          },
          {
            icon: icons.leaf,
            title: "Service",
            value: counts.services,
            trend: "Active",
            color: "#4CAF50",
            bg: "#E8F5E9",
            path: "/admin/treatment",
          },
        ].map((s, i) => (
          <div
            key={i}
            onClick={() => navigate(s.path)}
            style={{
              ...card,
              display: "flex",
              alignItems: "center",
              gap: 14,
              cursor: "pointer",
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
              <div style={{ fontSize: 12, color: TEXT_MUTED, fontWeight: 600 }}>
                {s.title}
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
        ))}
      </div>

      {/* ═══ CHARTS ROW ═══ */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.6fr",
          gap: 16,
          marginBottom: 20,
        }}
      >
        {/* Donut + legend */}
        <div style={card}>
          <div
            style={{
              fontWeight: 700,
              fontSize: 15,
              color: TEXT_DARK,
              marginBottom: 16,
            }}
          >
            Appointment Status
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <DonutChart
              segments={
                donutSegments.length
                  ? donutSegments
                  : [{ label: "No Data", value: 1, color: "#E2E8F0" }]
              }
              centerValue={counts.appointments}
              centerLabel="Total"
            />
            <div style={{ display: "flex", gap: 14, marginTop: 8, flexWrap: "wrap", justifyContent: "center" }}>
              {donutSegments.length ? (
                donutSegments.map((seg) => (
                  <div
                    key={seg.label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      fontSize: 11,
                    }}
                  >
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: seg.color,
                      }}
                    />
                    <span style={{ color: TEXT_MUTED, fontWeight: 500 }}>
                      {seg.label} ({seg.value})
                    </span>
                  </div>
                ))
              ) : (
                <span style={{ color: TEXT_MUTED, fontSize: 11 }}>
                  No appointments yet
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Bar chart */}
        <div style={card}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <span style={{ fontWeight: 700, fontSize: 15, color: TEXT_DARK }}>
              Appointments Trend (Last 7 Days)
            </span>
          </div>
          <div style={{ marginBottom: 8 }}>
            <BarChart labels={trendLabels} values={trendValues} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 8,
            }}
          >
            <div>
              <span style={{ fontSize: 11, color: TEXT_MUTED }}>
                Completed
              </span>
              <div style={{ fontSize: 20, fontWeight: 700, color: TEXT_DARK }}>
                {statusCounts.Completed}
              </div>
            </div>
            <div>
              <span style={{ fontSize: 11, color: TEXT_MUTED }}>
                Scheduled
              </span>
              <div style={{ fontSize: 20, fontWeight: 700, color: TEXT_DARK }}>
                {statusCounts.Scheduled}
              </div>
            </div>
            <div>
              <span style={{ fontSize: 11, color: TEXT_MUTED }}>
                Cancelled
              </span>
              <div style={{ fontSize: 20, fontWeight: 700, color: TEXT_DARK }}>
                {statusCounts.Cancelled}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ PATIENTS TABLE ═══ */}
      <div style={{ ...card, padding: 0, overflow: "hidden" }}>
        <div
          style={{
            padding: "14px 20px",
            borderBottom: `1px solid ${BORDER}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontWeight: 700, fontSize: 15, color: TEXT_DARK }}>
            Recent Appointments
          </span>
          <div style={{ display: "flex", gap: 6 }}>
            {["Today", "Last Week"].map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                style={{
                  border: "none",
                  borderRadius: 8,
                  padding: "5px 12px",
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: 600,
                  background: activeTab === t ? GREEN : "transparent",
                  color: activeTab === t ? "white" : TEXT_MUTED,
                  transition: "0.2s",
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: GREEN_SOFT }}>
              {[
                "",
                "Patient",
                "Mobile",
                "Service",
                "Message",
                "Status",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "10px 16px",
                    textAlign: "left",
                    fontSize: 11,
                    fontWeight: 700,
                    color: TEXT_MUTED,
                    textTransform: "uppercase",
                    letterSpacing: "0.4px",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentAppointments.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  style={{
                    padding: "20px 16px",
                    textAlign: "center",
                    color: TEXT_MUTED,
                    fontSize: 13,
                  }}
                >
                  No recent appointments found.
                </td>
              </tr>
            ) : (
              recentAppointments.map((p, i) => (
                <tr
                  key={p._id || i}
                  style={{
                    borderBottom: `1px solid ${BORDER}`,
                    background: checked[i] ? "#E8F5E9" : "white",
                  }}
                >
                  <td style={{ padding: "10px 16px" }}>
                    <div
                      onClick={() =>
                        setChecked((c) => ({ ...c, [i]: !c[i] }))
                      }
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: 4,
                        border: `1.5px solid ${checked[i] ? GREEN : "#ccc"}`,
                        background: checked[i] ? GREEN : "white",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {checked[i] && (
                        <Icon d={icons.check} size={10} color="white" />
                      )}
                    </div>
                  </td>
                  <td style={{ padding: "10px 16px" }}>
                    <div style={{ fontWeight: 600, color: TEXT_DARK }}>
                      {p.patient_name}
                    </div>
                    <div style={{ fontSize: 11, color: "#9ca3af" }}>
                      {p.appoinmnet_id}
                    </div>
                  </td>
                  <td
                    style={{
                      padding: "10px 16px",
                      fontSize: 12,
                      color: TEXT_MUTED,
                    }}
                  >
                    {p.patient_mobile}
                  </td>
                  <td
                    style={{
                      padding: "10px 16px",
                      fontSize: 12,
                      color: TEXT_MUTED,
                    }}
                  >
                    {p.service || p.reason_for_comming || "-"}
                  </td>
                  <td
                    style={{
                      padding: "10px 16px",
                      fontSize: 13,
                      color: TEXT_DARK,
                    }}
                  >
                    {p.message || "-"}
                  </td>
                  <td style={{ padding: "10px 16px" }}>
                    <span
                      style={{
                        padding: "3px 10px",
                        borderRadius: 20,
                        fontSize: 11,
                        fontWeight: 600,
                        background:
                          p.status === "Cancelled"
                            ? "#FFE5E3"
                            : p.status === "Completed"
                            ? "#D4F3E8"
                            : "#FFF4DE",
                        color:
                          p.status === "Cancelled"
                            ? "#D63C3C"
                            : p.status === "Completed"
                            ? "#1B8A6B"
                            : "#B37217",
                      }}
                    >
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* CSS — unified button with border hover only */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        
        .wb-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-weight: 600;
          font-size: 12px;
          padding: 7px 18px;
          border-radius: 30px;
          cursor: pointer;
          background: white;
          border: 1.5px solid #D1EDE6;
          color: #2E8B57;
          transition: border-color 0.2s;
          font-family: inherit;
        }
        .wb-btn:hover {
          border-color: #2E8B57;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;