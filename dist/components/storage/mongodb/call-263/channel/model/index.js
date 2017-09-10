"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var preparation_1 = require("../../../preparation");
/******************************************************************************/
var channelSchema = new mongoose.Schema({
    allocated: { type: Boolean, default: false },
    allocatedTo: mongoose.Schema.Types.ObjectId,
    code: { type: String, set: preparation_1.ignoreEmpty },
    phoneNumber: { type: String, set: preparation_1.ignoreEmpty },
    password: { type: String, set: preparation_1.ignoreEmpty },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
/******************************************************************************/
var MongooseModel = mongoose.model("Channel", channelSchema);
exports.MongooseModel = MongooseModel;
/******************************************************************************/
