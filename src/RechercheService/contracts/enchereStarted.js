const { default: mongoose } = require("mongoose");

const enchereStartedSchema = new mongoose.Schema(
  {
    seller: String,
    auctionId: { type: String, required: true },
  },
  { _id: false, autoIndex: false }
);

const EnchereStarted = mongoose.model("EnchereStarted", enchereStartedSchema);

module.exports = EnchereStarted;
