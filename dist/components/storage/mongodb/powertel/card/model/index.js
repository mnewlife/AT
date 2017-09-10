"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var preparation_1 = require("../../../preparation");
;
/******************************************************************************/
var cardSchema = new mongoose.Schema({
    pin: { type: Number, min: 0, default: 0 },
    puk: { type: Number, min: 0, default: 0 },
    mdn: { type: Number, min: 0, default: 0 },
    buyer: {
        cardSaleId: mongoose.Schema.Types.ObjectId,
        fullName: { type: String, set: preparation_1.ignoreEmpty },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    },
    user: {
        userId: mongoose.Schema.Types.ObjectId,
        emailAddress: { type: String, set: preparation_1.ignoreEmpty },
        fullName: { type: String, set: preparation_1.ignoreEmpty },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
/******************************************************************************/
var MongooseModel = mongoose.model("Card", cardSchema);
exports.MongooseModel = MongooseModel;
/******************************************************************************/
