"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("bluebird");
var express = require("express");
var environment = require("../../../../environment");
var supportDetails = require("../../../../environment/support-details");
/******************************************************************************/
exports.default = function (getUsers, generateRandomNumber, createHashedPassword, addUser, newEmailAddressTemplate, sendEmail, sendResponse) {
    /*********************************************************/
    var router = express.Router();
    /*********************************************************/
    router.post("/signUp", signUp);
    /*********************************************************/
    function signUp(req, res, next) {
        var innerContext = "sign-up";
        if (!req.body.emailAddress) {
            return sendResponse(res, "passpoint", false, "Email address is missing", { innerContext: innerContext });
        }
        if (!req.body.password) {
            return sendResponse(res, "passpoint", false, "Password is missing", { innerContext: innerContext });
        }
        var verificationCode;
        return getUsers({
            emailAddress: req.body.emailAddress
        }, null, 1)
            .then(function (users) {
            if (users.length) {
                return Promise.reject({
                    identifier: "AddressAlreadyTaken"
                });
            }
            return Promise.all([
                generateRandomNumber(1543, 9812),
                generateRandomNumber(5123, 7623)
            ]);
        })
            .then(function (numbers) {
            verificationCode = String(numbers[0]) + String(numbers[1]);
            return createHashedPassword(req.body.password);
        })
            .then(function (hashedPassword) {
            return addUser({
                emailAddress: req.body.emailAddress,
                accessLevel: "admin",
                password: hashedPassword,
                verification: {
                    verified: true,
                    verificationCode: ""
                },
                activeApps: []
            });
        })
            .then(function (addedUser) {
            return newEmailAddressTemplate(req.body.emailAddress, verificationCode, supportDetails.default.phoneNumber, supportDetails.default.emailAddress);
        })
            .then(function (html) {
            return sendEmail(supportDetails.default.sendingAddress, [req.body.emailAddress], environment.default.applicationName + " | Account Verification", html);
        })
            .then(function (response) {
            return sendResponse(res, "passpoint", true, "Done. A verification email has been sent to your email address.", { innerContext: innerContext });
        })
            .catch(function (reason) {
            if (reason.identifier && reason.identifier == "AddressAlreadyTaken") {
                return sendResponse(res, "passpoint", false, "That email address is already in use", { innerContext: innerContext });
            }
            if (reason.identifier && reason.identifier == "SendEmailFailed") {
                return sendResponse(res, "passpoint", false, "Done, but couldn't send a verification email, contact support", { innerContext: innerContext });
            }
            return sendResponse(res, "passpoint", false, null, { innerContext: innerContext });
        });
    }
    /*********************************************************/
    return router;
};
/******************************************************************************/ 
