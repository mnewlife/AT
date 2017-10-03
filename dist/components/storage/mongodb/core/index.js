"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var event_1 = require("./event");
var invitation_1 = require("./invitation");
var notification_1 = require("./notification");
var progression_1 = require("./progression");
var user_1 = require("./user");
/******************************************************************************/
var Core = (function () {
    /*****************************************************************/
    function Core(event, invitation, notification, progression, user) {
        this.event = event;
        this.invitation = invitation;
        this.notification = notification;
        this.progression = progression;
        this.user = user;
    }
    return Core;
}());
/******************************************************************************/
exports.default = function (emitEvent, mapDetails, checkThrow) {
    return new Core(event_1.default(emitEvent, mapDetails, checkThrow), invitation_1.default(emitEvent, mapDetails, checkThrow), notification_1.default(emitEvent, mapDetails, checkThrow), progression_1.default(emitEvent, mapDetails, checkThrow), user_1.default(emitEvent, mapDetails, checkThrow));
};
/******************************************************************************/
