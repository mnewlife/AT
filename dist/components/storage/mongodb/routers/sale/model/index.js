"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
;
/******************************************************************************/
var saleSchema = new mongoose.Schema({
    buyer: {
        fullName: { type: String },
        emailAddress: { type: String },
        phoneNumber: { type: String }
    },
    simCard: {
        cardId: mongoose.Schema.Types.ObjectId,
        mdn: { type: Number, min: 0, default: 0 }
    },
    type: { type: String },
    paymentMethod: { type: String },
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
