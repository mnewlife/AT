"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var x = require("../../../basic-schema");
var user = require("../../../core/user/model");
var round = require("../../round/model");
/******************************************************************************/
var contributionSchema = new mongoose.Schema({
    user: user.UserInfoSchema,
    round: round.RoundInfoSchema,
    payment: {
        identifier: x.StringSchema,
        amount: x.NumberSchema,
        method: x.StringSchema
    },
    createdAt: x.DateSchema,
    updatedAt: x.DateSchema
});
/******************************************************************************/
var MongooseModel = mongoose.model("Contribution", contributionSchema);
exports.MongooseModel = MongooseModel;
/******************************************************************************/
