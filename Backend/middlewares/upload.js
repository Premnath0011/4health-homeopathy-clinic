// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// // Absolute paths
// const uploadDir = path.join(__dirname, "..", "uploads");
// const blogUploadDir = path.join(__dirname, "..", "uploads", "blogs");

// // Create folders if they don't exist
// [uploadDir, blogUploadDir].forEach((dir) => {
//   if (!fs.existsSync(dir)) {
//     fs.mkdirSync(dir, { recursive: true });
//   }
// });

// // Storage configuration for general uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDir);
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 100000);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   },
// });

// // Storage configuration specifically for blog images
// const blogStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, blogUploadDir);
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 100000);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   },
// });

// // File filter - only allow images
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png|gif|webp|svg|bmp|tiff/i;
//   const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = allowedTypes.test(file.mimetype);

//   if (mimetype && extname) {
//     return cb(null, true);
//   } else {
//     cb(new Error("Error: Only image files are allowed!"));
//   }
// };

// // Create multer instances
// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 10 * 1024 * 1024, // 10MB limit
//   },
//   fileFilter: fileFilter,
// });

// const blogUpload = multer({
//   storage: blogStorage,
//   limits: {
//     fileSize: 10 * 1024 * 1024, // 10MB limit
//   },
//   fileFilter: fileFilter,
// });

// // Export both configurations
// module.exports = upload;
// module.exports.blogUpload = blogUpload;




const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "..", "uploads");
const blogUploadDir = path.join(uploadDir, "blogs");
const galleryUploadDir = path.join(uploadDir, "gallery");

[uploadDir, blogUploadDir, galleryUploadDir].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const createStorage = (destination) =>
  multer.diskStorage({
    destination(req, file, cb) {
      cb(null, destination);
    },
    filename(req, file, cb) {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 100000)}`;
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  });

const allowedImageExtensions = new Set([
  ".jpeg",
  ".jpg",
  ".jfif",
  ".png",
  ".gif",
  ".webp",
  ".svg",
  ".bmp",
  ".tif",
  ".tiff",
  ".avif",
]);

const fileFilter = (req, file, cb) => {
  const extension = path.extname(file.originalname || "").toLowerCase();
  const isImageMime = String(file.mimetype || "")
    .toLowerCase()
    .startsWith("image/");
  const hasAllowedExtension = allowedImageExtensions.has(extension);

  if (isImageMime && hasAllowedExtension) {
    return cb(null, true);
  }

  return cb(
    new Error(
      "Only image files are allowed (JPG, JPEG, JFIF, PNG, GIF, WEBP, SVG, BMP, TIFF, AVIF).",
    ),
  );
};

const options = (storage) => ({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter,
});

const upload = multer(options(createStorage(uploadDir)));
const blogUpload = multer(options(createStorage(blogUploadDir)));
const galleryUpload = multer(options(createStorage(galleryUploadDir)));

module.exports = upload;
module.exports.blogUpload = blogUpload;
module.exports.galleryUpload = galleryUpload;