const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      unique: true,
      trim: true,
    },

    user_name: {
      type: String,
      trim: true,
    },

    user_mobile: {
      type: String,
    },

    user_mail: {
      type: String,
    },

    user_password: {
      type: String,
      required: true,
      // select: false,
    },

    user_role: {
      type: String,
      default: "Admin",
    },

    status: {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
