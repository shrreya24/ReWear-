const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  points:   { type: Number, default: 0 },
  avatar:   { type: String, default: "" },
  createdAt:{ type: Date, default: Date.now }
});

// ✅ FIX: Prevent model overwrite error
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
