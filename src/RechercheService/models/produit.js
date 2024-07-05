const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const produitSchema = new Schema({
  _id: { type: String, required: true },
  reservePrice: Number,
  seller: String,
  winner: String,
  soldAmount: Number,
  currentHighBid: Number,
  createdAt: Date,
  updatedAt: Date,
  auctionStart: Date,
  auctionEnd: Date,
  status: String,
  make: String,
  name: String,
  year: Number,
  color: String,
  description: String,
  imageUrl: String,
  category: String,
  state: String,
});

produitSchema.index({ make: "text", name: "text", color: "text" });

const Produit = model("Produit", produitSchema);

module.exports = Produit;
