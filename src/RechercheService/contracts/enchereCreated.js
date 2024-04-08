const mongoose = require("mongoose");

const enchereCreatedSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  reservePrice: { type: Number, default: 0 },
  seller: String,
  winner: String,
  soldAmount: Number,
  currentHighBid: Number,
  createdAt: Date,
  updatedAt: Date,
  auctionEnd: Date,
  status: String,
  make: String,
  name: String,
  year: Number,
  color: String,
  category: String,
  state: String,
  description: String,
  imageUrl: String,
});

const EnchereCreated = mongoose.model("EnchereCreated", enchereCreatedSchema);

module.exports = EnchereCreated;
