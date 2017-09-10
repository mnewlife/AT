"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("bluebird");
/******************************************************************************/
var Auth = (function () {
    /****************************************************************/
    function Auth(events, checkThrow, cleanUsers, authSignIn) {
        var _this = this;
        this.events = events;
        this.checkThrow = checkThrow;
        this.cleanUsers = cleanUsers;
        this.authSignIn = authSignIn;
        /****************************************************************/
        this.signIn = function (emailAddress, password, req, forceThrow) {
            if (forceThrow === void 0) { forceThrow = false; }
            return _this.checkThrow(forceThrow)
                .then(function (response) {
                return _this.authSignIn(emailAddress, password, req);
            })
                .then(function (signedInUser) {
                return _this.cleanUsers([signedInUser]);
            })
                .then(function (cleanedUsers) {
                return Promise.resolve(cleanedUsers[0]);
            })
                .catch(function (reason) {
                if (reason && reason.identifier === "UserNotFound") {
                    return Promise.reject(reason);
                }
                if (reason && reason.identifier === "InvalidPassword") {
                    return Promise.reject(reason);
                }
                return Promise.reject({
                    identifier: "SignInFailed",
                    data: {
                        reason: reason
                    }
                });
            });
        };
    }
    return Auth;
}());
exports.default = Auth;
/******************************************************************************/ 
