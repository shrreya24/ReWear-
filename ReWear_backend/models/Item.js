// models/Item.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: String,
  description: String,
  yearsUsed: Number,
  image: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, default: 'active' }
}, { timestamps: true });

module.exports = mongoose.models.Item || mongoose.model('Item', itemSchema);
