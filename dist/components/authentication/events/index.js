"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
/******************************************************************************/
var Events = (function () {
    /*****************************************************************/
    function Events(emitEvent) {
        var _this = this;
        this.emitEvent = emitEvent;
        /*****************************************************************/
        this.signedIn = function (data) {
            var event = {
                context: "Authentication",
                tags: [],
                identifier: "SignedIn",
                data: {
                    user: data.user
                }
            };
            _this.emitEvent(event);
            return event;
        };
        /*****************************************************************/
        this.signInFailed = function (data) {
            var event = {
                context: "Authentication",
                tags: [],
                identifier: "SignInFailed",
                data: {
                    emailAddress: data.emailAddress,
                    reason: data.reason
                }
            };
            _this.emitEvent(event);
            return event;
        };
        /*****************************************************************/
        this.invalidPassword = function (data) {
            var event = {
                context: "Authentication",
                tags: [],
                identifier: "InvalidPassword",
                data: {
                    emailAddress: (data.emailAddress) ? data.emailAddress : "",
                    userId: (data.userId) ? data.userId : "",
                    password: data.password
                }
            };
            _this.emitEvent(event);
            return event;
        };
        /*****************************************************************/
        this.signedOut = function (data) {
            var event = {
                context: "Authentication",
                tags: [],
                identifier: "SignedOut",
                data: {
                    userId: data.userId
                }
            };
            _this.emitEvent(event);
            return event;
        };
        /*****************************************************************/
        this.signOutFailed = function (data) {
            var event = {
                context: "Authentication",
                tags: [],
                identifier: "SignOutFailed",
                data: {
                    req: data.req,
                    reason: data.reason
                }
            };
            _this.emitEvent(event);
            return event;
        };
        /*****************************************************************/
        this.getCurrentUserFailed = function (data) {
            var event = {
                context: "Authentication",
                tags: [],
                identifier: "GetCurrentUserFailed",
                data: {
                    req: data.req,
                    reason: data.reason
                }
            };
            _this.emitEvent(event);
            return event;
        };
        /*****************************************************************/
        this.createHashedPasswordFailed = function (data) {
            var event = {
                context: "Authentication",
                tags: [],
                identifier: "CreateHashedPasswordFailed",
                data: {
                    password: data.password,
                    reason: data.password
                }
            };
            _this.emitEvent(event);
            return event;
        };
        /*****************************************************************/
        this.authPasswordFailed = function (data) {
            var event = {
                context: "Authentication",
                tags: [],
                identifier: "AuthPasswordFailed",
                data: {
                    userId: data.userId,
                    password: data.password,
                    reason: data.reason
                }
            };
            _this.emitEvent(event);
            return event;
        };
    }
    return Events;
}());
exports.default = Events;
/******************************************************************************/
