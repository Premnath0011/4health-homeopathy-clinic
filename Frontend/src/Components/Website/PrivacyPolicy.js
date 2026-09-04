import React, { useEffect } from "react";
import Footer from "./Footer/Footer";

const PrivacyPolicy = () => {

  // Scroll to top whenever this page opens
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // instant venumna "auto" use pannunga
    });
  }, []);

  return (
    <>
      <div className="container py-5" style={{ maxWidth: "900px" }}>
        <h1 className="fw-bold mb-4" style={{ color: "#0f3d6e" }}>
          Privacy Policy
        </h1>

        <p>
          Welcome to <strong>4Health Homeopathy</strong>. Your privacy is
          important to us. This Privacy Policy explains how we collect, use, and
          protect your personal information when you use our website or contact
          our clinic.
        </p>

        <h4 className="mt-4">1. Information We Collect</h4>
        <p>
          We may collect your name, phone number, email address, appointment
          details, and any information you voluntarily provide through our
          enquiry or appointment forms.
        </p>

        <h4 className="mt-4">2. How We Use Your Information</h4>
        <ul>
          <li>To schedule and manage appointments.</li>
          <li>To respond to your enquiries.</li>
          <li>To provide healthcare-related support.</li>
          <li>To improve our website and services.</li>
        </ul>

        <h4 className="mt-4">3. Data Security</h4>
        <p>
          We use appropriate security measures to protect your personal
          information. We do not sell, rent, or share your personal data with
          third parties except where required by law.
        </p>

        <h4 className="mt-4">4. Cookies</h4>
        <p>
          Our website may use cookies to improve your browsing experience and
          analyze website traffic.
        </p>

        <h4 className="mt-4">5. Third-Party Links</h4>
        <p>
          Our website may contain links to third-party websites such as
          Facebook, Instagram, YouTube, and WhatsApp. We are not responsible for
          the privacy practices of those websites.
        </p>

        <h4 className="mt-4">6. Contact Us</h4>

        <p>
          <strong>4Health Homeopathy</strong>
          <br />
          Ground Floor, Valmo Office,
          <br />
          LRN Colony, Hasthampatti,
          <br />
          Sarada College Road,
          <br />
          Salem - 636007, Tamil Nadu.
          <br />
          <br />
          Phone: +91 99448 44408
          <br />
          Email: contact@4healthhomeopathy.com
        </p>

        <hr className="my-4" />

        <p className="text-muted">
          Last Updated: August 2026
        </p>
      </div>

      <Footer />
    </>
  );
};

export default PrivacyPolicy;