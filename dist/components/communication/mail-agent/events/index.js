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
        this.emailSent = function (data) {
            var event = {
                context: "MailAgent",
                tags: [],
                identifier: "EmailSent",
                data: {
                    from: data.from,
                    to: data.to,
                    subject: data.subject,
                    html: data.html
                }
            };
            _this.emitEvent(event);
            return event;
        };
        this.sendEmailFailed = function (data) {
            var event = {
                context: "MailAgent",
                tags: [],
                identifier: "SendEmailFailed",
                data: {
                    from: data.from,
                    to: data.to,
                    subject: data.subject,
                    html: data.html,
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
