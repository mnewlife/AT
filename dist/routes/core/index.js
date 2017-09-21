"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var auth_1 = require("./auth");
var profile_1 = require("./profile");
var registration_1 = require("./registration");
var profile_shared_1 = require("./profile-shared");
var admin_1 = require("./admin");
var consumer_1 = require("./consumer");
/******************************************************************************/
exports.default = function (components, procedures, helpers) {
    var router = express.Router();
    var makeProfileHandlers = new profile_shared_1.default(procedures.core.common.profile.getUserDetails, procedures.core.common.profile.updateUserDetails, procedures.core.common.profile.changeEmailAddress, procedures.core.common.profile.changePassword, procedures.core.common.profile.requestPasswordResetCode, procedures.core.common.profile.resetPassword, procedures.core.common.profile.deleteAccount, components.helpers.numbers.generateRandomNumber, components.session.signedIn, components.session.getUserId, components.response.send);
    router.use("/auth", auth_1.default(procedures.core.common.auth.signIn, components.session.signOut, helpers.validateAppContext, components.response.send));
    router.use("/profile", profile_1.default(makeProfileHandlers.requestPasswordResetCode, makeProfileHandlers.resetPassword));
    router.use("/registration", registration_1.default(procedures.core.common.registration.verifyAccount, components.response.send));
    //router.use( "/developer", developer( config ) );
    router.use("/admin", admin_1.default(components, procedures, helpers, makeProfileHandlers));
    router.use("/consumer", consumer_1.default(components, procedures, helpers));
    return router;
};
/******************************************************************************/ 
