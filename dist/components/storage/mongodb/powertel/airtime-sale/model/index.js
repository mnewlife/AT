"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var preparation_1 = require("../../../preparation");
/******************************************************************************/
var airtimeSaleSchema = new mongoose.Schema({
    buyerName: { type: String, set: preparation_1.ignoreEmpty },
    card: {
        cardId: { type: String, set: preparation_1.ignoreEmpty },
        mdn: { type: Number, min: 0, default: 0 },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    },
    user: {
        userId: mongoose.Schema.Types.ObjectId,
        emailAddress: { type: String, set: preparation_1.ignoreEmpty },
        fullName: { type: String, set: preparation_1.ignoreEmpty },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
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
