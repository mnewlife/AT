"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var blocks = require("./validation-blocks");
/******************************************************************************/
exports.absent = function (parent) {
    if (blocks.absentWrong(parent, parent["product"], "object")) {
        return true;
    }
    return exports.absentChildren(parent["product"]);
};
exports.absentChildren = function (parent) {
    if (blocks.absentWrong(parent, parent["productId"], "string")) {
        return true;
    }
    if (blocks.absentWrong(parent, parent["label"], "string")) {
        return true;
    }
    return false;
};
/******************************************************************************/
exports.optional = function (parent) {
    if (blocks.optionalWrong(parent, parent["product"], "object")) {
        return true;
    }
    return exports.optionalChildren(parent["product"]);
};
exports.optionalChildren = function (parent) {
    if (blocks.optionalWrong(parent, parent["productId"], "string")) {
        return true;
    }
    if (blocks.optionalWrong(parent, parent["label"], "string")) {
        return true;
    }
    return false;
};
/******************************************************************************/ 
