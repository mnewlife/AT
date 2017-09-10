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
        this.getUserSocketFailed = function (params) {
            var event = {
                context: "WebSocket",
                tags: [],
                identifier: "GetUserSocketFailed",
                data: {
                    userId: params.userId,
                    reason: params.reason
                }
            };
            _this.emitEvent(event);
            return event;
        };
        /*****************************************************************/
        this.joinChannelsFailed = function (params) {
            var event = {
                context: "WebSocket",
                tags: [],
                identifier: "JoinChannelsFailed",
                data: {
                    channels: params.channels,
                    userId: params.userId,
                    reason: params.reason
                }
            };
            _this.emitEvent(event);
            return event;
        };
        /*****************************************************************/
        this.joinedChannel = function (params) {
            var event = {
                context: "WebSocket",
                tags: [],
                identifier: "JoinedChannel",
                data: {
                    channel: params.channel,
                    userId: params.userId
                }
            };
            _this.emitEvent(event);
            return event;
        };
        /*****************************************************************/
        this.getUserSubscriptionsFailed = function (params) {
            var event = {
                context: "WebSocket",
                tags: [],
                identifier: "GetUserSubscriptionsFailed",
                data: {
                    userId: params.userId,
                    reason: params.reason
                }
            };
            _this.emitEvent(event);
            return event;
        };
        /*****************************************************************/
        this.pushToOtherUsersFailed = function (params) {
            var event = {
                context: "WebSocket",
                tags: [],
                identifier: "PushToOtherUsersFailed",
                data: {
                    userId: params.userId,
                    identifier: params.identifier,
                    payload: params.payload,
                    reason: params.reason
                }
            };
            _this.emitEvent(event);
            return event;
        };
        /*****************************************************************/
        this.pushedToOtherUsers = function (params) {
            var event = {
                context: "WebSocket",
                tags: [],
                identifier: "PushedToOtherUsers",
                data: {
                    userId: params.userId,
                    identifier: params.identifier,
                    payload: params.payload
                }
            };
            _this.emitEvent(event);
            return event;
        };
        /*****************************************************************/
        this.pushToCurrentUserFailed = function (params) {
            var event = {
                context: "WebSocket",
                tags: [],
                identifier: "PushToCurrentUserFailed",
                data: {
                    userId: params.userId,
                    identifier: params.identifier,
                    payload: params.payload,
                    reason: params.reason
                }
            };
            _this.emitEvent(event);
            return event;
        };
        /*****************************************************************/
        this.pushedToCurrentUser = function (params) {
            var event = {
                context: "WebSocket",
                tags: [],
                identifier: "PushedToCurrentUser",
                data: {
                    userId: params.userId,
                    identifier: params.identifier,
                    payload: params.payload
                }
            };
            _this.emitEvent(event);
            return event;
        };
        /*****************************************************************/
        this.pushToChannelsFailed = function (params) {
            var event = {
                context: "WebSocket",
                tags: [],
                identifier: "PushToChannelsFailed",
                data: {
                    channels: params.channels,
                    payload: params.payload,
                    reason: params.reason
                }
            };
            _this.emitEvent(event);
            return event;
        };
        /*****************************************************************/
        this.pushedToChannel = function (params) {
            var event = {
                context: "WebSocket",
                tags: [],
                identifier: "PushedToChannel",
                data: {
                    channel: params.channel,
                    payload: params.payload
                }
            };
            _this.emitEvent(event);
            return event;
        };
        /*****************************************************************/
        this.leftChannel = function (params) {
            var event = {
                context: "WebSocket",
                tags: [],
                identifier: "LeftChannel",
                data: {
                    channel: params.channel,
                    userId: params.userId
                }
            };
            _this.emitEvent(event);
            return event;
        };
        /*****************************************************************/
        this.leaveChannelsFailed = function (params) {
            var event = {
                context: "WebSocket",
                tags: [],
                identifier: "LeaveChannelsFailed",
                data: {
                    channels: params.channels,
                    userId: params.userId,
                    reason: params.reason
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
