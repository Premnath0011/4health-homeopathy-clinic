const mongoose = require("mongoose");
const generateId = require("../CommonIdGenerate/GenerateId");

const AppoinmentSchema = new mongoose.Schema(
  {
    appoinmnet_id: {
      type: String,
      unique: true,
    },
    patient_name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    patient_mobile: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },
    service: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    message: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },
    status: {
      type: String,
      enum: ["Scheduled", "Completed", "Cancelled"],
      default: "Scheduled",
    },
  },
  { timestamps: true },
);

AppoinmentSchema.pre("save", async function (next) {
  if (this.appoinmnet_id) return next();

  try {
    this.appoinmnet_id = await generateId("appoinmnet_id");
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("AppoinmentSchema", AppoinmentSchema);
