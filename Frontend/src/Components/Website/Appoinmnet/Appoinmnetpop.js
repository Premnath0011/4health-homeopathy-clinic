// //Appoinmnet PopUP
// import React, { useState, useEffect, useRef } from "react";
// import {
//   FiX,
//   FiUser,
//   FiPhone,
//   FiMail,
//   FiCalendar,
//   FiClock,
//   FiChevronDown,
//   FiArrowUpRight,
// } from "react-icons/fi";
// import "./appoinment.css";

// // ── Import API base URL (same as your other components) ──
// import API_BASE_URL from "../../AdminPanel/Environmnet/Apiurl";
// import axios from "axios";

// const TIME_SLOTS = [
//   "09:00 AM",
//   "09:30 AM",
//   "10:00 AM",
//   "10:30 AM",
//   "11:00 AM",
//   "11:30 AM",
//   "12:00 PM",
//   "02:00 PM",
//   "02:30 PM",
//   "03:00 PM",
//   "03:30 PM",
//   "04:00 PM",
//   "04:30 PM",
//   "05:00 PM",
// ];

// const SERVICES = [
//   "Homeopathy Consultation",
//   "Wellness Program",
//   "Diet Plan",
//   "Online Consultation",
//   "General Checkup",
// ];

// const AppointmentPopup = ({ isOpen, onClose }) => {
//   const [form, setForm] = useState({
//     patient_name: "",
//     patient_mobile: "",
//     patient_email: "",
//     reason_for_comming: "",
//     appointment_date: "",
//     time_schedule: "",
//     message: "",
//   });
//   const [submitted, setSubmitted] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const overlayRef = useRef(null);

//   // Lock body scroll when open
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "";
//       // Reset form when closed
//       setTimeout(() => {
//         setForm({
//           patient_name: "",
//           patient_mobile: "",
//           patient_email: "",
//           reason_for_comming: "",
//           appointment_date: "",
//           time_schedule: "",
//           message: "",
//         });
//         setSubmitted(false);
//         setError(null);
//       }, 300);
//     }
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [isOpen]);

//   // Close on Escape key
//   useEffect(() => {
//     const handleKey = (e) => {
//       if (e.key === "Escape") onClose();
//     };
//     if (isOpen) window.addEventListener("keydown", handleKey);
//     return () => window.removeEventListener("keydown", handleKey);
//   }, [isOpen, onClose]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   // ── UPDATED: Submit to Backend ──
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setLoading(true);

//     // Build payload for backend
//     const payload = {
//       patient_name: form.patient_name,
//       patient_mobile: form.patient_mobile,
//       patient_email: form.patient_email,
//       // Combine service and message into reason_for_comming
//       reason_for_comming: form.reason_for_comming || form.message,
//       appointment_date: form.appointment_date,
//       time_schedule: form.time_schedule,
//       status: "Scheduled", // default
//     };

//     // try {
//     //   const response = await fetch(`${API_BASE_URL}/appoinment`, {
//     //     method: "POST",
//     //     headers: { "Content-Type": "application/json" },
//     //     body: JSON.stringify(payload),
//     //   });

//     //   if (!response.ok) {
//     // const errorData = await response.json();
//     // throw new Error(errorData.message || "Failed to book appointment");
//     //   }

//     //   const data = await response.json();
//     // console.log("Appointment created:", data);
//     // setSubmitted(true); // Show success state
//     // } catch (err) {
//     // console.error("Submit error:", err);
//     // setError(err.message);
//     // // Keep the form visible and show an alert or a message
//     // alert(`❌ ${err.message}`);
//     // } finally {
//     //   setLoading(false);
//     // }

//     try {
//       const response = await axios.post(`${API_BASE_URL}/appointment`, payload);
//       console.log("Appointment created:", response);
//       setSubmitted(true); // Show success state

//       setForm({
//         patient_name: "",
//         patient_mobile: "",
//         patient_email: "",
//         reason_for_comming: "",
//         appointment_date: "",
//         time_schedule: "",
//         message: "",
//       });
//     } catch (error) {
//       console.error("Submit error:", error);
//       setError(error.message);
//       // Keep the form visible and show an alert or a message
//       alert(`❌ ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleOverlayClick = (e) => {
//     if (e.target === overlayRef.current) onClose();
//   };

//   // Today's date as min value for date picker
//   const today = new Date().toISOString().split("T")[0];

//   return (
//     <div
//       ref={overlayRef}
//       className={`ap-overlay ${isOpen ? "ap-overlay--open" : ""}`}
//       onClick={handleOverlayClick}
//       aria-modal="true"
//       role="dialog"
//       aria-label="Book an Appointment"
//     >
//       <div className={`ap-modal ${isOpen ? "ap-modal--open" : ""}`}>
//         {/* ── Header ── */}
//         <div className="ap-header">
//           <div className="ap-header-left">
//             <span className="ap-header-badge">Quick Booking</span>
//             <h2 className="ap-title">Book an Appointment</h2>
//             <p className="ap-subtitle">We'll confirm within 2 hours</p>
//           </div>
//           <button
//             className="ap-close"
//             onClick={onClose}
//             aria-label="Close popup"
//           >
//             <FiX size={18} />
//           </button>
//         </div>

//         {/* ── Body ── */}
//         <div className="ap-body">
//           {submitted ? (
//             /* ── Success State ── */
//             <div className="ap-success">
//               <div className="ap-success-icon">
//                 <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
//                   <circle cx="16" cy="16" r="16" fill="rgba(75,168,106,0.12)" />
//                   <path
//                     d="M9 16.5L13.5 21L23 11"
//                     stroke="#4BA86A"
//                     strokeWidth="2.2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                 </svg>
//               </div>
//               <h3 className="ap-success-title">Appointment Requested!</h3>
//               <p className="ap-success-text">
//                 Thank you, <strong>{form.name}</strong>. Our team will contact
//                 you on <strong>{form.phone}</strong> to confirm your slot.
//               </p>
//               <button
//                 className="ap-btn-primary"
//                 onClick={onClose}
//                 style={{ marginTop: 8 }}
//               >
//                 Done <FiArrowUpRight size={14} />
//               </button>
//             </div>
//           ) : (
//             /* ── Form ── */
//             <form className="ap-form" onSubmit={handleSubmit} noValidate>
//               {/* Row 1 — Name + Phone */}
//               <div className="ap-row">
//                 <div className="ap-field">
//                   <label className="ap-label" htmlFor="ap-name">
//                     <FiUser size={13} /> Full Name
//                   </label>
//                   <input
//                     id="ap-name"
//                     name="patient_name"
//                     type="text"
//                     className="ap-input"
//                     placeholder="Your full name"
//                     value={form.patient_name}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="ap-field">
//                   <label className="ap-label" htmlFor="ap-phone">
//                     <FiPhone size={13} /> Phone Number
//                   </label>
//                   <input
//                     id="ap-phone"
//                     name="patient_mobile"
//                     type="tel"
//                     className="ap-input"
//                     placeholder="+91 XXXXX XXXXX"
//                     value={form.patient_mobile}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Row 2 — Email + Service */}
//               <div className="ap-row">
//                 <div className="ap-field">
//                   <label className="ap-label" htmlFor="ap-email">
//                     <FiMail size={13} /> Email Address
//                   </label>
//                   <input
//                     id="ap-email"
//                     name="patient_email"
//                     type="email"
//                     className="ap-input"
//                     placeholder="you@email.com"
//                     value={form.patient_email}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="ap-field">
//                   <label className="ap-label" htmlFor="ap-service">
//                     Service
//                   </label>
//                   <div className="ap-select-wrap">
//                     <select
//                       id="ap-service"
//                       name="reason_for_comming"
//                       className="ap-input ap-select"
//                       value={form.reason_for_comming}
//                       onChange={handleChange}
//                       required
//                     >
//                       <option value="" disabled>
//                         Select a service
//                       </option>
//                       {SERVICES.map((s) => (
//                         <option key={s} value={s}>
//                           {s}
//                         </option>
//                       ))}
//                     </select>
//                     <FiChevronDown size={14} className="ap-select-icon" />
//                   </div>
//                 </div>
//               </div>

//               {/* Row 3 — Date + Time */}
//               <div className="ap-row">
//                 <div className="ap-field">
//                   <label className="ap-label" htmlFor="ap-date">
//                     <FiCalendar size={13} /> Preferred Date
//                   </label>
//                   <input
//                     id="ap-date"
//                     name="appointment_date"
//                     type="date"
//                     className="ap-input"
//                     min={today}
//                     value={form.appointment_date}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="ap-field">
//                   <label className="ap-label" htmlFor="ap-time">
//                     <FiClock size={13} /> Preferred Time
//                   </label>
//                   <div className="ap-select-wrap">
//                     <select
//                       id="ap-time"
//                       name="time_schedule"
//                       className="ap-input ap-select"
//                       value={form.time_schedule}
//                       onChange={handleChange}
//                       required
//                     >
//                       <option value="" disabled>
//                         Pick a time
//                       </option>
//                       {TIME_SLOTS.map((t) => (
//                         <option key={t} value={t}>
//                           {t}
//                         </option>
//                       ))}
//                     </select>
//                     <FiChevronDown size={14} className="ap-select-icon" />
//                   </div>
//                 </div>
//               </div>

//               {/* Row 4 — Message */}
//               <div className="ap-field ap-field--full">
//                 <label className="ap-label" htmlFor="ap-message">
//                   Message <span className="ap-label-optional">(optional)</span>
//                 </label>
//                 <textarea
//                   id="ap-message"
//                   name="message"
//                   className="ap-input ap-textarea"
//                   placeholder="Briefly describe your concern…"
//                   rows={3}
//                   value={form.message}
//                   onChange={handleChange}
//                 />
//               </div>

//               {/* Submit */}
//               <button
//                 type="submit"
//                 className="ap-btn-primary ap-btn-submit"
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <span
//                     className="spinner-border spinner-border-sm"
//                     role="status"
//                   />
//                 ) : (
//                   <>
//                     Confirm Appointment <FiArrowUpRight size={15} />
//                   </>
//                 )}
//               </button>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AppointmentPopup;


// Appointment Popup
import React, { useEffect, useRef, useState } from "react";
import {
  FiArrowUpRight,
  FiChevronDown,
  FiPhone,
  FiUser,
  FiX,
} from "react-icons/fi";
import axios from "axios";
import "./appoinment.css";
import API_BASE_URL from "../../AdminPanel/Environmnet/Apiurl";

const SERVICES = [
  "Homeopathy Consultation",
  "Wellness Program",
  "Diet Plan",
  "Online Consultation",
  "General Checkup",
];

const EMPTY_FORM = {
  patient_name: "",
  patient_mobile: "",
  service: "",
  message: "",
};

const AppointmentPopup = ({ isOpen, onClose }) => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [submittedAppointment, setSubmittedAppointment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      const timer = setTimeout(() => {
        setForm(EMPTY_FORM);
        setSubmittedAppointment(null);
        setError("");
        setLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "Escape") onClose();
    };

    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const patientName = form.patient_name.trim();
    const patientMobile = form.patient_mobile.trim();
    const service = form.service.trim();
    const message = form.message.trim();

    if (!patientName || !patientMobile || !service) {
      setError("Please enter your name, mobile number, and service.");
      return;
    }

    const mobileDigits = patientMobile.replace(/\D/g, "");
    if (mobileDigits.length < 10 || mobileDigits.length > 15) {
      setError("Please enter a valid mobile number.");
      return;
    }

    const payload = {
      patient_name: patientName,
      patient_mobile: patientMobile,
      service,
      message,
    };

    try {
      setLoading(true);
      const response = await axios.post(
        `${API_BASE_URL}/appointment`,
        payload,
      );

      setSubmittedAppointment({
        patient_name: response.data?.patient_name || patientName,
        patient_mobile: response.data?.patient_mobile || patientMobile,
        appoinmnet_id: response.data?.appoinmnet_id || "",
      });
      setForm(EMPTY_FORM);
    } catch (submitError) {
      console.error("Appointment submit error:", submitError);
      setError(
        submitError.response?.data?.message ||
          "Unable to submit your appointment. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOverlayClick = (event) => {
    if (event.target === overlayRef.current) onClose();
  };

  return (
    <div
      ref={overlayRef}
      className={`ap-overlay ${isOpen ? "ap-overlay--open" : ""}`}
      onClick={handleOverlayClick}
      aria-modal="true"
      role="dialog"
      aria-label="Book an Appointment"
    >
      <div className={`ap-modal ${isOpen ? "ap-modal--open" : ""}`}>
        <div className="ap-header">
          <div className="ap-header-left">
            <span className="ap-header-badge">Quick Booking</span>
            <h2 className="ap-title">Book an Appointment</h2>
            <p className="ap-subtitle">We'll contact you shortly</p>
          </div>
          <button
            type="button"
            className="ap-close"
            onClick={onClose}
            aria-label="Close popup"
          >
            <FiX size={18} />
          </button>
        </div>

        <div className="ap-body">
          {submittedAppointment ? (
            <div className="ap-success">
              <div className="ap-success-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="16" fill="rgba(75,168,106,0.12)" />
                  <path
                    d="M9 16.5L13.5 21L23 11"
                    stroke="#4BA86A"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="ap-success-title">Appointment Requested!</h3>
              <p className="ap-success-text">
                Thank you, <strong>{submittedAppointment.patient_name}</strong>.
                Our team will contact you on{" "}
                <strong>{submittedAppointment.patient_mobile}</strong>.
              </p>
              {submittedAppointment.appoinmnet_id && (
                <p className="ap-success-text">
                  Appointment ID: <strong>{submittedAppointment.appoinmnet_id}</strong>
                </p>
              )}
              <button
                type="button"
                className="ap-btn-primary"
                onClick={onClose}
                style={{ marginTop: 8 }}
              >
                Done <FiArrowUpRight size={14} />
              </button>
            </div>
          ) : (
            <form className="ap-form" onSubmit={handleSubmit} noValidate>
              <div className="ap-row">
                <div className="ap-field">
                  <label className="ap-label" htmlFor="ap-name">
                    <FiUser size={13} /> Full Name
                  </label>
                  <input
                    id="ap-name"
                    name="patient_name"
                    type="text"
                    className="ap-input"
                    placeholder="Your full name"
                    value={form.patient_name}
                    onChange={handleChange}
                    maxLength={100}
                    required
                  />
                </div>

                <div className="ap-field">
                  <label className="ap-label" htmlFor="ap-phone">
                    <FiPhone size={13} /> Mobile Number
                  </label>
                  <input
                    id="ap-phone"
                    name="patient_mobile"
                    type="tel"
                    className="ap-input"
                    placeholder="+91 XXXXX XXXXX"
                    value={form.patient_mobile}
                    onChange={handleChange}
                    maxLength={20}
                    required
                  />
                </div>
              </div>

              <div className="ap-field ap-field--full">
                <label className="ap-label" htmlFor="ap-service">
                  Service
                </label>
                <div className="ap-select-wrap">
                  <select
                    id="ap-service"
                    name="service"
                    className="ap-input ap-select"
                    value={form.service}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    {SERVICES.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                  <FiChevronDown size={14} className="ap-select-icon" />
                </div>
              </div>

              <div className="ap-field ap-field--full">
                <label className="ap-label" htmlFor="ap-message">
                  Message <span className="ap-label-optional">(optional)</span>
                </label>
                <textarea
                  id="ap-message"
                  name="message"
                  className="ap-input ap-textarea"
                  placeholder="Briefly describe your concern..."
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  maxLength={1000}
                />
              </div>

              {error && (
                <div
                  role="alert"
                  style={{
                    color: "#b42318",
                    background: "#fef3f2",
                    border: "1px solid #fecdca",
                    borderRadius: 10,
                    padding: "10px 12px",
                    fontSize: 13,
                  }}
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="ap-btn-primary ap-btn-submit"
                disabled={loading}
              >
                {loading ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-label="Submitting appointment"
                  />
                ) : (
                  <>
                    Confirm Appointment <FiArrowUpRight size={15} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentPopup;
