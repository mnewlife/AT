"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
/******************************************************************************/
exports.default = function (signInProcedure, setViewContexts, sendResponse) {
    /*********************************************************/
    var router = express.Router();
    //router.use( authCheck );
    /*********************************************************/
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
        signInProcedure(req.body.emailAddress, req.body.password, req)
            .then(function (signedInUser) {
            currentUser = signedInUser;
            return setViewContexts(req, currentUser);
        })
            .then(function (output) {
            output.payload.currentUser = currentUser;
            return sendResponse(res, output.view, true, null, output.payload);
        })
            .catch(function (reason) {
            if (reason.identifier && reason.identifier === "UserNotFound") {
                return sendResponse(res, "passpoint", false, "User not found", null);
            }
            if (reason.identifier && reason.identifier === "InvalidPassword") {
                return sendResponse(res, "passpoint", false, "Incorrect password", null);
            }
            return sendResponse(res, "passpoint", false, null, null);
        });
    }
    /*********************************************************/
    function signOut(req, res, next) {
    }
    /*********************************************************/
    //function authCheck () {}
    /*********************************************************/
    return router;
};
/******************************************************************************/ 
