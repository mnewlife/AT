"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("./core");
/******************************************************************************/
var Procedures = (function () {
    function Procedures(core) {
        this.core = core;
    }
    return Procedures;
}());
/******************************************************************************/
exports.default = function (emitEvent, components) {
    return new Procedures(core_1.default(emitEvent, components));
};
/******************************************************************************/ 
