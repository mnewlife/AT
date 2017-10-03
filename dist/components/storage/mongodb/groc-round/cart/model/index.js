"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var x = require("../../../basic-schema");
var user = require("../../../core/user/model");
var round = require("../../round/model");
/******************************************************************************/
var cartSchema = new mongoose.Schema({
    user: user.UserInfoSchema,
    round: round.RoundInfoSchema,
    adminFeePercentage: x.NumberSchema,
    numProducts: x.NumberSchema,
    valueProducts: x.NumberSchema,
    createdAt: x.DateSchema,
    updatedAt: x.DateSchema
});
/******************************************************************************/
var MongooseModel = mongoose.model("Cart", cartSchema);
exports.MongooseModel = MongooseModel;
/******************************************************************************/
