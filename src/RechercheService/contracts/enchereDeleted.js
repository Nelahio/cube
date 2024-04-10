const mongoose = require("mongoose");

const enchereDeletedSchema = new mongoose.Schema({
  _id: { type: String, required: true },
});

const EnchereDeleted = mongoose.model("EnchereUpdated", enchereDeletedSchema);

module.exports = EnchereDeleted;
