const express = require("express");
const router = express.Router();
const GoogleReview = require("../models/Googlereview");
const syncGoogleReviews = require("../utils/syncGoogleReviews");

// ════════════════════════════════════════════════════════════════
// GOOGLE REVIEWS — SYNC
// ════════════════════════════════════════════════════════════════

// POST /api/google-reviews/sync
// Admin panel la "Sync Reviews"
router.post("/google-reviews/sync", async (req, res) => {
  try {
    const result = await syncGoogleReviews();
    return res.status(200).json({
      message: "Reviews synced successfully",
      ...result,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// ════════════════════════════════════════════════════════════════
// GOOGLE REVIEWS — READ (Website / Admin panel
// ════════════════════════════════════════════════════════════════

// GET ALL
router.get("/google-reviews", async (req, res) => {
  try {
    const getData = await GoogleReview.find().sort({ time: -1 });
    console.log("Backend Count :", getData.length);
    return res.status(200).json(getData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET BY ID
router.get("/google-reviews/:id", async (req, res) => {
  try {
    const getByIdData = await GoogleReview.findById(req.params.id);
    if (!getByIdData) {
      return res.status(404).json({ message: "Data Not Found" });
    }
    return res.status(200).json(getByIdData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE
router.delete("/google-reviews/:id", async (req, res) => {
  try {
    const deleteData = await GoogleReview.findByIdAndDelete(req.params.id);
    if (!deleteData) {
      return res.status(404).json({ message: "Data Not Found" });
    }
    return res.status(200).json({ message: "Review Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
