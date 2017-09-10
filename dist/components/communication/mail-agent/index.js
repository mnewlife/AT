"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var node_mailer_1 = require("./node-mailer");
var events_1 = require("./events");
var factory_1 = require("./factory");
/******************************************************************************/
exports.default = function (emitEvent, checkThrow, sendingAddress, password) {
    return factory_1.default(node_mailer_1.default, new events_1.default(emitEvent), checkThrow, sendingAddress, password);
};
/******************************************************************************/
