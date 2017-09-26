"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("bluebird");
var bCrypt = require("bcrypt-nodejs");
/******************************************************************************/
var Canon = (function () {
    /*****************************************************************/
    function Canon(events, checkThrow, getUsers, getUserById, setUserInSession, getUserFromSession, signOutOfSession, cleanUsers) {
        var _this = this;
        this.events = events;
        this.checkThrow = checkThrow;
        this.getUsers = getUsers;
        this.getUserById = getUserById;
        this.setUserInSession = setUserInSession;
        this.getUserFromSession = getUserFromSession;
        this.signOutOfSession = signOutOfSession;
        this.cleanUsers = cleanUsers;
        this.middleware = [];
        /*****************************************************************/
        this.isValidPassword = function (password, hashedPassword) {
            return bCrypt.compareSync(password, hashedPassword);
        };
        this.createHash = function (password) {
            return bCrypt.hashSync(password, bCrypt.genSaltSync(10));
        };
        /*****************************************************************/
        this.signIn = function (emailAddress, password, req, forceThrow) {
            if (forceThrow === void 0) { forceThrow = false; }
            return _this.checkThrow(forceThrow)
                .then(function (response) {
                return _this.getUsers({
                    emailAddress: emailAddress
                }, null, null);
            })
                .then(function (foundUsers) {
                return new Promise(function (resolve, reject) {
                    if (!foundUsers.length) {
                        return reject({
                            identifier: "UserNotFound",
                            data: {}
                        });
                    }
                    if (_this.isValidPassword(password, foundUsers[0].password)) {
                        return resolve(foundUsers[0]);
                    }
                    new Promise(function (resolve, reject) {
                        var event = _this.events.invalidPassword({
                            emailAddress: emailAddress,
                            password: password
                        });
                        resolve();
                    });
                    reject({
                        identifier: "InvalidPassword",
                        data: {}
                    });
                });
            })
                .then(function (authenticUser) {
                return _this.setUserInSession(authenticUser.id, req)
                    .then(function (response) {
                    new Promise(function (resolve, reject) {
                        _this.events.signedIn({
                            user: authenticUser
                        });
                        resolve();
                    });
                    return Promise.resolve(authenticUser);
                });
            })
                .catch(function (reason) {
                new Promise(function (resolve, reject) {
                    _this.events.signInFailed({
                        emailAddress: emailAddress,
                        reason: reason
                    });
                    resolve();
                });
                if (reason.identifier && reason.identifier === "UserNotFound") {
                    return Promise.reject(reason);
                }
                if (reason.identifier && reason.identifier === "InvalidPassword") {
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
        /*****************************************************************/
        this.signOut = function (req, forceThrow) {
            if (forceThrow === void 0) { forceThrow = false; }
            return _this.checkThrow(forceThrow)
                .then(function (response) {
                return _this.signOutOfSession(req);
            })
                .catch(function (reason) {
                new Promise(function (resolve, reject) {
                    _this.events.signOutFailed({
                        req: req,
                        reason: reason
                    });
                    resolve();
                });
                return Promise.reject({
                    identifier: "SignOutFailed",
                    data: {
                        reason: reason
                    }
                });
            });
        };
        /*****************************************************************/
        this.getCurrentUser = function (req, forceThrow) {
            if (forceThrow === void 0) { forceThrow = false; }
            return _this.checkThrow(forceThrow)
                .then(function (response) {
                return _this.getUserFromSession(req);
            })
                .then(function (foundUser) {
                return _this.cleanUsers([foundUser]);
            })
                .then(function (cleanedUsers) {
                return Promise.resolve(cleanedUsers[0]);
            })
                .catch(function (reason) {
                new Promise(function (resolve, reject) {
                    _this.events.getCurrentUserFailed({
                        req: req,
                        reason: reason
                    });
                });
                if (reason.identifier && reason.identifier === "DocumentNotFound") {
                    return Promise.reject(reason);
                }
                if (reason.identifier && reason.identifier === "NoCurrentUser") {
                    return Promise.reject(reason);
                }
                return Promise.reject({
                    identifier: "GetCurrentUserFailed",
                    data: {
                        reason: reason
                    }
                });
            });
        };
        /*****************************************************************/
        this.authPassword = function (userId, password, forceThrow) {
            if (forceThrow === void 0) { forceThrow = false; }
            return _this.checkThrow(forceThrow)
                .then(function (response) {
                return _this.getUserById(userId);
            })
                .then(function (foundUser) {
                return new Promise(function (resolve, reject) {
                    if (_this.isValidPassword(password, foundUser.password)) {
                        return resolve(foundUser);
                    }
                    new Promise(function (resolve, reject) {
                        _this.events.invalidPassword({
                            userId: userId,
                            password: password
                        });
                        resolve();
                    });
                    reject({
                        identifier: "InvalidPassword",
                        data: {
                            userId: userId,
                            password: password
                        }
                    });
                });
            })
                .catch(function (reason) {
                new Promise(function (resolve, reject) {
                    _this.events.authPasswordFailed({
                        userId: userId,
                        password: password,
                        reason: reason
                    });
                    resolve();
                });
                if (reason.identifier && reason.identifier === "DocumentNotFound") {
                    return Promise.reject(reason);
                }
                if (reason.identifier && reason.identifier === "InvalidPassword") {
                    return Promise.reject(reason);
                }
                return Promise.reject({
                    identifier: "AuthPasswordFailed",
                    data: {}
                });
            });
        };
        /*****************************************************************/
        this.createHashedPassword = function (password, forceThrow) {
            if (forceThrow === void 0) { forceThrow = false; }
            return _this.checkThrow(forceThrow)
                .then(function (response) {
                return new Promise(function (resolve, reject) {
                    try {
                        resolve(_this.createHash(password));
                    }
                    catch (err) {
                        reject(err);
                    }
                });
            })
                .catch(function (reason) {
                new Promise(function (resolve, reject) {
                    _this.events.createHashedPasswordFailed({
                        password: password,
                        reason: reason
                    });
                    resolve();
                });
                return Promise.reject({
                    identifier: "CreateHashedPasswordFailed",
                    data: {}
                });
            });
        };
    }
    return Canon;
}());
exports.default = Canon;
/******************************************************************************/
