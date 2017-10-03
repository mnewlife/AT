"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var x = require("../../../basic-schema");
var shop = require("../../shop/model");
;
;
/******************************************************************************/
exports.ProductInfoSchema = {
    productId: x.ObjectIdSchema,
    label: x.StringSchema
};
var productSchema = new mongoose.Schema({
    label: x.StringSchema,
    images: [x.StringSchema],
    prices: [{
            shop: shop.ShopInfoSchema,
            quantity: { type: Number, min: 0 },
            price: { type: Number, min: 0 }
        }],
    priceValues: {
        min: {
            shopId: mongoose.Schema.Types.ObjectId,
            price: { type: Number, min: 0, default: 0 }
        },
        max: {
            shopId: mongoose.Schema.Types.ObjectId,
            price: { type: Number, min: 0, default: 0 }
        },
        median: {
            shopId: mongoose.Schema.Types.ObjectId,
            price: { type: Number, min: 0, default: 0 }
        },
        mean: {
            shopId: mongoose.Schema.Types.ObjectId,
            price: { type: Number, min: 0, default: 0 }
        }
    },
    effectivePrice: {
        shopId: mongoose.Schema.Types.ObjectId,
        price: { type: Number, min: 0, default: 0 }
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
/******************************************************************************/
var MongooseModel = mongoose.model("Product", productSchema);
exports.MongooseModel = MongooseModel;
/******************************************************************************/
