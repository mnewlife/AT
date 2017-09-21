"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var profile_1 = require("./profile");
//import registration from "./registration";
/******************************************************************************/
exports.default = function (components, procedures, helpers, makeProfileHandlers) {
    /**********************************************************/
    var router = express.Router();
    /**********************************************************/
    router.use("/profile", profile_1.default(makeProfileHandlers.getDetails, makeProfileHandlers.updateDetails, makeProfileHandlers.changeEmailAddress, makeProfileHandlers.changePassword, makeProfileHandlers.deleteAccount, helpers.getAuthCheck));
    /**********************************************************/
    router.get("/", helpers.getAuthCheck("admin", "core-admin"), function (req, res, next) {
        return components.response.send(res, "core-admin", true, null, {
            currentUser: res.locals.currentUser
        });
    });
    /**********************************************************/
    return router;
};
/******************************************************************************/ 
