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
        this.stringifyHtmlPacketFailed = function (params) {
            var event = {
                context: "Response",
                tags: [],
                identifier: "StringifyHtmlPacketFailed",
                data: {
                    payload: params.payload,
                    reason: params.reason
                }
            };
            _this.emitEvent(event);
            return event;
        };
        /*****************************************************************/
        this.unacceptableResponseType = function (params) {
            var event = {
                context: "Response",
                tags: [],
                identifier: "UnacceptableResponseType",
                data: {
                    res: params.res,
                    packet: params.packet
                }
            };
            _this.emitEvent(event);
            return event;
        };
        /*****************************************************************/
        this.sendResponseFailed = function (params) {
            var event = {
                context: "Response",
                tags: [],
                identifier: "SendResponseFailed",
                data: {
                    res: params.res,
                    view: params.view,
                    success: params.success,
                    message: params.message,
                    payload: (params.payload) ? params.payload : "",
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
