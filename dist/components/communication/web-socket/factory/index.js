"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
/******************************************************************************/
exports.default = function (WebSocket, events, checkThrow, getUserById, production, httpServer) {
    return new WebSocket(events, checkThrow, getUserById, production, httpServer);
};
/******************************************************************************/
