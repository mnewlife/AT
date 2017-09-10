"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var preparation_1 = require("../../../preparation");
/******************************************************************************/
var airtimeTransferSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    channelId: mongoose.Schema.Types.ObjectId,
    paymentId: mongoose.Schema.Types.ObjectId,
    transfer: {
        identifier: { type: String, set: preparation_1.ignoreEmpty },
        amount: { type: Number, min: 0, default: 0 },
        paymentRecorded: { type: String, set: preparation_1.ignoreEmpty },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
/******************************************************************************/
var MongooseModel = mongoose.model("AirtimeTransfer", airtimeTransferSchema);
exports.MongooseModel = MongooseModel;
/******************************************************************************/
