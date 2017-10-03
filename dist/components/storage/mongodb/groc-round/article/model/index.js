"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var x = require("../../../basic-schema");
var user = require("../../../core/user/model");
/******************************************************************************/
var articleSchema = new mongoose.Schema({
    user: user.UserInfoSchema,
    title: x.StringSchema,
    images: [x.StringSchema],
    tags: [x.StringSchema],
    content: x.StringSchema,
    createdAt: x.DateSchema,
    updatedAt: x.DateSchema
});
/******************************************************************************/
var MongooseModel = mongoose.model("Article", articleSchema);
exports.MongooseModel = MongooseModel;
/******************************************************************************/
