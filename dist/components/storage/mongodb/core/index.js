"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var event_1 = require("./event");
var subscription_1 = require("./subscription");
var user_1 = require("./user");
/******************************************************************************/
var Core = (function () {
    /*****************************************************************/
    function Core(event, subscription, user) {
        this.event = event;
        this.subscription = subscription;
        this.user = user;
    }
    return Core;
}());
/******************************************************************************/
exports.default = function (emitEvent, mapDetails, checkThrow) {
    return new Core(event_1.default(emitEvent, mapDetails, checkThrow), subscription_1.default(emitEvent, mapDetails, checkThrow), user_1.default(emitEvent, mapDetails, checkThrow));
};
/******************************************************************************/
