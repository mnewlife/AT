"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var preparation_1 = require("../../../preparation");
/******************************************************************************/
var eventSchema = new mongoose.Schema({
    context: { type: String, set: preparation_1.ignoreEmpty },
    identifier: { type: String, set: preparation_1.ignoreEmpty },
    tags: [String],
    data: mongoose.Schema.Types.Mixed,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
/******************************************************************************/
var MongooseModel = mongoose.model("Event", eventSchema);
exports.MongooseModel = MongooseModel;
/******************************************************************************/
