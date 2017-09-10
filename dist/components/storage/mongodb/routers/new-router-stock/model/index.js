"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var preparation_1 = require("../../../preparation");
/******************************************************************************/
var newRouterStockSchema = new mongoose.Schema({
    type: { type: String, set: preparation_1.ignoreEmpty },
    initialCount: { type: Number, min: 0, default: 0 },
    newCount: { type: Number, min: 0, default: 0 },
    amount: { type: Number, min: 0, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
/******************************************************************************/
var MongooseModel = mongoose.model("NewRouterStock", newRouterStockSchema);
exports.MongooseModel = MongooseModel;
/******************************************************************************/
