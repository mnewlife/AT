"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_1 = require("./socket-io");
var events_1 = require("./events");
var factory_1 = require("./factory");
/******************************************************************************/
exports.default = function (emitEvent, checkThrow, getUserById, production, httpServer) {
    return factory_1.default(socket_io_1.default, new events_1.default(emitEvent), checkThrow, getUserById, production, httpServer);
};
/******************************************************************************/
