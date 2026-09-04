//Enquire Modal
const mongoose = require("mongoose");
const generateId = require("../CommonIdGenerate/GenerateId"); 
const EnquireSchema = new mongoose.Schema(
  {
    enquire_id: {
      type: String,
      unique: true, 
    },
    name: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    email: { type: String },
    enquire_date: { type: String, required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["New", "Contacted", "Resolved"],
      default: "New",
    },
  },
  { timestamps: true }
);

EnquireSchema.pre("save", async function (next) {
  if (this.enquire_id) return next();

  try {
    this.enquire_id = await generateId("enquire_id");
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("EnquireSchema", EnquireSchema);