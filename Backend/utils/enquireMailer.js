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

// Mail to admin — notifies that a new contact/enquiry was submitted
const sendEnquiryEmail = async (enquiry) => {
  const transporter = getTransporter();
  const recipient =
    process.env.APPOINTMENT_MAIL_TO || "4healthhomeopathy@gmail.com";

  const name = escapeHtml(enquiry.name);
  const mobileNumber = escapeHtml(enquiry.mobileNumber);
  const email = escapeHtml(enquiry.email || "-");
  const message = escapeHtml(enquiry.message || "-").replace(/\n/g, "<br />");
  const enquireId = escapeHtml(enquiry.enquire_id || "-");
  const createdAt = enquiry.createdAt
    ? new Date(enquiry.createdAt).toLocaleString("en-IN", {
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
    from: `"4Health Website Enquiry" <${process.env.MAIL_USER}>`,
    to: recipient,
    subject: `New Contact Enquiry - ${enquiry.enquire_id} - ${enquiry.name}`,
    text: [
      "New enquiry received from the Contact Us page.",
      `Enquiry ID: ${enquiry.enquire_id}`,
      `Name: ${enquiry.name}`,
      `Mobile Number: ${enquiry.mobileNumber}`,
      `Email: ${enquiry.email || "-"}`,
      `Message: ${enquiry.message || "-"}`,
      `Status: ${enquiry.status}`,
      `Submitted At: ${createdAt}`,
    ].join("\n"),
    html: `
      <div style="font-family:Arial,sans-serif;background:#f4fcf8;padding:24px;color:#1e2f2b">
        <div style="max-width:620px;margin:auto;background:#ffffff;border:1px solid #d1ede6;border-radius:16px;overflow:hidden">
          <div style="background:#2e8b57;color:#ffffff;padding:20px 24px">
            <h2 style="margin:0;font-size:22px">New Contact Enquiry</h2>
            <p style="margin:6px 0 0;opacity:.9">4Health Homeopathy Hospital</p>
          </div>
          <div style="padding:24px">
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:9px 0;color:#5e7b6e;width:160px">Enquiry ID</td><td style="padding:9px 0;font-weight:700">${enquireId}</td></tr>
              <tr><td style="padding:9px 0;color:#5e7b6e">Name</td><td style="padding:9px 0">${name}</td></tr>
              <tr><td style="padding:9px 0;color:#5e7b6e">Mobile Number</td><td style="padding:9px 0">${mobileNumber}</td></tr>
              <tr><td style="padding:9px 0;color:#5e7b6e">Email</td><td style="padding:9px 0">${email}</td></tr>
              <tr><td style="padding:9px 0;color:#5e7b6e;vertical-align:top">Message</td><td style="padding:9px 0">${message}</td></tr>
              <tr><td style="padding:9px 0;color:#5e7b6e">Status</td><td style="padding:9px 0">${escapeHtml(enquiry.status)}</td></tr>
              <tr><td style="padding:9px 0;color:#5e7b6e">Submitted At</td><td style="padding:9px 0">${escapeHtml(createdAt)}</td></tr>
            </table>
          </div>
        </div>
      </div>
    `,
  });
};

// Optional confirmation mail to the visitor who submitted the form
const sendEnquiryConfirmationEmail = async (enquiry) => {
  if (!enquiry.email) return;

  const transporter = getTransporter();
  const name = escapeHtml(enquiry.name);

  return transporter.sendMail({
    from: `"4Health Homeopathy Hospital" <${process.env.MAIL_USER}>`,
    to: enquiry.email,
    subject: "We've received your message - 4Health Homeopathy",
    text: [
      `Hi ${enquiry.name},`,
      "",
      "Thank you for reaching out to 4Health Homeopathy Hospital. We've received your message and our team will get back to you shortly.",
      "",
      `Your message: ${enquiry.message || "-"}`,
      "",
      "Regards,",
      "4Health Homeopathy Hospital",
    ].join("\n"),
    html: `
      <div style="font-family:Arial,sans-serif;background:#f4fcf8;padding:24px;color:#1e2f2b">
        <div style="max-width:560px;margin:auto;background:#ffffff;border:1px solid #d1ede6;border-radius:16px;overflow:hidden">
          <div style="background:#2e8b57;color:#ffffff;padding:20px 24px">
            <h2 style="margin:0;font-size:20px">Thank you, ${name}!</h2>
          </div>
          <div style="padding:24px">
            <p>We've received your message and our team will get back to you shortly.</p>
            <p style="color:#5e7b6e;margin-top:18px">— 4Health Homeopathy Hospital</p>
          </div>
        </div>
      </div>
    `,
  });
};

module.exports = { sendEnquiryEmail, sendEnquiryConfirmationEmail };