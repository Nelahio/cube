const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const produitSchema = new Schema({
    ReservePrice: Number,
    Seller: String,
    Winner: String,
    SoldAmount: Number,
    CurrentHighBid: Number,
    CreatedAt: Date,
    UpdatedAt: Date,
    AuctionEnd: Date,
    Status: String,
    Make: String,
    Name: String,
    Year: Number,
    Color: String,
    Description: String,
    ImageUrl: String,
    Category: String,
    State: String
});

produitSchema.index({ Make: 'text', Name: 'text', Color: 'text' });

const Produit = model('Produit', produitSchema);

module.exports = Produit;