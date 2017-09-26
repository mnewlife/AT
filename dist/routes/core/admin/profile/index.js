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
    router.get("/getDetails", getAuthCheck("admin", "core-admin", "get-details"), makeGetDetails(appContext));
    router.post("/updateDetails", getAuthCheck("admin", "core-admin", "update-details"), makeUpdateDetails(appContext));
    router.post("/changeEmailAddress", getAuthCheck("admin", "core-admin", "change-email-address"), makeChangeEmailAddress(appContext));
    router.post("/changePassword", getAuthCheck("admin", "core-admin", "change-password"), makeChangePassword(appContext));
    router.get("/deleteAccount", getAuthCheck("admin", "core-admin", "delete-account"), makeDeleteAccount(appContext));
    /*********************************************************/
    return router;
};
/******************************************************************************/ 
