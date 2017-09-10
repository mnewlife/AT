"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
/******************************************************************************/
var newAirtimeStockSchema = new mongoose.Schema({
    initialBalance: { type: Number, min: 0, default: 0 },
    newBalance: { type: Number, min: 0, default: 0 },
    amount: { type: Number, min: 0, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
/******************************************************************************/
var MongooseModel = mongoose.model("NewAirtimeStock", newAirtimeStockSchema);
exports.MongooseModel = MongooseModel;
/******************************************************************************/
