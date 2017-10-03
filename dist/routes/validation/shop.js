"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var blocks = require("./validation-blocks");
/******************************************************************************/
exports.absent = function (parent) {
    if (blocks.absentWrong(parent, parent["shop"], "object")) {
        return true;
    }
    return exports.absentChildren(parent["shop"]);
};
exports.absentChildren = function (parent) {
    if (blocks.absentWrong(parent, parent["shopId"], "string")) {
        return true;
    }
    if (blocks.absentWrong(parent, parent["shopName"], "string")) {
        return true;
    }
    return false;
};
/******************************************************************************/
exports.optional = function (parent) {
    if (blocks.optionalWrong(parent, parent["shop"], "object")) {
        return true;
    }
    return exports.optionalChildren(parent["shop"]);
};
exports.optionalChildren = function (parent) {
    if (blocks.optionalWrong(parent, parent["shopId"], "string")) {
        return true;
    }
    if (blocks.optionalWrong(parent, parent["shopName"], "string")) {
        return true;
    }
    return false;
};
/******************************************************************************/ 
