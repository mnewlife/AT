"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("bluebird");
/******************************************************************************/
var Canon = (function () {
    /*****************************************************************/
    function Canon(events, checkThrow) {
        var _this = this;
        this.events = events;
        this.checkThrow = checkThrow;
        /*****************************************************************/
        this.generateRandomNumber = function (min, max, forceThrow) {
            if (forceThrow === void 0) { forceThrow = false; }
            return _this.checkThrow(forceThrow)
                .then(function (response) {
                return new Promise(function (resolve, reject) {
                    if (min > max) {
                        return Promise.reject(new Error("Minimun is greater than maximum"));
                    }
                    min = (min) ? min : 1235;
                    max = (max) ? max : 9875;
                    resolve(Math.floor(Math.random() * (max - min + 1)) + min);
                });
            })
                .catch(function (reason) {
                new Promise(function (resolve, reject) {
                    _this.events.generateRandomNumberFailed({
                        min: min,
                        max: max,
                        reason: reason
                    });
                    resolve();
                });
                return Promise.reject({
                    identifier: "GenerateRandomNumberFailed",
                    data: {
                        reason: reason
                    }
                });
            });
        };
    }
    return Canon;
}());
exports.default = Canon;
/******************************************************************************/
