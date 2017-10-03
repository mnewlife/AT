"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var x = require("../../../basic-schema");
var track = require("../../track/model");
var product = require("../../product/model");
/******************************************************************************/
var trackProductSchema = new mongoose.Schema({
    track: track.TrackInfoSchema,
    product: product.ProductInfoSchema,
    quantity: x.NumberSchema,
    value: x.NumberSchema,
    createdAt: x.DateSchema,
    updatedAt: x.DateSchema
});
/******************************************************************************/
var MongooseModel = mongoose.model("TrackProduct", trackProductSchema);
exports.MongooseModel = MongooseModel;
/******************************************************************************/
