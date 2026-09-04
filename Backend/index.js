const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const cron = require("node-cron");

const path = require("path");

const app = express();
require("./whatsappClient");

const syncGoogleReviews = require("./utils/syncGoogleReviews");

app.use(
  cors({
    origin: "*",
    methods: ["POST", "GET", "PUT", "DELETE", "PATCH"],
  }),
);

app.use(express.json({ limit: "16mb" }));
app.use(express.urlencoded({ extended: true, limit: "16mb" }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 8000;
const MONGODB_URL = process.env.MONGODB_URL;

const userRouter = require("./routes/User.js");
const EnquireRouter = require("./routes/Enquire.js");
const AppoinmentRouter = require("./routes/Appoinment.js");
const TestimonialRouter = require("./routes/Testimonial.js");
const BlogRouter = require("./routes/Blog.js");
const ServiceRouter = require("./routes/Service.js");
const GalleryRouter = require("./routes/Gallery.js");
const GoogleReviewRouter = require("./routes/GoogleReview.js");

app.use("/api", userRouter);
app.use("/api", EnquireRouter);
app.use("/api", AppoinmentRouter);
app.use("/api", TestimonialRouter);
app.use("/api", BlogRouter);
app.use("/api", ServiceRouter);
app.use("/api", GalleryRouter);

app.use("/api", GoogleReviewRouter);

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log(error.message);
  });

// ── Google Reviews Auto-Sync ──

syncGoogleReviews()

  .then((r) => console.log("✅ Google Reviews initial sync:", r))

  .catch((err) => console.error("❌ Google Reviews sync failed:", err.message));



// daily morning 6of clock auto sync (server timezone)

cron.schedule("0 6 * * *", async () => {

  console.log("⏰ Running scheduled Google Reviews sync...");

  try {

    const result = await syncGoogleReviews();

    console.log("✅ Scheduled sync done:", result);

  } catch (err) {

    console.error("❌ Scheduled sync failed:", err.message);

  }

});

app.listen(PORT, () => {
  console.log(`Server Running Port Number is ${PORT}`);
});
