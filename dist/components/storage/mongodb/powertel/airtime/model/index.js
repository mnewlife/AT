"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
/******************************************************************************/
var airtimeSchema = new mongoose.Schema({
    checkpoint: { type: Date, default: Date.now },
    newStockValue: { type: Number, min: 0, default: 0 },
    amountSold: { type: Number, min: 0, default: 0 },
    balance: { type: Number, min: 0, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
/******************************************************************************/
var MongooseModel = mongoose.model("Airtime", airtimeSchema);
exports.MongooseModel = MongooseModel;
/******************************************************************************/
