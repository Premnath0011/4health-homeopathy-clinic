const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    service_id: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      default: "Homeopathy",
      trim: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    doctors: {
      type: Number,
      default: 0,
      min: 0,
    },
    patients: {
      type: Number,
      default: 0,
      min: 0,
    },
    // New item structure:
    // { title, description, symptoms: [], howWeHelp: [] }
    // Mixed also keeps older string/content records readable until edited.
    conditions: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },
    // Legacy service-level arrays are retained only to migrate old records.
    // New create/update requests store these inside each condition.
    symptoms: {
      type: [String],
      default: undefined,
    },
    howWeHelp: {
      type: [String],
      default: undefined,
    },
    quote: {
      type: String,
      default: "",
    },
    approach: {
      type: String,
      default: "",
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Service", serviceSchema);
