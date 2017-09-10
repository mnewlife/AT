"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var preparation_1 = require("../../../preparation");
/******************************************************************************/
var subscriptionSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    subscription: { type: String, set: preparation_1.ignoreEmpty },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
/******************************************************************************/
var MongooseModel = mongoose.model("Subscription", subscriptionSchema);
exports.MongooseModel = MongooseModel;
/******************************************************************************/
