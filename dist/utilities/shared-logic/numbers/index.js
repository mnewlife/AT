"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("bluebird");
/******************************************************************************/
var Numbers = (function () {
    function Numbers() {
    }
    /*****************************************************************/
    Numbers.prototype.generateRandomNumber = function (min, max) {
        return new Promise(function (resolve, reject) {
            min = (min) ? min : 1235;
            max = (max) ? max : 9875;
            var result = Math.floor(Math.random() * (max - min + 1)) + min;
            resolve(result);
        });
    };
    return Numbers;
}());
/******************************************************************************/
exports.default = new Numbers();
/******************************************************************************/
