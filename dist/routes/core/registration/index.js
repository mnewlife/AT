"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
/******************************************************************************/
exports.default = function (verifyAccountProcedure, sendResponse) {
    /*********************************************************/
    var router = express.Router();
    /*********************************************************/
    router.post("/verifyAccount/:userId/:code", verifyAccount);
    /*********************************************************/
    function verifyAccount(req, res, next) {
        var innerContext = "verify-account";
        if (!req.params.userId) {
            return sendResponse(res, "passpoint", false, "UserID is missing", { innerContext: innerContext });
        }
        if (!req.params.code) {
            return sendResponse(res, "passpoint", false, "Verification code is missing", { innerContext: innerContext });
        }
        return verifyAccountProcedure(req.params.userId, req.params.code)
            .then(function (response) {
            return sendResponse(res, "passpoint", true, "Verification successful, sign in with your email address", { innerContext: innerContext });
        })
            .catch(function (reason) {
            if (reason.identifier && reason.identifier == "UserNotFound") {
                return sendResponse(res, "passpoint", false, "User not found", { innerContext: innerContext });
            }
            if (reason.identifier && reason.identifier == "InvalidCode") {
                return sendResponse(res, "passpoint", false, "Invalid Verification Code", { innerContext: innerContext });
            }
            return sendResponse(res, "passpoint", false, null, { innerContext: innerContext });
        });
    }
    /*********************************************************/
    return router;
};
/******************************************************************************/
