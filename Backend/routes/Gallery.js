const express = require("express");
const fs = require("fs");
const path = require("path");
const Gallery = require("../models/Gallery");
const { galleryUpload } = require("../middlewares/upload");

const router = express.Router();
const ALLOWED_CATEGORIES = ["clinic", "treatments", "wellness", "care", "results"];
const ALLOWED_SIZES = ["small", "medium", "large"];
const ALLOWED_STATUSES = ["Active", "Inactive"];

const removeUploadedFile = (relativePath) => {
  if (!relativePath || typeof relativePath !== "string") return;
  const normalized = relativePath.replace(/^\/+/, "");
  const fullPath = path.resolve(__dirname, "..", normalized);
  const uploadsRoot = path.resolve(__dirname, "..", "uploads");

  // Delete only files inside this project's uploads folder.
  if (!fullPath.startsWith(uploadsRoot)) return;
  if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
};

const normalizeBody = (body = {}) => ({
  title: String(body.title || "").trim(),
  category: ALLOWED_CATEGORIES.includes(body.category) ? body.category : "clinic",
  size: ALLOWED_SIZES.includes(body.size) ? body.size : "medium",
  displayOrder: Number.isFinite(Number(body.displayOrder))
    ? Math.max(0, Number(body.displayOrder))
    : 0,
  status: ALLOWED_STATUSES.includes(body.status) ? body.status : "Active",
});

// Public/admin gallery list. Public page can request ?status=Active.
router.get("/gallery", async (req, res) => {
  try {
    const filter = {};
    if (ALLOWED_STATUSES.includes(req.query.status)) filter.status = req.query.status;
    if (ALLOWED_CATEGORIES.includes(req.query.category)) filter.category = req.query.category;

    const items = await Gallery.find(filter).sort({ displayOrder: 1, createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Failed to load gallery images", error: error.message });
  }
});

router.get("/gallery/:id", async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Gallery image not found" });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "Failed to load gallery image", error: error.message });
  }
});

router.post("/gallery", galleryUpload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please select an image" });
    }

    const values = normalizeBody(req.body);
    if (!values.title) {
      removeUploadedFile(`/uploads/gallery/${req.file.filename}`);
      return res.status(400).json({ message: "Gallery title is required" });
    }

    const item = await Gallery.create({
      ...values,
      image: `/uploads/gallery/${req.file.filename}`,
    });

    res.status(201).json(item);
  } catch (error) {
    if (req.file) removeUploadedFile(`/uploads/gallery/${req.file.filename}`);
    res.status(400).json({ message: error.message || "Failed to add gallery image" });
  }
});

router.put("/gallery/:id", galleryUpload.single("image"), async (req, res) => {
  let uploadedImagePath = null;
  try {
    const existing = await Gallery.findById(req.params.id);
    if (!existing) {
      if (req.file) removeUploadedFile(`/uploads/gallery/${req.file.filename}`);
      return res.status(404).json({ message: "Gallery image not found" });
    }

    const values = normalizeBody(req.body);
    if (!values.title) {
      if (req.file) removeUploadedFile(`/uploads/gallery/${req.file.filename}`);
      return res.status(400).json({ message: "Gallery title is required" });
    }

    if (req.file) {
      uploadedImagePath = `/uploads/gallery/${req.file.filename}`;
      values.image = uploadedImagePath;
    }

    const oldImage = existing.image;
    Object.assign(existing, values);
    await existing.save();

    if (uploadedImagePath && oldImage !== uploadedImagePath) removeUploadedFile(oldImage);
    res.status(200).json(existing);
  } catch (error) {
    if (uploadedImagePath) removeUploadedFile(uploadedImagePath);
    res.status(400).json({ message: error.message || "Failed to update gallery image" });
  }
});

router.patch("/gallery/:id/status", async (req, res) => {
  try {
    if (!ALLOWED_STATUSES.includes(req.body.status)) {
      return res.status(400).json({ message: "Invalid gallery status" });
    }

    const item = await Gallery.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true },
    );

    if (!item) return res.status(404).json({ message: "Gallery image not found" });
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message || "Failed to update status" });
  }
});

router.delete("/gallery/:id", async (req, res) => {
  try {
    const item = await Gallery.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Gallery image not found" });

    removeUploadedFile(item.image);
    res.status(200).json({ message: "Gallery image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete gallery image", error: error.message });
  }
});

module.exports = router;
