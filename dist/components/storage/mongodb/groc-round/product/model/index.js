"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var preparation_1 = require("../../../preparation");
;
;
/******************************************************************************/
var productSchema = new mongoose.Schema({
    label: { type: String, set: preparation_1.ignoreEmpty },
    images: [String],
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
