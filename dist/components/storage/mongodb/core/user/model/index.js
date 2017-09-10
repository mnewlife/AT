"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var preparation_1 = require("../../../preparation");
;
/******************************************************************************/
var userSchema = new mongoose.Schema({
    emailAddress: { type: String, set: preparation_1.ignoreEmpty },
    accessLevel: { type: String, set: preparation_1.ignoreEmpty },
    password: { type: String, set: preparation_1.ignoreEmpty },
    resetCode: { type: String, set: preparation_1.ignoreEmpty },
    verification: {
        verified: { type: Boolean, default: false, set: preparation_1.ignoreEmpty },
        verificationCode: { type: String, set: preparation_1.ignoreEmpty },
        numVerAttempts: { type: Number, min: 0, default: 0, set: preparation_1.ignoreEmpty },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    },
    personalDetails: {
        firstName: { type: String, set: preparation_1.ignoreEmpty },
        lastName: { type: String, set: preparation_1.ignoreEmpty },
        dateOfBirth: { type: Date, default: Date.now },
        gender: { type: String, set: preparation_1.ignoreEmpty },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    },
    contactDetails: {
        phoneNumbers: [String],
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    },
    residentialDetails: {
        country: { type: String, set: preparation_1.ignoreEmpty },
        province: { type: String, set: preparation_1.ignoreEmpty },
        address: { type: String, set: preparation_1.ignoreEmpty },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    },
    activeApps: [String],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
/******************************************************************************/
var MongooseModel = mongoose.model("User", userSchema);
exports.MongooseModel = MongooseModel;
/******************************************************************************/
