"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
/******************************************************************************/
var Helpers = (function () {
    /*****************************************************************/
    function Helpers(checkThrow, signedIn, getUserFromSession, sendResponse) {
        var _this = this;
        this.checkThrow = checkThrow;
        this.signedIn = signedIn;
        this.getUserFromSession = getUserFromSession;
        this.sendResponse = sendResponse;
        /*****************************************************************/
        this.apps = ["core", "call263", "grocRound", "powertel", "routers"];
        this.views = ["passpoint", "about"]; // appended to in constructor;
        this.coreViews = ["core-developer", "core-admin", "core-consumer"];
        this.call263Views = ["call263-developer", "call263-admin", "call263-consumer"];
        this.grocRoundViews = ["grocRound-developer", "grocRound-admin", "grocRound-consumer"];
        this.powertelViews = ["powertel-developer", "powertel-admin"];
        this.routersViews = ["routers-developer", "routers-admin"];
        /*****************************************************************/
        this.validateAppContext = function (appContext) {
            if (!appContext) {
                return false;
            }
            var matches = _this.views.filter(function (view) {
                return (view == appContext);
            });
            return (matches.length) ? true : false;
        };
        /*****************************************************************/
        this.getAuthCheck = function (accessLevel, appContext, innerContext) {
            var classContext = _this;
            return function (req, res, next) {
                if (!classContext.signedIn(req)) {
                    return signInFirst();
                }
                return classContext.getUserFromSession(req)
                    .then(function (currentUser) {
                    if (currentUser.accessLevel == accessLevel) {
                        res.locals.currentUser = currentUser;
                        return next();
                    }
                    else {
                        return signInFirst();
                    }
                });
                function signInFirst() {
                    var pairs = [];
                    if (appContext) {
                        pairs.push("appContext=" + appContext);
                    }
                    if (innerContext) {
                        pairs.push("nextInnerContext=" + innerContext);
                    }
                    if (pairs.length) {
                        return res.redirect("/passpoint?" + pairs.join("&"));
                    }
                    else {
                        return res.redirect("/passpoint");
                    }
                }
            };
        };
        this.coreViews.forEach(function (view) {
            _this.views.push(view);
        });
        this.call263Views.forEach(function (view) {
            _this.views.push(view);
        });
        this.grocRoundViews.forEach(function (view) {
            _this.views.push(view);
        });
        this.powertelViews.forEach(function (view) {
            _this.views.push(view);
        });
        this.routersViews.forEach(function (view) {
            _this.views.push(view);
        });
    }
    return Helpers;
}());
exports.default = Helpers;
/******************************************************************************/
