// import React, { useState, useRef, useEffect, useCallback } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   FaSearch,
//   FaBell,
//   FaChevronDown,
//   FaSignOutAlt,
//   FaUser,
//   FaCog,
//   FaUserCircle,
//   FaQuestionCircle,
//   FaTimes,
//   FaCalendarCheck,
//   FaClock,
// } from "react-icons/fa";
// import { BsGrid1X2Fill } from "react-icons/bs";
// import API_BASE_URL from "../Environmnet/Apiurl";
// import "./AdminNav.css";

// // ── Local storage key that tracks which appointment IDs the admin has already seen ──
// const SEEN_KEY = "seen_appointment_ids";

// const getSeenIds = () => {
//   try {
//     return JSON.parse(localStorage.getItem(SEEN_KEY)) || [];
//   } catch {
//     return [];
//   }
// };

// const saveSeenIds = (ids) => {
//   localStorage.setItem(SEEN_KEY, JSON.stringify(ids));
// };

// // ── "5 min ago" style relative time formatter ──
// const timeAgo = (dateString) => {
//   if (!dateString) return "";
//   const date = new Date(dateString);
//   const seconds = Math.floor((new Date() - date) / 1000);

//   if (seconds < 60) return "Just now";
//   const minutes = Math.floor(seconds / 60);
//   if (minutes < 60) return `${minutes} min ago`;
//   const hours = Math.floor(minutes / 60);
//   if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
//   const days = Math.floor(hours / 24);
//   return `${days} day${days > 1 ? "s" : ""} ago`;
// };

// const AdminNav = () => {
//   const navigate = useNavigate();
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [notificationOpen, setNotificationOpen] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [userName, setUserName] = useState(localStorage.getItem("user_name") || "Admin");
//   const [userRole, setUserRole] = useState(localStorage.getItem("user_role") || "Admin");
//   const [notifications, setNotifications] = useState([]);
//   const notificationRef = useRef(null);
//   const profileRef = useRef(null);
//   const searchRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (notificationRef.current && !notificationRef.current.contains(event.target))
//         setNotificationOpen(false);
//       if (profileRef.current && !profileRef.current.contains(event.target))
//         setProfileOpen(false);
//       if (searchRef.current && !searchRef.current.contains(event.target))
//         setSearchOpen(false);
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // ── Fetch latest appointments and turn them into notifications ──
//   const fetchNotifications = useCallback(async () => {
//     try {
//       const res = await axios.get(`${API_BASE_URL}/appointment`);
//       const appointments = res.data || [];
//       const seenIds = getSeenIds();

//       // Backend already returns newest first (sorted by _id: -1)
//       const latest = appointments.slice(0, 10).map((a) => ({
//         id: a._id,
//         icon: <FaCalendarCheck className="text-success" />,
//         title: "New Appointment",
//         message: `${a.patient_name} booked an appointment${
//           a.appointment_date ? ` for ${a.appointment_date}` : ""
//         }${a.time_schedule ? ` at ${a.time_schedule}` : ""}`,
//         time: timeAgo(a.createdAt),
//         read: seenIds.includes(a._id),
//       }));

//       setNotifications(latest);
//     } catch (error) {
//       console.error("Failed to load notifications:", error.message);
//     }
//   }, []);

//   useEffect(() => {
//     fetchNotifications();
//     // Poll for new appointments every 30 seconds
//     const interval = setInterval(fetchNotifications, 30000);
//     return () => clearInterval(interval);
//   }, [fetchNotifications]);

//   // ── Mark all current notifications as seen when the panel is opened ──
//   const handleOpenNotifications = () => {
//     const opening = !notificationOpen;
//     setNotificationOpen(opening);
//     if (opening && notifications.length) {
//       const allIds = notifications.map((n) => n.id);
//       const seenIds = Array.from(new Set([...getSeenIds(), ...allIds]));
//       saveSeenIds(seenIds);
//       setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("adminToken");
//     localStorage.removeItem("user_name");
//     localStorage.removeItem("user_role");
//     navigate("/login");
//   };

//   const handleSearchKeyDown = (e) => {
//     if (e.key === "Enter" && searchQuery.trim()) {
//       console.log("Searching:", searchQuery);
//       setSearchOpen(false);
//     }
//   };

//   const unreadCount = notifications.filter((n) => !n.read).length;

//   return (
//     <>
//       <nav className="admin-navbar bg-white border-bottom px-3 px-lg-4 d-flex align-items-center">
//         <div className="d-flex align-items-center justify-content-between w-100">
//           {/* Left – Brand */}
//           <div className="d-flex align-items-center gap-2">
//             {/* <BsGrid1X2Fill size={18} className="admin-nav-icon" />
//             <span className="fw-bold d-none d-sm-inline admin-brand-text">
//               Dashboard
//             </span> */}
//           </div>

//           {/* Center – Search */}
//           <div
//             className="position-relative flex-grow-1 mx-4"
//             style={{ maxWidth: "500px" }}
//             ref={searchRef}
//           >
//             <div
//               className={`d-flex align-items-center rounded-3 px-3 py-2 admin-search-input ${
//                 searchQuery ? "border-success shadow-sm" : ""
//               }`}
//             >
//               <FaSearch className="text-secondary me-2" size={16} />
//               <input
//                 type="text"
//                 placeholder="Search patients, appointments..."
//                 className="border-0 bg-transparent flex-grow-1 admin-search-field"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 onKeyDown={handleSearchKeyDown}
//                 onFocus={() => setSearchOpen(true)}
//                 onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
//               />
//               {searchQuery && (
//                 <button
//                   className="border-0 bg-transparent text-secondary p-0"
//                   onClick={() => setSearchQuery("")}
//                 >
//                   <FaTimes size={14} />
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* Right – Notifications & Profile */}
//           <div className="d-flex align-items-center gap-2">
//             {/* Notification Bell */}
//             <div className="position-relative" ref={notificationRef}>
//               <button
//                 className={`btn position-relative rounded-circle d-flex align-items-center justify-content-center admin-icon-btn ${
//                   notificationOpen ? "admin-icon-btn-active" : ""
//                 }`}
//                 onClick={handleOpenNotifications}
//               >
//                 <FaBell size={20} />
//                 {unreadCount > 0 && (
//                   <span className="position-absolute top-0 end-0 translate-middle badge rounded-circle bg-danger p-1 admin-badge">
//                     {unreadCount}
//                   </span>
//                 )}
//               </button>
//             </div>

//             {/* Profile */}
//             <div className="position-relative" ref={profileRef}>
//               <button
//                 className={`btn d-flex align-items-center gap-2 rounded-5 px-2 py-1 admin-profile-btn ${
//                   profileOpen ? "admin-profile-btn-active" : ""
//                 }`}
//                 onClick={() => setProfileOpen(!profileOpen)}
//               >
//                 <FaUserCircle size={34} className="admin-avatar text-secondary" />
//                 <div className="d-none d-md-block text-start">
//                   <div className="fw-semibold admin-profile-name">{userName}</div>
//                   <div className="text-secondary admin-profile-role">{userRole}</div>
//                 </div>
//                 <FaChevronDown
//                   size={12}
//                   className={`text-secondary admin-chevron ${
//                     profileOpen ? "rotate-180" : ""
//                   }`}
//                 />
//               </button>

//               {profileOpen && (
//                 <div className="position-absolute end-0 mt-2 bg-white rounded-3 shadow-lg border admin-dropdown-menu">
//                   <div className="d-flex align-items-center gap-3 px-4 py-3 border-bottom">
//                     <FaUserCircle size={42} className="admin-avatar-lg text-secondary" />
//                     <div>
//                       <h6 className="fw-bold m-0 admin-dropdown-name">{userName}</h6>
//                       <span className="text-secondary admin-dropdown-email">
//                         {userRole}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="py-1">
//                     <Link
//                       to="/admin/profile"
//                       className="d-flex align-items-center gap-3 px-4 py-2 text-decoration-none text-secondary admin-dropdown-link"
//                     >
//                       <FaUser size={16} /> My Profile
//                     </Link>
//                     <Link
//                       to="/admin/settings"
//                       className="d-flex align-items-center gap-3 px-4 py-2 text-decoration-none text-secondary admin-dropdown-link"
//                     >
//                       <FaCog size={16} /> Settings
//                     </Link>
//                     <Link
//                       to="/admin/help"
//                       className="d-flex align-items-center gap-3 px-4 py-2 text-decoration-none text-secondary admin-dropdown-link"
//                     >
//                       <FaQuestionCircle size={16} /> Help & Support
//                     </Link>
//                   </div>
//                   <div className="border-top my-1"></div>
//                   <button
//                     className="d-flex align-items-center gap-3 w-100 border-0 bg-transparent px-4 py-2 text-danger admin-dropdown-link admin-logout-btn"
//                     onClick={handleLogout}
//                   >
//                     <FaSignOutAlt size={16} /> Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Notification Side Panel */}
//       <div
//         className={`admin-notification-panel ${
//           notificationOpen ? "open" : ""
//         }`}
//       >
//         <div className="admin-notification-header">
//           <h5 className="fw-bold m-0">Notifications</h5>
//           <button
//             className="border-0 bg-transparent text-secondary"
//             onClick={() => setNotificationOpen(false)}
//           >
//             <FaTimes size={20} />
//           </button>
//         </div>
//         <div className="admin-notification-body">
//           {notifications.length === 0 ? (
//             <div className="text-center text-secondary py-4" style={{ fontSize: 13 }}>
//               No notifications yet.
//             </div>
//           ) : (
//             notifications.map((notif) => (
//               <div
//                 key={notif.id}
//                 className={`admin-notification-item ${
//                   notif.read ? "read" : "unread"
//                 }`}
//               >
//                 <div className="admin-notification-icon">{notif.icon}</div>
//                 <div className="admin-notification-content">
//                   <h6>{notif.title}</h6>
//                   <p>{notif.message}</p>
//                   <span>
//                     <FaClock size={10} /> {notif.time}
//                   </span>
//                 </div>
//                 {!notif.read && <span className="admin-notification-dot"></span>}
//               </div>
//             ))
//           )}
//         </div>
//         <div className="admin-notification-footer">
//           <button
//             className="btn btn-link text-success fw-semibold text-decoration-none w-100"
//             onClick={() => {
//               setNotificationOpen(false);
//               navigate("/admin/appoinment");
//             }}
//           >
//             View All Appointments
//           </button>
//         </div>
//       </div>

//       {notificationOpen && (
//         <div
//           className="admin-notification-overlay"
//           onClick={() => setNotificationOpen(false)}
//         ></div>
//       )}
//     </>
//   );
// };

// export default AdminNav;


import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaSearch,
  FaBell,
  FaChevronDown,
  FaSignOutAlt,
  FaUser,
  FaCog,
  FaUserCircle,
  FaQuestionCircle,
  FaTimes,
  FaCalendarCheck,
  FaClock,
} from "react-icons/fa";
import { BsGrid1X2Fill } from "react-icons/bs";
import API_BASE_URL from "../Environmnet/Apiurl";
import "./AdminNav.css";

// ── Local storage key that tracks which appointment IDs the admin has already seen ──
const SEEN_KEY = "seen_appointment_ids";

const getSeenIds = () => {
  try {
    return JSON.parse(localStorage.getItem(SEEN_KEY)) || [];
  } catch {
    return [];
  }
};

const saveSeenIds = (ids) => {
  localStorage.setItem(SEEN_KEY, JSON.stringify(ids));
};

// ── "5 min ago" style relative time formatter ──
const timeAgo = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const seconds = Math.floor((new Date() - date) / 1000);

  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
};

const AdminNav = () => {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userName, setUserName] = useState(localStorage.getItem("user_name") || "Admin");
  const [userRole, setUserRole] = useState(localStorage.getItem("user_role") || "Admin");
  const [notifications, setNotifications] = useState([]);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target))
        setNotificationOpen(false);
      if (profileRef.current && !profileRef.current.contains(event.target))
        setProfileOpen(false);
      if (searchRef.current && !searchRef.current.contains(event.target))
        setSearchOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ── Fetch latest appointments and turn them into notifications ──
  const fetchNotifications = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/appointment`);
      const appointments = res.data || [];
      const seenIds = getSeenIds();

      // Backend already returns newest first (sorted by _id: -1)
      const latest = appointments.slice(0, 10).map((a) => ({
        id: a._id,
        icon: <FaCalendarCheck className="text-success" />,
        title: "New Appointment",
        message: `${a.patient_name} requested ${
          a.service || a.reason_for_comming || "an appointment"
        }`,
        time: timeAgo(a.createdAt),
        read: seenIds.includes(a._id),
      }));

      setNotifications(latest);
    } catch (error) {
      console.error("Failed to load notifications:", error.message);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
    // Poll for new appointments every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  // ── Mark all current notifications as seen when the panel is opened ──
  const handleOpenNotifications = () => {
    const opening = !notificationOpen;
    setNotificationOpen(opening);
    if (opening && notifications.length) {
      const allIds = notifications.map((n) => n.id);
      const seenIds = Array.from(new Set([...getSeenIds(), ...allIds]));
      saveSeenIds(seenIds);
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_role");
    navigate("/login");
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      console.log("Searching:", searchQuery);
      setSearchOpen(false);
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <>
      <nav className="admin-navbar bg-white border-bottom px-3 px-lg-4 d-flex align-items-center">
        <div className="d-flex align-items-center justify-content-between w-100">
          {/* Left – Brand */}
          <div className="d-flex align-items-center gap-2">
            {/* <BsGrid1X2Fill size={18} className="admin-nav-icon" />
            <span className="fw-bold d-none d-sm-inline admin-brand-text">
              Dashboard
            </span> */}
          </div>

          {/* Center – Search */}
          <div
            className="position-relative flex-grow-1 mx-4"
            style={{ maxWidth: "500px" }}
            ref={searchRef}
          >
            <div
              className={`d-flex align-items-center rounded-3 px-3 py-2 admin-search-input ${
                searchQuery ? "border-success shadow-sm" : ""
              }`}
            >
              <FaSearch className="text-secondary me-2" size={16} />
              <input
                type="text"
                placeholder="Search patients, appointments..."
                className="border-0 bg-transparent flex-grow-1 admin-search-field"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                onFocus={() => setSearchOpen(true)}
                onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
              />
              {searchQuery && (
                <button
                  className="border-0 bg-transparent text-secondary p-0"
                  onClick={() => setSearchQuery("")}
                >
                  <FaTimes size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Right – Notifications & Profile */}
          <div className="d-flex align-items-center gap-2">
            {/* Notification Bell */}
            <div className="position-relative" ref={notificationRef}>
              <button
                className={`btn position-relative rounded-circle d-flex align-items-center justify-content-center admin-icon-btn ${
                  notificationOpen ? "admin-icon-btn-active" : ""
                }`}
                onClick={handleOpenNotifications}
              >
                <FaBell size={20} />
                {unreadCount > 0 && (
                  <span className="position-absolute top-0 end-0 translate-middle badge rounded-circle bg-danger p-1 admin-badge">
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>

            {/* Profile */}
            <div className="position-relative" ref={profileRef}>
              <button
                className={`btn d-flex align-items-center gap-2 rounded-5 px-2 py-1 admin-profile-btn ${
                  profileOpen ? "admin-profile-btn-active" : ""
                }`}
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <FaUserCircle size={34} className="admin-avatar text-secondary" />
                <div className="d-none d-md-block text-start">
                  <div className="fw-semibold admin-profile-name">{userName}</div>
                  <div className="text-secondary admin-profile-role">{userRole}</div>
                </div>
                <FaChevronDown
                  size={12}
                  className={`text-secondary admin-chevron ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {profileOpen && (
                <div className="position-absolute end-0 mt-2 bg-white rounded-3 shadow-lg border admin-dropdown-menu">
                  <div className="d-flex align-items-center gap-3 px-4 py-3 border-bottom">
                    <FaUserCircle size={42} className="admin-avatar-lg text-secondary" />
                    <div>
                      <h6 className="fw-bold m-0 admin-dropdown-name">{userName}</h6>
                      <span className="text-secondary admin-dropdown-email">
                        {userRole}
                      </span>
                    </div>
                  </div>
                  <div className="py-1">
                    <Link
                      to="/admin/profile"
                      className="d-flex align-items-center gap-3 px-4 py-2 text-decoration-none text-secondary admin-dropdown-link"
                    >
                      <FaUser size={16} /> My Profile
                    </Link>
                    <Link
                      to="/admin/settings"
                      className="d-flex align-items-center gap-3 px-4 py-2 text-decoration-none text-secondary admin-dropdown-link"
                    >
                      <FaCog size={16} /> Settings
                    </Link>
                    <Link
                      to="/admin/help"
                      className="d-flex align-items-center gap-3 px-4 py-2 text-decoration-none text-secondary admin-dropdown-link"
                    >
                      <FaQuestionCircle size={16} /> Help & Support
                    </Link>
                  </div>
                  <div className="border-top my-1"></div>
                  <button
                    className="d-flex align-items-center gap-3 w-100 border-0 bg-transparent px-4 py-2 text-danger admin-dropdown-link admin-logout-btn"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Notification Side Panel */}
      <div
        className={`admin-notification-panel ${
          notificationOpen ? "open" : ""
        }`}
      >
        <div className="admin-notification-header">
          <h5 className="fw-bold m-0">Notifications</h5>
          <button
            className="border-0 bg-transparent text-secondary"
            onClick={() => setNotificationOpen(false)}
          >
            <FaTimes size={20} />
          </button>
        </div>
        <div className="admin-notification-body">
          {notifications.length === 0 ? (
            <div className="text-center text-secondary py-4" style={{ fontSize: 13 }}>
              No notifications yet.
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`admin-notification-item ${
                  notif.read ? "read" : "unread"
                }`}
              >
                <div className="admin-notification-icon">{notif.icon}</div>
                <div className="admin-notification-content">
                  <h6>{notif.title}</h6>
                  <p>{notif.message}</p>
                  <span>
                    <FaClock size={10} /> {notif.time}
                  </span>
                </div>
                {!notif.read && <span className="admin-notification-dot"></span>}
              </div>
            ))
          )}
        </div>
        <div className="admin-notification-footer">
          <button
            className="btn btn-link text-success fw-semibold text-decoration-none w-100"
            onClick={() => {
              setNotificationOpen(false);
              navigate("/admin/appoinment");
            }}
          >
            View All Appointments
          </button>
        </div>
      </div>

      {notificationOpen && (
        <div
          className="admin-notification-overlay"
          onClick={() => setNotificationOpen(false)}
        ></div>
      )}
    </>
  );
};

export default AdminNav;