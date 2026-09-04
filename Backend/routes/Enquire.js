// //Enquire Router
// const express = require("express");
// const router = express.Router();
// const EnquireSchema = require("../models/Enquire");

// // POST
// router.post("/enquire", async (req, res) => {
//   try {
//     const postData = await new EnquireSchema(req.body).save();
//     return res.status(201).json(postData);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // GET all
// router.get("/enquire", async (req, res) => {
//   try {
//     const getData = await EnquireSchema.find();
//     return res.status(200).json(getData);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // GET by ID
// router.get("/enquire/:id", async (req, res) => {
//   try {
//     const getDatabyID = await EnquireSchema.findById(req.params.id);
//     if (!getDatabyID) return res.status(404).json("Data not Found");
//     return res.status(200).json(getDatabyID);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // UPDATE – ID remains unchanged
// router.put("/enquire/:id", async (req, res) => {
//   try {
//     const UpdateData = await EnquireSchema.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true },
//     );
//     if (!UpdateData) return res.status(404).json("Data Not Found");
//     return res.status(200).json(UpdateData);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // DELETE
// router.delete("/enquire/:id", async (req, res) => {
//   try {
//     const DeleteData = await EnquireSchema.findByIdAndDelete(req.params.id);
//     if (!DeleteData) return res.status(404).json("Data Not Found!");
//     res.status(200).json("Data Deleted Successfully");
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;



//Enquire Router
const express = require("express");
const router = express.Router();
const EnquireSchema = require("../models/Enquire");
const {
  sendEnquiryEmail,
  sendEnquiryConfirmationEmail,
} = require("../utils/enquireMailer");

// POST
router.post("/enquire", async (req, res) => {
  try {
    const postData = await new EnquireSchema(req.body).save();

    let emailSent = false;

    try {
      await sendEnquiryEmail(postData);
      emailSent = true;
      console.log(`Enquiry email sent: ${postData.enquire_id}`);
    } catch (mailError) {
      console.error("Enquiry email error:", mailError.message);
    }

    // best-effort confirmation mail to the visitor, doesn't block the response
    sendEnquiryConfirmationEmail(postData).catch((mailError) =>
      console.error("Enquiry confirmation email error:", mailError.message),
    );

    return res.status(201).json({ ...postData.toObject(), emailSent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET all
router.get("/enquire", async (req, res) => {
  try {
    const getData = await EnquireSchema.find();
    return res.status(200).json(getData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET by ID
router.get("/enquire/:id", async (req, res) => {
  try {
    const getDatabyID = await EnquireSchema.findById(req.params.id);
    if (!getDatabyID) return res.status(404).json("Data not Found");
    return res.status(200).json(getDatabyID);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE – ID remains unchanged
router.put("/enquire/:id", async (req, res) => {
  try {
    const UpdateData = await EnquireSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!UpdateData) return res.status(404).json("Data Not Found");
    return res.status(200).json(UpdateData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE
router.delete("/enquire/:id", async (req, res) => {
  try {
    const DeleteData = await EnquireSchema.findByIdAndDelete(req.params.id);
    if (!DeleteData) return res.status(404).json("Data Not Found!");
    res.status(200).json("Data Deleted Successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;