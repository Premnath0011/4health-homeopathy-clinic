const crypto = require("crypto");
const GoogleReview = require("../models/Googlereview");
const getGoogleReviews = require("../services/googleReviewService");

const syncGoogleReviews = async () => {
  const data = await getGoogleReviews();

  if (!data) {
    throw new Error("No data received from Google");
  }

  let savedCount = 0;

  if (data.reviews && data.reviews.length > 0) {
    for (const r of data.reviews) {
      // const uniqueString = `${r.author_name}-${r.time}`;
      const uniqueString = `${r.author_url}-${r.text}`;
      const review_id = crypto
        .createHash("md5")
        .update(uniqueString)
        .digest("hex");

      await GoogleReview.findOneAndUpdate(
        { review_id },
        {
          review_id,
          author_name: r.author_name,
          author_url: r.author_url || "",
          profile_photo_url: r.profile_photo_url || "",
          rating: r.rating,
          text: r.text || "",
          time: r.time,
          relative_time_description: r.relative_time_description || "",
        },
        { upsert: true, new: true, runValidators: true },
      );

      savedCount++;
    }
  }

  return {
    overallRating: data.rating,
    totalRatings: data.user_ratings_total,
    syncedCount: savedCount,
  };
};

module.exports = syncGoogleReviews;
