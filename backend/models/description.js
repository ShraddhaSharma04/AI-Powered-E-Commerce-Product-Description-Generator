const mongoose = require("mongoose");

const descriptionSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    ingredients: {
      type: String,
      required: true,
    },
    weight: {
      type: String,
      required: true,
    },
    tone: {
      type: String,
      required: true,
      enum: ["Premium", "Traditional", "Health-Focused"],
    },
    features: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Description", descriptionSchema);