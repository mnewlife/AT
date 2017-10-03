"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var x = require("../../../basic-schema");
var user = require("../../../core/user/model");
var round = require("../../round/model");
/******************************************************************************/
var cartProductSchema = new mongoose.Schema({
    user: user.UserInfoSchema,
    round: round.RoundInfoSchema,
    cartId: x.ObjectIdSchema,
    product: {
        productId: mongoose.Schema.Types.ObjectId,
        label: x.StringSchema,
        quantity: x.NumberSchema,
        value: x.NumberSchema
    },
    createdAt: x.DateSchema,
    updatedAt: x.DateSchema
});
/******************************************************************************/
var MongooseModel = mongoose.model("CartProduct", cartProductSchema);
exports.MongooseModel = MongooseModel;
/******************************************************************************/
