"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
/******************************************************************************/
var amountsSchema = new mongoose.Schema({
    type: { type: String },
    count: { type: Number, min: 0, default: 0 },
    newStock: { type: Number, min: 0, default: 0 },
    sold: { type: Number, min: 0, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
/******************************************************************************/
var MongooseModel = mongoose.model("Amounts", amountsSchema);
exports.MongooseModel = MongooseModel;
/******************************************************************************/
