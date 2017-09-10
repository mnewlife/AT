"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("bluebird");
/******************************************************************************/
var Helpers = (function () {
    /*****************************************************************/
    function Helpers(checkThrow, signedIn, getUserFromSession) {
        var _this = this;
        this.checkThrow = checkThrow;
        this.signedIn = signedIn;
        this.getUserFromSession = getUserFromSession;
        /*****************************************************************/
        this.apps = ["core", "call263", "grocRound", "powertel", "routers"];
        /*****************************************************************/
        this.setViewContexts = function (req, user, appContext, innerContext, forceThrow) {
            if (forceThrow === void 0) { forceThrow = false; }
            var output;
            var currentUser;
            var finalAppContext;
            var consumer = false;
            return _this.checkThrow(forceThrow)
                .then(function (response) {
                return new Promise(function (resolve, reject) {
                    if (appContext) {
                        finalAppContext = appContext;
                        return resolve(appContext);
                    }
                    var matches = _this.apps.filter(function (app) {
                        return (app == req.query.accessLevel);
                    });
                    if (matches.length) {
                        finalAppContext = matches[0];
                        return resolve(matches[0]);
                    }
                    else {
                        return resolve("core");
                    }
                });
            })
                .then(function (appContext) {
                return new Promise(function (resolve, reject) {
                    if (user) {
                        currentUser = user;
                        if (currentUser.accessLevel == "consumer") {
                            consumer = true;
                        }
                        return resolve([appContext, currentUser.accessLevel].join("-"));
                    }
                    if (!_this.signedIn(req)) {
                        return reject({
                            identifier: "NotSignedIn",
                            data: {}
                        });
                    }
                    _this.getUserFromSession(req)
                        .then(function (foundUser) {
                        currentUser = foundUser;
                        if (currentUser.accessLevel == "consumer") {
                            consumer = true;
                        }
                        return resolve([appContext, currentUser.accessLevel].join("-"));
                    });
                });
            })
                .then(function (view) {
                var resolveActiveApp = new Promise(function (resolve, reject) {
                    if (consumer && finalAppContext != "core") {
                        var matches = currentUser.activeApps.filter(function (app) {
                            return (finalAppContext == app);
                        });
                        return resolve((matches.length) ? false : true);
                    }
                    else {
                        return resolve(false);
                    }
                });
                var resolveInnerContext = new Promise(function (resolve, reject) {
                    if (innerContext) {
                        return resolve(innerContext);
                    }
                    if (req.query.innerContext) {
                        return resolve(req.query.innerContext);
                    }
                });
                return Promise.all([resolveActiveApp, resolveInnerContext])
                    .then(function (results) {
                    return new Promise(function (resolve, reject) {
                        output.view = view;
                        output.payload = {};
                        if (results[0]) {
                            output.view += "-join";
                        }
                        if (results[1]) {
                            output.payload.innerContext = results[1];
                        }
                        resolve(output);
                    });
                });
            })
                .catch(function (reason) {
                return Promise.reject({
                    identifier: "Failed",
                    data: {
                        reason: reason
                    }
                });
            });
        };
    }
    return Helpers;
}());
exports.default = Helpers;
/******************************************************************************/
