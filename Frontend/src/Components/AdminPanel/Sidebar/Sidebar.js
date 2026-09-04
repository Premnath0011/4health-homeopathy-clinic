// //Admin Sidebar
// import React, { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import {
//   FaHome,
//   FaUsers,
//   FaEnvelope,
//   FaCalendarCheck,
//   FaBlog,
//   FaServicestack,
//   FaChevronDown,
//   FaChevronUp,
//   FaSignOutAlt,
//   FaHospital,
//   FaCog,
//   FaHeadset,
//   FaBars,
//   FaArrowLeft,
//   FaArrowRight,
//   FaQuoteRight,
// } from "react-icons/fa";
// import { BsGrid1X2Fill } from "react-icons/bs";
// // Homepage image assets – same as used in your Home.jsx
// import Logo from "../../../assets/Image/4health_logo_transparent.png";
// import CollopseLogo from "../../../assets/Image/4health_logo_transparent_icon.png";
// import leafPng from "../../../assets/Image/Home/Leaf.png";
// import potImg from "../../../assets/Image/Home/pot-img.png";
// import "./Sidebar.css";

// const Sidebar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [isSettingsOpen, setIsSettingsOpen] = useState(false);
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [isMobileOpen, setIsMobileOpen] = useState(false);

//   const isActive = (path) => location.pathname === path;

//   const handleLogout = () => {
//     localStorage.removeItem("adminToken");
//     navigate("/login");
//   };

//   const toggleSidebar = () => setIsCollapsed(!isCollapsed);
//   const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

//   useEffect(() => {
//     const adminContent = document.querySelector(".admin-content");
//     const adminNav = document.querySelector(".admin-navbar");
//     if (adminContent && adminNav) {
//       if (isCollapsed) {
//         adminContent.classList.add("collapsed");
//         adminNav.classList.add("collapsed");
//       } else {
//         adminContent.classList.remove("collapsed");
//         adminNav.classList.remove("collapsed");
//       }
//     }
//   }, [isCollapsed]);

//   const menuItems = [
//     { path: "/admin/dash", icon: <BsGrid1X2Fill size={18} />, label: "Dashboard" },
//     { path: "/admin/user", icon: <FaUsers size={18} />, label: "User" },
//     { path: "/admin/enquire", icon: <FaEnvelope size={18} />, label: "Enquiries" },
//     { path: "/admin/appoinment", icon: <FaCalendarCheck size={18} />, label: "Appointments" },
//     { path: "/admin/blog", icon: <FaBlog size={18} />, label: "Blog" },
//     { path: "/admin/testimonial", icon: <FaQuoteRight size={18} />, label: "Testimonials" },
//     { path: "/admin/treatment", icon: <FaServicestack size={18} />, label: "Treatments" },
//   ];

//   return (
//     <>
//       {/* Mobile toggle – styled like homepage outline button */}
//       <button
//         className="admin-sidebar-mobile-toggle btn"
//         onClick={toggleMobile}
//         aria-label="Toggle navigation"
//       >
//         <FaBars size={20} />
//       </button>

//       {isMobileOpen && (
//         <div className="admin-sidebar-overlay" onClick={toggleMobile}></div>
//       )}

//       <aside
//         className={`admin-sidebar bg-white ${isCollapsed ? "collapsed" : ""} ${
//           isMobileOpen ? "mobile-open" : ""
//         }`}
//       >
//         {/* Decorative leaves – absolute positioned */}
//         <img
//           src={leafPng}
//           alt=""
//           className="admin-leaf-top-right"
//           aria-hidden="true"
//         />
//         <img
//           src={leafPng}
//           alt=""
//           className="admin-leaf-bottom-left"
//           aria-hidden="true"
//         />
//         <img
//           src={potImg}
//           alt=""
//           className="admin-pot-accent"
//           aria-hidden="true"
//         />

//         {/* Brand */}
//         <div className="admin-sidebar-brand">
//           <div className="admin-sidebar-brand-inner position-relative">
//             {/* Subtle leaf behind logo */}
//             <img
//               src={leafPng}
//               alt=""
//               className="admin-brand-leaf"
//               aria-hidden="true"
//             />
//             {!isCollapsed ? (
//               <img src={Logo} alt="Four Health" className="admin-logo-full" />
//             ) : (
//               <img
//                 src={CollopseLogo}
//                 alt="Four Health"
//                 className="admin-logo-collapsed"
//               />
//             )}
//           </div>
//         </div>

//         {/* Navigation */}
//         <nav className="admin-sidebar-nav">
//           {menuItems.map((item) => (
//             <Link
//               key={item.path}
//               to={item.path}
//               className={`admin-sidebar-link ${isActive(item.path) ? "active" : ""}`}
//               title={isCollapsed ? item.label : ""}
//             >
//               <span className="admin-sidebar-icon">{item.icon}</span>
//               {!isCollapsed && (
//                 <span className="admin-sidebar-label">{item.label}</span>
//               )}
//               {!isCollapsed && isActive(item.path) && (
//                 <span className="admin-sidebar-dot"></span>
//               )}
//             </Link>
//           ))}

//           {/* Settings Dropdown */}
//           <div className="admin-sidebar-dropdown">
//             <button
//               className={`admin-sidebar-link dropdown-toggle ${
//                 isActive("/admin/settings") ? "active" : ""
//               }`}
//               onClick={() => !isCollapsed && setIsSettingsOpen(!isSettingsOpen)}
//               title={isCollapsed ? "Settings" : ""}
//             >
//               <span className="admin-sidebar-icon">
//                 <FaCog size={18} />
//               </span>
//               {!isCollapsed && (
//                 <span className="admin-sidebar-label">Settings</span>
//               )}
//               {!isCollapsed && (
//                 <span className="admin-dropdown-arrow">
//                   {isSettingsOpen ? (
//                     <FaChevronUp size={12} />
//                   ) : (
//                     <FaChevronDown size={12} />
//                   )}
//                 </span>
//               )}
//             </button>
//             {!isCollapsed && (
//               <div
//                 className={`admin-dropdown-menu ${isSettingsOpen ? "open" : ""}`}
//               >
//                 <Link to="/admin/settings/general" className="admin-dropdown-item">
//                   <FaCog size={14} />
//                   General
//                 </Link>
//                 <Link to="/admin/settings/help" className="admin-dropdown-item">
//                   <FaHeadset size={14} />
//                   Help & Center
//                 </Link>
//               </div>
//             )}
//           </div>

//           {/* Collapse / Expand */}
//           <div className="admin-sidebar-collapse-wrapper">
//             <button
//               className="admin-sidebar-link collapse-btn"
//               onClick={toggleSidebar}
//               title={isCollapsed ? "Expand" : "Collapse"}
//             >
//               <span className="admin-sidebar-icon">
//                 {isCollapsed ? (
//                   <FaArrowRight size={16} />
//                 ) : (
//                   <FaArrowLeft size={16} />
//                 )}
//               </span>
//               {!isCollapsed && (
//                 <span className="admin-sidebar-label">Collapse</span>
//               )}
//             </button>
//           </div>

//           {/* Logout */}
//           <button
//             className="admin-sidebar-link logout"
//             onClick={handleLogout}
//             title={isCollapsed ? "Logout" : ""}
//           >
//             <span className="admin-sidebar-icon">
//               <FaSignOutAlt size={18} />
//             </span>
//             {!isCollapsed && (
//               <span className="admin-sidebar-label">Logout</span>
//             )}
//           </button>
//         </nav>
//       </aside>
//     </>
//   );
// };

// export default Sidebar;


//Admin Sidebar
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaEnvelope,
  FaCalendarCheck,
  FaBlog,
  FaServicestack,
  FaChevronDown,
  FaChevronUp,
  FaSignOutAlt,
  FaHospital,
  FaCog,
  FaHeadset,
  FaBars,
  FaArrowLeft,
  FaArrowRight,
  FaQuoteRight,
  FaImages,
} from "react-icons/fa";
import { BsGrid1X2Fill } from "react-icons/bs";
// Homepage image assets – same as used in your Home.jsx
import Logo from "../../../assets/Image/4health_logo_transparent.png";
import CollopseLogo from "../../../assets/Image/4health_logo_transparent_icon.png";
import leafPng from "../../../assets/Image/Home/Leaf.webp";
import potImg from "../../../assets/Image/Home/pot-img.webp";
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

  useEffect(() => {
    const adminContent = document.querySelector(".admin-content");
    const adminNav = document.querySelector(".admin-navbar");
    if (adminContent && adminNav) {
      if (isCollapsed) {
        adminContent.classList.add("collapsed");
        adminNav.classList.add("collapsed");
      } else {
        adminContent.classList.remove("collapsed");
        adminNav.classList.remove("collapsed");
      }
    }
  }, [isCollapsed]);

  const menuItems = [
    { path: "/admin/dash", icon: <BsGrid1X2Fill size={18} />, label: "Dashboard" },
    { path: "/admin/user", icon: <FaUsers size={18} />, label: "User" },
    { path: "/admin/enquire", icon: <FaEnvelope size={18} />, label: "Enquiries" },
    { path: "/admin/appoinment", icon: <FaCalendarCheck size={18} />, label: "Appointments" },
    { path: "/admin/blog", icon: <FaBlog size={18} />, label: "Blog" },
    { path: "/admin/gallery", icon: <FaImages size={18} />, label: "Gallery" },
    { path: "/admin/testimonial", icon: <FaQuoteRight size={18} />, label: "Testimonials" },
    { path: "/admin/treatment", icon: <FaServicestack size={18} />, label: "Treatments" },
  ];

  return (
    <>
      {/* Mobile toggle – styled like homepage outline button */}
      <button
        className="admin-sidebar-mobile-toggle btn"
        onClick={toggleMobile}
        aria-label="Toggle navigation"
      >
        <FaBars size={20} />
      </button>

      {isMobileOpen && (
        <div className="admin-sidebar-overlay" onClick={toggleMobile}></div>
      )}

      <aside
        className={`admin-sidebar bg-white ${isCollapsed ? "collapsed" : ""} ${
          isMobileOpen ? "mobile-open" : ""
        }`}
      >
        {/* Decorative leaves – absolute positioned */}
        <img
          src={leafPng}
          alt=""
          className="admin-leaf-top-right"
          aria-hidden="true"
        />
        <img
          src={leafPng}
          alt=""
          className="admin-leaf-bottom-left"
          aria-hidden="true"
        />
        <img
          src={potImg}
          alt=""
          className="admin-pot-accent"
          aria-hidden="true"
        />

        {/* Brand */}
        <div className="admin-sidebar-brand">
          <div className="admin-sidebar-brand-inner position-relative">
            {/* Subtle leaf behind logo */}
            <img
              src={leafPng}
              alt=""
              className="admin-brand-leaf"
              aria-hidden="true"
            />
            {!isCollapsed ? (
              <img src={Logo} alt="Four Health" className="admin-logo-full" />
            ) : (
              <img
                src={CollopseLogo}
                alt="Four Health"
                className="admin-logo-collapsed"
              />
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="admin-sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`admin-sidebar-link ${isActive(item.path) ? "active" : ""}`}
              title={isCollapsed ? item.label : ""}
            >
              <span className="admin-sidebar-icon">{item.icon}</span>
              {!isCollapsed && (
                <span className="admin-sidebar-label">{item.label}</span>
              )}
              {!isCollapsed && isActive(item.path) && (
                <span className="admin-sidebar-dot"></span>
              )}
            </Link>
          ))}

          {/* Settings Dropdown */}
          <div className="admin-sidebar-dropdown">
            <button
              className={`admin-sidebar-link dropdown-toggle ${
                isActive("/admin/settings") ? "active" : ""
              }`}
              onClick={() => !isCollapsed && setIsSettingsOpen(!isSettingsOpen)}
              title={isCollapsed ? "Settings" : ""}
            >
              <span className="admin-sidebar-icon">
                <FaCog size={18} />
              </span>
              {!isCollapsed && (
                <span className="admin-sidebar-label">Settings</span>
              )}
              {!isCollapsed && (
                <span className="admin-dropdown-arrow">
                  {isSettingsOpen ? (
                    <FaChevronUp size={12} />
                  ) : (
                    <FaChevronDown size={12} />
                  )}
                </span>
              )}
            </button>
            {!isCollapsed && (
              <div
                className={`admin-dropdown-menu ${isSettingsOpen ? "open" : ""}`}
              >
                <Link to="/admin/settings/general" className="admin-dropdown-item">
                  <FaCog size={14} />
                  General
                </Link>
                <Link to="/admin/settings/help" className="admin-dropdown-item">
                  <FaHeadset size={14} />
                  Help & Center
                </Link>
              </div>
            )}
          </div>

          {/* Collapse / Expand */}
          <div className="admin-sidebar-collapse-wrapper">
            <button
              className="admin-sidebar-link collapse-btn"
              onClick={toggleSidebar}
              title={isCollapsed ? "Expand" : "Collapse"}
            >
              <span className="admin-sidebar-icon">
                {isCollapsed ? (
                  <FaArrowRight size={16} />
                ) : (
                  <FaArrowLeft size={16} />
                )}
              </span>
              {!isCollapsed && (
                <span className="admin-sidebar-label">Collapse</span>
              )}
            </button>
          </div>

          {/* Logout */}
          <button
            className="admin-sidebar-link logout"
            onClick={handleLogout}
            title={isCollapsed ? "Logout" : ""}
          >
            <span className="admin-sidebar-icon">
              <FaSignOutAlt size={18} />
            </span>
            {!isCollapsed && (
              <span className="admin-sidebar-label">Logout</span>
            )}
          </button>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;