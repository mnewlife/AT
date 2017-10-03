"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var x = require("../../../basic-schema");
/******************************************************************************/
var progressionSchema = new mongoose.Schema({
    type: x.StringSchema,
    typeId: x.ObjectIdSchema,
    subject: x.StringSchema,
    timeMeassure: x.StringSchema,
    amount: x.NumberSchema,
    createdAt: x.DateSchema,
    updatedAt: x.DateSchema
});
/******************************************************************************/
var MongooseModel = mongoose.model("Progression", progressionSchema);
exports.MongooseModel = MongooseModel;
/******************************************************************************/
