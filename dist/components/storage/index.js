"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = require("./mongodb");
var factory_1 = require("./factory");
/******************************************************************************/
exports.default = function (emitEvent, mapDetails, checkThrow) {
    return factory_1.default(mongodb_1.default, emitEvent, mapDetails, checkThrow);
};
/******************************************************************************/
