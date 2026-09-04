const express = require("express");
const router = express.Router();
const {
  Testimonial,
  EvidenceOfProgress,
  VideoTestimonial,
} = require("../models/Testimonial");
const generateId = require("../CommonIdGenerate/GenerateId.js");
const upload = require("../middlewares/upload.js");

// ════════════════════════════════════════════════════════════════
// GOOGLE REVIEWS
// ════════════════════════════════════════════════════════════════

// POST
router.post("/testimonial", async (req, res) => {
  try {
    const testId = await generateId("test_id");
    const newTest = await new Testimonial({
      ...req.body,
      test_id: testId,
    }).save();
    return res.status(201).json(newTest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET ALL
router.get("/testimonial", async (req, res) => {
  try {
    const getData = await Testimonial.find().sort({ _id: -1 });
    return res.status(200).json(getData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET BY ID
router.get("/testimonial/:id", async (req, res) => {
  try {
    const getByIdData = await Testimonial.findById(req.params.id);
    if (!getByIdData) {
      return res.status(404).json({ message: "Data Not Found" });
    }
    return res.status(200).json(getByIdData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE — video-testimonial (fix existing route)
router.put("/video-testimonial/:id", upload.single("thumbnail_image"), async (req, res) => {
  try {
    const existing = await VideoTestimonial.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Data Not Found" });

    const thumbnail = req.file
      ? "/uploads/" + req.file.filename
      : existing.thumbnail_image; // DB-லேருந்து எடு

    const updateData = await VideoTestimonial.findByIdAndUpdate(
      req.params.id,
      {
        thumbnail_image: thumbnail,
        patient_name: req.body.patient_name,
        condition: req.body.condition,
        duration: req.body.duration,
        featured: req.body.featured,
        vid_status: req.body.vid_status,
        video_file: req.body.video_file || existing.video_file, // video url/path
      },
      { new: true, runValidators: true }
    );
    return res.status(200).json(updateData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE
router.delete("/testimonial/:id", async (req, res) => {
  try {
    const deleteData = await Testimonial.findByIdAndDelete(req.params.id);
    if (!deleteData) {
      return res.status(404).json({ message: "Data Not Found" });
    }
    return res.status(200).json({ message: "Data Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ════════════════════════════════════════════════════════════════
// EVIDENCE OF PROGRESS
// ════════════════════════════════════════════════════════════════

// POST
router.post(
  "/evidence-of-progress",
  upload.fields([
    { name: "before_image", maxCount: 1 },
    { name: "after_image", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const eopId = await generateId("eop_id");

      const beforeImage = req.files?.before_image
  ? "/uploads/" + req.files.before_image[0].filename
  : "";

const afterImage = req.files?.after_image
  ? "/uploads/" + req.files.after_image[0].filename
  : "";

      const newEop = await new EvidenceOfProgress({
        eop_id: eopId,

        category: req.body.category,
        condition: req.body.condition,
        duration: req.body.duration,
        outcome: req.body.outcome,
        eop_status: req.body.eop_status,

        before_image: beforeImage,
        after_image: afterImage,
      }).save();

      return res.status(201).json(newEop);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

// GET ALL
router.get("/evidence-of-progress", async (req, res) => {
  try {
    const getData = await EvidenceOfProgress.find().sort({ _id: -1 });
    return res.status(200).json(getData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET BY ID
router.get("/evidence-of-progress/:id", async (req, res) => {
  try {
    const getByIdData = await EvidenceOfProgress.findById(req.params.id);
    if (!getByIdData) {
      return res.status(404).json({ message: "Data Not Found" });
    }
    return res.status(200).json(getByIdData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE — evidence-of-progress
router.put(
  "/evidence-of-progress/:id",
  upload.fields([
    { name: "before_image", maxCount: 1 },
    { name: "after_image", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      // புதுசா image upload ஆனா புதுசு path, இல்லன்னா DB-ல இருக்குற பழைய path
      const existing = await EvidenceOfProgress.findById(req.params.id);
      if (!existing) {
        return res.status(404).json({ message: "Data Not Found" });
      }

      const beforeImage = req.files?.before_image
        ? "/uploads/" + req.files.before_image[0].filename
        : existing.before_image;  // ← DB-லேருந்து எடு, frontend-லேருந்து இல்ல

      const afterImage = req.files?.after_image
        ? "/uploads/" + req.files.after_image[0].filename
        : existing.after_image;  // ← DB-லேருந்து எடு

      const updateData = await EvidenceOfProgress.findByIdAndUpdate(
        req.params.id,
        {
          category: req.body.category,
          condition: req.body.condition,
          duration: req.body.duration,
          outcome: req.body.outcome,
          eop_status: req.body.eop_status,
          before_image: beforeImage,
          after_image: afterImage,
        },
        { new: true, runValidators: true }
      );

      return res.status(200).json(updateData);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// DELETE
router.delete("/evidence-of-progress/:id", async (req, res) => {
  try {
    const deleteData = await EvidenceOfProgress.findByIdAndDelete(req.params.id);
    if (!deleteData) {
      return res.status(404).json({ message: "Data Not Found" });
    }
    return res.status(200).json({ message: "Data Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ════════════════════════════════════════════════════════════════
// VIDEO TESTIMONIALS
// ════════════════════════════════════════════════════════════════

// POST
router.post(
  "/video-testimonial",
  upload.fields([
    { name: "thumbnail_image", maxCount: 1 },
    { name: "video_file", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const vidId = await generateId("vid_id");

      const thumbnail = req.files?.thumbnail_image
        ? "/uploads/" + req.files.thumbnail_image[0].filename
        : "";

      const videoPath = req.files?.video_file
        ? "/uploads/" + req.files.video_file[0].filename
        : "";

      const newVid = await new VideoTestimonial({
        vid_id: vidId,
        thumbnail_image: thumbnail,
        video_file: videoPath,
        patient_name: req.body.patient_name,
        condition: req.body.condition,
        duration: req.body.duration,
        featured: req.body.featured,
        vid_status: req.body.vid_status,
      }).save();

      return res.status(201).json(newVid);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// GET ALL
router.get("/video-testimonial", async (req, res) => {
  try {
    const getData = await VideoTestimonial.find().sort({ _id: -1 });
    return res.status(200).json(getData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET BY ID
router.get("/video-testimonial/:id", async (req, res) => {
  try {
    const getByIdData = await VideoTestimonial.findById(req.params.id);
    if (!getByIdData) {
      return res.status(404).json({ message: "Data Not Found" });
    }
    return res.status(200).json(getByIdData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE
router.put("/video-testimonial/:id", upload.single("thumbnail_image"), async (req, res) => {
  try {
    const updateData = await VideoTestimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updateData) {
      return res.status(404).json({ message: "Data Not Found" });
    }
    return res.status(200).json(updateData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE
router.delete("/video-testimonial/:id", async (req, res) => {
  try {
    const deleteData = await VideoTestimonial.findByIdAndDelete(req.params.id);
    if (!deleteData) {
      return res.status(404).json({ message: "Data Not Found" });
    }
    return res.status(200).json({ message: "Data Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;