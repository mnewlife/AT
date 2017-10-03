"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
/******************************************************************************/
var channelSchema = new mongoose.Schema({
    allocated: { type: Boolean, default: false },
    allocatedTo: mongoose.Schema.Types.ObjectId,
    code: { type: String },
    phoneNumber: { type: String },
    password: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
/******************************************************************************/
var MongooseModel = mongoose.model("Channel", channelSchema);
exports.MongooseModel = MongooseModel;
/******************************************************************************/
