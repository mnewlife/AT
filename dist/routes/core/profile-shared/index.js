"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("bluebird");
/******************************************************************************/
var ProfileShared = (function () {
    /****************************************************/
    function ProfileShared(getUserDetails, updateUserDetails, changeUserEmailAddress, changeUserPassword, requestUserPasswordResetCode, resetUserPassword, deleteUserAccount, generateRandomNumber, signedIn, getUserId, sendResponse) {
        var _this = this;
        this.getUserDetails = getUserDetails;
        this.updateUserDetails = updateUserDetails;
        this.changeUserEmailAddress = changeUserEmailAddress;
        this.changeUserPassword = changeUserPassword;
        this.requestUserPasswordResetCode = requestUserPasswordResetCode;
        this.resetUserPassword = resetUserPassword;
        this.deleteUserAccount = deleteUserAccount;
        this.generateRandomNumber = generateRandomNumber;
        this.signedIn = signedIn;
        this.getUserId = getUserId;
        this.sendResponse = sendResponse;
        /****************************************************/
        this.getDetails = function (appContext) {
            return function (req, res, next) {
                var innerContext = "profile";
                var foundUser;
                if (!_this.signedIn(req)) {
                    return _this.sendResponse(res, "passpoint", false, null, { innerContext: innerContext });
                }
                var userId = _this.getUserId(req);
                if (!userId) {
                    return _this.sendResponse(res, appContext, false, null, { innerContext: innerContext });
                }
                return _this.getUserDetails(userId)
                    .then(function (user) {
                    return _this.sendResponse(res, appContext, true, null, {
                        user: user,
                        innerContext: innerContext
                    });
                })
                    .catch(function (reason) {
                    if (reason.identifier && reason.identifier == "UserNotFound") {
                        return _this.sendResponse(res, appContext, false, "User not found", { innerContext: innerContext });
                    }
                    return _this.sendResponse(res, appContext, false, null, { innerContext: innerContext });
                });
            };
        };
        /****************************************************/
        this.updateDetails = function (appContext) {
            return function (req, res, next) {
                var innerContext = "edit-profile";
                if (!req.params.userId) {
                    return _this.sendResponse(res, appContext, false, "User ID is missing", { innerContext: innerContext });
                }
                var details;
                if (req.body.personalDetails) {
                    details.personalDetails = {};
                    if (req.body.personalDetails.firstName) {
                        details.personalDetails.firstName = req.body.personalDetails.firstName;
                    }
                    if (req.body.personalDetails.lastName) {
                        details.personalDetails.lastName = req.body.personalDetails.lastName;
                    }
                    if (req.body.personalDetails.dateOfBirth) {
                        details.personalDetails.dateOfBirth = req.body.personalDetails.dateOfBirth;
                    }
                    if (req.body.personalDetails.gender) {
                        details.personalDetails.gender = req.body.personalDetails.gender;
                    }
                }
                if (req.body.contactDetails) {
                    details.contactDetails = {};
                    if (req.body.contactDetails.phoneNumbersToAdd) {
                        details.contactDetails.phoneNumbersToAdd = req.body.contactDetails.phoneNumbersToAdd;
                    }
                    if (req.body.contactDetails.phoneNumbersToRemove) {
                        details.contactDetails.phoneNumbersToRemove = req.body.contactDetails.phoneNumbersToRemove;
                    }
                }
                if (req.body.residentialDetails) {
                    details.residentialDetails = {};
                    if (req.body.residentialDetails.country) {
                        details.residentialDetails.country = req.body.residentialDetails.country;
                    }
                    if (req.body.residentialDetails.province) {
                        details.residentialDetails.province = req.body.residentialDetails.province;
                    }
                    if (req.body.residentialDetails.address) {
                        details.residentialDetails.address = req.body.residentialDetails.address;
                    }
                }
                if (!details) {
                    return _this.sendResponse(res, appContext, false, "", { innerContext: innerContext });
                }
                var user;
                return _this.updateUserDetails(req.params.userId, details)
                    .then(function (updatedUser) {
                    return _this.sendResponse(res, appContext, true, null, {
                        user: user,
                        innerContext: innerContext
                    });
                })
                    .catch(function (reason) {
                    if (reason.identifier && reason.identifier == "UserNotFound") {
                        return _this.sendResponse(res, appContext, false, "User not found", { innerContext: innerContext });
                    }
                    return _this.sendResponse(res, appContext, false, null, { innerContext: innerContext });
                });
            };
        };
        /****************************************************/
        this.changeEmailAddress = function (appContext) {
            return function (req, res, next) {
                var innerContext = "change-email-address";
                if (req.params.userId) {
                    return _this.sendResponse(res, appContext, false, "User ID is missing", { innerContext: innerContext });
                }
                if (req.body.password) {
                    return _this.sendResponse(res, appContext, false, "Password is missing", { innerContext: innerContext });
                }
                if (req.body.newEmailAddress) {
                    return _this.sendResponse(res, appContext, false, "The new email address is missing", { innerContext: innerContext });
                }
                return _this.changeUserEmailAddress(req.params.userId, req.body.password, req.body.newEmailAddress, req)
                    .then(function (response) {
                    return _this.sendResponse(res, "passpoint", true, "A verification email has been sent to your email address", { innerContext: innerContext });
                })
                    .catch(function (reason) {
                    if (reason.identifier && reason.identifier == "UserNotFound") {
                        return _this.sendResponse(res, appContext, false, "User not found", { innerContext: innerContext });
                    }
                    return _this.sendResponse(res, appContext, false, null, { innerContext: innerContext });
                });
            };
        };
        /****************************************************/
        this.changePassword = function (appContext) {
            return function (req, res, next) {
                var innerContext = "profile";
                if (req.params.userId) {
                    return _this.sendResponse(res, appContext, false, "User ID is missing", { innerContext: innerContext });
                }
                if (req.body.oldPassword) {
                    return _this.sendResponse(res, appContext, false, "Password is missing", { innerContext: innerContext });
                }
                if (req.body.newPassword) {
                    return _this.sendResponse(res, appContext, false, "The new password is missing", { innerContext: innerContext });
                }
                return _this.changeUserPassword(req.params.userId, req.body.oldPassword, req.body.newPassword)
                    .then(function (response) {
                    return _this.sendResponse(res, appContext, true, null, {
                        innerContext: innerContext
                    });
                })
                    .catch(function (reason) {
                    if (reason.identifier && reason.identifier == "UserNotFound") {
                        return _this.sendResponse(res, appContext, false, "User not found", { innerContext: innerContext });
                    }
                    if (reason.identifier && reason.identifier == "InvalidPassword") {
                        return _this.sendResponse(res, appContext, false, "InvalidPassword", { innerContext: innerContext });
                    }
                    return _this.sendResponse(res, appContext, false, null, { innerContext: innerContext });
                });
            };
        };
        /****************************************************/
        this.requestPasswordResetCode = function () {
            return function (req, res, next) {
                var innerContext = "request-reset-code";
                if (req.params.emailAddress) {
                    return _this.sendResponse(res, "passpoint", false, "User ID is missing", { innerContext: innerContext });
                }
                return _this.requestUserPasswordResetCode(req.params.emailAddress)
                    .then(function (response) {
                    return _this.sendResponse(res, "passpoint", true, "The reset code has been sent to your email address", { innerContext: innerContext });
                })
                    .catch(function (reason) {
                    if (reason.identifier && reason.identifier == "UserNotFound") {
                        return _this.sendResponse(res, "passpoint", false, "User not found", { innerContext: innerContext });
                    }
                    return _this.sendResponse(res, "passpoint", false, null, { innerContext: innerContext });
                });
            };
        };
        /****************************************************/
        this.resetPassword = function () {
            return function (req, res, next) {
                var innerContext = "reset-password";
                if (req.params.userId) {
                    return _this.sendResponse(res, "passpoint", false, "User ID is missing", { innerContext: innerContext });
                }
                return Promise.all([
                    _this.generateRandomNumber(8765, 9172),
                    _this.generateRandomNumber(8132, 8793)
                ])
                    .then(function (numbers) {
                    return _this.resetUserPassword(req.params.userId, req.query.resetCode, String(numbers[0]) + String(numbers[1]));
                })
                    .then(function (newPassword) {
                    return _this.sendResponse(res, "passpoint", true, "Your password has been reset", {
                        innerContext: innerContext,
                        newRandomPassword: newPassword
                    });
                })
                    .catch(function (reason) {
                    if (reason.identifier && reason.identifier == "UserNotFound") {
                        return _this.sendResponse(res, "passpoint", false, "User not found", { innerContext: innerContext });
                    }
                    if (reason.identifier && reason.identifier == "InvalidResetCode") {
                        return _this.sendResponse(res, "passpoint", false, "InvalidResetCode", { innerContext: innerContext });
                    }
                    return _this.sendResponse(res, "passpoint", false, null, { innerContext: innerContext });
                });
            };
        };
        /****************************************************/
        this.deleteAccount = function (appContext) {
            return function (req, res, next) {
                var innerContext = "delete-account";
                if (req.params.userId) {
                    return _this.sendResponse(res, appContext, false, "User ID is missing", { innerContext: innerContext });
                }
                return _this.deleteUserAccount(req.params.userId, req.body.password)
                    .then(function (response) {
                    return _this.sendResponse(res, "passpoint", true, "Account deleted", null);
                })
                    .catch(function (reason) {
                    if (reason.identifier && reason.identifier == "UserNotFound") {
                        return _this.sendResponse(res, appContext, false, "User not found", { innerContext: innerContext });
                    }
                    if (reason.identifier && reason.identifier == "InvalidResetCode") {
                        return _this.sendResponse(res, appContext, false, "InvalidResetCode", { innerContext: innerContext });
                    }
                    return _this.sendResponse(res, appContext, false, null, { innerContext: innerContext });
                });
            };
        };
    }
    return ProfileShared;
}());
exports.default = ProfileShared;
/******************************************************************************/ 
