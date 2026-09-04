// const express = require("express");
// const router = express.Router();
// const AppoinmentSchema = require("../models/Appoinment");
// const whatsappClient = require("../whatsappClient.js");

// // POST
// router.post("/appointment", async (req, res) => {
//   try {
//     const postData = new AppoinmentSchema(req.body);

//     const saveData = await postData.save();

//     const adminNumber = process.env.ADMIN_WHATSAPP_NUMBER + "@c.us";

//     const message = `🏥 *4Health Homeopathy Hospital*

// Hello Admin,

// A new appointment has been booked successfully.

// ━━━━━━━━━━━━━━

// 💾 *Appointment ID:* ${saveData.appoinmnet_id}

// 👤 *Patient Name:* ${saveData.patient_name}

// 📞 *Mobile Number:* ${saveData.patient_mobile}

// 📅 *Appointment Date:* ${saveData.appointment_date || "-"}

// ⏰ *Appointment Time:* ${saveData.time_schedule || "-"}

// 📝 *Reason for Visit:* ${saveData.reason_for_comming || "-"}

// 📌 *Status:* ${saveData.status}

// ━━━━━━━━━━━━━━

// Please check the Admin Panel for complete details.

// Thank you,

// *4Health Homeopathy Hospital*`;

//     try {
//       await whatsappClient.sendMessage(adminNumber, message);
//       console.log("WhatsApp Message Sent");
//     } catch (err) {
//       console.log("WhatsApp Error:", err.message);
//     }

//     return res.status(201).json(saveData);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// });

// // GET
// router.get("/appointment", async (req, res) => {
//   try {
//     const getData = await AppoinmentSchema.find().sort({ _id: -1 });
//     return res.status(200).json(getData);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// });

// // GET ONE
// router.get("/appointment/:id", async (req, res) => {
//   try {
//     const getByIdData = await AppoinmentSchema.findById(req.params.id);

//     if (!getByIdData) {
//       return res.status(404).json({
//         message: "Data Not Found",
//       });
//     }

//     return res.status(200).json(getByIdData);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// });

// // PUT
// router.put("/appointment/:id", async (req, res) => {
//   try {
//     const updateData = await AppoinmentSchema.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       {
//         new: true,
//         runValidators: true,
//       },
//     );

//     if (!updateData) {
//       return res.status(404).json({
//         message: "Data Not Found",
//       });
//     }

//     return res.status(200).json(updateData);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// });

// // DELETE
// router.delete("/appointment/:id", async (req, res) => {
//   try {
//     const deleteData = await AppoinmentSchema.findByIdAndDelete(req.params.id);

//     if (!deleteData) {
//       return res.status(404).json({
//         message: "Data Not Found",
//       });
//     }

//     return res.status(200).json({
//       message: "Data Deleted Successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const AppoinmentSchema = require("../models/Appoinment");
const whatsappClient = require("../whatsappClient.js");
const { sendAppointmentEmail } = require("../utils/appointmentMailer");

const cleanText = (value) => (typeof value === "string" ? value.trim() : "");

// CREATE APPOINTMENT
router.post("/appointment", async (req, res) => {
  try {
    const patient_name = cleanText(req.body.patient_name);
    const patient_mobile = cleanText(req.body.patient_mobile);
    const service = cleanText(req.body.service);
    const message = cleanText(req.body.message);

    if (!patient_name || !patient_mobile || !service) {
      return res.status(400).json({
        message: "Name, mobile number, and service are required",
      });
    }

    const mobileDigits = patient_mobile.replace(/\D/g, "");
    if (mobileDigits.length < 10 || mobileDigits.length > 15) {
      return res.status(400).json({ message: "Enter a valid mobile number" });
    }

    const appointment = new AppoinmentSchema({
      patient_name,
      patient_mobile,
      service,
      message,
      status: "Scheduled",
    });

    const saveData = await appointment.save();

    let emailSent = false;
    let whatsappSent = false;

    try {
      await sendAppointmentEmail(saveData);
      emailSent = true;
      console.log(`Appointment email sent: ${saveData.appoinmnet_id}`);
    } catch (mailError) {
      console.error("Appointment email error:", mailError.message);
    }

    const whatsappNumber = cleanText(process.env.ADMIN_WHATSAPP_NUMBER);
    if (whatsappNumber) {
      const adminNumber = `${whatsappNumber}@c.us`;
      const whatsappMessage = `🏥 *4Health Homeopathy Hospital*

A new appointment request has been received.

━━━━━━━━━━━━━━

💾 *Appointment ID:* ${saveData.appoinmnet_id}

👤 *Patient Name:* ${saveData.patient_name}

📞 *Mobile Number:* ${saveData.patient_mobile}

🩺 *Service:* ${saveData.service}

📝 *Message:* ${saveData.message || "-"}

📌 *Status:* ${saveData.status}

━━━━━━━━━━━━━━

Please check the Admin Panel for complete details.`;

      try {
        await whatsappClient.sendMessage(adminNumber, whatsappMessage);
        whatsappSent = true;
        console.log(`WhatsApp message sent: ${saveData.appoinmnet_id}`);
      } catch (whatsappError) {
        console.error("WhatsApp error:", whatsappError.message);
      }
    }

    const responseData = saveData.toObject();
    return res.status(201).json({
      ...responseData,
      notifications: {
        emailSent,
        whatsappSent,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// GET ALL
router.get("/appointment", async (req, res) => {
  try {
    const getData = await AppoinmentSchema.find().sort({ createdAt: -1 });
    return res.status(200).json(getData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// GET ONE
router.get("/appointment/:id", async (req, res) => {
  try {
    const getByIdData = await AppoinmentSchema.findById(req.params.id);

    if (!getByIdData) {
      return res.status(404).json({ message: "Data Not Found" });
    }

    return res.status(200).json(getByIdData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// UPDATE
router.put("/appointment/:id", async (req, res) => {
  try {
    const allowedFields = [
      "patient_name",
      "patient_mobile",
      "service",
      "message",
      "status",
    ];
    const updatePayload = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updatePayload[field] =
          typeof req.body[field] === "string"
            ? req.body[field].trim()
            : req.body[field];
      }
    });

    const updateData = await AppoinmentSchema.findByIdAndUpdate(
      req.params.id,
      updatePayload,
      { new: true, runValidators: true },
    );

    if (!updateData) {
      return res.status(404).json({ message: "Data Not Found" });
    }

    return res.status(200).json(updateData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// DELETE
router.delete("/appointment/:id", async (req, res) => {
  try {
    const deleteData = await AppoinmentSchema.findByIdAndDelete(req.params.id);

    if (!deleteData) {
      return res.status(404).json({ message: "Data Not Found" });
    }

    return res.status(200).json({ message: "Data Deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
