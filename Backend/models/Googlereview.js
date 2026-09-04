const mongoose = require("mongoose");

const GoogleReviewSchema = new mongoose.Schema(
  {
    review_id: {
      type: String,
      unique: true,
    },

    author_name: String,

    author_url: String,

    profile_photo_url: String,

    rating: Number,

    text: String,

    time: Number,

    relative_time_description: String,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("GoogleReview", GoogleReviewSchema);
