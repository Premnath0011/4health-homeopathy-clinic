// Navbar — with AppointmentPopup integrated
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiArrowUpRight,
  FiPhone,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import { IoMdMail } from "react-icons/io";
import Logo from "../../../assets/Image/4health_logo_transparent.png";
import AppointmentPopup from "../Appoinmnet/Appoinmnetpop"; // ✅ import the popup
import "./Navbar.css";

const NavBar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false); // ✅ mobile services toggle

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ── Main Sticky Navbar ── */}
      <header className={`nh-header ${scrolled ? "nh-scrolled" : ""}`}>
        <div className="nh-inner">
          <Link to="/" className="nh-logo">
            <img src={Logo} alt="4Health Homeopathy" />
          </Link>

          {/* Desktop Nav Links */}
          <nav aria-label="Main navigation" className="nh-desktop-nav">
            <ul className="nh-links">
              <li>
                <Link
                  to="/"
                  className={`nh-link ${isActive("/") ? "nh-active" : ""}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about-us"
                  className={`nh-link ${isActive("/about-us") ? "nh-active" : ""}`}
                >
                  About Us
                </Link>
              </li>

              {/* Services Dropdown — desktop only */}
              <li className="nh-dropdown-wrap">
                <button
                  className={`nh-link nh-link-btn ${location.pathname.startsWith("/treatments") ? "nh-active" : ""}`}
                  aria-haspopup="true"
                >
                  Treatments
                  <FiChevronDown size={13} style={{ marginLeft: 4 }} />
                </button>
                <div className="nh-dropdown" role="menu">
                  <Link to="/treatments" className="nh-dropdown-item">
                    All Treatments
                  </Link>
                  <Link to="/wellness-program" className="nh-dropdown-item">
                    Wellness Programs
                  </Link>
                  <Link to="/diet-paln" className="nh-dropdown-item">
                    Diet Plan
                  </Link>
                  <Link to="/online-consultation" className="nh-dropdown-item">
                    Online Consultation
                  </Link>
                </div>
              </li>

              <li>
                <Link
                  to="/testimonial"
                  className={`nh-link ${isActive("/testimonial") ? "nh-active" : ""}`}
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className={`nh-link ${isActive("/gallery") ? "nh-active" : ""}`}
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className={`nh-link ${isActive("/blog") ? "nh-active" : ""}`}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/contact-us"
                  className={`nh-link ${isActive("/contact-us") ? "nh-active" : ""}`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Desktop CTA */}
          <div className="nh-btn-book-desktop">
            <button onClick={() => setPopupOpen(true)} className="nh-btn-book">
              Book Appointment
            </button>
          </div>

          {/* Hamburger */}
          <button
            className="nh-hamburger"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* ── Mobile Offcanvas ── */}
      <div
        className={`nh-offcanvas ${mobileOpen ? "nh-offcanvas-open" : ""}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="nh-offcanvas-header">
          <img src={Logo} alt="4Health" style={{ height: 56 }} />
          <button
            className="nh-close-btn"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M4 4L16 16M16 4L4 16"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav className="nh-offcanvas-nav" aria-label="Mobile navigation">
          {/* Home */}
          <Link
            to="/"
            className={`nh-mobile-link ${isActive("/") ? "nh-mobile-active" : ""}`}
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>

          {/* About Us */}
          <Link
            to="/about-us"
            className={`nh-mobile-link ${isActive("/about-us") ? "nh-mobile-active" : ""}`}
            onClick={() => setMobileOpen(false)}
          >
            About Us
          </Link>

          {/* Services — with toggle sub‑menu */}
          <div className="nh-mobile-dropdown-wrap">
            <button
              className={`nh-mobile-link nh-mobile-link-btn ${location.pathname.startsWith("/treatments") ? "nh-mobile-active" : ""}`}
              onClick={() => setServicesOpen(!servicesOpen)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              Treatments
              {servicesOpen ? (
                <FiChevronUp size={16} />
              ) : (
                <FiChevronDown size={16} />
              )}
            </button>
            <div
              className={`nh-mobile-dropdown ${servicesOpen ? "nh-mobile-dropdown-open" : ""}`}
            >
              <Link
                to="/treatments"
                className="nh-mobile-dropdown-item"
                onClick={() => {
                  setMobileOpen(false);
                  setServicesOpen(false);
                }}
              >
                All Treatments
              </Link>
              <Link
                to="/wellness-program"
                className="nh-mobile-dropdown-item"
                onClick={() => {
                  setMobileOpen(false);
                  setServicesOpen(false);
                }}
              >
                Wellness Programs
              </Link>
              <Link
                to="/diet-paln"
                className="nh-mobile-dropdown-item"
                onClick={() => {
                  setMobileOpen(false);
                  setServicesOpen(false);
                }}
              >
                Diet Plan
              </Link>
              <Link
                to="/online-consultation"
                className="nh-mobile-dropdown-item"
                onClick={() => {
                  setMobileOpen(false);
                  setServicesOpen(false);
                }}
              >
                Online Consultation
              </Link>
            </div>
          </div>

          {/* Testimonials */}
          <Link
            to="/testimonial"
            className={`nh-mobile-link ${isActive("/testimonial") ? "nh-mobile-active" : ""}`}
            onClick={() => setMobileOpen(false)}
          >
            Testimonials
          </Link>

          <Link
  to="/gallery"
  className={`nh-mobile-link ${isActive("/gallery") ? "nh-mobile-active" : ""}`}
  onClick={() => setMobileOpen(false)}
>
  Gallery
</Link>

          {/* Blog */}
          <Link
            to="/blog"
            className={`nh-mobile-link ${isActive("/blog") ? "nh-mobile-active" : ""}`}
            onClick={() => setMobileOpen(false)}
          >
            Blog
          </Link>

          {/* Contact */}
          <Link
            to="/contact-us"
            className={`nh-mobile-link ${isActive("/contact-us") ? "nh-mobile-active" : ""}`}
            onClick={() => setMobileOpen(false)}
          >
            Contact
          </Link>
        </nav>

        <div className="nh-offcanvas-footer">
          <button
            onClick={() => {
              setMobileOpen(false);
              setPopupOpen(true);
            }}
            className="nh-btn-book"
            style={{ width: "100%", justifyContent: "center" }}
          >
            Book Appointment <FiArrowUpRight size={14} />
          </button>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              marginTop: 18,
            }}
          >
            <a
              href="tel:+919856321458"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                color: "#5F6B7A",
                fontSize: "0.85rem",
                textDecoration: "none",
              }}
            >
              <FiPhone size={14} /> +91 9856321458
            </a>
            <a
              href="mailto:info@4health.com"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                color: "#5F6B7A",
                fontSize: "0.85rem",
                textDecoration: "none",
              }}
            >
              <IoMdMail size={14} /> info@4health.com
            </a>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div
          className="nh-overlay"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Appointment Popup */}
      <AppointmentPopup
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
      />
    </>
  );
};

export default NavBar;