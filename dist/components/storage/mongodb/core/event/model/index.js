"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var x = require("../../../basic-schema");
/******************************************************************************/
var eventSchema = new mongoose.Schema({
    context: x.StringSchema,
    identifier: x.StringSchema,
    tags: [x.StringSchema],
    data: x.MixedSchema,
    createdAt: x.DateSchema,
    updatedAt: x.DateSchema
});
/******************************************************************************/
var MongooseModel = mongoose.model("Event", eventSchema);
exports.MongooseModel = MongooseModel;
/******************************************************************************/
