"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
/******************************************************************************/
exports.default = function (WebSocket, events, checkThrow, getSubs, production, httpServer) {
    return new WebSocket(events, checkThrow, getSubs, production, httpServer);
};
/******************************************************************************/
