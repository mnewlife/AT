"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("bluebird");
var environment = require("../../../../environment");
/******************************************************************************/
var MailTemplates = (function () {
    /****************************************************************/
    function MailTemplates(checkThrow) {
        var _this = this;
        this.checkThrow = checkThrow;
        /****************************************************************/
        this.newEmailAddress = function (newEmailAddress, verificationCode, supportPhoneNumber, supportEmailAddress, forceThrow) {
            return _this.checkThrow(forceThrow)
                .then(function (response) {
                return new Promise(function (resolve, reject) {
                    var html = [
                        "<h3>Hey, " + newEmailAddress + "</h3>",
                        "<br>",
                        "<span>",
                        "Thank you for joining the platform. Click the link below to verify your email address.",
                        "</span>",
                        "<br>",
                        "<a href='" + environment.default.host + "/core/registration/verifyAccount/" + verificationCode + "'>",
                        "Click here to activate your account",
                        "</a>",
                        "<br>",
                        "<br>",
                        "<span>",
                        "Have questions? Get in touch with us on " + supportPhoneNumber + " or email our support team at " + supportEmailAddress,
                        "</span>",
                        "<br><br>",
                        "Regards,<br>",
                        environment.default.applicationName
                    ].join();
                    resolve(html);
                });
            });
        };
        /****************************************************************/
        this.passwordReset = function (emailAddress, userId, resetCode, supportPhoneNumber, supportEmailAddress, forceThrow) {
            return _this.checkThrow(forceThrow)
                .then(function (response) {
                return new Promise(function (resolve, reject) {
                    var html = [
                        "<h3>Hey, " + emailAddress + "</h3>",
                        "<br>",
                        "<span>",
                        "Thank you for joining the platform. Click the link below to verify your email address.",
                        "</span>",
                        "<br>",
                        "<a href='" + environment.default.host + "/core/profile/resetPassword/" + userId + "/" + resetCode + "'>",
                        "Click here to activate your account",
                        "</a>",
                        "<br>",
                        "<br>",
                        "<span>",
                        "Have questions? Get in touch with us on " + supportPhoneNumber + " or email our support team at " + supportEmailAddress,
                        "</span>",
                        "<br>",
                        "Cheers,",
                        environment.default.applicationName
                    ].join();
                    resolve(html);
                });
            });
        };
    }
    return MailTemplates;
}());
exports.default = MailTemplates;
/******************************************************************************/ 
