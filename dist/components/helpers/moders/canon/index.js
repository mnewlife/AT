"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("bluebird");
/******************************************************************************/
var Moders = (function () {
    /*****************************************************************/
    function Moders() {
        /*****************************************************************/
        this.checkThrow = function (forceThrow) {
            return new Promise(function (resolve, reject) {
                if (forceThrow) {
                    throw new Error("Forced Throw!");
                }
                resolve();
            });
        };
    }
    return Moders;
}());
exports.default = Moders;
/******************************************************************************/
