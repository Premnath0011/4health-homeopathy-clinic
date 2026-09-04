// // App.js — Full file with protected admin routes
// import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   useLocation,
//   Navigate,
// } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// // Website Components
// import Home from "./Components/Website/Home";
// import About from "./Components/Website/About";
// import Service from "./Components/Website/Service";
// import ServiceDetail from "./Components/Website/ServiceDetail";
// import Blog from "./Components/Website/Blog";
// import Contact from "./Components/Website/Contact";
// import Gallery from "./Components/Website/Gallery";
// import NavBar from "./Components/Website/Navbar/NavBar";
// import Footer from "./Components/Website/Footer/Footer";
// import Login from "./Components/Login/Login";

// // Admin Components
// import Dashboard from "./Components/AdminPanel/Pages/Dashboard/Dashboard";
// import Sidebar from "./Components/AdminPanel/Sidebar/Sidebar";
// import "./App.css";
// import AdminNav from "./Components/AdminPanel/AdminNav/AdminNav";
// import User from "./Components/AdminPanel/Pages/User/User";
// import Enquire from "./Components/AdminPanel/Pages/Enquire/Enquire";
// import Appoinment from "./Components/AdminPanel/Pages/Appoinment/Appoinment";
// import DietPlan from "./Components/Website/DietPlan";
// import Testimonial from "./Components/Website/Testimonial";
// import AdminBlog from "./Components/AdminPanel/Pages/Blog/AdminBlog";
// import AddBlog from "./Components/AdminPanel/Pages/Blog/AddBlog";
// import BlogDetails from "./Components/AdminPanel/Pages/Blog/AdminBlogDetails";
// import AdminBlogDetails from "./Components/AdminPanel/Pages/Blog/AdminBlogDetails";
// import AdminService from "./Components/AdminPanel/Pages/Service/AdminService";
// import AddAdminService from "./Components/AdminPanel/Pages/Service/AddAdminService";
// import AdminServiceDetails from "./Components/AdminPanel/Pages/Service/AdminServiceDetails";
// import WellnessProgram from "./Components/Website/WellnessProgram";
// import OnlineConsultation from "./Components/Website/OnlineConsultation";
// import PageTitle from "./Components/Common/PageTitle";
// import AdminTestimonial from "./Components/AdminPanel/Pages/Testimonial/AdminTestimonial";
// import GeneralSettings from "./Components/AdminPanel/Pages/Settings/GeneralSettings";

// // ─── Protected Route Component ──────────────────────────────
// // Checks for a valid token in localStorage
// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem("adminToken");
//   return token ? children : <Navigate to="/login" replace />;
// };

// // ─── App Content ─────────────────────────────────────────────
// function AppContent() {
//   const location = useLocation();

//   const token = localStorage.getItem("adminToken");
//   const isAuthenticated = Boolean(token);

//   const isAdminRoute = location.pathname.startsWith("/admin");
//   const isLoginPage = location.pathname === "/login";

//   const showAdminLayout = isAdminRoute && isAuthenticated;

//   return (
//     <>
//       {/* Sets document title + meta description per route */}
//       <PageTitle />

//       {/* Show Navbar only for website pages (not admin, not login) */}
//       {!isAdminRoute && !isLoginPage && <NavBar />}

//       {/* Show AdminNav only for admin pages */}
//       {/* {isAdminRoute && <AdminNav />} */}
//       {showAdminLayout && <AdminNav />}

//       {/* Show Sidebar only for admin pages */}
//       {/* {isAdminRoute && <Sidebar />} */}
//       {showAdminLayout && <Sidebar />}

//       {/* <div className={isAdminRoute ? "admin-content" : ""}> */}
//       <div className={showAdminLayout ? "admin-content" : ""}>
//         <Routes>
//           {/* ─── Website Routes ────────────────────────────── */}
//           <Route path="/" element={<Home />} />
//           <Route path="/about-us" element={<About />} />
//           <Route path="/treatments" element={<Service />} />
//           <Route path="/treatments/:categoryId" element={<ServiceDetail />} />
//           <Route path="/blog" element={<Blog />} />
//           <Route path="/contact-us" element={<Contact />} />
//           <Route path="/gallery" element={<Gallery />} />
//           <Route path="/diet-paln" element={<DietPlan />} />
//           <Route
//   path="/login"
//   element={
//     isAuthenticated ? (
//       <Navigate to="/admin/dash" replace />
//     ) : (
//       <Login />
//     )
//   }
// />
//           <Route path="/testimonial" element={<Testimonial />} />
//           <Route path="/wellness-program" element={<WellnessProgram />} />
//           <Route path="/online-consultation" element={<OnlineConsultation />} />

//           {/* ─── Admin Routes (Protected) ──────────────────── */}

//           {/* /admin -> redirect to dashboard if logged in, else to login */}
//           <Route
//             path="/admin"
//             element={
//               isAuthenticated ? (
//                 <Navigate to="/admin/dash" replace />
//               ) : (
//                 <Navigate to="/login" replace />
//               )
//             }
//           />

//           <Route
//             path="/admin/dash"
//             element={
//               <ProtectedRoute>
//                 <Dashboard />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/admin/user"
//             element={
//               <ProtectedRoute>
//                 <User />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/admin/enquire"
//             element={
//               <ProtectedRoute>
//                 <Enquire />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/admin/appoinment"
//             element={
//               <ProtectedRoute>
//                 <Appoinment />
//               </ProtectedRoute>
//             }
//           />

//           {/* Admin Blog */}
//           <Route
//             path="/admin/blog"
//             element={
//               <ProtectedRoute>
//                 <AdminBlog />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/admin/add-blog"
//             element={
//               <ProtectedRoute>
//                 <AddBlog />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/admin/blog-details"
//             element={
//               <ProtectedRoute>
//                 <AdminBlogDetails />
//               </ProtectedRoute>
//             }
//           />

//           {/* Admin Service */}
//           <Route
//             path="/admin/treatment"
//             element={
//               <ProtectedRoute>
//                 <AdminService />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/admin/add-treatment"
//             element={
//               <ProtectedRoute>
//                 <AddAdminService />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/admin/treatment-details"
//             element={
//               <ProtectedRoute>
//                 <AdminServiceDetails />
//               </ProtectedRoute>
//             }
//           />
//           {/* Admin Testimonial */}
// <Route
//   path="/admin/testimonial"
//   element={
//     <ProtectedRoute>
//       <AdminTestimonial />
//     </ProtectedRoute>
//   }
// />

//           {/* Admin Settings — Page Metadata */}
//           <Route
//             path="/admin/settings/general"
//             element={
//               <ProtectedRoute>
//                 <GeneralSettings />
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//       </div>
//     </>
//   );
// }

// // ─── Main App ────────────────────────────────────────────────
// const App = () => {
//   return (
//     <Router>
//       <AppContent />
//     </Router>
//   );
// };

// export default App;




// App.js — Full file with protected admin routes
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Website Components
import Home from "./Components/Website/Home";
import About from "./Components/Website/About";
import Service from "./Components/Website/Service";
import ServiceDetail from "./Components/Website/ServiceDetail";
import Blog from "./Components/Website/Blog";
import Contact from "./Components/Website/Contact";
import Gallery from "./Components/Website/Gallery";
import NavBar from "./Components/Website/Navbar/NavBar";
import Footer from "./Components/Website/Footer/Footer";
import Login from "./Components/Login/Login";
import PrivacyPolicy from "./Components/Website/PrivacyPolicy";

// Admin Components
import Dashboard from "./Components/AdminPanel/Pages/Dashboard/Dashboard";
import Sidebar from "./Components/AdminPanel/Sidebar/Sidebar";
import "./App.css";
import AdminNav from "./Components/AdminPanel/AdminNav/AdminNav";
import User from "./Components/AdminPanel/Pages/User/User";
import Enquire from "./Components/AdminPanel/Pages/Enquire/Enquire";
import Appoinment from "./Components/AdminPanel/Pages/Appoinment/Appoinment";
import DietPlan from "./Components/Website/DietPlan";
import Testimonial from "./Components/Website/Testimonial";
import AdminBlog from "./Components/AdminPanel/Pages/Blog/AdminBlog";
import AddBlog from "./Components/AdminPanel/Pages/Blog/AddBlog";
import BlogDetails from "./Components/AdminPanel/Pages/Blog/AdminBlogDetails";
import AdminBlogDetails from "./Components/AdminPanel/Pages/Blog/AdminBlogDetails";
import AdminService from "./Components/AdminPanel/Pages/Service/AdminService";
import AddAdminService from "./Components/AdminPanel/Pages/Service/AddAdminService";
import AdminServiceDetails from "./Components/AdminPanel/Pages/Service/AdminServiceDetails";
import WellnessProgram from "./Components/Website/WellnessProgram";
import OnlineConsultation from "./Components/Website/OnlineConsultation";
import PageTitle from "./Components/Common/PageTitle";
import AdminTestimonial from "./Components/AdminPanel/Pages/Testimonial/AdminTestimonial";
import GeneralSettings from "./Components/AdminPanel/Pages/Settings/GeneralSettings";
import AdminGallery from "./Components/AdminPanel/Pages/Gallery/AdminGallery";

// ─── Protected Route Component ──────────────────────────────
// Checks for a valid token in localStorage
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  return token ? children : <Navigate to="/login" replace />;
};

// ─── App Content ─────────────────────────────────────────────
function AppContent() {
  const location = useLocation();

  const token = localStorage.getItem("adminToken");
  const isAuthenticated = Boolean(token);

  const isAdminRoute = location.pathname.startsWith("/admin");
  const isLoginPage = location.pathname === "/login";

  const showAdminLayout = isAdminRoute && isAuthenticated;

  return (
    <>
      {/* Sets document title + meta description per route */}
      <PageTitle />

      {/* Show Navbar only for website pages (not admin, not login) */}
      {!isAdminRoute && !isLoginPage && <NavBar />}

      {/* Show AdminNav only for admin pages */}
      {/* {isAdminRoute && <AdminNav />} */}
      {showAdminLayout && <AdminNav />}

      {/* Show Sidebar only for admin pages */}
      {/* {isAdminRoute && <Sidebar />} */}
      {showAdminLayout && <Sidebar />}

      {/* <div className={isAdminRoute ? "admin-content" : ""}> */}
      <div className={showAdminLayout ? "admin-content" : ""}>
        <Routes>
          {/* ─── Website Routes ────────────────────────────── */}
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/treatments" element={<Service />} />
          <Route path="/treatments/:categoryId" element={<ServiceDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/diet-paln" element={<DietPlan />} />
          <Route
  path="/login"
  element={
    isAuthenticated ? (
      <Navigate to="/admin/dash" replace />
    ) : (
      <Login />
    )
  }
/>
          <Route path="/testimonial" element={<Testimonial />} />
          <Route path="/wellness-program" element={<WellnessProgram />} />
          <Route path="/online-consultation" element={<OnlineConsultation />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          {/* ─── Admin Routes (Protected) ──────────────────── */}

          {/* /admin -> redirect to dashboard if logged in, else to login */}
          <Route
            path="/admin"
            element={
              isAuthenticated ? (
                <Navigate to="/admin/dash" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/admin/dash"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/user"
            element={
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/enquire"
            element={
              <ProtectedRoute>
                <Enquire />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/appoinment"
            element={
              <ProtectedRoute>
                <Appoinment />
              </ProtectedRoute>
            }
          />

          {/* Admin Blog */}
          <Route
            path="/admin/blog"
            element={
              <ProtectedRoute>
                <AdminBlog />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/add-blog"
            element={
              <ProtectedRoute>
                <AddBlog />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/blog-details"
            element={
              <ProtectedRoute>
                <AdminBlogDetails />
              </ProtectedRoute>
            }
          />

          {/* Admin Service */}
          <Route
            path="/admin/treatment"
            element={
              <ProtectedRoute>
                <AdminService />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/add-treatment"
            element={
              <ProtectedRoute>
                <AddAdminService />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/treatment-details"
            element={
              <ProtectedRoute>
                <AdminServiceDetails />
              </ProtectedRoute>
            }
          />
          {/* Admin Gallery */}
          <Route
            path="/admin/gallery"
            element={
              <ProtectedRoute>
                <AdminGallery />
              </ProtectedRoute>
            }
          />

          {/* Admin Testimonial */}
<Route
  path="/admin/testimonial"
  element={
    <ProtectedRoute>
      <AdminTestimonial />
    </ProtectedRoute>
  }
/>

          {/* Admin Settings — Page Metadata */}
          <Route
            path="/admin/settings/general"
            element={
              <ProtectedRoute>
                <GeneralSettings />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

// ─── Main App ────────────────────────────────────────────────
const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;