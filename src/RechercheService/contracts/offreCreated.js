const mongoose = require("mongoose");

const offreCreatedSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  auctionId: { type: String, required: true },
  bidder: { type: String, required: true },
  bidTime: { type: Date, required: true },
  amount: { type: Number, required: true },
  bidStatus: { type: String, required: true },
});

const OffreCreated = mongoose.model("OffreCreated", offreCreatedSchema);

module.exports = OffreCreated;
