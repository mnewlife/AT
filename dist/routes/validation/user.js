"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var blocks = require("./validation-blocks");
/******************************************************************************/
exports.absent = function (parent) {
    if (blocks.absentWrong(parent, parent["user"], "object")) {
        return true;
    }
    return exports.absentChildren(parent["user"]);
};
exports.absentChildren = function (parent) {
    if (blocks.absentWrong(parent, parent["userId"], "string")) {
        return true;
    }
    if (blocks.absentWrong(parent, parent["emailAddress"], "string")) {
        return true;
    }
    if (blocks.optionalWrong(parent, parent["fullName"], "string")) {
        return true;
    }
    return false;
};
/******************************************************************************/
exports.optional = function (parent) {
    if (blocks.optionalWrong(parent, parent["user"], "object")) {
        return true;
    }
    return exports.optionalChildren(parent["user"]);
};
exports.optionalChildren = function (parent) {
    if (blocks.optionalWrong(parent, parent["userId"], "string")) {
        return true;
    }
    if (blocks.optionalWrong(parent, parent["emailAddress"], "string")) {
        return true;
    }
    if (blocks.optionalWrong(parent, parent["fullName"], "string")) {
        return true;
    }
    return false;
};
/******************************************************************************/ 
