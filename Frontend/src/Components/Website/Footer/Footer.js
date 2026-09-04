import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiClock,
  FiChevronDown,
} from "react-icons/fi";

import Logo from "../../../assets/Image/4health_logo_transparent.png";
import Apiurl from "../../AdminPanel/Environmnet/Apiurl";
import "./Footer.css";

// Same sub-links shown in the Navbar's "Treatments" dropdown
const TREATMENT_LINKS = [
  { to: "/treatments", label: "All Treatments" },
  { to: "/wellness-program", label: "Wellness Programs" },
  { to: "/diet-paln", label: "Diet Plan" },
  { to: "/online-consultation", label: "Online Consultation" },
];

const LeafPattern = () => (
  <svg
    className="ft-leaf-bg"
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <g transform="rotate(-25, 100, 100)">
      <ellipse cx="100" cy="60" rx="26" ry="70" fill="white" />
      <line
        x1="100"
        y1="0"
        x2="100"
        y2="120"
        stroke="white"
        strokeWidth="1.5"
      />
    </g>

    <g transform="translate(130,110) rotate(20)">
      <ellipse cx="20" cy="36" rx="14" ry="36" fill="white" />
    </g>
  </svg>
);

const Footer = () => {
  const [treatmentsOpen, setTreatmentsOpen] = useState(false);
  const [specializations, setSpecializations] = useState([]);

  useEffect(() => {
    let active = true;

    const loadSpecializations = async () => {
      try {
        const response = await axios.get(`${Apiurl}/service?status=Active`);
        if (!active) return;

        const list = (Array.isArray(response.data) ? response.data : []).map(
          (service) => ({
            id: service._id || service.slug,
            slug: service.slug,
            title: service.title,
          }),
        );

        setSpecializations(list);
      } catch (error) {
        console.error("Unable to load specializations:", error);
        if (active) setSpecializations([]);
      }
    };

    loadSpecializations();

    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <footer className="ft-footer">
        <LeafPattern />

        <div className="ft-container">
          <div className="ft-grid">
            {/* About */}
            <div className="ft-about-column">
              <img
                src={Logo}
                alt="4Health Homeopathy"
                className="ft-logo-img"
              />

              <p className="ft-about-text">
                Dedicated to providing gentle, natural healing through
                personalized homeopathic care for the whole family. We focus on
                treating the root cause and helping you achieve lasting wellness.
              </p>

              <div className="ft-socials">
                <a
                  href="https://www.facebook.com/profile.php?id=61589741049622"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ft-social-icon"
                  aria-label="Facebook"
                >
                  <FaFacebookF />
                </a>

                <a
                  href="https://www.instagram.com/4health_homeopathy_salem/?__pwa=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ft-social-icon"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>

                <a
                  href="https://youtube.com/@4healthhomeopathy?si=2EAyIu-mVf0ar3AC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ft-social-icon"
                  aria-label="YouTube"
                >
                  <FaYoutube />
                </a>

                <a
                  href="https://wa.me/919856321458"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ft-social-icon"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="ft-quick-column">
              <h5 className="ft-heading">Quick Links</h5>

              <ul className="ft-links">
                <li>
                  <Link to="/">Home</Link>
                </li>

                <li>
                  <Link to="/about-us">About Us</Link>
                </li>

                <li>
                  <button
                    type="button"
                    className="ft-dropdown-toggle"
                    aria-expanded={treatmentsOpen}
                    onClick={() => setTreatmentsOpen((prev) => !prev)}
                  >
                    Treatments
                    <FiChevronDown size={14} />
                  </button>

                  {treatmentsOpen && (
                    <ul className="ft-sublinks">
                      {TREATMENT_LINKS.map((item) => (
                        <li key={item.to}>
                          <Link to={item.to}>{item.label}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>

                <li>
                  <Link to="/blog">Blog</Link>
                </li>

                <li>
                  <Link to="/contact-us">Contact Us</Link>
                </li>

                <li>
                  <Link to="/appointment">Book Appointment</Link>
                </li>
              </ul>
            </div>

            {/* Specializations */}
            <div className="ft-specializations-column">
              <h5 className="ft-heading">Our Specializations</h5>

              <ul className="ft-links">
                {specializations.length > 0 ? (
                  specializations.map((item) => (
                    <li key={item.id}>
                      <Link to={`/treatments/${item.slug}`}>{item.title}</Link>
                    </li>
                  ))
                ) : (
                  <li>
                    <Link to="/treatments">View All Treatments</Link>
                  </li>
                )}
              </ul>
            </div>

            {/* Contact */}
            <div className="ft-contact-column">
              <h5 className="ft-heading">Get In Touch</h5>

              <div className="ft-contact-item">
                <div className="ft-contact-icon">
                  <FiMapPin />
                </div>

                <div className="ft-contact-text">
                  <strong>Clinic Address</strong>
                  Ground Floor, Sixer Complex, Saradha College Road, 
                  <br />
                  (Near Bharath Petrol Bunk), 
                  <br />
                  Salem, Tamil Nadu 636007.
                </div>
              </div>

              <div className="ft-contact-item">
                <div className="ft-contact-icon">
                  <FiPhone />
                </div>

                <div className="ft-contact-text">
                  <strong>Phone / WhatsApp</strong>

                  <a href="tel:+919856321458">+91 99448 44408</a>
                </div>
              </div>

              <div className="ft-contact-item">
                <div className="ft-contact-icon">
                  <FiMail />
                </div>

                <div className="ft-contact-text">
                  <strong>Email</strong>

                  <a href="mailto:fourhealth@gmail.com">
                    contact@4healthhomeopathy.com
                  </a>
                </div>
              </div>

              <div className="ft-contact-item">
                <div className="ft-contact-icon">
                  <FiClock />
                </div>

                <div className="ft-contact-text">
                  <strong>Clinic Timings</strong>
                  Mon - Sun : 10:00 AM – 8:00 PM
                  <br />
                  Get prior appointments
                </div>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="ft-bottom">
            <p className="ft-copyright">
              © {new Date().getFullYear()} 4Health Homeopathy. All Rights
              Reserved.
            </p>

            <ul className="ft-bottom-links">
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;