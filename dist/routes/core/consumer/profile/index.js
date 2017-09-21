"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
/******************************************************************************/
exports.default = function (makeGetDetails, makeUpdateDetails, makeChangeEmailAddress, makeChangePassword, makeDeleteAccount, getAuthCheck) {
    /*********************************************************/
    var router = express.Router();
    var accessLevel = "admin";
    var appContext = "core-admin";
    router.get("/getDetails", getAuthCheck("consumer", "core-consumer", "get-details"), makeGetDetails(appContext));
    router.post("/updateDetails/:userId", getAuthCheck("consumer", "core-consumer", "update-details"), makeUpdateDetails(appContext));
    router.post("/changeEmailAddress/:userId", getAuthCheck("consumer", "core-consumer", "change-email-address"), makeChangeEmailAddress(appContext));
    router.post("/changePassword/:userId", getAuthCheck("consumer", "core-consumer", "change-password"), makeChangePassword(appContext));
    router.get("/deleteAccount/:userId", getAuthCheck("consumer", "core-consumer", "delete-account"), makeDeleteAccount(appContext));
    /*********************************************************/
    return router;
};
/******************************************************************************/ 
