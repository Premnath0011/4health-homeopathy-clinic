const axios = require("axios");

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const GOOGLE_PLACE_ID = process.env.GOOGLE_PLACE_ID;

// Keep this as "true" until Google Cloud Billing is enabled.
// Set USE_MOCK_REVIEWS=true/false in your .env file.
const USE_MOCK_REVIEWS = process.env.USE_MOCK_REVIEWS === "true";

// Google Place Name
const PLACE_NAME = "4Health Homeo Hospital";

// ── Mock data used only for testing ──
// The structure matches the real Google Places API response,
// so the same database save logic will work with real data later.
const MOCK_REVIEW_DATA = {
  name: PLACE_NAME,
  rating: 4.6,
  user_ratings_total: 132,
  reviews: [
    {
      author_name: "Ramesh Kumar",
      author_url: "https://www.google.com/maps/contrib/mock1",
      profile_photo_url: "https://via.placeholder.com/50",
      rating: 5,
      text: "Very good treatment and friendly staff. Highly recommended for homeo consultation.",
      // time: Math.floor(Date.now() / 1000) - 86400 * 3,
      time: 1782901143,
      relative_time_description: "3 days ago",
    },
    {
      author_name: "Priya Sundaram",
      author_url: "https://www.google.com/maps/contrib/mock2",
      profile_photo_url: "https://via.placeholder.com/50",
      rating: 4,
      text: "Doctor explained everything clearly. Good improvement after few weeks.",
      time: Math.floor(Date.now() / 1000) - 86400 * 10,
      relative_time_description: "10 days ago",
    },
    {
      author_name: "Karthik M",
      author_url: "https://www.google.com/maps/contrib/mock3",
      profile_photo_url: "https://via.placeholder.com/50",
      rating: 5,
      text: "Clean hospital, on-time appointments, and effective medicines.",
      time: Math.floor(Date.now() / 1000) - 86400 * 20,
      relative_time_description: "3 weeks ago",
    },
  ],
};

const getGoogleReviews = async () => {
  // ═══════════ MOCK MODE (Testing without Google API) ═══════════
  if (USE_MOCK_REVIEWS) {
    console.log(
      "⚠️ MOCK MODE: Returning fake review data without calling Google Places API.",
    );
    return MOCK_REVIEW_DATA;
  }

  // ═══════════ REAL MODE (After Billing is enabled) ═══════════
  try {
    // Step 1 - Find the Google Place ID
    // const placeResponse = await axios.get(
    //   "https://maps.googleapis.com/maps/api/place/findplacefromtext/json",
    //   {
    //     params: {
    //       input: PLACE_NAME,
    //       inputtype: "textquery",
    //       fields: GOOGLE_PLACE_ID,
    //       key: GOOGLE_API_KEY,
    //     },
    //   },
    // );

    // if (
    //   !placeResponse.data.candidates ||
    //   placeResponse.data.candidates.length === 0
    // ) {
    //   throw new Error("Place not found");
    // }

    // const placeId = placeResponse.data.candidates[0].place_id;

    if (!GOOGLE_PLACE_ID) {
      throw new Error("GOOGLE_PLACE_ID not connected");
    }

    // Step 2 - Fetch place details along with reviews
    const detailsResponse = await axios.get(
      "https://maps.googleapis.com/maps/api/place/details/json",
      {
        params: {
          place_id: GOOGLE_PLACE_ID,
          fields: "name,rating,user_ratings_total,reviews",
          key: GOOGLE_API_KEY,
        },
      },
    );

    return detailsResponse.data.result;
  } catch (error) {
    console.error(
      "Google Review Error:",
      error.response?.data || error.message,
    );

    throw error;
  }
};

module.exports = getGoogleReviews;
