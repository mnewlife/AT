"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = function (req) {
    if (!req.body.user || typeof req.body.user !== "object") {
        return true;
    }
    if (!req.body.user.userId || typeof req.body.user.userId !== "string") {
        return true;
    }
    if (!req.body.user.emailAddress || typeof req.body.user.emailAddress !== "string") {
        return true;
    }
    if (req.body.user.fullName && typeof req.body.user.fullName !== "string") {
        return true;
    }
    return false;
};
/******************************************************************************/ 
