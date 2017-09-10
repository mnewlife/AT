"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("bluebird");
/******************************************************************************/
var Registration = (function () {
    /****************************************************************/
    function Registration(events, checkThrow, getUserById, updateUserById) {
        var _this = this;
        this.events = events;
        this.checkThrow = checkThrow;
        this.getUserById = getUserById;
        this.updateUserById = updateUserById;
        /****************************************************************/
        this.verifyAccount = function (userId, code, forceThrow) {
            return _this.checkThrow(forceThrow)
                .then(function (response) {
                return _this.getUserById(userId);
            })
                .then(function (foundUser) {
                return new Promise(function (resolve, reject) {
                    if (foundUser.verification.verificationCode == code) {
                        resolve();
                    }
                    else {
                        reject();
                    }
                });
            })
                .then(function (response) {
                return _this.updateUserById(userId, {
                    verification: {
                        verified: true,
                        verificationCode: ""
                    }
                });
            })
                .then(function (updatedUser) {
                return Promise.resolve();
            })
                .catch(function (reason) {
                if (reason.identifier && reason.identifier === "DocumentNotFound") {
                    return Promise.reject(reason);
                }
                return Promise.reject({
                    identifier: "VerifyAccountFailed",
                    data: {
                        reason: reason
                    }
                });
            });
        };
    }
    return Registration;
}());
exports.default = Registration;
/******************************************************************************/ 
