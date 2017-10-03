"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var blocks = require("./validation-blocks");
/******************************************************************************/
exports.absent = function (parent) {
    if (blocks.absentWrong(parent, parent["track"], "object")) {
        return true;
    }
    return exports.absentChildren(parent["track"]);
};
exports.absentChildren = function (parent) {
    if (blocks.absentWrong(parent, parent["trackId"], "string")) {
        return true;
    }
    if (blocks.absentWrong(parent, parent["trackName"], "string")) {
        return true;
    }
    return false;
};
/******************************************************************************/
exports.optional = function (parent) {
    if (blocks.optionalWrong(parent, parent["track"], "object")) {
        return true;
    }
    return exports.optionalChildren(parent["track"]);
};
exports.optionalChildren = function (parent) {
    if (blocks.optionalWrong(parent, parent["trackId"], "string")) {
        return true;
    }
    if (blocks.optionalWrong(parent, parent["trackName"], "string")) {
        return true;
    }
    return false;
};
/******************************************************************************/ 
