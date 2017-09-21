"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
/******************************************************************************/
exports.default = function (signInProcedure, signOutOfSession, validateAppContext, sendResponse) {
    /*********************************************************/
    var router = express.Router();
    router.post("/signIn", signIn);
    router.get("/signOut", signOut);
    /*********************************************************/
    function signIn(req, res, next) {
        var currentUser;
        if (!req.body.emailAddress) {
            return sendResponse(res, "passpoint", false, "Email address is missing", null);
        }
        if (!req.body.password) {
            return sendResponse(res, "passpoint", false, "Password is missing", null);
        }
        return signInProcedure(req.body.emailAddress, req.body.password, req)
            .then(function (signedInUser) {
            return sendResponse(res, "passpoint", true, null, null);
        })
            .catch(function (reason) {
            if (reason.identifier && reason.identifier == "UserNotFound") {
                return sendResponse(res, "passpoint", false, "User not found", null);
            }
            if (reason.identifier && reason.identifier == "InvalidPassword") {
                return sendResponse(res, "passpoint", false, "Incorrect password", null);
            }
            return sendResponse(res, "passpoint", false, null, null);
        });
    }
    /*********************************************************/
    function signOut(req, res, next) {
        return signOutOfSession(req)
            .then(function (response) {
            return sendResponse(res, "passpoint", true, null, null);
        })
            .catch(function (reason) {
            return sendResponse(res, "passpoint", false, null, null);
        });
    }
    /*********************************************************/
    return router;
};
/******************************************************************************/ 
