"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("bluebird");
var expressSession = require("express-session");
/******************************************************************************/
var Canon = (function () {
    /*****************************************************************/
    function Canon(events, checkThrow, getUserById, production) {
        var _this = this;
        this.events = events;
        this.checkThrow = checkThrow;
        this.getUserById = getUserById;
        this.production = production;
        this.middleware = [];
        /*****************************************************************/
        this.signedIn = function (req) {
            if (req.session.userId) {
                return true;
            }
            else {
                return false;
            }
        };
        /*****************************************************************/
        this.setCurrentUser = function (userId, req, forceThrow) {
            if (forceThrow === void 0) { forceThrow = false; }
            return _this.checkThrow(forceThrow)
                .then(function (response) {
                req.session.userId = userId;
                new Promise(function (resolve, reject) {
                    _this.events.setCurrentUser({
                        userId: userId,
                        req: req
                    });
                    resolve();
                });
                return Promise.resolve();
            })
                .catch(function (reason) {
                new Promise(function (resolve, reject) {
                    _this.events.setCurrentUserFailed({
                        userId: userId,
                        req: req,
                        reason: reason
                    });
                    resolve();
                });
                return Promise.reject({
                    identifier: "SetCurrentUserFailed",
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
                if (req.session.userId) {
                    return _this.getUserById(req.session.userId);
                }
                else {
                    new Promise(function (resolve, reject) {
                        _this.events.noCurrentUser({
                            req: req
                        });
                        resolve();
                    });
                    return Promise.reject({
                        identifier: "NoCurrentUser",
                        data: {}
                    });
                }
            })
                .catch(function (reason) {
                new Promise(function (resolve, reject) {
                    _this.events.getCurrentUserFailed({
                        req: req,
                        reason: reason
                    });
                    resolve();
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
        this.signOut = function (req, forceThrow) {
            if (forceThrow === void 0) { forceThrow = false; }
            return _this.checkThrow(forceThrow)
                .then(function (response) {
                return new Promise(function (resolve, reject) {
                    req.session.destroy(function (err) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve();
                        }
                    });
                });
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
        this.middlewareConfiguration = expressSession({
            name: "Athena",
            secret: "secregrandt",
            resave: true,
            saveUninitialized: true,
            cookie: {
                secure: (this.production) ? true : false,
                httpOnly: true
            }
        });
        this.middleware.push(function (req, res, next) {
            if (req.session) {
                return next();
            }
            var tryCount = 1;
            var maxTries = 3;
            lookupSession("");
            function lookupSession(error) {
                if (error) {
                    throw error;
                }
                if (req.session) {
                    return next();
                }
                tryCount += 1;
                if (tryCount > maxTries) {
                    throw new Error("Session: Couldn't retain session");
                }
                this.middlewareConfiguration(req, res, lookupSession);
            }
        });
    }
    return Canon;
}());
exports.default = Canon;
/******************************************************************************/
