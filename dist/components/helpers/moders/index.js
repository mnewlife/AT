"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var factory_1 = require("./factory");
var canon_1 = require("./canon");
/******************************************************************************/
exports.default = function () {
    return factory_1.default(canon_1.default);
};
/******************************************************************************/
