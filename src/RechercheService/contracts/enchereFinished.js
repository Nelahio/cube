const mongoose = require("mongoose");

const enchereFinishedSchema = new mongoose.Schema(
  {
    itemSold: Boolean,
    auctionId: { type: String, required: true },
    winner: String,
    seller: String,
    amount: { type: Number, required: false },
  },
  { _id: false, autoIndex: false }
);

const EnchereFinished = mongoose.model(
  "EnchereFinished",
  enchereFinishedSchema
);

module.exports = EnchereFinished;
