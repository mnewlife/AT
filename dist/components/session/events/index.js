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
        this.setCurrentUser = function (data) {
            var event = {
                context: "Session",
                tags: [],
                identifier: "SetCurrentUser",
                data: {
                    userId: data.userId,
                    req: data.req
                }
            };
            _this.emitEvent(event);
            return event;
        };
        /*****************************************************************/
        this.setCurrentUserFailed = function (data) {
            var event = {
                context: "Session",
                tags: [],
                identifier: "SetCurrentUserFailed",
                data: {
                    userId: data.userId,
                    req: data.req,
                    reason: data.reason
                }
            };
            _this.emitEvent(event);
            return event;
        };
        /*****************************************************************/
        this.noCurrentUser = function (data) {
            var event = {
                context: "Session",
                tags: [],
                identifier: "NoCurrentUser",
                data: {
                    req: data.req
                }
            };
            _this.emitEvent(event);
            return event;
        };
        /*****************************************************************/
        this.getCurrentUserFailed = function (data) {
            var event = {
                context: "Session",
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
        this.signOutFailed = function (data) {
            var event = {
                context: "Session",
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
    }
    return Events;
}());
exports.default = Events;
/******************************************************************************/ 
