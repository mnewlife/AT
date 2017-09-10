"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
/******************************************************************************/
var priceSchema = new mongoose.Schema({
    productId: mongoose.Schema.Types.ObjectId,
    shopId: mongoose.Schema.Types.ObjectId,
    quantity: { type: Number, min: 0, default: 0 },
    price: { type: Number, min: 0, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
/******************************************************************************/
var MongooseModel = mongoose.model("Price", priceSchema);
exports.MongooseModel = MongooseModel;
/******************************************************************************/
