"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var preparation_1 = require("../../../preparation");
;
/******************************************************************************/
var saleSchema = new mongoose.Schema({
    buyer: {
        fullName: { type: String, set: preparation_1.ignoreEmpty },
        emailAddress: { type: String, set: preparation_1.ignoreEmpty },
        phoneNumber: { type: String, set: preparation_1.ignoreEmpty }
    },
    simCard: {
        cardId: mongoose.Schema.Types.ObjectId,
        mdn: { type: Number, min: 0, default: 0 }
    },
    type: { type: String, set: preparation_1.ignoreEmpty },
    paymentMethod: { type: String, set: preparation_1.ignoreEmpty },
    unitCost: { type: Number, min: 0, default: 0 },
    amount: { type: Number, min: 0, default: 0 },
    totalCost: { type: Number, min: 0, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
/******************************************************************************/
var MongooseModel = mongoose.model("Sale", saleSchema);
exports.MongooseModel = MongooseModel;
/******************************************************************************/
