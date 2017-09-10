"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
/******************************************************************************/
var Events = (function () {
    /*****************************************************************/
    function Events(emitevent) {
        var _this = this;
        this.emitevent = emitevent;
        /*****************************************************************/
        this.signedIn = function (data) {
            var event = {
                context: "Procedures|Core|Common|Auth",
                tags: [],
                identifier: "SignedIn",
                data: {
                    emailAddress: data.emailAddress,
                    req: data.req
                }
            };
            _this.emitevent(event);
            return event;
        };
        /*****************************************************************/
        this.signInFailed = function (data) {
            var event = {
                context: "Procedures|Core|Common|Auth",
                tags: [],
                identifier: "SignInFailed",
                data: {
                    emailAddress: data.emailAddress,
                    req: data.req,
                    reason: data.reason
                }
            };
            _this.emitevent(event);
            return event;
        };
    }
    return Events;
}());
exports.default = Events;
/******************************************************************************/ 
