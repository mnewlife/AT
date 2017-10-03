"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
/******************************************************************************/
var cardSaleSchema = new mongoose.Schema({
    cardId: mongoose.Schema.Types.ObjectId,
    mdn: { type: Number, min: 0, default: 0 },
    cost: { type: Number, min: 0, default: 0 },
    conditions: {
        withRouter: { type: Boolean, default: false },
        routerType: { type: String },
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
/******************************************************************************/
var MongooseModel = mongoose.model("CardSale", cardSaleSchema);
exports.MongooseModel = MongooseModel;
/******************************************************************************/
