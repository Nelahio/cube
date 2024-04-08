const mongoose = require("mongoose");

const enchereUpdatedSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  make: String,
  name: String,
  year: Number,
  color: String,
  category: Number,
  description: String,
  imageUrl: String,
  state: String,
});

const EnchereUpdated = mongoose.model("EnchereUpdated", enchereUpdatedSchema);

module.exports = EnchereUpdated;
