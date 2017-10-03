"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var x = require("../../../basic-schema");
/******************************************************************************/
exports.ShopInfoSchema = {
    shopId: x.ObjectIdSchema,
    shopName: x.StringSchema
};
var shopSchema = new mongoose.Schema({
    shopName: x.StringSchema,
    images: [x.StringSchema],
    numProducts: x.NumberSchema,
    createdAt: x.DateSchema,
    updatedAt: x.DateSchema
});
/******************************************************************************/
var MongooseModel = mongoose.model("Shop", shopSchema);
exports.MongooseModel = MongooseModel;
/******************************************************************************/
