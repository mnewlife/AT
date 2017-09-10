"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var preparation_1 = require("../../../preparation");
/******************************************************************************/
var shopSchema = new mongoose.Schema({
    shopName: { type: String, set: preparation_1.ignoreEmpty },
    images: [String],
    numProducts: { type: Number, min: 0, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
/******************************************************************************/
var MongooseModel = mongoose.model("Shop", shopSchema);
exports.MongooseModel = MongooseModel;
/******************************************************************************/
