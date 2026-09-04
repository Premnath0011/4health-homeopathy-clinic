const multer = require("multer");
const path = require("path");

const jsonUpload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
  },

  fileFilter: (req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();

    const isJson =
      extension === ".json" ||
      file.mimetype === "application/json" ||
      file.mimetype === "text/json";

    if (!isJson) {
      return callback(new Error("Only JSON files are allowed."));
    }

    callback(null, true);
  },
});

module.exports = jsonUpload;