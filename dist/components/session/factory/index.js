"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
/******************************************************************************/
exports.default = function (Session, events, checkThrow, getUserById, production) {
    return new Session(events, checkThrow, getUserById, production);
};
/******************************************************************************/
