const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: String,
  description: String,
  yearsUsed: Number,
  imageUrl: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now }
});

// ✅ FIX: Prevent model overwrite error
module.exports = mongoose.models.Item || mongoose.model("Item", itemSchema);
