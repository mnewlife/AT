"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("bluebird");
/******************************************************************************/
var Helpers = (function () {
    /****************************************************************/
    function Helpers(checkThrow) {
        var _this = this;
        this.checkThrow = checkThrow;
        /****************************************************************/
        this.cleanUsers = function (users, forceThrow) {
            if (forceThrow === void 0) { forceThrow = false; }
            return _this.checkThrow(forceThrow)
                .then(function (response) {
                return Promise.all(users.map(function (user) {
                    return new Promise(function (resolve, reject) {
                        user.password = "";
                        if (user.resetCode) {
                            user.resetCode = "";
                        }
                        if (user.verification.verificationCode) {
                            user.verification.verificationCode = "";
                        }
                        resolve(user);
                    });
                }));
            });
        };
    }
    return Helpers;
}());
exports.default = Helpers;
/******************************************************************************/ 
