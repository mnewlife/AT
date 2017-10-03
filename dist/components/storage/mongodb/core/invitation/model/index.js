"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var x = require("../../../basic-schema");
var user = require("../../user/model");
;
;
/******************************************************************************/
var invitationSchema = new mongoose.Schema({
    user: user.UserInfoSchema,
    app: x.StringSchema,
    invitees: [{
            emailAddress: x.StringSchema,
            userId: x.StringSchema,
            fullName: x.StringSchema,
            converted: x.BooleanSchema
        }],
    createdAt: x.DateSchema,
    updatedAt: x.DateSchema
});
/******************************************************************************/
var MongooseModel = mongoose.model("Invitation", invitationSchema);
exports.MongooseModel = MongooseModel;
/******************************************************************************/
