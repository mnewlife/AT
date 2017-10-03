"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var x = require("../../../basic-schema");
var user = require("../../user/model");
/******************************************************************************/
var notificationSchema = new mongoose.Schema({
    user: user.UserInfoSchema,
    type: x.StringSchema,
    app: x.StringSchema,
    label: x.StringSchema,
    seen: x.BooleanSchema,
    cleared: x.BooleanSchema,
    createdAt: x.DateSchema,
    updatedAt: x.DateSchema
});
/******************************************************************************/
var MongooseModel = mongoose.model("Notification", notificationSchema);
exports.MongooseModel = MongooseModel;
/******************************************************************************/
