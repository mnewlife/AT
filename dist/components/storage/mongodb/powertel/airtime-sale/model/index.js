"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
/******************************************************************************/
var airtimeSaleSchema = new mongoose.Schema({
    buyerName: { type: String },
    card: {
        cardId: { type: String },
        mdn: { type: Number, min: 0, default: 0 }
    },
    user: {
        userId: mongoose.Schema.Types.ObjectId,
        emailAddress: { type: String },
        fullName: { type: String }
    },
    amount: { type: Number, min: 0, default: 0 },
    bundles: {
        gb: { type: Number, min: 0, default: 0 },
        days: { type: Number, min: 0, default: 0 }
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
/******************************************************************************/
var MongooseModel = mongoose.model("AirtimeSale", airtimeSaleSchema);
exports.MongooseModel = MongooseModel;
/******************************************************************************/
