const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Gallery title is required"],
      trim: true,
      maxlength: 120,
    },
    category: {
      type: String,
      enum: ["clinic", "treatments", "wellness", "care", "results"],
      default: "clinic",
      index: true,
    },
    image: {
      type: String,
      required: [true, "Gallery image is required"],
    },
    size: {
      type: String,
      enum: ["small", "medium", "large"],
      default: "medium",
    },
    displayOrder: {
      type: Number,
      default: 0,
      min: 0,
      index: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
      index: true,
    },
  },
  { timestamps: true },
);

gallerySchema.index({ status: 1, displayOrder: 1, createdAt: -1 });

module.exports = mongoose.model("Gallery", gallerySchema);
