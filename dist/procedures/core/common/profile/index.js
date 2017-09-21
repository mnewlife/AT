"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("bluebird");
var environment = require("../../../../environment");
var supportDetails = require("../../../../environment/support-details");
/******************************************************************************/
var Profile = (function () {
    /****************************************************************/
    function Profile(events, checkThrow, cleanUsers, newEmailAddressTemplate, passwordResetTemplate, sendEmail, authPassword, createHash, signedIn, signOutSession, generateRandomNumber, getUserById, updateUser, updateUserById, removeUserById) {
        var _this = this;
        this.events = events;
        this.checkThrow = checkThrow;
        this.cleanUsers = cleanUsers;
        this.newEmailAddressTemplate = newEmailAddressTemplate;
        this.passwordResetTemplate = passwordResetTemplate;
        this.sendEmail = sendEmail;
        this.authPassword = authPassword;
        this.createHash = createHash;
        this.signedIn = signedIn;
        this.signOutSession = signOutSession;
        this.generateRandomNumber = generateRandomNumber;
        this.getUserById = getUserById;
        this.updateUser = updateUser;
        this.updateUserById = updateUserById;
        this.removeUserById = removeUserById;
        /****************************************************************/
        this.getUserDetails = function (userId, forceThrow) {
            return _this.checkThrow(forceThrow)
                .then(function (response) {
                return _this.getUserById(userId);
            })
                .then(function (foundUser) {
                return _this.cleanUsers([foundUser]);
            })
                .then(function (cleanedUsers) {
                return Promise.resolve(cleanedUsers[0]);
            })
                .catch(function (reason) {
                if (reason && reason.identifier === "DocumentNotFound") {
                    return Promise.reject(reason);
                }
                return Promise.reject({
                    identifier: "GetUserDetailsFailed",
                    data: {
                        reason: reason
                    }
                });
            });
        };
        /****************************************************************/
        this.updateUserDetails = function (userId, details, forceThrow) {
            return _this.checkThrow(forceThrow)
                .then(function (response) {
                return _this.updateUserById(userId, details);
            })
                .then(function (updatedUser) {
                return _this.cleanUsers([updatedUser]);
            })
                .then(function (cleanedUsers) {
                return Promise.resolve(cleanedUsers[0]);
            })
                .catch(function (reason) {
                if (reason.identifier && reason.identifier === "DocumentNotFound") {
                    return Promise.reject(reason);
                }
                return Promise.reject({
                    identifier: "UpdateUserDetailsFailed",
                    data: {
                        reason: reason
                    }
                });
            });
        };
        /****************************************************************/
        this.changeEmailAddress = function (userId, password, newEmailAddress, req, forceThrow) {
            return _this.checkThrow(forceThrow)
                .then(function (response) {
                return _this.authPassword(userId, password);
            })
                .then(function (authenticatedUser) {
                return Promise.all([
                    _this.generateRandomNumber(1543, 9812),
                    _this.generateRandomNumber(5123, 7623)
                ]);
            })
                .then(function (randomNumbers) {
                return Promise.resolve(String(randomNumbers[0]) + String(randomNumbers[1]));
            })
                .then(function (verificationCode) {
                return _this.updateUserById(userId, {
                    emailAddress: newEmailAddress,
                    verification: {
                        verified: false,
                        verificationCode: verificationCode
                    }
                })
                    .then(function (updatedUser) {
                    return Promise.resolve(verificationCode);
                });
            })
                .then(function (verificationCode) {
                return _this.newEmailAddressTemplate(newEmailAddress, verificationCode, supportDetails.default.phoneNumber, supportDetails.default.emailAddress);
            })
                .then(function (html) {
                return _this.sendEmail(supportDetails.default.sendingAddress, [newEmailAddress], environment.default.applicationName + " | Account Verification", html);
            })
                .then(function (response) {
                if (_this.signedIn(req)) {
                    return _this.signOutSession(req);
                }
                else {
                    return Promise.resolve();
                }
            })
                .catch(function (reason) {
                if (reason.identifier && reason.identifier === "DocumentNotFound") {
                    return Promise.reject(reason);
                }
                if (reason.identifier && reason.identifier === "InvalidPassword") {
                    return Promise.reject(reason);
                }
                return Promise.reject({
                    identifier: "ChangeEmailAddressFailed",
                    data: {
                        reason: reason
                    }
                });
            });
        };
        /****************************************************************/
        this.changePassword = function (userId, oldPassword, newPassword, forceThrow) {
            return _this.checkThrow(forceThrow)
                .then(function (response) {
                return _this.authPassword(userId, oldPassword);
            })
                .then(function (authenticatedUser) {
                return _this.createHash(newPassword);
            })
                .then(function (hashedPassword) {
                return _this.updateUserById(userId, {
                    password: hashedPassword
                });
            })
                .then(function (updatedUser) {
                return Promise.resolve();
            })
                .catch(function (reason) {
                if (reason.identifier && reason.identifier === "DocumentNotFound") {
                    return Promise.reject(reason);
                }
                if (reason.identifier && reason.identifier === "InvalidPassword") {
                    return Promise.reject(reason);
                }
                return Promise.reject({
                    identifier: "ChangePasswordFailed",
                    data: {
                        reason: reason
                    }
                });
            });
        };
        /****************************************************************/
        this.requestPasswordResetCode = function (emailAddress, forceThrow) {
            return _this.checkThrow(forceThrow)
                .then(function (response) {
                return Promise.all([
                    _this.generateRandomNumber(1543, 9812),
                    _this.generateRandomNumber(5123, 7623)
                ]);
            })
                .then(function (randomNumbers) {
                return Promise.resolve(String(randomNumbers[0]) + String(randomNumbers[1]));
            })
                .then(function (resetCode) {
                return _this.updateUser({ emailAddress: emailAddress }, {
                    resetCode: resetCode
                })
                    .then(function (updatedUsers) {
                    return Promise.resolve({
                        userId: updatedUsers[0].id,
                        resetCode: resetCode
                    });
                });
            })
                .then(function (response) {
                return _this.passwordResetTemplate(emailAddress, response.userId, response.resetCode, supportDetails.default.phoneNumber, supportDetails.default.emailAddress)
                    .then(function (html) {
                    return Promise.resolve({
                        html: html,
                        emailAddress: emailAddress
                    });
                });
            })
                .then(function (response) {
                return _this.sendEmail(supportDetails.default.sendingAddress, [response.emailAddress], environment.default.applicationName + " | Account Verification", response.html);
            })
                .catch(function (reason) {
                if (reason.identifier && reason.identifier === "DocumentNotFound") {
                    return Promise.reject(reason);
                }
                return Promise.reject({
                    identifier: "ResetPasswordFailed",
                    data: {
                        reason: reason
                    }
                });
            });
        };
        /****************************************************************/
        this.resetPassword = function (userId, resetCode, newPassword, forceThrow) {
            return _this.checkThrow(forceThrow)
                .then(function (response) {
                return _this.getUserById(userId);
            })
                .then(function (foundUser) {
                return new Promise(function (resolve, reject) {
                    if (foundUser.resetCode && foundUser.resetCode == resetCode) {
                        resolve();
                    }
                    else {
                        reject({
                            identifier: "InvalidResetCode"
                        });
                    }
                });
            })
                .then(function (response) {
                return _this.createHash(newPassword);
            })
                .then(function (hashedPassword) {
                return _this.updateUserById(userId, {
                    resetCode: "",
                    password: hashedPassword
                });
            })
                .then(function (updatedUser) {
                return Promise.resolve(updatedUser.password);
            })
                .catch(function (reason) {
                if (reason.identifier && reason.identifier === "DocumentNotFound") {
                    return Promise.reject(reason);
                }
                if (reason.identifier && reason.identifier === "InvalidResetCode") {
                    return Promise.reject(reason);
                }
                return Promise.reject({
                    identifier: "ResetPasswordFailed",
                    data: {
                        reason: reason
                    }
                });
            });
        };
        /****************************************************************/
        this.deleteAccount = function (userId, password, forceThrow) {
            return _this.checkThrow(forceThrow)
                .then(function (response) {
                return _this.authPassword(userId, password);
            })
                .then(function (authenticatedUser) {
                _this.removeUserById(userId);
            })
                .catch(function (reason) {
                if (reason.identifier && reason.identifier === "DocumentNotFound") {
                    return Promise.reject(reason);
                }
                if (reason.identifier && reason.identifier === "InvalidPassword") {
                    return Promise.reject(reason);
                }
                return Promise.reject({
                    identifier: "DeleteAccountFailed",
                    data: {
                        reason: reason
                    }
                });
            });
        };
    }
    return Profile;
}());
exports.default = Profile;
/******************************************************************************/
