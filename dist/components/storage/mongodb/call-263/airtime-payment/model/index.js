"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var preparation_1 = require("../../../preparation");
;
/******************************************************************************/
var airtimePaymentSchema = new mongoose.Schema({
    user: {
        userId: mongoose.Schema.Types.ObjectId,
        emailAddress: { type: String, set: preparation_1.ignoreEmpty },
        fullName: { type: String, set: preparation_1.ignoreEmpty }
    },
    channelId: mongoose.Schema.Types.ObjectId,
    transaction: {
        identifier: { type: String, set: preparation_1.ignoreEmpty },
        amount: { type: Number, min: 0, default: 0 },
        method: { type: String, set: preparation_1.ignoreEmpty }
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
/******************************************************************************/
var MongooseModel = mongoose.model("AirtimePayment", airtimePaymentSchema);
exports.MongooseModel = MongooseModel;
/******************************************************************************/
