const nodemailer = require("nodemailer");

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const getTransporter = () => {
  const user = process.env.MAIL_USER;
  const pass = process.env.MAIL_APP_PASSWORD;

  if (!user || !pass || pass === "PASTE_16_DIGIT_GOOGLE_APP_PASSWORD") {
    throw new Error(
      "Email is not configured. Add MAIL_USER and MAIL_APP_PASSWORD in .env",
    );
  }

  return nodemailer.createTransport({
    host: process.env.MAIL_HOST || "smtp.gmail.com",
    port: Number(process.env.MAIL_PORT || 465),
    secure: String(process.env.MAIL_SECURE || "true").toLowerCase() === "true",
    auth: {
      user,
      pass: pass.replace(/\s/g, ""),
    },
  });
};

const sendAppointmentEmail = async (appointment) => {
  const transporter = getTransporter();
  const recipient =
    process.env.APPOINTMENT_MAIL_TO || "4healthhomeopathy@gmail.com";

  const patientName = escapeHtml(appointment.patient_name);
  const patientMobile = escapeHtml(appointment.patient_mobile);
  const service = escapeHtml(appointment.service);
  const message = escapeHtml(appointment.message || "-").replace(/\n/g, "<br />");
  const appointmentId = escapeHtml(appointment.appoinmnet_id);
  const createdAt = appointment.createdAt
    ? new Date(appointment.createdAt).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        dateStyle: "medium",
        timeStyle: "short",
      })
    : new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        dateStyle: "medium",
        timeStyle: "short",
      });

  return transporter.sendMail({
    from: `"4Health Appointment" <${process.env.MAIL_USER}>`,
    to: recipient,
    subject: `New Appointment - ${appointment.appoinmnet_id} - ${appointment.patient_name}`,
    text: [
      "New appointment request received.",
      `Appointment ID: ${appointment.appoinmnet_id}`,
      `Name: ${appointment.patient_name}`,
      `Mobile Number: ${appointment.patient_mobile}`,
      `Service: ${appointment.service}`,
      `Message: ${appointment.message || "-"}`,
      `Status: ${appointment.status}`,
      `Submitted At: ${createdAt}`,
    ].join("\n"),
    html: `
      <div style="font-family:Arial,sans-serif;background:#f4fcf8;padding:24px;color:#1e2f2b">
        <div style="max-width:620px;margin:auto;background:#ffffff;border:1px solid #d1ede6;border-radius:16px;overflow:hidden">
          <div style="background:#2e8b57;color:#ffffff;padding:20px 24px">
            <h2 style="margin:0;font-size:22px">New Appointment Request</h2>
            <p style="margin:6px 0 0;opacity:.9">4Health Homeopathy Hospital</p>
          </div>
          <div style="padding:24px">
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:9px 0;color:#5e7b6e;width:160px">Appointment ID</td><td style="padding:9px 0;font-weight:700">${appointmentId}</td></tr>
              <tr><td style="padding:9px 0;color:#5e7b6e">Name</td><td style="padding:9px 0">${patientName}</td></tr>
              <tr><td style="padding:9px 0;color:#5e7b6e">Mobile Number</td><td style="padding:9px 0">${patientMobile}</td></tr>
              <tr><td style="padding:9px 0;color:#5e7b6e">Service</td><td style="padding:9px 0">${service}</td></tr>
              <tr><td style="padding:9px 0;color:#5e7b6e;vertical-align:top">Message</td><td style="padding:9px 0">${message}</td></tr>
              <tr><td style="padding:9px 0;color:#5e7b6e">Status</td><td style="padding:9px 0">${escapeHtml(appointment.status)}</td></tr>
              <tr><td style="padding:9px 0;color:#5e7b6e">Submitted At</td><td style="padding:9px 0">${escapeHtml(createdAt)}</td></tr>
            </table>
          </div>
        </div>
      </div>
    `,
  });
};

module.exports = { sendAppointmentEmail };
