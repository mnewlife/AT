"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
/******************************************************************************/
var airtimeTransferSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    channelId: mongoose.Schema.Types.ObjectId,
    paymentId: mongoose.Schema.Types.ObjectId,
    transfer: {
        identifier: { type: String },
        amount: { type: Number, min: 0, default: 0 },
        paymentRecorded: { type: String }
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
/******************************************************************************/
var MongooseModel = mongoose.model("AirtimeTransfer", airtimeTransferSchema);
exports.MongooseModel = MongooseModel;
/******************************************************************************/
