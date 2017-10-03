"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
;
/******************************************************************************/
var airtimePaymentSchema = new mongoose.Schema({
    user: {
        userId: mongoose.Schema.Types.ObjectId,
        emailAddress: { type: String },
        fullName: { type: String }
    },
    channelId: mongoose.Schema.Types.ObjectId,
    transaction: {
        identifier: { type: String },
        amount: { type: Number, min: 0, default: 0 },
        method: { type: String }
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
/******************************************************************************/
var MongooseModel = mongoose.model("AirtimePayment", airtimePaymentSchema);
exports.MongooseModel = MongooseModel;
/******************************************************************************/
