"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var x = require("../../../basic-schema");
var user = require("../../../core/user/model");
var product = require("../../product/model");
var track = require("../../track/model");
var round = require("../../round/model");
/******************************************************************************/
exports.DeviationSchema = {
    product: product.ProductInfoSchema,
    quantity: x.NumberSchema,
    value: x.NumberSchema
};
exports.TrackInfoSchema = {
    track: track.TrackInfoSchema,
    deviations: {
        additions: [exports.DeviationSchema],
        subtractions: [exports.DeviationSchema]
    }
};
var roundContributorSchema = new mongoose.Schema({
    round: round.RoundInfoSchema,
    user: user.UserInfoSchema,
    contributions: {
        num: x.NumberSchema,
        value: x.NumberSchema,
        valueDue: x.NumberSchema,
    },
    tracks: [exports.TrackInfoSchema],
    cart: {
        num: x.NumberSchema,
        value: x.NumberSchema,
    },
    deliveryFees: {
        valuePaid: x.NumberSchema,
        valueDue: x.NumberSchema,
    },
    complete: x.BooleanSchema,
    createdAt: x.DateSchema,
    updatedAt: x.DateSchema
});
/******************************************************************************/
var MongooseModel = mongoose.model("RoundContributor", roundContributorSchema);
exports.MongooseModel = MongooseModel;
/******************************************************************************/
