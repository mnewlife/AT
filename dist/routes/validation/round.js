"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var blocks = require("./validation-blocks");
/******************************************************************************/
exports.absent = function (parent) {
    if (blocks.absentWrong(parent, parent["round"], "object")) {
        return true;
    }
    return exports.absentChildren(parent["round"]);
};
exports.absentChildren = function (parent) {
    if (blocks.absentWrong(parent, parent["roundId"], "string")) {
        return true;
    }
    if (blocks.absentWrong(parent, parent["roundName"], "string")) {
        return true;
    }
    return false;
};
/******************************************************************************/
exports.optional = function (parent) {
    if (blocks.optionalWrong(parent, parent["round"], "object")) {
        return true;
    }
    return exports.optionalChildren(parent["round"]);
};
exports.optionalChildren = function (parent) {
    if (blocks.optionalWrong(parent, parent["roundId"], "string")) {
        return true;
    }
    if (blocks.optionalWrong(parent, parent["roundName"], "string")) {
        return true;
    }
    return false;
};
/******************************************************************************/ 
