"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
/******************************************************************************/
exports.default = function (MailAgent, events, checkThrow, sendingAddress, password) {
    return new MailAgent(events, checkThrow, sendingAddress, password);
};
/******************************************************************************/
