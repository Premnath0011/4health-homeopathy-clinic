const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
    },
  },
  { _id: false },
);

const blogSchema = new mongoose.Schema(
  {
    blog_id: {
      type: String,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
    },
    category: {
      type: String,
      default: "Uncategorized",
      trim: true,
    },
    image: {
      type: String,
    },
    excerpt: {
      type: String,
    },
    sections: {
      type: [sectionSchema],
      default: [],
    },
    content: {
      type: String,
    },
    views: {
      type: Number,
      default: 0,
    },
    blog_status: {
      type: String,
      enum: ["published", "draft"],
      default: "published",
    },
    isPopular: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Blog", blogSchema);
