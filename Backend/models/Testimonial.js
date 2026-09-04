const mongoose = require("mongoose");


// ── Google Review ─────────────────────────────────────────────
const testimonialSchema = new mongoose.Schema({
  test_id: {
    type: String,
    unique: true,
    trim: true,
  },
  client_name: {
    type: String,
  },
  client_review: {
    type: String,
  },
  rating_stars: {
    type: Number,
  },
  test_status: {
    type: String,
    default: "active",
  },
});

// ── Evidence of Progress (Before / After case studies) ────────
const evidenceOfProgressSchema = new mongoose.Schema(
  {
    eop_id: {
      type: String,
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Skin Conditions",
        "Hair Disorders",
        "Respiratory Issues",
        "Children's Health",
        "Women's Health",
        "Chronic Diseases",
      ],
    },
    before_image: {
      type: String, // image path
    },
    after_image: {
      type: String, // image path
    },
    condition: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    outcome: {
      type: String,
    },
    eop_status: {
      type: String,
      default: "active",
    },
  },
  { timestamps: true }
);

// ── Video Testimonial ─────────────────────────────────────────
const videoTestimonialSchema = new mongoose.Schema(
  {
    vid_id: {
      type: String,
      unique: true,
      trim: true,
    },
    thumbnail_image: {
      type: String, // image path
    },
    video_file: { type: String },
    patient_name: {
      type: String,
      required: true,
    },
    condition: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    vid_status: {
      type: String,
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = {
  Testimonial: mongoose.model("Testimonial", testimonialSchema),
  EvidenceOfProgress: mongoose.model("EvidenceOfProgress", evidenceOfProgressSchema),
  VideoTestimonial: mongoose.model("VideoTestimonial", videoTestimonialSchema),
};