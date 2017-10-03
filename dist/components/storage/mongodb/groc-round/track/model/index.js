"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var x = require("../../../basic-schema");
var round = require("../../round/model");
;
/******************************************************************************/
exports.TrackInfoSchema = {
    trackId: x.ObjectIdSchema,
    trackName: x.StringSchema
};
var trackSchema = new mongoose.Schema({
    round: round.RoundInfoSchema,
    trackName: x.StringSchema,
    contributions: {
        installmentValue: x.NumberSchema,
        totalValue: x.NumberSchema,
    },
    adminFeePercentage: x.NumberSchema,
    products: {
        num: x.NumberSchema,
        value: x.NumberSchema,
    },
    createdAt: x.DateSchema,
    updatedAt: x.DateSchema
});
/******************************************************************************/
var MongooseModel = mongoose.model("Track", trackSchema);
exports.MongooseModel = MongooseModel;
/******************************************************************************/
