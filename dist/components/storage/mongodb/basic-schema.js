"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
/******************************************************************************/
exports.StringSchema = String;
exports.NumberSchema = { type: Number, min: 0, default: 0 };
exports.BooleanSchema = { type: Boolean, default: false };
exports.DateSchema = { type: Date, default: Date.now };
exports.ObjectIdSchema = mongoose.Schema.Types.ObjectId;
exports.MixedSchema = mongoose.Schema.Types.Mixed;
/******************************************************************************/
