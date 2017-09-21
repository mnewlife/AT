"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./helpers");
var mail_templates_1 = require("./mail-templates");
var auth_1 = require("./auth");
var events_1 = require("./auth/events");
var profile_1 = require("./profile");
var events_2 = require("./profile/events");
var registration_1 = require("./registration");
var events_3 = require("./registration/events");
/******************************************************************************/
var Common = (function () {
    function Common(auth, profile, registration, mailTemplates) {
        this.auth = auth;
        this.profile = profile;
        this.registration = registration;
        this.mailTemplates = mailTemplates;
    }
    return Common;
}());
/******************************************************************************/
exports.default = function (emitEvent, checkThrow, authSignIn, sendEmail, authPassword, createHashedPassword, signedIn, signOutSession, generateRandomNumber, getUserById, updateUser, updateUserById, removeUserById) {
    var helpersInstance = new helpers_1.default(checkThrow);
    var mailTemplatesInstance = new mail_templates_1.default(checkThrow);
    return new Common(new auth_1.default(new events_1.default(emitEvent), checkThrow, helpersInstance.cleanUsers, authSignIn), new profile_1.default(new events_2.default(emitEvent), checkThrow, helpersInstance.cleanUsers, mailTemplatesInstance.newEmailAddress, mailTemplatesInstance.passwordReset, sendEmail, authPassword, createHashedPassword, signedIn, signOutSession, generateRandomNumber, getUserById, updateUser, updateUserById, removeUserById), new registration_1.default(new events_3.default(emitEvent), checkThrow, getUserById, updateUserById), mailTemplatesInstance);
};
/******************************************************************************/
